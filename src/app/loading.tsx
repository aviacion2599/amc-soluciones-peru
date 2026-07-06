import { Loader2 } from "lucide-react";

/**
 * Loading global — se muestra durante la navegación entre páginas.
 * Diseño coherente con el brand AMC.
 */
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    </div>
  );
}