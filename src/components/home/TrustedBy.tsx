import { Building2, Store, Stethoscope, Factory, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { TRUSTED_COMPANIES } from "@/lib/site-config";

/**
 * TrustedBy — Strip horizontal con logos/nombres de empresas que confían en AMC.
 * Refuerza credibilidad institucional B2B.
 */
export function TrustedBy() {
  return (
    <section className="border-y border-border bg-muted/40 py-10" aria-label="Empresas que confían en AMC">
      <div className="container-amc">
        <p className="overline text-muted-foreground text-center mb-6">
          Confianza institucional · Más de 2,500 equipos instalados
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
