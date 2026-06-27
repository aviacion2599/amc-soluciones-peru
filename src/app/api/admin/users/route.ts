import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can, ROLES } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";
import bcrypt from "bcryptjs";

const userCreateSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(2).max(100),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  role: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES]),
  isActive: z.boolean().default(true),
});

const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).max(100).optional(),
  password: z.string().min(8).optional(),
  role: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES]).optional(),
  isActive: z.boolean().optional(),
});

/** GET /api/admin/users — Solo SUPER_ADMIN */
export async function GET() {
  const access = await can("user", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
      _count: {
        select: {
          quotes: true,
          contacts: true,
          auditLogs: true,
        },
      },
    },
  });

  return NextResponse.json({ data: users });
}

/** POST /api/admin/users — Crear usuario */
export async function POST(req: NextRequest) {
  const access = await can("user", "create");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const body = await req.json();
  const parsed = userCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const exists = await db.user.findUnique({
    where: { email: data.email.toLowerCase() },
  });
  if (exists) {
    return NextResponse.json({ error: "Email ya registrado" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await db.user.create({
    data: {
      email: data.email.toLowerCase(),
      name: data.name,
      passwordHash,
      role: data.role,
      isActive: data.isActive,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.CREATE_USER,
    entity: "user",
    entityId: user.id,
    metadata: { email: user.email, name: user.name, role: user.role },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ data: user }, { status: 201 });
}
