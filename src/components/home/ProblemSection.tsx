import { AlertTriangle, DollarSign, Clock, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionTitle } from "@/components/shared/SectionTitle";

/**
 * ProblemSection — Sección que enmarca el problema que AMC resuelve.
 * 
 * "El efectivo mal manejado cuesta caro"
 * 
 * Esta sección conecta emocionalmente con el dolor del cliente antes
 * de presentar la solución (productos y servicios).
 * 
 * Palabras clave integradas: Precisión, Seguridad, Control, Confianza
 */
const PROBLEMS = [
  {
    icon: DollarSign,
    title: "Errores de conteo que cuentan pérdidas",
    description:
      "Un error de conteo del 1% en operaciones de alto volumen puede representar miles de soles al mes. Sin precisión, tu caja no cierra.",
    stat: "Hasta 3% de tus ingresos anuales en diferencias",
    statColor: "text-error",
  },
  {
    icon: ShieldAlert,
    title: "Billetes falsos que pasan desapercibidos",
    description:
      "Sin detección multi-sensorial profesional, estás expuesto a recibir billetes falsos. Multas, pérdidas y problemas legales que podrías evitar.",
    stat: "+15,000 soles en pérdidas anuales por falsificación",
    statColor: "text-error",
  },
  {
    icon: Clock,
    title: "Tiempo perdido que podrías recuperar",
    description:
      "Contar y clasificar efectivo manualmente consume horas valiosas de tu equipo. Horas que podrían dedicarse a vender, atender clientes o hacer crecer tu negocio.",
    stat: "Hasta 8 horas semanales por punto de caja",
    statColor: "text-warning",
  },
  {
    icon: AlertTriangle,
    title: "Equipos caídos que detienen tu operación",
    description:
      "Cuando una contadora falla y no tienes respaldo técnico inmediato, tu operación se paraliza. Cada hora sin equipo es dinero que dejas de contar.",
    stat: "Reparación express en menos de 24h con AMC",
    statColor: "text-primary",
  },
];

export function ProblemSection() {
  return (
    <section id="problema" className="py-20 lg:py-28 bg-surface-2 relative overflow-hidden">
      {/* Background subtle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 30%, rgba(220, 38, 38, 0.03), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-amc relative">
        <SectionTitle
          overline="El problema"
          title="El efectivo mal manejado cuesta caro"
          description="Cada error de conteo, cada billete falso que pasa, cada hora de operación detenida tiene un costo real que muchas empresas subestiman. Hasta que es demasiado tarde."
        />

        <div className="grid lg:grid-cols-2 gap-6 mt-14">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group card-base card-hover p-7 relative overflow-hidden text-center"
              >
                {/* Number indicator */}
                <div className="font-mono text-5xl font-bold text-muted/20 absolute -top-2 -right-2 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-error-light text-error flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {p.description}
                    </p>
                    <div className={`text-xs font-semibold font-mono ${p.statColor} bg-muted/50 px-3 py-1.5 rounded-md inline-block`}>
                      {p.stat}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bridge CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            En AMC tenemos la solución para cada uno de estos problemas.
          </p>
          <Link
            href="/productos"
            className="btn-primary px-6 py-3 text-sm inline-flex items-center gap-2"
          >
            Conoce nuestras soluciones
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
