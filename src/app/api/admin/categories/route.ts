import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";

const categorySchema = z.object({
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional().or(z.literal("")),
  icon: z.string().max(50).optional().or(z.literal("")),
  image: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  seoTitle: z.string().max(150).optional().or(z.literal("")),
  seoDescription: z.string().max(300).optional().or(z.literal("")),
  seoKeywords: z.string().max(300).optional().or(z.literal("")),
});

export async function GET() {
  const access = await can("category", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const categories = await db.category.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { products: true, subcategories: true } },
    },
  });

  return NextResponse.json({ data: categories });
}

export async function POST(req: NextRequest) {
  const access = await can("category", "create");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const body = await req.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const exists = await db.category.findUnique({ where: { slug: data.slug } });
  if (exists) {
    return NextResponse.json({ error: "Slug ya existe" }, { status: 409 });
  }

  const category = await db.category.create({
    data: {
      ...data,
      description: data.description || null,
      icon: data.icon || null,
      image: data.image || null,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      seoKeywords: data.seoKeywords || null,
    },
  });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.CREATE_CATEGORY,
    entity: "category",
    entityId: category.id,
    metadata: { name: category.name, slug: category.slug },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ data: category }, { status: 201 });
}
