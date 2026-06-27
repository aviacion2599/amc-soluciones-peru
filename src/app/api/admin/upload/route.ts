import { NextRequest, NextResponse } from "next/server";
import { can } from "@/lib/auth-server";
import { audit, AUDIT_ACTIONS } from "@/lib/audit";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// MIME types permitidos por categoría
const ALLOWED_MIME: Record<string, string[]> = {
  image: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
  document: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  video: ["video/mp4", "video/webm"],
};

const MAX_SIZE: Record<string, number> = {
  image: 5 * 1024 * 1024, // 5MB
  document: 20 * 1024 * 1024, // 20MB
  video: 100 * 1024 * 1024, // 100MB
};

/**
 * POST /api/admin/upload
 * Body: multipart/form-data
 *  - file: el archivo a subir
 *  - category: "image" | "document" | "video"
 *  - subdir: subdirectorio opcional (ej: "products/{id}")
 *
 * Response: { data: { url, filename, size, mimeType } }
 */
export async function POST(req: NextRequest) {
  const access = await can("product", "create"); // Cualquier rol que pueda crear productos puede subir archivos
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "image";
    const subdir = (formData.get("subdir") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "Archivo no proporcionado" }, { status: 400 });
    }

    if (!ALLOWED_MIME[category]) {
      return NextResponse.json({ error: "Categoría no válida" }, { status: 400 });
    }

    if (!ALLOWED_MIME[category].includes(file.type)) {
      return NextResponse.json(
        {
          error: `Tipo de archivo no permitido. Permitidos: ${ALLOWED_MIME[category].join(", ")}`,
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE[category]) {
      return NextResponse.json(
        {
          error: `Archivo demasiado grande. Máximo ${MAX_SIZE[category] / 1024 / 1024}MB para ${category}`,
        },
        { status: 400 },
      );
    }

    // Generar nombre seguro
    const ext = path.extname(file.name).toLowerCase().slice(0, 10);
    const safeName = `${randomUUID()}${ext}`;
    const targetDir = subdir
      ? path.join(UPLOAD_DIR, category, subdir)
      : path.join(UPLOAD_DIR, category);
    const targetPath = path.join(targetDir, safeName);
    const publicUrl = `/uploads/${category}${subdir ? `/${subdir}` : ""}/${safeName}`;

    // Crear directorio si no existe
    await mkdir(targetDir, { recursive: true });

    // Escribir archivo
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(targetPath, buffer);

    await audit({
      userId: access.user.id,
      action: AUDIT_ACTIONS.UPLOAD_FILE,
      entity: "file",
      entityId: publicUrl,
      metadata: {
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
        category,
        url: publicUrl,
      },
      ip: req.headers.get("x-forwarded-for") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    return NextResponse.json(
      {
        data: {
          url: publicUrl,
          filename: safeName,
          originalName: file.name,
          size: file.size,
          mimeType: file.type,
          category,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[api/admin/upload] Error:", error);
    return NextResponse.json({ error: "Error al subir archivo" }, { status: 500 });
  }
}
