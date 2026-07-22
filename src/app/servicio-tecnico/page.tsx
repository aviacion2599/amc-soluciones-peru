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
  ZoomIn,
  ChevronDown,
} from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/shared/Motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AMCCONFIG } from "@/lib/site-config";
import { Lightbox, useLightbox, type LightboxImage } from "@/components/shared/Lightbox";

const SERVICES = [
  {
    code: "S-01",
    icon: Wrench,
    title: "Reparación Especializada",
    description: "Diagnóstico y reparación especializada con repuestos originales y compatibles según disponibilidad del modelo. Recuperamos la precisión y confiabilidad de tu equipo.",
    features: ["Diagnóstico gratuito", "Repuestos originales y compatibles", "Garantía de reparación 90 días", "Reporte técnico detallado"],
  },
  {
    code: "S-02",
    icon: Gauge,
    title: "Calibración de Precisión",
    description: "Ajuste y verificación técnica de sensores CIS, UV, MG, IR, MT/TMR y sensor de espesor para recuperar la precisión de detección, conteo y validación del equipo.",
    features: ["Calibración con patrón de referencia", "Ajuste de sensores CIS/UV/MG/IR", "Pruebas de validación", "Reporte técnico"],
  },
  {
    code: "S-03",
    icon: Cpu,
    title: "Diagnóstico por Control",
    description: "Evaluación técnica completa del equipo con revisión de sensores, sistema de alimentación, conteo, detección y estado general antes de decidir una reparación.",
    features: ["Evaluación de 30 puntos", "Reporte fotográfico", "Estimación de vida útil", "Plan de mantenimiento recomendado"],
  },
  {
    code: "S-04",
    icon: ShieldCheck,
    title: "Mantenimiento Preventivo",
    description: "Planes programados de mantenimiento preventivo para reducir fallas, mejorar la alimentación de billetes y mantener la continuidad operativa del negocio.",
    features: ["Visitas programadas", "Limpieza técnica profunda", "Lubricación de partes móviles", "Calibración incluida", "Descuento en repuestos"],
  },
  {
    code: "S-05",
    icon: Zap,
    title: "Actualización de Divisas",
    description: "Actualización de firmware y parámetros de detección para soporte de nuevas divisas, versiones de billetes y mejora en la validación del efectivo.",
    features: ["Actualización de firmware", "Nuevas divisas y versiones", "Mejora de validación", "Reporte de actualización"],
  },
  {
    code: "S-06",
    icon: Clock,
    title: "Soporte Técnico",
    description: "Asistencia técnica para resolver dudas operativas, fallas recurrentes, configuración del equipo y recomendaciones de uso para mantener el flujo de trabajo.",
    features: ["Respuesta < 24h", "Asistencia operativa", "Configuración del equipo", "Recomendaciones de uso"],
  },
];

const EQUIPMENT_TYPES = [
  { icon: Banknote, name: "Contadoras de Billetes", brands: "GLORY, Kisan, Magner, Hyundai y otras marcas.", image: "/equip/contadora-billetes.svg" },
  { icon: ScanLine, name: "Clasificadoras de Billetes", brands: "GLORY, Kisan, Magner y otras marcas.", image: "/equip/clasificadora-billetes.svg" },
  { icon: Coins, name: "Contadoras de Monedas", brands: "GLORY, Scan Coin y otras marcas.", image: "/equip/contadora-monedas.svg" },
  { icon: Settings2, name: "Detectores de Billetes", brands: "Atención técnica para diferentes marcas y modelos.", image: "/equip/detector-billetes.svg" },
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
    name: "Mantenimiento Preventivo",
    price: "Desde S/ 180 + IGV",
    period: "",
    description: "Mantenimiento preventivo puntual",
    features: [
      "Limpieza técnica del equipo",
      "Lubricación de partes móviles",
      "Revisión general de sensores",
      "Calibración básica",
      "Pruebas de conteo y funcionamiento",
      "Reporte técnico",
      "Garantía de 30 días sobre el servicio realizado",
    ],
    footnote: "Precio referencial para mantenimiento preventivo de una contadora de billetes en Lima Metropolitana. No incluye repuestos ni reparaciones adicionales. El diagnóstico se cotiza según el estado del equipo.",
    benefitPhrase: null,
    cta: "Agendar mantenimiento",
    highlighted: false,
  },
  {
    name: "Plan Anual",
    price: "S/ 480 + IGV",
    period: "",
    description: "Plan anual para equipos de uso intensivo",
    features: [
      "3 visitas programadas durante el año",
      "Limpieza técnica y lubricación",
      "Revisión y calibración de sensores",
      "Pruebas de conteo y funcionamiento",
      "Reporte técnico por cada visita",
      "Atención técnica prioritaria",
      "Descuento preferencial en repuestos seleccionados",
    ],
    footnote: "El plan incluye tres mantenimientos preventivos programados durante el año. No incluye repuestos ni reparaciones adicionales.",
    benefitPhrase: "Ahorre en mantenimiento y mantenga su equipo calibrado durante todo el año.",
    cta: "Agendar mantenimiento",
    highlighted: true,
  },
  {
    name: "Empresarial",
    price: "Cotización",
    period: "personalizada",
    description: "Plan personalizado para empresas con múltiples equipos",
    features: [
      "Visitas programadas según la operación",
      "Técnico especializado en las instalaciones del cliente",
      "Mantenimiento preventivo de varios equipos",
      "Reportes técnicos consolidados",
      "Seguimiento mensual del estado de los equipos",
      "Gestión prioritaria de repuestos, según contrato",
      "Capacitación básica para operadores",
      "Condiciones de atención definidas según la necesidad del cliente",
    ],
    footnote: null,
    benefitPhrase: null,
    cta: "Solicitar cotización empresarial",
    highlighted: false,
  },
];

const WORKSHOP_IMAGES: LightboxImage[] = [
  {
    src: "/st-workshop-detail.webp",
    alt: "Técnico especializado limpiando componentes internos de contadora de billetes con cepillo de precisión",
    title: "Revisión de componentes internos",
    description: "Limpieza y verificación de circuitos, sensores y piezas móviles con herramientas de precisión.",
  },
  {
    src: "/st-workshop-machine.webp",
    alt: "Equipo industrial de procesamiento de efectivo en taller técnico AMC",
    title: "Equipo en diagnóstico",
    description: "Diagnóstico especializado de equipos de conteo y clasificación de efectivo.",
  },
  {
    src: "/st-workshop-cleaning.webp",
    alt: "Mantenimiento preventivo de clasificadora de billetes en taller AMC",
    title: "Limpieza técnica",
    description: "Mantenimiento preventivo con limpieza profunda de componentes internos.",
  },
  {
    src: "/st-workshop-interior.webp",
    alt: "Interior de contadora de billetes mostrando motores, sensores y componentes electrónicos durante reparación",
    title: "Componentes a nivel de fabricante",
    description: "Acceso directo a motores, sensores CIS/UV/MG/IR y placa principal para calibración con estándares de fábrica.",
  },
];

export default function ServicioTecnicoPage() {
  const lightbox = useLightbox(WORKSHOP_IMAGES);

  return (
    <PageTransition>
      {/* ===== FULL-BLEED HERO ===== */}
      <section className="relative min-h-[100svh] flex items-center lg:items-end overflow-hidden bg-[#080e1a] pt-[62px] sm:pt-[68px] pb-[80px] sm:pb-0">
        {/* Background image — desktop: horizontal, mobile: vertical.
            Starts at the very top (behind transparent header) */}
        <picture className="absolute inset-0">
          <source
            media="(min-width: 768px)"
            srcSet="/servicio-tecnico-hero-desktop.png"
            type="image/png"
          />
          <img
            src="/servicio-tecnico-hero-mobile.png"
            alt="AMC Soluciones Perú — Soluciones profesionales para manejo de efectivo"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%] md:object-center"
          />
        </picture>

        {/* Multi-layer overlay for depth + readability (aligned to picture area below header) */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Base dark veil — lighter at bottom per user request */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/30" />
          {/* Left-to-right text readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent md:from-black/50 md:via-transparent md:to-black/30" />
          {/* Bottom gradient — darker, no white fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Blue accent glow */}
          <div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.06] rounded-full blur-3xl"
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
        <div className="relative w-full py-16 sm:py-20 lg:py-0 lg:pb-20 pt-8 sm:pt-12 lg:pt-32 px-6 sm:px-8">
          <div className="container-amc">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              {/* Overline */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 justify-center lg:justify-start">
                <div className="w-8 h-px bg-gold" />
                <span className="overline text-gold tracking-widest">Servicio Técnico</span>
                <div className="w-8 h-px bg-gold" />
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5 sm:mb-6">
                <span className="bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">Soluciones profesionales para</span>{" "}
                manejo de efectivo
              </h1>
              <p className="text-sm sm:text-base tracking-widest text-gold/80">Precisión · Seguridad · Confianza · Control · Respaldo Técnico</p>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-xl mb-8 sm:mb-10 mx-auto lg:mx-0">
                Especializados en equipos GLORY y otras marcas de procesamiento de efectivo. Reparación, calibración, mantenimiento preventivo, actualización de divisas y soporte técnico.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
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
            </div>
          </div>
        </div>

        {/* Scroll indicator — Ver más */}
        <button
          onClick={() => {
            const el = document.getElementById("st-contenido");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors"
          aria-label="Ver más contenido"
        >
          <span className="text-xs tracking-widest uppercase">Ver más</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>
      {/* ===== END FULL-BLEED HERO ===== */}

      {/* ===== TALLER TÉCNICO — Gallery Section ===== */}
      <section id="st-contenido" className="relative bg-[#0B132B] py-16 lg:py-24 overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="relative container-amc">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="overline text-gold tracking-widest">Taller Técnico</span>
              <div className="w-8 h-px bg-gold" />
            </div>
            <h2 className="display-2 text-white mb-4">
              Donde la precisión se <span className="text-gold">reconstruye</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300/80 max-w-2xl mx-auto leading-relaxed">
              Nuestro taller técnico está equipado con herramientas especializadas para diagnóstico, reparación y calibración de equipos de procesamiento de efectivo. Cada equipo recibe atención individualizada por técnicos certificados.
            </p>
          </div>

          {/* Bento-style gallery grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {/* Main large image — spans 2 cols on tablet, 2 rows on desktop */}
            <button
              type="button"
              onClick={() => lightbox.open(0)}
              className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-[#0B132B]"
              aria-label="Ampliar imagen: Revisión de componentes internos"
            >
              <img
                src="/st-workshop-detail.webp"
                alt="Técnico especializado limpiando componentes internos de contadora de billetes con cepillo de precisión"
                className="w-full h-full object-cover aspect-square lg:aspect-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Zoom indicator */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/0 group-hover:text-white/80 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <span className="inline-block text-xs font-mono text-gold bg-gold/10 backdrop-blur-sm border border-gold/20 rounded-full px-3 py-1 mb-2">Diagnóstico</span>
                <h3 className="text-sm sm:text-base lg:text-lg font-display font-bold text-white mb-1">Revisión de componentes internos</h3>
                <p className="text-xs text-slate-300/70 max-w-sm">Limpieza y verificación de circuitos, sensores y piezas móviles con herramientas de precisión.</p>
              </div>
            </button>

            {/* Tall image 1 */}
            <button
              type="button"
              onClick={() => lightbox.open(1)}
              className="row-span-2 group relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-[#0B132B]"
              aria-label="Ampliar imagen: Equipo en diagnóstico"
            >
              <img
                src="/st-workshop-machine.webp"
                alt="Equipo industrial de procesamiento de efectivo en taller técnico AMC"
                className="w-full h-full object-cover aspect-[3/5] lg:aspect-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/0 group-hover:text-white/80 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5">
                <span className="inline-block text-xs font-mono text-gold bg-gold/10 backdrop-blur-sm border border-gold/20 rounded-full px-2 py-0.5 mb-1.5">Reparación</span>
                <h3 className="text-xs sm:text-sm font-display font-semibold text-white">Equipo en diagnóstico</h3>
              </div>
            </button>

            {/* Tall image 2 */}
            <button
              type="button"
              onClick={() => lightbox.open(2)}
              className="row-span-2 group relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-[#0B132B]"
              aria-label="Ampliar imagen: Limpieza técnica"
            >
              <img
                src="/st-workshop-cleaning.webp"
                alt="Mantenimiento preventivo de clasificadora de billetes en taller AMC"
                className="w-full h-full object-cover aspect-[3/5] lg:aspect-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/0 group-hover:text-white/80 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5">
                <span className="inline-block text-xs font-mono text-gold bg-gold/10 backdrop-blur-sm border border-gold/20 rounded-full px-2 py-0.5 mb-1.5">Mantenimiento</span>
                <h3 className="text-xs sm:text-sm font-display font-semibold text-white">Limpieza técnica</h3>
              </div>
            </button>
          </div>

          {/* Full-width panoramic image */}
          <button
            type="button"
            onClick={() => lightbox.open(3)}
            className="mt-3 lg:mt-4 group relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer text-left w-full focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-[#0B132B]"
            aria-label="Ampliar imagen: Componentes a nivel de fabricante"
          >
            <img
              src="/st-workshop-interior.webp"
              alt="Interior de contadora de billetes mostrando motores, sensores y componentes electrónicos durante reparación"
              className="w-full h-48 sm:h-64 lg:h-80 xl:h-96 object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/0 group-hover:text-white/80 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="p-6 sm:p-8 lg:p-12 max-w-lg">
                <span className="inline-block text-xs font-mono text-gold bg-gold/10 backdrop-blur-sm border border-gold/20 rounded-full px-3 py-1 mb-3">Calibración</span>
                <h3 className="text-base sm:text-lg lg:text-xl font-display font-bold text-white mb-2">Componentes a nivel de fabricante</h3>
                <p className="text-xs sm:text-sm text-slate-300/70 leading-relaxed">
                  Acceso directo a motores, sensores CIS/UV/MG/IR y placa principal para calibración y reemplazo de piezas con estándares de fábrica.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>
      {/* ===== END TALLER TÉCNICO ===== */}

      <div className="container-amc py-10">
        <Breadcrumb items={[{ label: "Servicio Técnico" }]} />
      </div>

      {/* Services grid */}
      <section id="servicios" className="container-amc py-12 scroll-mt-20">
        <SectionTitle
          overline="Nuestros servicios"
          title="Servicios técnicos especializados"
          description="Atendemos equipos de diversas marcas con experiencia técnica especializada. Cada servicio incluye reporte técnico."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {SERVICES.map((s) => (
            <StaggerItem key={s.code}>
              <div className="card-base card-hover p-6 h-full flex flex-col text-center">
                <div className="flex flex-col items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center mx-auto">
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
                <ul className="space-y-1.5 mb-5 text-left max-w-xs mx-auto">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#cotizar-servicio"
                  className="text-sm font-semibold text-primary hover:gap-2 inline-flex items-center justify-center gap-1 transition-all"
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
            title="Experiencia en distintas marcas"
            description="Contamos con experiencia técnica en equipos de procesamiento de efectivo de distintas marcas y tecnologías, brindando diagnóstico, mantenimiento, calibración y reparación especializada."
          />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {EQUIPMENT_TYPES.map((e) => (
              <StaggerItem key={e.name}>
                <div className="card-base p-5 sm:p-6 h-full flex flex-col items-center text-center">
                  {/* Small equipment illustration */}
                  <div className="w-20 h-14 mb-4 flex items-center justify-center">
                    <img src={e.image} alt={e.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-3">
                    <e.icon className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-2">{e.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{e.brands}</p>
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
      <section className="bg-muted/40 border-y border-border py-16 sm:py-20">
        <div className="container-amc">
          <SectionTitle
            overline="Planes de mantenimiento"
            title="Elige el plan que se adapta a tu operación"
            description="Planes de mantenimiento preventivo diseñados para reducir fallas inesperadas, prolongar la vida útil de los equipos y mantener la continuidad de la operación."
          />

          <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 mt-12 sm:mt-14">
            {PLANS.map((plan, i) => (
              <ScaleIn key={plan.name} delay={i * 0.1}>
                <div
                  className={`card-base p-6 sm:p-7 h-full flex flex-col relative ${
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
                  <div className="mb-4 sm:mb-5">
                    <h3 className="font-display font-bold text-lg sm:text-xl mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="mb-5 sm:mb-6">
                    <span className="font-display text-3xl sm:text-4xl font-bold text-primary leading-tight">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground ml-2">{plan.period}</span>
                    )}
                  </div>
                  {plan.benefitPhrase && (
                    <p className="text-xs sm:text-sm text-primary font-medium mb-4 sm:mb-5 leading-relaxed">{plan.benefitPhrase}</p>
                  )}
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 flex-1">
                    {plan.features.map((f) => {
                      const isHighlight = f.toLowerCase().includes("garantía") || f.toLowerCase().includes("reporte técnico");
                      return (
                        <li key={f} className={`flex items-start gap-2 text-sm ${isHighlight ? "font-semibold text-foreground" : ""}`}>
                          <CheckCircle2 className={`w-4 h-4 text-success flex-shrink-0 mt-0.5 ${isHighlight ? "w-[18px] h-[18px]" : ""}`} />
                          <span>{f}</span>
                        </li>
                      );
                    })}
                  </ul>
                  {"footnote" in plan && plan.footnote && (
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 sm:mb-5 border-t border-border pt-3 sm:pt-4">{plan.footnote}</p>
                  )}
                  <Link
                    href="#cotizar-servicio"
                    className={`w-full text-center py-3 sm:py-3.5 rounded-md font-semibold text-sm transition-all ${
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
                  { icon: Award, title: "Experiencia en equipos GLORY", desc: "Conocimiento especializado en la marca, no autodidactas." },
                  { icon: ShieldCheck, title: "Repuestos originales", desc: "Trazabilidad desde el fabricante." },
                  { icon: Clock, title: "Respuesta oportuna", desc: "Lima Metropolitana y provincias por coordinación." },
                  { icon: CheckCircle2, title: "Servicio con garantía", desc: "Respaldo en todos los servicios realizados." },
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
                  { value: "+2,500", label: "Equipos atendidos" },
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

      {/* ===== LIGHTBOX ===== */}
      <Lightbox
        images={lightbox.images}
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
        initialIndex={lightbox.activeIndex}
      />
    </PageTransition>
  );
}
