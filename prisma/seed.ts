import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * AMC Soluciones Perú — Seed v2
 * Catálogo AMC exclusivo: 8 productos reales.
 * Orden: CM3400, 2000, 3200, 8100, 8200, 8300PRO, 9200, CM3400 Max
 */

const categories = [
  {
    slug: "contadoras-billetes",
    name: "Contadoras de Billetes",
    description: "Contadoras de billetes profesionales AMC con tecnologías de detección UV, MG, IR, MT, CIS y OCR. Velocidades de hasta 1,500 billetes por minuto y soporte para múltiples divisas.",
    icon: "Banknote",
    order: 1,
    seoTitle: "Contadoras de Billetes AMC | AMC Soluciones Perú",
    seoDescription: "Contadoras de billetes AMC con detección UV, MG, IR, CIS y OCR. Venta y servicio técnico en Perú.",
    seoKeywords: "contadoras de billetes AMC, contadora billetes Perú, AMC-3200, AMC-8100, AMC-2000",
  },
  {
    slug: "contadoras-monedas",
    name: "Contadoras de Monedas",
    description: "Contadoras de monedas de alta velocidad para procesamiento eficiente de monedas peruanas y extranjeras. Ideales para bancos, supermercados, casinos y centros de cambio.",
    icon: "Coins",
    order: 2,
    seoTitle: "Contadoras de Monedas AMC | AMC Soluciones Perú",
    seoDescription: "Contadoras de monedas AMC profesionales. Conteo rápido y clasificación por denominación. Servicio técnico en Lima y provincias.",
    seoKeywords: "contadoras de monedas AMC, contadora monedas Perú, AMC-CM3400",
  },
  {
    slug: "clasificadoras-billetes",
    name: "Clasificadoras de Billetes",
    description: "Clasificadoras de billetes AMC con sensores CIS, MT, TMR de hasta 18 canales. Clasificación por denominación, aptitud, cara, orientación y estado de circulación.",
    icon: "Layers",
    order: 3,
    seoTitle: "Clasificadoras de Billetes AMC | AMC Soluciones Perú",
    seoDescription: "Clasificadoras de billetes AMC con Full Fitness. Detección avanzada, doble apilador, impresora térmica integrada.",
    seoKeywords: "clasificadora billetes AMC, AMC-8200, AMC-9200, clasificar billetes Perú",
  },
  {
    slug: "linea-esencial",
    name: "Línea Esencial",
    description: "Equipos AMC accesibles con doble CIS y tecnologías de detección IR, MG, RGB e IR-IMAGE. Una solución práctica y eficiente para pequeños negocios y comercios.",
    icon: "Star",
    order: 4,
    seoTitle: "Línea Esencial AMC | AMC Soluciones Perú",
    seoDescription: "Línea esencial AMC: contadoras de billetes accesibles con detección IR, MG, RGB e IR-IMAGE.",
    seoKeywords: "línea esencial AMC, AMC-2000, contadora económica, contadora billetes accesible",
  },
];

const brands = [
  { slug: "amc", name: "AMC" },
];

const products = [
  // ═══════════════════════════════════════════════════════════
  // 1. AMC-CM3400 — Contadora de Monedas
  // ═══════════════════════════════════════════════════════════
  {
    name: "AMC-CM3400",
    slug: "amc-cm3400",
    sku: "AMC-CM3400",
    summary: "Contadora profesional de monedas con conteo por cantidad y valor. Diseñada para ofrecer alta velocidad, precisión y confiabilidad en bancos, comercios y empresas que manejan grandes volúmenes de monedas.",
    description: "La contadora de monedas AMC-CM3400 ofrece conteo ininterrumpido de alto volumen, clasificando automáticamente por denominación. Con funciones de acumulación, lotes programables y un diseño resistente, optimiza el manejo de efectivo en cajas de supermercados, bancos y retail, minimizando errores y ahorrando tiempo valioso.",
    categorySlug: "contadoras-monedas",
    brandSlug: "amc",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    order: 1,
    images: [
      { url: "/uploads/products/amc-cm3400/img-02.webp", alt: "AMC-CM3400 - vista en perspectiva", isPrimary: true, order: 0 },
      { url: "/uploads/products/amc-cm3400/img-01.webp", alt: "AMC-CM3400 contadora de monedas - vista superior", isPrimary: false, order: 1 },
      { url: "/uploads/products/amc-cm3400/img-03.webp", alt: "AMC-CM3400 - detalle pantalla", isPrimary: false, order: 2 },
      { url: "/uploads/products/amc-cm3400/img-04.webp", alt: "AMC-CM3400 - detalle controles", isPrimary: false, order: 3 },
      { url: "/uploads/products/amc-cm3400/img-05.webp", alt: "AMC-CM3400 - tolva de alimentación", isPrimary: false, order: 4 },
      { url: "/uploads/products/amc-cm3400/img-06.webp", alt: "AMC-CM3400 - vista superior", isPrimary: false, order: 5 },
    ],
    videos: [
      { url: "/uploads/products/amc-cm3400/video-01.mp4", title: "AMC-CM3400 en operación", order: 0 },
    ],
    documents: [
      { url: "/uploads/products/amc-cm3400/brochure.pdf", type: "ficha", title: "Ficha técnica AMC-CM3400", order: 0 },
    ],
    features: [
      { title: "Conteo automático", description: "Conteo por tamaño, peso y diámetro de monedas", icon: "Zap", order: 0 },
      { title: "Pantalla LCD", description: "Visualización de resultados en tiempo real", icon: "Monitor", order: 1 },
      { title: "Teclado numérico", description: "Controles manuales ajustables de velocidad y sensibilidad", icon: "Keyboard", order: 2 },
      { title: "Alta capacidad", description: "Tolva de alimentación de gran capacidad para grandes volúmenes", icon: "Layers", order: 3 },
      { title: "Diseño compacto", description: "Ideal para mostradores y espacios reducidos", icon: "Maximize2", order: 4 },
      { title: "Salida por compartimento", description: "Sistema de salida ordenada de monedas", icon: "ArrowDownToLine", order: 5 },
    ],
    specifications: [
      { group: "General", key: "Tipo", value: "Contadora de monedas", order: 0 },
      { group: "General", key: "Marca", value: "AMC", order: 1 },
      { group: "General", key: "Pantalla", value: "LCD digital", order: 2 },
      { group: "General", key: "Controles", value: "Teclado numérico + diales de ajuste", order: 3 },
      { group: "General", key: "Alimentación", value: "110-240V AC, 50/60 Hz", order: 4 },
    ],
    applications: [
      { name: "Bancos", description: "Procesamiento de monedas en ventanillas y cajas", order: 0 },
      { name: "Supermercados", description: "Cierre de caja y conteo de monedas", order: 1 },
      { name: "Centros de cambio", description: "Clasificación y conteo de monedas extranjeras", order: 2 },
      { name: "Peajes", description: "Conteo rápido de monedas de peaje", order: 3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 2. AMC-2000 — Línea Esencial
  // ═══════════════════════════════════════════════════════════
  {
    name: "AMC-2000",
    slug: "amc-2000",
    sku: "AMC-2000",
    summary: "Contadora de billetes compacta de la línea esencial con sensores IR, MG, RGB e IR-IMAGE para detección avanzada.",
    description: `La AMC-2000 es una contadora de billetes multicurrency de denominación mixta perteneciente a la Línea Esencial de AMC. Diseñada para ofrecer un conteo confiable y verificación de autenticidad a un costo accesible, cuenta con tecnología de sensores IR, MG, RGB e IR-IMAGE. Detecta automáticamente medios billetes, billetes dobles y billetes encadenados. Su pantalla TFT de fácil lectura y la posibilidad de conectar un visor externo la hacen ideal para pequeños negocios y comercios que necesitan una solución práctica y eficiente para el manejo de efectivo.`,
    categorySlug: "linea-esencial",
    brandSlug: "amc",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    order: 2,
    images: [
      { url: "/uploads/products/amc-2000/img-01.webp", alt: "AMC-2000 contadora de billetes - vista frontal", isPrimary: true, order: 0 },
      { url: "/uploads/products/amc-2000/img-02.webp", alt: "AMC-2000 - vista lateral", isPrimary: false, order: 1 },
      { url: "/uploads/products/amc-2000/img-03.webp", alt: "AMC-2000 - detalle sensores", isPrimary: false, order: 2 },
    ],
    documents: [
      { url: "/uploads/products/amc-2000/brochure_amc-2000_ir-image_mismo_formato.pdf", type: "ficha", title: "Ficha técnica AMC-2000", order: 0 },
    ],
    features: [
      { title: "Multicurrency", description: "Conteo con denominaciones mixtas de múltiples divisas", icon: "Globe", order: 0 },
      { title: "Sensores IR, MG, RGB, IR-IMAGE", description: "Detección avanzada de falsificaciones con 4 tecnologías", icon: "ShieldCheck", order: 1 },
      { title: "Detección de errores", description: "Medio billete, billete doble y encadenado", icon: "AlertTriangle", order: 2 },
      { title: "Pantalla TFT", description: "Lectura clara y fácil de usar", icon: "Monitor", order: 3 },
      { title: "Conteo por lotes", description: "Acumulación de resultados y conteo por lotes", icon: "ListOrdered", order: 4 },
      { title: "Visor externo", description: "Posibilidad de conectar pantalla externa", icon: "ExternalLink", order: 5 },
    ],
    specifications: [
      { group: "General", key: "Tipo", value: "Contadora de billetes multicurrency", order: 0 },
      { group: "General", key: "Línea", value: "Línea Esencial", order: 1 },
      { group: "General", key: "Sensores", value: "IR, MG, RGB, IR-IMAGE", order: 2 },
      { group: "General", key: "Detección", value: "Medio billete, billete doble, encadenado", order: 3 },
      { group: "General", key: "Pantalla", value: "TFT", order: 4 },
      { group: "General", key: "Modo", value: "Automático / Manual", order: 5 },
      { group: "General", key: "Funciones", value: "Conteo por lotes, acumulación", order: 6 },
      { group: "Dimensional", key: "Dimensiones", value: "246 × 260 × 245 mm", order: 0 },
      { group: "Dimensional", key: "Peso neto", value: "5 kg", order: 1 },
      { group: "Dimensional", key: "Peso bruto", value: "12 kg", order: 2 },
      { group: "Dimensional", key: "Emb. dimensions", value: "585 × 340 × 305 mm", order: 3 },
    ],
    applications: [
      { name: "Pequeños negocios", description: "Solución accesible para comercios", order: 0 },
      { name: "Oficinas", description: "Verificación de efectivo en oficinas contables", order: 1 },
      { name: "Retail", description: "Cierre de caja en tiendas y minimarkets", order: 2 },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 3. AMC-3200 — Contadora de Billetes 2CIS
  // ═══════════════════════════════════════════════════════════
  {
    name: "AMC-3200 2CIS",
    slug: "amc-3200",
    sku: "AMC-3200",
    summary: "Contadora de billetes multicurrency con doble sensor CIS, pantalla táctil TFT de 3.5\" y velocidad de hasta 1500 billetes/min.",
    description: `La AMC-3200 2CIS es una contadora de billetes profesional capaz de contar y autenticar billetes de hasta 60 divisas diferentes con denominaciones mixtas. Equipada con un doble sensor de imagen (2CIS), sensores IR, MT, MG y UV, ofrece una detección de falsificaciones de alto nivel. Su sistema OCR permite el reconocimiento de números de serie en ambos lados del billete. La pantalla táctil TFT a color de 3.5 pulgadas garantiza una experiencia de usuario intuitiva, mientras que sus conexiones SD, USB y RJ11 permiten imprimir resultados, actualizar software y conectar a PC.`,
    categorySlug: "contadoras-billetes",
    brandSlug: "amc",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    order: 3,
    images: [
      { url: "/uploads/products/amc-3200/img-01.webp", alt: "AMC-3200 2CIS - vista frontal", isPrimary: true, order: 0 },
      { url: "/uploads/products/amc-3200/img-02.webp", alt: "AMC-3200 - vista lateral", isPrimary: false, order: 1 },
      { url: "/uploads/products/amc-3200/img-03.webp", alt: "AMC-3200 - detalle pantalla táctil", isPrimary: false, order: 2 },
      { url: "/uploads/products/amc-3200/img-04.webp", alt: "AMC-3200 - vista superior", isPrimary: false, order: 3 },
    ],
    videos: [
      { url: "/uploads/products/amc-3200/video-01.mp4", title: "AMC-3200 en operación", order: 0 },
    ],
    documents: [
      { url: "/uploads/products/amc-3200/brochure_amc-3200_final_web.pdf", type: "ficha", title: "Ficha técnica AMC-3200", order: 0 },
      { url: "/uploads/products/amc-3200/brochure_amc-3200_final_web(1).pdf", type: "ficha", title: "Brochure AMC-3200", order: 1 },
    ],
    features: [
      { title: "Doble sensor CIS (2CIS)", description: "Detección avanzada de falsificaciones con doble escaneo", icon: "ScanEye", order: 0 },
      { title: "Reconocimiento OCR", description: "Lectura de números de serie en ambos lados del billete", icon: "FileText", order: 1 },
      { title: "Pantalla táctil 3.5\"", description: "TFT a color HD, interfaz intuitiva", icon: "Monitor", order: 2 },
      { title: "1500 billetes/min", description: "Velocidad máxima de conteo ajustable", icon: "Zap", order: 3 },
      { title: "60 divisas", description: "Soporte para hasta 60 monedas con denominaciones mixtas", icon: "Globe", order: 4 },
      { title: "Conectividad", description: "SD, USB, RJ11 para impresora y PC", icon: "Cable", order: 5 },
    ],
    specifications: [
      { group: "General", key: "Tipo", value: "Contadora de billetes multicurrency", order: 0 },
      { group: "General", key: "Modelo", value: "AMC-3200 2CIS", order: 1 },
      { group: "Técnico", key: "Sensores", value: "2CIS, IR, MT, MG, UV", order: 0 },
      { group: "Técnico", key: "OCR", value: "Sí, números de serie (ambos lados)", order: 1 },
      { group: "Técnico", key: "Divisas", value: "Hasta 60 monedas", order: 2 },
      { group: "Técnico", key: "Velocidad conteo", value: "1500 / 1200 / 1000 billetes/min", order: 3 },
      { group: "Técnico", key: "Vel. autenticación", value: "1200 / 1000 / 800 billetes/min", order: 4 },
      { group: "Técnico", key: "Cap. alimentador", value: "300 billetes", order: 5 },
      { group: "Técnico", key: "Cap. apilador", value: "200 billetes", order: 6 },
      { group: "Técnico", key: "Tamaño billete", value: "100-182 × 50-100 mm", order: 7 },
      { group: "Técnico", key: "Pantalla", value: "Táctil TFT a color HD, 3.5\"", order: 8 },
      { group: "Técnico", key: "Conexiones", value: "SD, USB (PC), RJ11", order: 9 },
      { group: "Eléctrico", key: "Alimentación", value: "AC 100-240V, 50/60 Hz", order: 0 },
      { group: "Dimensional", key: "Dimensiones", value: "260 × 250 × 235 mm", order: 0 },
      { group: "Dimensional", key: "Peso neto", value: "6 kg", order: 1 },
    ],
    applications: [
      { name: "Bancos", description: "Autenticación y conteo en ventanillas", order: 0 },
      { name: "Retail", description: "Verificación de efectivo en puntos de venta", order: 1 },
      { name: "Casinos", description: "Procesamiento de alto volumen de billetes", order: 2 },
      { name: "Oficinas contables", description: "Conciliación y auditoría de efectivo", order: 3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 4. AMC-8100 — Contadora Vertical Full Touch
  // ═══════════════════════════════════════════════════════════
  {
    name: "AMC-8100",
    slug: "amc-8100",
    sku: "AMC-8100",
    summary: "Contadora vertical de billetes con pantalla full touch de 6.9\", 2 CIS, detección MG/UV/IR/MT y más de 60 divisas.",
    description: `La AMC-8100 es una contadora vertical de billetes con pantalla full touch diseñada para pequeños negocios y entornos comerciales. Su interfaz de 6.9 pulgadas es intuitiva y fácil de usar. Equipada con sensores 2 CIS, MG, UV de 2 canales, IR de cuadro completo y MT de 7 canales, ofrece detección avanzada de falsificaciones y reconocimiento de números de serie. Soporta más de 60 divisas ampliables con múltiples modos de operación. Cuenta con certificaciones RoHS, CE, FC, ISO 9001 e ISO 14001.`,
    categorySlug: "contadoras-billetes",
    brandSlug: "amc",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    order: 4,
    images: [
      { url: "/uploads/products/amc-8100/img-01.webp", alt: "AMC-8100 - vista frontal", isPrimary: true, order: 0 },
      { url: "/uploads/products/amc-8100/img-02.webp", alt: "AMC-8100 - vista lateral", isPrimary: false, order: 1 },
      { url: "/uploads/products/amc-8100/img-03.webp", alt: "AMC-8100 - detalle pantalla", isPrimary: false, order: 2 },
      { url: "/uploads/products/amc-8100/img-04.webp", alt: "AMC-8100 - vista trasera", isPrimary: false, order: 3 },
    ],
    videos: [
      { url: "/uploads/products/amc-8100/video-01.mp4", title: "AMC-8100 en operación", order: 0 },
    ],
    documents: [
      { url: "/uploads/products/amc-8100/brochure.pdf", type: "ficha", title: "Ficha técnica AMC-8100", order: 0 },
    ],
    features: [
      { title: "Pantalla 6.9\" Full Touch", description: "Interfaz intuitiva y fácil de usar", icon: "Monitor", order: 0 },
      { title: "Sensores 2 CIS + MG/UV/IR/MT", description: "Detección avanzada con 5 tecnologías", icon: "ShieldCheck", order: 1 },
      { title: "Reconocimiento de serie", description: "Lectura de números de serie en billetes", icon: "FileText", order: 2 },
      { title: "Más de 60 divisas", description: "Ampliables con actualización de software", icon: "Globe", order: 3 },
      { title: "Múltiples modos", description: "Mezcla, clasificar, contar, lista multimonedas", icon: "Settings", order: 4 },
      { title: "Conectividad completa", description: "RS232, USB, LAN, Type-C, pantalla externa opcional", icon: "Cable", order: 5 },
    ],
    specifications: [
      { group: "General", key: "Tipo", value: "Contadora vertical de billetes", order: 0 },
      { group: "Técnico", key: "Sensores", value: "2 CIS, MG, UV (2 canales), IR (cuadro completo), MT (7 canales)", order: 0 },
      { group: "Técnico", key: "Divisas", value: "Más de 60 (ampliables)", order: 1 },
      { group: "Técnico", key: "Velocidad", value: "800 / 1000 / 1200 billetes/min", order: 2 },
      { group: "Técnico", key: "Cap. tolva", value: "Máximo 500 billetes", order: 3 },
      { group: "Técnico", key: "Cap. apilador", value: "200 billetes", order: 4 },
      { group: "Técnico", key: "Tamaño billete", value: "110 × 60 mm — 185 × 90 mm", order: 5 },
      { group: "Técnico", key: "Pantalla", value: "6.9\" TFT Full Touch", order: 6 },
      { group: "Técnico", key: "Conexiones", value: "RS232, USB, LAN, Type-C", order: 7 },
      { group: "Técnico", key: "Certificaciones", value: "RoHS, CE, FC, ISO 9001, ISO 14001", order: 8 },
      { group: "Eléctrico", key: "Alimentación", value: "100-240V AC, 50/60 Hz", order: 0 },
      { group: "Dimensional", key: "Dimensiones", value: "250 × 270 × 290 mm", order: 0 },
      { group: "Dimensional", key: "Peso neto", value: "5.52 kg", order: 1 },
    ],
    applications: [
      { name: "Estaciones de servicio", description: "Conteo rápido en grifos", order: 0 },
      { name: "Tiendas y restaurantes", description: "Verificación de efectivo al cierre", order: 1 },
      { name: "Bancos minoristas", description: "Procesamiento de volúmenes medios", order: 2 },
      { name: "Bares y discotecas", description: "Verificación en entornos con alto movimiento", order: 3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 5. AMC-8200 — Clasificadora 1+1 Bolsillo
  // ═══════════════════════════════════════════════════════════
  {
    name: "AMC-8200",
    slug: "amc-8200",
    sku: "AMC-8200",
    summary: "Clasificadora de billetes 1+1 bolsillo con pantalla full touch de 7.8\", sensor MT de 13 canales e impresora térmica integrada.",
    description: `La AMC-8200 es una clasificadora profesional de billetes con pantalla full touch de 7.8 pulgadas. Su sistema de sensores incluye 2 CIS (imagen RGB completa), IR de cuadro completo y un sensor magnético MT de 13 canales para detección de tinta magnética e hilo metálico. Clasifica por denominación, cara, orientación, versión y estado de circulación (ATM/CIRC), detectando agujeros, roturas, manchas y billetes deteriorados. La impresora térmica integrada permite imprimir información del conteo. Con certificaciones RoHS, CE, FC, ISO 9001 e ISO 14001.`,
    categorySlug: "clasificadoras-billetes",
    brandSlug: "amc",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    order: 5,
    images: [
      { url: "/uploads/products/amc-8200/img-02.webp", alt: "AMC-8200 - vista frontal", isPrimary: true, order: 0 },
      { url: "/uploads/products/amc-8200/img-01.webp", alt: "AMC-8200 - vista posterior", isPrimary: false, order: 1 },
      { url: "/uploads/products/amc-8200/img-03.webp", alt: "AMC-8200 - detalle pantalla", isPrimary: false, order: 2 },
      { url: "/uploads/products/amc-8200/img-04.webp", alt: "AMC-8200 - compartimentos de salida", isPrimary: false, order: 3 },
    ],
    documents: [
      { url: "/uploads/products/amc-8200/brochure.pdf", type: "ficha", title: "Ficha técnica AMC-8200", order: 0 },
    ],
    features: [
      { title: "Pantalla 7.8\" Full Touch", description: "Interfaz profesional de gran tamaño", icon: "Monitor", order: 0 },
      { title: "MT de 13 canales", description: "Detección magnética avanzada de tinta e hilo metálico", icon: "Magnet", order: 1 },
      { title: "Clasificación completa", description: "Por denominación, cara, orientación, versión y estado ATM/CIRC", icon: "Layers", order: 2 },
      { title: "Detección de deterioro", description: "Agujeros, roturas, manchas, escritos y daños", icon: "Search", order: 3 },
      { title: "Impresora térmica", description: "Impresión rápida de resultados de conteo", icon: "Printer", order: 4 },
      { title: "Protección contra polvo", description: "Diseño sellado con reducción de ruido", icon: "Shield", order: 5 },
    ],
    specifications: [
      { group: "General", key: "Tipo", value: "Clasificadora 1+1 bolsillo", order: 0 },
      { group: "Técnico", key: "Sensores", value: "2 CIS (RGB), IR (cuadro completo), MT (13 canales)", order: 0 },
      { group: "Técnico", key: "Velocidad", value: "800 / 1000 / 1200 billetes/min", order: 1 },
      { group: "Técnico", key: "Cap. tolva", value: "500 billetes", order: 2 },
      { group: "Técnico", key: "Cap. apilador", value: "200 billetes", order: 3 },
      { group: "Técnico", key: "Cap. rechazo", value: "100 billetes", order: 4 },
      { group: "Técnico", key: "Tamaño billete", value: "60 × 85 mm — 100 × 190 mm", order: 5 },
      { group: "Técnico", key: "Pantalla", value: "7.8\" Full Touch", order: 6 },
      { group: "Técnico", key: "Conexiones", value: "RS232 ×2, USB, LAN", order: 7 },
      { group: "Técnico", key: "Impresora", value: "Térmica integrada", order: 8 },
      { group: "Técnico", key: "Certificaciones", value: "RoHS, CE, FC, ISO 9001, ISO 14001", order: 9 },
      { group: "Eléctrico", key: "Alimentación", value: "100-240V AC, 50/60 Hz", order: 0 },
      { group: "Eléctrico", key: "Consumo", value: "Menor a 100 W", order: 1 },
      { group: "Dimensional", key: "Dimensiones", value: "285 × 285 × 335 mm", order: 0 },
      { group: "Dimensional", key: "Peso neto", value: "12 kg", order: 1 },
      { group: "Dimensional", key: "Peso bruto", value: "14 kg", order: 2 },
    ],
    applications: [
      { name: "Bancos", description: "Clasificación y procesamiento de efectivo", order: 0 },
      { name: "Cajas de cambio", description: "Clasificación por denominación", order: 1 },
      { name: "Empresas de transporte", description: "Procesamiento de recaudación", order: 2 },
      { name: "Retail grande", description: "Clasificación en centros de distribución", order: 3 },
    ],
  },



  // ═══════════════════════════════════════════════════════════
  // 7. AMC-9200 — Clasificadora Full Fitness 2+1
  // ═══════════════════════════════════════════════════════════
  {
    name: "AMC-9200",
    slug: "amc-9200",
    sku: "AMC-9200",
    summary: "Clasificadora Full Fitness 2+1 bolsillos con sensores CIS dual RGB, TMR de 18 canales, velocidad 1000 billetes/min y 40 divisas.",
    description: `La AMC-9200 es una clasificadora de billetes Full Fitness de 2+1 bolsillos diseñada para bancos. Equipada con sensores CIS dual a todo color, TMR de línea completa de 18 canales y 12 canales de detección de cinta. Con dos apiladores de 200 billetes cada uno, compartimento de rechazo de 100 billetes y soporte para hasta 40 divisas. Pantalla táctil TFT de 4.3 pulgadas, gestión de números de serie con almacenamiento en SD, y conexiones LAN, USB y RS232. Incluye clasificación por aptitud (fitness), deterioro, cara, orientación y versión.`,
    categorySlug: "clasificadoras-billetes",
    brandSlug: "amc",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    order: 7,
    images: [
      { url: "/uploads/products/amc-9200/img-01.webp", alt: "AMC-9200 - vista frontal", isPrimary: true, order: 0 },
      { url: "/uploads/products/amc-9200/img-02.webp", alt: "AMC-9200 - vista lateral", isPrimary: false, order: 1 },
      { url: "/uploads/products/amc-9200/img-03.webp", alt: "AMC-9200 - detalle apiladores", isPrimary: false, order: 2 },
      { url: "/uploads/products/amc-9200/img-04.webp", alt: "AMC-9200 - vista trasera conexiones", isPrimary: false, order: 3 },
    ],
    documents: [
      { url: "/uploads/products/amc-9200/brochure_amc-9200.pdf", type: "ficha", title: "Ficha técnica AMC-9200", order: 0 },
    ],
    features: [
      { title: "Full Fitness", description: "Clasificación bancaria profesional por aptitud y estado", icon: "Award", order: 0 },
      { title: "TMR 18 canales + 12 cinta", description: "Detección magnética de línea completa", icon: "ScanLine", order: 1 },
      { title: "2+1 bolsillos", description: "2 apiladores de 200 + 1 rechazo de 100 billetes", icon: "LayoutGrid", order: 2 },
      { title: "Motor alto rendimiento", description: "Operación continua sin interrupciones", icon: "Gauge", order: 3 },
      { title: "Clas. por aptitud", description: "Manchas, agujeros, roturas, cinta adhesiva, cara, orientación", icon: "Filter", order: 4 },
      { title: "Gestión de series", description: "Almacenamiento en SD o sistema externo", icon: "Database", order: 5 },
    ],
    specifications: [
      { group: "General", key: "Tipo", value: "Clasificadora Full Fitness 2+1 bolsillos", order: 0 },
      { group: "Técnico", key: "Sensores", value: "2 CIS (R/G/B/IR/UV), TMR (18 canales), MG, IR, UV, espesor, 12 canales cinta", order: 0 },
      { group: "Técnico", key: "Velocidad", value: "1000 billetes/min", order: 1 },
      { group: "Técnico", key: "Cap. alimentador", value: "500 billetes", order: 2 },
      { group: "Técnico", key: "Cap. apilador", value: "200 × 2", order: 3 },
      { group: "Técnico", key: "Cap. rechazo", value: "100 billetes", order: 4 },
      { group: "Técnico", key: "Divisas", value: "Hasta 40 (ampliables)", order: 5 },
      { group: "Técnico", key: "Pantalla", value: "Táctil TFT HD, 4.3\"", order: 6 },
      { group: "Técnico", key: "Conexiones", value: "LAN, RS232 ×2, USB, SD", order: 7 },
      { group: "Técnico", key: "Actualización", value: "Mediante tarjeta SD", order: 8 },
      { group: "Eléctrico", key: "Alimentación", value: "110-240V AC, 50/60 Hz", order: 0 },
      { group: "Dimensional", key: "Dimensiones", value: "400 × 325 × 410 mm", order: 0 },
      { group: "Dimensional", key: "Dimensiones emb.", value: "600 × 510 × 630 mm", order: 1 },
      { group: "Dimensional", key: "Peso neto", value: "20 kg", order: 2 },
      { group: "Dimensional", key: "Peso bruto", value: "25.2 kg", order: 3 },
    ],
    applications: [
      { name: "Bancos centrales", description: "Clasificación Full Fitness para circulación", order: 0 },
      { name: "Procesadoras de efectivo", description: "Clasificación masiva profesional", order: 1 },
      { name: "Sucursales bancarias", description: "Procesamiento de alto volumen", order: 2 },
      { name: "Instituciones gubernamentales", description: "Gestión de efectivo institucional", order: 3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 8. AMC-CM3400 Max — Contadora de Monedas Alta Capacidad
  // ═══════════════════════════════════════════════════════════
  {
    name: "AMC-CM3400 MAX",
    slug: "amc-cm3400-max",
    sku: "AMC-CM3400-MAX",
    summary: "Contadora de monedas de alta capacidad con tolva de gran formato, ruedas integradas y panel de control profesional.",
    description: `La AMC-CM3400 MAX es la versión de mayor capacidad de la línea de contadoras de monedas AMC. Cuenta con una tolva de alimentación de gran formato, panel de control con teclado numérico, pantalla LCD y botones de función en colores para operación intuitiva. Incluye ruedas en la base para facilitar el traslado entre áreas de trabajo. Su diseño robusto con puerta de acceso abatible permite un mantenimiento sencillo del mecanismo interno. Ideal para bancos, centros de cambio y empresas con alto volumen de transacciones en monedas.`,
    categorySlug: "contadoras-monedas",
    brandSlug: "amc",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    order: 8,
    images: [
      { url: "/uploads/products/amc-cm3400-max/img-01.webp", alt: "AMC-CM3400 MAX - vista frontal", isPrimary: true, order: 0 },
      { url: "/uploads/products/amc-cm3400-max/img-02.webp", alt: "AMC-CM3400 MAX - vista lateral", isPrimary: false, order: 1 },
      { url: "/uploads/products/amc-cm3400-max/img-03.webp", alt: "AMC-CM3400 MAX - detalle panel", isPrimary: false, order: 2 },
      { url: "/uploads/products/amc-cm3400-max/img-04.webp", alt: "AMC-CM3400 MAX - tolva", isPrimary: false, order: 3 },
      { url: "/uploads/products/amc-cm3400-max/img-05.webp", alt: "AMC-CM3400 MAX - ruedas y base", isPrimary: false, order: 4 },
    ],
    videos: [
      { url: "/uploads/products/amc-cm3400-max/video-01.mp4", title: "AMC-CM3400 MAX en operación", order: 0 },
    ],
    documents: [
      { url: "/uploads/products/amc-cm3400-max/brochure.pdf", type: "ficha", title: "Ficha técnica AMC-CM3400 MAX", order: 0 },
    ],
    features: [
      { title: "Alta capacidad", description: "Tolva de alimentación de gran formato", icon: "Layers", order: 0 },
      { title: "Panel profesional", description: "LCD, teclado numérico y botones de función", icon: "Monitor", order: 1 },
      { title: "Mantenimiento fácil", description: "Puerta abatible para acceso al mecanismo interno", icon: "Wrench", order: 2 },
      { title: "Ruedas integradas", description: "Mobilidad entre áreas de trabajo", icon: "Move", order: 3 },
      { title: "Diseño robusto", description: "Construcción profesional para uso intensivo", icon: "Shield", order: 4 },
      { title: "Múltiples denominaciones", description: "Conteo y clasificación de varias denominaciones", icon: "Coins", order: 5 },
    ],
    specifications: [
      { group: "General", key: "Tipo", value: "Contadora de monedas (alta capacidad)", order: 0 },
      { group: "General", key: "Marca", value: "AMC", order: 1 },
      { group: "General", key: "Pantalla", value: "LCD digital", order: 2 },
      { group: "General", key: "Controles", value: "Teclado numérico + botones de función", order: 3 },
      { group: "General", key: "Alimentación", value: "110-240V AC, 50/60 Hz", order: 4 },
    ],
    applications: [
      { name: "Bancos", description: "Procesamiento de grandes volúmenes de monedas", order: 0 },
      { name: "Centros de cambio", description: "Clasificación y conteo de múltiples divisas", order: 1 },
      { name: "Supermercados", description: "Procesamiento de monedas al cierre", order: 2 },
      { name: "Casinos", description: "Conteo de fichas y monedas", order: 3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 9. AMC-9100 — Contadora Profesional
  // ═══════════════════════════════════════════════════════════
  {
    name: "AMC-9100",
    slug: "amc-9100",
    sku: "AMC-9100",
    summary: "Contadora profesional de billetes con doble sensor CIS, 18 sensores TMR y reconocimiento OCR.",
    description: "Contadora profesional de billetes de un bolsillo con bandeja de rechazo, equipada con doble sensor CIS de 201 mm y 200 dpi, 18 sensores TMR de línea completa, IR dual, imagen UV, 12 sensores de espesor, reconocimiento OCR de números de serie, clasificación por estado (Fitness) y compatibilidad con hasta 20 divisas. Con velocidad de hasta 1,000 billetes por minuto, ofrece máxima precisión y seguridad para el procesamiento profesional de efectivo.",
    categorySlug: "contadoras-billetes",
    brandSlug: "amc",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    order: 9,
    images: [
      { url: "/uploads/products/amc-9100/img-01.webp", alt: "AMC-9100 vista frontal", isPrimary: true, order: 0 },
      { url: "/uploads/products/amc-9100/img-02.webp", alt: "AMC-9100 vista lateral", isPrimary: false, order: 1 },
      { url: "/uploads/products/amc-9100/img-03.webp", alt: "AMC-9100 vista superior", isPrimary: false, order: 2 },
      { url: "/uploads/products/amc-9100/img-04.webp", alt: "AMC-9100 detalle", isPrimary: false, order: 3 },
    ],
    videos: [
      { url: "/uploads/products/amc-9100/video-01.mp4", title: "AMC-9100 en operación", order: 0 },
    ],
    documents: [
      { url: "/uploads/products/amc-9100/brochure.pdf", type: "ficha", title: "Ficha técnica AMC-9100", order: 0 },
    ],
    features: [
      { title: "Doble CIS", description: "Escaneo de imagen de alta resolución", icon: "ScanLine", order: 0 },
      { title: "Reconocimiento OCR", description: "Lectura de números de serie", icon: "FileText", order: 1 },
      { title: "Clasificación Fitness", description: "Clasificación por estado del billete", icon: "Layers", order: 2 },
      { title: "Múltiples Divisas", description: "Soporte para 20 monedas", icon: "Globe", order: 3 },
    ],
    specifications: [
      { group: "Técnico", key: "Sensores", value: "2 CIS, TMR, IR, UV, Grosor", order: 0 },
      { group: "Técnico", key: "Velocidad", value: "Hasta 1,000 billetes/min", order: 1 },
      { group: "Técnico", key: "Divisas", value: "Hasta 20 monedas", order: 2 },
    ],
    applications: [
      { name: "Bancos", description: "Procesamiento de alto volumen", order: 0 },
      { name: "Casinos", description: "Verificación de efectivo", order: 1 },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding AMC catalog...\n");

  // ── Clean existing data ──
  console.log("🗑️  Cleaning existing products...");
  await prisma.productApplication.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.productFeature.deleteMany();
  await prisma.productDocument.deleteMany();
  await prisma.productVideo.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  console.log("   Products cleaned.\n");

  // ── Upsert categories ──
  console.log("📂 Upserting categories...");
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    console.log(`   ✓ ${cat.name}`);
  }

  // ── Upsert brand ──
  console.log("\n🏷️  Upserting brands...");
  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
    console.log(`   ✓ ${brand.name}`);
  }

  // ── Create products ──
  console.log("\n🛒 Creating products...\n");
  for (const p of products) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    const brand = p.brandSlug ? await prisma.brand.findUnique({ where: { slug: p.brandSlug } }) : null;

    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        summary: p.summary,
        description: p.description,
        categoryId: category!.id,
        brandId: brand?.id ?? null,
        isFeatured: p.isFeatured,
        isNew: p.isNew,
        isBestSeller: p.isBestSeller,
        isActive: true,
        order: p.order,
        ...(('seoTitle' in p && (p as any).seoTitle) ? { seoTitle: (p as any).seoTitle } : {}),
        ...(('seoDescription' in p && (p as any).seoDescription) ? { seoDescription: (p as any).seoDescription } : {}),
        ...(('seoKeywords' in p && (p as any).seoKeywords) ? { seoKeywords: (p as any).seoKeywords } : {}),
        images: {
          create: (p.images || []).map((img: any) => ({
            url: img.url,
            alt: img.alt,
            width: 1200,
            height: 1200,
            isPrimary: img.isPrimary,
            order: img.order,
          })),
        },
        documents: {
          create: (p.documents || []).map((doc: any) => ({
            url: doc.url,
            type: doc.type,
            title: doc.title,
            size: 0,
          })),
        },
        videos: {
          create: (p.videos || []).map((vid: any) => ({
            url: vid.url,
            provider: "local",
            title: vid.title,
            order: vid.order,
          })),
        },
        features: {
          create: (p.features || []).map((f: any) => ({
            title: f.title,
            description: f.description || "",
            icon: f.icon || null,
            order: f.order ?? 0,
          })),
        },
        specifications: {
          create: (p.specifications || []).map((s: any) => ({
            group: s.group,
            key: s.key,
            value: s.value,
            order: s.order ?? 0,
          })),
        },
        applications: {
          create: (p.applications || []).map((a: any) => ({
            name: a.name,
            description: a.description || "",
            order: a.order ?? 0,
          })),
        },
      },
    });

    console.log(`   ✓ ${product.name} (${product.slug}) — ${(p.images||[]).length} imgs, ${(p.features||[]).length} feats, ${(p.specifications||[]).length} specs`);
  }

  console.log("\n✅ Seed complete!");
  console.log(`   Products: ${products.length}`);
  console.log(`   Categories: ${categories.length}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());