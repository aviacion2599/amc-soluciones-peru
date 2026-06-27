import * as LucideIcons from "lucide-react";
import { TrendingUp, Headphones, Award, ShieldCheck } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { BENEFITS, AMCCONFIG } from "@/lib/site-config";

/**
 * Benefits — 4 tarjetas de beneficios + strip de estadísticas.
 * Responde a la pregunta del usuario: "¿Por qué elegir AMC?"
 */
export function Benefits() {
  const stats = [
    { icon: TrendingUp, value: "+2,500", label: "Equipos instalados" },
    { icon: Headphones, value: "24h", label: "Tiempo de respuesta" },
    { icon: Award, value: "12 meses", label: "Garantía oficial" },
    { icon: ShieldCheck, value: "99.8%", label: "Precisión de conteo" },
  ];

  return (
    <section id="nosotros" className="py-20 lg:py-28 scroll-mt-20">
      <div className="container-amc">
        <SectionTitle
          overline="Por qué AMC"
          title="Tecnología industrial con respaldo técnico permanente"
          description="No vendemos equipos. Entregamos soluciones integrales de manejo de efectivo con soporte técnico especializado durante todo el ciclo de vida del producto."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {BENEFITS.map((b, i) => {
            const Icon = (LucideIcons as Record<string, LucideIcons.LucideIcon>)[b.icon];
            return (
              <div
                key={b.title}
                className="group relative card-base card-hover p-6"
              >
                <div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
                <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {Icon && <Icon className="w-6 h-6" strokeWidth={1.75} />}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.description}
                </p>
                <div className="font-mono text-xs text-muted-foreground mt-4">
                  0{i + 1} / 04
                </div>
              </div>
            );
          })}
        </div>

        {/* Stat strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center flex-shrink-0">
                <s.icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-foreground">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
