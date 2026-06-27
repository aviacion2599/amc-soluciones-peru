import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { z } from "zod";

const configUpdateSchema = z.object({
  key: z.string().min(2).max(50),
  value: z.string().max(10000),
});

/** GET /api/admin/config — Toda la configuración del sitio */
export async function GET() {
  const access = await can("config", "read");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const configs = await db.siteConfig.findMany();
  const data: Record<string, unknown> = {};
  for (const c of configs) {
    try {
      data[c.key] = JSON.parse(c.value);
    } catch {
      data[c.key] = c.value;
    }
  }

  return NextResponse.json({ data });
}

/** PUT /api/admin/config — Actualizar un valor de configuración */
export async function PUT(req: NextRequest) {
  const access = await can("config", "update");
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const body = await req.json();
  const parsed = configUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { key, value } = parsed.data;

  // Serializar a JSON si es objeto
  const stringValue =
    typeof value === "string" ? value : JSON.stringify(value);

  const config = await db.siteConfig.upsert({
    where: { key },
    update: { value: stringValue },
    create: { key, value: stringValue },
  });

  await audit({
    userId: access.user.id,
    action: AUDIT_ACTIONS.UPDATE_CONFIG,
    entity: "config",
    entityId: config.id,
    metadata: { key },
    ip: req.headers.get("x-forwarded-for") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  });

  return NextResponse.json({ data: config });
}
