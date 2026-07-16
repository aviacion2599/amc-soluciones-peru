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
    src: "/amc-cm3400.webp",
    model: "AMC-CM3400",
    tagline: "Cuenta monedas en minutos, no a mano.",
  },
  {
    src: "/amc-3200.webp",
    model: "AMC-3200",
    tagline: "Conteo profesional, simple y confiable.",
  },
  {
    src: "/amc-8100.webp",
    model: "AMC-8100",
    tagline: "Pantalla Full Touch para contar con precisión.",
  },
  {
    src: "/amc-9200.webp",
    model: "AMC-9200",
    tagline: "Clasificación Full Fitness bancaria.",
  },
  {
    src: "/amc-8300-pro.webp",
    model: "AMC-8300 PRO",
    tagline: "Tecnología superior para operaciones exigentes.",
  },
  {
    src: "/amc-cm3400max.webp",
    model: "AMC-CM3400 MAX",
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
    x: dir > 0 ? 30 : -30,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -30 : 30,
  }),
};

/**
 * HeroPremium — Mobile-first hero con carrusel de productos.
 * Mobile: imagen grande arriba, texto abajo.
 * Desktop: texto izquierda, carrusel derecha.
 */
export function HeroPremium() {
  const [[page, direction], setPage] = React.useState([0, 1]);
  const [isPaused, setIsPaused] = React.useState(false);

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
      {/* ── Background layers ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-[#0c1a2e] to-[#081422]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.07] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/[0.04] rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-amc relative pt-12 pb-8 sm:pt-16 sm:pb-12 lg:pt-24 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-center">

          {/* ── Mobile: Carousel FIRST (order-first) / Desktop: carousel RIGHT (order-last) ── */}
          <div
            className="relative flex flex-col items-center order-first lg:order-last w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          >
            {/* Image container — mobile: square & as large as possible, flush top */}
            <div className="relative w-full max-w-[85vw] sm:max-w-[420px] lg:max-w-xl xl:max-w-2xl">
              <div className="relative w-full aspect-square lg:aspect-[4/3]">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={product.model}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 280, damping: 30 },
                      opacity: { duration: 0.3, ease: "easeInOut" },
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.src}
                      alt={`${product.model} — ${product.tagline}`}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 420px, 550px"
                      className="object-contain object-center"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Model label — always CENTERED under image */}
            <div className="mt-3 sm:mt-4 lg:mt-5 text-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.model + "-label"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="inline-block px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-black/40 backdrop-blur-sm border border-gold/30 text-gold text-xs sm:text-sm font-bold tracking-wider">
                    {product.model}
                  </span>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-white/55 mt-1 max-w-[280px] sm:max-w-xs mx-auto leading-relaxed">
                    {product.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots — centered */}
            <div
              className="flex items-center gap-2 mt-3 sm:mt-4"
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

          {/* ── Left text (mobile: below carousel / desktop: left column) ── */}
          <div className="max-w-xl lg:order-first">
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

        </div>
      </div>
    </section>
  );
}