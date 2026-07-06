"use client";

import { useEffect, useRef } from "react";

/**
 * useScrollSpy — Observa qué sección está visible y actualiza la URL vía History API.
 *
 * - IntersectionObserver detecta la sección activa
 * - history.replaceState actualiza el hash sin recargar
 * - Solo actualiza si el usuario está haciendo scroll (no click en anchor)
 * - Soporta navegación directa por hash (#seccion) al cargar
 *
 * @param sectionIds - Array de IDs de secciones a observar
 */
export function useScrollSpy(sectionIds: string[]) {
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Si hay un hash en la URL al cargar, hacer scroll smooth
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }

    // Marcar que el usuario está haciendo scroll
    const handleScrollStart = () => {
      isUserScrolling.current = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isUserScrolling.current = false;
      }, 150);
    };

    window.addEventListener("scroll", handleScrollStart, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && isUserScrolling.current) {
            const id = entry.target.id;
            if (id) {
              const newUrl = `${window.location.pathname}${window.location.search}#${id}`;
              history.replaceState(null, "", newUrl);
            }
            break; // Solo la primera sección visible
          }
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px", // Detecta cuando la sección pasa el 40% superior
        threshold: 0,
      },
    );

    // Observar todas las secciones
    const elements: Element[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollStart);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [sectionIds]);
}
