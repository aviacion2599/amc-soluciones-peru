"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Banknote, TrendingUp, Wrench, Sparkles } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * HeroPremium — Hero rediseñado con narrativa de marca fuerte.
 * Integra las 5 palabras clave: Precisión · Seguridad · Control · Confianza · Respaldo Técnico
 * 
 * Estructura:
 * - Overline con respaldo GLORY
 * - Headline con propuesta de valor diferencial
 * - Subhead con las 5 keywords ancladas
 * - CTAs duales (explorar + convertir)
 * - Stats de impacto
 * - Badge de producto destacado con specs técnicas
 * - Indicador de confianza: "Servicio técnico autorizado"
 */
export function HeroPremium() {
  const keywords = [
    { word: "Precisión", desc: "99.8% de exactitud" },
    { word: "Seguridad", desc: "UV · MG · IR" },
    { word: "Control", desc: "24h de respuesta" },
    { word: "Confianza", desc: "2,500+ equipos" },
    { word: "Respaldo", desc: "Técnicos certificados" },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a3a] via-[#002855] to-[#003366]" />
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 70% 25%, rgba(176, 176, 176, 0.15), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(0, 75, 150, 0.2), transparent 50%)",
          }}
        />
        {/* Industrial accent lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="amc-tech" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.3" />
              <circle cx="80" cy="0" r="1.5" fill="white" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#amc-tech)" />
        </svg>
      </div>

      <div className="container-amc relative py-16 lg:py-28">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Left — copy reforzada */}
          <div className="max-w-2xl">
            {/* Overline con respaldo */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span className="overline text-slate-200">
                  Servicio Técnico Autorizado GLORY · Desde 2010
                </span>
              </span>
            </div>

            {/* Headline principal con las 5 keywords */}
            <h1 className="display-1 text-white mb-4 text-balance leading-[1.1]">
              <span className="bg-gradient-to-r from-sky-200 via-blue-200 to-slate-200 bg-clip-text text-transparent">
                Precisión y Seguridad
              </span>
              <span className="block text-white/90 text-3xl lg:text-4xl mt-2 font-medium">
                en el manejo de efectivo
              </span>
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed mb-6 max-w-xl">
              El control que tu operación necesita. La{" "}
              <strong className="text-white">confianza</strong> que tu negocio merece.
              Respaldo técnico certificado para empresas que no pueden permitirse errores.
            </p>

            {/* 5 keywords visuales */}
            <div className="flex flex-wrap gap-2 mb-8">
              {keywords.map((k) => (
                <div
                  key={k.word}
                  className="glass-card px-3 py-1.5 rounded-md flex items-center gap-1.5"
                  title={k.desc}
                >
                  <Sparkles className="w-3 h-3 text-sky-200" />
                  <span className="text-xs font-semibold text-white">{k.word}</span>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">· {k.desc}</span>
                </div>
              ))}
            </div>

            {/* Hero actions */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                href="/productos"
                className="btn-primary px-6 py-3.5 text-base bg-white text-primary hover:bg-slate-100 hover:shadow-amc-xl transition-all inline-flex items-center gap-2"
              >
                Ver Productos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cotizacion"
                className="btn-glass px-6 py-3.5 text-base inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Cotizar sin compromiso
              </Link>
              <Link
                href="/servicio-tecnico"
                className="btn-glass px-6 py-3.5 text-base inline-flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                Servicio Técnico
              </Link>
            </div>

            {/* Hero quick stats */}
            <dl className="grid grid-cols-3 gap-6 max-w-md">
              {AMCCONFIG.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl lg:text-3xl font-bold text-white">
                    {s.value}
                  </dt>
                  <dd className="text-xs text-slate-300 mt-0.5">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — Featured product + trust signals */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Glass card del producto destacado */}
              <div className="glass-card rounded-2xl p-8 shadow-amc-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="overline text-slate-300">Modelo destacado</div>
                    <div className="font-display font-bold text-xl text-white mt-1">
                      AMC-9100
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/20 text-success border border-success/30">
                    Más vendido
                  </span>
                </div>

                {/* Product visual con badge de garantía */}
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-slate-800/60 to-slate-900/60 flex items-center justify-center p-4 mb-6 relative">
                  <div className="text-center">
                    <Banknote
                      className="w-24 h-24 mx-auto text-sky-200 mb-3"
                      strokeWidth={1.2}
                    />
                    <div className="font-mono text-xs text-slate-400">
                      Contadora de Billetes · 1,200/min
                    </div>
                  </div>
                  {/* Sello de garantía */}
                  <div className="absolute -top-2 -right-2 glass-card rounded-full p-2 shadow-amc-xl">
                    <ShieldCheck className="w-5 h-5 text-success" />
                  </div>
                </div>

                {/* Mini specs grid */}
                <dl className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Velocidad", value: "1,200 bpm" },
                    { label: "Detección", value: "UV + MG + IR" },
                    { label: "Capacidad", value: "500 billetes" },
                    { label: "Garantía", value: "12 meses oficial" },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-white/5 rounded-md p-2.5 border border-white/10"
                    >
                      <dt className="text-slate-400">{spec.label}</dt>
                      <dd className="text-white font-semibold mt-0.5 font-mono">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* CTA directa al producto */}
                <Link
                  href="/productos/amc-9100"
                  className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-md text-sm font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Ver ficha técnica completa
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Trust indicators flotantes */}
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3 shadow-amc-xl flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-success" />
                <div>
                  <div className="text-xs font-semibold text-white">+2,500 equipos</div>
                  <div className="text-[10px] text-slate-400">instalados en Perú</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
