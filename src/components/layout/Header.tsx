"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { NAV_ITEMS, AMCCONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Header AMC — Sticky corporativo con blur backdrop on scroll.
 * Drawer para mobile. Logo placeholder hasta que el cliente envíe el SVG oficial.
 */
export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear scroll del body cuando el drawer mobile está abierto
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-amc-sm"
          : "bg-transparent",
      )}
      role="banner"
    >
      <div className="container-amc">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label={`${AMCCONFIG.company.brandName} — Inicio`}
          >
            <div className="relative">
              <div className="flex items-center justify-center w-11 h-11 rounded-md bg-primary text-primary-foreground font-display font-bold text-base shadow-amc-sm group-hover:shadow-amc-primary transition-shadow">
                AMC
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-background"
                aria-hidden="true"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-base text-foreground">
                {AMCCONFIG.company.brandName}
              </span>
              <span className="overline text-muted-foreground mt-0.5">
                PERÚ · Cash Handling
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Navegación principal"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3.5 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary-tint/60 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Phone + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${AMCCONFIG.contact.phoneRaw}`}
              className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2"
              aria-label={`Llamar al ${AMCCONFIG.contact.phone}`}
            >
              <Phone className="w-4 h-4" />
              {AMCCONFIG.contact.phone}
            </a>
            <Link
              href="#cotizacion"
              className="hidden md:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold transition-all shadow-amc-sm hover:shadow-amc-primary hover:-translate-y-0.5"
            >
              Solicitar Cotización
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-border bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
        >
          <nav className="container-amc flex flex-col py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary-tint/60 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${AMCCONFIG.contact.phoneRaw}`}
              className="mx-4 mt-2 inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground border border-border px-5 py-3 rounded-md"
            >
              <Phone className="w-4 h-4" />
              {AMCCONFIG.contact.phone}
            </a>
            <Link
              href="#cotizacion"
              onClick={() => setMobileOpen(false)}
              className="mx-4 mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-semibold"
            >
              Solicitar Cotización <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
