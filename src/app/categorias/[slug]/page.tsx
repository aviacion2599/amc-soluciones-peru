import type { Metadata } from "next";
import { Suspense } from "react";
import CategoriaDetalleClient from "./CategoriaDetalleClient";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let category: any = null;
  try {
    category = await db.category.findUnique({
      where: { slug, isActive: true },
      select: { name: true, description: true, seoTitle: true, seoDescription: true, seoKeywords: true },
    });
  } catch (error) {
    console.error("[generateMetadata] DB Error:", error);
  }

  if (!category) {
    const { STATIC_CATEGORIES } = await import("@/lib/static-data");
    const staticCat = STATIC_CATEGORIES.find((c) => c.slug === slug);
    if (staticCat) {
      category = {
        name: staticCat.name,
        description: staticCat.description,
        seoTitle: null,
        seoDescription: null,
        seoKeywords: null,
      };
    } else {
      return { title: "Categoría no encontrada", robots: { index: false, follow: false } };
    }
  }

  return {
    title: category.seoTitle || `${category.name} | AMC Soluciones Perú`,
    description: category.seoDescription || category.description || `Catálogo de ${category.name} en AMC Soluciones Perú.`,
    keywords: category.seoKeywords?.split(",").map((k) => k.trim()) || [],
    alternates: { canonical: `/categorias/${slug}` },
    openGraph: {
      title: category.seoTitle || category.name,
      description: category.seoDescription || category.description || "",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  try {
    const categories = await db.category.findMany({
      where: { isActive: true },
      select: { slug: true },
    });
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div className="container-amc py-20 text-sm text-muted-foreground">Cargando categoría...</div>}>
      <CategoriaDetalleClient slug={slug} />
    </Suspense>
  );
}
