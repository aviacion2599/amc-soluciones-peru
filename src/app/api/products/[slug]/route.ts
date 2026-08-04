import { NextRequest, NextResponse } from "next/server";
import { STATIC_PRODUCTS } from "@/lib/static-data";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { PRODUCT_BY_SLUG_QUERY, RELATED_PRODUCTS_QUERY } from "@/sanity/lib/queries";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

function getRelatedProducts(slug: string, staticProduct: any) {
  const RELATED_MAP: Record<string, string[]> = {
    "amc-2000": ["amc-3200", "amc-8100"],
    "amc-3200": ["amc-2000", "amc-8100"],
    "amc-8100": ["amc-3200", "amc-2000"],
    "amc-8200": ["amc-9100", "amc-9200"],
    "amc-9100": ["amc-8200", "amc-9200"],
    "amc-9200": ["amc-9100", "amc-8200"],
  };
  
  if (RELATED_MAP[slug]) {
     return RELATED_MAP[slug].map(rs => STATIC_PRODUCTS.find(p => p.slug === rs)).filter(Boolean);
  }
  
  if (staticProduct && staticProduct.category) {
     return STATIC_PRODUCTS.filter(
        (p) => p.category.slug === staticProduct.category.slug && p.slug !== slug,
     ).slice(0, 4);
  }
  
  return [];
}

/**
 * GET /api/products/[slug]
 * Retrieve product details, falling back to static data when needed.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const staticProduct = STATIC_PRODUCTS.find((p) => p.slug === slug);

    // Try fetching from Sanity first
    let product = await sanityFetch<any>({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });

    if (!product) {
      // Fallback to static data (same as before)
      if (staticProduct) {
        return NextResponse.json({
          data: {
            ...staticProduct,
            description: staticProduct.summary,
            category: {
              slug: staticProduct.category.slug,
              name: staticProduct.category.name,
              description: "",
              icon: "Banknote",
            },
            subcategory: null,
            brand: staticProduct.brand
              ? { slug: staticProduct.brand.slug, name: staticProduct.brand.name, logo: null }
              : null,
            images: staticProduct.images || [],
            videos: staticProduct.videos || [],
            documents: staticProduct.documents || [],
            features: staticProduct.features || [],
            specifications: staticProduct.specifications || [],
            applications: staticProduct.applications || [],
          },
          related: getRelatedProducts(slug, staticProduct),
        });
      }

      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }

    // Merge missing fields from static data to avoid breaking the frontend
    if (staticProduct) {
      if (!product.category || !product.category.name) {
        product.category = staticProduct.category;
      }
      if (!product.images || product.images.length === 0) {
        product.images = staticProduct.images || [];
      } else {
        // Sort Sanity images so the primary one is always first
        product.images.sort((a: any, b: any) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
      }
      if (!product.videos || product.videos.length === 0) product.videos = staticProduct.videos || [];
      if (!product.brand || !product.brand.name) {
        product.brand = staticProduct.brand
          ? { slug: staticProduct.brand.slug, name: staticProduct.brand.name, logo: null }
          : null;
      }
      if (!product.documents || product.documents.length === 0) product.documents = staticProduct.documents || [];
      if (!product.features || product.features.length === 0) product.features = staticProduct.features || [];
      if (!product.specifications || product.specifications.length === 0) product.specifications = staticProduct.specifications || [];
      if (!product.applications || product.applications.length === 0) product.applications = staticProduct.applications || [];
    }

    return NextResponse.json({ data: product, related: getRelatedProducts(slug, staticProduct) });
  } catch (error) {
    console.error("[api/products/[slug]] Error:", error);
    // Fallback to static data on any error
    try {
      const { slug } = await params;
      const staticProduct = STATIC_PRODUCTS.find((p) => p.slug === slug);
      if (staticProduct) {
        return NextResponse.json({
          data: {
            ...staticProduct,
            description: staticProduct.summary,
            category: { slug: staticProduct.category.slug, name: staticProduct.category.name, description: "", icon: "Banknote" },
            subcategory: null,
            brand: staticProduct.brand ? { slug: staticProduct.brand.slug, name: staticProduct.brand.name, logo: null } : null,
            images: staticProduct.images || [],
            videos: staticProduct.videos || [],
            documents: staticProduct.documents || [],
            features: staticProduct.features || [],
            specifications: staticProduct.specifications || [],
            applications: staticProduct.applications || [],
          },
          related: getRelatedProducts(slug, staticProduct),
          debug_error: String(error)
        });
      }
    } catch (e: any) {
      console.error("[api/products/[slug]] Fallback error:", e);
      return NextResponse.json({ error: "Error al obtener el producto", details: String(e), debug_error: String(error) }, { status: 500 });
    }
    return NextResponse.json({ error: "Error al obtener el producto", details: "No static product found", debug_error: String(error) }, { status: 500 });
  }
}