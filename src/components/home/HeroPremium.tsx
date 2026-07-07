"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * HeroPremium — Portada full-bleed e inmersiva AMC.
 * Texto a la izquierda, máquina a la derecha sin bordes de tarjeta.
 * Fondo con gradiente dramático, grid sutil y efectos de brillo.
 */
export function HeroPremium() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy text-white"
    >
      {/* Inmersive background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-[#0c1a2e] to-[#081422]" />
        {/* Subtle radial glow behind the product */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.07] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/[0.04] rounded-full blur-3xl" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-amc relative pt-14 pb-10 sm:pt-16 sm:pb-12 lg:pt-24 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Izquierda — texto principal */}
          <div className="max-w-xl">
            <h1 className="font-display text-[1.65rem] sm:text-3xl lg:text-5xl xl:text-[3.4rem] font-bold text-white leading-[1.2] lg:leading-[1.15] mb-4 lg:mb-6">
              Equipos profesionales para{" "}
              <span className="text-white/90">conteo y control</span> de efectivo
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed mb-6 lg:mb-8 max-w-lg">
              Contadoras de billetes y monedas con detección avanzada, venta y
              servicio técnico especializado en Perú.
            </p>

            {/* CTAs — solo 2 botones limpios */}
            <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-6 lg:mb-10">
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-7 lg:py-3.5 rounded-lg bg-white text-navy font-semibold text-sm lg:text-[15px] hover:bg-white/90 transition-colors"
              >
                Ver equipos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${encodeURIComponent(AMCCONFIG.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 lg:px-6 lg:py-3.5 rounded-lg border border-white/20 text-white/80 hover:bg-white/5 hover:text-white transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar asesoría
              </a>
            </div>

            {/* 3 stats limpios */}
            <dl className="flex gap-8 lg:gap-10">
              {AMCCONFIG.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-xl lg:text-3xl font-bold text-white">
                    {s.value}
                  </dt>
                  <dd className="text-[10px] lg:text-xs text-white/40 mt-0.5 lg:mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Derecha — máquina sin fondo, sobre el dark hero */}
          <div className="relative flex justify-center lg:justify-end order-first lg:order-last">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl">
              <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[480px] xl:h-[540px]">
                <Image
                  src="/hero-right.png"
                  alt="Contadora de billetes AMC — Equipo profesional de conteo de efectivo"
                  fill
                  sizes="(max-width: 1024px) 80vw, 550px"
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}