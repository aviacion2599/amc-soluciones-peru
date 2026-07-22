import { Building2, Store, Stethoscope, Factory, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { TRUSTED_COMPANIES } from "@/lib/site-config";

/**
 * TrustedBy — Strip horizontal con logos/nombres de empresas que confían en AMC.
 * Refuerza credibilidad institucional B2B.
 */
export function TrustedBy() {
  return (
    <section id="confianza" className="bg-muted/40 py-8 lg:py-16" aria-label="Sectores atendidos">
      <div className="container-amc">
        <p className="overline text-muted-foreground text-center mb-3">
          Sectores atendidos
        </p>
        <h2 className="font-display font-bold text-2xl text-center mb-2">
          Soluciones para empresas que procesan efectivo
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Atendemos empresas privadas, instituciones públicas, comercios y operaciones que requieren mayor precisión, seguridad y control en el manejo de billetes y monedas.
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {TRUSTED_COMPANIES.map((c) => {
            const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[c.icon] || Building2;
            return (
              <li
                key={c.name}
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />
                <span className="font-display font-semibold text-sm">{c.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
