import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/products
 * Lista pública de productos activos con filtros.
 * Query params:
 *  - categoria: slug de categoría
 *  - marca: slug de marca
 *  - destacado: "true" para solo isFeatured
 *  - nuevo: "true" para solo isNew
 *  - q: búsqueda full-text (nombre, summary, sku)
 *  - page: página (default 1)
 *  - limit: items por página (default 12, max 50)
 *  - sort: "recientes" | "destacados" | "nombre" | "precio-asc" | "precio-desc"
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");
    const marca = searchParams.get("marca");
    const destacado = searchParams.get("destacado") === "true";
    const nuevo = searchParams.get("nuevo") === "true";
    const q = searchParams.get("q")?.trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12", 10)));
    const sort = searchParams.get("sort") || "destacados";

    const where: any = { isActive: true };
    if (categoria) {
      where.category = { slug: categoria };
    }
    if (marca) {
      where.brand = { slug: marca };
    }
    if (destacado) where.isFeatured = true;
    if (nuevo) where.isNew = true;
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { summary: { contains: q } },
        { sku: { contains: q } },
      ];
    }

    const orderBy: any = {
      recientes: { createdAt: "desc" },
      destacados: [{ isFeatured: "desc" }, { order: "asc" }],
      nombre: { name: "asc" },
      "precio-asc": { price: "asc" },
      "precio-desc": { price: "desc" },
    }[sort] || { isFeatured: "desc" };

    const [total, products] = await Promise.all([
      db.product.count({ where }),
      db.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          slug: true,
          name: true,
          summary: true,
          sku: true,
          price: true,
          currency: true,
          isFeatured: true,
          isNew: true,
          isBestSeller: true,
          category: { select: { slug: true, name: true } },
          brand: { select: { slug: true, name: true } },
          images: {
            where: { isPrimary: true },
            take: 1,
            select: { url: true, alt: true, width: true, height: true },
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
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("[api/products] Error:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 },
    );
  }
}
