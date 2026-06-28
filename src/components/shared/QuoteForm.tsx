"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";
import { quoteSchema, type QuoteFormData } from "@/lib/validators/forms";
import { AMCCONFIG } from "@/lib/site-config";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface QuoteFormProps {
  productName?: string;
  productId?: string;
  source?: QuoteFormData["source"];
  variant?: "default" | "compact";
  className?: string;
}

/**
 * QuoteForm — Formulario principal de cotización.
 * Validación cliente + servidor con Zod. Toast feedback al submit.
 * Acción: envía a /api/quotes (Fase 4) — por ahora simula éxito.
 * Alterna con WhatsApp directo como alternativa de conversión.
 */
export function QuoteForm({
  productName,
  productId,
  source = "home",
  variant = "default",
  className,
}: QuoteFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerCompany: "",
      customerRUC: "",
      productId: productId || "",
      productName: productName || "",
      quantity: 1,
      message: productName
        ? `Solicito cotización para el equipo ${productName}.`
        : "",
      source,
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al enviar la cotización");
      }

      const result = await res.json();

      toast({
        title: "¡Solicitud enviada con éxito!",
        description: `Referencia: ${result.data.reference}. Nuestro equipo de ventas te contactará en menos de 24 horas hábiles al ${data.customerPhone}.`,
        duration: 6000,
      });

      // WhatsApp deep-link como reforzador de conversión
      const waMessage = encodeURIComponent(
        `Hola AMC, soy ${data.customerName}. ` +
          (productName ? `Solicito cotización para ${productName}. ` : "") +
          `Mensaje: ${data.message}. ` +
          `Email: ${data.customerEmail} · Tel: ${data.customerPhone}`,
      );
      window.open(
        `https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${waMessage}`,
        "_blank",
        "noopener",
      );

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description:
          "Hubo un problema. Por favor inténtalo de nuevo o contáctanos por WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
          aria-label="Formulario de solicitud de cotización"
        >
          {productName && (
            <div className="bg-primary-tint border border-primary/20 rounded-md p-3 mb-2">
              <div className="overline text-primary mb-1">Producto seleccionado</div>
              <div className="font-display font-semibold text-foreground text-sm">
                {productName}
              </div>
            </div>
          )}

          <div className={variant === "compact" ? "space-y-4" : "grid sm:grid-cols-2 gap-4"}>
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Juan Pérez"
                      autoComplete="name"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email corporativo *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="juan@empresa.com"
                      autoComplete="email"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={variant === "compact" ? "space-y-4" : "grid sm:grid-cols-2 gap-4"}>
            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono / WhatsApp *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+51 999 888 777"
                      autoComplete="tel"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa (opcional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mi Empresa SAC"
                      autoComplete="organization"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cuéntanos sobre tu necesidad operativa: volumen de efectivo, divisas, horarios, etc."
                    rows={4}
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trust signals + actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 py-3 text-base"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Solicitar Cotización
                </>
              )}
            </Button>
            <a
              href={`https://wa.me/${AMCCONFIG.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 py-3 text-base"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp directo
            </a>
          </div>

          {/* Trust note */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground pt-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
            <span>
              Respuesta garantizada en menos de 24 horas hábiles. Tus datos están
              protegidos y no serán compartidos con terceros.
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
