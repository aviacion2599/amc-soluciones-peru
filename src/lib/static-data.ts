/**
 * Static fallback data for categories, products and brands.
 * Used when the database has no data (e.g. fresh Supabase instance).
 * Mirrors the seed data in prisma/seed.ts — 8 AMC products, 4 categories, 1 brand.
 * All images, videos and documents point directly to /uploads/products/{slug}/.
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
    images: [
      { id: "img-1-1", url: "/uploads/products/amc-cm3400/img-01.webp", alt: "AMC-CM3400 vista frontal", isPrimary: true },
      { id: "img-1-2", url: "/uploads/products/amc-cm3400/img-02.webp", alt: "AMC-CM3400 vista lateral", isPrimary: false },
      { id: "img-1-3", url: "/uploads/products/amc-cm3400/img-03.webp", alt: "AMC-CM3400 vista superior", isPrimary: false },
      { id: "img-1-4", url: "/uploads/products/amc-cm3400/img-04.webp", alt: "AMC-CM3400 detalle pantalla", isPrimary: false },
      { id: "img-1-5", url: "/uploads/products/amc-cm3400/img-05.webp", alt: "AMC-CM3400 detalle tolva", isPrimary: false },
      { id: "img-1-6", url: "/uploads/products/amc-cm3400/img-06.webp", alt: "AMC-CM3400 vista completa", isPrimary: false },
    ],
    videos: [
      { id: "vid-1-1", url: "/uploads/products/amc-cm3400/198e63d2-9c49-44df-b905-bcd2d1fe8e58.mp4", provider: "local", title: "AMC-CM3400 en operación" },
      { id: "vid-1-2", url: "/uploads/products/amc-cm3400/42c9a359-8eb2-44f0-99a5-5dc118017ca7.mp4", provider: "local", title: "AMC-CM3400 demostración" },
    ],
    documents: [],
    features: [],
    specifications: [],
    applications: [],
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
    images: [
      { id: "img-2-1", url: "/uploads/products/amc-cm3400-max/img-01.webp", alt: "AMC-CM3400 MAX vista frontal", isPrimary: true },
      { id: "img-2-2", url: "/uploads/products/amc-cm3400-max/img-02.webp", alt: "AMC-CM3400 MAX vista lateral", isPrimary: false },
      { id: "img-2-3", url: "/uploads/products/amc-cm3400-max/img-03.webp", alt: "AMC-CM3400 MAX vista superior", isPrimary: false },
      { id: "img-2-4", url: "/uploads/products/amc-cm3400-max/img-04.webp", alt: "AMC-CM3400 MAX detalle", isPrimary: false },
      { id: "img-2-5", url: "/uploads/products/amc-cm3400-max/img-05.webp", alt: "AMC-CM3400 MAX ruedas", isPrimary: false },
    ],
    videos: [
      { id: "vid-2-1", url: "/uploads/products/amc-cm3400-max/84000fb9-ec42-4087-b987-25894a5a3a1d.mp4", provider: "local", title: "AMC-CM3400 MAX en operación" },
    ],
    documents: [],
    features: [],
    specifications: [],
    applications: [],
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
    images: [
      { id: "img-3-1", url: "/uploads/products/amc-2000/img-01.webp", alt: "AMC-2000 vista frontal", isPrimary: true },
      { id: "img-3-2", url: "/uploads/products/amc-2000/img-02.webp", alt: "AMC-2000 vista lateral", isPrimary: false },
      { id: "img-3-3", url: "/uploads/products/amc-2000/img-03.webp", alt: "AMC-2000 detalle pantalla", isPrimary: false },
    ],
    videos: [],
    documents: [
      { id: "doc-3-1", url: "/uploads/products/amc-2000/brochure_amc-2000_ir-image_mismo_formato.pdf", type: "ficha", title: "Brochure AMC-2000 IR-IMAGE", size: null },
    ],
    features: [],
    specifications: [],
    applications: [],
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
    images: [
      { id: "img-4-1", url: "/uploads/products/amc-3200/img-01.webp", alt: "AMC-3200 2CIS vista frontal", isPrimary: true },
      { id: "img-4-2", url: "/uploads/products/amc-3200/img-02.webp", alt: "AMC-3200 2CIS vista lateral", isPrimary: false },
      { id: "img-4-3", url: "/uploads/products/amc-3200/img-03.webp", alt: "AMC-3200 2CIS detalle pantalla", isPrimary: false },
      { id: "img-4-4", url: "/uploads/products/amc-3200/img-04.webp", alt: "AMC-3200 2CIS vista completa", isPrimary: false },
    ],
    videos: [],
    documents: [
      { id: "doc-4-1", url: "/uploads/products/amc-3200/brochure_amc-3200_final_web.pdf", type: "ficha", title: "Brochure AMC-3200", size: null },
      { id: "doc-4-2", url: "/uploads/products/amc-3200/brochure_amc-3200_final_web(1).pdf", type: "ficha", title: "Brochure AMC-3200 (alt)", size: null },
    ],
    features: [],
    specifications: [],
    applications: [],
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
    images: [
      { id: "img-5-1", url: "/uploads/products/amc-8100/img-01.webp", alt: "AMC-8100 vista frontal", isPrimary: true },
      { id: "img-5-2", url: "/uploads/products/amc-8100/img-02.webp", alt: "AMC-8100 vista lateral", isPrimary: false },
      { id: "img-5-3", url: "/uploads/products/amc-8100/img-03.webp", alt: "AMC-8100 detalle pantalla", isPrimary: false },
      { id: "img-5-4", url: "/uploads/products/amc-8100/img-04.webp", alt: "AMC-8100 vista completa", isPrimary: false },
    ],
    videos: [],
    documents: [
      { id: "doc-5-1", url: "/uploads/products/amc-8100/brochure_amc-8100.pdf", type: "ficha", title: "Brochure AMC-8100", size: null },
    ],
    features: [],
    specifications: [],
    applications: [],
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
    images: [
      { id: "img-6-1", url: "/uploads/products/amc-8200/img-01.webp", alt: "AMC-8200 vista frontal", isPrimary: true },
      { id: "img-6-2", url: "/uploads/products/amc-8200/img-02.webp", alt: "AMC-8200 vista lateral", isPrimary: false },
      { id: "img-6-3", url: "/uploads/products/amc-8200/img-03.webp", alt: "AMC-8200 detalle pantalla", isPrimary: false },
      { id: "img-6-4", url: "/uploads/products/amc-8200/img-04.webp", alt: "AMC-8200 vista completa", isPrimary: false },
    ],
    videos: [],
    documents: [
      { id: "doc-6-1", url: "/uploads/products/amc-8200/brochure_amc-8200.pdf", type: "ficha", title: "Brochure AMC-8200", size: null },
    ],
    features: [],
    specifications: [],
    applications: [],
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
    images: [
      { id: "img-7-1", url: "/uploads/products/amc-8300pro/img-01.webp", alt: "AMC-8300 PRO vista frontal", isPrimary: true },
      { id: "img-7-2", url: "/uploads/products/amc-8300pro/img-02.webp", alt: "AMC-8300 PRO vista lateral", isPrimary: false },
      { id: "img-7-3", url: "/uploads/products/amc-8300pro/img-03.webp", alt: "AMC-8300 PRO detalle", isPrimary: false },
      { id: "img-7-4", url: "/uploads/products/amc-8300pro/img-04.webp", alt: "AMC-8300 PRO vista completa", isPrimary: false },
    ],
    videos: [],
    documents: [
      { id: "doc-7-1", url: "/uploads/products/amc-8300pro/brochure_amc-8300_pro_espanol_billete_peruano.pdf", type: "ficha", title: "Brochure AMC-8300 PRO", size: null },
    ],
    features: [],
    specifications: [],
    applications: [],
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
    images: [
      { id: "img-8-1", url: "/uploads/products/amc-9200/img-01.webp", alt: "AMC-9200 vista frontal", isPrimary: true },
      { id: "img-8-2", url: "/uploads/products/amc-9200/img-02.webp", alt: "AMC-9200 vista lateral", isPrimary: false },
      { id: "img-8-3", url: "/uploads/products/amc-9200/img-03.webp", alt: "AMC-9200 detalle pantalla", isPrimary: false },
      { id: "img-8-4", url: "/uploads/products/amc-9200/img-04.webp", alt: "AMC-9200 vista completa", isPrimary: false },
    ],
    videos: [],
    documents: [
      { id: "doc-8-1", url: "/uploads/products/amc-9200/brochure_amc-9200.pdf", type: "ficha", title: "Brochure AMC-9200", size: null },
    ],
    features: [],
    specifications: [],
    applications: [],
  },
];