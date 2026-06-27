import Link from "next/link";
import {
  Banknote,
  Coins,
  ScanLine,
  Settings2,
  ArrowRight,
  Eye,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AMCCONFIG } from "@/lib/site-config";
import type { LucideIcon } from "lucide-react";

type TagVariant = "success" | "primary" | "warning" | "error" | "neutral";

interface ProductCardProps {
  name: string;
  slug: string;
  category: string;
  categorySlug?: string;
  tag?: string;
  tagVariant?: TagVariant;
  speed?: string;
  detection?: string;
  capacity?: string;
  warranty?: string;
  isNew?: boolean;
  brand?: string;
  className?: string;
}

const tagClassMap: Record<TagVariant, string> = {
  success: "badge-success",
  primary: "badge-primary",
  warning: "badge-warning",
  error: "badge-error",
  neutral: "badge-neutral",
};

/**
 * ProductCard — Card de producto AMC optimizada para conversión.
 * - Imagen con badge de estado (Más vendido / Nuevo / Premium)
 * - Mini-specs técnicas en mono
 * - Dual CTA: Cotizar (primario) + Ver detalles (outline)
 * - Click card completa → detalle del producto
 */
export function ProductCard({
  name,
  slug,
  category,
  categorySlug,
  tag,
  tagVariant = "primary",
  speed,
  detection,
  capacity,
  warranty,
  isNew,
  brand = "AMC",
  className,
}: ProductCardProps) {
  const detailHref = `/productos/${slug}`;
  const quoteHref = `/cotizacion/${slug}`;

  const waMessage = encodeURIComponent(
    `Hola AMC, quiero cotizar el equipo ${name} (${category}).`,
  );
  const waHref = `https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${waMessage}`;

  return (
    <article
      className={cn(
        "card-base card-hover overflow-hidden group flex flex-col",
        className,
      )}
    >
      {/* Product image area */}
      <Link
        href={detailHref}
        className="relative aspect-[4/3] bg-gradient-to-br from-muted to-surface-2 flex items-center justify-center overflow-hidden"
        aria-label={`Ver detalles de ${name}`}
      >
        <Banknote
          className="w-20 h-20 text-secondary group-hover:scale-110 group-hover:text-primary/40 transition-all duration-500"
          strokeWidth={1}
        />
        {tag && (
          <span
            className={cn(
              "absolute top-3 left-3",
              tagClassMap[tagVariant],
            )}
          >
            {tag}
          </span>
        )}
        {isNew && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
            NEW
          </span>
        )}
      </Link>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="overline text-muted-foreground mb-1">{category}</div>
        <Link
          href={detailHref}
          className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors"
        >
          {name}
        </Link>

        {/* Mini specs */}
        <div className="space-y-1.5 mb-5 text-xs flex-1">
          {speed && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Velocidad</span>
              <span className="font-mono font-semibold text-foreground">{speed}</span>
            </div>
          )}
          {detection && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Detección</span>
              <span className="font-mono font-semibold text-foreground">{detection}</span>
            </div>
          )}
          {capacity && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Capacidad</span>
              <span className="font-mono font-semibold text-foreground">{capacity}</span>
            </div>
          )}
          {warranty && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Garantía</span>
              <span className="font-mono font-semibold text-foreground">{warranty}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <Link
            href={quoteHref}
            className="btn-primary flex-1 py-2 text-xs"
          >
            Cotizar
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md border border-border hover:border-success/40 hover:bg-success/5 hover:text-success transition-colors"
            aria-label={`Cotizar ${name} por WhatsApp`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <Link
            href={detailHref}
            className="p-2 rounded-md border border-border hover:border-primary/40 hover:bg-primary-tint/50 transition-colors"
            aria-label={`Ver detalles de ${name}`}
          >
            <Eye className="w-4 h-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </article>
  );
}
