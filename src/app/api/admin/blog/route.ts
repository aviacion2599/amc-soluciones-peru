import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { z } from "zod";

const blogSchema = z.object({
  slug: z.string().min(2).max(150).regex(/^[a-z0-9-]+$/),
  title: z.string().min(2).max(200),
  excerpt: z.string().min(5).max(300),
  content: z.string().min(10).max(50000),
  coverImage: z.string().url().optional().or(z.literal("")),
  tags: z.string().max(300).optional().or(z.literal("")),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().or(z.literal("")),
  seoTitle: z.string().max(150).optional().or(z.literal("")),
  seoDescription: z.string().max(300).optional().or(z.literal("")),
});

export async function GET(req: NextRequest) {
  const access = await can("blog", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

  const [total, posts] = await Promise.all([
    db.blogPost.count(),
    db.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: { select: { id: true, name: true } },
      },
    }),
  ]);

  return NextResponse.json({
    data: posts,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(req: NextRequest) {
  const access = await can("blog", "create");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const body = await req.json();
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const exists = await db.blogPost.findUnique({ where: { slug: data.slug } });
  if (exists) {
    return NextResponse.json({ error: "Slug ya existe" }, { status: 409 });
  }

  const post = await db.blogPost.create({
    data: {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || null,
      authorId: access.user.id,
      tags: data.tags || "",
      isPublished: data.isPublished,
      publishedAt: data.isPublished
        ? data.publishedAt
          ? new Date(data.publishedAt)
          : new Date()
        : data.publishedAt
          ? new Date(data.publishedAt)
          : null,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
    },
  });

  return NextResponse.json({ data: post }, { status: 201 });
}
