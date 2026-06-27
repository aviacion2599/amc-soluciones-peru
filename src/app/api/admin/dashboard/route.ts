import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";

/**
 * GET /api/admin/dashboard
 * KPIs para el dashboard admin: totales + pendientes + recientes.
 */
export async function GET() {
  const access = await can("quote", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const [
    totalProducts,
    activeProducts,
    totalCategories,
    totalBrands,
    pendingQuotes,
    newContacts,
    totalQuotes,
    totalContacts,
    publishedPosts,
    totalUsers,
    recentQuotes,
    recentContacts,
  ] = await Promise.all([
    db.product.count(),
    db.product.count({ where: { isActive: true } }),
    db.category.count({ where: { isActive: true } }),
    db.brand.count({ where: { isActive: true } }),
    db.quote.count({ where: { status: "PENDING" } }),
    db.contact.count({ where: { status: "new" } }),
    db.quote.count(),
    db.contact.count(),
    db.blogPost.count({ where: { isPublished: true } }),
    db.user.count({ where: { isActive: true } }),
    db.quote.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        product: { select: { name: true, slug: true } },
      },
    }),
    db.contact.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        source: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    data: {
      stats: {
        totalProducts,
        activeProducts,
        totalCategories,
        totalBrands,
        pendingQuotes,
        newContacts,
        totalQuotes,
        totalContacts,
        publishedPosts,
        totalUsers,
      },
      recent: {
        quotes: recentQuotes,
        contacts: recentContacts,
      },
    },
  });
}
