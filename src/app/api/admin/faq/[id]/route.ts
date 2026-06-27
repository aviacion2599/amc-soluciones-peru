import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { z } from "zod";

const faqUpdateSchema = z.object({
  question: z.string().min(5).max(200).optional(),
  answer: z.string().min(10).max(2000).optional(),
  category: z.string().max(50).optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("faq", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.fAQ.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "FAQ no encontrada" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = faqUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const faq = await db.fAQ.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ data: faq });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("faq", "delete");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  await db.fAQ.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ message: "FAQ eliminada" });
}
