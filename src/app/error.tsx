"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Error boundary global — captura errores de renderizado.
 * Muestra UI amigable en vez de la página de error por defecto de Next.js.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-error-light text-error flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="display-3 mb-3">Algo salió mal</h1>

        <p className="text-muted-foreground leading-relaxed mb-8">
          Ocurrió un error inesperado al cargar esta página. Intenta
          recargar o vuelve al inicio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={reset}
            className="btn-primary px-6 py-3 text-sm"
          >
            <RotateCw className="w-4 h-4" />
            Intentar de nuevo
          </Button>
          <a href="/" className="btn-outline px-6 py-3 text-sm">
            <Home className="w-4 h-4" />
            Ir al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}