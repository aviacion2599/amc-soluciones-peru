import * as LucideIcons from "lucide-react";
import { type LucideIcon, ShieldCheck } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { WORK_PROCESS } from "@/lib/site-config";

/**
 * WorkProcess — Proceso de trabajo en 4 pasos con conector horizontal.
 * Palabras clave: Control, Confianza, Respaldo Técnico
 */
export function WorkProcess() {
  return (
    <section id="proceso" className="py-20 lg:py-28 bg-surface-2">
      <div className="container-amc">
        <SectionTitle
          overline="Cómo trabajamos"
          title="De la consulta al respaldo permanente en 4 pasos"
          description="Un proceso transparente que asegura que recibas el equipo correcto con el soporte técnico que tu operación exige. Sin sorpresas, sin demoras."
        />

        <div className="relative mt-16">
          {/* Connector line desktop */}
          <div
            className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden="true"
          />

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {WORK_PROCESS.map((step) => {
              const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[step.icon];
              return (
                <li key={step.number} className="relative text-center">
                  <div className="relative w-14 h-14 rounded-full bg-surface border-2 border-primary/20 flex items-center justify-center mb-5 group hover:border-primary hover:bg-primary-tint/50 transition-all mx-auto">
                    {Icon && <Icon className="w-6 h-6 text-primary" strokeWidth={1.75} />}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-mono font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Trust badge on last step */}
                  {step.number === "04" && (
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-success font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Respaldo técnico postventa</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
