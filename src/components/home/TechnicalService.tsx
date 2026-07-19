import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Wrench, CheckCircle2, type LucideIcon, ArrowRight } from "lucide-react";
import { TECHNICAL_SERVICES } from "@/lib/site-config";

/**
 * TechnicalService — Sección con fondo oscuro (primary-dark) que comunica
 * la oferta de servicio técnico. Grid de 6 servicios + checklist de garantías.
 * Palabras clave: Respaldo Técnico, Confianza, Seguridad
 */
export function TechnicalService() {
  const checklist = [
    "Experiencia en servicio técnico de equipos de procesamiento de efectivo",
    "Repuestos originales y compatibles según disponibilidad del modelo",
    "Atención en sitio y en taller — Lima y provincias",
    "Reporte técnico detallado post-servicio",
    "Planes de mantenimiento preventivo que ayudan a reducir fallas y paradas inesperadas",
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
            "radial-gradient(circle at 80% 50%, rgba(176, 176, 176, 0.15), transparent 50%), radial-gradient(circle at 20% 80%, rgba(0, 50, 100, 0.2), transparent 40%)",
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
                Venta y servicio técnico especializado
              </span>
            </div>
            <h2 className="display-2 text-white mb-6 text-balance">
              Soluciones técnicas que mantienen
              <span className="block bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
                tu operación en movimiento
              </span>
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-lg">
              Servicio técnico especializado en equipos GLORY y otras marcas de procesamiento
              de efectivo. Reparación, calibración, mantenimiento preventivo y actualización
              de divisas para mantener tu equipo operando con precisión.
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

            <div className="flex flex-wrap gap-3">
              <Link
                href="/servicio-tecnico"
                className="btn-primary px-6 py-3.5 text-base bg-white text-primary hover:bg-slate-100 hover:shadow-amc-xl transition-all inline-flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                Ver servicios técnicos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contacto"
                className="btn-glass px-6 py-3.5 text-base inline-flex items-center gap-2"
              >
                Solicitar diagnóstico
              </Link>
            </div>
          </div>

          {/* Right — services grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {TECHNICAL_SERVICES.map((s, i) => {
              const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[s.icon];
              return (
                <div
                  key={s.code}
                  className="glass-card rounded-xl p-6 hover:bg-white/10 transition-colors text-center"
                >
                  <div className="w-10 h-10 rounded-md bg-white/10 text-sky-200 flex items-center justify-center mx-auto mb-4">
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
