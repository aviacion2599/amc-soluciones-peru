import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  SALES: "SALES",
} as const;

export type UserRole = keyof typeof ROLES;

/**
 * Obtiene la sesión del servidor (App Router y Pages Router).
 */
export async function getSession() {
  return getServerSession(authOptions);
}

/**
 * Obtiene el usuario autenticado completo desde la DB.
 * Para uso en API routes donde se necesita validar isActive.
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  return db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      avatar: true,
    },
  });
}

/**
 * Verifica si el usuario actual tiene uno de los roles requeridos.
 * Para usar en API routes (App Router).
 */
export async function requireRole(roles: UserRole[]) {
  const user = await getCurrentUser();
  if (!user || !user.isActive) {
    return { ok: false as const, status: 401, error: "No autenticado" };
  }
  if (!roles.includes(user.role as UserRole)) {
    return { ok: false as const, status: 403, error: "Sin permisos suficientes" };
  }
  return { ok: true as const, user };
}

/**
 * Matriz de permisos por recurso y acción.
 */
const PERMISSIONS_MATRIX: Record<string, Record<string, UserRole[]>> = {
  product: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES],
    create: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    update: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  category: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES],
    create: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    update: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  brand: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES],
    create: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    update: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  quote: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES],
    update: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  contact: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES],
    update: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  user: {
    read: [ROLES.SUPER_ADMIN],
    create: [ROLES.SUPER_ADMIN],
    update: [ROLES.SUPER_ADMIN],
    delete: [ROLES.SUPER_ADMIN],
  },
  blog: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES],
    create: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    update: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  faq: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES],
    create: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    update: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  testimonial: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.SALES],
    create: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    update: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  config: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    update: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  audit: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
};

export async function can(
  resource: string,
  action: string,
): Promise<{ ok: true; user: NonNullUser } | { ok: false; status: number; error: string }> {
  const user = await getCurrentUser();
  if (!user || !user.isActive) {
    return { ok: false, status: 401, error: "No autenticado" };
  }
  const allowedRoles = PERMISSIONS_MATRIX[resource]?.[action];
  if (!allowedRoles) {
    return { ok: false, status: 403, error: "Acción no permitida" };
  }
  if (!allowedRoles.includes(user.role as UserRole)) {
    return { ok: false, status: 403, error: "Sin permisos suficientes" };
  }
  return { ok: true, user };
}

type NonNullUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;
