/**
 * AMC Soluciones Perú — Datos de marca y configuración central.
 * Este archivo es la única fuente de verdad para datos de contacto,
 * redes sociales, navegación y cualquier valor constante del sitio.
 */

export const AMCCONFIG = {
  company: {
    legalName: "AMC Soluciones Perú",
    brandName: "AMC Soluciones",
    tagline: "Líderes en tecnología de procesamiento de efectivo",
    description:
      "Especialistas en soluciones de conteo de efectivo. Venta, servicio técnico, calibración y mantenimiento de contadoras de billetes y monedas en todo Perú.",
    ruc: "20512345678", // Placeholder — confirmar con cliente
    domain: "https://amcsolucionesperu.com",
    locale: "es-PE",
    country: "Perú",
  },
  contact: {
    phone: "+51 984 569 125",
    phoneRaw: "+51984569125",
    whatsapp: "51984569125",
    whatsappMessage:
      "Hola, vengo desde el sitio web AMC Soluciones Perú y quiero información sobre sus productos y servicios.",
    email: "ventas@amcsolucionesperu.com",
    emailTechnical: "serviciotecnico@amcsolucionesperu.com",
    address: "Av. Argentina 1234, Cercado de Lima, Lima — Perú",
    addressShort: "Lima, Perú",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15605.075!2d-77.0428!3d-12.0464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f1d1d1d1d1%3A0x1!2sLima!5e0!3m2!1ses!2spe!4v1700000000000",
  },
  schedule: {
    weekdays: "Lun – Vie · 9:00 – 18:00",
    saturday: "Sábado · 9:00 – 13:00",
    sunday: "Domingo · Cerrado",
  },
  social: {
    facebook: "https://facebook.com/amcsolucionesperu",
    instagram: "https://instagram.com/amcsolucionesperu",
    linkedin: "https://linkedin.com/company/amcsolucionesperu",
    youtube: "https://youtube.com/@amcsolucionesperu",
  },
  stats: [
    { value: "+15", label: "Años de experiencia" },
    { value: "+2,500", label: "Equipos instalados" },
    { value: "24h", label: "Respuesta técnica" },
    { value: "99.8%", label: "Precisión de conteo" },
  ],
} as const;

/** Navegación principal — usada en Header y Footer */
export const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Categorías", href: "/categorias" },
  { label: "Servicio Técnico", href: "/servicio-tecnico" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
] as const;

/** Marcas que AMC representa — extraídas del sitio actual */
export const BRANDS = [
  "GLORY",
  "CashScan",
  "Hyundai",
  "Henry",
  "Royal Sovereign",
  "Cassida",
] as const;

/** Categorías de productos AMC */
export const CATEGORIES = [
  {
    slug: "contadoras-de-billetes",
    icon: "Banknote",
    title: "Contadoras de Billetes",
    description: "Conteo ultrarrápido con detección de falsos multi-sensorial UV, MG e IR.",
    count: 8,
    featured: true,
  },
  {
    slug: "contadoras-de-monedas",
    icon: "Coins",
    title: "Contadoras de Monedas",
    description: "Clasificación y conteo preciso de monedas por denominación.",
    count: 5,
    featured: false,
  },
  {
    slug: "clasificadoras",
    icon: "ScanLine",
    title: "Clasificadoras",
    description: "Equipos que clasifican y ordenan billetes por denominación.",
    count: 4,
    featured: false,
  },
  {
    slug: "detectores",
    icon: "ScanLine",
    title: "Detectores",
    description: "Detección profesional de billetes falsos con luz UV, MG e IR.",
    count: 6,
    featured: false,
  },
  {
    slug: "accesorios",
    icon: "Settings2",
    title: "Accesorios",
    description: "Repuestos, kit de mantenimiento y consumibles originales.",
    count: 12,
    featured: false,
  },
] as const;

/** Productos destacados — datos demo para el showcase */
export const FEATURED_PRODUCTS = [
  {
    slug: "amc-9100",
    name: "AMC-9100",
    category: "Contadora de Billetes",
    categorySlug: "contadoras-de-billetes",
    tag: "Más vendido",
    tagVariant: "success" as const,
    speed: "1,200 bpm",
    detection: "UV · MG · IR",
    capacity: "500 billetes",
    warranty: "12 meses",
    isNew: false,
    brand: "AMC",
  },
  {
    slug: "amc-3200-plus",
    name: "AMC-3200+",
    category: "Contadora de Billetes",
    categorySlug: "contadoras-de-billetes",
    tag: "Compacto",
    tagVariant: "primary" as const,
    speed: "1,500 bpm",
    detection: "UV · MG · IR",
    capacity: "300 billetes",
    warranty: "12 meses",
    isNew: false,
    brand: "AMC",
  },
  {
    slug: "amc-9200",
    name: "AMC-9200",
    category: "Contadora con Clasificación",
    categorySlug: "clasificadoras",
    tag: "Premium",
    tagVariant: "warning" as const,
    speed: "1,000 bpm",
    detection: "Multi-divisa",
    capacity: "700 billetes",
    warranty: "12 meses",
    isNew: false,
    brand: "AMC",
  },
  {
    slug: "amc-c100",
    name: "AMC-C100",
    category: "Contadora de Monedas",
    categorySlug: "contadoras-de-monedas",
    tag: "Nuevo",
    tagVariant: "primary" as const,
    speed: "1,800 mon/min",
    detection: "Multi-denominación",
    capacity: "2,500 monedas",
    warranty: "12 meses",
    isNew: true,
    brand: "AMC",
  },
] as const;

/** Servicios técnicos ofrecidos por AMC */
export const TECHNICAL_SERVICES = [
  {
    code: "S-01",
    icon: "Wrench",
    label: "Reparación",
    description: "Diagnóstico y reparación con repuestos originales del fabricante.",
  },
  {
    code: "S-02",
    icon: "Gauge",
    label: "Calibración",
    description: "Ajuste de precisión certificado bajo estándares de fábrica.",
  },
  {
    code: "S-03",
    icon: "Cpu",
    label: "Diagnóstico",
    description: "Auditoría técnica completa del estado del equipo.",
  },
  {
    code: "S-04",
    icon: "ShieldCheck",
    label: "Mant. Preventivo",
    description: "Planes programados para extender la vida útil del equipo.",
  },
  {
    code: "S-05",
    icon: "Award",
    label: "Garantía",
    description: "Soporte de garantía oficial del fabricante.",
  },
  {
    code: "S-06",
    icon: "Zap",
    label: "Soporte Express",
    description: "Atención prioritaria con respuesta en menos de 24h.",
  },
] as const;

/** Beneficios institucionales de AMC */
export const BENEFITS = [
  {
    icon: "ShieldCheck",
    title: "Precisión Certificada",
    description:
      "Conteo y detección con tecnología multi-sensorial UV, MG e IR. Equipos que garantizan exactitud en cada transacción.",
  },
  {
    icon: "Wrench",
    title: "Respaldo Técnico",
    description:
      "Servicio técnico especializado con técnicos certificados por GLORY. Diagnóstico, calibración y mantenimiento preventivo programado.",
  },
  {
    icon: "Truck",
    title: "Cobertura Nacional",
    description:
      "Despacho a todo Perú con soporte técnico en Lima Metropolitana y provincias. Respuesta en menos de 24 horas hábiles.",
  },
  {
    icon: "Award",
    title: "Garantía Oficial",
    description:
      "Todos nuestros equipos cuentan con garantía oficial de fábrica. Repuestos originales y soporte directo del fabricante.",
  },
] as const;

/** Empresas que confían en AMC */
export const TRUSTED_COMPANIES = [
  { name: "Banco Pichincha", icon: "Building2" },
  { name: "Caja Sullana", icon: "Building2" },
  { name: "Plaza Vea", icon: "Store" },
  { name: "Inkafarma", icon: "Stethoscope" },
  { name: "Maestro", icon: "Factory" },
  { name: "Promart", icon: "Store" },
] as const;

/** Pasos del proceso de trabajo AMC */
export const WORK_PROCESS = [
  {
    number: "01",
    icon: "Headphones",
    title: "Consulta",
    description: "Nos contacta y analizamos su necesidad operativa: volumen, divisas, entorno.",
  },
  {
    number: "02",
    icon: "FileText",
    title: "Propuesta",
    description: "Recibe una cotización detallada con el equipo ideal y servicios asociados.",
  },
  {
    number: "03",
    icon: "Truck",
    title: "Implementación",
    description: "Despacho, instalación y capacitación de su equipo en sitio.",
  },
  {
    number: "04",
    icon: "ShieldCheck",
    title: "Respaldo",
    description: "Garantía oficial, soporte técnico y mantenimiento preventivo continuo.",
  },
] as const;

/** Testimonios de clientes */
export const TESTIMONIALS = [
  {
    name: "Carlos Mendoza",
    position: "Gerente de Operaciones",
    company: "Cadena de Farmacias Inkafarma",
    rating: 5,
    content:
      "La precisión de las contadoras AMC y la rapidez del servicio técnico nos permitieron reducir significativamente las diferencias de caja en nuestras agencias.",
  },
  {
    name: "Rosa Quispe",
    position: "Jefa de Tesorería",
    company: "Municipalidad de Surco",
    rating: 5,
    content:
      "El equipo de AMC no solo nos vendió las máquinas, nos acompañó en la implementación y capacitación del personal. Soporte técnico impecable.",
  },
  {
    name: "Jorge Velásquez",
    position: "CFO",
    company: "Grupo Retail Peruano",
    rating: 5,
    content:
      "Migrar desde otro proveedor a AMC fue la mejor decisión. La calibración periódica y los repuestos originales marcan la diferencia.",
  },
] as const;
