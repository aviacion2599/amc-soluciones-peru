"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Banknote } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * HeroPremium — Hero full-bleed con gradiente azul corporativo AMC (#003366),
 * glass card del producto destacado, mini-stats de impacto y CTAs duales.
 */
export function HeroPremium() {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001f4d] via-[#003366] to-[#0a1420]" />
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(176, 176, 176, 0.18), transparent 60%)",
          }}
        />
        {/* Blueprint pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="amc-blueprint" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#amc-blueprint)" />
        </svg>
      </div>

      <div className="container-amc relative py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left — copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"
                aria-hidden="true"
              />
              <span className="overline text-slate-200">
                Servicio Técnico Autorizado · GLORY
              </span>
            </div>

            <h1 className="display-1 text-white mb-6 text-balance">
              Precisión y Seguridad en
              <span className="block bg-gradient-to-r from-sky-200 via-blue-200 to-slate-200 bg-clip-text text-transparent">
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
              <Link
                href="#productos"
                className="btn-primary px-6 py-3.5 text-base bg-white text-primary hover:bg-slate-100 hover:shadow-amc-xl"
                style={{ backgroundColor: "white", color: "var(--primary)" }}
              >
                Ver Productos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#cotizacion"
                className="btn-glass px-6 py-3.5 text-base"
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar Cotización
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

          {/* Right — featured product visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Glass frame */}
              <div className="glass-card rounded-2xl p-8 shadow-amc-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="overline text-slate-300">Modelo destacado</div>
                    <div className="font-display font-bold text-xl text-white mt-1">
                      AMC-9100
                    </div>
                  </div>
                  <span className="badge-success">
                    Más vendido
                  </span>
                </div>

                {/* Product silhouette */}
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-slate-800/60 to-slate-900/60 flex items-center justify-center p-4 mb-6">
                  <div className="text-center">
                    <Banknote
                      className="w-24 h-24 mx-auto text-sky-200 mb-3"
                      strokeWidth={1.2}
                    />
                    <div className="font-mono text-xs text-slate-400">
                      Contadora de Billetes · 1200/min
                    </div>
                  </div>
                </div>

                {/* Mini specs */}
                <dl className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Velocidad", value: "1,200 bpm" },
                    { label: "Detección", value: "UV + MG + IR" },
                    { label: "Capacidad", value: "500 billetes" },
                    { label: "Garantía", value: "12 meses" },
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
              </div>

              {/* Floating accent badge */}
              <div className="absolute -top-4 -right-4 glass-card rounded-full p-3 shadow-amc-xl">
                <ShieldCheck className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/40 to-transparent" />
    </section>
  );
}
