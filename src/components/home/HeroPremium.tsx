"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";

/* ────────────────────────────────────────────────
   Product data for the hero carousel
   ──────────────────────────────────────────────── */
const HERO_PRODUCTS = [
  {
    src: "/amc-3200.webp",
    model: "AMC-3200",
    tagline: "Conteo profesional, simple y confiable.",
  },
  {
    src: "/amc-9100.webp",
    model: "AMC-9100",
    tagline: "Cuenta y separa sin detener la operación.",
  },
  {
    src: "/amc-9200.webp",
    model: "AMC-9200",
    tagline: "Clasificación avanzada para mayor control.",
  },
  {
    src: "/amc-8300-pro.webp",
    model: "AMC-8300 PRO",
    tagline: "Tecnología superior para operaciones exigentes.",
  },
  {
    src: "/amc-cm3400.webp",
    model: "AMC-CM3400",
    tagline: "Cuenta monedas en minutos, no a mano.",
  },
  {
    src: "/amc-cm3400max.webp",
    model: "AMC-CM3400MAX",
    tagline: "Más velocidad para grandes cantidades.",
  },
] as const;

const INTERVAL_MS = 2500;

/* ────────────────────────────────────────────────
   Animation variants
   ──────────────────────────────────────────────── */
const imageVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    scale: 1.08,
    x: dir > 0 ? 60 : -60,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 0.94,
    x: dir > 0 ? -60 : 60,
    filter: "blur(4px)",
  }),
};

const textVariants = {
  enter: { opacity: 0, y: 16, filter: "blur(4px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(2px)" },
};

/**
 * HeroPremium — Portada full-bleed e inmersiva AMC.
 * Texto a la izquierda, carrusel de máquinas a la derecha.
 * Fondo con gradiente dramático, grid sutil y efectos de brillo.
 */
export function HeroPremium() {
  const [[page, direction], setPage] = React.useState([0, 1]);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto‑advance
  React.useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setPage(([p]) => [p + 1, 1]);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  const idx = ((page % HERO_PRODUCTS.length) + HERO_PRODUCTS.length) % HERO_PRODUCTS.length;
  const product = HERO_PRODUCTS[idx];
  const progress = ((page % HERO_PRODUCTS.length) + HERO_PRODUCTS.length) % HERO_PRODUCTS.length;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy text-white"
    >
      {/* ── Inmersive background layers ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-[#0c1a2e] to-[#081422]" />
        {/* Radial glow that subtly shifts color per product */}
        <motion.div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          animate={{
            background: [
              "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(245,176,65,0.06) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: INTERVAL_MS * HERO_PRODUCTS.length / 1000, repeat: Infinity, ease: "linear" }}
        />
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
          {/* ── Izquierda — texto principal ── */}
          <div className="max-w-xl">
            <h1 className="font-display text-[1.65rem] sm:text-3xl lg:text-5xl xl:text-[3.4rem] font-bold text-white leading-[1.2] lg:leading-[1.15] mb-4 lg:mb-6">
              Equipos profesionales para{" "}
              <span className="text-white/90">conteo y control</span> de efectivo
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed mb-6 lg:mb-8 max-w-lg">
              Contadoras de billetes y monedas con detección avanzada, venta y
              servicio técnico especializado en Perú.
            </p>

            {/* CTAs */}
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

            {/* 3 stats */}
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

          {/* ── Derecha — Product carousel ── */}
          <div
            className="relative flex flex-col items-center lg:items-end order-first lg:order-last"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          >
            {/* Image container */}
            <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              <div className="relative w-full h-[260px] sm:h-[300px] md:h-[360px] lg:h-[440px] xl:h-[500px]">
                <AnimatePresence custom={direction} mode="popLayout">
                  <motion.div
                    key={product.model}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4, ease: "easeInOut" },
                      scale: { duration: 0.5, ease: "easeInOut" },
                      filter: { duration: 0.35 },
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.src}
                      alt={`${product.model} — ${product.tagline}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 550px"
                      className="object-contain object-center drop-shadow-2xl"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Model name + tagline below image */}
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4 sm:mt-5 lg:mt-6 text-center lg:text-right px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.model + "-text"}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {/* Model badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs sm:text-sm font-semibold tracking-wide mb-2">
                    {product.model}
                  </span>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                    {product.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div
              className="flex items-center gap-2 mt-4 sm:mt-5"
              role="tablist"
              aria-label="Productos destacados"
            >
              {HERO_PRODUCTS.map((p, i) => {
                const isActive = i === progress;
                return (
                  <button
                    key={p.model}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={p.model}
                    onClick={() => setPage([i, i > progress ? 1 : -1])}
                    className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-full"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-7 h-2 bg-gold"
                          : "w-2 h-2 bg-white/20 group-hover:bg-white/40"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}