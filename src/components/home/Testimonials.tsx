import { Quote, Star, MessageCircle } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { TESTIMONIALS, AMCCONFIG } from "@/lib/site-config";

/**
 * Testimonials — 3 testimonios de clientes con rating y avatar con iniciales.
 * Palabras clave: Confianza, Precisión, Respaldo Técnico
 */
export function Testimonials() {
  return (
    <section id="testimonios" className="py-20 lg:py-28 bg-surface-2">
      <div className="container-amc">
        <SectionTitle
          overline="Sectores atendidos"
          title="Soluciones para empresas que procesan efectivo"
          description="Atendemos empresas privadas, instituciones públicas, comercios y operaciones que requieren mayor precisión, seguridad y control en el manejo de billetes y monedas."
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-14">
          {TESTIMONIALS.map((t) => {
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);
            return (
              <figure key={t.name} className="card-base card-hover p-7 flex flex-col">
                <Quote className="w-8 h-8 text-primary/20 mb-4" aria-hidden="true" />
                <blockquote className="text-sm text-foreground leading-relaxed mb-6 flex-1">
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

        {/* Social proof footer */}
        <div className="text-center mt-10">
          <a
            href={`https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${encodeURIComponent("Hola AMC, me gustaría recibir referencias de clientes actuales.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            ¿Quieres conocer casos de éxito similares a tu negocio? Escríbenos
          </a>
        </div>
      </div>
    </section>
  );
}
