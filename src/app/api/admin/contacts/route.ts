import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";

/** GET /api/admin/contacts */
export async function GET(req: NextRequest) {
  const access = await can("contact", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const source = searchParams.get("source");
  const q = searchParams.get("q")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

  const where: any = {};
  if (status) where.status = status;
  if (source) where.source = source;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { subject: { contains: q } },
    ];
  }

  const [total, contacts] = await Promise.all([
    db.contact.count({ where }),
    db.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { user: { select: { id: true, name: true } } },
    }),
  ]);

  return NextResponse.json({
    data: contacts,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
