"use client";

import * as React from "react";
import {
  ShieldCheck, Gauge, Wrench, Truck, Award, Headphones, FileText,
  ArrowRight, ArrowUpRight, ChevronRight, ChevronDown, Check, X,
  Menu, MessageCircle, Star, Banknote, Coins, ScanLine, Settings2,
  Cpu, Zap, Lock, TrendingUp, Quote, Building2, Factory, Store,
  Stethoscope, Bell, Search, User, Plus, Edit, Trash2, Eye, Filter,
  Download, PlayCircle, Phone, Mail, MapPin, Clock, AlertCircle,
  CheckCircle2, Info, AlertTriangle, Sparkles, Layers, Type,
  Palette, Grid3x3, MousePointerClick, Accessibility, Code2,
} from "lucide-react";

/**
 * ============================================================================
 * AMC SOLUCIONES PERÚ — DESIGN SYSTEM SHOWCASE
 * ----------------------------------------------------------------------------
 * Página única que demuestra visualmente todos los tokens, tipografía,
 * componentes y convenciones del Design System AMC v1.0.
 * Esta página NO es una página del sitio final — es la guía de referencia
 * visual que sirve como contrato de diseño para toda la plataforma.
 * ============================================================================
 */

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <DSHeader />

      <main className="container-amc py-12 lg:py-16 space-y-24">
        <IntroSection />
        <IdentitySection />
        <ColorsSection />
        <TypographySection />
        <GridSection />
        <ComponentsSection />
        <CardsSection />
        <IconographySection />
        <MotionSection />
        <ResponsiveSection />
        <AccessibilitySection />
        <ConventionsSection />
      </main>

      <DSFooter />
    </div>
  );
}

/* ============================================================================
   HEADER
   ============================================================================ */
function DSHeader() {
  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-border">
      <div className="container-amc">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-primary text-primary-foreground font-display font-bold flex items-center justify-center text-sm">
              AMC
            </div>
            <div>
              <div className="font-display font-bold text-sm leading-tight">Design System</div>
              <div className="overline text-muted-foreground text-[10px]">v1.0 · Enterprise</div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {[
              ["Identidad", "#identidad"],
              ["Colores", "#colores"],
              ["Tipografía", "#tipografia"],
              ["Componentes", "#componentes"],
              ["Cards", "#cards"],
              ["Motion", "#motion"],
              ["Accesibilidad", "#accesibilidad"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/60 transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <span className="hidden md:inline-flex overline text-primary bg-primary-tint px-3 py-1.5 rounded-full">
            AMC · Perú
          </span>
        </div>
      </div>
    </header>
  );
}

/* ============================================================================
   INTRO
   ============================================================================ */
function IntroSection() {
  return (
    <section className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-primary-tint text-primary px-4 py-1.5 rounded-full mb-6">
        <Sparkles className="w-4 h-4" />
        <span className="overline">Design System v1.0</span>
      </div>
      <h1 className="display-1 text-foreground mb-6 text-balance">
        Sistema de diseño <span className="text-gradient-blue">Enterprise</span> para AMC
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        Documento de referencia visual y técnico que rige toda la plataforma AMC Soluciones Perú.
        Define colores, tipografía, componentes, motion, accesibilidad y convenciones de código.
        Cualquier elemento visual de la plataforma debe ajustarse a este sistema.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
        {[
          { label: "Tokens de color", value: "9" },
          { label: "Componentes base", value: "16" },
          { label: "Cards especializadas", value: "5" },
          { label: "Breakpoints", value: "5" },
        ].map((s) => (
          <div key={s.label} className="stat-block text-center">
            <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================================
   1. IDENTIDAD VISUAL
   ============================================================================ */
function IdentitySection() {
  const cards = [
    {
      icon: ShieldCheck,
      title: "Personalidad de Marca",
      points: [
        "Institucional y confiable",
        "Tecnológica pero no fría",
        "Ingeniería con respaldo humano",
        "Precisión suiza, seriedad alemana",
      ],
    },
    {
      icon: Layers,
      title: "Lenguaje Visual",
      points: [
        "Geometría limpia y modular",
        "Patrones blueprint industriales",
        "Datos técnicos en mono",
        "Espacio en blanco generoso",
      ],
    },
    {
      icon: Building2,
      title: "Estilo Corporativo",
      points: [
        "B2B enterprise, no landing",
        "Sobrio, sin saturación cromática",
        "Jerarquía tipográfica marcada",
        " Fotografía industrial / técnica",
      ],
    },
    {
      icon: Cpu,
      title: "Estilo Tecnológico",
      points: [
        "Glassmorphism sutil en hero",
        "Grid pattern industrial",
        "Mono labels tipo CAD",
        "Micro-interacciones técnicas",
      ],
    },
  ];
  return (
    <Section id="identidad" icon={Palette} overline="01 · Identidad" title="Identidad Visual">
      <p className="text-muted-foreground max-w-2xl mb-10">
        El sistema transmite <strong className="text-foreground">tecnología, ingeniería, seguridad y precisión</strong>.
        Atributos extraídos directamente del logotipo AMC: azul corporativo profundo (#003366) y plata
        industrial (#B0B0B0).
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <div key={c.title} className="card-base card-hover p-6">
            <div className="w-11 h-11 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-4">
              <c.icon className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h3 className="font-display font-semibold text-base mb-3">{c.title}</h3>
            <ul className="space-y-1.5">
              {c.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================================
   2. COLORES
   ============================================================================ */
function ColorsSection() {
  const groups = [
    {
      label: "Primary · Azul corporativo AMC",
      description: "Color base extraído del logotipo. Comunicación institucional, CTAs, enlaces, headers.",
      swatches: [
        { name: "primary", hex: "#003366", token: "--primary", text: "light" },
        { name: "primary-dark", hex: "#001f4d", token: "--primary-dark", text: "light" },
        { name: "primary-light", hex: "#1a5276", token: "--primary-light", text: "light" },
        { name: "primary-tint", hex: "#e6edf5", token: "--primary-tint", text: "dark" },
      ],
    },
    {
      label: "Secondary · Plata industrial",
      description: "Acento metálico para elementos secundarios, iconos neutros y divisores.",
      swatches: [
        { name: "secondary", hex: "#b0b0b0", token: "--secondary", text: "dark" },
        { name: "secondary-dark", hex: "#7a7a7a", token: "--secondary-dark", text: "light" },
        { name: "secondary-light", hex: "#d5d5d5", token: "--secondary-light", text: "dark" },
      ],
    },
    {
      label: "Accent · Azul vibrante",
      description: "Para enlaces interactivos, highlights de datos y énfasis puntuales (uso restringido).",
      swatches: [
        { name: "accent", hex: "#0b4db8", token: "--accent", text: "light" },
      ],
    },
    {
      label: "Neutral · Escala slate",
      description: "Texto secundario, iconos neutros, fondos suaves.",
      swatches: [
        { name: "neutral", hex: "#475569", token: "--neutral", text: "light" },
        { name: "muted", hex: "#f1f5f9", token: "--muted", text: "dark" },
        { name: "muted-fg", hex: "#64748b", token: "--muted-foreground", text: "light" },
      ],
    },
    {
      label: "Success · Verificación / Garantía",
      description: "Estados positivos: garantía activa, calibración OK, cotización enviada.",
      swatches: [
        { name: "success", hex: "#059669", token: "--success", text: "light" },
        { name: "success-light", hex: "#d1fae5", token: "--success-light", text: "dark" },
      ],
    },
    {
      label: "Warning · Alerta media",
      description: "Mantenimiento próximo, stock bajo, ratings. Tono ámbar cuidadoso.",
      swatches: [
        { name: "warning", hex: "#d97706", token: "--warning", text: "light" },
        { name: "warning-light", hex: "#fef3c7", token: "--warning-light", text: "dark" },
      ],
    },
    {
      label: "Error · Estado crítico",
      description: "Errores de validación, eliminación, falla de servicio. Rojo saturado.",
      swatches: [
        { name: "error", hex: "#dc2626", token: "--error", text: "light" },
        { name: "error-light", hex: "#fee2e2", token: "--error-light", text: "dark" },
      ],
    },
    {
      label: "Surface · Capas sobre el fondo",
      description: "Cards, modales, popovers, sidebar. Superficie plana vs elevada.",
      swatches: [
        { name: "surface", hex: "#ffffff", token: "--surface", text: "dark" },
        { name: "surface-2", hex: "#f8fafc", token: "--surface-2", text: "dark" },
      ],
    },
    {
      label: "Background · Fondo principal",
      description: "Canvas base sobre el que se construyen todas las páginas.",
      swatches: [
        { name: "background", hex: "#ffffff", token: "--background", text: "dark" },
        { name: "foreground", hex: "#0f172a", token: "--foreground", text: "light" },
      ],
    },
  ];

  return (
    <Section id="colores" icon={Palette} overline="02 · Color Tokens" title="Sistema de Colores">
      <p className="text-muted-foreground max-w-2xl mb-10">
        9 categorías obligatorias de color expuestas como variables CSS y utilities Tailwind. Toda la
        interfaz debe usar exclusivamente estos tokens — está <strong className="text-foreground">prohibido el uso de hex directos</strong> en componentes.
      </p>

      <div className="space-y-8">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h3 className="font-display font-semibold text-base">{g.label}</h3>
              <p className="text-xs text-muted-foreground max-w-md">{g.description}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {g.swatches.map((s) => (
                <div key={s.name} className="rounded-lg overflow-hidden border border-border">
                  <div
                    className="aspect-[3/2] flex items-end p-3"
                    style={{ backgroundColor: s.hex }}
                  >
                    <span
                      className={`font-mono text-xs font-semibold ${
                        s.text === "light" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {s.hex}
                    </span>
                  </div>
                  <div className="bg-surface p-3">
                    <div className="font-medium text-sm">{s.name}</div>
                    <div className="font-mono text-xs text-muted-foreground mt-0.5">{s.token}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Usage examples */}
      <div className="mt-12 p-6 bg-surface-2 border border-border rounded-lg">
        <p className="overline text-muted-foreground mb-4">Ejemplos de uso correcto</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <code className="bg-background border border-border rounded-md p-3 text-xs font-mono text-foreground">
            <span className="text-muted-foreground">{"/* Tailwind */"}</span><br />
            bg-primary<br />
            text-primary-foreground<br />
            border-border
          </code>
          <code className="bg-background border border-border rounded-md p-3 text-xs font-mono text-foreground">
            <span className="text-muted-foreground">{"/* CSS var */"}</span><br />
            var(--primary)<br />
            var(--primary-dark)<br />
            var(--success)
          </code>
          <code className="bg-background border border-border rounded-md p-3 text-xs font-mono text-error">
            <span className="text-muted-foreground">{"/* Prohibido */"}</span><br />
            bg-[#003366]<br />
            text-[#b0b0b0]<br />
            color: #dc2626
          </code>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================================
   3. TIPOGRAFÍA
   ============================================================================ */
function TypographySection() {
  return (
    <Section id="tipografia" icon={Type} overline="03 · Tipografía" title="Sistema Tipográfico">
      <p className="text-muted-foreground max-w-2xl mb-10">
        Tres familias tipográficas con roles claros: <strong className="text-foreground">Sora</strong> para
        display, <strong className="text-foreground">Inter</strong> para UI y body, <strong className="text-foreground">JetBrains Mono</strong> para
        datos técnicos y overlines.
      </p>

      {/* Font families */}
      <div className="grid lg:grid-cols-3 gap-5 mb-12">
        {[
          { family: "Sora", css: "var(--font-display)", role: "Display · Headlines", sample: "Precisión", weight: "700" },
          { family: "Inter", css: "var(--font-sans)", role: "Sans · Body + UI", sample: "Manejo de efectivo", weight: "400" },
          { family: "JetBrains Mono", css: "var(--font-mono)", role: "Mono · Datos técnicos", sample: "1,200 bpm", weight: "500" },
        ].map((f) => (
          <div key={f.family} className="card-base p-6">
            <div className="overline text-muted-foreground mb-2">{f.role}</div>
            <div className="text-3xl font-bold mb-3" style={{ fontFamily: f.css, fontWeight: f.weight as any }}>
              {f.sample}
            </div>
            <div className="text-xs text-muted-foreground font-mono">{f.family} · {f.css}</div>
          </div>
        ))}
      </div>

      {/* Type scale */}
      <h3 className="font-display font-semibold text-lg mb-4">Escala tipográfica</h3>
      <div className="card-base divide-y divide-border overflow-hidden">
        {[
          { cls: "display-1", size: "clamp(40–56px)", line: "1.05", tracking: "-0.03em", weight: "700", text: "Precisión y Seguridad Industrial", usage: "Hero h1" },
          { cls: "display-2", size: "clamp(32–44px)", line: "1.10", tracking: "-0.025em", weight: "700", text: "Servicio Técnico Oficial GLORY", usage: "Section h2" },
          { cls: "display-3", size: "clamp(24–32px)", line: "1.15", tracking: "-0.02em", weight: "600", text: "Catálogo de productos", usage: "Block h3" },
          { cls: "text-xl font-semibold", size: "20px", line: "1.40", tracking: "-0.01em", weight: "600", text: "Contadora de billetes AMC-9100", usage: "Card title" },
          { cls: "text-lg", size: "18px", line: "1.60", tracking: "0", weight: "400", text: "Venta, mantenimiento y calibración profesional.", usage: "Lead paragraph" },
          { cls: "text-base", size: "16px", line: "1.60", tracking: "0", weight: "400", text: "Cuerpo de texto estándar para párrafos y contenido general.", usage: "Body" },
          { cls: "text-sm", size: "14px", line: "1.55", tracking: "0", weight: "400", text: "Texto secundario, descripciones, captions.", usage: "Secondary" },
          { cls: "text-xs", size: "12px", line: "1.50", tracking: "0.02em", weight: "500", text: "Footnotes, disclaimers, metadata.", usage: "Caption" },
          { cls: "overline", size: "11px", line: "1.40", tracking: "0.18em UPPER", weight: "600 mono", text: "Servicio Técnico Oficial", usage: "Overline" },
        ].map((row) => (
          <div key={row.cls} className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3 p-5 hover:bg-muted/40 transition-colors">
            <div>
              <div className={row.cls}>{row.text}</div>
            </div>
            <div className="text-xs text-muted-foreground font-mono space-y-0.5 lg:text-right">
              <div><span className="text-foreground font-semibold">.class:</span> {row.cls}</div>
              <div><span className="text-foreground font-semibold">size:</span> {row.size}</div>
              <div><span className="text-foreground font-semibold">line:</span> {row.line} · <span className="text-foreground font-semibold">tracking:</span> {row.tracking}</div>
              <div><span className="text-foreground font-semibold">weight:</span> {row.weight} · <span className="text-foreground font-semibold">uso:</span> {row.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================================
   4. GRID & LAYOUT
   ============================================================================ */
function GridSection() {
  return (
    <Section id="grid" icon={Grid3x3} overline="04 · Grid & Layout" title="Sistema de Grid">
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <p className="text-muted-foreground mb-6">
            Container de 1280px máximo con gutters responsivos. Sistema de 12 columnas con gap
            consistente de 24px en desktop y 16px en mobile.
          </p>

          {/* Container visualization */}
          <div className="bg-surface-2 border border-border rounded-lg p-4 mb-6">
            <p className="overline text-muted-foreground mb-3">Container .container-amc</p>
            <div className="bg-primary-tint border-2 border-dashed border-primary/40 rounded-md h-16 flex items-center justify-center">
              <span className="text-xs font-mono text-primary">max-width: 1280px · gutter responsive</span>
            </div>
          </div>

          {/* 12-column grid */}
          <div className="bg-surface-2 border border-border rounded-lg p-4 mb-6">
            <p className="overline text-muted-foreground mb-3">Grid de 12 columnas</p>
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-12 bg-primary/15 border border-primary/30 rounded text-xs text-primary font-mono flex items-center justify-center">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Spacing scale */}
          <div className="bg-surface-2 border border-border rounded-lg p-4">
            <p className="overline text-muted-foreground mb-3">Escala de espaciado (4px base)</p>
            <div className="space-y-2">
              {[
                { name: "4px", cls: "w-1", label: "gap-1" },
                { name: "8px", cls: "w-2", label: "gap-2" },
                { name: "12px", cls: "w-3", label: "gap-3" },
                { name: "16px", cls: "w-4", label: "gap-4" },
                { name: "24px", cls: "w-6", label: "gap-6" },
                { name: "32px", cls: "w-8", label: "gap-8" },
                { name: "48px", cls: "w-12", label: "gap-12" },
                { name: "64px", cls: "w-16", label: "gap-16" },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <div className="w-16 text-xs font-mono text-muted-foreground">{s.label}</div>
                  <div className={`h-3 ${s.cls} bg-primary rounded-sm`} />
                  <div className="text-xs font-mono text-muted-foreground">{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Breakpoints table */}
        <div>
          <h3 className="font-display font-semibold text-base mb-4">Breakpoints</h3>
          <div className="card-base overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 border-b border-border">
                <tr>
                  <th className="text-left p-3 font-semibold">Token</th>
                  <th className="text-left p-3 font-semibold">Min</th>
                  <th className="text-left p-3 font-semibold">Uso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["default", "0px", "Mobile first base"],
                  ["sm", "640px", "Forms 2-col, list 2-col"],
                  ["md", "768px", "Header CTA visible"],
                  ["lg", "1024px", "Layout split 2-col"],
                  ["xl", "1280px", "Container full width"],
                  ["2xl", "1536px", "Wide screens"],
                ].map((r) => (
                  <tr key={r[0]} className="hover:bg-muted/40">
                    <td className="p-3 font-mono font-semibold text-primary">{r[0]}</td>
                    <td className="p-3 font-mono">{r[1]}</td>
                    <td className="p-3 text-muted-foreground text-xs">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display font-semibold text-base mt-6 mb-4">Radios</h3>
          <div className="card-base p-4 space-y-2">
            {[
              ["--radius-xs", "4px"],
              ["--radius-sm", "6px"],
              ["--radius-md", "10px"],
              ["--radius-lg", "14px"],
              ["--radius-xl", "20px"],
              ["--radius-2xl", "28px"],
              ["--radius-full", "9999px"],
            ].map(([n, v]) => (
              <div key={n} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 border border-primary/40" style={{ borderRadius: v }} />
                <span className="font-mono text-xs">{n}</span>
                <span className="font-mono text-xs text-muted-foreground ml-auto">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================================
   5. COMPONENTES BASE
   ============================================================================ */
function ComponentsSection() {
  return (
    <Section id="componentes" icon={Code2} overline="05 · Componentes Base" title="Componentes UI">
      <p className="text-muted-foreground max-w-2xl mb-10">
        16 componentes base construidos sobre shadcn/ui + Radix UI, estilizados con tokens AMC.
        Todos soportan estados <code className="font-mono text-primary">default</code>,{" "}
        <code className="font-mono text-primary">hover</code>,{" "}
        <code className="font-mono text-primary">focus</code>,{" "}
        <code className="font-mono text-primary">disabled</code> y{" "}
        <code className="font-mono text-primary">loading</code>.
      </p>

      {/* Buttons */}
      <DemoBlock title="Button" description="6 variants · 4 tamaños · con icono opcional">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary px-5 py-2.5 text-sm">Primary <ArrowRight className="w-4 h-4" /></button>
            <button className="btn-secondary px-5 py-2.5 text-sm">Secondary</button>
            <button className="btn-outline px-5 py-2.5 text-sm">Outline</button>
            <button className="btn-ghost px-5 py-2.5 text-sm">Ghost</button>
            <button className="btn-glass px-5 py-2.5 text-sm">Glass</button>
            <button className="btn-destructive px-5 py-2.5 text-sm">Destructive</button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="btn-primary px-3 py-1.5 text-xs">XS</button>
            <button className="btn-primary px-4 py-2 text-sm">SM</button>
            <button className="btn-primary px-5 py-2.5 text-sm">MD</button>
            <button className="btn-primary px-6 py-3 text-base">LG</button>
            <button className="btn-primary px-5 py-2.5 text-sm opacity-50 pointer-events-none">Disabled</button>
          </div>
        </div>
      </DemoBlock>

      {/* Card */}
      <DemoBlock title="Card" description="Base · elevated · outline · hover state">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card-base p-5">
            <div className="overline text-muted-foreground mb-2">Default</div>
            <h4 className="font-display font-semibold mb-1">Card base</h4>
            <p className="text-xs text-muted-foreground">Sin elevación, con borde sutil.</p>
          </div>
          <div className="card-base p-5 shadow-amc-md">
            <div className="overline text-muted-foreground mb-2">Elevated</div>
            <h4 className="font-display font-semibold mb-1">Card elevada</h4>
            <p className="text-xs text-muted-foreground">Con sombra md para destacar.</p>
          </div>
          <div className="card-base card-hover p-5">
            <div className="overline text-primary mb-2">Hoverable</div>
            <h4 className="font-display font-semibold mb-1">Card interactiva</h4>
            <p className="text-xs text-muted-foreground">Hover sobre esta card.</p>
          </div>
        </div>
      </DemoBlock>

      {/* Badge */}
      <DemoBlock title="Badge" description="5 variants semánticos · chip · dot">
        <div className="flex flex-wrap gap-3">
          <span className="badge-primary">Primary</span>
          <span className="badge-success"><Check className="w-3 h-3" /> Success</span>
          <span className="badge-warning">Warning</span>
          <span className="badge-error"><X className="w-3 h-3" /> Error</span>
          <span className="badge-neutral">Neutral</span>
          <span className="badge-primary"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Con dot</span>
        </div>
      </DemoBlock>

      {/* Inputs */}
      <DemoBlock title="Input · Textarea · Select" description="Form controls con estados normal/focus/error/disabled">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Input normal</label>
            <input className="input-base" placeholder="Nombre del cliente" />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Input con focus</label>
            <input className="input-base ring-2 ring-primary/20 border-primary" placeholder="Email corporativo" defaultValue="cliente@empresa.com" />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Input con error</label>
            <input className="input-base border-error ring-2 ring-error/15" placeholder="RUC" defaultValue="123456" />
            <p className="text-xs text-error mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> RUC debe tener 11 dígitos</p>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Input disabled</label>
            <input className="input-base opacity-50 cursor-not-allowed" placeholder="Deshabilitado" disabled />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-foreground mb-1.5 block">Textarea</label>
            <textarea className="input-base min-h-[100px] resize-y" placeholder="Mensaje del cliente, requerimientos técnicos, volumen de operación..." />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-foreground mb-1.5 block">Select</label>
            <select className="input-base">
              <option>Contadora de billetes</option>
              <option>Contadora de monedas</option>
              <option>Clasificadora</option>
              <option>Detector</option>
            </select>
          </div>
        </div>
      </DemoBlock>

      {/* Dialog / Modal trigger */}
      <DemoBlock title="Dialog · Modal" description="Overlay con backdrop blur · 3 tamaños (sm/md/lg) · cerrar por ESC">
        <DialogDemo />
      </DemoBlock>

      {/* Breadcrumb */}
      <DemoBlock title="Breadcrumb" description="Navegación jerárquica con BreadcrumbList JSON-LD">
        <nav className="flex items-center gap-1.5 text-sm">
          <a href="#" className="breadcrumb-link">Inicio</a>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <a href="#" className="breadcrumb-link">Productos</a>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <a href="#" className="breadcrumb-link">Contadoras de billetes</a>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="breadcrumb-current">AMC-9100</span>
        </nav>
      </DemoBlock>

      {/* Pagination */}
      <DemoBlock title="Pagination" description="Numerada · con ellipsis · prev/next · activo">
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-md border border-border hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          {[1, 2, 3].map((n) => (
            <button key={n} className={`w-9 h-9 rounded-md text-sm font-medium ${n === 1 ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}>
              {n}
            </button>
          ))}
          <span className="px-2 text-muted-foreground">…</span>
          <button className="w-9 h-9 rounded-md border border-border hover:bg-muted text-sm font-medium">12</button>
          <button className="w-9 h-9 rounded-md border border-border hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </DemoBlock>

      {/* Tabs */}
      <DemoBlock title="Tabs" description="Underline style · con contador opcional">
        <TabsDemo />
      </DemoBlock>

      {/* Accordion */}
      <DemoBlock title="Accordion" description="Colapsable · single o multi · con icono rotativo">
        <AccordionDemo />
      </DemoBlock>

      {/* Navbar */}
      <DemoBlock title="Navbar" description="Sticky · blur backdrop · drawer en mobile">
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground font-display font-bold flex items-center justify-center text-xs">AMC</div>
              <span className="font-display font-semibold text-sm">AMC Soluciones</span>
            </div>
            <nav className="hidden sm:flex items-center gap-1 text-xs">
              <a className="px-3 py-1.5 rounded hover:bg-muted">Inicio</a>
              <a className="px-3 py-1.5 rounded hover:bg-muted">Productos</a>
              <a className="px-3 py-1.5 rounded hover:bg-muted">Servicio</a>
            </nav>
            <button className="btn-primary px-3 py-1.5 text-xs">Cotizar</button>
          </div>
        </div>
      </DemoBlock>

      {/* Footer */}
      <DemoBlock title="Footer" description="4 columnas · datos contacto · bottom bar legal">
        <div className="bg-slate-950 text-slate-300 rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="font-display font-bold text-white mb-2">AMC</div>
              <p className="text-slate-400">Soluciones en manejo de efectivo.</p>
            </div>
            {["Productos", "Servicio", "Empresa"].map((c) => (
              <div key={c}>
                <div className="font-semibold text-white mb-2">{c}</div>
                <ul className="space-y-1 text-slate-400">
                  <li>Link 1</li>
                  <li>Link 2</li>
                  <li>Link 3</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-500">
            © 2026 AMC Soluciones Perú
          </div>
        </div>
      </DemoBlock>

      {/* Sidebar */}
      <DemoBlock title="Sidebar" description="Panel admin · navy oscuro · activo destacado">
        <div className="bg-sidebar text-sidebar-foreground rounded-lg p-3 w-56">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-7 h-7 rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-display font-bold flex items-center justify-center text-xs">A</div>
            <span className="font-display font-semibold text-sm">AMC Admin</span>
          </div>
          <nav className="space-y-0.5 text-xs">
            {[
              { label: "Dashboard", active: true },
              { label: "Productos", badge: "24" },
              { label: "Cotizaciones", badge: "3" },
              { label: "Contactos" },
              { label: "Blog" },
              { label: "Usuarios" },
            ].map((i) => (
              <a key={i.label} className={`flex items-center justify-between px-3 py-2 rounded-md ${i.active ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold" : "hover:bg-sidebar-accent"}`}>
                <span>{i.label}</span>
                {i.badge && <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${i.active ? "bg-sidebar-primary-foreground/20" : "bg-sidebar-accent"}`}>{i.badge}</span>}
              </a>
            ))}
          </nav>
        </div>
      </DemoBlock>
    </Section>
  );
}

function DemoBlock({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h3 className="font-display font-semibold text-base">{title}</h3>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className="card-base p-5 bg-surface-2">{children}</div>
    </div>
  );
}

function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary px-5 py-2.5 text-sm">
        Abrir Dialog <MessageCircle className="w-4 h-4" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-surface rounded-xl shadow-amc-xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-display font-bold text-lg">Solicitar cotización</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Respuesta en menos de 24h hábiles</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <input className="input-base" placeholder="Nombre completo" />
              <input className="input-base" placeholder="Email corporativo" />
              <input className="input-base" placeholder="Teléfono / WhatsApp" />
              <button className="btn-primary w-full py-2.5 text-sm">Enviar solicitud</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TabsDemo() {
  const [active, setActive] = React.useState(0);
  const tabs = ["Características", "Especificaciones", "Aplicaciones", "Garantía"];
  return (
    <div>
      <div className="flex border-b border-border gap-1">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active === i
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="pt-4 text-sm text-muted-foreground">
        Contenido de la pestaña <strong className="text-foreground">{tabs[active]}</strong>. Cada tab
        puede contener tablas, listas, multimedia o formularios.
      </div>
    </div>
  );
}

function AccordionDemo() {
  const [open, setOpen] = React.useState<number | null>(0);
  const items = [
    { q: "¿Qué marcas de equipos reparan?", a: "Trabajamos principalmente con GLORY, Hyundai, Henry, Royal Sovereign y Cassida. También equipos genéricos con diagnóstico previo." },
    { q: "¿Cuánto demora una calibración?", a: "Una calibración estándar toma entre 24 y 48 horas hábiles. Para servicio express en sitio, contamos con técnicos disponibles el mismo día en Lima Metropolitana." },
    { q: "¿La garantía cubre repuestos?", a: "Sí. Todos nuestros equipos incluyen garantía oficial de 12 meses que cubre mano de obra y repuestos originales del fabricante." },
  ];
  return (
    <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
      {items.map((it, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/40 transition-colors"
          >
            <span className="font-medium text-sm">{it.q}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm text-muted-foreground">{it.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================================
   6. CARDS ESPECIALIZADAS
   ============================================================================ */
function CardsSection() {
  return (
    <Section id="cards" icon={Layers} overline="06 · Cards Especializadas" title="Cards de Negocio">
      <p className="text-muted-foreground max-w-2xl mb-10">
        5 cards específicas para el catálogo AMC. Cada una optimizada para su contexto: producto
        (conversión), categoría (navegación), marca (identidad), servicio (claridad técnica),
        testimonio (prueba social).
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Product Card */}
        <article className="card-base card-hover overflow-hidden group">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-surface-2 flex items-center justify-center">
            <Banknote className="w-20 h-20 text-secondary group-hover:scale-110 group-hover:text-primary/40 transition-all duration-500" strokeWidth={1} />
            <span className="absolute top-3 left-3 badge-success">Más vendido</span>
          </div>
          <div className="p-5">
            <div className="overline text-muted-foreground mb-1">Contadora de billetes</div>
            <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors">AMC-9100</h3>
            <div className="space-y-1.5 mb-4 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Velocidad</span><span className="font-mono font-semibold">1,200 bpm</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Detección</span><span className="font-mono font-semibold">UV · MG · IR</span></div>
            </div>
            <div className="flex gap-2">
              <button className="btn-primary flex-1 py-2 text-xs">Cotizar <ArrowRight className="w-3 h-3" /></button>
              <button className="p-2 rounded-md border border-border hover:border-primary/40"><Eye className="w-4 h-4" /></button>
            </div>
          </div>
        </article>

        {/* Category Card */}
        <a href="#" className="card-base card-hover p-7 group block">
          <div className="flex items-start justify-between mb-5">
            <div className="w-14 h-14 rounded-lg bg-primary-tint text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Coins className="w-7 h-7" strokeWidth={1.6} />
            </div>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-full">5 modelos</span>
          </div>
          <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">Contadoras de Monedas</h3>
          <p className="text-sm text-muted-foreground mb-5">Clasificación y conteo preciso de monedas por denominación.</p>
          <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
            Ver catálogo <ArrowRight className="w-4 h-4" />
          </div>
        </a>

        {/* Brand Card */}
        <a href="#" className="card-base card-hover p-7 group block text-center">
          <div className="aspect-[3/2] bg-surface-2 rounded-lg flex items-center justify-center mb-4">
            <span className="font-display font-bold text-3xl text-secondary group-hover:text-primary transition-colors">GLORY</span>
          </div>
          <h3 className="font-display font-semibold text-base mb-1">Glory Global</h3>
          <p className="text-xs text-muted-foreground">Fabricante japonés líder en manejo de efectivo</p>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
            8 modelos <ArrowUpRight className="w-3 h-3" />
          </div>
        </a>

        {/* Service Card */}
        <div className="card-base card-hover p-6 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-primary-tint text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Gauge className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base">Calibración</h3>
              <p className="overline text-muted-foreground text-[10px]">S-02 · Certificado</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Ajuste de precisión certificado bajo estándares de fábrica. Reporte técnico entregable.
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="badge-success"><Check className="w-3 h-3" /> 24-48h</span>
            <button className="text-xs font-semibold text-primary hover:gap-2 inline-flex items-center gap-1 transition-all">
              Solicitar <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Testimonial Card */}
        <figure className="card-base card-hover p-7">
          <Quote className="w-8 h-8 text-primary/30 mb-4" />
          <blockquote className="text-sm text-foreground leading-relaxed mb-5">
            "La precisión de las contadoras AMC y la rapidez del servicio técnico nos permitieron
            reducir significativamente las diferencias de caja en nuestras agencias."
          </blockquote>
          <div className="flex items-center gap-0.5 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-warning text-warning" />
            ))}
          </div>
          <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
            <div className="w-10 h-10 rounded-full bg-primary-tint text-primary flex items-center justify-center font-display font-bold text-xs">CM</div>
            <div>
              <div className="font-semibold text-sm">Carlos Mendoza</div>
              <div className="text-xs text-muted-foreground">Gerente · Inkafarma</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

/* ============================================================================
   7. ICONOGRAFÍA
   ============================================================================ */
function IconographySection() {
  const icons = [ShieldCheck, Gauge, Wrench, Truck, Award, Headphones, Banknote, Coins, ScanLine, Settings2, Cpu, Zap, Lock, TrendingUp, FileText, Download, Phone, Mail, MapPin, Clock, Bell, Search, User, Plus, Edit, Trash2, Eye, Filter, Check, X, ArrowRight, ArrowUpRight, ChevronRight, ChevronDown, Menu, MessageCircle, Star, Quote, Building2, Factory, Store, Stethoscope, AlertCircle, CheckCircle2, Info, AlertTriangle];
  return (
    <Section id="iconos" icon={Sparkles} overline="07 · Iconografía" title="Sistema de Iconos">
      <div className="grid lg:grid-cols-[1fr_280px] gap-8 mb-8">
        <p className="text-muted-foreground max-w-2xl">
          Librería <strong className="text-foreground">Lucide React</strong> — iconos lineales SVG,
          tree-shakeable, con stroke width consistente de 1.5–1.75px. Sin iconos de emoji ni
          sets mixtos.
        </p>
        <div className="card-base p-4 space-y-2 text-xs">
          <div className="flex justify-between"><span className="text-muted-foreground">Librería</span><span className="font-mono">lucide-react</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Stroke</span><span className="font-mono">1.5 – 1.75 px</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tamaños</span><span className="font-mono">16 · 20 · 24 · 32</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Carga</span><span className="font-mono">tree-shakeable</span></div>
        </div>
      </div>

      <div className="card-base p-6">
        <p className="overline text-muted-foreground mb-4">Catálogo principal ({icons.length} iconos)</p>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {icons.map((Icon, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-md hover:bg-muted/60 transition-colors group cursor-default">
              <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" strokeWidth={1.75} />
              <span className="text-[10px] font-mono text-muted-foreground truncate max-w-full">
                {/* @ts-ignore */}
                {Icon.displayName || "icon"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage rules */}
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="card-base p-5">
          <div className="overline text-success mb-2">Correcto</div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center">
              <Banknote className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <span className="text-sm">Icono en container con tint</span>
          </div>
          <p className="text-xs text-muted-foreground">Tamaño 20px · stroke 1.75 · en contenedor con fondo primary-tint</p>
        </div>
        <div className="card-base p-5">
          <div className="overline text-success mb-2">Correcto</div>
          <div className="flex items-center gap-3 mb-2">
            <Wrench className="w-5 h-5 text-primary" strokeWidth={1.75} />
            <span className="text-sm">Inline con texto</span>
          </div>
          <p className="text-xs text-muted-foreground">Tamaño 16-20px · color hereda del texto · alineado verticalmente</p>
        </div>
        <div className="card-base p-5">
          <div className="overline text-error mb-2">Prohibido</div>
          <div className="flex items-center gap-3 mb-2">
            <Banknote className="w-8 h-8 text-pink-500" strokeWidth={3} />
            <span className="text-sm">Stroke grueso + color fuera de paleta</span>
          </div>
          <p className="text-xs text-muted-foreground">No mezclar stroke widths · no usar colores fuera del Design System</p>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================================
   8. MOTION DESIGN
   ============================================================================ */
function MotionSection() {
  const [hover, setHover] = React.useState(false);
  return (
    <Section id="motion" icon={MousePointerClick} overline="08 · Motion Design" title="Sistema de Motion">
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-muted-foreground mb-4">
            Framer Motion como librería principal · GSAP solo para animaciones complejas (timeline, scroll-linked).
            Toda animación respeta <code className="font-mono text-primary">prefers-reduced-motion</code>.
          </p>
          <div className="card-base p-5 space-y-3 text-xs font-mono">
            <div className="flex justify-between"><span className="text-muted-foreground">--ease-amc</span><span>cubic-bezier(.16, 1, .3, 1)</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">--ease-amc-in-out</span><span>cubic-bezier(.65, 0, .35, 1)</span></div>
            <div className="border-t border-border pt-3 mt-3">
              <div className="text-muted-foreground mb-2">Duraciones</div>
              <div className="grid grid-cols-2 gap-y-1">
                <span>150ms · micro</span><span>250ms · dropdown</span>
                <span>400ms · accordion</span><span>600ms · reveal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-base p-5">
            <div className="overline text-muted-foreground mb-3">Hover micro-interacción</div>
            <button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="btn-primary px-5 py-2.5 text-sm transition-all duration-200"
              style={{ transform: hover ? "translateY(-2px)" : "translateY(0)" }}
            >
              Hover sobre este botón <ArrowRight className="w-4 h-4" style={{ transform: hover ? "translateX(2px)" : "translateX(0)", transition: "transform 200ms" }} />
            </button>
          </div>

          <div className="card-base p-5">
            <div className="overline text-muted-foreground mb-3">Scroll reveal</div>
            <ScrollRevealDemo />
          </div>

          <div className="card-base p-5">
            <div className="overline text-muted-foreground mb-3">Page transition (Framer Motion)</div>
            <pre className="text-xs font-mono text-muted-foreground bg-surface-2 p-3 rounded-md overflow-x-auto">
{`<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
/>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Motion principles */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Zap, title: "Micro", time: "150ms", desc: "Hover, focus, ripple" },
          { icon: ChevronDown, title: "Dropdown", time: "250ms", desc: "Menus, tooltips, popovers" },
          { icon: Layers, title: "Expand", time: "400ms", desc: "Accordion, tabs, modals" },
          { icon: TrendingUp, title: "Reveal", time: "600ms", desc: "Scroll, page transitions" },
        ].map((m) => (
          <div key={m.title} className="card-base p-5">
            <m.icon className="w-5 h-5 text-primary mb-3" strokeWidth={1.75} />
            <div className="font-display font-semibold text-sm">{m.title}</div>
            <div className="font-mono text-xs text-primary mt-1">{m.time}</div>
            <p className="text-xs text-muted-foreground mt-2">{m.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ScrollRevealDemo() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)} className="text-xs text-primary underline">
        {visible ? "Ocultar" : "Mostrar"} demo
      </button>
      <div
        className="mt-3 p-4 bg-primary-tint rounded-md border border-primary/20 text-sm text-primary"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s var(--ease-amc), transform 0.6s var(--ease-amc)",
        }}
      >
        Elemento revelado con translateY + opacity
      </div>
    </div>
  );
}

/* ============================================================================
   9. RESPONSIVE
   ============================================================================ */
function ResponsiveSection() {
  return (
    <Section id="responsive" icon={Grid3x3} overline="09 · Responsive" title="Estrategia Responsive">
      <p className="text-muted-foreground max-w-2xl mb-8">
        Mobile-first estricto. Cada layout se diseña primero para 375px y luego se enriquece hacia
        desktop. Sin excepciones: toda interacción debe ser táctil (mínimo 44px de target).
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { device: "Mobile", width: "375px", icon: "📱", cols: "1 col", gutters: "16px", targets: "44px" },
          { device: "Tablet", width: "768px", icon: "📋", cols: "2 cols", gutters: "24px", targets: "44px" },
          { device: "Laptop", width: "1024px", icon: "💻", cols: "3 cols", gutters: "24px", targets: "32px" },
          { device: "Desktop", width: "1280px+", icon: "🖥️", cols: "4 cols", gutters: "32px", targets: "32px" },
        ].map((d) => (
          <div key={d.device} className="card-base p-5">
            <div className="text-3xl mb-3">{d.icon}</div>
            <div className="font-display font-bold text-base">{d.device}</div>
            <div className="font-mono text-xs text-primary mt-1">{d.width}</div>
            <div className="mt-4 space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Cols</span><span className="font-mono">{d.cols}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Gutters</span><span className="font-mono">{d.gutters}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Touch targets</span><span className="font-mono">{d.targets}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Live demo */}
      <div className="mt-8 card-base p-6">
        <p className="overline text-muted-foreground mb-4">Demo en vivo · resize tu ventana</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {["Mobile", "Tablet", "Laptop", "Desktop"].map((d, i) => (
            <div key={d} className={`p-4 rounded-md text-center text-sm font-medium ${i === 0 ? "bg-primary text-primary-foreground sm:bg-primary-tint sm:text-primary lg:bg-primary lg:text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              <div className="sm:hidden">Visible solo en mobile</div>
              <div className="hidden sm:block lg:hidden">Visible en tablet</div>
              <div className="hidden lg:block">Visible en desktop</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================================
   10. ACCESIBILIDAD
   ============================================================================ */
function AccessibilitySection() {
  return (
    <Section id="accesibilidad" icon={Accessibility} overline="10 · Accesibilidad" title="WCAG 2.1 AA">
      <p className="text-muted-foreground max-w-2xl mb-8">
        Cumplimiento estricto de WCAG 2.1 nivel AA. Contraste mínimo 4.5:1 en texto, navegación
        completa por teclado, ARIA correcto, soporte para lectores de pantalla y reduced-motion.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Eye, title: "Contraste AA", value: "4.5:1", desc: "Texto normal · 3:1 texto grande · verificado con Lighthouse" },
          { icon: Check, title: "Targets táctiles", value: "44px", desc: "Mínimo en mobile · 32px desktop · zona activa visible" },
          { icon: Lock, title: "Focus visible", value: "2px ring", desc: "Ring offset 2px · color primary · nunca se elimina" },
          { icon: Code2, title: "HTML semántico", value: "main/section/article", desc: "Roles ARIA solo cuando semántica no basta" },
          { icon: Headphones, title: "Screen reader", value: "sr-only", desc: "Texto alternativo para iconos decorativos" },
          { icon: Accessibility, title: "Reduced motion", value: "respect", desc: "Animaciones se desactivan con prefers-reduced-motion" },
        ].map((a) => (
          <div key={a.title} className="card-base p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-md bg-success-light text-success flex items-center justify-center flex-shrink-0">
                <a.icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="font-display font-semibold text-sm">{a.title}</div>
                <div className="font-mono text-xs text-success mt-0.5">{a.value}</div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contrast demo */}
      <div className="card-base p-6">
        <p className="overline text-muted-foreground mb-4">Verificación de contraste (ejemplos reales)</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { fg: "#003366", bg: "#ffffff", label: "Primary on white", ratio: "11.4:1", ok: true },
            { fg: "#ffffff", bg: "#003366", label: "White on primary", ratio: "11.4:1", ok: true },
            { fg: "#64748b", bg: "#ffffff", label: "Muted on white", ratio: "4.6:1", ok: true },
            { fg: "#b0b0b0", bg: "#ffffff", label: "Secondary on white", ratio: "2.6:1", ok: false },
          ].map((c) => (
            <div key={c.label} className={`rounded-lg overflow-hidden border ${c.ok ? "border-success/30" : "border-error/30"}`}>
              <div className="p-4" style={{ backgroundColor: c.bg, color: c.fg }}>
                <div className="font-semibold text-sm">AMC Soluciones</div>
                <div className="text-xs mt-1">Texto de ejemplo</div>
              </div>
              <div className="bg-surface p-3 flex items-center justify-between text-xs">
                <span className="font-mono">{c.ratio}</span>
                {c.ok ? <CheckCircle2 className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-error" />}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          <AlertTriangle className="w-3 h-3 inline mr-1" />
          Secondary (#B0B0B0) sobre blanco NO cumple AA para texto — solo usar como acento decorativo o sobre fondos oscuros.
        </p>
      </div>
    </Section>
  );
}

/* ============================================================================
   11. CONVENCIONES
   ============================================================================ */
function ConventionsSection() {
  return (
    <Section id="convenciones" icon={Code2} overline="11 · Convenciones" title="Convenciones de Código">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-base p-6">
          <h3 className="font-display font-semibold text-base mb-4">Naming</h3>
          <div className="space-y-3 text-sm">
            {[
              ["Componentes", "PascalCase · ProductCard, QuoteForm"],
              ["Hooks", "camelCase con use · useQuote, useProducts"],
              ["Stores (Zustand)", "camelCase con Store · cartStore, uiStore"],
              ["API routes", "kebab-case · /api/admin/products"],
              ["CSS variables", "--kebab-case · --primary, --primary-dark"],
              ["Tailwind utilities", "kebab-case · bg-primary, text-muted-foreground"],
              ["Tipos TS", "PascalCase · Product, QuoteStatus"],
              ["Enums TS", "PascalCase + valores UPPER_SNAKE · UserRole.SUPER_ADMIN"],
              ["Archivos", "kebab-case para páginas · PascalCase para componentes"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[100px_1fr] gap-3">
                <span className="text-xs font-semibold text-muted-foreground pt-0.5">{k}</span>
                <code className="text-xs font-mono text-primary">{v}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base p-6">
          <h3 className="font-display font-semibold text-base mb-4">Props</h3>
          <pre className="text-xs font-mono bg-surface-2 p-4 rounded-md overflow-x-auto">
{`interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
          | 'ghost' | 'glass' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  // Hereda todas las props nativas de <button>
  ...React.ButtonHTMLAttributes<HTMLButtonElement>
}

// ✅ Composición con className override
className={cn(baseStyles, variants[variant], sizes[size], className)}`}
          </pre>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>Props opcionales con valores por defecto</span></div>
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>Herencia de HTMLAttributes nativas</span></div>
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>cn() utility para merge condicional de clases</span></div>
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>forwardRef en todos los componentes base</span></div>
          </div>
        </div>

        <div className="card-base p-6">
          <h3 className="font-display font-semibold text-base mb-4">Variants (CVA pattern)</h3>
          <pre className="text-xs font-mono bg-surface-2 p-4 rounded-md overflow-x-auto">
{`import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  'btn-base',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border-2 border-primary text-primary',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);`}
          </pre>
        </div>

        <div className="card-base p-6">
          <h3 className="font-display font-semibold text-base mb-4">Composición & Reutilización</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>Componer componentes pequeños en lugar de crear variantes gigantes</span></div>
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>Slot pattern (Radix) para composición flexible</span></div>
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>Componentes UI en /components/ui (shadcn base)</span></div>
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>Componentes AMC específicos en /components/{`{domain}`}</span></div>
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>Shared components en /components/shared</span></div>
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>Nunca duplicar lógica — extraer hook si se repite 2+</span></div>
            <div className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-success mt-0.5" /><span>Server Components por defecto · 'use client' solo cuando necesario</span></div>
          </div>
        </div>
      </div>

      {/* File structure */}
      <div className="mt-8 card-base p-6">
        <h3 className="font-display font-semibold text-base mb-4">Estructura de archivos</h3>
        <pre className="text-xs font-mono bg-surface-2 p-4 rounded-md overflow-x-auto leading-relaxed">
{`src/
├── app/                          # App Router (Next.js 16)
│   ├── (public)/                 # Layout público
│   ├── (auth)/                   # Layout login
│   ├── admin/                    # Panel CMS (protected)
│   └── api/                      # API Routes REST
├── components/
│   ├── ui/                       # shadcn/ui base (no tocar)
│   ├── shared/                   # Componentes AMC reutilizables
│   │   ├── SectionTitle.tsx
│   │   ├── OptimizedImage.tsx
│   │   └── MotionSection.tsx
│   ├── home/                     # Secciones del Home
│   ├── product/                  # Componentes de producto
│   └── admin/                    # Componentes del panel
├── lib/                          # Utilidades server-side
│   ├── db.ts                     # Prisma client singleton
│   ├── auth.ts                   # NextAuth config
│   └── validators/               # Zod schemas
├── hooks/                        # Custom hooks
├── stores/                       # Zustand stores
├── types/                        # Tipos TS compartidos
└── middleware.ts                 # Protección /admin/*`}
        </pre>
      </div>
    </Section>
  );
}

/* ============================================================================
   SHARED — Section wrapper
   ============================================================================ */
function Section({
  id,
  icon: Icon,
  overline,
  title,
  children,
}: {
  id: string;
  icon: React.ElementType;
  overline: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary-tint text-primary flex items-center justify-center">
            <Icon className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <span className="overline text-muted-foreground">{overline}</span>
        </div>
        <h2 className="display-2 text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function DSFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-2">
      <div className="container-amc py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-primary text-primary-foreground font-display font-bold flex items-center justify-center text-sm">AMC</div>
            <div>
              <div className="font-display font-bold text-sm">AMC Soluciones Perú</div>
              <div className="overline text-muted-foreground text-[10px]">Design System v1.0 · Enterprise</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Documento contractual de diseño. Cualquier modificación requiere aprobación explícita del Lead Engineer.
          </p>
        </div>
      </div>
    </footer>
  );
}
