import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  position: z.string().max(100).optional().or(z.literal("")),
  company: z.string().max(100).optional().or(z.literal("")),
  content: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5).default(5),
  avatar: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export async function GET() {
  const access = await can("testimonial", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const testimonials = await db.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ data: testimonials });
}

export async function POST(req: NextRequest) {
  const access = await can("testimonial", "create");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const body = await req.json();
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const cleanData: any = { ...data };
  if (cleanData.position === "") cleanData.position = null;
  if (cleanData.company === "") cleanData.company = null;
  if (cleanData.avatar === "") cleanData.avatar = null;

  const testimonial = await db.testimonial.create({ data: cleanData });
  return NextResponse.json({ data: testimonial }, { status: 201 });
}
