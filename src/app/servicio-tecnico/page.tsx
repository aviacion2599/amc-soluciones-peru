"use client";

import * as React from "react";
import Link from "next/link";
import {
  Wrench,
  Gauge,
  Cpu,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  Clock,
  Banknote,
  Coins,
  ScanLine,
  Settings2,
  Phone,
  Mail,
} from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AMCCONFIG } from "@/lib/site-config";

const SERVICES = [
  {
    code: "S-01",
    icon: Wrench,
    title: "Reparación",
    description: "Diagnóstico y reparación de cualquier falla mecánica o electrónica. Usamos repuestos originales del fabricante con trazabilidad total.",
    features: ["Diagnóstico gratuito", "Repuestos originales", "Garantía de reparación 90 días", "Reporte técnico detallado"],
  },
  {
    code: "S-02",
    icon: Gauge,
    title: "Calibración",
    description: "Ajuste de precisión certificado bajo estándares de fábrica. Recomendado cada 6 meses para uso intensivo o cada 12 meses para uso regular.",
    features: ["Calibración con patrón certificado", "Certificado de calibración", "Ajuste de sensores UV/MG/IR", "Pruebas de validación"],
  },
  {
    code: "S-03",
    icon: Cpu,
    title: "Diagnóstico",
    description: "Auditoría técnica completa del estado del equipo. Identificamos desgaste, fallas potenciales y recomendaciones de mantenimiento.",
    features: ["Evaluación de 30 puntos", "Reporte fotográfico", "Estimación de vida útil", "Plan de mantenimiento recomendado"],
  },
  {
    code: "S-04",
    icon: ShieldCheck,
    title: "Mantenimiento Preventivo",
    description: "Planes programados trimestrales, semestrales o anuales según el volumen de operación. Reduce hasta 80% las fallas inesperadas.",
    features: ["Visitas programadas", "Limpieza profunda", "Lubricación de partes móviles", "Calibración incluida", "Descuento en repuestos"],
  },
  {
    code: "S-05",
    icon: Award,
    title: "Garantía Oficial",
    description: "Soporte de garantía del fabricante durante todo el período vigente. Tramitamos directamente con GLORY u otras marcas representadas.",
    features: ["Validación de garantía", "Trámite con fabricante", "Reemplazo temporal", "Sin costo para el cliente"],
  },
  {
    code: "S-06",
    icon: Zap,
    title: "Soporte Express",
    description: "Atención prioritaria con respuesta en menos de 24 horas hábiles en Lima Metropolitana. Ideal para operaciones críticas que no pueden detenerse.",
    features: ["Respuesta < 24h", "Técnico dedicado", "Atención fuera de horario", "Prioridad en repuestos"],
  },
];

const EQUIPMENT_TYPES = [
  { icon: Banknote, name: "Contadoras de Billetes", brands: "GLORY, Hyundai, Henry, Cassida, Royal Sovereign" },
  { icon: Coins, name: "Contadoras de Monedas", brands: "GLORY, Henry, AMC" },
  { icon: ScanLine, name: "Clasificadoras", brands: "GLORY, CashScan" },
  { icon: Settings2, name: "Detectores", brands: "Todas las marcas" },
];

const PROCESS = [
  {
    number: "01",
    title: "Contacto inicial",
    description: "Nos contactas por WhatsApp, teléfono o el formulario. Describimos el problema y agendamos una visita o recepción del equipo.",
  },
  {
    number: "02",
    title: "Diagnóstico técnico",
    description: "Nuestro técnico certificado realiza una evaluación completa del equipo y emite un diagnóstico con presupuesto detallado.",
  },
  {
    number: "03",
    title: "Aprobación y reparación",
    description: "Tras tu aprobación, ejecutamos la reparación con repuestos originales. Tiempo promedio: 24-72 horas según el caso.",
  },
  {
    number: "04",
    title: "Pruebas y entrega",
    description: "Realizamos pruebas de calibración y validación. Entregamos el equipo con reporte técnico y garantía de servicio.",
  },
];

const PLANS = [
  {
    name: "Básico",
    price: "S/ 180",
    period: "por visita",
    description: "Mantenimiento preventivo puntual",
    features: [
      "Limpieza profunda del equipo",
      "Lubricación de partes móviles",
      "Revisión de sensores",
      "Calibración básica",
      "Reporte técnico",
      "Garantía de servicio 30 días",
    ],
    cta: "Solicitar Básico",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "S/ 540",
    period: "por trimestre",
    description: "Plan trimestral para uso intensivo",
    features: [
      "4 visitas programadas al año",
      "Todo lo del plan Básico",
      "Calibración avanzada certificada",
      "Descuento 15% en repuestos",
      "Soporte telefónico prioritario",
      "Garantía extendida 90 días",
    ],
    cta: "Solicitar Premium",
    highlighted: true,
  },
  {
    name: "Empresarial",
    price: "Cotización",
    period: "personalizado",
    description: "Para cadenas con múltiples equipos",
    features: [
      "Visitas programadas ilimitadas",
      "Técnico dedicado en sitio",
      "Repuestos en consignación",
      "Reportes mensuales de flota",
      "SLA de respuesta < 4h",
      "Capacitación al personal",
      "Garantía extendida 12 meses",
    ],
    cta: "Solicitar Empresarial",
    highlighted: false,
  },
];

export default function ServicioTecnicoPage() {
  return (
    <PageTransition>
      <PageHero
        overline="Servicio Técnico Oficial"
        title={
          <>
            Respaldo técnico que mantiene{" "}
            <span className="bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
              su operación en movimiento
            </span>
          </>
        }
        description="Técnicos certificados directamente por GLORY. Atendemos todo tipo de equipos de manejo de efectivo con repuestos originales, calibración certificada y planes preventivos adaptados al volumen de su operación."
        icon={Wrench}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="#servicios"
            className="btn-glass px-5 py-2.5 text-sm"
          >
            Ver servicios
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#cotizar-servicio"
            className="btn-primary px-5 py-2.5 text-sm bg-white text-primary hover:bg-slate-100"
            style={{ backgroundColor: "white", color: "var(--primary)" }}
          >
            <Wrench className="w-4 h-4" />
            Solicitar servicio
          </Link>
        </div>
      </PageHero>

      <div className="container-amc py-10">
        <Breadcrumb items={[{ label: "Servicio Técnico" }]} />
      </div>

      {/* Services grid */}
      <section id="servicios" className="container-amc py-12 scroll-mt-20">
        <SectionTitle
          overline="Nuestros servicios"
          title="Servicios técnicos especializados"
          description="Atendemos todas las marcas que representamos con técnicos certificados directamente por los fabricantes. Cada servicio incluye reporte técnico y garantía."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {SERVICES.map((s) => (
            <StaggerItem key={s.code}>
              <div className="card-base card-hover p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center">
                    <s.icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {s.code}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {s.description}
                </p>
                <ul className="space-y-1.5 mb-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#cotizar-servicio"
                  className="text-sm font-semibold text-primary hover:gap-2 inline-flex items-center gap-1 transition-all"
                >
                  Solicitar
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Equipment types */}
      <section className="bg-muted/40 border-y border-border py-16">
        <div className="container-amc">
          <SectionTitle
            overline="Equipos que reparamos"
            title="Especialistas en todas las marcas"
            description="Atendemos cualquier equipo de manejo de efectivo, sin importar la marca o el modelo."
          />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {EQUIPMENT_TYPES.map((e) => (
              <StaggerItem key={e.name}>
                <div className="card-base p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-lg bg-primary-tint text-primary flex items-center justify-center mx-auto mb-4">
                    <e.icon className="w-7 h-7" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-2">{e.name}</h3>
                  <p className="text-xs text-muted-foreground">{e.brands}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="container-amc py-20">
        <SectionTitle
          overline="Proceso de servicio"
          title="Cuatro pasos del contacto a la entrega"
          description="Un proceso transparente y profesional que asegura que tu equipo vuelva a operar con la precisión original."
        />

        <div className="relative mt-16">
          <div
            className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden="true"
          />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {PROCESS.map((step) => (
              <StaggerItem key={step.number}>
                <div className="relative">
                  <div className="relative w-14 h-14 rounded-full bg-surface border-2 border-primary/20 flex items-center justify-center mb-5 group hover:border-primary transition-colors">
                    <span className="font-display font-bold text-primary">{step.number}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-muted/40 border-y border-border py-20">
        <div className="container-amc">
          <SectionTitle
            overline="Planes de mantenimiento"
            title="Elige el plan que se adapta a tu operación"
            description="Planes preventivos que extienden la vida útil de tus equipos y reducen hasta 80% las fallas inesperadas."
          />

          <div className="grid lg:grid-cols-3 gap-6 mt-14">
            {PLANS.map((plan, i) => (
              <ScaleIn key={plan.name} delay={i * 0.1}>
                <div
                  className={`card-base p-7 h-full flex flex-col relative ${
                    plan.highlighted
                      ? "border-primary border-2 shadow-amc-primary"
                      : "card-hover"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-primary">
                      Más popular
                    </span>
                  )}
                  <div className="mb-5">
                    <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="font-display text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#cotizar-servicio"
                    className={`w-full text-center py-3 rounded-md font-semibold text-sm transition-all ${
                      plan.highlighted
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why AMC service */}
      <section className="container-amc py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <p className="overline text-muted-foreground mb-3">¿Por qué elegir AMC?</p>
              <h2 className="display-2 mb-6">
                No solo reparamos.{" "}
                <span className="text-primary">Cuidamos tu inversión.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                En AMC Soluciones Perú entendemos que tu equipo de manejo de efectivo es crítico para tu operación.
                Por eso no nos limitamos a reparar fallas: trabajamos en prevenir las, calibrar periódicamente
                y extender la vida útil de tus equipos con repuestos originales y técnicos certificados.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Award, title: "Técnicos certificados por GLORY", desc: "Capacitación oficial del fabricante, no autodidactas." },
                  { icon: ShieldCheck, title: "Repuestos 100% originales", desc: "Trazabilidad total desde el fabricante." },
                  { icon: Clock, title: "Respuesta en 24 horas hábiles", desc: "Lima Metropolitana y provincias por coordinación." },
                  { icon: CheckCircle2, title: "Garantía en todos los servicios", desc: "30 a 90 días según el tipo de servicio." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-0.5">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="card-base p-8 bg-gradient-to-br from-primary-dark to-primary text-white">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "+2,500", label: "Equipos reparados" },
                  { value: "15+", label: "Años de experiencia" },
                  { value: "24h", label: "Tiempo de respuesta" },
                  { value: "99.8%", label: "Precisión post-servicio" },
                  { value: "6", label: "Marcas atendidas" },
                  { value: "12m", label: "Garantía máxima" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-bold text-white mb-1">{s.value}</div>
                    <div className="text-xs text-slate-300">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="cotizar-servicio" className="container-amc py-20 scroll-mt-20">
        <div className="card-base p-8 lg:p-12 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-20" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
            <div>
              <h2 className="display-2 text-white mb-4">
                ¿Tu equipo necesita servicio técnico?
              </h2>
              <p className="text-sky-100 leading-relaxed mb-6 max-w-xl">
                Contáctanos ahora y recibe asesoría técnica especializada. Respondemos en menos de 24 horas hábiles.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${encodeURIComponent("Hola AMC, necesito servicio técnico para mi equipo.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass px-5 py-3 text-sm"
                >
                  WhatsApp directo
                </a>
                <a
                  href={`tel:${AMCCONFIG.contact.phoneRaw}`}
                  className="btn-glass px-5 py-3 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  {AMCCONFIG.contact.phone}
                </a>
                <a
                  href={`mailto:${AMCCONFIG.contact.emailTechnical}`}
                  className="btn-glass px-5 py-3 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email técnico
                </a>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-white mb-4">Horario de atención</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-200">
                  <span>Lunes a Viernes</span>
                  <span className="font-mono">9:00 - 18:00</span>
                </div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>Sábado</span>
                  <span className="font-mono">9:00 - 13:00</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Domingo</span>
                  <span className="font-mono">Cerrado</span>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 text-xs text-slate-300">
                  Soporte express disponible fuera de horario para planes Premium y Empresarial.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
