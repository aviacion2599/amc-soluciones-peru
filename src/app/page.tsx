"use client";

import * as React from "react";
import {
  ShieldCheck,
  Gauge,
  Wrench,
  Truck,
  Award,
  Headphones,
  FileText,
  PlayCircle,
  Download,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Menu,
  X,
  MessageCircle,
  Star,
  Banknote,
  Coins,
  ScanLine,
  Settings2,
  Cpu,
  Zap,
  Lock,
  TrendingUp,
  Quote,
  ArrowUpRight,
  Building2,
  Factory,
  Store,
  Stethoscope,
} from "lucide-react";

/**
 * AMC SOLUCIONES PERÚ — Home Prototype (Phase 2: UI Design)
 * ----------------------------------------------------------
 * This is a STATIC visual prototype. No backend, no real data.
 * All copy and imagery is illustrative; the goal is to validate the
 * look & feel of the AMC Enterprise platform before Phase 3 (Frontend).
 *
 * Palette is locked to the AMC corporate identity (see globals.css):
 *   primary #0b4db8 / primary-dark #083a8a / primary-light #1e73ff
 *   silver #94a3b8 / slate grays / pure white
 */

export default function HomePrototype() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Benefits />
        <Categories />
        <FeaturedProducts />
        <TechnicalService />
        <WorkProcess />
        <BrandsStrip />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

/* ============================================================
   HEADER — Sticky, transparent over hero, blur backdrop on scroll
   ============================================================ */
function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Inicio", href: "#" },
    { label: "Productos", href: "#productos" },
    { label: "Categorías", href: "#categorias" },
    { label: "Servicio Técnico", href: "#servicio-tecnico" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-amc"
          : "bg-transparent"
      }`}
    >
      <div className="container-amc">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground font-display font-bold text-xl shadow-amc">
                AMC
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-background" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-base text-foreground">
                AMC Soluciones
              </span>
              <span className="overline text-silver-dark">PERÚ · Cash Handling</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent/60 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#cotizacion"
              className="hidden md:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold transition-colors shadow-amc"
            >
              Solicitar Cotización
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-accent"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent/60 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#cotizacion"
                className="mx-4 mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-semibold"
              >
                Solicitar Cotización <ArrowRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* ============================================================
   HERO PREMIUM — Full-bleed, gradient overlay, glass CTA cards
   ============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background — industrial gradient + grid pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#083a8a] via-[#0b4db8] to-[#0a1020]" />
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(30,115,255,0.45), transparent 60%)",
          }}
        />
        {/* Decorative blueprint lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="blueprint" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint)" />
        </svg>
      </div>

      <div className="container-amc relative py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left — copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="overline text-silver-light">Servicio Técnico Autorizado · GLORY</span>
            </div>

            <h1 className="display-1 text-white mb-6">
              Precisión y Seguridad en
              <span className="block text-gradient-blue bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Manejo de Efectivo
              </span>
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed mb-8 max-w-xl">
              Venta, mantenimiento y calibración de contadoras de billetes, monedas,
              clasificadoras y detectores. Tecnología industrial con respaldo técnico
              certificado para empresas que exigen exactitud.
            </p>

            {/* Hero actions */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href="#productos"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-md font-semibold shadow-amc-deep hover:shadow-amc-hover transition-all hover:-translate-y-0.5"
              >
                Ver Productos
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#cotizacion"
                className="inline-flex items-center gap-2 glass-card hover:bg-white/15 text-white px-6 py-3.5 rounded-md font-semibold transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar Cotización
              </a>
            </div>

            {/* Hero quick stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md">
              {[
                { value: "+15", label: "Años de experiencia" },
                { value: "+2,500", label: "Equipos calibrados" },
                { value: "24h", label: "Respuesta técnica" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-slate-300 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — featured product visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Glass frame around the product */}
              <div className="glass-card rounded-2xl p-8 shadow-amc-deep">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="overline text-silver-light">Modelo destacado</div>
                    <div className="font-display font-bold text-xl text-white mt-1">AMC-9100</div>
                  </div>
                  <span className="bg-success/20 text-success-foreground text-success border border-success/30 px-3 py-1 rounded-full text-xs font-semibold">
                    Más vendido
                  </span>
                </div>

                {/* Product silhouette — SVG placeholder for the equipment */}
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-slate-800/60 to-slate-900/60 flex items-center justify-center p-4 mb-6">
                  <div className="text-center">
                    <Banknote className="w-24 h-24 mx-auto text-sky-300 mb-3" strokeWidth={1.2} />
                    <div className="font-mono text-xs text-slate-400">
                      Contadora de Billetes · 1200/min
                    </div>
                  </div>
                </div>

                {/* Mini specs */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Velocidad", value: "1,200 bpm" },
                    { label: "Detección", value: "UV + MG + IR" },
                    { label: "Capacidad", value: "500 billetes" },
                    { label: "Garantía", value: "12 meses" },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-white/5 rounded-md p-2.5 border border-white/10">
                      <div className="text-slate-400">{spec.label}</div>
                      <div className="text-white font-semibold mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent badge */}
              <div className="absolute -top-4 -right-4 glass-card rounded-full p-3 shadow-amc-deep">
                <ShieldCheck className="w-6 h-6 text-success-foreground text-success" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/40 to-transparent" />
    </section>
  );
}

/* ============================================================
   TRUSTED BY — Empresas que confían en AMC
   ============================================================ */
function TrustedBy() {
  const companies = [
    { name: "Banco Pichincha", icon: Building2 },
    { name: "Caja Sullana", icon: Building2 },
    { name: "Plaza Vea", icon: Store },
    { name: "Inkafarma", icon: Stethoscope },
    { name: "Maestro", icon: Factory },
    { name: "Promart", icon: Store },
  ];
  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="container-amc">
        <div className="text-center mb-6">
          <p className="overline text-silver-dark">Confianza institucional</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {companies.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-center gap-2 text-silver-dark hover:text-primary transition-colors group"
            >
              <c.icon className="w-6 h-6" strokeWidth={1.5} />
              <span className="font-display font-semibold text-sm">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BENEFITS — Why choose AMC (4 cards + stat block)
   ============================================================ */
function Benefits() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Precisión Certificada",
      description:
        "Conteo y detección con tecnología multi-sensorial UV, MG e IR. Equipos que garantizan exactitud en cada transacción.",
    },
    {
      icon: Wrench,
      title: "Respaldo Técnico",
      description:
        "Servicio técnico especializado con técnicos certificados por GLORY. Diagnóstico, calibración y mantenimiento preventivo programado.",
    },
    {
      icon: Truck,
      title: "Cobertura Nacional",
      description:
        "Despacho a todo Perú con soporte técnico en Lima Metropolitana y provincias. Respuesta en menos de 24 horas hábiles.",
    },
    {
      icon: Award,
      title: "Garantía Oficial",
      description:
        "Todos nuestros equipos cuentan con garantía oficial de fábrica. Repuestos originales y soporte directo del fabricante.",
    },
  ];

  return (
    <section id="nosotros" className="py-20 lg:py-28">
      <div className="container-amc">
        <SectionTitle
          overline="Por qué AMC"
          title="Tecnología industrial con respado técnico permanente"
          description="No vendemos equipos. Entregamos soluciones integrales de manejo de efectivo con soporte técnico especializado durante todo el ciclo de vida del producto."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-amc-hover hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <b.icon className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              <div className="font-mono text-xs text-silver mt-4">
                0{i + 1} / 04
              </div>
            </div>
          ))}
        </div>

        {/* Stat strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {[
            { icon: TrendingUp, value: "+2,500", label: "Equipos instalados" },
            { icon: Headphones, value: "24h", label: "Tiempo de respuesta" },
            { icon: Award, value: "12 meses", label: "Garantía oficial" },
            { icon: ShieldCheck, value: "99.8%", label: "Precisión de conteo" },
          ].map((s) => (
            <div key={s.label} className="bg-card p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CATEGORIES — 5 product categories grid
   ============================================================ */
function Categories() {
  const categories = [
    {
      icon: Banknote,
      title: "Contadoras de Billetes",
      description: "Conteo ultrarrápido con detección de falsos multi-sensorial.",
      count: 8,
    },
    {
      icon: Coins,
      title: "Contadoras de Monedas",
      description: "Clasificación y conteo preciso de monedas por denominación.",
      count: 5,
    },
    {
      icon: ScanLine,
      title: "Clasificadoras",
      description: "Equipos que clasifican y ordenan billetes por denominación.",
      count: 4,
    },
    {
      icon: ScanLine,
      title: "Detectores",
      description: "Detección profesional de billetes falsos con luz UV, MG e IR.",
      count: 6,
    },
    {
      icon: Settings2,
      title: "Accesorios",
      description: "Repuestos, kit de mantenimiento y consumibles originales.",
      count: 12,
    },
  ];

  return (
    <section id="categorias" className="py-20 lg:py-28 bg-muted/40 border-y border-border">
      <div className="container-amc">
        <SectionTitle
          overline="Catálogo"
          title="Categorías especializadas en manejo de efectivo"
          description="Explora nuestra gama completa de equipos para conteo, clasificación, detección y mantenimiento de billetes y monedas."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {categories.map((c, i) => (
            <a
              key={c.title}
              href="#productos"
              className={`group relative overflow-hidden bg-card border border-border rounded-xl p-7 hover:shadow-amc-hover hover:border-primary/30 transition-all duration-300 ${
                i === 0 ? "lg:row-span-2 lg:flex lg:flex-col lg:justify-between" : ""
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <c.icon className="w-7 h-7" strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-mono text-silver-dark bg-muted px-2.5 py-1 rounded-full">
                    {c.count} modelos
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-primary mt-6 group-hover:gap-2 transition-all">
                Ver catálogo
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Large first card — decorative product silhouette */}
              {i === 0 && (
                <div className="mt-6 aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                  <Banknote className="w-32 h-32 text-primary/30" strokeWidth={1} />
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURED PRODUCTS — 4 highlighted product cards
   ============================================================ */
function FeaturedProducts() {
  const products = [
    {
      name: "AMC-9100",
      category: "Contadora de Billetes",
      tag: "Más vendido",
      tagColor: "bg-success/15 text-success border-success/30",
      speed: "1,200 bpm",
      detection: "UV · MG · IR",
      isNew: false,
    },
    {
      name: "AMC-3200+",
      category: "Contadora de Billetes",
      tag: "Compacto",
      tagColor: "bg-primary/15 text-primary border-primary/30",
      speed: "1,500 bpm",
      detection: "UV · MG · IR",
      isNew: false,
    },
    {
      name: "AMC-9200",
      category: "Contadora con Clasificación",
      tag: "Premium",
      tagColor: "bg-amber-500/15 text-amber-600 border-amber-500/30",
      speed: "1,000 bpm",
      detection: "Multi-divisa",
      isNew: false,
    },
    {
      name: "AMC-C100",
      category: "Contadora de Monedas",
      tag: "Nuevo",
      tagColor: "bg-sky-500/15 text-sky-600 border-sky-500/30",
      speed: "1,800 mon/min",
      detection: "Multi-denominación",
      isNew: true,
    },
  ];

  return (
    <section id="productos" className="py-20 lg:py-28">
      <div className="container-amc">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="overline text-silver-dark mb-3">Productos destacados</p>
            <h2 className="display-2 text-foreground">
              Equipos profesionales para <span className="text-primary">cada operación</span>
            </h2>
          </div>
          <a
            href="#productos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark group"
          >
            Ver catálogo completo
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <article
              key={p.name}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-amc-hover hover:border-primary/30 transition-all duration-300"
            >
              {/* Product image area */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-secondary flex items-center justify-center overflow-hidden">
                <Banknote
                  className="w-24 h-24 text-silver group-hover:scale-110 group-hover:text-primary/40 transition-all duration-500"
                  strokeWidth={1}
                />
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold border ${p.tagColor}`}
                >
                  {p.tag}
                </span>
                {p.isNew && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    NEW
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="overline text-silver-dark mb-1.5">{p.category}</div>
                <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <div className="space-y-1.5 mb-5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Velocidad</span>
                    <span className="font-mono font-semibold text-foreground">{p.speed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Detección</span>
                    <span className="font-mono font-semibold text-foreground">{p.detection}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="#cotizacion"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-dark text-primary-foreground px-3 py-2 rounded-md text-xs font-semibold transition-colors"
                  >
                    Cotizar
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    className="p-2 rounded-md border border-border hover:border-primary/40 hover:bg-accent/50 transition-colors"
                    aria-label="Ver detalles"
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TECHNICAL SERVICE — Big visual section with service list
   ============================================================ */
function TechnicalService() {
  const services = [
    { icon: Wrench, label: "Reparación", description: "Diagnóstico y reparación con repuestos originales." },
    { icon: Gauge, label: "Calibración", description: "Ajuste de precisión certificado bajo estándares de fábrica." },
    { icon: Cpu, label: "Diagnóstico", description: "Auditoría técnica completa del estado del equipo." },
    { icon: ShieldCheck, label: "Mantto. Preventivo", description: "Planes programados para extender la vida útil del equipo." },
    { icon: Award, label: "Garantía", description: "Soporte de garantía oficial del fabricante." },
    { icon: Zap, label: "Soporte Express", description: "Atención prioritaria con respuesta en menos de 24h." },
  ];

  return (
    <section
      id="servicio-tecnico"
      className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 80% 50%, rgba(30,115,255,0.25), transparent 50%)",
        }}
      />

      <div className="container-amc relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="overline text-silver-light">Servicio Técnico Oficial</span>
            </div>
            <h2 className="display-2 text-white mb-6">
              Respaldo técnico que mantiene
              <span className="block bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                su operación en movimiento
              </span>
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-lg">
              Técnicos certificados directamente por GLORY. Atendemos todo tipo de equipos
              con repuestos originales, calibración certificada y planes preventivos
              adaptados al volumen de operación de su negocio.
            </p>

            {/* Service checklist */}
            <div className="space-y-3 mb-10">
              {[
                "Técnicos certificados por el fabricante",
                "Repuestos 100% originales con trazabilidad",
                "Atención en sitio u onsite en Lima y provincias",
                "Reporte técnico detallado post-servicio",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-foreground text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-md font-semibold hover:shadow-amc-deep transition-all hover:-translate-y-0.5"
            >
              <Wrench className="w-4 h-4" />
              Solicitar servicio técnico
            </a>
          </div>

          {/* Right — services grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div
                key={s.label}
                className="glass-card rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-primary-light/20 text-sky-300 flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display font-semibold text-base mb-1.5">{s.label}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.description}</p>
                <div className="font-mono text-xs text-slate-500 mt-3">S-0{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WORK PROCESS — 4-step horizontal process with connector
   ============================================================ */
function WorkProcess() {
  const steps = [
    {
      number: "01",
      icon: Headphones,
      title: "Consulta",
      description: "Nos contacta y analizamos su necesidad operativa: volumen, divisas, entorno.",
    },
    {
      number: "02",
      icon: FileText,
      title: "Propuesta",
      description: "Recibe una cotización detallada con el equipo ideal y servicios asociados.",
    },
    {
      number: "03",
      icon: Truck,
      title: "Implementación",
      description: "Despacho, instalación y capacitación de su equipo en sitio.",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Respaldo",
      description: "Garantía oficial, soporte técnico y mantenimiento preventivo continuo.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-muted/40 border-y border-border">
      <div className="container-amc">
        <SectionTitle
          overline="Proceso de trabajo"
          title="Cuatro pasos de la consulta al respaldo permanente"
          description="Un proceso transparente y profesional que asegura que reciba el equipo correcto con el soporte que su operación exige."
        />

        <div className="relative mt-16">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                {/* Number badge */}
                <div className="relative w-14 h-14 rounded-full bg-card border-2 border-primary/20 flex items-center justify-center mb-5 group hover:border-primary transition-colors">
                  <step.icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-mono font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BRANDS STRIP — Brands AMC represents
   ============================================================ */
function BrandsStrip() {
  const brands = ["GLORY", "CashScan", "Hyundai", "Henry", "Royal Sovereign", "Cassida"];
  return (
    <section className="py-16">
      <div className="container-amc">
        <p className="overline text-silver-dark text-center mb-8">Marcas que representamos</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map((b) => (
            <span
              key={b}
              className="font-display font-bold text-2xl lg:text-3xl text-silver hover:text-primary transition-colors cursor-default"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS — Customer testimonials
   ============================================================ */
function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      position: "Gerente de Operaciones",
      company: "Cadena de Farmacias Inkafarma",
      rating: 5,
      content:
        "La precisión de las contadoras AMC y la rapidez del servicio técnico nos permitieron reducir significativamente las diferencias de caja en nuestras agencias.",
    },
    {
      name: "Rosa Quispe",
      position: "Jefa de Tesorería",
      company: "Municipalidad de Surco",
      rating: 5,
      content:
        "El equipo de AMC no solo nos vendió las máquinas, nos acompañó en la implementación y capacitación del personal. Soporte técnico impecable.",
    },
    {
      name: "Jorge Velásquez",
      position: "CFO",
      company: "Grupo Retail Peruano",
      rating: 5,
      content:
        "Migrar desde otro proveedor a AMC fue la mejor decisión. La calibración periódica y los repuestos originales marcan la diferencia.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-muted/40 border-y border-border">
      <div className="container-amc">
        <SectionTitle
          overline="Testimonios"
          title="Lo que dicen las empresas que confían en AMC"
          description="Más de 2,500 equipos instalados en operaciones críticas a lo largo del país."
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-14">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-card border border-border rounded-xl p-7 hover:shadow-amc-hover transition-shadow"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <blockquote className="text-sm text-foreground leading-relaxed mb-6">
                "{t.content}"
              </blockquote>

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm">
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.position} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA SECTION — Final conversion section with dual action
   ============================================================ */
function CTASection() {
  return (
    <section id="cotizacion" className="py-20 lg:py-28">
      <div className="container-amc">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-20" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 20% 50%, rgba(255,255,255,0.15), transparent 50%)",
            }}
          />
          <div className="relative px-8 py-14 lg:px-16 lg:py-20 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
            <div>
              <p className="overline text-sky-200 mb-4">Cotización sin compromiso</p>
              <h2 className="display-2 text-white mb-4">
                ¿Listo para optimizar el manejo de efectivo de su negocio?
              </h2>
              <p className="text-sky-100 leading-relaxed max-w-xl">
                Reciba asesoría personalizada de nuestros especialistas y una propuesta
                técnica adaptada al volumen y las necesidades de su operación.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-4 rounded-md font-semibold hover:shadow-amc-deep transition-all"
              >
                <FileText className="w-4 h-4" />
                Solicitar Cotización
              </a>
              <a
                href="https://wa.me/51984569125"
                className="inline-flex items-center justify-center gap-2 glass-card hover:bg-white/15 text-white px-6 py-4 rounded-md font-semibold transition-all"
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
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER — Corporate 4-column + bottom bar
   ============================================================ */
function Footer() {
  const cols = [
    {
      title: "Productos",
      links: ["Contadoras de Billetes", "Contadoras de Monedas", "Clasificadoras", "Detectores", "Accesorios"],
    },
    {
      title: "Servicio Técnico",
      links: ["Reparación", "Calibración", "Diagnóstico", "Mantenimiento Preventivo", "Garantía"],
    },
    {
      title: "Empresa",
      links: ["Nosotros", "Casos de Éxito", "Blog", "FAQ", "Contacto"],
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container-amc py-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-primary text-primary-foreground font-display font-bold flex items-center justify-center">
                AMC
              </div>
              <div>
                <div className="font-display font-bold text-white">AMC Soluciones</div>
                <div className="overline text-silver-dark">Perú · Cash Handling</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Especialistas en soluciones de conteo de efectivo. Venta, servicio técnico
              y mantenimiento de contadoras de billetes y monedas en todo Perú.
            </p>

            {/* Contact data */}
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-light" />
                <span>+51 984 569 125</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-light" />
                <span>ventas@amcsolucionesperu.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-light mt-0.5" />
                <span>Av. Argentina 1234, Cercado de Lima, Lima — Perú</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary-light" />
                <span>Lun – Vie 9:00 – 18:00 · Sáb 9:00 – 13:00</span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-primary-light transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} AMC Soluciones Perú. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Política de Garantía</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   WHATSAPP FLOAT BUTTON — Sticky bottom-right
   ============================================================ */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/51984569125"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-success/40 animate-ping opacity-75" />
        <div className="relative w-14 h-14 rounded-full bg-success text-white flex items-center justify-center shadow-amc-deep hover:scale-105 transition-transform">
          <MessageCircle className="w-7 h-7" fill="currentColor" />
        </div>
        <div className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-foreground text-background px-3 py-1.5 rounded-md text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          ¿Hablamos por WhatsApp?
        </div>
      </div>
    </a>
  );
}

/* ============================================================
   SHARED — Section title
   ============================================================ */
function SectionTitle({
  overline,
  title,
  description,
}: {
  overline: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="overline text-silver-dark mb-3">{overline}</p>
      <h2 className="display-2 text-foreground mb-4">{title}</h2>
      {description && (
        <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}
