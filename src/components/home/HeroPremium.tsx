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
    src: "/uploads/products/amc-cm3400/img-01.webp",
    model: "AMC-CM3400",
    tagline: "Cuenta monedas en minutos, no a mano.",
    scale: "scale-105",
  },
  {
    src: "/uploads/products/amc-3200/img-01.webp",
    model: "AMC-3200",
    tagline: "Conteo profesional, simple y confiable.",
    scale: "scale-90",
  },
  {
    src: "/uploads/products/amc-8100/img-01.webp",
    model: "AMC-8100",
    tagline: "Pantalla Full Touch para contar con precisión.",
    scale: "scale-100",
  },
  {
    src: "/uploads/products/amc-9200/img-01.webp",
    model: "AMC-9200",
    tagline: "Clasificación Full Fitness bancaria.",
    scale: "scale-[1.15]",
  },
  {
    src: "/uploads/products/amc-cm3400-max/img-01.webp",
    model: "AMC-CM3400 MAX",
    tagline: "Más velocidad para grandes cantidades.",
    scale: "scale-105",
  },
  {
    src: "/uploads/products/amc-2000/img-01.webp",
    model: "AMC-2000",
    tagline: "Solución esencial para todo negocio.",
    scale: "scale-95",
  },
  {
    src: "/uploads/products/amc-9100/img-01.webp",
    model: "AMC-9100",
    tagline: "Máxima precisión y seguridad en detección.",
    scale: "scale-110",
  },
  {
    src: "/uploads/products/amc-8200/img-01.webp",
    model: "AMC-8200",
    tagline: "Conteo rápido, continuo y confiable.",
    scale: "scale-[1.05]",
  },
] as const;

const INTERVAL_MS = 3500;

/* ────────────────────────────────────────────────
   Premium Background Particles (Deterministic for SSR)
   ──────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  size: 2 + (i % 5) * 1.5,
  left: (i * 11) % 100,
  top: (i * 17) % 100,
  duration: 3 + (i % 3) * 2,
  delay: (i % 6) * 0.4,
}));

function PremiumParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ 
            width: p.size, 
            height: p.size, 
            left: `${p.left}%`, 
            top: `${p.top}%`,
            background: p.id % 3 === 0 ? "rgba(16, 185, 129, 0.6)" : "rgba(245, 176, 65, 0.4)", // Emerald and Gold
            boxShadow: p.id % 3 === 0 ? "0 0 10px 2px rgba(16, 185, 129, 0.2)" : "0 0 10px 2px rgba(245, 176, 65, 0.1)",
            filter: "blur(1px)"
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
            opacity: [0, 0.8, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration * 1.5,
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
    filter: "blur(8px)",
    scale: 0.92,
    y: 10,
  }),
  center: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    filter: "blur(8px)",
    scale: 1.08,
    y: -10,
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
      className="relative flex items-center overflow-hidden bg-navy text-white pt-[60px] sm:pt-[70px] lg:pt-[80px] pb-10 sm:pb-12 lg:pb-12 min-h-[100svh] lg:min-h-[580px] 2xl:min-h-[85vh]"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-[#0c1a2e] to-[#081422]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-3xl" />
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── Mobile: Carousel FIRST (order-first) / Desktop: carousel RIGHT (order-last) ── */}
          <div
            className="relative flex flex-col items-center order-first lg:order-last w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          >
            {/* Image container — uniform aspect ratio, significantly larger for better visibility */}
            <div className="relative w-full max-w-[320px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] mx-auto h-[320px] md:h-[450px] lg:h-[550px] xl:h-[600px]">
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence custom={direction}>
                  <motion.div
                    key={product.model}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1], // iOS style ease out
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src={product.src}
                      alt={`${product.model} — ${product.tagline}`}
                      fill
                      sizes="(max-width: 767px) 320px, (max-width: 1024px) 450px, (max-width: 1280px) 550px, 650px"
                      className={`object-contain transition-transform duration-500 ${product.scale || ""}`}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Model label — always CENTERED under image */}
            <div className="relative z-10 -mt-6 sm:-mt-8 lg:-mt-10 text-center w-full min-h-[50px] sm:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.model + "-label"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="inline-block px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-sm border border-gold/40 text-gold text-xs sm:text-sm font-bold tracking-wider shadow-lg">
                    {product.model}
                  </span>
                  <p className="text-[12px] sm:text-sm lg:text-base text-white/90 mt-2 max-w-[280px] sm:max-w-xs mx-auto leading-relaxed font-medium">
                    {product.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots — centered */}
            <div
              className="flex items-center justify-center gap-2 mt-4 sm:mt-6 w-full"
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
          <div className="max-w-xl lg:order-first z-10 relative pt-4 sm:pt-6 lg:pt-0">
            <h1 className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl xl:text-[2.75rem] 2xl:text-[3.4rem] font-bold text-white leading-[1.2] mb-5 lg:mb-6 text-balance">
              Equipos profesionales para{" "}
              <span className="text-white/90">conteo y control</span> de efectivo
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed mb-6 lg:mb-8 max-w-lg">
              Contadoras de billetes y monedas con detección avanzada, venta y
              servicio técnico especializado en Perú.
            </p>

            {/* Lema oficial */}
            <p className="text-[11px] sm:text-sm text-gold/90 tracking-widest font-semibold mb-8 lg:mb-10">
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