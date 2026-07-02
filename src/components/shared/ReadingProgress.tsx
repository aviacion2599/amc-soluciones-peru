"use client";

import { useEffect, useState } from "react";

/**
 * ReadingProgress — Barra de progreso de lectura fija en la parte superior.
 * Mide el scroll vertical y pinta una línea delgada con el color primary.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full transition-all duration-100 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: "#F5B041",
          boxShadow: "0 0 6px rgba(245, 176, 65, 0.4)",
        }}
      />
    </div>
  );
}
