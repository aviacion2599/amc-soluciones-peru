"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Award, Package, Users } from "lucide-react";
import { FadeIn } from "@/components/shared/Motion";

/* ── Data ── */
const STATS = [
  { icon: Award, value: 7, suffix: "", display: "+7", label: "Años de experiencia" },
  { icon: Package, value: 2500, suffix: "", display: "+2,500", label: "Equipos atendidos" },
  { icon: Users, value: 800, suffix: "", display: "+800", label: "Clientes activos" },
];

/* ── Animated counter hook ── */
function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count;
}

/* ── Stat card ── */
function StatCard({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(stat.value, inView);
  const Icon = stat.icon;

  const formatted = stat.value >= 1000
    ? `+${count.toLocaleString("es-PE")}`
    : `+${count}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-7 text-center hover:border-[#F5B041] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-[#F5B041]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#F5B041]/20 transition-colors">
        <Icon className="w-5 h-5 text-[#F5B041]" strokeWidth={1.75} />
      </div>

      {/* Number */}
      <div className="font-display text-3xl sm:text-4xl font-bold text-[#F5B041] mb-1">
        {inView ? formatted : stat.display}
      </div>

      {/* Label */}
      <p className="text-sm text-slate-400 leading-snug">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ── Main section ── */
export function AboutAMC() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-[#0B132B] border-t border-white/5 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 70% 50%, rgba(245, 176, 65, 0.04), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-amc relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">

          {/* ── Left column: Text ── */}
          <FadeIn className="order-1">
            <div className="max-w-xl">
              {/* Overline */}
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#F5B041]" />
                <span className="overline text-[#F5B041] tracking-widest">Sobre AMC</span>
              </div>

              {/* Title */}
              <h2 className="display-2 text-white mb-6 text-balance">
                Venta y servicio técnico{" "}
                <span className="text-[#F5B041]">especializado</span>
              </h2>

              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                AMC Soluciones Perú se especializa en la venta de contadoras profesionales
                de billetes y monedas, mantenimiento preventivo y correctivo, reparación,
                calibración y soporte técnico para equipos de procesamiento de efectivo.
              </p>

              {/* Lema oficial — 5 pilares */}
              <p className="text-sm text-[#F5B041]/70 tracking-widest font-medium mb-6">
                Precisión · Seguridad · Confianza · Control · Respaldo Técnico
              </p>

              {/* Accent line */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#F5B041] to-transparent" />
            </div>
          </FadeIn>

          {/* ── Right column: Stat cards ── */}
          <div className="order-2">
            {/* Mobile: stacked vertically. Tablet: 3-col row. Desktop: stacked. */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5B041]/20 to-transparent" />
    </section>
  );
}