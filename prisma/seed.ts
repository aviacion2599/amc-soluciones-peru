import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * AMC Soluciones Perú — Seed Script
 * Categorías y productos reales de equipos de manejo de efectivo.
 */

const categories = [
  {
    slug: "contadoras-billetes",
    name: "Contadoras de Billetes",
    description:
      "Máquinas profesionales de conteo de billetes para todos los volúmenes de operación. Detección de falsificación por UV, MG, IR y 2D. Ideales para bancos, retail, casinos y empresas de transporte de valores.",
    icon: "Banknote",
    order: 1,
    seoTitle: "Contadoras de Billetes Profesionales | AMC Soluciones Perú",
    seoDescription:
      "Venta y servicio técnico de contadoras de billetes Glory, CashScan, Hyundai y Royal Sovereign. Detección UV, MG, IR. Envío a todo el Perú.",
    seoKeywords:
      "contadoras de billetes, máquina contar billetes, contador billetes Perú, Glory, CashScan, Hyundai",
  },
  {
    slug: "contadoras-monedas",
    name: "Contadoras de Monedas",
    description:
      "Equipos de conteo y clasificación de monedas de alta velocidad. Soportan múltiples divisas incluyendo sol peruano, dólar americano y euro. Perfectos para supermercados, bancos y peajes.",
    icon: "Coins",
    order: 2,
    seoTitle: "Contadoras de Monedas | AMC Soluciones Perú",
    seoDescription:
      "Contadoras de monedas profesionales. Conteo rápido, clasificación por denominación. Servicio técnico especializado en Lima y provincias.",
    seoKeywords:
      "contadoras de monedas, máquina contar monedas, contador monedas Perú, Glory CN, clasificador monedas",
  },
  {
    slug: "clasificadoras-billetes",
    name: "Clasificadoras de Billetes",
    description:
      "Máquinas de clasificación y discriminación de billetes por denominación y orientación. Reconocimiento por imagen CIS, detección de falsificación avanzada. Esenciales para bancos centrales y procesadores de efectivo.",
    icon: "Layers",
    order: 3,
    seoTitle: "Clasificadoras de Billetes | AMC Soluciones Perú",
    seoDescription:
      "Clasificadoras de billetes por denominación. Reconocimiento CIS, detección 2D. Equipos Glory para bancos y procesadoras de efectivo.",
    seoKeywords:
      "clasificadora billetes, discriminadora billetes, máquina clasificar billetes, Glory GFS, procesamiento efectivo",
  },
  {
    slug: "detectores-falsificacion",
    name: "Detectores de Falsificación",
    description:
      "Detectores de billetes falsos con tecnología multifunción: luz ultravioleta (UV), lámpara magnética (MG), infrarrojo (IR), luz blanca y lupa. Disponibles en versiones portátiles y de escritorio.",
    icon: "ShieldCheck",
    order: 4,
    seoTitle: "Detectores de Billetes Falsos | AMC Soluciones Perú",
    seoDescription:
      "Detectores de falsificación UV, MG, IR para billetes peruanos y dólares. Portátiles y de escritorio. Garantía y soporte técnico.",
    seoKeywords:
      "detector billetes falsos, detector falsificación Perú, lámpara UV billetes, detector magnético billetes",
  },
  {
    slug: "accesorios-suministros",
    name: "Accesorios y Suministros",
    description:
      "Kit de mantenimiento, cintas transportadoras, bolsas de depósito seguras y todo los consumibles necesarios para el óptimo funcionamiento de sus equipos de procesamiento de efectivo.",
    icon: "Settings",
    order: 5,
    seoTitle: "Accesorios para Contadoras de Billetes | AMC Soluciones Perú",
    seoDescription:
      "Accesorios y suministros para equipos de conteo de efectivo. Kits de mantenimiento, cintas transportadoras, bolsas de depósito.",
    seoKeywords:
      "accesorios contadoras, mantenimiento contadoras, cinta transportadora, suministros efectivo",
  },
];

const products = [
  // ─── CONTADORAS DE BILLETES ────────────────────────────────────────
  {
    name: "Glory GBS-1100",
    slug: "glory-gbs-1100",
    sku: "AMC-CB-001",
    summary:
      "Contadora de billetes de velocidad media con detección UV/MG/IR y pantalla LCD.",
    description:
      `La Glory GBS-1100 es una contadora de billetes compacta y confiable diseñada para entornos de medio volumen. Ofrece una velocidad de conteo de 1,000 billetes por minuto con tres modos de detección de falsificación: ultravioleta (UV), magnético (MG) e infrarrojo (IR).

Su pantalla LCD retroiluminada permite una lectura clara del conteo total, conteo por lote y detección de billetes sospechosos. El mecanismo de alimentación por banda garantiza un conteo suave y preciso, minimizando atascos incluso con billetes usados.

Ideal para bancos minoristas, cajas de supermercados, casinos y oficinas contables que requieren verificación rápida de efectivo con bajo índice de error. Compatible con billetes de todas las denominaciones del sol peruano y monedas extranjeras.`,
    categorySlug: "contadoras-billetes",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    seoTitle: "Glory GBS-1100 — Contadora de Billetes | AMC Soluciones Perú",
    seoDescription:
      "Glory GBS-1100: contadora de billetes 1,000 billetes/min, detección UV/MG/IR. Venta y servicio técnico en Perú.",
    seoKeywords:
      "Glory GBS-1100, contadora billetes Glory, GBS 1100 Perú, precio contadora Glory",
  },
  {
    name: "CashScan CS-2100Pro",
    slug: "cashscan-cs-2100pro",
    sku: "AMC-CB-002",
    summary:
      "Contadora profesional de alta velocidad con detección 4D y reconocimiento de denominación.",
    description:
      `La CashScan CS-2100Pro es una contadora de billetes de alto rendimiento que alcanza velocidades de hasta 1,500 billetes por minuto. Incorpora tecnología de detección 4D (UV, MG, IR y detección de espesor) para identificar billetes falsificados con la máxima precisión.

Su sistema de reconocimiento automático de denominación permite contar y clasificar billetes simultáneamente, mostrando el valor total por denominación en la pantalla TFT a color. La interfaz intuitiva con teclado numérico facilita la configuración de lotes y la navegación por menús.

Diseñada para sucursales bancarias, empresas de transporte de valores y grandes comercios que procesan volúmenes significativos de efectivo diariamente. Incluye puerto USB para actualización de firmware y exportación de registros de conteo.`,
    categorySlug: "contadoras-billetes",
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    seoTitle: "CashScan CS-2100Pro — Contadora Profesional | AMC Soluciones Perú",
    seoDescription:
      "CashScan CS-2100Pro: contadora 1,500 billetes/min, detección 4D, reconocimiento de denominación. Precio y servicio técnico.",
    seoKeywords:
      "CashScan CS-2100Pro, contadora profesional billetes, CS 2100Pro Perú",
  },
  {
    name: "Hyundai SB-1000",
    slug: "hyundai-sb-1000",
    sku: "AMC-CB-003",
    summary:
      "Contadora de billetes económica con detección UV/MG y función de adición/acumulación.",
    description:
      `La Hyundai SB-1000 es una contadora de billetes de entrada de gama que ofrece una relación costo-beneficio excepcional para pequeños y medianos negocios. Con una velocidad de 1,000 billetes por minuto, cuenta con detección básica por ultravioleta (UV) y magnética (MG).

Su diseño compacto y liviano la hace ideal para cajas registradoras, farmacias, clínicas y cualquier punto de venta que necesite verificar rápidamente la autenticidad del efectivo recibido. Funciona con los modos de conteo: libre, lote y adición/acumulación.

La bandeja de salida con capacidad ajustable evita que los billetes se desordenen al finalizar el conteo. Fácil de operar sin capacitación especializada, con pantalla LED clara y paneles de acceso rápido para limpieza de los sensores.`,
    categorySlug: "contadoras-billetes",
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    seoTitle: "Hyundai SB-1000 — Contadora de Billetes Económica | AMC Soluciones Perú",
    seoDescription:
      "Hyundai SB-1000: contadora de billetes económica, detección UV/MG, 1,000 billetes/min. Ideal para pymes en Perú.",
    seoKeywords:
      "Hyundai SB-1000, contadora económica billetes, SB 1000 Perú, contadora pymes",
  },
  {
    name: "Royal Sovereign RBC-4500",
    slug: "royal-sovereign-rbc-4500",
    sku: "AMC-CB-004",
    summary:
      "Contadora de alta capacidad con sistema anti-atascos y detección UV/MG/IR avanzada.",
    description:
      `La Royal Sovereign RBC-4500 es una contadora de billetes de alta capacidad diseñada para entornos exigentes. Su innovador sistema de transporte con rodillos de alta fricción reduce los atascos hasta en un 80% comparado con modelos convencionales, permitiendo procesar lotes grandes de manera continua.

Opera a 1,800 billetes por minuto con triple detección de falsificación (UV, MG, IR) y un sistema de auto-diagnóstico que verifica el estado de los sensores al encendido. La pantalla LCD de gran formato muestra conteo parcial, total y valor acumulado por denominación.

Equipada con puerto RS-232 para conexión a sistemas de gestión de efectivo y software de reporting. Recomendada para bancos, casinos, empresas de cobranza y procesadoras de pagos que manejan altos volúmenes diarios de billetes.`,
    categorySlug: "contadoras-billetes",
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    seoTitle: "Royal Sovereign RBC-4500 — Contadora Alta Capacidad | AMC Soluciones Perú",
    seoDescription:
      "Royal Sovereign RBC-4500: contadora 1,800 billetes/min, anti-atascos, detección UV/MG/IR. Para alto volumen en Perú.",
    seoKeywords:
      "Royal Sovereign RBC-4500, contadora alta capacidad, RBC 4500 Perú, contadora casino",
  },

  // ─── CONTADORAS DE MONEDAS ─────────────────────────────────────────
  {
    name: "Glory CN-1000",
    slug: "glory-cn-1000",
    sku: "AMC-CM-001",
    summary:
      "Contadora y clasificadora de monedas de alta velocidad con tambor rotativo.",
    description:
      `La Glory CN-1000 es una contadora y clasificadora de monedas de tambor rotativo que procesa hasta 2,500 monedas por minuto. Su sistema de clasificación por tamaño y peso permite separar hasta 8 denominaciones diferentes en bandejas individuales de forma simultánea.

Utiliza sensores ópticos y electromagnéticos para distinguir monedas genuinas de falsificaciones o monedas extranjeras no deseadas. El display LCD muestra el conteo total y por denominación, con la opción de detener automáticamente al alcanzar un lote preestablecido.

Es el equipo estándar en la industria bancaria peruana para el procesamiento de monedas de S/. 0.10, 0.20, 0.50, 1.00, 2.00 y 5.00. Su robustez y precisión la convierten en la opción preferida para bancos, supermercados y empresas de transporte de valores.`,
    categorySlug: "contadoras-monedas",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    seoTitle: "Glory CN-1000 — Contadora de Monedas | AMC Soluciones Perú",
    seoDescription:
      "Glory CN-1000: contadora y clasificadora de monedas, 2,500 monedas/min, 8 denominaciones. Venta y servicio técnico en Perú.",
    seoKeywords:
      "Glory CN-1000, contadora monedas Glory, CN 1000 Perú, clasificadora monedas",
  },
  {
    name: "CashScan CM-500",
    slug: "cashscan-cm-500",
    sku: "AMC-CM-002",
    summary:
      "Contadora de monedas compacta y portátil para pequeños volúmenes.",
    description:
      `La CashScan CM-500 es una contadora de monedas de escritorio diseñada para negocios con volúmenes moderados de monedas. Procesa hasta 300 monedas por minuto con alta precisión, clasificando por tamaño en bolsas o contenedores receptoras.

Su diseño compacto la hace perfecta para cajas de supermercado, peajes, estacionamientos, iglesias y pequeños comercios. La configuración se realiza mediante ruedas de ajuste según el diámetro de las monedas peruanas, permitiendo un cambio rápido entre denominaciones.

La CM-500 incluye función de conteo por lotes con alarma sonora al alcanzar la cantidad deseada. Funciona con alimentación por corriente o baterías internas recargables, ofreciendo portabilidad total para auditorías in situ.`,
    categorySlug: "contadoras-monedas",
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    seoTitle: "CashScan CM-500 — Contadora de Monedas Compacta | AMC Soluciones Perú",
    seoDescription:
      "CashScan CM-500: contadora de monedas portátil, 300 monedas/min, clasificación por tamaño. Ideal para comercios en Perú.",
    seoKeywords:
      "CashScan CM-500, contadora monedas portátil, CM 500 Perú, contador monedas comercial",
  },
  {
    name: "Henry HC-300",
    slug: "henry-hc-300",
    sku: "AMC-CM-003",
    summary:
      "Contadora de monedas manual/automática de bajo costo para pequeños comercios.",
    description:
      `La Henry HC-300 es una contadora de monedas de bajo costo que ofrece una solución accesible para negocios que necesitan verificar y contar monedas de forma periódica. Su mecanismo de conteo por rondas permite procesar aproximadamente 200 monedas por minuto con aceptable precisión.

Fabricada con carcasa de plástico reforzado y components de acero inoxidable en la zona de contacto con las monedas, garantiza durabilidad en uso diario. El display LED de 6 dígitos muestra el conteo acumulado y permite reiniciar con un solo botón.

Recomendada para tiendas de barrio, farmacias, panaderías, quioscos y cualquier negocio que maneje monedas como parte de su operación diaria. Su mantenimiento es mínimo y no requiere capacitación técnica para su operación básica.`,
    categorySlug: "contadoras-monedas",
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    seoTitle: "Henry HC-300 — Contadora de Monedas Económica | AMC Soluciones Perú",
    seoDescription:
      "Henry HC-300: contadora de monedas económica, 200 monedas/min, fácil operación. Para pequeños comercios en Perú.",
    seoKeywords:
      "Henry HC-300, contadora monedas económica, HC 300 Perú, contador monedas barato",
  },

  // ─── CLASIFICADORAS DE BILLETES ────────────────────────────────────
  {
    name: "Glory GFS-2200",
    slug: "glory-gfs-2200",
    sku: "AMC-CL-001",
    summary:
      "Clasificadora de billetes por denominación y orientación con tecnología CIS.",
    description:
      `La Glory GFS-2200 es una clasificadora de billetes de alto rendimiento que utiliza sensores de imagen CIS (Contact Image Sensor) para el reconocimiento y procesamiento de billetes. Clasifica hasta 1,200 billetes por minuto, separándolos por denominación, orientación (cara arriba/abajo) y calidad (billetes aptos vs. deteriorados).

Su motor de detección de falsificación integra análisis de patrón 2D, espectroscopía infrarroja, detección magnética y verificación de marca de agua, ofreciendo el nivel más alto de seguridad disponible en el mercado. La pantalla táctil a color de 7 pulgadas facilita la configuración y el monitoreo en tiempo real.

La GFS-2200 es el equipo de referencia para bancos centrales, bancos comerciales y procesadoras de efectivo que requieren velocidad, precisión y trazabilidad en el procesamiento masivo de billetes. Incluye conectividad Ethernet y USB para integración con sistemas de gestión.`,
    categorySlug: "clasificadoras-billetes",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    seoTitle: "Glory GFS-2200 — Clasificadora de Billetes | AMC Soluciones Perú",
    seoDescription:
      "Glory GFS-2200: clasificadora de billetes CIS, 1,200 billetes/min, detección 2D. Para bancos y procesadoras en Perú.",
    seoKeywords:
      "Glory GFS-2200, clasificadora billetes, GFS 2200 Perú, discriminadora billetes Glory",
  },
  {
    name: "CashScan CS-3300Pro",
    slug: "cashscan-cs-3300pro",
    sku: "AMC-CL-002",
    summary:
      "Clasificadora de billetes con pantalla táctil, conteo por valor y detección multi-capa.",
    description:
      `La CashScan CS-3300Pro es una clasificadora de billetes versátil que combina funciones de conteo, clasificación por denominación y detección de falsificación en un equipo compacto de escritorio. Procesa 1,000 billetes por minuto con reconocimiento simultáneo de hasta 5 denominaciones diferentes.

Su pantalla táctil de 5 pulgadas ofrece una interfaz intuitiva con visualización gráfica del conteo por denominación, valor total y porcentaje de billetes auténticos vs. sospechosos. El sistema de detección multi-capa incluye UV, MG, IR, espesor, longitud y análisis de patrón.

La CS-3300Pro genera reportes detallados de cada lote procesado, exportables vía USB en formato CSV. Es ideal para sucursales bancarias medianas, cajas centrales de retail y empresas que consolidan efectivo de múltiples puntos de venta.`,
    categorySlug: "clasificadoras-billetes",
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    seoTitle: "CashScan CS-3300Pro — Clasificadora de Billetes | AMC Soluciones Perú",
    seoDescription:
      "CashScan CS-3300Pro: clasificadora con pantalla táctil, 1,000 billetes/min, detección multi-capa. Precio y servicio en Perú.",
    seoKeywords:
      "CashScan CS-3300Pro, clasificadora billetes táctil, CS 3300Pro Perú",
  },

  // ─── DETECTORES DE FALSIFICACIÓN ───────────────────────────────────
  {
    name: "Glory DGD-100",
    slug: "glory-dgd-100",
    sku: "AMC-DF-001",
    summary:
      "Detector de billetes falsos de escritorio con 5 métodos de verificación.",
    description:
      `El Glory DGD-100 es un detector de falsificación de escritorio que emplea cinco métodos de verificación simultáneos: luz ultravioleta (UV) para verificar las fibras fluorescentes, luz magnética (MG) para detectar las bandas magnéticas, luz infrarroja (IR) para identificar patrones invisibles al ojo humano, luz blanca para inspección visual general y lupa de aumento de 5x para examinar detalles de impresión.

Diseñado para puntos de venta, cajas de recaudación y oficinas que reciben pagos en efectivo. Su operation es intuitiva: simplemente se desliza el billete bajo la fuente de luz correspondiente y se verifica la presencia de los elementos de seguridad.

El DGD-100 incluye una guía visual rápida con los elementos de seguridad de los billetes del sol peruano y el dólar americano. Construido en carcasa de acero con acabado anti-huellas para uso intensivo en ambientes de trabajo.`,
    categorySlug: "detectores-falsificacion",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    seoTitle: "Glory DGD-100 — Detector de Billetes Falsos | AMC Soluciones Perú",
    seoDescription:
      "Glory DGD-100: detector de billetes falsos 5 métodos (UV, MG, IR, luz blanca, lupa). Para puntos de venta en Perú.",
    seoKeywords:
      "Glory DGD-100, detector billetes falsos, DGD 100 Perú, detector falsificación escritorio",
  },
  {
    name: "CashScan UV-200Pro",
    slug: "cashscan-uv-200pro",
    sku: "AMC-DF-002",
    summary:
      "Detector portátil de billetes falsos con tecnología UV/LED de alta intensidad.",
    description:
      `El CashScan UV-200Pro es un detector de billetes falsos portátil que utiliza LEDs ultravioleta de alta intensidad para la verificación instantánea de billetes. Su diseño tipo lámpara de mano permite una inspección rápida sin necesidad de un escritorio, ideal para recepcionistas, cajeros móviles y personal de campo.

Los LEDs UV de última generación emiten a 365nm, la longitud de onda óptima para activar las fibras fluorescentes de seguridad presentes en los billetes del Banco Central de Reserva del Perú y la Reserva Federal de Estados Unidos. La batería de litio recargable ofrece hasta 8 horas de uso continuo.

El UV-200Pro incluye un marcador UV para pruebas adicionales de tinta y una correa de muñeca para facilitar el transporte. Certificado para uso profesional con garantía de 2 años y soporte técnico incluido por AMC Soluciones Perú.`,
    categorySlug: "detectores-falsificacion",
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    seoTitle: "CashScan UV-200Pro — Detector Portátil UV | AMC Soluciones Perú",
    seoDescription:
      "CashScan UV-200Pro: detector portátil de billetes falsos, LEDs UV 365nm, batería recargable. Para uso profesional en Perú.",
    seoKeywords:
      "CashScan UV-200Pro, detector UV portátil, UV 200Pro Perú, lámpara UV billetes",
  },
  {
    name: "Ultrasafe MD-3000",
    slug: "ultrasafe-md-3000",
    sku: "AMC-DF-003",
    summary:
      "Detector multifunción de billetes con pantalla digital y alarma de falsificación.",
    description:
      `El Ultrasafe MD-3000 es un detector de billetes falsos multifunción de última generación con pantalla digital LCD que indica claramente el resultado de cada verificación. Integra sensores UV, magnéticos e infrarrojos que analizan el billete en menos de 0.5 segundos, mostrando "AUTÉNTICO" en verde o "SOSPECHOSO" en rojo.

Su mecanismo de inserción automática permite verificar hasta 10 billetes por minuto sin necesidad de manipularlos manualmente. El sistema emite una alerta sonora y visual al detectar un billete sospechoso, reteniéndolo automáticamente para inspección detallada.

El MD-3000 almacena en memoria los últimos 1,000 billetes verificados, con estadísticas de autenticidad por sesión. Compatible con un software de gestión mediante conexión USB. Recomendado para bancos, casinos, casas de cambio y empresas con alto flujo de efectivo.`,
    categorySlug: "detectores-falsificacion",
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    seoTitle: "Ultrasafe MD-3000 — Detector Multifunción | AMC Soluciones Perú",
    seoDescription:
      "Ultrasafe MD-3000: detector multifunción con pantalla digital, inserción automática, memoria de 1,000 billetes. En Perú.",
    seoKeywords:
      "Ultrasafe MD-3000, detector multifunción billetes, MD 3000 Perú, detector automático",
  },

  // ─── ACCESORIOS Y SUMINISTROS ──────────────────────────────────────
  {
    name: "Kit de Mantenimiento Glory",
    slug: "kit-mantenimiento-glory",
    sku: "AMC-AC-001",
    summary:
      "Kit completo de mantenimiento preventivo para equipos Glory GBS y GFS.",
    description:
      `El Kit de Mantenimiento Glory es un set profesional de limpieza y mantenimiento preventivo diseñado específicamente para las líneas de contadoras y clasificadoras Glory. Incluye hisopos de microfibra para sensores ópticos, solución de limpieza isotópica para rodillos de caucho, aire comprimido en spray para eliminación de polvo en tarjetas electrónicas y paños antiestáticos.

El uso regular de este kit (recomendado cada 500,000 billetes procesados o mensualmente) prolonga la vida útil de los equipos hasta un 40% y mantiene la precisión de detección de falsificación en niveles de fábrica. Incluye guía ilustrada de procedimiento en español.

Compatible con los modelos GBS-1100, GBS-2200, GFS-1200, GFS-2200 y GNH-10. Cada kit permite aproximadamente 12 sesiones de mantenimiento completo. AMC Soluciones Perú ofrece también el servicio de mantenimiento preventivo ejecutado por técnicos certificados.`,
    categorySlug: "accesorios-suministros",
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    seoTitle: "Kit de Mantenimiento Glory — Accesorios | AMC Soluciones Perú",
    seoDescription:
      "Kit de mantenimiento preventivo para equipos Glory. Hisopos, solución de limpieza, aire comprimido. Para GBS y GFS en Perú.",
    seoKeywords:
      "kit mantenimiento Glory, mantenimiento contadoras, limpieza equipos efectivo, accesorios Glory Perú",
  },
  {
    name: "Cinta Transportadora Universal",
    slug: "cinta-transportadora-universal",
    sku: "AMC-AC-002",
    summary:
      "Cinta de caucho de repuesto para contadores y clasificadores de billetes.",
    description:
      `La Cinta Transportadora Universal es un repuesto de alta calidad fabricada en caucho siliconado de grado industrial, diseñada para reemplazar las bandas de alimentación desgastadas en la mayoría de contadores y clasificadores de billetes disponibles en el mercado peruano.

Su superficie texturizada de alta fricción garantiza un agarre uniforme que reduce los atascos y dobleces durante el transporte de billetes. La banda resistente a la estática evita la acumulación de carga eléctrica que puede interferir con los sensores de detección.

Disponible en 5 longitudes estándar (180mm, 220mm, 260mm, 300mm y 350mm) para adaptarse a diferentes modelos de Glory, CashScan, Hyundai y Royal Sovereign. Se recomienda el reemplazo cada 6 meses en equipos de uso intensivo o al primer signo de desgaste visible.`,
    categorySlug: "accesorios-suministros",
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    seoTitle: "Cinta Transportadora Universal — Repuesto | AMC Soluciones Perú",
    seoDescription:
      "Cinta transportadora de caucho para contadoras y clasificadoras de billetes. 5 tamaños, alta fricción. Envío a todo Perú.",
    seoKeywords:
      "cinta transportadora contadora, banda repuesto contador billetes, caucho siliconado, repuestos efectivo Perú",
  },
  {
    name: "Bolsas de Depósito Seguras",
    slug: "bolsas-deposito-seguras",
    sku: "AMC-AC-003",
    summary:
      "Bolsas de seguridad tamper-evident para transporte y depósito de efectivo.",
    description:
      `Las Bolsas de Depósito Seguras son envolturas de seguridad de un solo uso (tamper-evident) diseñadas para el transporte y depósito de efectivo entre puntos de venta, sucursales bancarias y empresas de transporte de valores. Fabricadas en polietileno de alta densidad con cierre adhesivo irreversible y numeración secuencial única.

Cada bolsa cuenta con una ventana transparente para verificar el contenido sin necesidad de abrirla, una zona de escritura para registrar los datos del depósito (fecha, monto, responsable) y un sello de seguridad que se destruye al intentar abrir la bolsa sin autorización.

Disponibles en 4 tamaños: pequeña (para monedas y billetes sueltos), mediana (para fajos estándar), grande (para loteos bancarios) y extragrande (para transporte de valores). Color codificado por nivel de seguridad: azul (estándar), roja (alto valor) y negra (confidencial).`,
    categorySlug: "accesorios-suministros",
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    seoTitle: "Bolsas de Depósito Seguras — Suministros | AMC Soluciones Perú",
    seoDescription:
      "Bolsas de depósito de efectivo tamper-evident, cierre irreversible, numeración secuencial. 4 tamaños, envío a todo Perú.",
    seoKeywords:
      "bolsas depósito efectivo, bolsas seguridad dinero, tamper evident bags Perú, bolsas transporte valores",
  },
];

async function main() {
  console.log("🌱 Iniciando seed de AMC Soluciones Perú...");

  // ── Create categories ──
  console.log("\n📁 Creando categorías...");
  const createdCategories: Record<string, string> = {};

  for (const cat of categories) {
    const created = await prisma.category.create({
      data: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        order: cat.order,
        isActive: true,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription,
        seoKeywords: cat.seoKeywords,
      },
    });
    createdCategories[cat.slug] = created.id;
    console.log(`  ✓ Categoría creada: ${cat.name} (${cat.slug})`);
  }

  // ── Create products ──
  console.log("\n📦 Creando productos...");
  let productCount = 0;

  for (const prod of products) {
    const categoryId = createdCategories[prod.categorySlug];
    if (!categoryId) {
      console.error(`  ✗ Categoría no encontrada para: ${prod.name} (${prod.categorySlug})`);
      continue;
    }

    await prisma.product.create({
      data: {
        slug: prod.slug,
        sku: prod.sku,
        name: prod.name,
        summary: prod.summary,
        description: prod.description,
        categoryId,
        price: null,
        currency: "PEN",
        isFeatured: prod.isFeatured,
        isNew: prod.isNew,
        isBestSeller: prod.isBestSeller,
        isActive: true,
        order: productCount + 1,
        seoTitle: prod.seoTitle,
        seoDescription: prod.seoDescription,
        seoKeywords: prod.seoKeywords,
      },
    });
    productCount++;
    console.log(`  ✓ Producto creado: ${prod.name} (${prod.sku})`);
  }

  console.log(`\n✅ Seed completado: ${Object.keys(createdCategories).length} categorías, ${productCount} productos.`);
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());