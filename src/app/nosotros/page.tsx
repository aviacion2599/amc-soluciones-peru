"use client";

import { Building2, Award, Target, Eye, Heart, ShieldCheck, TrendingUp, Users, Cpu, Globe, ArrowRight } from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/shared/Motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionTitle } from "@/components/shared/SectionTitle";

const VALUES = [
  { icon: ShieldCheck, title: "Precisión", description: "Cada equipo que vendemos y cada servicio que prestamos está respaldado por certificaciones técnicas. No dejamos nada al azar." },
  { icon: Heart, title: "Compromiso", description: "Acompañamos a nuestros clientes durante todo el ciclo de vida del equipo, no solo en la venta. Tu éxito es nuestro éxito." },
  { icon: Cpu, title: "Innovación", description: "Actualizamos constantemente nuestro catálogo con la última tecnología del mercado. Traemos lo mejor del mundo a Perú." },
  { icon: Award, title: "Excelencia", description: "Técnicos certificados por los fabricantes, repuestos originales y procesos auditados. Calidad sin concesiones." },
];

const TIMELINE = [
  { year: "2010", title: "Fundación de AMC", description: "Nace AMC Soluciones Perú con la misión de profesionalizar el manejo de efectivo en el país." },
  { year: "2013", title: "Alianza con GLORY", description: "Nos convertimos en servicio técnico autorizado de GLORY, líder mundial en manejo de efectivo." },
  { year: "2016", title: "Expansión nacional", description: "Iniciamos cobertura en provincias con red de técnicos asociados en Arequipa, Trujillo y Piura." },
  { year: "2019", title: "Catálogo ampliado", description: "Incorporamos nuevas marcas: Hyundai, Henry, Royal Sovereign y Cassida." },
  { year: "2022", title: "Planes empresariales", description: "Lanzamiento de planes de mantenimiento empresarial para cadenas con múltiples sucursales." },
  { year: "2026", title: "Plataforma Enterprise", description: "Lanzamiento de nuestra nueva plataforma digital Enterprise para servir mejor a nuestros clientes." },
];

const STATS = [
  { value: "+15", label: "Años de experiencia" },
  { value: "+2,500", label: "Equipos atendidos" },
  { value: "+800", label: "Clientes activos" },
  { value: "6", label: "Marcas representadas" },
  { value: "24h", label: "Tiempo de respuesta" },
  { value: "99.8%", label: "Precisión de conteo" },
];

const CERTIFICATIONS = [
  { name: "GLORY Authorized Service", desc: "Servicio técnico autorizado" },
  { name: "ISO 9001 Ready", desc: "Procesos de calidad documentados" },
  { name: "Hyundai Distribution", desc: "Distribuidor autorizado" },
  { name: "Henry Partner", desc: "Socio oficial" },
];

export default function NosotrosPage() {
  return (
    <PageTransition>
      {/* ===== FULL-BLEED HERO ===== */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        {/* Background image — desktop: horizontal, mobile: vertical */}
        <picture className="absolute inset-0">
          <source
            media="(min-width: 768px)"
            srcSet="/nosotros-hero-desktop.webp"
            type="image/webp"
          />
          <img
            src="/nosotros-hero-mobile.webp"
            alt="AMC Soluciones Perú — Técnico especializado con equipo de conteo de efectivo"
            className="absolute inset-0 w-full h-full object-cover object-center md:object-center"
          />
        </picture>

        {/* Multi-layer overlay for depth + readability */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Base dark veil — lighter at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/30" />
          {/* Left-to-right text readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent md:from-black/50 md:via-transparent md:to-black/40" />
          {/* Minimal bottom fade for smooth transition to content */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/90 to-transparent" />
          {/* Subtle blue accent glow */}
          <div
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.08] rounded-full blur-3xl"
          />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Top edge gradient for transparent header blend */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />
        </div>

        {/* Hero content — positioned at bottom-left on desktop, bottom-center on mobile */}
        <div className="relative w-full pb-14 sm:pb-18 lg:pb-20 pt-32 sm:pt-36 lg:pt-40 px-6 sm:px-8">
          <div className="container-amc">
            <div className="max-w-2xl">
              {/* Overline */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
                <div className="w-8 h-px bg-gold" />
                <span className="overline text-gold tracking-widest">Sobre AMC</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5 sm:mb-6">
                Venta y servicio técnico{" "}
                <span className="bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                  especializado
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-xl mb-8 sm:mb-10">
                AMC Soluciones Perú se especializa en la venta de contadoras profesionales de billetes y monedas, mantenimiento preventivo y correctivo, reparación, calibración y soporte técnico para equipos de procesamiento de efectivo.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-10">
                {STATS.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                      {s.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-white/40 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>
      {/* ===== END FULL-BLEED HERO ===== */}

      <div className="container-amc py-6 sm:py-8">
        <Breadcrumb items={[{ label: "Nosotros" }]} />
      </div>

      {/* Misión / Visión */}
      <section className="container-amc py-10 sm:py-14">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <FadeIn>
            <div className="card-base p-6 sm:p-8 h-full">
              <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-5">
                <Target className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h2 className="display-3 mb-4">Misión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Proveer soluciones integrales de manejo de efectivo que combina tecnología de vanguardia
                con respaldo técnico especializado, ayudando a las empresas peruanas a operar con
                precisión, seguridad y eficiencia. Nos comprometemos a ofrecer equipos confiables,
                mantenimiento preventivo de calidad y soporte técnico oportuno que asegure la
                continuidad operativa de nuestros clientes.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card-base p-6 sm:p-8 h-full">
              <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h2 className="display-3 mb-4">Visión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ser la empresa líder en Perú en soluciones de manejo de efectivo para 2030,
                reconocida por la excelencia técnica, la innovación continua y el compromiso con
                el cliente. Aspiramos a ser el partner estratégico de toda empresa que maneje
                efectivo, desde pequeños comercios hasta grandes cadenas y entidades financieras,
                contribuyendo a la profesionalización del sector.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-muted/40 border-y border-border py-16 sm:py-20">
        <div className="container-amc">
          <SectionTitle
            overline="Nuestros valores"
            title="Los principios que guían cada operación"
            description="No son solo palabras en una pared. Son los estándares que aplicamos en cada cotización, cada servicio y cada interacción con nuestros clientes."
          />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-12 sm:mt-14">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card-base card-hover p-5 sm:p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-5">
                    <v.icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline / Historia */}
      <section className="container-amc py-16 sm:py-20">
        <SectionTitle
          overline="Nuestra historia"
          title="Una trayectoria de crecimiento constante"
          description="Más de 15 años acompañando a las empresas peruanas en la profesionalización del manejo de efectivo."
        />

        <div className="mt-14 sm:mt-16 relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.05}>
                <div
                  className={`relative grid lg:grid-cols-2 gap-6 ${
                    i % 2 === 0 ? "" : "lg:[direction:rtl]"
                  }`}
                >
                  {/* Year marker */}
                  <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 -translate-x-1/2 -top-1 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-xs flex items-center justify-center border-4 border-background">
                      {i + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`pl-12 lg:pl-0 ${
                      i % 2 === 0 ? "lg:pr-12" : "lg:pl-12 lg:[direction:ltr]"
                    }`}
                  >
                    <div className="card-base card-hover p-6">
                      <div className="overline text-primary mb-2">{item.year}</div>
                      <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-dark text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(176, 176, 176, 0.15), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="container-amc relative">
          <div className="text-center mb-12 sm:mb-14">
            <p className="overline text-slate-300 mb-3">AMC en números</p>
            <h2 className="display-2 text-white">Impacto real en operaciones críticas</h2>
          </div>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className="glass-card rounded-xl p-5 sm:p-6 text-center">
                  <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">{s.value}</div>
                  <div className="text-sm text-slate-300">{s.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Certifications */}
      <section className="container-amc py-16 sm:py-20">
        <SectionTitle
          overline="Certificaciones y alianzas"
          title="Respaldados por los mejores"
          description="Nuestras certificaciones y alianzas estratégicas garantizan que recibas el mejor servicio técnico y productos originales."
        />
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 sm:mt-14">
          {CERTIFICATIONS.map((c) => (
            <StaggerItem key={c.name}>
              <div className="card-base p-6 text-center h-full">
                <div className="w-14 h-14 rounded-full bg-success-light text-success flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA */}
      <section className="container-amc pb-16 sm:pb-20">
        <ScaleIn>
          <div className="card-base p-8 lg:p-12 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground text-center">
            <h2 className="display-2 text-white mb-4">
              Conozcámonos mejor
            </h2>
            <p className="text-sky-100 leading-relaxed max-w-2xl mx-auto mb-8">
              Visítanos en nuestras instalaciones o contáctanos para conocer más sobre cómo podemos
              ayudar a tu empresa a optimizar el manejo de efectivo.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/contacto" className="btn-primary px-6 py-3 text-sm bg-white text-primary hover:bg-slate-100" style={{ backgroundColor: "white", color: "var(--primary)" }}>
                Contáctanos
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/productos" className="btn-glass px-6 py-3 text-sm">
                Ver productos
              </a>
            </div>
          </div>
        </ScaleIn>
      </section>
    </PageTransition>
  );
}