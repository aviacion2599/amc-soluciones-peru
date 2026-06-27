import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/products/[slug]
 * Detalle público de un producto por slug.
 * Incluye: imágenes, videos, documentos, features, specs, aplicaciones.
 * Incrementa vistas (no implementado por simplicidad — agregar campo viewCount si se requiere).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const product = await db.product.findUnique({
      where: { slug, isActive: true },
      include: {
        category: {
          select: { slug: true, name: true, description: true, icon: true },
        },
        subcategory: { select: { slug: true, name: true } },
        brand: { select: { slug: true, name: true, logo: true } },
        images: {
          orderBy: [{ isPrimary: "desc" }, { order: "asc" }],
        },
        videos: { orderBy: { order: "asc" } },
        documents: { orderBy: { createdAt: "desc" } },
        features: { orderBy: { order: "asc" } },
        specifications: { orderBy: [{ group: "asc" }, { order: "asc" }] },
        applications: { orderBy: { order: "asc" } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }

    // Productos relacionados (misma categoría, excluyendo el actual)
    const related = await db.product.findMany({
      where: {
        categoryId: product.categoryId,
        isActive: true,
        id: { not: product.id },
      },
      take: 4,
      orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        summary: true,
        price: true,
        isFeatured: true,
        isNew: true,
        images: {
          where: { isPrimary: true },
          take: 1,
          select: { url: true, alt: true },
        },
      },
    });

    return NextResponse.json({
      data: product,
      related,
    });
  } catch (error) {
    console.error("[api/products/[slug]] Error:", error);
    return NextResponse.json(
      { error: "Error al obtener el producto" },
      { status: 500 },
    );
  }
}
