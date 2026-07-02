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
    tagline: "Precisión que protege tu operación — Respaldo que mantiene tu negocio en movimiento",
    valueProp: "Control total sobre tu efectivo con precisión industrial y respaldo técnico certificado",
    description:
      "Especialistas en venta, servicio técnico y calibración de contadoras de billetes, monedas, clasificadoras y detectores. Precisión certificada, seguridad multi-sensorial y respaldo técnico GLORY en todo Perú.",
    ruc: "20512345678", // Placeholder — confirmar con cliente
    domain: "https://amcsolucionesperu.com",
    locale: "es-PE",
    country: "Perú",
    keywords: ["precisión", "seguridad", "control", "confianza", "respaldo técnico", "contadoras de billetes", "servicio técnico GLORY", "calibración contadoras", "detección de falsos", "manejo de efectivo"],
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

/** Marcas que AMC representa */
export const BRANDS = [
  { name: "GLORY", description: "Líder mundial en manejo de efectivo — Japan" },
  { name: "CashScan", description: "Detección y conteo profesional — USA" },
  { name: "Hyundai", description: "Tecnología de conteo — Korea" },
  { name: "Henry", description: "Equipos de detección — UK" },
  { name: "Royal Sovereign", description: "Clasificadoras internacionales — USA" },
  { name: "Cassida", description: "Detección de falsificaciones — USA" },
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
    label: "Reparación Especializada",
    description: "Diagnóstico preciso y reparación con repuestos 100% originales con trazabilidad del fabricante. Respaldo técnico que devuelve la confianza a tu equipo.",
  },
  {
    code: "S-02",
    icon: "Gauge",
    label: "Calibración de Precisión",
    description: "Ajuste certificado bajo estándares de fábrica. Recupera la precisión original de tus sensores UV, MG e IR para conteos sin error.",
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
    icon: "Award",
    label: "Garantía de Confianza",
    description: "Soporte de garantía oficial del fabricante. Gestionamos directamente con GLORY y marcas representadas para darte tranquilidad total.",
  },
  {
    code: "S-06",
    icon: "Zap",
    label: "Soporte Express 24h",
    description: "Respuesta técnica en menos de 24 horas hábiles en Lima. Control de urgencias para operaciones críticas que no pueden esperar.",
  },
] as const;

/** Beneficios institucionales de AMC — alineados con las 5 palabras clave */
export const BENEFITS = [
  {
    icon: "ShieldCheck",
    title: "Precisión Certificada",
    description:
      "Tecnología multi-sensorial UV, MG e IR con 99.8% de exactitud. Cada conteo es una transacción protegida contra errores y falsificaciones.",
    keyword: "Precisión",
  },
  {
    icon: "ScanLine",
    title: "Seguridad Multi-Capa",
    description:
      "Detección de billetes falsos en 3 niveles: ultravioleta, magnético e infrarrojo. Protege tu negocio contra el fraude antes de que ocurra.",
    keyword: "Seguridad",
  },
  {
    icon: "Truck",
    title: "Control y Cobertura Nacional",
    description:
      "Despacho a todo Perú con soporte técnico en Lima y provincias. Responde en menos de 24h para que tu operación nunca se detenga.",
    keyword: "Control",
  },
  {
    icon: "Award",
    title: "Confianza y Respaldo Técnico",
    description:
      "Técnicos certificados por GLORY, repuestos originales con trazabilidad y garantía oficial del fabricante. No solo vendemos, acompañamos.",
    keyword: "Confianza",
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

/** Testimonios de clientes */
export const TESTIMONIALS = [
  {
    name: "Carlos Mendoza",
    position: "Gerente de Operaciones",
    company: "Cadena de Farmacias Inkafarma",
    rating: 5,
    content:
      "La precisión de las contadoras AMC y la rapidez del servicio técnico nos permitieron reducir significativamente las diferencias de caja en nuestras agencias. El respaldo técnico que recibimos marca la diferencia.",
  },
  {
    name: "Rosa Quispe",
    position: "Jefa de Tesorería",
    company: "Municipalidad de Surco",
    rating: 5,
    content:
      "El equipo de AMC no solo nos vendió las máquinas, nos acompañó en la implementación y capacitación del personal. La seguridad y confianza que transmiten es exactamente lo que necesitábamos para el manejo de efectivo municipal.",
  },
  {
    name: "Jorge Velásquez",
    position: "CFO",
    company: "Grupo Retail Peruano",
    rating: 5,
    content:
      "Migrar desde otro proveedor a AMC fue la mejor decisión. La calibración periódica, los repuestos originales y el control que tenemos sobre nuestra operación de efectivo ahora es total. Recomiendo su respaldo técnico.",
  },
] as const;
