import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";

/**
 * GET /api/admin/audit
 * Lista de audit logs con filtros.
 */
export async function GET(req: NextRequest) {
  const access = await can("audit", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const action = searchParams.get("action");
  const entity = searchParams.get("entity");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));

  const where: any = {};
  if (userId) where.userId = userId;
  if (action) where.action = action;
  if (entity) where.entity = entity;

  const [total, logs] = await Promise.all([
    db.auditLog.count({ where }),
    db.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    }),
  ]);

  return NextResponse.json({
    data: logs,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
