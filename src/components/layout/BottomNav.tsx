"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageCircle, Menu, LayoutGrid } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  onSearchOpen: () => void;
}

const ITEMS = [
  { icon: Home, label: "Inicio", href: "/", match: ["/"] },
  { icon: LayoutGrid, label: "Categorías", href: "/categorias", match: ["/categorias"] },
] as const;

/**
 * BottomNav — Barra de navegación inferior ultra pro para mobile.
 *
 * Comportamiento:
 * - Solo visible en mobile/tablet (hidden lg:)
 * - Se oculta al hacer scroll down, reaparece al scroll up
 * - Botón central "Buscar" más prominente
 * - WhatsApp abre link directo
 * - "Menú" dispara evento custom para abrir el off-canvas del Header
 * - Soporta safe-area para iPhones con notch
 */
export function BottomNav({ onSearchOpen }: BottomNavProps) {
  const pathname = usePathname();
  const [visible, setVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);
  const ticking = React.useRef(false);

  // Hide on scroll down, show on scroll up
  React.useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        // Hide when scrolling down past 80px, show when scrolling up
        if (current > lastScrollY.current && current > 80) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        lastScrollY.current = current;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waHref = `https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${encodeURIComponent(
    AMCCONFIG.contact.whatsappMessage,
  )}`;

  const openMenu = () => {
    window.dispatchEvent(new CustomEvent("amc:open-menu"));
  };

  const isActive = (matchPaths: readonly string[]) =>
    matchPaths.some((p) => p === "/" ? pathname === "/" : pathname.startsWith(p));

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[70] lg:hidden",
        "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-label="Navegación rápida"
    >
      {/* Safe area padding for notched devices */}
      <div className="bg-white/90 dark:bg-navy/95 backdrop-blur-xl border-t border-border/60 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-around h-[60px] px-1 pb-[env(safe-area-inset-bottom,0px)]">
          {/* Inicio */}
          <NavLink
            icon={Home}
            label="Inicio"
            href="/"
            active={isActive(["/"])}
          />

          {/* Categorías */}
          <NavLink
            icon={LayoutGrid}
            label="Categorías"
            href="/categorias"
            active={isActive(["/categorias"])}
          />

          {/* Buscar — centro prominente */}
          <button
            onClick={onSearchOpen}
            className="relative flex flex-col items-center justify-center -mt-4 w-14 h-14 rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 active:scale-95 transition-transform"
            aria-label="Buscar productos"
          >
            <Search className="w-5 h-5" strokeWidth={2.5} />
            <span className="text-[9px] font-semibold mt-0.5 leading-none">Buscar</span>
          </button>

          {/* WhatsApp */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 w-14 text-[#25D366] active:scale-95 transition-transform"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="w-5 h-5" fill="currentColor" />
            <span className="text-[9px] font-semibold leading-none">WhatsApp</span>
          </a>

          {/* Menú */}
          <button
            onClick={openMenu}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 w-14",
              "text-muted-foreground active:scale-95 transition-colors",
            )}
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[9px] font-semibold leading-none">Menú</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ── NavLink sub-component ── */
function NavLink({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex flex-col items-center justify-center gap-0.5 w-14 transition-colors active:scale-95",
        active ? "text-primary" : "text-muted-foreground",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="w-5 h-5" />
      <span className={cn("text-[9px] font-semibold leading-none", active && "text-primary")}>
        {label}
      </span>
      {/* Active indicator dot */}
      {active && (
        <span className="absolute -top-0 w-1 h-1 rounded-full bg-primary" />
      )}
    </Link>
  );
}