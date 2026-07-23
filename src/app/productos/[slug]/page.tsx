import type { Metadata } from "next";
import { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Generate static metadata for SEO. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  let product = null;
  try {
    product = await db.product.findUnique({
      where: { slug, isActive: true },
      select: {
        name: true,
        summary: true,
        seoTitle: true,
        seoDescription: true,
        seoKeywords: true,
        ogImage: true,
        canonicalUrl: true,
        sku: true,
      },
    });
  } catch (error) {
    console.error("[generateMetadata] DB Error:", error);
  }

  if (!product) {
    // Fallback to static data if DB fails or product not found
    const { STATIC_PRODUCTS } = await import("@/lib/static-data");
    const staticProduct = STATIC_PRODUCTS.find((p) => p.slug === slug);
    
    if (staticProduct) {
      product = {
        name: staticProduct.name,
        summary: staticProduct.summary,
        seoTitle: null,
        seoDescription: null,
        seoKeywords: null,
        ogImage: null,
        canonicalUrl: null,
        sku: staticProduct.sku,
      };
    } else {
      return {
        title: "Producto no encontrado",
        robots: { index: false, follow: false },
      };
    }
  }

  return {
    title: product.seoTitle || `${product.name} | AMC Soluciones Perú`,
    description: product.seoDescription || product.summary,
    keywords: product.seoKeywords?.split(",").map((k) => k.trim()) || [],
    alternates: {
      canonical: product.canonicalUrl || `/productos/${slug}`,
    },
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.summary,
      type: "website",
      images: product.ogImage ? [{ url: product.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.summary,
    },
  };
}

/** Generate static params for SSG (pre-renderiza los productos activos). */
export async function generateStaticParams() {
  try {
    const products = await db.product.findMany({
      where: { isActive: true },
      select: { slug: true },
    });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Suspense
      fallback={
        <div className="container-amc py-20">
          <div className="text-sm text-muted-foreground">Cargando producto...</div>
        </div>
      }
    >
      <ProductDetailClient slug={slug} />
    </Suspense>
  );
}
