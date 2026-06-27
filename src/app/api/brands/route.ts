import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
    return NextResponse.json({ data: brands });
  } catch (error) {
    console.error("[api/brands] Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
