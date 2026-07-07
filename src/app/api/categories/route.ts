import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { STATIC_CATEGORIES } from "@/lib/static-data";

/** GET /api/categories — Lista pública de categorías activas */
export async function GET() {
  try {
    const categories = await db.category.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        icon: true,
        image: true,
        _count: { select: { products: { where: { isActive: true } } } },
      },
    });

    // Fallback to static data if DB is empty
    if (categories.length === 0) {
      return NextResponse.json({ data: STATIC_CATEGORIES });
    }

    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error("[api/categories] Error:", error);
    return NextResponse.json({ data: STATIC_CATEGORIES });
  }
}