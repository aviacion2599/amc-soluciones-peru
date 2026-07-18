"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Preloader — Pantalla de carga con logo AMC.
 * Se muestra 0.4s en la primera visita, luego desaparece con fade-out.
 */
export function Preloader() {
  const [visible, setVisible] = React.useState(true);
  const [fadeOut, setFadeOut] = React.useState(false);

  React.useEffect(() => {
    // Start fade out after 0.4s
    const fadeTimer = setTimeout(() => setFadeOut(true), 400);
    // Remove from DOM after fade completes (300ms transition)
    const removeTimer = setTimeout(() => setVisible(false), 700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-[#080e1a]",
        "transition-opacity duration-300 ease-out",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
      aria-hidden="true"
    >
      {/* Subtle radial glow behind logo */}
      <div className="absolute w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

      {/* Logo */}
      <div className="relative animate-pulse-slow">
        <picture>
          <source srcSet="/logo-final.webp" type="image/webp" />
          <img
            src="/logo-final.png"
            alt=""
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_2px_12px_rgba(212,175,55,0.2)]"
            style={{ imageRendering: "auto" }}
          />
        </picture>
      </div>

      {/* Thin progress line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gold animate-preloader-bar"
          style={{ animationDuration: "0.4s" }}
        />
      </div>
    </div>
  );
}