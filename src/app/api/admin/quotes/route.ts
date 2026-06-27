import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";

/** GET /api/admin/quotes — Lista cotizaciones con filtros */
export async function GET(req: NextRequest) {
  const access = await can("quote", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

  const where: any = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { reference: { contains: q } },
      { customerName: { contains: q } },
      { customerEmail: { contains: q } },
      { customerCompany: { contains: q } },
    ];
  }

  const [total, quotes] = await Promise.all([
    db.quote.count({ where }),
    db.quote.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        product: { select: { id: true, name: true, slug: true, sku: true } },
        assignedUser: { select: { id: true, name: true } },
      },
    }),
  ]);

  return NextResponse.json({
    data: quotes,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
