import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

/**
 * NextAuth.js v4 — Configuración AMC Enterprise.
 * Estrategia JWT con Credentials Provider.
 * 4 roles: SUPER_ADMIN | ADMIN | EDITOR | SALES.
 * Bloqueo de cuenta tras 5 intentos fallidos.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son obligatorios");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user) {
          throw new Error("Credenciales inválidas");
        }

        if (!user.isActive) {
          throw new Error("Cuenta desactivada. Contacte al administrador.");
        }

        // Bloqueo temporal por intentos fallidos
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          const mins = Math.ceil(
            (user.lockedUntil.getTime() - Date.now()) / 60000,
          );
          throw new Error(
            `Cuenta bloqueada. Intente nuevamente en ${mins} minuto(s).`,
          );
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );

        if (!isValid) {
          // Incrementar contador y bloquear tras 5 intentos
          const attempts = user.failedLoginAttempts + 1;
          const shouldLock = attempts >= 5;
          await db.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: attempts,
              lockedUntil: shouldLock
                ? new Date(Date.now() + 15 * 60 * 1000) // 15 min
                : null,
            },
          });

          // Audit log
          await db.auditLog.create({
            data: {
              userId: user.id,
              action: "LOGIN_FAILED",
              entity: "user",
              entityId: user.id,
              metadata: JSON.stringify({ attempts }),
            },
          });

          throw new Error(
            shouldLock
              ? "Cuenta bloqueada por 5 intentos fallidos. Intente en 15 minutos."
              : `Credenciales inválidas. Intento ${attempts}/5.`,
          );
        }

        // Reset contador y registrar login exitoso
        await db.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
          },
        });

        await db.auditLog.create({
          data: {
            userId: user.id,
            action: "LOGIN_SUCCESS",
            entity: "user",
            entityId: user.id,
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
    updateAge: 60 * 60, // Refresca cada 1h
  },

  jwt: {
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "";
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Tipos extendidos para sesión con rol
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
