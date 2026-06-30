import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Banknote, ArrowRight, type LucideIcon } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { CATEGORIES } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * CategoriesGrid — Grid de categorías AMC con la primera destacada (doble altura).
 * Navegación rápida hacia /productos/[categoria].
 */
export function CategoriesGrid() {
  return (
    <section
      id="categorias"
      className="py-20 lg:py-28 bg-muted/40 border-y border-border scroll-mt-20"
    >
      <div className="container-amc">
        <SectionTitle
          overline="Catálogo"
          title="Categorías especializadas en manejo de efectivo"
          description="Explora nuestra gama completa de equipos para conteo, clasificación, detección y mantenimiento de billetes y monedas."
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
                  "group relative overflow-hidden card-base card-hover p-7 flex flex-col",
                  isFeatured && "lg:row-span-2 lg:justify-between",
                )}
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
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
                <div className="flex items-center gap-1 text-sm font-semibold text-primary mt-6 group-hover:gap-2 transition-all">
                  Ver catálogo
                  <ArrowRight className="w-4 h-4" />
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
