"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

/**
 * 404 — Página no encontrada.
 * SEO: retorna status 404 implícitamente por Next.js.
 * Diseño: coherente con el design system AMC.
 */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0, 51, 102, 0.06), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative text-center max-w-lg mx-auto">
        {/* Error code */}
        <div className="font-display text-[8rem] sm:text-[10rem] leading-none font-bold text-primary/10 select-none">
          404
        </div>

        {/* Content */}
        <div className="-mt-16 sm:-mt-20">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-warning" aria-hidden="true" />
            <span className="overline text-muted-foreground">Página no encontrada</span>
          </div>

          <h1 className="display-2 mb-4 text-balance">
            Esta página ya no existe o fue movida
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
            Lo sentimos, la página que buscas no se encuentra disponible. Puede que
            haya sido eliminada, cambiada de nombre o que la URL sea incorrecta.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="btn-primary px-6 py-3 text-sm"
            >
              <Home className="w-4 h-4" />
              Ir al Inicio
            </Link>
            <Link
              href="/productos"
              className="btn-outline px-6 py-3 text-sm"
            >
              <Search className="w-4 h-4" />
              Ver Productos
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-ghost px-6 py-3 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}