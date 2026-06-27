import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Middleware de protección de rutas.
 * Protege /admin/* — requiere sesión activa.
 * Cualquier rol puede acceder al panel (los permisos finos se validan en cada API).
 */
export default withAuth(
  function middleware(_req) {
    // Aquí se podrían agregar validaciones adicionales (rate limit, headers, etc.)
    return NextResponse.next();
  },
  {
    callbacks: {
      authenticated: ({ token }) => !!token,
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
