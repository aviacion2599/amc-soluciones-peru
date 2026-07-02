"use client";

import { Building2, Award, Target, Eye, Heart, ShieldCheck, TrendingUp, Users, Cpu, Globe, ArrowRight } from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionTitle } from "@/components/shared/SectionTitle";

const VALUES = [
  { icon: ShieldCheck, title: "Precisión", description: "Cada equipo que vendemos y cada servicio que prestamos está respaldado por certificaciones técnicas. No dejamos nada al azar." },
  { icon: Heart, title: "Compromiso", description: "Acompañamos a nuestros clientes durante todo el ciclo de vida del equipo, no solo en la venta. Tu éxito es nuestro éxito." },
  { icon: Cpu, title: "Innovación", description: "Actualizamos constantemente nuestro catálogo con la última tecnología del mercado. Traemos lo mejor del mundo a Perú." },
  { icon: Award, title: "Excelencia", description: "Técnicos certificados por los fabricantes, repuestos originales y procesos auditados. Calidad sin concesiones." },
];

const TIMELINE = [
  { year: "2010", title: "Fundación de AMC", description: "Nace AMC Soluciones Perú con la misión de profesionalizar el manejo de efectivo en el país." },
  { year: "2013", title: "Alianza con GLORY", description: "Nos convertimos en servicio técnico autorizado de GLORY, líder mundial en manejo de efectivo." },
  { year: "2016", title: "Expansión nacional", description: "Iniciamos cobertura en provincias con red de técnicos asociados en Arequipa, Trujillo y Piura." },
  { year: "2019", title: "Catálogo ampliado", description: "Incorporamos nuevas marcas: Hyundai, Henry, Royal Sovereign y Cassida." },
  { year: "2022", title: "Planes empresariales", description: "Lanzamiento de planes de mantenimiento empresarial para cadenas con múltiples sucursales." },
  { year: "2026", title: "Plataforma Enterprise", description: "Lanzamiento de nuestra nueva plataforma digital Enterprise para servir mejor a nuestros clientes." },
];

const STATS = [
  { value: "+15", label: "Años de experiencia" },
  { value: "+2,500", label: "Equipos instalados" },
  { value: "+800", label: "Clientes activos" },
  { value: "6", label: "Marcas representadas" },
  { value: "24h", label: "Tiempo de respuesta" },
  { value: "99.8%", label: "Precisión de conteo" },
];

const CERTIFICATIONS = [
  { name: "GLORY Authorized Service", desc: "Servicio técnico autorizado" },
  { name: "ISO 9001 Ready", desc: "Procesos de calidad documentados" },
  { name: "Hyundai Distribution", desc: "Distribuidor autorizado" },
  { name: "Henry Partner", desc: "Socio oficial" },
];

export default function NosotrosPage() {
  return (
    <PageTransition>
      <PageHero
        overline="Sobre AMC"
        title={
          <>
            AMC Soluciones Perú —
            <span className="bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
              {" "}venta y servicio técnico
            </span>
            {" "}de contadoras en Perú
          </>
        }
        description="AMC Soluciones Perú (AMC Multimedia Machine Technical Service E.I.R.L.) se especializa en la venta de contadoras profesionales de billetes y monedas, mantenimiento preventivo y correctivo, reparación, calibración, actualización de divisas y soporte técnico para equipos de procesamiento de efectivo."
        icon={Building2}
      />

      <div className="container-amc py-10">
        <Breadcrumb items={[{ label: "Nosotros" }]} />
      </div>

      {/* Misión / Visión */}
      <section className="container-amc py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <FadeIn>
            <div className="card-base p-8 h-full">
              <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-5">
                <Target className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h2 className="display-3 mb-4">Misión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Proveer soluciones integrales de manejo de efectivo que combina tecnología de vanguardia
                con respaldo técnico especializado, ayudando a las empresas peruanas a operar con
                precisión, seguridad y eficiencia. Nos comprometemos a ofrecer equipos confiables,
                mantenimiento preventivo de calidad y soporte técnico oportuno que asegure la
                continuidad operativa de nuestros clientes.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card-base p-8 h-full">
              <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h2 className="display-3 mb-4">Visión</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ser la empresa líder en Perú en soluciones de manejo de efectivo para 2030,
                reconocida por la excelencia técnica, la innovación continua y el compromiso con
                el cliente. Aspiramos a ser el partner estratégico de toda empresa que maneje
                efectivo, desde pequeños comercios hasta grandes cadenas y entidades financieras,
                contribuyendo a la profesionalización del sector.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-muted/40 border-y border-border py-20">
        <div className="container-amc">
          <SectionTitle
            overline="Nuestros valores"
            title="Los principios que guían cada operación"
            description="No son solo palabras en una pared. Son los estándares que aplicamos en cada cotización, cada servicio y cada interacción con nuestros clientes."
          />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card-base card-hover p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-5">
                    <v.icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline / Historia */}
      <section className="container-amc py-20">
        <SectionTitle
          overline="Nuestra historia"
          title="Una trayectoria de crecimiento constante"
          description="Más de 15 años acompañando a las empresas peruanas en la profesionalización del manejo de efectivo."
        />

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.05}>
                <div
                  className={`relative grid lg:grid-cols-2 gap-6 ${
                    i % 2 === 0 ? "" : "lg:[direction:rtl]"
                  }`}
                >
                  {/* Year marker */}
                  <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 -translate-x-1/2 -top-1 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-xs flex items-center justify-center border-4 border-background">
                      {i + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`pl-12 lg:pl-0 ${
                      i % 2 === 0 ? "lg:pr-12" : "lg:pl-12 lg:[direction:ltr]"
                    }`}
                  >
                    <div className="card-base card-hover p-6">
                      <div className="overline text-primary mb-2">{item.year}</div>
                      <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(176, 176, 176, 0.15), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="container-amc relative">
          <div className="text-center mb-14">
            <p className="overline text-slate-300 mb-3">AMC en números</p>
            <h2 className="display-2 text-white">Impacto real en operaciones críticas</h2>
          </div>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="font-display text-4xl font-bold text-white mb-2">{s.value}</div>
                  <div className="text-sm text-slate-300">{s.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Certifications */}
      <section className="container-amc py-20">
        <SectionTitle
          overline="Certificaciones y alianzas"
          title="Respaldados por los mejores"
          description="Nuestras certificaciones y alianzas estratégicas garantizan que recibas el mejor servicio técnico y productos originales."
        />
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {CERTIFICATIONS.map((c) => (
            <StaggerItem key={c.name}>
              <div className="card-base p-6 text-center h-full">
                <div className="w-14 h-14 rounded-full bg-success-light text-success flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA */}
      <section className="container-amc pb-20">
        <ScaleIn>
          <div className="card-base p-8 lg:p-12 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground text-center">
            <h2 className="display-2 text-white mb-4">
              Conozcámonos mejor
            </h2>
            <p className="text-sky-100 leading-relaxed max-w-2xl mx-auto mb-8">
              Visítanos en nuestras instalaciones o contáctanos para conocer más sobre cómo podemos
              ayudar a tu empresa a optimizar el manejo de efectivo.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/contacto" className="btn-primary px-6 py-3 text-sm bg-white text-primary hover:bg-slate-100" style={{ backgroundColor: "white", color: "var(--primary)" }}>
                Contáctanos
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/productos" className="btn-glass px-6 py-3 text-sm">
                Ver productos
              </a>
            </div>
          </div>
        </ScaleIn>
      </section>
    </PageTransition>
  );
}
