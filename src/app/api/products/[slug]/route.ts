import { NextRequest, NextResponse } from "next/server";
import { STATIC_PRODUCTS } from "@/lib/static-data";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { PRODUCT_BY_SLUG_QUERY, RELATED_PRODUCTS_QUERY } from "@/sanity/lib/queries";

export const dynamic = 'force-dynamic';

/**
 * GET /api/products/[slug]
 * Retrieve product details, falling back to static data when needed.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  console.log("START API", req.nextUrl.pathname);
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
          related: STATIC_PRODUCTS.filter(
            (p) => p.category.slug === staticProduct.category.slug && p.slug !== slug,
          ).slice(0, 4),
        });
      }

      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }

    // Merge missing fields from static data to avoid breaking the frontend
    // if Sanity doesn't have images, categories, specs, etc. yet.
    if (staticProduct) {
      if (!product.category || !product.category.name) {
        product.category = {
          slug: staticProduct.category.slug,
          name: staticProduct.category.name,
          description: "",
          icon: "Banknote",
        };
      }
      if (!product.brand || !product.brand.name) {
        product.brand = staticProduct.brand
          ? { slug: staticProduct.brand.slug, name: staticProduct.brand.name, logo: null }
          : null;
      }
      if (!product.images || product.images.length === 0) product.images = staticProduct.images || [];
      if (!product.videos || product.videos.length === 0) product.videos = staticProduct.videos || [];
      if (!product.documents || product.documents.length === 0) product.documents = staticProduct.documents || [];
      if (!product.features || product.features.length === 0) product.features = staticProduct.features || [];
      if (!product.specifications || product.specifications.length === 0) product.specifications = staticProduct.specifications || [];
      if (!product.applications || product.applications.length === 0) product.applications = staticProduct.applications || [];
    }

    // Fetch related products from Sanity (same category, exclude current)
    let related = await sanityFetch<any[]>({
      query: RELATED_PRODUCTS_QUERY,
      params: { categorySlug: product.category?.slug || "", currentSlug: slug },
    });
    
    // If no related products in Sanity yet, fallback to static
    if ((!related || related.length === 0) && staticProduct) {
       related = STATIC_PRODUCTS.filter(
          (p) => p.category.slug === staticProduct.category.slug && p.slug !== slug,
       ).slice(0, 4) as any[];
    }

    return NextResponse.json({ data: product, related });
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
          related: STATIC_PRODUCTS.filter((p) => p.category.slug === staticProduct.category.slug && p.slug !== slug).slice(0, 4),
        });
      }
    } catch (e: any) {
      console.error("[api/products/[slug]] Fallback error:", e);
      return NextResponse.json({ error: "Error al obtener el producto", details: String(e) }, { status: 500 });
    }
    return NextResponse.json({ error: "Error al obtener el producto", details: "No static product found" }, { status: 500 });
  }
}