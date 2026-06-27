import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";
import bcrypt from "bcryptjs";

const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).max(100).optional(),
  password: z.string().min(8).optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR", "SALES"]).optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("user", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  const existing = await db.user.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  // Evitar que SUPER_ADMIN se degrade a sí mismo (bloqueo accidental)
  if (
    existing.role === "SUPER_ADMIN" &&
    access.user.id === id &&
    (req as any).body?.role &&
    (req as any).body.role !== "SUPER_ADMIN"
  ) {
    return NextResponse.json(
      { error: "No puedes cambiar tu propio rol de SUPER_ADMIN" },
      { status: 400 },
    );
  }

  const body = await req.json();
  const parsed = userUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (data.email && data.email !== existing.email) {
    const dup = await db.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (dup) {
      return NextResponse.json({ error: "Email ya en uso" }, { status: 409 });
    }
  }

  const updateData: any = { ...data };
  if (updateData.email) updateData.email = updateData.email.toLowerCase();
  if (updateData.password) {
    updateData.passwordHash = await bcrypt.hash(updateData.password, 12);
    delete updateData.password;
  }

  const user = await db.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      updatedAt: true,
    },
  });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.UPDATE_USER,
    entity: "user",
    entityId: id,
    metadata: {
      before: { email: existing.email, name: existing.name, role: existing.role, isActive: existing.isActive },
      after: { email: user.email, name: user.name, role: user.role, isActive: user.isActive },
    },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ data: user });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await can("user", "delete");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { id } = await params;
  if (id === access.user.id) {
    return NextResponse.json(
      { error: "No puedes eliminar tu propia cuenta" },
      { status: 400 },
    );
  }

  const existing = await db.user.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  // Soft delete (desactivar)
  await db.user.update({ where: { id }, data: { isActive: false } });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.DELETE_USER,
    entity: "user",
    entityId: id,
    metadata: { email: existing.email, name: existing.name },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ message: "Usuario desactivado" });
}
