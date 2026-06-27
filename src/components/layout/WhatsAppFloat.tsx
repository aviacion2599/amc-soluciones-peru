"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * WhatsAppFloat — Botón flotante sticky bottom-right con pulse animation.
 * Click-to-chat directo, número configurable desde site-config.
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
      className="fixed bottom-5 right-5 lg:bottom-7 lg:right-7 z-50 group"
    >
      <div className="relative">
        {/* Pulse rings */}
        <span
          className="absolute inset-0 rounded-full bg-success/40 animate-ping opacity-75"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 rounded-full bg-success/20 animate-pulse"
          aria-hidden="true"
        />
        {/* Button */}
        <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-success text-white flex items-center justify-center shadow-amc-xl hover:scale-110 transition-transform">
          <MessageCircle className="w-7 h-7 lg:w-8 lg:h-8" fill="currentColor" />
        </div>
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-foreground text-background px-3 py-1.5 rounded-md text-xs font-semibold shadow-amc-md transition-all ${
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
