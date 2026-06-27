import { Quote, Star } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { TESTIMONIALS } from "@/lib/site-config";

/**
 * Testimonials — 3 testimonios de clientes con rating y avatar con iniciales.
 */
export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-muted/40 border-y border-border">
      <div className="container-amc">
        <SectionTitle
          overline="Testimonios"
          title="Lo que dicen las empresas que confían en AMC"
          description="Más de 2,500 equipos instalados en operaciones críticas a lo largo del país."
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-14">
          {TESTIMONIALS.map((t) => {
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);
            return (
              <figure key={t.name} className="card-base card-hover p-7">
                <Quote className="w-8 h-8 text-primary/30 mb-4" aria-hidden="true" />
                <blockquote className="text-sm text-foreground leading-relaxed mb-6">
                  “{t.content}”
                </blockquote>

                {/* Rating */}
                <div
                  className="flex items-center gap-0.5 mb-4"
                  role="img"
                  aria-label={`Calificación: ${t.rating} de 5 estrellas`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>

                <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-primary-tint text-primary flex items-center justify-center font-display font-bold text-sm">
                    {initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.position} · {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
