"use client";

import { FileText, MessageCircle, CheckCircle2, ShieldCheck, Clock, Zap } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { QuoteForm } from "@/components/shared/QuoteForm";

const BENEFITS = [
  { icon: Clock, title: "Atención personalizada", desc: "Un asesor evaluará tu necesidad y te ayudará a elegir el equipo adecuado." },
  { icon: Zap, title: "Recomendación profesional", desc: "Te recomendamos el modelo ideal según tu volumen de efectivo y tipo de operación." },
  { icon: ShieldCheck, title: "Demostración del equipo", desc: "Conoce el funcionamiento mediante videos o una demostración coordinada." },
  { icon: CheckCircle2, title: "Respaldo técnico AMC", desc: "Nuestros equipos incluyen garantía, capacitación y soporte técnico postventa." },
];

export default function CotizacionPage() {
  return (
    <PageTransition>
      <PageHero
        overline="Solicitar cotización"
        title={(
          <span>
            Recibe una propuesta{" "}
            <span className="bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
              personalizada
            </span>{" "}
            en 24 horas
          </span>
        )}
        description="Cuéntanos sobre tu operación y te enviaremos una cotización detallada con el equipo ideal, precios, plazos de entrega y opciones de financiamiento."
        icon={FileText}
      />

      <div className="container-amc py-10">
        <Breadcrumb items={[{ label: "Cotización" }]} />
      </div>

      <section className="container-amc pb-20">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          {/* Benefits sidebar */}
          <FadeIn>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h2 className="font-display font-bold text-xl mb-2">¿Por qué cotizar con AMC?</h2>
                <p className="text-sm text-muted-foreground">
                  No solo te enviamos un precio. Analizamos tu operación para recomendarte la contadora de billetes que mejor se adapta a tu negocio.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {BENEFITS.map((benefit) => (
                  <div key={benefit.title} className="card-base p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">{benefit.title}</h3>
                        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-base p-4 sm:p-5 bg-primary-tint border-primary/20">
                <h3 className="font-display font-semibold text-xs sm:text-sm text-primary mb-2">
                  Métodos de pago aceptados
                </h3>
                <ul className="text-[11px] sm:text-xs text-foreground space-y-1 sm:space-y-1.5">
                  <li>• Transferencia bancaria (BCP, Interbank)</li>
                  <li>• Tarjetas Visa, Mastercard y American Express mediante Mercado Pago</li>
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.1}>
            <div className="card-base p-6 lg:p-8">
              <h2 className="font-display font-bold text-xl mb-2">Completa el formulario</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Los campos con * son obligatorios. Mientras más detalle nos des, mejor podremos asesorarte.
              </p>
              <QuoteForm source="cotizacion" />
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
