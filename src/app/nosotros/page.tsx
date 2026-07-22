"use client";

import { Award, Target, Eye, Heart, ShieldCheck, Cpu, Globe, ArrowRight, Wrench, ChevronDown } from "lucide-react";
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
  { year: "2018", title: "Inicio de AMC Soluciones Perú", description: "Nace AMC Soluciones Perú con el objetivo de brindar servicio técnico especializado para equipos de procesamiento de efectivo." },
  { year: "2019", title: "Especialización técnica", description: "Fortalecemos nuestra experiencia en mantenimiento preventivo y correctivo de contadoras de billetes y monedas." },
  { year: "2021", title: "Atención a empresas", description: "Ampliamos nuestros servicios para atender bancos, cooperativas, casas de cambio, empresas comerciales y negocios con alto manejo de efectivo." },
  { year: "2023", title: "Incorporación de equipos profesionales", description: "Incorporamos nuevas soluciones para el procesamiento de efectivo, combinando tecnología, asesoría especializada y respaldo técnico local." },
  { year: "2025", title: "Cobertura nacional", description: "Extendemos nuestra atención a clientes de Lima y provincias mediante envíos, soporte remoto y asistencia técnica especializada." },
  { year: "2026", title: "Nueva etapa digital", description: "Renovamos nuestra plataforma digital para brindar una mejor experiencia comercial, información técnica y atención más rápida a nuestros clientes." },
];

const STATS = [
  { value: "Desde 2018", label: "Experiencia en procesamiento de efectivo" },
  { value: "Atención nacional", label: "Servicio en Lima y provincias" },
  { value: "Servicio multimarca", label: "Contadoras de billetes y monedas" },
  { value: "Soporte técnico propio", label: "Diagnóstico, mantenimiento y reparación" },
  { value: "18 meses", label: "Garantía en equipos AMC seleccionados" },
  { value: "Atención posventa", label: "Capacitación y acompañamiento técnico" },
];

const TECHNICAL_BACKING = [
  { icon: Award, name: "Tecnología para conteo, clasificación y detección", desc: "Experiencia en diagnóstico, mantenimiento y reparación." },
  { icon: Wrench, name: "Servicio técnico multimarca", desc: "Atención de contadoras de billetes y monedas de diferentes fabricantes." },
  { icon: ShieldCheck, name: "Soporte posventa AMC", desc: "Acompañamiento, capacitación y asistencia técnica después de la compra." },
  { icon: Globe, name: "Cobertura nacional", desc: "Atención en Lima y recepción de equipos desde provincias." },
];

export default function NosotrosPage() {
  return (
    <PageTransition>
      {/* ===== FULL-BLEED HERO ===== */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-[#080e1a] pt-[62px] sm:pt-[68px] pb-[80px] sm:pb-0">
        {/* Background image — desktop: horizontal, mobile: vertical.
            Starts BELOW the sticky header (62px mobile / 68px desktop) so
            the top of the machines is never visually clipped by the header. */}
        <picture className="absolute top-[62px] sm:top-[68px] left-0 right-0 bottom-0">
          <source
            media="(min-width: 768px)"
            srcSet="/nosotros-hero-desktop.png"
            type="image/png"
          />
          <img
            src="/nosotros-hero-mobile.png"
            alt="AMC Soluciones Perú — Venta y servicio técnico especializado"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%] md:object-top"
          />
        </picture>

        {/* Multi-layer overlay for depth + readability (aligned to picture area below header) */}
        <div className="absolute top-[62px] sm:top-[68px] left-0 right-0 bottom-0" aria-hidden="true">
          {/* Base dark veil — lighter at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/30" />
          {/* Left-to-right text readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent md:from-black/50 md:via-transparent md:to-black/40" />
          {/* Bottom gradient — darker, no white fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-black/60 to-transparent" />
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

        {/* Hero content — centered on mobile, bottom-left on desktop */}
        <div className="relative w-full pb-14 sm:pb-18 lg:pb-20 pt-8 sm:pt-12 lg:pt-32 px-6 sm:px-8">
          <div className="container-amc">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              {/* Overline */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 justify-center lg:justify-start">
                <div className="w-8 h-px bg-gold" />
                <span className="overline text-gold tracking-widest">Sobre AMC</span>
                <div className="w-8 h-px bg-gold" />
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5 sm:mb-6">
                <span className="bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">Venta y servicio técnico</span>{" "}
                especializado
              </h1>
              <p className="text-sm sm:text-base tracking-widest text-gold/80">Precisión · Seguridad · Confianza · Control · Respaldo Técnico</p>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-xl mb-8 sm:mb-10">
                AMC Soluciones Perú se especializa en la venta de contadoras profesionales de billetes y monedas, mantenimiento preventivo y correctivo, reparación, calibración y soporte técnico para equipos de procesamiento de efectivo.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start">
                {STATS.slice(0, 3).map((s) => (
                  <div key={s.label} className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/80">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Scroll indicator — Ver más */}
        <button
          onClick={() => {
            const el = document.getElementById("nosotros-contenido");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors group"
          aria-label="Ver más contenido"
        >
          <span className="text-[10px] sm:text-xs tracking-widest uppercase">Ver más</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </section>
      {/* ===== END FULL-BLEED HERO ===== */}

      <div id="nosotros-contenido" className="container-amc py-6 sm:py-8">
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
      <section className="container-amc py-12 sm:py-16">
        <SectionTitle
          overline="NUESTRA HISTORIA"
          title="Una trayectoria construida con experiencia y respaldo técnico"
          description="Desde 2018 ayudamos a empresas peruanas a mejorar el control y procesamiento de su efectivo mediante servicio técnico especializado, equipos profesionales y acompañamiento posventa."
        />

        <div className="mt-10 sm:mt-12 relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-10">
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
                    <div className="card-base card-hover p-5 sm:p-6">
                      <div className="overline text-primary mb-1.5">{item.year}</div>
                      <h3 className="font-display font-bold text-base sm:text-lg mb-1.5">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
      <section className="bg-primary-dark text-white py-14 sm:py-18 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(176, 176, 176, 0.15), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="container-amc relative">
          <div className="text-center mb-10 sm:mb-12">
            <p className="overline text-slate-300 mb-3">AMC EN NÚMEROS</p>
            <h2 className="display-2 text-white">Experiencia que respalda cada operación</h2>
          </div>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className="glass-card rounded-xl p-4 sm:p-5 text-center">
                  <div className="font-display text-base sm:text-lg font-bold text-white mb-1.5 leading-tight">{s.value}</div>
                  <div className="text-xs sm:text-sm text-slate-300 leading-snug">{s.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Respaldo Técnico */}
      <section className="container-amc py-12 sm:py-16">
        <SectionTitle
          overline="RESPALDO TÉCNICO"
          title="Un servicio construido sobre experiencia real"
          description="Nuestro respaldo se basa en experiencia técnica, atención especializada y compromiso con el correcto funcionamiento de cada equipo."
        />
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10 sm:mt-12">
          {TECHNICAL_BACKING.map((item) => (
            <StaggerItem key={item.name}>
              <div className="card-base card-hover p-5 sm:p-6 text-center h-full">
                <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1.5">{item.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
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