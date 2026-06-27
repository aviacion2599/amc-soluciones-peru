import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { z } from "zod";

const faqSchema = z.object({
  question: z.string().min(5).max(200),
  answer: z.string().min(10).max(2000),
  category: z.string().max(50).default("General"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export async function GET() {
  const access = await can("faq", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const faqs = await db.fAQ.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ data: faqs });
}

export async function POST(req: NextRequest) {
  const access = await can("faq", "create");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const body = await req.json();
  const parsed = faqSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const faq = await db.fAQ.create({ data: parsed.data });
  return NextResponse.json({ data: faq }, { status: 201 });
}
