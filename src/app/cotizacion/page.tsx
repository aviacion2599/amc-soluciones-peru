"use client";

import { FileText, MessageCircle, CheckCircle2, ShieldCheck, Clock, Zap } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { QuoteForm } from "@/components/shared/QuoteForm";

const BENEFITS = [
  { icon: Clock, title: "Respuesta en 24h", desc: "Nuestro equipo de ventas revisa tu solicitud y te contacta en menos de 24 horas hábiles." },
  { icon: ShieldCheck, title: "Sin compromiso", desc: "La cotización es gratuita y no te compromete a comprar. Toma la decisión con calma." },
  { icon: Zap, title: "Propuesta personalizada", desc: "Analizamos tu volumen operativo y te recomendamos el equipo ideal para tu negocio." },
  { icon: CheckCircle2, title: "Soporte incluido", desc: "Toda cotización incluye garantía oficial, capacitación y soporte postventa." },
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
            <div className="space-y-4">
              <div>
                <h2 className="font-display font-bold text-xl mb-2">¿Por qué cotizar con AMC?</h2>
                <p className="text-sm text-muted-foreground">
                  No solo te damos un precio. Te asesoramos para que elijas el equipo correcto según tu volumen, divisas y entorno operativo.
                </p>
              </div>

              <div className="space-y-3">
                {BENEFITS.map((benefit) => (
                  <div key={benefit.title} className="card-base p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-sm mb-1">{benefit.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-base p-5 bg-primary-tint border-primary/20">
                <h3 className="font-display font-semibold text-sm text-primary mb-2">
                  Métodos de pago aceptados
                </h3>
                <ul className="text-xs text-foreground space-y-1.5">
                  <li>• Transferencia bancaria (BCP, Interbank, BBVA)</li>
                  <li>• Tarjetas Visa, Mastercard, Amex (Mercado Pago)</li>
                  <li>• Yape / Plin (montos menores)</li>
                  <li>• Crédito empresarial 30/60/90 días</li>
                  <li>• Financiamiento con bancos aliados</li>
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
