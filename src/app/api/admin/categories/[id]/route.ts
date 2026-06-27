import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";

const categoryUpdateSchema = z.object({
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/).optional(),
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional().or(z.literal("")),
  icon: z.string().max(50).optional().or(z.literal("")),
  image: z.string().url().optional().or(z.literal("")),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
  seoTitle: z.string().max(150).optional().or(z.literal("")),
  seoDescription: z.string().max(300).optional().or(z.literal("")),
  seoKeywords: z.string().max(300).optional().or(z.literal("")),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("category", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const category = await db.category.findUnique({
    where: { id },
    include: {
      subcategories: { orderBy: { order: "asc" } },
      _count: { select: { products: true } },
    },
  });

  if (!category) {
    return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ data: category });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("category", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.category.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = categoryUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (data.slug && data.slug !== existing.slug) {
    const dup = await db.category.findUnique({ where: { slug: data.slug } });
    if (dup) {
      return NextResponse.json({ error: "Slug ya en uso" }, { status: 409 });
    }
  }

  const cleanData: any = { ...data };
  Object.keys(cleanData).forEach((k) => {
    if (cleanData[k] === "") cleanData[k] = null;
  });

  const category = await db.category.update({ where: { id }, data: cleanData });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.UPDATE_CATEGORY,
    entity: "category",
    entityId: id,
    metadata: { before: existing, after: category },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ data: category });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("category", "delete");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.category.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
  }

  // Soft delete
  await db.category.update({ where: { id }, data: { isActive: false } });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.DELETE_CATEGORY,
    entity: "category",
    entityId: id,
    metadata: { name: existing.name },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ message: "Categoría desactivada" });
}
