import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";

/**
 * GET /api/admin/products
 * Lista admin (incluye inactivos). Query: page, limit, q, categoria, marca, estado
 */
export async function GET(req: NextRequest) {
  const access = await can("product", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const categoria = searchParams.get("categoria");
    const marca = searchParams.get("marca");
    const estado = searchParams.get("estado"); // activo | inactivo | destacado | nuevo
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { sku: { contains: q } },
        { summary: { contains: q } },
      ];
    }
    if (categoria) where.category = { slug: categoria };
    if (marca) where.brand = { slug: marca };
    if (estado === "activo") where.isActive = true;
    if (estado === "inactivo") where.isActive = false;
    if (estado === "destacado") where.isFeatured = true;
    if (estado === "nuevo") where.isNew = true;

    const [total, products] = await Promise.all([
      db.product.count({ where }),
      db.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          slug: true,
          sku: true,
          name: true,
          summary: true,
          price: true,
          currency: true,
          isFeatured: true,
          isNew: true,
          isBestSeller: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          category: { select: { id: true, name: true, slug: true } },
          brand: { select: { id: true, name: true, slug: true } },
          _count: {
            select: {
              images: true,
              quotes: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[api/admin/products] GET Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

const createProductSchema = z.object({
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/, "Slug solo minúsculas, números y guiones"),
  sku: z.string().min(2).max(50),
  name: z.string().min(2).max(150),
  summary: z.string().min(5).max(200),
  description: z.string().min(10).max(10000),
  categoryId: z.string().cuid(),
  subcategoryId: z.string().cuid().optional().or(z.literal("")),
  brandId: z.string().cuid().optional().or(z.literal("")),
  price: z.number().min(0).optional().nullable(),
  currency: z.string().max(3).default("PEN"),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
  seoTitle: z.string().max(150).optional().or(z.literal("")),
  seoDescription: z.string().max(300).optional().or(z.literal("")),
  seoKeywords: z.string().max(300).optional().or(z.literal("")),
  ogImage: z.string().url().optional().or(z.literal("")),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
});

/**
 * POST /api/admin/products
 * Crea un producto nuevo.
 */
export async function POST(req: NextRequest) {
  const access = await can("product", "create");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  try {
    const body = await req.json();
    const parsed = createProductSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const data = parsed.data;

    // Verificar slug y sku únicos
    const exists = await db.product.findFirst({
      where: { OR: [{ slug: data.slug }, { sku: data.sku }] },
    });
    if (exists) {
      return NextResponse.json(
        { error: "Ya existe un producto con ese slug o SKU" },
        { status: 409 },
      );
    }

    const product = await db.product.create({
      data: {
        slug: data.slug,
        sku: data.sku,
        name: data.name,
        summary: data.summary,
        description: data.description,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId || null,
        brandId: data.brandId || null,
        price: data.price ?? null,
        currency: data.currency,
        isFeatured: data.isFeatured,
        isNew: data.isNew,
        isBestSeller: data.isBestSeller,
        isActive: data.isActive,
        order: data.order,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
        ogImage: data.ogImage || null,
        canonicalUrl: data.canonicalUrl || null,
      },
    });

    await audit({
      userId: access.user.id,
      action: AUDIT_ACTIONS.CREATE_PRODUCT,
      entity: "product",
      entityId: product.id,
      metadata: { name: product.name, slug: product.slug, sku: product.sku },
      ip: req.headers.get("x-forwarded-for") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error("[api/admin/products] POST Error:", error);
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
  }
}
