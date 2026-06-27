import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";

const brandUpdateSchema = z.object({
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/).optional(),
  name: z.string().min(2).max(100).optional(),
  logo: z.string().url().optional().or(z.literal("")),
  description: z.string().max(500).optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("brand", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.brand.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Marca no encontrada" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = brandUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (data.slug && data.slug !== existing.slug) {
    const dup = await db.brand.findUnique({ where: { slug: data.slug } });
    if (dup) {
      return NextResponse.json({ error: "Slug ya en uso" }, { status: 409 });
    }
  }

  const cleanData: any = { ...data };
  Object.keys(cleanData).forEach((k) => {
    if (cleanData[k] === "") cleanData[k] = null;
  });

  const brand = await db.brand.update({ where: { id }, data: cleanData });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.UPDATE_BRAND,
    entity: "brand",
    entityId: id,
    metadata: { before: existing, after: brand },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ data: brand });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("brand", "delete");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.brand.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Marca no encontrada" }, { status: 404 });
  }

  await db.brand.update({ where: { id }, data: { isActive: false } });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.DELETE_BRAND,
    entity: "brand",
    entityId: id,
    metadata: { name: existing.name },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ message: "Marca desactivada" });
}
