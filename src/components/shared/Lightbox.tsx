"use client";

import * as React from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface LightboxImage {
  /** Thumbnail / gallery src (small, already loaded) */
  src: string;
  /** Full-resolution src (loaded on-demand when lightbox opens) */
  fullSrc?: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface LightboxProps {
  images: LightboxImage[];
  isOpen: boolean;
  onClose: () => void;
  /** Starting index (default 0) */
  initialIndex?: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const SWIPE_THRESHOLD = 40;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Lightbox({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: LightboxProps) {
  const [index, setIndex] = React.useState(initialIndex);
  const [zoomed, setZoomed] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(true);
  const [loaded, setLoaded] = React.useState<Record<number, boolean>>({});
  const [panPos, setPanPos] = React.useState({ x: 0, y: 0 });

  const imgRef = React.useRef<HTMLImageElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const total = images.length;
  const current = images[index];

  /* Reset when opened */
  React.useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      setZoomed(false);
      setShowInfo(true);
      setPanPos({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialIndex]);

  /* Reset zoom on index change */
  React.useEffect(() => {
    setZoomed(false);
    setPanPos({ x: 0, y: 0 });
    setLoaded((prev) => ({ ...prev, [index]: false }));
  }, [index]);

  /* ---- Navigation ---- */
  const go = React.useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => clamp(i + dir, 0, total - 1));
    },
    [total]
  );
  const prev = React.useCallback(() => go(-1), [go]);
  const next = React.useCallback(() => go(1), [go]);

  /* ---- Keyboard ---- */
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
        case "+":
        case "=":
          setZoomed(true);
          break;
        case "-":
          setZoomed(false);
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, prev, next]);

  /* ---- Touch / swipe ---- */
  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      if (info.offset.x < 0) next();
      else prev();
    }
  };

  /* ---- Double-click zoom ---- */
  const lastTap = React.useRef(0);
  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setZoomed((z) => !z);
      setPanPos({ x: 0, y: 0 });
    }
    lastTap.current = now;
  };

  /* ---- Focus trap ---- */
  React.useEffect(() => {
    if (!isOpen) return;
    const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen, index]);

  /* ---- Backdrop click ---- */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* ---------- OVERLAY ---------- */
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería — imagen ${index + 1} de ${total}`}
          className="amc-lightbox fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={handleBackdropClick}
        >
          {/* ---- Backdrop ---- */}
          <motion.div
            className="absolute inset-0 bg-black/92 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ---- Close button ---- */}
          <button
            onClick={onClose}
            className="amc-lightbox-close absolute top-3 right-3 sm:top-5 sm:right-5 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
            aria-label="Cerrar galería"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* ---- Counter ---- */}
          <div className="amc-lightbox-counter absolute top-3 left-3 sm:top-5 sm:left-5 z-50 flex items-center gap-3">
            <span className="text-xs sm:text-sm font-mono text-white/60 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 select-none">
              {index + 1}{" "}
              <span className="text-white/30">/</span> {total}
            </span>
          </div>

          {/* ---- Prev / Next ---- */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="amc-lightbox-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="amc-lightbox-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* ---- Bottom toolbar ---- */}
          <div className="amc-lightbox-toolbar absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); setPanPos({ x: 0, y: 0 }); }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
              aria-label={zoomed ? "Reducir zoom" : "Ampliar zoom"}
            >
              {zoomed ? (
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {current?.title && (
              <button
                onClick={(e) => { e.stopPropagation(); setShowInfo((s) => !s); }}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                  showInfo
                    ? "bg-gold/20 border-gold/30 text-gold"
                    : "bg-white/10 hover:bg-white/20 border-white/10 text-white/80 hover:text-white"
                }`}
                aria-label="Mostrar información"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement("a");
                link.href = current.fullSrc || current.src;
                link.download = `amc-taller-${index + 1}.webp`;
                link.click();
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
              aria-label="Descargar imagen"
            >
              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* ---- Image container ---- */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center p-12 sm:p-16 cursor-grab active:cursor-grabbing select-none"
            onClick={handleTap}
            onPanEnd={zoomed ? undefined : onPanEnd}
            drag={zoomed ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="relative max-w-full max-h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.92, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: -30 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Loading spinner */}
                {!loaded[index] && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
                  </div>
                )}

                <img
                  ref={imgRef}
                  src={current?.fullSrc || current?.src}
                  alt={current?.alt || ""}
                  className={`max-w-full max-h-[80vh] object-contain rounded-lg sm:rounded-xl transition-transform duration-300 ${
                    zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  style={
                    zoomed
                      ? {
                          transform: `scale(2) translate(${panPos.x}px, ${panPos.y}px)`,
                          transition: "transform 0.3s ease",
                        }
                      : { transform: "scale(1)" }
                  }
                  loading="eager"
                  draggable={false}
                  onLoad={() =>
                    setLoaded((prev) => ({ ...prev, [index]: true }))
                  }
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ---- Info panel ---- */}
          <AnimatePresence>
            {showInfo && current?.title && (
              <motion.div
                className="amc-lightbox-info absolute bottom-16 sm:bottom-20 left-3 right-3 sm:left-8 sm:right-8 z-40 max-w-lg mx-auto sm:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-10 rounded-full bg-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-white mb-1">
                        {current.title}
                      </h3>
                      {current.description && (
                        <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                          {current.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook: useLightbox — convenient state manager for any gallery        */
/* ------------------------------------------------------------------ */

export function useLightbox(images: LightboxImage[]) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const open = React.useCallback(
    (idx: number) => {
      setActiveIndex(idx);
      setIsOpen(true);
    },
    []
  );
  const close = React.useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close, activeIndex, images };
}