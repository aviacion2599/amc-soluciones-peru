import Link from "next/link";
import { FileText, MessageCircle } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * CTASection — Llamado a la acción final con gradiente AMC.
 * Dual CTA: Cotización formal + WhatsApp directo.
 */
export function CTASection() {
  return (
    <section id="cotizacion" className="py-20 lg:py-28 scroll-mt-20">
      <div className="container-amc">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-20" aria-hidden="true" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 20% 50%, rgba(255,255,255,0.12), transparent 50%)",
            }}
            aria-hidden="true"
          />

          <div className="relative px-8 py-14 lg:px-16 lg:py-20 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
            <div>
              <p className="overline text-sky-200 mb-4">Cotización sin compromiso</p>
              <h2 className="display-2 text-white mb-4 text-balance">
                ¿Listo para optimizar el manejo de efectivo de su negocio?
              </h2>
              <p className="text-sky-100 leading-relaxed max-w-xl">
                Reciba asesoría personalizada de nuestros especialistas y una propuesta
                técnica adaptada al volumen y las necesidades de su operación.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="#cotizacion-form"
                className="btn-primary px-6 py-4 text-base bg-white text-primary hover:bg-slate-100"
                style={{ backgroundColor: "white", color: "var(--primary)" }}
              >
                <FileText className="w-4 h-4" />
                Solicitar Cotización
              </Link>
              <a
                href={`https://wa.me/${AMCCONFIG.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass px-6 py-4 text-base"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp directo
              </a>
              <div className="text-center text-xs text-sky-200 mt-2">
                Respuesta en menos de 24 horas hábiles
              </div>
            </div>
          </div>
        </div>

        {/* Quote form embedded */}
        <div
          id="cotizacion-form"
          className="mt-12 grid lg:grid-cols-[0.7fr_1.3fr] gap-8 items-start scroll-mt-20"
        >
          <div>
            <h3 className="display-3 text-foreground mb-4">
              Completa el formulario
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuestro equipo de ventas revisará tu solicitud y te contactará con una
              propuesta personalizada. Sin compromiso, sin costo.
            </p>
            <ul className="space-y-3 text-sm">
              {[
                "Asesoría técnica personalizada",
                "Cotización detallada con specs",
                "Propuesta de financiamiento disponible",
                "Soporte postventa incluido",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-base p-6 lg:p-8">
            {/* Lazy-load QuoteForm to keep initial bundle lean */}
            <QuoteFormLazy />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Wrapper para import dinámico del QuoteForm (Fase 6 optimización) */
import dynamic from "next/dynamic";
const QuoteFormLazy = dynamic(
  () => import("@/components/shared/QuoteForm").then((m) => m.QuoteForm),
  {
    loading: () => (
      <div className="space-y-4 animate-pulse">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="h-10 bg-muted rounded-md" />
          <div className="h-10 bg-muted rounded-md" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="h-10 bg-muted rounded-md" />
          <div className="h-10 bg-muted rounded-md" />
        </div>
        <div className="h-24 bg-muted rounded-md" />
        <div className="h-12 bg-muted rounded-md w-1/2" />
      </div>
    ),
    ssr: true,
  },
);
