import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/blog
 * Lista pública de posts publicados.
 * Query: page, limit, tag
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));

    const where: any = {
      isPublished: true,
      publishedAt: { lte: new Date() },
    };
    if (tag) {
      where.tags = { contains: tag };
    }

    const [total, posts] = await Promise.all([
      db.blogPost.count({ where }),
      db.blogPost.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          coverImage: true,
          tags: true,
          publishedAt: true,
          author: { select: { name: true } },
        },
      }),
    ]);

    return NextResponse.json({
      data: posts,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[api/blog] Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
