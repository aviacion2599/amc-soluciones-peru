/**
 * AMC SOLUCIONES PERÚ — Seed inicial
 * ----------------------------------------------------------------------------
 * Ejecutar con: bun run db:seed
 *
 * Crea:
 *  - Usuario SUPER_ADMIN inicial (admin@amcsolucionesperu.com / AdminAMC2026!)
 *  - 5 categorías de productos
 *  - 6 marcas representadas
 *  - 4 productos destacados con specs, features, aplicaciones
 *  - 6 FAQ iniciales
 *  - 3 testimonios demo
 *  - Configuración del sitio (whatsapp, phone, email, etc.)
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando seed AMC Soluciones Perú...\n");

  // ====================== USUARIOS ======================
  console.log("👤 Creando usuarios...");
  const adminPassword = await bcrypt.hash("AdminAMC2026!", 12);

  const admin = await db.user.upsert({
    where: { email: "admin@amcsolucionesperu.com" },
    update: {},
    create: {
      email: "admin@amcsolucionesperu.com",
      name: "Administrador AMC",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });
  console.log(`   ✓ SUPER_ADMIN: ${admin.email}`);

  const salesPassword = await bcrypt.hash("SalesAMC2026!", 12);
  const sales = await db.user.upsert({
    where: { email: "ventas@amcsolucionesperu.com" },
    update: {},
    create: {
      email: "ventas@amcsolucionesperu.com",
      name: "Equipo Ventas AMC",
      passwordHash: salesPassword,
      role: "SALES",
      isActive: true,
    },
  });
  console.log(`   ✓ SALES: ${sales.email}`);

  // ====================== CATEGORÍAS ======================
  console.log("\n📂 Creando categorías...");
  const categories = [
    {
      slug: "contadoras-de-billetes",
      name: "Contadoras de Billetes",
      description: "Conteo ultrarrápido con detección de falsos multi-sensorial UV, MG e IR.",
      icon: "Banknote",
      order: 1,
      isActive: true,
      seoTitle: "Contadoras de Billetes en Perú | AMC Soluciones",
      seoDescription: "Venta de contadoras de billetes profesionales con detección UV, MG e IR. Servicio técnico y garantía oficial.",
    },
    {
      slug: "contadoras-de-monedas",
      name: "Contadoras de Monedas",
      description: "Clasificación y conteo preciso de monedas por denominación.",
      icon: "Coins",
      order: 2,
      isActive: true,
      seoTitle: "Contadoras de Monedas en Perú | AMC Soluciones",
      seoDescription: "Contadoras y clasificadoras de monedas profesionales. Velocidad y precisión para tu negocio.",
    },
    {
      slug: "clasificadoras",
      name: "Clasificadoras",
      description: "Equipos que clasifican y ordenan billetes por denominación.",
      icon: "ScanLine",
      order: 3,
      isActive: true,
    },
    {
      slug: "detectores",
      name: "Detectores",
      description: "Detección profesional de billetes falsos con luz UV, MG e IR.",
      icon: "ScanLine",
      order: 4,
      isActive: true,
    },
    {
      slug: "accesorios",
      name: "Accesorios",
      description: "Repuestos, kit de mantenimiento y consumibles originales.",
      icon: "Settings2",
      order: 5,
      isActive: true,
    },
  ];

  for (const c of categories) {
    await db.category.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
    console.log(`   ✓ ${c.name}`);
  }

  // ====================== MARCAS ======================
  console.log("\n🏷️ Creando marcas...");
  const brands = [
    { slug: "glory", name: "GLORY", description: "Fabricante japonés líder mundial en manejo de efectivo.", website: "https://www.glory-global.com", order: 1 },
    { slug: "cashscan", name: "CashScan", description: "Marca especializada en detectores y contadoras.", order: 2 },
    { slug: "hyundai", name: "Hyundai", description: "Soluciones de conteo de la marca coreana Hyundai.", order: 3 },
    { slug: "henry", name: "Henry", description: "Equipos de conteo y detección de billetes.", order: 4 },
    { slug: "royal-sovereign", name: "Royal Sovereign", description: "Contadoras y clasificadoras internacionales.", order: 5 },
    { slug: "cassida", name: "Cassida", description: "Tecnología de detección de billetes falsos.", order: 6 },
  ];

  for (const b of brands) {
    await db.brand.upsert({
      where: { slug: b.slug },
      update: b,
      create: { ...b, isActive: true },
    });
    console.log(`   ✓ ${b.name}`);
  }

  // ====================== PRODUCTOS ======================
  console.log("\n📦 Creando productos...");
  const catBilletes = await db.category.findUnique({ where: { slug: "contadoras-de-billetes" } });
  const catMonedas = await db.category.findUnique({ where: { slug: "contadoras-de-monedas" } });
  const catClasif = await db.category.findUnique({ where: { slug: "clasificadoras" } });
  const brandAmc = await db.brand.upsert({
    where: { slug: "amc" },
    update: {},
    create: { slug: "amc", name: "AMC", description: "Marca propia AMC Soluciones Perú.", order: 0, isActive: true },
  });

  const products = [
    {
      slug: "amc-9100",
      sku: "AMC-9100",
      name: "Contadora de Billetes AMC-9100",
      summary: "Contadora profesional de billetes con detección UV, MG e IR. 1,200 billetes/min.",
      description: "La AMC-9100 es el modelo más vendido de AMC Soluciones Perú. Diseñada para negocios con alto volumen de efectivo, ofrece conteo ultrarrápido con triple detección de seguridad (UV, MG, IR) que identifica billetes falsos con precisión del 99.8%. Incluye pantalla digital, modo suma, modo lote y detección de denominación. Soporta múltiples divisas incluyendo Soles, Dólares y Euros.",
      categoryId: catBilletes!.id,
      brandId: brandAmc.id,
      price: 3200,
      currency: "PEN",
      isFeatured: true,
      isBestSeller: true,
      isActive: true,
      order: 1,
      seoTitle: "Contadora de Billetes AMC-9100 | 1200 bpm | Detección UV/MG/IR",
      seoDescription: "Contadora profesional AMC-9100 con velocidad de 1,200 billetes/min y triple detección de seguridad. Garantía oficial 12 meses.",
      features: [
        { title: "Triple Detección de Seguridad", description: "Sensores UV (ultravioleta), MG (magnético) e IR (infrarrojo) para máxima protección contra falsificaciones.", icon: "ShieldCheck", order: 1 },
        { title: "Velocidad Profesional", description: "1,200 billetes por minuto para operaciones de alto volumen.", icon: "Gauge", order: 2 },
        { title: "Multi-Divisa", description: "Soporta Soles peruanos, Dólares americanos y Euros.", icon: "Banknote", order: 3 },
        { title: "Modo Lote y Suma", description: "Cuenta y separa en lotes predefinidos, con función de suma acumulativa.", icon: "Calculator", order: 4 },
      ],
      specifications: [
        { group: "General", key: "Velocidad de conteo", value: "1,200 billetes/min", order: 1 },
        { group: "General", key: "Capacidad de cargador", value: "500 billetes", order: 2 },
        { group: "General", key: "Tamaño de billete", value: "50 x 100 a 90 x 190 mm", order: 3 },
        { group: "Detección", key: "Ultravioleta (UV)", value: "Sí", order: 4 },
        { group: "Detección", key: "Magnético (MG)", value: "Sí", order: 5 },
        { group: "Detección", key: "Infrarrojo (IR)", value: "Sí", order: 6 },
        { group: "Eléctrico", key: "Voltaje", value: "AC 110-240V / 50-60Hz", order: 7 },
        { group: "Eléctrico", key: "Consumo", value: "80W", order: 8 },
        { group: "Dimensional", key: "Dimensiones", value: "290 x 250 x 230 mm", order: 9 },
        { group: "Dimensional", key: "Peso", value: "7.5 kg", order: 10 },
      ],
      applications: [
        { name: "Bancos y Entidades Financieras", description: "Operaciones de caja diaria con alto volumen.", order: 1 },
        { name: "Cadenas de Retail", description: "Supermercados y tiendas por departamento.", order: 2 },
        { name: "Farmacias y Minimarkets", description: "Negocios con flujo constante de efectivo.", order: 3 },
        { name: "Restaurantes", description: "Cierre de caja y arqueo eficiente.", order: 4 },
      ],
    },
    {
      slug: "amc-3200-plus",
      sku: "AMC-3200+",
      name: "Contadora de Billetes AMC-3200+",
      summary: "Modelo compacto de alta velocidad. 1,500 billetes/min, solo 6 kg.",
      description: "La AMC-3200+ es la opción compacta y portátil de AMC. Con solo 6 kg de peso y dimensiones reducidas (260x250x275 mm), es ideal para negocios con espacio limitado pero que requieren velocidad profesional. Incluye detección dual UV+MG y pantalla LCD con backlight.",
      categoryId: catBilletes!.id,
      brandId: brandAmc.id,
      price: 2400,
      currency: "PEN",
      isFeatured: true,
      isActive: true,
      order: 2,
      features: [
        { title: "Diseño Compacto", description: "Solo 6 kg y 260x250x275 mm. Perfecta para espacios reducidos.", icon: "Box", order: 1 },
        { title: "Alta Velocidad", description: "1,500 billetes por minuto en formato compacto.", icon: "Gauge", order: 2 },
        { title: "Doble Detección", description: "Sensores UV y MG para detección de billetes falsos.", icon: "ShieldCheck", order: 3 },
        { title: "Pantalla LCD", description: "Display digital con retroiluminación para fácil lectura.", icon: "Monitor", order: 4 },
      ],
      specifications: [
        { group: "General", key: "Velocidad de conteo", value: "1,500 billetes/min", order: 1 },
        { group: "General", key: "Capacidad de cargador", value: "300 billetes", order: 2 },
        { group: "Detección", key: "Ultravioleta (UV)", value: "Sí", order: 3 },
        { group: "Detección", key: "Magnético (MG)", value: "Sí", order: 4 },
        { group: "Dimensional", key: "Dimensiones", value: "260 x 250 x 275 mm", order: 5 },
        { group: "Dimensional", key: "Peso", value: "6 kg", order: 6 },
      ],
      applications: [
        { name: "Pequeños Comercios", description: "Bodegas, minimarkets y tiendas.", order: 1 },
        { name: "Restaurantes", description: "Cajas chicas con poco espacio.", order: 2 },
        { name: "Transporte", description: "Buses interprovinciales y agencias de viaje.", order: 3 },
      ],
    },
    {
      slug: "amc-9200",
      sku: "AMC-9200",
      name: "Contadora con Clasificación AMC-9200",
      summary: "Contadora premium con clasificación por denominación. Multi-divisa.",
      description: "La AMC-9200 es el modelo tope de gama de AMC. No solo cuenta, sino que clasifica los billetes por denominación, ideal para cajas con alto volumen de múltiples denominaciones. Compatible con Soles, Dólares y Euros. Incluye software de reportes y conexión USB para exportar datos.",
      categoryId: catClasif!.id,
      brandId: brandAmc.id,
      price: 6800,
      currency: "PEN",
      isFeatured: true,
      isActive: true,
      order: 3,
      features: [
        { title: "Clasificación Automática", description: "Identifica y separa billetes por denominación.", icon: "Layers", order: 1 },
        { title: "Multi-Divisa Avanzado", description: "Soles, Dólares y Euros con actualización de firmware.", icon: "Globe", order: 2 },
        { title: "Conectividad USB", description: "Exporta reportes en Excel/CSV para auditoría.", icon: "Usb", order: 3 },
        { title: "Pantalla Táctil", description: "Interfaz intuitiva de 5 pulgadas táctil.", icon: "Monitor", order: 4 },
      ],
      specifications: [
        { group: "General", key: "Velocidad de conteo", value: "1,000 billetes/min", order: 1 },
        { group: "General", key: "Capacidad de cargador", value: "700 billetes", order: 2 },
        { group: "General", key: "Funciones", value: "Conteo + Clasificación + Detección", order: 3 },
        { group: "Conectividad", key: "USB", value: "Sí (exportación de datos)", order: 4 },
        { group: "Conectividad", key: "Software", value: "Incluido (Windows/Mac)", order: 5 },
        { group: "Dimensional", key: "Dimensiones", value: "320 x 290 x 280 mm", order: 6 },
        { group: "Dimensional", key: "Peso", value: "11 kg", order: 7 },
      ],
      applications: [
        { name: "Bancos", description: "Cajas con alta variedad de denominaciones.", order: 1 },
        { name: "Casinos", description: "Operaciones de mesa con clasificación compleja.", order: 2 },
        { name: "Empresas de Transporte de Valores", description: "Procesamiento centralizado de efectivo.", order: 3 },
      ],
    },
    {
      slug: "amc-c100",
      sku: "AMC-C100",
      name: "Contadora de Monedas AMC-C100",
      summary: "Contadora de monedas multi-denominación. 1,800 monedas/min.",
      description: "La AMC-C100 es la primera contadora de monedas de AMC. Procesa 1,800 monedas por minuto con clasificación automática por denominación. Compatible con monedas peruanas (S/1, S/2, S/5) y extranjeras. Incluye bolsas colectoras para cada denominación y display digital con conteo por separado.",
      categoryId: catMonedas!.id,
      brandId: brandAmc.id,
      price: 1900,
      currency: "PEN",
      isFeatured: true,
      isNew: true,
      isActive: true,
      order: 4,
      features: [
        { title: "Multi-Denominación", description: "Clasifica monedas peruanas S/1, S/2 y S/5 automáticamente.", icon: "Coins", order: 1 },
        { title: "Alta Velocidad", description: "1,800 monedas por minuto de procesamiento.", icon: "Gauge", order: 2 },
        { title: "Bolsas Colectoras", description: "3 bolsas separadas para cada denominación.", icon: "Package", order: 3 },
        { title: "Conteo Dual", description: "Cuenta cantidad y valor total simultáneamente.", icon: "Calculator", order: 4 },
      ],
      specifications: [
        { group: "General", key: "Velocidad", value: "1,800 monedas/min", order: 1 },
        { group: "General", key: "Capacidad del cargador", value: "2,500 monedas", order: 2 },
        { group: "General", key: "Denominaciones", value: "S/1, S/2, S/5", order: 3 },
        { group: "Dimensional", key: "Dimensiones", value: "350 x 320 x 280 mm", order: 4 },
        { group: "Dimensional", key: "Peso", value: "9 kg", order: 5 },
      ],
      applications: [
        { name: "Transporte Público", description: "Buses y micros con alta circulación de monedas.", order: 1 },
        { name: "Supermercados", description: "Cierre de cajas con abundantes monedas.", order: 2 },
        { name: "Casinos y Salas de Juego", description: "Procesamiento de fichas y monedas.", order: 3 },
      ],
    },
  ];

  for (const p of products) {
    const { features, specifications, applications, ...productData } = p;
    const existing = await db.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`   ◯ ${p.name} (ya existe)`);
      continue;
    }
    const product = await db.product.create({ data: productData });

    if (features?.length) {
      await db.productFeature.createMany({
        data: features.map((f) => ({ ...f, productId: product.id })),
      });
    }
    if (specifications?.length) {
      await db.productSpecification.createMany({
        data: specifications.map((s) => ({ ...s, productId: product.id })),
      });
    }
    if (applications?.length) {
      await db.productApplication.createMany({
        data: applications.map((a) => ({ ...a, productId: product.id })),
      });
    }
    console.log(`   ✓ ${p.name}`);
  }

  // ====================== FAQ ======================
  console.log("\n❓ Creando FAQ...");
  const faqs = [
    { question: "¿Qué marcas de equipos reparan?", answer: "Trabajamos principalmente con GLORY, Hyundai, Henry, Royal Sovereign y Cassida. También ofrecemos servicio técnico para equipos genéricos previo diagnóstico.", category: "Servicio Técnico", order: 1 },
    { question: "¿Cuánto demora una calibración estándar?", answer: "Una calibración estándar toma entre 24 y 48 horas hábiles. Para servicio express en sitio, contamos con técnicos disponibles el mismo día en Lima Metropolitana. En provincias el tiempo puede variar según coordinación logística.", category: "Servicio Técnico", order: 2 },
    { question: "¿La garantía cubre repuestos?", answer: "Sí. Todos nuestros equipos incluyen garantía oficial de 12 meses que cubre mano de obra y repuestos originales del fabricante. La garantía no cubre daños por mal uso o factores externos (caídas, líquidos, sobrevoltajes).", category: "Garantía", order: 3 },
    { question: "¿Hacen envíos a provincias?", answer: "Sí, realizamos envíos a todo Perú a través de currier asociado (Olva Courier, Shalom). El costo de envío se cotiza por separado. El tiempo estimado de entrega es de 2 a 5 días hábiles según destino.", category: "Compras", order: 4 },
    { question: "¿Aceptan pagos con tarjeta?", answer: "Sí, aceptamos Visa, Mastercard, American Express y Diners Club a través de Mercado Pago. También transferencias bancarias (BCP, Interbank, BBVA) y Yape/Plin para montos menores.", category: "Compras", order: 5 },
    { question: "¿Ofrecen capacitación al personal?", answer: "Sí. Toda compra de equipo incluye una sesión gratuita de capacitación on-site (en Lima Metropolitana) o virtual. Capacitaciones adicionales para nuevo personal se cotizan por separado.", category: "Soporte", order: 6 },
  ];
  for (const f of faqs) {
    const existing = await db.fAQ.findFirst({ where: { question: f.question } });
    if (existing) continue;
    await db.fAQ.create({ data: { ...f, isActive: true } });
    console.log(`   ✓ ${f.question.substring(0, 40)}...`);
  }

  // ====================== TESTIMONIOS ======================
  console.log("\n💬 Creando testimonios...");
  const testimonials = [
    { name: "Carlos Mendoza", position: "Gerente de Operaciones", company: "Cadena de Farmacias Inkafarma", content: "La precisión de las contadoras AMC y la rapidez del servicio técnico nos permitieron reducir significativamente las diferencias de caja en nuestras agencias.", rating: 5, order: 1 },
    { name: "Rosa Quispe", position: "Jefa de Tesorería", company: "Municipalidad de Surco", content: "El equipo de AMC no solo nos vendió las máquinas, nos acompañó en la implementación y capacitación del personal. Soporte técnico impecable.", rating: 5, order: 2 },
    { name: "Jorge Velásquez", position: "CFO", company: "Grupo Retail Peruano", content: "Migrar desde otro proveedor a AMC fue la mejor decisión. La calibración periódica y los repuestos originales marcan la diferencia.", rating: 5, order: 3 },
  ];
  for (const t of testimonials) {
    const existing = await db.testimonial.findFirst({ where: { name: t.name } });
    if (existing) continue;
    await db.testimonial.create({ data: { ...t, isActive: true } });
    console.log(`   ✓ ${t.name}`);
  }

  // ====================== SITE CONFIG ======================
  console.log("\n⚙️ Configurando sitio...");
  const configs = [
    { key: "whatsapp", value: JSON.stringify({ number: "51984569125", defaultMessage: "Hola, vengo desde el sitio web AMC Soluciones Perú y quiero información sobre sus productos y servicios." }) },
    { key: "phone", value: JSON.stringify({ display: "+51 984 569 125", raw: "+51984569125" }) },
    { key: "email", value: JSON.stringify({ primary: "ventas@amcsolucionesperu.com", technical: "serviciotecnico@amcsolucionesperu.com" }) },
    { key: "address", value: JSON.stringify({ full: "Av. Argentina 1234, Cercado de Lima, Lima — Perú", short: "Lima, Perú", mapEmbed: "" }) },
    { key: "schedule", value: JSON.stringify({ weekdays: "Lun – Vie · 9:00 – 18:00", saturday: "Sábado · 9:00 – 13:00", sunday: "Domingo · Cerrado" }) },
    { key: "social", value: JSON.stringify({ facebook: "https://facebook.com/amcsolucionesperu", instagram: "https://instagram.com/amcsolucionesperu", linkedin: "https://linkedin.com/company/amcsolucionesperu", youtube: "https://youtube.com/@amcsolucionesperu" }) },
  ];
  for (const c of configs) {
    await db.siteConfig.upsert({
      where: { key: c.key },
      update: { value: c.value },
      create: c,
    });
    console.log(`   ✓ ${c.key}`);
  }

  console.log("\n✅ Seed completado exitosamente!");
  console.log("\n📋 Credenciales de acceso:");
  console.log("   SUPER_ADMIN: admin@amcsolucionesperu.com / AdminAMC2026!");
  console.log("   SALES:       ventas@amcsolucionesperu.com / SalesAMC2026!");
  console.log("\n⚠️  IMPORTANTE: Cambiar estas contraseñas en producción.");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
