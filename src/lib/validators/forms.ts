import { z } from "zod";

/**
 * Validador de cotización — compartido entre cliente y servidor.
 * Garantiza que los datos enviados por el formulario público sean válidos
 * antes de llegar a la API. La misma schema se usa en /api/quotes.
 */
export const quoteSchema = z.object({
  customerName: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  customerEmail: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Ingrese un email válido"),
  customerPhone: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .regex(/^[+0-9\s()-]+$/, "El teléfono solo puede contener números, espacios y +()"),
  customerCompany: z
    .string()
    .max(150, "La empresa no puede exceder 150 caracteres")
    .optional()
    .or(z.literal("")),
  customerRUC: z
    .string()
    .max(15, "El RUC no puede exceder 15 caracteres")
    .optional()
    .or(z.literal("")),
  productId: z.string().optional().or(z.literal("")),
  productName: z.string().optional().or(z.literal("")),
  quantity: z
    .number()
    .int("La cantidad debe ser un entero")
    .min(1, "La cantidad mínima es 1")
    .max(999, "La cantidad máxima es 999")
    .default(1),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres"),
  source: z
    .enum(["home", "productos", "producto-detalle", "cotizacion", "servicio-tecnico", "contacto"])
    .default("home"),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

/**
 * Validador de contacto — formulario general de la página /contacto.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Ingrese un email válido"),
  phone: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .regex(/^[+0-9\s()-]+$/, "Formato de teléfono inválido")
    .optional()
    .or(z.literal("")),
  company: z.string().max(150).optional().or(z.literal("")),
  subject: z
    .string()
    .min(3, "El asunto debe tener al menos 3 caracteres")
    .max(150, "El asunto no puede exceder 150 caracteres"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres"),
  source: z.enum(["contacto", "servicio-tecnico", "nosotros"]).default("contacto"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Validador de solicitud de servicio técnico.
 */
export const serviceRequestSchema = z.object({
  customerName: z.string().min(3).max(100),
  customerEmail: z.string().email("Email inválido"),
  customerPhone: z.string().min(7).max(20),
  equipmentModel: z.string().min(2, "Indique el modelo del equipo").max(100),
  issueType: z.enum([
    "diagnostico",
    "reparacion",
    "calibracion",
    "mantenimiento-preventivo",
    "garantia",
    "otro",
  ]),
  description: z.string().min(10).max(2000),
  preferredDate: z.string().optional().or(z.literal("")),
});

export type ServiceRequestData = z.infer<typeof serviceRequestSchema>;
