"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, X } from "lucide-react";
import { NAV_ITEMS, AMCCONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Header AMC — Menú Off-Canvas Derecha → Izquierda (NUEVO).
 *
 * Animaciones premium integradas:
 * 1. Panel se desliza de derecha a izquierda con cubic-bezier mecánico
 * 2. Overlay con backdrop-blur sincronizado
 * 3. Efecto cascada (stagger) en los enlaces del menú
 * 4. Botón X con rotación 90° al abrir/cerrar
 *
 * Paleta: #0B132B (navy) + #F5B041 (gold/dorado Glory)
 */
export function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Scroll-aware: transparente al inicio, sólido al scrollear
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Cerrar menú al cambiar de ruta (escucha popstate)
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ================================================================
          HEADER STICKY
          ================================================================ */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          menuOpen
            ? "bg-navy"
            : scrolled
              ? "bg-navy/90 backdrop-blur-xl shadow-lg shadow-black/10"
              : "bg-transparent",
        )}
        role="banner"
      >
        <div className="container-amc">
          <div className="flex items-center justify-between h-14">
            {/* Brand — Logo AMC imagen */}
            <Link
              href="/"
              className="flex items-center group"
              aria-label={`${AMCCONFIG.company.brandName} — Inicio`}
            >
              <picture>
                <source srcSet="/logo-final.webp" type="image/webp" />
                <img
                  src="/logo-final.png"
                  alt={AMCCONFIG.company.brandName}
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </picture>
            </Link>

            {/* Desktop nav (oculto en mobile) */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Navegación principal"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-2 rounded-md text-sm font-medium text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Derecha: teléfono + hamburguesa */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${AMCCONFIG.contact.phoneRaw}`}
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
                aria-label={`Llamar al ${AMCCONFIG.contact.phone}`}
              >
                <Phone className="w-4 h-4" />
                {AMCCONFIG.contact.phone}
              </a>

              {/* Hamburguesa / Cerrar — con rotación 90° */}
              <button
                className="relative w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 text-white transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                {/* Líneas hamburguesa animadas a X */}
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span
                    className={cn(
                      "block h-0.5 w-full bg-current rounded-full transition-all duration-400 origin-center",
                      menuOpen && "rotate-45 translate-y-[7px]",
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                  />
                  <span
                    className={cn(
                      "block h-0.5 w-full bg-current rounded-full transition-all duration-300",
                      menuOpen && "opacity-0 scale-x-0",
                    )}
                  />
                  <span
                    className={cn(
                      "block h-0.5 w-full bg-current rounded-full transition-all duration-400 origin-center",
                      menuOpen && "-rotate-45 -translate-y-[7px]",
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================
          OVERLAY (fondo oscuro + blur)
          Aparece sincronizado con el menú.
          ================================================================ */}
      <div
        className={cn(
          "fixed inset-0 z-[55] transition-opacity duration-500",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ================================================================
          OFF-CANVAS MENÚ — PANEL DESLIZABLE DERECHA → IZQUIERDA
          - translateX(100%) en estado cerrado → translateX(0) al abrir
          - Transición: 0.5s cubic-bezier(0.23, 1, 0.32, 1)
          - Stagger en los items (0.1s a 0.7s)
          ================================================================ */}
      <nav
        id="offcanvas-menu"
        className={cn(
          "fixed top-0 right-0 z-[60] h-full w-full sm:w-80 lg:w-96",
          "bg-navy border-l border-white/10",
          "flex flex-col",
          "transition-transform duration-500",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
          boxShadow: "-8px 0 30px rgba(0, 0, 0, 0.4)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Cabecera del panel — logo + botón X con rotación */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center"
          >
              <picture>
                <source srcSet="/logo-final.webp" type="image/webp" />
                <img
                  src="/logo-final.png"
                  alt={AMCCONFIG.company.brandName}
                  className="h-10 sm:h-14 w-auto object-contain"
                />
              </picture>
          </Link>

          {/* Botón X con rotación 90° al abrir */}
          <button
            onClick={closeMenu}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 transition-all duration-400",
            )}
            aria-label="Cerrar menú"
            style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
          >
            <X
              className={cn(
                "w-5 h-5 text-gold transition-transform duration-400",
                menuOpen ? "rotate-90" : "rotate-0",
              )}
              style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
            />
          </button>
        </div>

        {/* Enlaces del menú con efecto cascada (stagger) */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item, index) => {
              /* Stagger: delay = 0.1s * (index + 1) */
              const staggerDelay = 0.1 + index * 0.1;
              return (
                <li
                  key={item.label}
                  className={cn(
                    "transition-all duration-500",
                    menuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4",
                  )}
                  style={{
                    transitionDelay: menuOpen ? `${staggerDelay}s` : "0s",
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center justify-between w-full",
                      "px-4 py-3.5 rounded-lg",
                      "text-base font-medium text-white/80 hover:text-gold hover:bg-white/5",
                      "transition-all duration-200",
                      "group",
                    )}
                  >
                    <span>{item.label}</span>
                    {/* Flecha decorativa que aparece al hover */}
                    <span className="text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer del menú — datos de contacto */}
        <div className="px-6 py-6 border-t border-white/10 space-y-4">
          <a
            href={`tel:${AMCCONFIG.contact.phoneRaw}`}
            className="flex items-center gap-3 text-sm text-white/70 hover:text-gold transition-colors"
          >
            <Phone className="w-4 h-4 text-gold" />
            {AMCCONFIG.contact.phone}
          </a>
          <Link
            href="/cotizacion"
            onClick={closeMenu}
            className="block w-full text-center py-3 rounded-lg bg-gold text-gold-foreground font-semibold text-sm hover:bg-gold-dark transition-colors shadow-lg shadow-gold/20"
          >
            Solicitar Cotización
          </Link>
          <p className="text-[10px] text-white/30 text-center">
            SERVICIO TÉCNICO AUTORIZADO GLORY · DESDE 2010
          </p>
        </div>
      </nav>
    </>
  );
}
