import Link from "next/link";
import { FileText, MessageCircle, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * CTASection — Llamado a la acción final con gradiente AMC.
 * Integra las 5 palabras clave: Precisión · Seguridad · Control · Confianza · Respaldo Técnico
 * Dual CTA: Cotización formal + WhatsApp directo + Formulario lazy-load.
 */
export function CTASection() {
  return (
    <section id="cotizacion" className="py-12 lg:py-16 2xl:py-24 scroll-mt-20">
      <div className="container-amc">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark via-primary to-primary-light">
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-20" aria-hidden="true" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 80% 50%, rgba(176, 176, 176, 0.1), transparent 50%)",
            }}
            aria-hidden="true"
          />

          <div className="relative px-8 py-14 lg:px-16 lg:py-20 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-5">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span className="overline text-sky-200">Cotización sin compromiso</span>
              </div>
              <h2 className="display-2 text-white mb-4 text-balance">
                ¿Listo para tener el control total de tu efectivo?
              </h2>
              <p className="text-sky-100 leading-relaxed max-w-xl mb-6">
                Recibe una propuesta personalizada con el equipo ideal para tu operación.
                Precisión certificada, seguridad multi-sensorial y el respaldo técnico de
                los mejores fabricantes del mundo.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-sky-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Respuesta en 24h
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Sin compromiso
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="#cotizacion-form"
                className="btn-primary px-6 py-4 text-base bg-white text-primary hover:bg-slate-100 hover:shadow-amc-xl transition-all inline-flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Solicitar Cotización
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${encodeURIComponent("Hola AMC, quiero una cotización personalizada para mi negocio.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass px-6 py-4 text-base inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp directo
              </a>
              <div className="text-center text-xs text-sky-200 mt-2">
                ⏱ Respuesta garantizada en menos de 24 horas hábiles
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
              Cuéntanos sobre tu operación
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
          Mientras más detalles nos des sobre tu volumen de efectivo, tipo de negocio y
          necesidades específicas, mejor podremos asesorarte con la solución ideal.
            </p>
            <ul className="space-y-3 text-sm">
              {[
                "Asesoría técnica personalizada sin costo",
                "Cotización detallada con especificaciones técnicas",
                "Propuesta de financiamiento adaptada a tu negocio",
                "Garantía oficial y soporte postventa incluido",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                  <span>{item}</span>
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
