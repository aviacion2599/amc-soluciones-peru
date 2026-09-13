"use client";

import { MessageCircle, ChevronRight, Check } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/* ─── Tipos ─── */
interface EquipmentRental {
  title: string;
  description: string;
  buttonText: string;
}

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
  rental?: EquipmentRental;
}

/* ─── Datos de las líneas unificadas ─── */
const LINES: EquipmentLine[] = [
  {
    id: "contadoras-billetes",
    name: "Contadoras de Billetes AMC",
    subtitle: "Conteo profesional, preciso y confiable",
    description:
      "Equipos profesionales para conteo, detección y control de efectivo, diseñados para diferentes niveles de operación.",
    models: ["AMC-2000", "AMC-3200"],
    recommendedFor: [
      "Cajas, comercios, oficinas, empresas y negocios que requieren conteo frecuente y mayor control del efectivo.",
    ],
    benefits: [
      "Conteo rápido",
      "Detección de billetes sospechosos",
      "Reducción de errores",
      "Mayor control en las operaciones diarias",
    ],
    accent: "bg-blue-600",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    accentText: "text-blue-700",
  },
  {
    id: "corporativa",
    name: "Línea Corporativa AMC",
    subtitle: "Mayor continuidad, control y gestión de efectivo",
    description:
      "Equipos orientados a empresas que requieren mayor continuidad, control y capacidad de procesamiento de efectivo.",
    models: ["AMC-8200", "AMC-9100", "AMC-9200"],
    recommendedFor: [
      "Empresas con mayor movimiento de efectivo, cajas de alto flujo, casas de cambio, financieras, retail, casinos, supermercados y operaciones que requieren continuidad.",
    ],
    benefits: [
      "Mayor productividad",
      "Continuidad de trabajo",
      "Mejor control del efectivo",
      "Separación de billetes observados",
      "Reducción del trabajo manual",
    ],
    accent: "bg-indigo-600",
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-200",
    accentText: "text-indigo-700",
    rental: {
      title: "Venta y Alquiler Corporativo",
      description:
        "Contamos con venta de contadoras de billetes y modalidad de alquiler corporativo para empresas. El alquiler se ofrece con equipos seleccionados según el volumen, tipo de operación y condiciones de uso.",
      buttonText: "Consultar alquiler",
    },
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
      <div className="p-6 pb-8 sm:p-6 lg:p-8">
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
              <h4 className="text-sm font-bold text-foreground mb-2.5">
                Recomendado para:
              </h4>
              <ul className="space-y-2">
                {line.recommendedFor.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-foreground/90">
                    <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${line.accentText}`} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna derecha — beneficios */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-2.5">
              Beneficios:
            </h4>
            <ul className="space-y-2.5">
              {line.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <span className={`mt-0.5 w-4 h-4 rounded-full ${line.accent} flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <div className="pt-2 mb-2 sm:mb-0">
              <a
                href={`https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${line.accent} hover:opacity-90 inline-flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-3 rounded-lg text-white font-semibold text-sm mt-6 transition-opacity shadow-sm`}
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar asesoría por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Alquiler Corporativo (con ancla directa #alquiler) */}
        {line.rental && (
          <div
            id="alquiler"
            className="scroll-mt-28 mt-8 pt-6 border-t border-slate-200 bg-slate-50/80 -mx-6 -mb-8 sm:-mb-6 lg:-mx-8 lg:-mb-8 p-6 pb-8 sm:pb-6 lg:p-8 rounded-b-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="max-w-2xl">
                <span className="inline-block px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
                  Modalidad disponible para empresas
                </span>
                <h4 className="font-display text-lg lg:text-xl font-bold text-foreground">
                  {line.rental.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {line.rental.description}
                </p>
              </div>
              <div className="flex-shrink-0 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${encodeURIComponent(
                    "Hola AMC Soluciones Perú, quiero consultar sobre el servicio de alquiler corporativo de contadoras de billetes."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  {line.rental.buttonText}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Sección principal ─── */
export function EquipmentLines() {
  return (
    <section id="equipos" className="pt-12 pb-24 sm:pb-16 lg:py-16 2xl:py-24 scroll-mt-24 bg-surface-2">
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
            Contamos con contadoras de billetes para comercios y empresas, línea
            corporativa con venta y alquiler, y soluciones para procesamiento de
            monedas. Nuestro enfoque no es solo vender equipos, sino brindar asesoría,
            garantía y soporte técnico local para que cada cliente elija la solución
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
        <div className="space-y-10 sm:space-y-8 max-w-5xl mx-auto">
          {LINES.map((line, i) => (
            <LineCard key={line.id} line={line} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}