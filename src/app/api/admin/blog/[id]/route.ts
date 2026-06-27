import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { z } from "zod";

const blogUpdateSchema = z.object({
  slug: z.string().min(2).max(150).regex(/^[a-z0-9-]+$/).optional(),
  title: z.string().min(2).max(200).optional(),
  excerpt: z.string().min(5).max(300).optional(),
  content: z.string().min(10).max(50000).optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  tags: z.string().max(300).optional().or(z.literal("")),
  isPublished: z.boolean().optional(),
  publishedAt: z.string().datetime().optional().or(z.literal("")).nullable(),
  seoTitle: z.string().max(150).optional().or(z.literal("")),
  seoDescription: z.string().max(300).optional().or(z.literal("")),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("blog", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = blogUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (data.slug && data.slug !== existing.slug) {
    const dup = await db.blogPost.findUnique({ where: { slug: data.slug } });
    if (dup) {
      return NextResponse.json({ error: "Slug ya en uso" }, { status: 409 });
    }
  }

  const cleanData: any = { ...data };
  if (cleanData.coverImage === "") cleanData.coverImage = null;
  if (cleanData.tags === "") cleanData.tags = "";
  if (cleanData.seoTitle === "") cleanData.seoTitle = null;
  if (cleanData.seoDescription === "") cleanData.seoDescription = null;
  if (cleanData.publishedAt === "") cleanData.publishedAt = null;
  else if (cleanData.publishedAt) cleanData.publishedAt = new Date(cleanData.publishedAt);

  // Si se está publicando por primera vez, set publishedAt
  if (data.isPublished && !existing.isPublished && !cleanData.publishedAt) {
    cleanData.publishedAt = new Date();
  }

  const post = await db.blogPost.update({ where: { id }, data: cleanData });
  return NextResponse.json({ data: post });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("blog", "delete");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  await db.blogPost.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ message: "Post eliminado" });
}
