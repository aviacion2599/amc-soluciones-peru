import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";

const brandSchema = z.object({
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(100),
  logo: z.string().url().optional().or(z.literal("")),
  description: z.string().max(500).optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export async function GET() {
  const access = await can("brand", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const brands = await db.brand.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } },
  });

  return NextResponse.json({ data: brands });
}

export async function POST(req: NextRequest) {
  const access = await can("brand", "create");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const body = await req.json();
  const parsed = brandSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const exists = await db.brand.findUnique({ where: { slug: data.slug } });
  if (exists) {
    return NextResponse.json({ error: "Slug ya existe" }, { status: 409 });
  }

  const brand = await db.brand.create({
    data: {
      ...data,
      logo: data.logo || null,
      description: data.description || null,
      website: data.website || null,
    },
  });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.CREATE_BRAND,
    entity: "brand",
    entityId: brand.id,
    metadata: { name: brand.name, slug: brand.slug },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ data: brand }, { status: 201 });
}
