import type { Metadata } from "next";
import { Suspense } from "react";
import BlogPostClient from "./BlogPostClient";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({
    where: { slug, isPublished: true },
    select: { title: true, excerpt: true, seoTitle: true, seoDescription: true, coverImage: true },
  });

  if (!post) {
    return { title: "Artículo no encontrado", robots: { index: false, follow: false } };
  }

  return {
    title: post.seoTitle || `${post.title} | AMC Blog`,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  try {
    const posts = await db.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div className="container-amc py-20 text-sm text-muted-foreground">Cargando artículo...</div>}>
      <BlogPostClient slug={slug} />
    </Suspense>
  );
}
