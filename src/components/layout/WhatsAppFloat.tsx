"use client";

import { useState } from "react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * WhatsAppFloat — Botón flotante sticky bottom-right con pulse animation.
 * Usa el ícono REAL de WhatsApp (SVG oficial).
 */
export function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const href = `https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${encodeURIComponent(
    AMCCONFIG.contact.whatsappMessage,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-5 right-5 lg:bottom-7 lg:right-7 z-40 group hidden lg:block"
    >
      <div className="relative">
        {/* Pulse rings */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-pulse"
          aria-hidden="true"
        />
        {/* Button with real WhatsApp icon */}
        <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all">
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-8 h-8 lg:w-9 lg:h-9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.378L1.054 31.29l6.132-1.952A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.314 22.61c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.976-7.826-6.824-8.064-7.14-.23-.316-1.928-2.568-1.928-4.896s1.22-3.472 1.652-3.944c.39-.432.852-.54 1.136-.54.284 0 .568.002.816.014.262.012.614-.1.96.732.354.848 1.204 2.936 1.31 3.15.108.214.18.464.036.748-.136.284-.204.46-.408.708-.216.248-.454.554-.648.744-.216.214-.44.448-.19.88.252.432 1.12 1.848 2.406 2.992 1.654 1.472 3.05 1.928 3.482 2.14.432.214.682.18.932-.108.252-.284 1.082-1.06 1.378-1.428.296-.366.592-.304.998-.182.408.12 2.586 1.22 3.03 1.444.446.22.74.33.85.512.112.18.112 1.036-.278 2.138z" />
          </svg>
        </div>
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-foreground text-background px-3 py-1.5 rounded-md text-xs font-semibold shadow-lg transition-all ${
            hovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          ¿Hablamos por WhatsApp?
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground" />
        </div>
      </div>
    </a>
  );
}