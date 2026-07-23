import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { STATIC_PRODUCTS } from "@/lib/static-data";

/**
 * GET /api/products/[slug]
 * Detalle público de un producto por slug.
 * Falls back to static data when DB is empty.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  console.log("START API", req.nextUrl.pathname);
  try {
    const { slug } = await params;

    let product: any = null;
    try {
      product = await db.product.findUnique({
        where: { slug, isActive: true },
        include: {
          category: {
            select: { slug: true, name: true, description: true, icon: true },
          },
          subcategory: { select: { slug: true, name: true } },
          brand: { select: { slug: true, name: true, logo: true } },
          images: {
            orderBy: [{ isPrimary: "desc" }, { order: "asc" }],
          },
          videos: { orderBy: { order: "asc" } },
          documents: { orderBy: { createdAt: "desc" } },
          features: { orderBy: { order: "asc" } },
          specifications: { orderBy: [{ group: "asc" }, { order: "asc" }] },
          applications: { orderBy: { order: "asc" } },
        },
      });
    } catch (dbError) {
      console.error("[api/products/[slug]] DB Error:", dbError);
    }

    if (!product) {
      // Fallback to static data
      const staticProduct = STATIC_PRODUCTS.find((p) => p.slug === slug);
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

    // Productos relacionados (misma categoría, excluyendo el actual)
    const related = await db.product.findMany({
      where: {
        categoryId: product.categoryId,
        isActive: true,
        id: { not: product.id },
      },
      take: 4,
      orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        summary: true,
        price: true,
        isFeatured: true,
        isNew: true,
        images: {
          where: { isPrimary: true },
          take: 1,
          select: { url: true, alt: true },
        },
      },
    });

    return NextResponse.json({
      data: product,
      related,
    });
  } catch (error) {
    console.error("[api/products/[slug]] Error:", error);
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