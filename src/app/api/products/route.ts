import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { STATIC_PRODUCTS } from "@/lib/static-data";

/**
 * GET /api/products
 * Lista pública de productos activos con filtros.
 * Falls back to static data when DB is empty.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");
    const marca = searchParams.get("marca");
    const destacado = searchParams.get("destacado") === "true";
    const nuevo = searchParams.get("nuevo") === "true";
    const q = searchParams.get("q")?.trim().toLowerCase();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12", 10)));
    const sort = searchParams.get("sort") || "destacados";

    // Try DB first
    let products = await db.product.findMany({
      where: { isActive: true },
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
    });

    // Fallback to static data if DB is empty
    if (products.length === 0) {
      products = STATIC_PRODUCTS as any;
    }

    // Apply client-side filters (works for both DB and static data)
    let filtered = [...products];

    if (categoria) {
      filtered = filtered.filter((p: any) => p.category?.slug === categoria);
    }
    if (marca) {
      filtered = filtered.filter((p: any) => p.brand?.slug === marca);
    }
    if (destacado) {
      filtered = filtered.filter((p: any) => p.isFeatured);
    }
    if (nuevo) {
      filtered = filtered.filter((p: any) => p.isNew);
    }
    if (q) {
      filtered = filtered.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(q) ||
          p.summary?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q)
      );
    }

    // Sort
    const exactOrder = [
      "amc-2000",
      "amc-3200",
      "amc-8100",
      "amc-8200",
      "amc-9100",
      "amc-9200",
      "amc-cm3400",
      "amc-cm3400-max"
    ];

    const sortFns: Record<string, (a: any, b: any) => number> = {
      recientes: (a, b) => 0, // static data has no dates
      destacados: (a, b) => {
        const idxA = exactOrder.indexOf(a.slug);
        const idxB = exactOrder.indexOf(b.slug);
        const valA = idxA !== -1 ? idxA : 999;
        const valB = idxB !== -1 ? idxB : 999;
        return valA - valB;
      },
      nombre: (a, b) => (a.name || "").localeCompare(b.name || ""),
      "precio-asc": (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
      "precio-desc": (a, b) => (b.price ?? 0) - (a.price ?? 0),
    };
    const sortFn = sortFns[sort] || sortFns.destacados;
    filtered.sort(sortFn);

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("[api/products] Error:", error);
    try {
      const { searchParams } = new URL(req.url);
      const categoria = searchParams.get("categoria");
      let filtered = [...STATIC_PRODUCTS];
      if (categoria) {
        filtered = filtered.filter((p: any) => p.category?.slug === categoria);
      }

      // Apply the exact order sort to the fallback as well!
      const exactOrder = [
        "amc-2000",
        "amc-3200",
        "amc-8100",
        "amc-8200",
        "amc-9100",
        "amc-9200",
        "amc-cm3400",
        "amc-cm3400-max"
      ];
      filtered.sort((a, b) => {
        const idxA = exactOrder.indexOf(a.slug);
        const idxB = exactOrder.indexOf(b.slug);
        const valA = idxA !== -1 ? idxA : 999;
        const valB = idxB !== -1 ? idxB : 999;
        return valA - valB;
      });

      return NextResponse.json({
        data: filtered.slice(0, 50),
        pagination: { page: 1, limit: 50, total: filtered.length, totalPages: 1, hasNext: false, hasPrev: false },
      });
    } catch (e) {
      // Return static data as ultimate fallback
      const exactOrder = [
        "amc-2000",
        "amc-3200",
        "amc-8100",
        "amc-8200",
        "amc-9100",
        "amc-9200",
        "amc-cm3400",
        "amc-cm3400-max"
      ];
      let finalArr = [...STATIC_PRODUCTS];
      finalArr.sort((a, b) => {
        const idxA = exactOrder.indexOf(a.slug);
        const idxB = exactOrder.indexOf(b.slug);
        const valA = idxA !== -1 ? idxA : 999;
        const valB = idxB !== -1 ? idxB : 999;
        return valA - valB;
      });
      return NextResponse.json({
        data: finalArr.slice(0, 50),
        pagination: { page: 1, limit: 50, total: finalArr.length, totalPages: 1, hasNext: false, hasPrev: false },
      });
    }
  }
}