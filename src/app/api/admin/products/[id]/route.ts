import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";

const updateProductSchema = z.object({
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/).optional(),
  sku: z.string().min(2).max(50).optional(),
  name: z.string().min(2).max(150).optional(),
  summary: z.string().min(5).max(200).optional(),
  description: z.string().min(10).max(10000).optional(),
  categoryId: z.string().cuid().optional(),
  subcategoryId: z.string().cuid().optional().or(z.literal("")),
  brandId: z.string().cuid().optional().or(z.literal("")),
  price: z.number().min(0).optional().nullable(),
  currency: z.string().max(3).optional(),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
  seoTitle: z.string().max(150).optional().or(z.literal("")),
  seoDescription: z.string().max(300).optional().or(z.literal("")),
  seoKeywords: z.string().max(300).optional().or(z.literal("")),
  ogImage: z.string().url().optional().or(z.literal("")),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
});

/** GET /api/admin/products/[id] */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("product", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  try {
    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        subcategory: true,
        brand: true,
        images: { orderBy: [{ isPrimary: "desc" }, { order: "asc" }] },
        videos: { orderBy: { order: "asc" } },
        documents: { orderBy: { createdAt: "desc" } },
        features: { orderBy: { order: "asc" } },
        specifications: { orderBy: [{ group: "asc" }, { order: "asc" }] },
        applications: { orderBy: { order: "asc" } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error("[api/admin/products/[id]] GET Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

/** PUT /api/admin/products/[id] */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("product", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  try {
    const { id } = await params;
    const existing = await db.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = updateProductSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const data = parsed.data;

    // Validar unicidad de slug/sku si se están actualizando
    if (data.slug && data.slug !== existing.slug) {
      const dup = await db.product.findUnique({ where: { slug: data.slug } });
      if (dup) {
        return NextResponse.json({ error: "Slug ya en uso" }, { status: 409 });
      }
    }
    if (data.sku && data.sku !== existing.sku) {
      const dup = await db.product.findUnique({ where: { sku: data.sku } });
      if (dup) {
        return NextResponse.json({ error: "SKU ya en uso" }, { status: 409 });
      }
    }

    // Limpiar strings vacíos
    const cleanData: any = { ...data };
    if (cleanData.subcategoryId === "") cleanData.subcategoryId = null;
    if (cleanData.brandId === "") cleanData.brandId = null;
    if (cleanData.seoTitle === "") cleanData.seoTitle = null;
    if (cleanData.seoDescription === "") cleanData.seoDescription = null;
    if (cleanData.seoKeywords === "") cleanData.seoKeywords = null;
    if (cleanData.ogImage === "") cleanData.ogImage = null;
    if (cleanData.canonicalUrl === "") cleanData.canonicalUrl = null;

    const product = await db.product.update({
      where: { id },
      data: cleanData,
    });

    await audit({
      userId: access.user.id,
      action: AUDIT_ACTIONS.UPDATE_PRODUCT,
      entity: "product",
      entityId: id,
      metadata: { before: existing, after: product },
      ip: req.headers.get("x-forwarded-for") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error("[api/admin/products/[id]] PUT Error:", error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

/** DELETE /api/admin/products/[id] — soft delete (isActive = false) */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("product", "delete");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  try {
    const { id } = await params;
    const existing = await db.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    // Soft delete
    await db.product.update({
      where: { id },
      data: { isActive: false },
    });

    await audit({
      userId: access.user.id,
      action: AUDIT_ACTIONS.DELETE_PRODUCT,
      entity: "product",
      entityId: id,
      metadata: { name: existing.name, slug: existing.slug, sku: existing.sku },
      ip: req.headers.get("x-forwarded-for") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    return NextResponse.json({ message: "Producto desactivado" });
  } catch (error) {
    console.error("[api/admin/products/[id]] DELETE Error:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
