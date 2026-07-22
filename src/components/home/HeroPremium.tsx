"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";
import { AMCCONFIG, AMC_LEMA } from "@/lib/site-config";
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
    src: "/amc-cm3400max.webp",
    model: "AMC-CM3400 MAX",
    tagline: "Más velocidad para grandes cantidades.",
  },
  {
    src: "/amc-2000.webp",
    model: "AMC-2000",
    tagline: "Solución esencial para todo negocio.",
  },
  {
    src: "/amc-9100.webp",
    model: "AMC-9100",
    tagline: "Máxima precisión y seguridad en detección.",
  },
  {
    src: "/amc-8200.webp",
    model: "AMC-8200",
    tagline: "Conteo rápido, continuo y confiable.",
  },
] as const;

const INTERVAL_MS = 3500;

/* ────────────────────────────────────────────────
   Premium Background Particles (Deterministic for SSR)
   ──────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  size: 2 + (i % 4) * 2,
  left: (i * 13) % 100,
  top: (i * 19) % 100,
  duration: 4 + (i % 4) * 2,
  delay: (i % 5) * 0.5,
}));

function PremiumParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-emerald-400/20 rounded-full blur-[1px]"
          style={{ width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%` }}
          animate={{
            y: [0, -30, 0],
            x: [0, (p.id % 2 === 0 ? 15 : -15), 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────
   Animation variants
   ──────────────────────────────────────────────── */
const imageVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 1.05,
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
      className="relative flex items-center overflow-hidden bg-navy text-white pt-[76px] sm:pt-[84px] pb-12 sm:pb-16 lg:pb-20"
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
        <PremiumParticles />
      </div>

      <div className="container-amc relative pb-4 sm:pb-6 lg:pb-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-center">

          {/* ── Mobile: Carousel FIRST (order-first) / Desktop: carousel RIGHT (order-last) ── */}
          <div
            className="relative flex flex-col items-center order-first lg:order-last w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          >
            {/* Image container — uniform aspect ratio, scaled down on mobile to fit the screen */}
            <div className="relative w-full max-w-[55vw] sm:max-w-[70vw] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[600px] mx-auto">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4]">
                <AnimatePresence custom={direction}>
                  <motion.div
                    key={product.model}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1], // AMC ease
                      opacity: { duration: 0.5 },
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.src}
                      alt={`${product.model} — ${product.tagline}`}
                      fill
                      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 600px"
                      className="object-contain object-center p-1 sm:p-2 lg:p-3"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Model label — always CENTERED under image */}
            <div className="mt-1 sm:mt-4 lg:mt-5 text-center w-full min-h-[50px] sm:min-h-0">
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
              className="flex items-center gap-2 mt-2 sm:mt-4"
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
            <h1 className="font-display text-2xl sm:text-3xl lg:text-5xl xl:text-[3.4rem] font-bold text-white leading-[1.15] mb-2 lg:mb-6">
              Equipos profesionales para{" "}
              <span className="text-white/90">conteo y control</span> de efectivo
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-white/60 leading-relaxed mb-2 lg:mb-8 max-w-lg hidden sm:block">
              Contadoras de billetes y monedas con detección avanzada, venta y
              servicio técnico especializado en Perú.
            </p>

            {/* Lema oficial */}
            <p className="text-[10px] sm:text-sm text-gold/80 tracking-widest font-medium mb-2 lg:mb-8">
              {AMC_LEMA}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-2 lg:mb-10">
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
            <dl className="flex gap-6 lg:gap-10">
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
      {/* Scroll indicator — Ver más */}
      <button
        onClick={() => {
          const el = document.getElementById("confianza");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors"
        aria-label="Ver más contenido"
      >
        <span className="text-[10px] tracking-widest uppercase">Ver más</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}