import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";

const contactUpdateSchema = z.object({
  status: z.enum(["new", "read", "replied", "archived"]).optional(),
  userId: z.string().cuid().optional().or(z.literal("")).nullable(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("contact", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const contact = await db.contact.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true } } },
  });

  if (!contact) {
    return NextResponse.json({ error: "Contacto no encontrado" }, { status: 404 });
  }

  // Marcar como leído si estaba new
  if (contact.status === "new") {
    await db.contact.update({ where: { id }, data: { status: "read" } });
  }

  return NextResponse.json({ data: contact });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("contact", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.contact.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Contacto no encontrado" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = contactUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const cleanData: any = { ...data };
  if (cleanData.userId === "") cleanData.userId = null;

  const contact = await db.contact.update({ where: { id }, data: cleanData });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.UPDATE_CONTACT_STATUS,
    entity: "contact",
    entityId: id,
    metadata: { before: existing, after: contact },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ data: contact });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("contact", "delete");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.contact.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Contacto no encontrado" }, { status: 404 });
  }

  await db.contact.delete({ where: { id } });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.DELETE_CONTACT,
    entity: "contact",
    entityId: id,
    metadata: { name: existing.name, email: existing.email },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ message: "Contacto eliminado" });
}
