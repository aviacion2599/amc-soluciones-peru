import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * Footer corporativo AMC — 4 columnas con datos de contacto,
 * links de navegación, redes sociales y bottom bar legal.
 * Cumple con estructura semántica HTML5 y accesibilidad.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Productos",
      links: [
        { label: "Contadoras de Billetes", href: "/categorias/contadoras-de-billetes" },
        { label: "Contadoras de Monedas", href: "/categorias/contadoras-de-monedas" },
        { label: "Clasificadoras", href: "/categorias/clasificadoras" },
        { label: "Detectores", href: "/categorias/detectores" },
        { label: "Todos los Productos", href: "/productos" },
      ],
    },
    {
      title: "Servicio Técnico",
      links: [
        { label: "Reparación", href: "/servicio-tecnico#servicios" },
        { label: "Calibración", href: "/servicio-tecnico#servicios" },
        { label: "Diagnóstico", href: "/servicio-tecnico#servicios" },
        { label: "Mantenimiento Preventivo", href: "/servicio-tecnico#servicios" },
        { label: "Garantía", href: "/servicio-tecnico#servicios" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Nosotros", href: "/nosotros" },
        { label: "Blog", href: "/blog" },
        { label: "Preguntas Frecuentes", href: "/faq" },
        { label: "Contacto", href: "/contacto" },
        { label: "Solicitar Cotización", href: "/cotizacion" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: AMCCONFIG.social.facebook, label: "Facebook" },
    { icon: Instagram, href: AMCCONFIG.social.instagram, label: "Instagram" },
    { icon: Linkedin, href: AMCCONFIG.social.linkedin, label: "LinkedIn" },
    { icon: Youtube, href: AMCCONFIG.social.youtube, label: "YouTube" },
  ];

  return (
    <footer
      className="bg-navy text-white/70 mt-auto"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="container-amc py-14 lg:py-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-md bg-gold text-gold-foreground font-display font-bold flex items-center justify-center shadow-md">
                AMC
              </div>
              <div>
                <div className="font-display font-bold text-base text-white">
                  {AMCCONFIG.company.brandName}
                </div>
                <div className="overline text-gold/70 mt-0.5">Perú · Cash Handling</div>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-sm">
              {AMCCONFIG.company.description}
            </p>

            {/* Contact data */}
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${AMCCONFIG.contact.phoneRaw}`}
                  className="flex items-center gap-3 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold/70 flex-shrink-0" />
                  <span>{AMCCONFIG.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${AMCCONFIG.contact.email}`}
                  className="flex items-center gap-3 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold/70 flex-shrink-0" />
                  <span>{AMCCONFIG.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold/70 flex-shrink-0 mt-0.5" />
                <span>{AMCCONFIG.contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold/70 flex-shrink-0 mt-0.5" />
                <div>
                  <div>{AMCCONFIG.schedule.weekdays}</div>
                  <div>{AMCCONFIG.schedule.saturday}</div>
                </div>
              </li>
            </ul>

            {/* Social links */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`AMC en ${s.label}`}
                  className="w-9 h-9 rounded-md bg-white/5 hover:bg-gold/20 hover:text-gold flex items-center justify-center transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-display font-semibold text-white text-sm mb-4">
                {col.title}
              </h2>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-gold hover:translate-x-1 inline-block transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {year} {AMCCONFIG.company.legalName}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <span>Servicio Técnico Autorizado GLORY · Desde 2010</span>
            <span className="hidden sm:inline">·</span>
            <span>+51 984 569 125</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
