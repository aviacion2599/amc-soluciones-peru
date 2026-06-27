import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validators/forms";
import { rateLimit } from "@/lib/rate-limit";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";

/**
 * POST /api/contact
 * Crea un mensaje de contacto público. Rate-limited: 10/min/IP.
 */
export async function POST(req: NextRequest) {
  try {
    const limited = rateLimit(req, "contact", { limit: 10, windowMs: 60_000 });
    if (limited) return limited;

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
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

    const contact = await db.contact.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        company: data.company || null,
        subject: data.subject,
        message: data.message,
        source: data.source,
        status: "new",
      },
    });

    await audit({
      action: AUDIT_ACTIONS.CREATE_CONTACT,
      entity: "contact",
      entityId: contact.id,
      metadata: { email: data.email, source: data.source },
      ip: req.headers.get("x-forwarded-for") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    return NextResponse.json(
      {
        data: { id: contact.id },
        message: "Mensaje recibido exitosamente",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[api/contact] Error:", error);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 },
    );
  }
}
