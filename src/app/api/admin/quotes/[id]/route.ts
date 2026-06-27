import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";

const quoteUpdateSchema = z.object({
  status: z
    .enum(["PENDING", "CONTACTED", "QUOTED", "WON", "LOST", "ARCHIVED"])
    .optional(),
  assignedTo: z.string().cuid().optional().or(z.literal("")).nullable(),
  notes: z.string().max(5000).optional().or(z.literal("")).nullable(),
});

/** GET /api/admin/quotes/[id] — Detalle con producto relacionado */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("quote", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const quote = await db.quote.findUnique({
    where: { id },
    include: {
      product: {
        select: { id: true, name: true, slug: true, sku: true, price: true },
      },
      assignedUser: { select: { id: true, name: true, email: true } },
    },
  });

  if (!quote) {
    return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ data: quote });
}

/** PUT /api/admin/quotes/[id] — Actualizar status / asignación / notas */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("quote", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.quote.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = quoteUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const cleanData: any = { ...data };
  if (cleanData.assignedTo === "") cleanData.assignedTo = null;
  if (cleanData.notes === "") cleanData.notes = null;

  const quote = await db.quote.update({ where: { id }, data: cleanData });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.UPDATE_QUOTE_STATUS,
    entity: "quote",
    entityId: id,
    metadata: { before: existing, after: quote },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ data: quote });
}

/** DELETE /api/admin/quotes/[id] */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("quote", "delete");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.quote.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
  }

  await db.quote.delete({ where: { id } });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.DELETE_QUOTE,
    entity: "quote",
    entityId: id,
    metadata: { reference: existing.reference },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ message: "Cotización eliminada" });
}
