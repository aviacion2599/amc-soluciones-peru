import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quoteSchema } from "@/lib/validators/forms";
import { rateLimit } from "@/lib/rate-limit";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";

/**
 * POST /api/quotes
 * Crea una cotización pública. Rate-limited: 10/min/IP.
 * Genera referencia automática: Q-YYYY-NNNNNN
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const limited = rateLimit(req, "quote", { limit: 10, windowMs: 60_000 });
    if (limited) return limited;

    const body = await req.json();
    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Validar productId si viene
    if (data.productId) {
      const product = await db.product.findUnique({
        where: { id: data.productId },
        select: { id: true, name: true },
      });
      if (!product) {
        return NextResponse.json(
          { error: "Producto no válido" },
          { status: 400 },
        );
      }
    }

    // Generar referencia Q-YYYY-NNNNNN
    const year = new Date().getFullYear();
    const lastQuote = await db.quote.findFirst({
      where: { reference: { startsWith: `Q-${year}-` } },
      orderBy: { reference: "desc" },
    });
    const nextNum = lastQuote
      ? parseInt(lastQuote.reference.split("-")[2], 10) + 1
      : 1;
    const reference = `Q-${year}-${String(nextNum).padStart(6, "0")}`;

    const quote = await db.quote.create({
      data: {
        reference,
        productId: data.productId || null,
        customerName: data.customerName,
        customerEmail: data.customerEmail.toLowerCase(),
        customerPhone: data.customerPhone,
        customerCompany: data.customerCompany || null,
        customerRUC: data.customerRUC || null,
        message: data.message,
        quantity: data.quantity,
        status: "PENDING",
      },
    });

    await audit({
      action: AUDIT_ACTIONS.CREATE_QUOTE,
      entity: "quote",
      entityId: quote.id,
      metadata: { reference, customerEmail: data.customerEmail, source: data.source },
      ip: req.headers.get("x-forwarded-for") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    return NextResponse.json(
      {
        data: { id: quote.id, reference: quote.reference },
        message: "Cotización recibida exitosamente",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[api/quotes] Error:", error);
    return NextResponse.json(
      { error: "Error al procesar la cotización" },
      { status: 500 },
    );
  }
}
