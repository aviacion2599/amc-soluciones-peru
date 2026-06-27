import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error("[api/categories] Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
