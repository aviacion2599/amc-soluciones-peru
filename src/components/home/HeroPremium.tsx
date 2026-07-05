"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * HeroPremium — Portada limpia y corporativa AMC.
 * Texto a la izquierda, máquina a la derecha.
 * Tonos azul oscuro, gris/plomo y blanco.
 */
export function HeroPremium() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy text-white"
    >
      {/* Fondo limpio: gradiente sutil sin patrón */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2035] to-[#0a1628]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 75% 50%, rgba(255,255,255,0.03), transparent 60%)",
          }}
        />
      </div>

      <div className="container-amc relative pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Izquierda — texto principal */}
          <div className="max-w-xl">
            <h1 className="font-display text-4xl lg:text-5xl xl:text-[3.4rem] font-bold text-white leading-[1.15] mb-6">
              Equipos profesionales para{" "}
              <span className="text-white/90">conteo y control</span> de efectivo
            </h1>

            <p className="text-base lg:text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
              Contadoras de billetes y monedas con detección avanzada, venta y
              servicio técnico especializado en Perú.
            </p>

            {/* CTAs — solo 2 botones limpios */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-navy font-semibold text-[15px] hover:bg-white/90 transition-colors"
              >
                Ver equipos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${encodeURIComponent(AMCCONFIG.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/20 text-white/80 hover:bg-white/5 hover:text-white transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar asesoría
              </a>
            </div>

            {/* 3 stats limpios */}
            <dl className="flex gap-10">
              {AMCCONFIG.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl lg:text-3xl font-bold text-white">
                    {s.value}
                  </dt>
                  <dd className="text-xs text-white/40 mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Derecha — máquina nítida */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-[#0d1f38]/60 border border-white/[0.06]">
                <Image
                  src="/hero-producto.png"
                  alt="Contadora de billetes AMC — Equipo profesional de conteo de efectivo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-contain p-6"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transición suave al fondo blanco */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}