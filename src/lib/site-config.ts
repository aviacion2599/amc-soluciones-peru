/**
 * AMC Soluciones Perú — Datos de marca y configuración central.
 * Este archivo es la única fuente de verdad para datos de contacto,
 * redes sociales, navegación y cualquier valor constante del sitio.
 *
 * PALABRAS CLAVE AMC: Precisión · Seguridad · Control · Confianza · Respaldo Técnico
 */

export const AMCCONFIG = {
  company: {
    legalName: "AMC Soluciones Perú",
    brandName: "AMC Soluciones",
    legalRazonSocial: "AMC Multimedia Machine Technical Service E.I.R.L.",
    tagline: "No solo vendemos equipos, nos hacemos responsables de su funcionamiento.",
    valueProp: "Contadoras de billetes y monedas: venta y servicio técnico en Perú",
    description:
      "AMC Soluciones Perú se especializa en la venta de contadoras profesionales de billetes y monedas, mantenimiento preventivo y correctivo, reparación, calibración, actualización de divisas y soporte técnico para equipos de procesamiento de efectivo.",
    ruc: "20512345678",
    domain: "https://amcsolucionesperu.com",
    locale: "es-PE",
    country: "Perú",
    keywords: ["precisión", "seguridad", "control", "confianza", "respaldo técnico", "contadoras de billetes", "contadoras de monedas", "servicio técnico GLORY", "calibración contadoras", "clasificadoras de billetes"] as string[],
  },
  contact: {
    phone: "+51 984 569 125",
    phoneRaw: "+51984569125",
    whatsapp: "51984569125",
    whatsappMessage:
      "Hola, vengo desde el sitio web AMC Soluciones Perú y quiero información sobre sus productos y servicios.",
    email: "soporteamc@amcelec.com",
    emailTechnical: "soporteamc@amcelec.com",
    address: "Punto de recepción y entrega: San Borja. Atención previa coordinación.",
    addressShort: "San Borja, Lima",
    mapEmbed: "",
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
    { value: "24h", label: "Respuesta técnica garantizada" },
    { value: "99.8%", label: "Precisión de conteo certificada" },
  ],
  impactStats: [
    { value: "99.8%", label: "Precisión en detección de falsos", icon: "ShieldCheck" },
    { value: "80%", label: "Menos fallas con mantenimiento preventivo", icon: "TrendingDown" },
    { value: "8,000+", label: "Billetes contados por minuto", icon: "Gauge" },
    { value: "24h", label: "Tiempo máximo de respuesta técnica", icon: "Clock" },
    { value: "12", label: "Marcas y modelos atendidos", icon: "Cpu" },
    { value: "90 días", label: "Garantía mínima en reparaciones", icon: "Award" },
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

/** Marcas con las que tenemos experiencia técnica */
export const BRANDS = [
  { name: "GLORY", description: "Experiencia técnica especializada" },
  { name: "CashScan", description: "Conocimiento en detección y conteo" },
  { name: "Hyundai", description: "Experiencia en tecnología de conteo" },
  { name: "Henry", description: "Conocimiento en detección" },
  { name: "Royal Sovereign", description: "Experiencia en clasificadoras" },
  { name: "Cassida", description: "Conocimiento en falsificación" },
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

/** Productos destacados — 5 modelos aprobados */
export const FEATURED_PRODUCTS = [
  {
    slug: "amc-3200",
    name: "AMC-3200",
    category: "Contadora de Billetes",
    categorySlug: "contadoras-de-billetes",
    tag: "Entrada",
    tagVariant: "primary" as const,
    speed: "1,500 bpm",
    detection: "CIS · IR · MG · UV",
    capacity: "300 billetes",
    warranty: "18 meses",
    isNew: false,
    brand: "AMC",
  },
  {
    slug: "amc-8100",
    name: "AMC-8100",
    category: "Contadora de Billetes",
    categorySlug: "contadoras-de-billetes",
    tag: "Multimoneda",
    tagVariant: "primary" as const,
    speed: "1,200 bpm",
    detection: "Doble CIS · MG · UV · IR",
    capacity: "500 billetes",
    warranty: "18 meses",
    isNew: false,
    brand: "AMC",
  },
  {
    slug: "amc-9100",
    name: "AMC-9100",
    category: "Contadora de Billetes",
    categorySlug: "contadoras-de-billetes",
    tag: "Bolsillo Rechazo",
    tagVariant: "primary" as const,
    speed: "1,000 bpm",
    detection: "Doble CIS · TMR · UV",
    capacity: "500 billetes",
    warranty: "18 meses",
    isNew: true,
    brand: "AMC",
  },
  {
    slug: "amc-8200",
    name: "AMC-8200",
    category: "Clasificadora",
    categorySlug: "clasificadoras",
    tag: "1+1 Cajetines",
    tagVariant: "warning" as const,
    speed: "1,200 bpm",
    detection: "Doble CIS color · 13ch MG",
    capacity: "500 billetes",
    warranty: "18 meses",
    isNew: false,
    brand: "AMC",
  },
  {
    slug: "amc-8300-pro",
    name: "AMC-8300 Pro",
    category: "Clasificadora",
    categorySlug: "clasificadoras",
    tag: "Modelo Superior",
    tagVariant: "success" as const,
    speed: "1,200 bpm",
    detection: "Doble CIS RGB · 18ch MG",
    capacity: "500+400 billetes",
    warranty: "24 meses",
    isNew: true,
    brand: "AMC",
  },
] as const;

/** Servicios técnicos ofrecidos por AMC */
export const TECHNICAL_SERVICES = [
  {
    code: "S-01",
    icon: "Wrench",
    label: "Reparación Especializada",
    description: "Diagnóstico y reparación con repuestos originales. Restauramos la precisión y confianza de tu equipo de procesamiento de efectivo.",
  },
  {
    code: "S-02",
    icon: "Gauge",
    label: "Calibración de Precisión",
    description: "Ajuste bajo estándares de fábrica para recuperar la precisión original de sensores UV, MG e IR. Conteos sin error.",
  },
  {
    code: "S-03",
    icon: "Cpu",
    label: "Diagnóstico por Control",
    description: "Auditoría técnica completa de 30 puntos con reporte detallado. Control total del estado real de tu equipo antes de decidir.",
  },
  {
    code: "S-04",
    icon: "ShieldCheck",
    label: "Mantenimiento Preventivo",
    description: "Planes programados que reducen hasta 80% las fallas inesperadas. Seguridad operativa para tu negocio con visitas según tu volumen.",
  },
  {
    code: "S-05",
    icon: "Zap",
    label: "Actualización de Divisas",
    description: "Actualización de firmware para soporte de nuevas divisas y versiones de billetes. Tu equipo siempre al día.",
  },
  {
    code: "S-06",
    icon: "Clock",
    label: "Soporte Técnico",
    description: "Atención y asistencia técnica para resolver dudas operativas y mantener tu flujo de trabajo sin interrupciones.",
  },
] as const;

/** Beneficios institucionales de AMC — alineados con las 5 palabras clave */
export const BENEFITS = [
  {
    icon: "ShieldCheck",
    title: "Precisión en Cada Conteo",
    description:
      "Tecnología multi-sensorial que garantiza exactitud en cada transacción. Cada billete contado es un resultado confiable.",
    keyword: "Precisión",
  },
  {
    icon: "ScanLine",
    title: "Seguridad Multi-Sensor",
    description:
      "Detección de billetes falsos en múltiples niveles. Protege tu negocio contra el fraude antes de que ocurra.",
    keyword: "Seguridad",
  },
  {
    icon: "Truck",
    title: "Control y Cobertura",
    description:
      "Despacho a todo Perú con soporte técnico en Lima y provincias. Respuesta oportuna para que tu operación nunca se detenga.",
    keyword: "Control",
  },
  {
    icon: "Award",
    title: "Confianza y Respaldo",
    description:
      "Experiencia en mantenimiento, reparación y calibración de equipos de procesamiento de efectivo de distintas marcas.",
    keyword: "Confianza",
  },
] as const;

/** Sectores atendidos — sin logos de empresas específicas */
export const TRUSTED_COMPANIES = [
  { name: "Bancos y Finanzas", icon: "Building2" },
  { name: "Cajas Municipales", icon: "Building2" },
  { name: "Cooperativas", icon: "Store" },
  { name: "Retail y Comercio", icon: "Store" },
  { name: "Casinos y Juegos", icon: "Factory" },
  { name: "Sector Público", icon: "Building2" },
] as const;

/** Pasos del proceso de trabajo AMC */
export const WORK_PROCESS = [
  {
    number: "01",
    icon: "Headphones",
    title: "Consulta",
    description: "Nos contactas y analizamos tu operación: volumen de efectivo, divisas que manejas, entorno operativo y necesidades de precisión.",
  },
  {
    number: "02",
    icon: "FileText",
    title: "Propuesta de Valor",
    description: "Recibes una cotización detallada con el equipo ideal, especificaciones técnicas, garantía y el respaldo técnico incluido.",
  },
  {
    number: "03",
    icon: "Truck",
    title: "Implementación con Control",
    description: "Instalación profesional, capacitación de tu personal y configuración de seguridad. Control total desde el primer día.",
  },
  {
    number: "04",
    icon: "ShieldCheck",
    title: "Respaldo Continuo",
    description: "Garantía oficial, soporte técnico permanente y mantenimiento preventivo. Confianza que se extiende durante toda la vida del equipo.",
  },
] as const;

/** Testimonios — sectores atendidos (sin casos específicos) */
export const TESTIMONIALS = [
  {
    name: "Sector Financiero",
    position: "Bancos, cajas municipales y cooperativas",
    company: "",
    rating: 5,
    content:
      "Empresas del sector financiero confían en nuestros equipos para el procesamiento de efectivo con precisión, seguridad y control en cada operación.",
  },
  {
    name: "Comercio y Retail",
    position: "Cadenas, mayoristas y tiendas",
    company: "",
    rating: 5,
    content:
      "Negocios con alto flujo de efectivo utilizan nuestras contadoras y clasificadoras para reducir errores de caja y optimizar sus procesos de conteo.",
  },
  {
    name: "Instituciones Públicas",
    position: "Entidades gubernamentales y municipales",
    company: "",
    rating: 5,
    content:
      "Dependencias del sector público emplean nuestros equipos para garantizar transparencia, control y precisión en el manejo de efectivo institucional.",
  },
] as const;
