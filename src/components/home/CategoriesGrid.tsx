import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Banknote, ArrowRight, type LucideIcon, ShieldCheck } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { CATEGORIES } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * CategoriesGrid — Grid de categorías AMC con la primera destacada (doble altura).
 * Navegación rápida hacia /productos?categoria=.
 * Palabras clave: Control, Seguridad
 */
export function CategoriesGrid() {
  return (
    <section
      id="categorias"
      className="py-20 lg:py-28 bg-muted/40 scroll-mt-20"
    >
      <div className="container-amc">
        <SectionTitle
          overline="Catálogo"
          title="Soluciones de precisión para cada necesidad de efectivo"
          description="Desde contadoras de billetes con detección multi-sensorial hasta clasificadoras inteligentes. Encuentra el equipo que se adapta al volumen y tipo de operación de tu negocio."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {CATEGORIES.map((c, i) => {
            const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[c.icon] || Banknote;
            const isFeatured = c.featured;
            return (
              <Link
                key={c.slug}
                href={`/productos?categoria=${c.slug}`}
                className={cn(
                  "group relative overflow-hidden card-base card-hover p-7 flex flex-col text-center",
                  isFeatured && "lg:row-span-2 lg:justify-between",
                )}
              >
                <div>
                  <div className="flex flex-col items-center gap-3 mb-5">
                    <div className="w-14 h-14 rounded-lg bg-primary-tint text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-7 h-7" strokeWidth={1.6} />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                      {c.count} modelos
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary mt-6 group-hover:gap-2 transition-all">
                    Ver catálogo
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  {isFeatured && c.slug === "contadoras-de-billetes" && (
                    <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-success font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Detección UV + MG + IR</span>
                    </div>
                  )}
                </div>

                {/* Decorative element solo en la destacada */}
                {isFeatured && (
                  <div className="mt-6 aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                    <Banknote className="w-32 h-32 text-primary/30" strokeWidth={1} />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
