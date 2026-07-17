"use client";

import { FadeIn, HeroReveal, HeroRevealItem } from "@/components/shared/Motion";
import type { LucideIcon } from "lucide-react";

interface PageHeroProps {
  overline: string;
  title: React.ReactNode;
  description?: string;
  icon?: LucideIcon;
  variant?: "light" | "dark";
  children?: React.ReactNode;
}

/**
 * PageHero — Hero consistente para todas las subpáginas.
 * Variant dark: fondo azul corporativo (#003366) con grid pattern.
 * Variant light: fondo blanco con sutil patrón dots.
 */
export function PageHero({
  overline,
  title,
  description,
  icon: Icon,
  variant = "dark",
  children,
}: PageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative overflow-hidden -mt-[62px] sm:-mt-[68px] pt-[74px] sm:pt-[80px] ${
        isDark ? "bg-primary-dark text-white" : "bg-background text-foreground border-b border-border"
      }`}
    >
      {/* Background pattern */}
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" aria-hidden="true" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 30% 30%, rgba(176, 176, 176, 0.15), transparent 60%)",
            }}
            aria-hidden="true"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-dots-pattern opacity-50" aria-hidden="true" />
      )}

      <div className="container-amc relative py-10 sm:py-12 lg:py-20">
        <HeroReveal className="max-w-3xl">
          <HeroRevealItem className="flex items-center gap-2 mb-4">
            {Icon && (
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center ${
                  isDark ? "bg-white/10 text-sky-200" : "bg-primary-tint text-primary"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
            )}
            <span
              className={`overline ${
                isDark ? "text-slate-300" : "text-muted-foreground"
              }`}
            >
              {overline}
            </span>
          </HeroRevealItem>

          <HeroRevealItem>
            <h1 className={`display-1 mb-5 text-balance ${isDark ? "text-white" : "text-foreground"}`}>
              {title}
            </h1>
          </HeroRevealItem>

          {description && (
            <HeroRevealItem>
              <p
                className={`text-lg leading-relaxed max-w-2xl ${
                  isDark ? "text-slate-300" : "text-muted-foreground"
                }`}
              >
                {description}
              </p>
            </HeroRevealItem>
          )}

          {children && (
            <FadeIn delay={0.4} className="mt-8">
              {children}
            </FadeIn>
          )}
        </HeroReveal>
      </div>

      {/* Bottom fade */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px ${
          isDark
            ? "bg-gradient-to-r from-transparent via-primary-light/40 to-transparent"
            : "bg-gradient-to-r from-transparent via-border to-transparent"
        }`}
      />
    </section>
  );
}
