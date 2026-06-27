import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { z } from "zod";

const testimonialUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  position: z.string().max(100).optional().or(z.literal("")),
  company: z.string().max(100).optional().or(z.literal("")),
  content: z.string().min(10).max(1000).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  avatar: z.string().url().optional().or(z.literal("")),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("testimonial", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.testimonial.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Testimonio no encontrado" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = testimonialUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const cleanData: any = { ...data };
  Object.keys(cleanData).forEach((k) => {
    if (cleanData[k] === "") cleanData[k] = null;
  });

  const testimonial = await db.testimonial.update({ where: { id }, data: cleanData });
  return NextResponse.json({ data: testimonial });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("testimonial", "delete");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  await db.testimonial.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ message: "Testimonio eliminado" });
}
