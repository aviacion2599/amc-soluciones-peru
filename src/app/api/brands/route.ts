import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { STATIC_BRANDS } from "@/lib/static-data";

/** GET /api/brands — Lista pública de marcas activas */
export async function GET() {
  try {
    const brands = await db.brand.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        logo: true,
        description: true,
        website: true,
        _count: { select: { products: { where: { isActive: true } } } },
      },
    });

    // Fallback to static data if DB is empty
    if (brands.length === 0) {
      return NextResponse.json({ data: STATIC_BRANDS });
    }

    return NextResponse.json({ data: brands });
  } catch (error) {
    console.error("[api/brands] Error:", error);
    return NextResponse.json({ data: STATIC_BRANDS });
  }
}