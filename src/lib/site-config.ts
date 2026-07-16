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
    keywords: ["precisión", "seguridad", "control", "confianza", "respaldo técnico", "contadoras de billetes", "contadoras de monedas", "servicio técnico AMC", "calibración contadoras", "clasificadoras de billetes"] as string[],
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
    { value: "+2,500", label: "Equipos atendidos" },
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
  { name: "AMC", description: "Fabricante líder en procesamiento de efectivo" },
] as const;

/** Categorías de productos AMC */
export const CATEGORIES = [
  {
    slug: "contadoras-billetes",
    icon: "Banknote",
    title: "Contadoras de Billetes",
    description: "Conteo ultrarrápido con detección de falsos multi-sensorial UV, MG, IR, CIS y OCR.",
    count: 2,
    featured: true,
  },
  {
    slug: "contadoras-monedas",
    icon: "Coins",
    title: "Contadoras de Monedas",
    description: "Conteo y clasificación de monedas por denominación con alta velocidad y precisión.",
    count: 2,
    featured: true,
  },
  {
    slug: "clasificadoras-billetes",
    icon: "ScanLine",
    title: "Clasificadoras de Billetes",
    description: "Clasificación profesional por denominación, cara, orientación, aptitud Full Fitness.",
    count: 3,
    featured: true,
  },
  {
    slug: "linea-esencial",
    icon: "Star",
    title: "Línea Esencial",
    description: "Equipos accesibles con detección IR, MG, RGB e IR-IMAGE para todo negocio.",
    count: 1,
    featured: false,
  },
] as const;

/** Productos destacados — modelos aprobados */
export const FEATURED_PRODUCTS = [
  {
    slug: "amc-3200",
    name: "AMC-3200 2CIS",
    category: "Contadora de Billetes",
    categorySlug: "contadoras-billetes",
    tag: "Doble CIS",
    tagVariant: "primary" as const,
    speed: "1,500 bpm",
    detection: "2CIS · IR · MG · UV · OCR",
    capacity: "300 billetes",
    warranty: "18 meses",
    isNew: false,
    brand: "AMC",
  },
  {
    slug: "amc-8100",
    name: "AMC-8100",
    category: "Contadora de Billetes",
    categorySlug: "contadoras-billetes",
    tag: "Full Touch",
    tagVariant: "primary" as const,
    speed: "1,200 bpm",
    detection: "2CIS · MG · UV · IR · MT",
    capacity: "500 billetes",
    warranty: "18 meses",
    isNew: true,
    brand: "AMC",
  },
  {
    slug: "amc-2000",
    name: "AMC-2000",
    category: "Línea Esencial",
    categorySlug: "linea-esencial",
    tag: "Esencial",
    tagVariant: "warning" as const,
    speed: "— ",
    detection: "IR · MG · RGB · IR-IMAGE",
    capacity: "— ",
    warranty: "12 meses",
    isNew: true,
    brand: "AMC",
  },
  {
    slug: "amc-8300-pro",
    name: "AMC-8300 PRO",
    category: "Clasificadora",
    categorySlug: "clasificadoras-billetes",
    tag: "Antiestática",
    tagVariant: "success" as const,
    speed: "1,200 bpm",
    detection: "CIS Dual · MT 18ch · Grosor 19ch",
    capacity: "500+400 billetes",
    warranty: "24 meses",
    isNew: false,
    brand: "AMC",
  },
  {
    slug: "amc-9200",
    name: "AMC-9200",
    category: "Clasificadora",
    categorySlug: "clasificadoras-billetes",
    tag: "Full Fitness",
    tagVariant: "warning" as const,
    speed: "1,000 bpm",
    detection: "CIS Dual RGB · TMR 18ch",
    capacity: "200+200+100 billetes",
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
    description: "Diagnóstico y reparación especializada con repuestos originales y compatibles según disponibilidad del modelo. Recuperamos la precisión y confiabilidad de tu equipo.",
  },
  {
    code: "S-02",
    icon: "Gauge",
    label: "Calibración de Precisión",
    description: "Ajuste y verificación técnica de sensores CIS, UV, MG, IR, MT/TMR y sensor de espesor para recuperar la precisión de detección, conteo y validación del equipo.",
  },
  {
    code: "S-03",
    icon: "Cpu",
    label: "Diagnóstico por Control",
    description: "Evaluación técnica completa del equipo con revisión de sensores, sistema de alimentación, conteo, detección y estado general antes de decidir una reparación.",
  },
  {
    code: "S-04",
    icon: "ShieldCheck",
    label: "Mantenimiento Preventivo",
    description: "Planes programados de mantenimiento preventivo para reducir fallas, mejorar la alimentación de billetes y mantener la continuidad operativa del negocio.",
  },
  {
    code: "S-05",
    icon: "Zap",
    label: "Actualización de Divisas",
    description: "Actualización de firmware y parámetros de detección para soporte de nuevas divisas, versiones de billetes y mejora en la validación del efectivo.",
  },
  {
    code: "S-06",
    icon: "Clock",
    label: "Soporte Técnico",
    description: "Asistencia técnica para resolver dudas operativas, fallas recurrentes, configuración del equipo y recomendaciones de uso para mantener el flujo de trabajo.",
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
