import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Wrench, CheckCircle2, type LucideIcon } from "lucide-react";
import { TECHNICAL_SERVICES } from "@/lib/site-config";

/**
 * TechnicalService — Sección con fondo oscuro (primary-dark) que comunica
 * la oferta de servicio técnico. Grid de 6 servicios + checklist de garantías.
 */
export function TechnicalService() {
  const checklist = [
    "Técnicos certificados por el fabricante",
    "Repuestos 100% originales con trazabilidad",
    "Atención en sitio u onsite en Lima y provincias",
    "Reporte técnico detallado post-servicio",
  ];

  return (
    <section
      id="servicio-tecnico"
      className="relative py-20 lg:py-28 bg-primary-dark text-white overflow-hidden scroll-mt-20"
    >
      {/* Industrial background */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 50%, rgba(176, 176, 176, 0.15), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="container-amc relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"
                aria-hidden="true"
              />
              <span className="overline text-slate-200">
                Servicio Técnico Oficial · GLORY
              </span>
            </div>
            <h2 className="display-2 text-white mb-6 text-balance">
              Respaldo técnico que mantiene
              <span className="block bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
                su operación en movimiento
              </span>
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-lg">
              Técnicos certificados directamente por GLORY. Atendemos todo tipo de equipos
              con repuestos originales, calibración certificada y planes preventivos
              adaptados al volumen de operación de su negocio.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-10">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-slate-200">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="#contacto"
              className="btn-primary px-6 py-3.5 text-base bg-white text-primary hover:bg-slate-100"
              style={{ backgroundColor: "white", color: "var(--primary)" }}
            >
              <Wrench className="w-4 h-4" />
              Solicitar servicio técnico
            </Link>
          </div>

          {/* Right — services grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {TECHNICAL_SERVICES.map((s, i) => {
              const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[s.icon];
              return (
                <div
                  key={s.code}
                  className="glass-card rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-white/10 text-sky-200 flex items-center justify-center mb-4">
                    {Icon && <Icon className="w-5 h-5" strokeWidth={1.75} />}
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1.5">
                    {s.label}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {s.description}
                  </p>
                  <div className="font-mono text-xs text-slate-500 mt-3">{s.code}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
