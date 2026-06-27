import { NextRequest, NextResponse } from "next/server";

/**
 * Rate limiting in-memory para endpoints públicos.
 * Producción: mover a Redis/Upstash. Para launch Vercel es suficiente.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  /** Máximo de requests por ventana. */
  limit?: number;
  /** Ventana en milisegundos. */
  windowMs?: number;
}

const DEFAULTS: Required<RateLimitOptions> = {
  limit: 10,
  windowMs: 60 * 1000, // 1 minuto
};

/**
 * Middleware de rate limiting. Llamar al inicio del handler.
 * @returns null si pasa, NextResponse 429 si excede.
 */
export function rateLimit(
  req: NextRequest,
  identifier: string,
  options: RateLimitOptions = {},
): NextResponse | null {
  const { limit, windowMs } = { ...DEFAULTS, ...options };

  // Identificador compuesto: identifier + IP (para que sea por IP+endpoint)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const key = `${identifier}:${ip}`;

  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  entry.count += 1;
  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      {
        error: "Demasiadas solicitudes",
        message: `Límite de ${limit} solicitudes por minuto excedido. Intente en ${retryAfter}s.`,
        retryAfter,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
        },
      },
    );
  }

  return null;
}

/**
 * Limpieza periódica de entradas expiradas para evitar memory leaks.
 */
export function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, entry] of buckets.entries()) {
    if (entry.resetAt < now) {
      buckets.delete(key);
    }
  }
}

// Ejecutar limpieza cada 5 minutos
if (typeof setInterval !== "undefined") {
  setInterval(cleanupRateLimit, 5 * 60 * 1000).unref?.();
}
