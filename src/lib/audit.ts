import { db } from "@/lib/db";

interface AuditParams {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
}

/**
 * Registra una entrada en el audit log.
 * Uso: await audit({ userId, action: "CREATE_PRODUCT", entity: "product", entityId: id, metadata: { name } })
 */
export async function audit(params: AuditParams) {
  try {
    await db.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        metadata: params.metadata ? JSON.stringify(params.metadata) : null,
        ip: params.ip,
        userAgent: params.userAgent,
      },
    });
  } catch (error) {
    console.error("[audit] Error writing audit log:", error);
  }
}

/** Acciones predefinidas para mantener consistencia. */
export const AUDIT_ACTIONS = {
  // Auth
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGOUT: "LOGOUT",
  // Products
  CREATE_PRODUCT: "CREATE_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  PUBLISH_PRODUCT: "PUBLISH_PRODUCT",
  // Categories
  CREATE_CATEGORY: "CREATE_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
  // Brands
  CREATE_BRAND: "CREATE_BRAND",
  UPDATE_BRAND: "UPDATE_BRAND",
  DELETE_BRAND: "DELETE_BRAND",
  // Quotes
  CREATE_QUOTE: "CREATE_QUOTE",
  UPDATE_QUOTE_STATUS: "UPDATE_QUOTE_STATUS",
  ASSIGN_QUOTE: "ASSIGN_QUOTE",
  DELETE_QUOTE: "DELETE_QUOTE",
  // Contacts
  CREATE_CONTACT: "CREATE_CONTACT",
  UPDATE_CONTACT_STATUS: "UPDATE_CONTACT_STATUS",
  DELETE_CONTACT: "DELETE_CONTACT",
  // Users
  CREATE_USER: "CREATE_USER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
  // Config
  UPDATE_CONFIG: "UPDATE_CONFIG",
  // Files
  UPLOAD_FILE: "UPLOAD_FILE",
  DELETE_FILE: "DELETE_FILE",
} as const;
