/**
 * Static fallback data for categories, products and brands.
 * Used when the database has no data (e.g. fresh Supabase instance).
 * Mirrors the seed data in prisma/seed.ts — 9 AMC products, 4 categories, 1 brand.
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
    _count: { products: 3 },
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
    _count: { products: 9 },
  },
];

export const STATIC_PRODUCTS = [
  // ─── CONTADORAS DE MONEDAS ───
  {
    id: "prod-1",
    slug: "amc-cm3400",
    name: "AMC-CM3400",
    summary:
      "Contadora profesional de monedas con conteo por cantidad y valor. Diseñada para ofrecer alta velocidad, precisión y confiabilidad en bancos, comercios y empresas que manejan grandes volúmenes de monedas.",
    sku: "AMC-CM3400",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    category: { slug: "contadoras-monedas", name: "Contadoras de Monedas" },
    brand: { slug: "amc", name: "AMC" },
    images: [
      { id: "img-1-1", url: "/uploads/products/amc-cm3400/img-01.webp?v=4", alt: "AMC-CM3400 vista frontal", isPrimary: true },
      { id: "img-1-2", url: "/uploads/products/amc-cm3400/img-02.webp", alt: "AMC-CM3400 vista lateral", isPrimary: false },
      { id: "img-1-3", url: "/uploads/products/amc-cm3400/img-03.webp", alt: "AMC-CM3400 vista superior", isPrimary: false },
      { id: "img-1-4", url: "/uploads/products/amc-cm3400/img-04.webp", alt: "AMC-CM3400 detalle pantalla", isPrimary: false },
      { id: "img-1-5", url: "/uploads/products/amc-cm3400/img-05.webp", alt: "AMC-CM3400 detalle tolva", isPrimary: false },
      { id: "img-1-6", url: "/uploads/products/amc-cm3400/img-06.webp", alt: "AMC-CM3400 vista completa", isPrimary: false },
    ],
    videos: [
      { id: "vid-amc-cm3400-1", url: "/uploads/products/amc-cm3400/video-01.mp4", provider: "local", title: "AMC CM3400 — video 1" },
      { id: "vid-amc-cm3400-2", url: "/uploads/products/amc-cm3400/video-02.mp4", provider: "local", title: "AMC CM3400 — video 2" },
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
      "Contadora profesional de monedas de alta capacidad con tolva de gran formato para operaciones continuas. Ideal para entidades financieras, transportadoras de valores y empresas con alto volumen de procesamiento.",
    sku: "AMC-CM3400-MAX",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    category: { slug: "contadoras-monedas", name: "Contadoras de Monedas" },
    brand: { slug: "amc", name: "AMC" },
    images: [
      { id: "img-2-1", url: "/uploads/products/amc-cm3400-max/img-01.webp?v=2", alt: "AMC-CM3400 MAX vista frontal", isPrimary: true },
      { id: "img-2-2", url: "/uploads/products/amc-cm3400-max/img-02.webp", alt: "AMC-CM3400 MAX vista lateral", isPrimary: false },
      { id: "img-2-3", url: "/uploads/products/amc-cm3400-max/img-03.webp", alt: "AMC-CM3400 MAX vista superior", isPrimary: false },
      { id: "img-2-4", url: "/uploads/products/amc-cm3400-max/img-04.webp", alt: "AMC-CM3400 MAX detalle", isPrimary: false },
      { id: "img-2-5", url: "/uploads/products/amc-cm3400-max/img-05.webp", alt: "AMC-CM3400 MAX ruedas", isPrimary: false },
    ],
    videos: [
      { id: "vid-amc-cm3400-max-1", url: "/uploads/products/amc-cm3400-max/video-01.mp4", provider: "local", title: "AMC CM3400 MAX — video 1" },
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
      "Contadora profesional de billetes de un bolsillo, con velocidad de hasta 1,200 billetes por minuto, capacidad de 300 billetes en la tolva (Hopper) y 200 billetes en la bandeja de recepción (Stacker). Equipada con doble sensor CIS, sistemas de autenticación UV, MT, MG e IR, escaneo de números de serie (OCR) y compatibilidad con 14 divisas, ofreciendo un conteo rápido, preciso y confiable para el procesamiento diario de efectivo.",
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
      { id: "img-3-3", url: "/uploads/products/amc-2000/img-03.webp", alt: "AMC-2000 detalle", isPrimary: false },
      { id: "img-3-4", url: "/uploads/products/amc-2000/img-04.webp", alt: "AMC-2000 vista completa", isPrimary: false },
    ],
    videos: [],
    documents: [
      { id: "doc-amc-2000", url: "/uploads/products/amc-2000/brochure_amc-2000_ir-image_mismo_formato.pdf", type: "ficha", title: "Brochure AMC 2000", size: null },
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
      "Contadora profesional de billetes de un bolsillo, con velocidad de hasta 1,500 billetes por minuto, capacidad para 300 billetes en la tolva (Hopper) y 200 billetes en la bandeja de recepción (Stacker). Equipada con doble sensor CIS, tecnologías de autenticación IR, MT, MG y UV, escaneo de números de serie (OCR), pantalla táctil TFT de 3.5 pulgadas y compatibilidad con hasta 60 divisas, ofreciendo un conteo rápido, preciso y confiable.",
    sku: "AMC-3200",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    category: { slug: "contadoras-billetes", name: "Contadoras de Billetes" },
    brand: { slug: "amc", name: "AMC" },
    images: [
      { id: "img-4-1", url: "/uploads/products/amc-3200/img-01.webp?v=2", alt: "AMC-3200 2CIS vista frontal", isPrimary: true },
      { id: "img-4-2", url: "/uploads/products/amc-3200/img-02.webp", alt: "AMC-3200 2CIS vista lateral", isPrimary: false },
      { id: "img-4-3", url: "/uploads/products/amc-3200/img-03.webp", alt: "AMC-3200 2CIS detalle pantalla", isPrimary: false },
      { id: "img-4-4", url: "/uploads/products/amc-3200/img-04.webp", alt: "AMC-3200 2CIS vista completa", isPrimary: false },
    ],
    videos: [],
    documents: [
      { id: "doc-amc-3200", url: "/uploads/products/amc-3200/brochure_amc-3200_final_web.pdf", type: "ficha", title: "Brochure AMC 3200", size: null },
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
      "Contadora profesional de billetes de un bolsillo, con velocidad de hasta 1,200 billetes por minuto, pantalla táctil Full Touch de 6.9 pulgadas, doble sensor CIS, detección MG, MT, UV, IR y reconocimiento de números de serie (OCR). Equipada con tolva para 500 billetes, bandeja de recepción para 200 billetes, compatibilidad con más de 60 divisas y conectividad USB, LAN, RS232, Type-C, impresora y pantalla externa, ofreciendo un conteo rápido, preciso y confiable.",
    sku: "AMC-8100",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    category: { slug: "contadoras-billetes", name: "Contadoras de Billetes" },
    brand: { slug: "amc", name: "AMC" },
    images: [
      { id: "img-5-1", url: "/uploads/products/amc-8100/img-01.webp?v=2", alt: "AMC-8100 vista frontal", isPrimary: true },
      { id: "img-5-2", url: "/uploads/products/amc-8100/img-02.webp", alt: "AMC-8100 vista lateral", isPrimary: false },
      { id: "img-5-3", url: "/uploads/products/amc-8100/img-03.webp", alt: "AMC-8100 detalle pantalla", isPrimary: false },
      { id: "img-5-4", url: "/uploads/products/amc-8100/img-04.webp", alt: "AMC-8100 vista completa", isPrimary: false },
    ],
    videos: [],
    documents: [
      { id: "doc-amc-8100", url: "/uploads/products/amc-8100/brochure_amc-8100.pdf", type: "ficha", title: "Brochure AMC 8100", size: null },
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
      "Contadora profesional de billetes de un bolsillo más bandeja de rechazo, con velocidad de hasta 1,200 billetes por minuto, tolva para 500 billetes, apilador para 200 billetes y bandeja de rechazo para 100 billetes. Equipada con doble sensor CIS, detección MG e IR, pantalla táctil de 7.8 pulgadas y conectividad USB, LAN y RS232, ofrece un conteo rápido, continuo y confiable.",
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
      { id: "doc-amc-8200", url: "/uploads/products/amc-8200/brochure_amc-8200.pdf", type: "ficha", title: "Brochure AMC 8200", size: null },
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
      "Clasificadora profesional de billetes de dos bolsillos más bandeja de rechazo, con velocidad de hasta 1,000 billetes por minuto, tolva para 500 billetes, dos bandejas de recepción de 200 billetes cada una y bandeja de rechazo para 100 billetes. Equipada con doble sensor CIS, tecnologías de autenticación MG, MT, IR, UV, sensor TMR y detección de espesor, pantalla táctil TFT de 4.3 pulgadas, compatibilidad con hasta 40 divisas y conectividad LAN, USB, RS232, tarjeta SD e impresora, ofreciendo máxima productividad, precisión y seguridad en el procesamiento de efectivo.",
    sku: "AMC-9200",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    category: { slug: "clasificadoras-billetes", name: "Clasificadoras de Billetes" },
    brand: { slug: "amc", name: "AMC" },
    images: [
      { id: "img-8-1", url: "/uploads/products/amc-9200/img-01.webp?v=3", alt: "AMC-9200 vista frontal", isPrimary: true },
    ],
    videos: [],
    documents: [
      { id: "doc-amc-9200", url: "/uploads/products/amc-9200/brochure_amc-9200.pdf", type: "ficha", title: "Brochure AMC 9200", size: null },
    ],
    features: [],
    specifications: [],
    applications: [],
  },
  {
    id: "prod-9",
    slug: "amc-9100",
    name: "AMC-9100",
    summary:
      "Contadora profesional de billetes de un bolsillo con bandeja de rechazo, equipada con doble sensor CIS de 201 mm y 200 dpi, 18 sensores TMR de línea completa, IR dual, imagen UV, 12 sensores de espesor, reconocimiento OCR de números de serie, clasificación por estado (Fitness) y compatibilidad con hasta 20 divisas. Con velocidad de hasta 1,000 billetes por minuto, ofrece máxima precisión y seguridad para el procesamiento profesional de efectivo.",
    sku: "AMC-9100",
    price: null,
    currency: "PEN",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    category: { slug: "contadoras-billetes", name: "Contadoras de Billetes" },
    brand: { slug: "amc", name: "AMC" },
    images: [
      { id: "img-9-1", url: "/uploads/products/amc-9100/img-01.webp", alt: "AMC-9100 vista frontal", isPrimary: true },
      { id: "img-9-2", url: "/uploads/products/amc-9100/img-02.webp", alt: "AMC-9100 vista lateral", isPrimary: false },
    ],
    videos: [
      { id: "vid-9-1", url: "/uploads/products/amc-9100/video-01.mp4", provider: "local", title: "AMC-9100 en operación" },
    ],
    documents: [
      { id: "doc-9-1", url: "/uploads/products/amc-9100/brochure.pdf", type: "ficha", title: "Ficha técnica AMC-9100", size: null },
    ],
    features: [],
    specifications: [],
    applications: [],
  },
];