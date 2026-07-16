/**
 * Static fallback data for categories, products and brands.
 * Used when the database has no data (e.g. fresh Supabase instance).
 * Mirrors the seed data in prisma/seed.ts — 8 AMC products, 4 categories, 1 brand.
 */

export const STATIC_CATEGORIES = [
  {
    id: "cat-1",
    slug: "contadoras-billetes",
    name: "Contadoras de Billetes",
    description:
      "Contadoras de billetes profesionales AMC con detección UV, MG, IR, CIS y OCR. Velocidades de hasta 1.500 billetes/minuto y soporte para más de 60 divisas.",
    icon: "Banknote",
    order: 1,
    image: null,
    _count: { products: 2 },
  },
  {
    id: "cat-2",
    slug: "contadoras-monedas",
    name: "Contadoras de Monedas",
    description:
      "Contadoras de monedas automáticas AMC con pantalla LCD, teclado numérico y tolva de gran capacidad para conteo rápido y preciso.",
    icon: "Coins",
    order: 2,
    image: null,
    _count: { products: 2 },
  },
  {
    id: "cat-3",
    slug: "clasificadoras-billetes",
    name: "Clasificadoras de Billetes",
    description:
      "Clasificadoras de billetes AMC con Full Fitness, doble apilador, sensores CIS dual RGB, TMR y detección de aptitud de circulación.",
    icon: "Layers",
    order: 3,
    image: null,
    _count: { products: 3 },
  },
  {
    id: "cat-4",
    slug: "linea-esencial",
    name: "Línea Esencial",
    description:
      "Equipos AMC accesibles con detección IR, MG, RGB e IR-IMAGE. Solución práctica y eficiente para pequeños negocios y comercios.",
    icon: "Star",
    order: 4,
    image: null,
    _count: { products: 1 },
  },
];

export const STATIC_BRANDS = [
  {
    id: "brand-1",
    slug: "amc",
    name: "AMC",
    logo: null,
    description: "Fabricante líder de equipos de procesamiento de efectivo: contadoras, clasificadoras y detectoras de billetes y monedas.",
    website: "",
    order: 1,
    _count: { products: 8 },
  },
];

export const STATIC_PRODUCTS = [
  // ─── CONTADORAS DE MONEDAS ───
  {
    id: "prod-1",
    slug: "amc-cm3400",
    name: "AMC-CM3400",
    summary:
      "Contadora automática de monedas con pantalla LCD, teclado numérico y controles ajustables para conteo rápido y preciso.",
    sku: "AMC-CM3400",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    category: { slug: "contadoras-monedas", name: "Contadoras de Monedas" },
    brand: { slug: "amc", name: "AMC" },
    images: [{ url: "/uploads/products/amc-cm3400/img-01.webp", alt: "AMC-CM3400 Contadora de monedas" }],
  },
  {
    id: "prod-2",
    slug: "amc-cm3400-max",
    name: "AMC-CM3400 MAX",
    summary:
      "Contadora de monedas de alta capacidad con tolva de gran formato, ruedas integradas y panel de control profesional.",
    sku: "AMC-CM3400-MAX",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    category: { slug: "contadoras-monedas", name: "Contadoras de Monedas" },
    brand: { slug: "amc", name: "AMC" },
    images: [{ url: "/uploads/products/amc-cm3400-max/img-01.webp", alt: "AMC-CM3400 MAX Contadora de monedas" }],
  },
  // ─── LÍNEA ESENCIAL ───
  {
    id: "prod-3",
    slug: "amc-2000",
    name: "AMC-2000",
    summary:
      "Contadora de billetes compacta de la línea esencial con sensores IR, MG, RGB e IR-IMAGE para detección avanzada.",
    sku: "AMC-2000",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    category: { slug: "linea-esencial", name: "Línea Esencial" },
    brand: { slug: "amc", name: "AMC" },
    images: [{ url: "/uploads/products/amc-2000/img-01.webp", alt: "AMC-2000 Contadora de billetes" }],
  },
  // ─── CONTADORAS DE BILLETES ───
  {
    id: "prod-4",
    slug: "amc-3200",
    name: "AMC-3200 2CIS",
    summary:
      "Contadora de billetes multicurrency con doble sensor CIS, pantalla táctil TFT de 3.5\" y velocidad de hasta 1.500 billetes/min.",
    sku: "AMC-3200",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    category: { slug: "contadoras-billetes", name: "Contadoras de Billetes" },
    brand: { slug: "amc", name: "AMC" },
    images: [{ url: "/uploads/products/amc-3200/img-01.webp", alt: "AMC-3200 2CIS Contadora de billetes" }],
  },
  {
    id: "prod-5",
    slug: "amc-8100",
    name: "AMC-8100",
    summary:
      "Contadora vertical de billetes con pantalla full touch de 6.9\", 2 CIS, detección MG/UV/IR/MT y más de 60 divisas.",
    sku: "AMC-8100",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    category: { slug: "contadoras-billetes", name: "Contadoras de Billetes" },
    brand: { slug: "amc", name: "AMC" },
    images: [{ url: "/uploads/products/amc-8100/img-01.webp", alt: "AMC-8100 Contadora de billetes" }],
  },
  // ─── CLASIFICADORAS DE BILLETES ───
  {
    id: "prod-6",
    slug: "amc-8200",
    name: "AMC-8200",
    summary:
      "Clasificadora de billetes 1+1 bolsillo con pantalla full touch de 7.8\", sensor MT de 13 canales e impresora térmica integrada.",
    sku: "AMC-8200",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    category: { slug: "clasificadoras-billetes", name: "Clasificadoras de Billetes" },
    brand: { slug: "amc", name: "AMC" },
    images: [{ url: "/uploads/products/amc-8200/img-01.webp", alt: "AMC-8200 Clasificadora de billetes" }],
  },
  {
    id: "prod-7",
    slug: "amc-8300-pro",
    name: "AMC-8300 PRO",
    summary:
      "Clasificadora profesional con estructura antiestática, doble apilador, sensor de grosor de 19 canales y control dual táctil+físico.",
    sku: "AMC-8300-PRO",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    category: { slug: "clasificadoras-billetes", name: "Clasificadoras de Billetes" },
    brand: { slug: "amc", name: "AMC" },
    images: [{ url: "/uploads/products/amc-8300pro/img-01.webp", alt: "AMC-8300 PRO Clasificadora de billetes" }],
  },
  {
    id: "prod-8",
    slug: "amc-9200",
    name: "AMC-9200",
    summary:
      "Clasificadora Full Fitness 2+1 bolsillos con sensores CIS dual RGB, TMR de 18 canales, velocidad 1.000 billetes/min y 40 divisas.",
    sku: "AMC-9200",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    category: { slug: "clasificadoras-billetes", name: "Clasificadoras de Billetes" },
    brand: { slug: "amc", name: "AMC" },
    images: [{ url: "/uploads/products/amc-9200/img-01.webp", alt: "AMC-9200 Clasificadora de billetes" }],
  },
];