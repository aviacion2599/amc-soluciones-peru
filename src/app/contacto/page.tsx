"use client";

import * as React from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2, Loader2, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { contactSchema } from "@/lib/validators/forms";
import { AMCCONFIG } from "@/lib/site-config";

export default function ContactoPage() {
  return (
    <PageTransition>
      <ContactoContent />
    </PageTransition>
  );
}

function ContactoContent() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const parsed = contactSchema.safeParse({ ...form, source: "contacto" });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      Object.entries(parsed.error.flatten().fieldErrors).forEach(([k, v]) => {
        if (v && v.length > 0) fieldErrors[k] = v[0];
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al enviar");
      }

      toast({
        title: "¡Mensaje enviado!",
        description: "Nuestro equipo te contactará en menos de 24 horas hábiles.",
        duration: 6000,
      });

      setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });

      // WhatsApp deep-link
      const waMessage = encodeURIComponent(
        `Hola AMC, soy ${form.name}. Asunto: ${form.subject}. Mensaje: ${form.message}`,
      );
      window.open(
        `https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${waMessage}`,
        "_blank",
        "noopener",
      );
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: error.message || "Inténtalo de nuevo o contáctanos por WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        overline="Contacto"
        title={
          <>
            Hablemos sobre{" "}
            <span className="bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
              tu operación
            </span>
          </>
        }
        description="¿Tienes preguntas sobre nuestros productos o servicios? ¿Necesitas asesoría técnica personalizada? Nuestro equipo está listo para ayudarte."
        icon={Mail}
      />

      <div className="container-amc py-10">
        <Breadcrumb items={[{ label: "Contacto" }]} />
      </div>

      <section className="container-amc pb-20">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10">
          {/* Form */}
          <FadeIn>
            <div className="card-base p-6 lg:p-8">
              <h2 className="font-display font-bold text-xl mb-2">Envíanos un mensaje</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Completa el formulario y te responderemos en menos de 24 horas hábiles.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      disabled={isSubmitting}
                      placeholder="Juan Pérez"
                      className="mt-1.5"
                    />
                    {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      disabled={isSubmitting}
                      placeholder="juan@empresa.com"
                      className="mt-1.5"
                    />
                    {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      disabled={isSubmitting}
                      placeholder="+51 999 888 777"
                      className="mt-1.5"
                    />
                    {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company">Empresa (opcional)</Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      disabled={isSubmitting}
                      placeholder="Mi Empresa SAC"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    disabled={isSubmitting}
                    placeholder="¿Sobre qué nos contactas?"
                    className="mt-1.5"
                  />
                  {errors.subject && <p className="text-xs text-error mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    disabled={isSubmitting}
                    placeholder="Cuéntanos qué necesitas..."
                    rows={5}
                    className="mt-1.5"
                  />
                  {errors.message && <p className="text-xs text-error mt-1">{errors.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button type="submit" disabled={isSubmitting} className="btn-primary flex-1 py-3">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                  <a
                    href={`https://wa.me/${AMCCONFIG.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 py-3 text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp directo
                  </a>
                </div>

                <div className="flex items-start gap-2 text-xs text-muted-foreground pt-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                  <span>
                    Respuesta garantizada en menos de 24 horas hábiles. Tus datos están protegidos.
                  </span>
                </div>
              </form>
            </div>
          </FadeIn>

          {/* Contact info sidebar */}
          <FadeIn delay={0.1}>
            <aside className="space-y-6">
              {/* Datos de contacto */}
              <div className="card-base p-6">
                <h3 className="font-display font-semibold text-sm mb-4">Datos de contacto</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`tel:${AMCCONFIG.contact.phoneRaw}`}
                      className="flex items-start gap-3 hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Teléfono</div>
                        <div className="text-sm font-semibold">{AMCCONFIG.contact.phone}</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${AMCCONFIG.contact.email}`}
                      className="flex items-start gap-3 hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <div className="text-sm font-semibold break-all">{AMCCONFIG.contact.email}</div>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Dirección</div>
                      <div className="text-sm font-semibold">{AMCCONFIG.contact.address}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Horario</div>
                      <div className="text-sm font-semibold">{AMCCONFIG.schedule.weekdays}</div>
                      <div className="text-sm text-muted-foreground">{AMCCONFIG.schedule.saturday}</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Redes sociales */}
              <div className="card-base p-6">
                <h3 className="font-display font-semibold text-sm mb-4">Síguenos</h3>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={AMCCONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md border border-border hover:border-primary/40 hover:bg-primary-tint/50 transition-colors text-sm"
                  >
                    <Facebook className="w-4 h-4 text-primary" />
                    Facebook
                  </a>
                  <a
                    href={AMCCONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md border border-border hover:border-primary/40 hover:bg-primary-tint/50 transition-colors text-sm"
                  >
                    <Instagram className="w-4 h-4 text-primary" />
                    Instagram
                  </a>
                  <a
                    href={AMCCONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md border border-border hover:border-primary/40 hover:bg-primary-tint/50 transition-colors text-sm"
                  >
                    <Linkedin className="w-4 h-4 text-primary" />
                    LinkedIn
                  </a>
                  <a
                    href={AMCCONFIG.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md border border-border hover:border-primary/40 hover:bg-primary-tint/50 transition-colors text-sm"
                  >
                    <Youtube className="w-4 h-4 text-primary" />
                    YouTube
                  </a>
                </div>
              </div>

              {/* Mapa placeholder */}
              <div className="card-base overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-muted to-surface-2 flex items-center justify-center p-6">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-3" strokeWidth={1.5} />
                    <div className="font-display font-bold text-sm mb-1">{AMCCONFIG.contact.addressShort}</div>
                    <div className="text-xs text-muted-foreground">{AMCCONFIG.contact.address}</div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(AMCCONFIG.contact.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
