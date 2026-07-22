"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Menu, LayoutGrid } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  onSearchOpen: () => void;
}

/** Real WhatsApp SVG icon */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.378L1.054 31.29l6.132-1.952A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.314 22.61c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.976-7.826-6.824-8.064-7.14-.23-.316-1.928-2.568-1.928-4.896s1.22-3.472 1.652-3.944c.39-.432.852-.54 1.136-.54.284 0 .568.002.816.014.262.012.614-.1.96.732.354.848 1.204 2.936 1.31 3.15.108.214.18.464.036.748-.136.284-.204.46-.408.708-.216.248-.454.554-.648.744-.216.214-.44.448-.19.88.252.432 1.12 1.848 2.406 2.992 1.654 1.472 3.05 1.928 3.482 2.14.432.214.682.18.932-.108.252-.284 1.082-1.06 1.378-1.428.296-.366.592-.304.998-.182.408.12 2.586 1.22 3.03 1.444.446.22.74.33.85.512.112.18.112 1.036-.278 2.138z" />
    </svg>
  );
}

/**
 * BottomNav — Barra de navegación inferior ultra pro para mobile.
 */
export function BottomNav({ onSearchOpen }: BottomNavProps) {
  const pathname = usePathname();
  const [visible, setVisible] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const lastScrollY = React.useRef(0);
  const ticking = React.useRef(false);

  // Hide on scroll down, show on scroll up
  React.useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        setScrollY(current);
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

  // Listen for off-canvas menu state to hide bottom nav
  React.useEffect(() => {
    const handler = ((e: CustomEvent) => {
      setMenuOpen(e.detail.open);
    }) as EventListener;
    window.addEventListener("amc:menu-state", handler);
    return () => window.removeEventListener("amc:menu-state", handler);
  }, []);

  const waHref = `https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${encodeURIComponent(
    AMCCONFIG.contact.whatsappMessage,
  )}`;

  const openMenu = () => {
    window.dispatchEvent(new CustomEvent("amc:open-menu"));
  };

  const isActive = (matchPaths: readonly string[]) =>
    matchPaths.some((p) => p === "/" ? pathname === "/" : pathname.startsWith(p));

  // Hide bottom nav entirely when off-canvas menu is open, or at the top of the home page
  const isHome = pathname === "/";
  const show = visible && !menuOpen && !(isHome && scrollY < 50);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[70] lg:hidden",
        "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        show ? "translate-y-0" : "translate-y-full",
      )}
      aria-label="Navegación rápida"
    >
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

          {/* WhatsApp — ícono real */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 w-14 text-[#25D366] active:scale-95 transition-transform"
            aria-label="Contactar por WhatsApp"
          >
            <WhatsAppIcon className="w-[22px] h-[22px]" />
            <span className="text-[9px] font-semibold leading-none">WhatsApp</span>
          </a>

          {/* Menú */}
          <button
            onClick={openMenu}
            className="flex flex-col items-center justify-center gap-0.5 w-14 text-muted-foreground active:scale-95 transition-colors"
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
      {active && (
        <span className="absolute -top-0 w-1 h-1 rounded-full bg-primary" />
      )}
    </Link>
  );
}