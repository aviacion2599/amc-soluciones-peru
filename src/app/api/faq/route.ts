import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/** GET /api/faq — Lista pública de FAQ activas */
export async function GET() {
  try {
    const faqs = await db.fAQ.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
      },
    });
    return NextResponse.json({ data: faqs });
  } catch (error) {
    console.error("[api/faq] Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
