"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, TrendingUp, Wrench } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * HeroPremium — Hero rediseñado con paleta navy + gold.
 * Fondo: #0B132B navy · Acentos: #F5B041 gold
 * Patrón grid simulando seguridad y conteo.
 * Integra las 5 palabras clave: Precisión · Seguridad · Control · Confianza · Respaldo Técnico
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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-navy text-white">
      {/* Background: gradiente + patrón grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 70% 30%, rgba(245, 176, 65, 0.08), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(245, 176, 65, 0.04), transparent 50%)",
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="amc-grid-hero" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#F5B041" strokeWidth="0.3" />
              <circle cx="60" cy="0" r="1" fill="#F5B041" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#amc-grid-hero)" />
        </svg>
      </div>

      <div className="container-amc relative pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="max-w-2xl">
            {/* Badge glory */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-gold/30 bg-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-light">
                  Servicio Técnico Autorizado GLORY · Desde 2010
                </span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-4 leading-[1.1]">
              Precisión y Seguridad
              <span className="block text-gold text-3xl lg:text-4xl mt-2 font-semibold">
                en el manejo de efectivo
              </span>
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-xl">
              El control que tu operación necesita. La confianza que tu negocio merece.
              Respaldo técnico certificado para empresas que no pueden permitirse errores.
            </p>

            {/* 5 keywords badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {keywords.map((k) => (
                <div key={k.word} className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 flex items-center gap-1.5" title={k.desc}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-xs font-semibold text-white">{k.word}</span>
                  <span className="text-[10px] text-white/40 hidden sm:inline">· {k.desc}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link href="/productos" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gold text-gold-foreground font-semibold text-base hover:bg-gold-dark hover:shadow-xl hover:shadow-gold/20 transition-all duration-300">
                Ver Productos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/cotizacion" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
                Cotizar sin compromiso
              </Link>
              <Link href="/servicio-tecnico" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 text-sm">
                <Wrench className="w-4 h-4" />
                Servicio Técnico
              </Link>
            </div>

            {/* Stats */}
            <dl className="grid grid-cols-3 gap-6 max-w-md">
              {AMCCONFIG.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl lg:text-3xl font-bold text-gold">{s.value}</dt>
                  <dd className="text-xs text-white/50 mt-0.5">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — featured product */}
          <div className="relative hidden lg:block">
            <div className="border border-white/10 rounded-2xl p-8 bg-navy-light/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gold">Modelo destacado</div>
                  <div className="font-display font-bold text-xl text-white mt-1">AMC-9100</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold/20 text-gold border border-gold/30">Más vendido</span>
              </div>
              <div className="aspect-[3/2] rounded-lg overflow-hidden mb-6 relative bg-navy/80">
                <Image
                  src="/hero-producto.png"
                  alt="AMC-9100 Contadora de Billetes"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain"
                  priority
                />
                <div className="absolute -top-2 -right-2 rounded-full p-2 bg-gold/20 border border-gold/30 z-10">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: "Velocidad", value: "1,200 bpm" },
                  { label: "Detección", value: "UV + MG + IR" },
                  { label: "Capacidad", value: "500 billetes" },
                  { label: "Garantía", value: "12 meses oficial" },
                ].map((spec) => (
                  <div key={spec.label} className="bg-white/5 rounded-md p-2.5 border border-white/5">
                    <dt className="text-white/40">{spec.label}</dt>
                    <dd className="text-white font-semibold mt-0.5 font-mono">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="absolute -bottom-4 -left-4 border border-white/10 rounded-xl px-4 py-3 bg-navy flex items-center gap-3 shadow-xl">
              <TrendingUp className="w-5 h-5 text-gold" />
              <div>
                <div className="text-xs font-semibold text-white">+2,500 equipos</div>
                <div className="text-[10px] text-white/40">instalados en Perú</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade sutil — continuidad visual */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
