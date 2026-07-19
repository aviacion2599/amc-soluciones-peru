"use client";

import { MessageCircle, ChevronRight, Check } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/* ─── Tipos ─── */
interface EquipmentLine {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  models: string[];
  recommendedFor: string[];
  benefits: string[];
  accent: string;       // tailwind color token
  accentBg: string;     // tailwind bg token
  accentBorder: string; // tailwind border token
  accentText: string;   // tailwind text token
}

/* ─── Datos de las 5 líneas ─── */
const LINES: EquipmentLine[] = [
  {
    id: "esencial",
    name: "Línea Esencial AMC",
    subtitle: "Contadoras de billetes para pequeños negocios",
    description:
      "Contadoras de billetes diseñadas para pequeños negocios que buscan una solución práctica, accesible y funcional para el control diario de efectivo. Esta línea está pensada para tiendas, minimarkets, farmacias, agentes, oficinas, bodegas y comercios con bajo a mediano movimiento de billetes. Son equipos ideales para contar de forma rápida, ordenar el efectivo diario y realizar una verificación básica de billetes.",
    models: ["AMC-2000"],
    recommendedFor: [
      "Pequeños negocios",
      "Tiendas y minimarkets",
      "Farmacias",
      "Agentes y oficinas",
      "Comercios con movimiento moderado de efectivo",
    ],
    benefits: [
      "Precio más accesible",
      "Conteo rápido de billetes",
      "Uso simple y práctico",
      "Verificación de billetes sospechosos según sensores del equipo",
      "Soporte técnico local AMC",
      "Garantía y asesoría postventa",
    ],
    accent: "bg-slate-600",
    accentBg: "bg-slate-50",
    accentBorder: "border-slate-200",
    accentText: "text-slate-700",
  },
  {
    id: "profesional",
    name: "Línea Profesional AMC",
    subtitle: "Mayor seguridad para negocios y empresas",
    description:
      "Equipos profesionales para negocios y empresas que necesitan mayor seguridad, mejor detección y un control más confiable del efectivo. La Línea Profesional AMC está orientada a clientes que buscan una contadora de billetes más robusta, con mejor desempeño, detección avanzada y respaldo técnico local. Es ideal para negocios que ya manejan un flujo constante de efectivo y necesitan reducir errores, ahorrar tiempo y mejorar el control en caja.",
    models: ["AMC-3200", "AMC-8100"],
    recommendedFor: [
      "Empresas",
      "Oficinas administrativas",
      "Comercios con caja diaria",
      "Minimarkets de mayor movimiento",
      "Ferreterías, distribuidoras y negocios con flujo constante de efectivo",
    ],
    benefits: [
      "Mejor detección de billetes falsos o adulterados",
      "Mayor precisión en el conteo",
      "Mejor estabilidad de trabajo",
      "Ideal para uso diario",
      "Soporte técnico especializado",
      "Garantía y capacitación AMC",
    ],
    accent: "bg-blue-600",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    accentText: "text-blue-700",
  },
  {
    id: "alto-control",
    name: "Línea Alto Control AMC",
    subtitle: "Control avanzado para mayor movimiento de efectivo",
    description:
      "Contadoras de billetes para empresas que manejan mayor volumen de efectivo y necesitan continuidad de trabajo, control de billetes observados y mayor seguridad en cada operación. Esta línea está diseñada para negocios que no solo necesitan contar billetes, sino también mejorar el control, separar billetes sospechosos, trabajar con mayor fluidez y reducir interrupciones durante el proceso de conteo.",
    models: ["AMC-9100", "AMC-8200"],
    recommendedFor: [
      "Casas de cambio",
      "Empresas con alto movimiento de caja",
      "Retail",
      "Casinos",
      "Mayoristas",
      "Financieras",
      "Operaciones que requieren mayor control de billetes",
    ],
    benefits: [
      "Mayor nivel de detección",
      "Mejor control de billetes observados",
      "Trabajo más continuo",
      "Mayor seguridad en el proceso de conteo",
      "Ideal para operaciones con billetes de diferentes estados",
      "Respaldo técnico local AMC",
    ],
    accent: "bg-indigo-600",
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-200",
    accentText: "text-indigo-700",
  },
  {
    id: "alto-volumen",
    name: "Línea Alto Volumen AMC",
    subtitle: "Equipos para uso intensivo y operaciones exigentes",
    description:
      "Equipos de alto rendimiento para empresas que procesan grandes volúmenes de efectivo y requieren velocidad, precisión, resistencia y continuidad operativa. La Línea Alto Volumen AMC está orientada a operaciones intensivas donde el tiempo, la seguridad y la productividad son factores clave. Equipos para operaciones intensivas que necesitan mayor capacidad de procesamiento, continuidad de trabajo y control avanzado del efectivo durante la jornada.",
    models: ["AMC-9200", "AMC-8300 PRO"],
    recommendedFor: [
      "Casas de cambio de alto movimiento",
      "Retail",
      "Financieras",
      "Casinos",
      "Empresas recaudadoras",
      "Supermercados",
      "Operaciones intensivas de efectivo",
    ],
    benefits: [
      "Mayor capacidad de procesamiento",
      "Equipos diseñados para uso exigente",
      "Mejor continuidad de trabajo",
      "Mayor control y seguridad",
      "Ideal para alto volumen diario",
      "Soporte técnico especializado",
    ],
    accent: "bg-primary",
    accentBg: "bg-primary-tint",
    accentBorder: "border-primary/20",
    accentText: "text-primary",
  },
  {
    id: "monedas",
    name: "Línea Contadoras de Monedas AMC",
    subtitle: "Soluciones para conteo y procesamiento de monedas",
    description:
      "Contadoras de monedas para empresas y negocios que necesitan procesar monedas de forma rápida, ordenada y eficiente. Esta línea está orientada a clientes que manejan alto movimiento de monedas y necesitan reducir tiempos de conteo manual, mejorar el control de caja y optimizar el procesamiento diario. Soluciones para conteo rápido, ordenamiento de monedas y reducción de tiempos operativos en negocios con alto movimiento de monedas.",
    models: ["AMC-CM3400", "AMC-CM3400 MAX"],
    recommendedFor: [
      "Retail",
      "Supermercados",
      "Empresas de transporte",
      "Estacionamientos",
      "Casinos",
      "Cajas de recaudación",
      "Negocios con alto movimiento de monedas",
    ],
    benefits: [
      "Conteo rápido de monedas",
      "Mayor orden en el procesamiento",
      "Reducción de errores manuales",
      "Ahorro de tiempo operativo",
      "Ideal para negocios con flujo constante de monedas",
      "Servicio técnico y soporte AMC",
    ],
    accent: "bg-amber-600",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200",
    accentText: "text-amber-700",
  },
];

/* ─── Componente de una línea ─── */
function LineCard({ line, index }: { line: EquipmentLine; index: number }) {
  const isEven = index % 2 === 0;
  const whatsappMsg = encodeURIComponent(
    `Hola AMC, quiero información sobre la ${line.name}.`
  );

  return (
    <div
      id={`linea-${line.id}`}
      className="scroll-mt-20 border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header con acento de color */}
      <div className={`${line.accent} px-6 py-4 lg:px-8 lg:py-5`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white text-xs font-bold font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-lg lg:text-xl font-bold text-white">
              {line.name}
            </h3>
            <p className="text-white/70 text-sm">{line.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 lg:p-8">
        <p className="text-muted-foreground leading-relaxed mb-6 text-[15px]">
          {line.description}
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Columna izquierda */}
          <div>
            {/* Modelos */}
            {line.models.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Modelos en esta línea
                </h4>
                <div className="flex flex-wrap gap-2">
                  {line.models.map((m) => (
                    <span
                      key={m}
                      className={`${line.accentBg} ${line.accentText} px-3 py-1 rounded-md text-sm font-semibold border ${line.accentBorder}`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recomendado para */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Recomendado para
              </h4>
              <ul className="space-y-2">
                {line.recommendedFor.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                    <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${line.accentText}`} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna derecha — beneficios */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Beneficios
            </h4>
            <ul className="space-y-2.5">
              {line.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span className={`mt-1 w-4 h-4 rounded-full ${line.accent} flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${line.accent} hover:opacity-90 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold text-sm mt-6 transition-opacity`}
            >
              <MessageCircle className="w-4 h-4" />
              Solicitar asesoría por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sección principal ─── */
export function EquipmentLines() {
  return (
    <section id="equipos" className="py-20 lg:py-28 scroll-mt-20 bg-surface-2">
      <div className="container-amc">
        {/* Introducción */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="overline text-primary mb-4">Nuestras líneas de equipos</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-5">
            Soluciones para cada nivel de operación
          </h2>
          <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
            En AMC Soluciones Perú ofrecemos equipos para conteo y control de
            efectivo según el tipo de negocio, volumen de trabajo y nivel de
            seguridad requerido.
          </p>
          <p className="text-muted-foreground leading-relaxed text-[15px]">
            Contamos con líneas para pequeños negocios, empresas, operaciones de
            alto control, alto volumen y procesamiento de monedas. Nuestro
            enfoque no es solo vender equipos, sino brindar asesoría, garantía
            y soporte técnico local para que cada cliente elija la solución
            adecuada.
          </p>
        </div>

        {/* Frase asistencial */}
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 text-sm text-primary font-medium bg-primary-tint border border-primary/10 px-5 py-2.5 rounded-full">
            Le ayudamos a elegir el equipo adecuado según su volumen de efectivo y tipo de negocio.
          </p>
        </div>

        {/* 5 líneas */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {LINES.map((line, i) => (
            <LineCard key={line.id} line={line} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}