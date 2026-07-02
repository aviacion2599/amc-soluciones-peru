"use client";

import { useScrollSpy } from "@/hooks/use-scroll-spy";

/**
 * ScrollSpyWrapper — Activa el observador de secciones en el Home.
 * Actualiza la URL con el hash de la sección visible al hacer scroll.
 */
export function ScrollSpyWrapper({ children }: { children: React.ReactNode }) {
  const sectionIds = [
    "hero",
    "confianza",
    "problema",
    "beneficios",
    "categorias",
    "productos",
    "servicio-tecnico",
    "proceso",
    "marcas",
    "testimonios",
    "cotizacion",
  ];

  useScrollSpy(sectionIds);

  return <>{children}</>;
}
