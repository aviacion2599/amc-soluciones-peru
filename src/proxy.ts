import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Proxy de protección de rutas (Next.js 16 — convención "proxy").
 * Protege /admin/* — requiere sesión activa.
 * Cualquier rol puede acceder al panel (los permisos finos se validan en cada API).
 */
export default withAuth(
  function proxy(_req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  },
);

export const config = {
  // Solo protegemos páginas admin con redirect.
  // Las API /api/admin/* se protegen internamente con can() que devuelve 401 JSON.
  matcher: ["/admin/:path*"],
};
