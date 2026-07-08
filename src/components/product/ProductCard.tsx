import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AMCCONFIG } from "@/lib/site-config";

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
  summary?: string;
  className?: string;
}

const tagClassMap: Record<TagVariant, string> = {
  success: "badge-success",
  primary: "badge-primary",
  warning: "badge-warning",
  error: "badge-error",
  neutral: "badge-neutral",
};

/** Map category slug → equipment SVG (transparent background) */
const CATEGORY_SVG: Record<string, string> = {
  "contadoras-billetes": "/equip/contadora-billetes.svg",
  "contadoras-de-billetes": "/equip/contadora-billetes.svg",
  "contadoras-monedas": "/equip/contadora-monedas.svg",
  "clasificadoras-billetes": "/equip/clasificadora-billetes.svg",
  "detectores-falsificacion": "/equip/detector-billetes.svg",
};

/**
 * ProductCard — Mobile-first, single-column card.
 * Large transparent equipment SVG, clean hierarchy, full-width CTA.
 * Reference: category cards layout (icon → title → description → CTA).
 */
export function ProductCard({
  name,
  slug,
  category,
  categorySlug,
  tag,
  tagVariant = "primary",
  brand = "AMC",
  summary,
  className,
}: ProductCardProps) {
  const detailHref = `/productos/${slug}`;
  const quoteHref = `/cotizacion/${slug}`;

  const waMessage = encodeURIComponent(
    `Hola AMC, quiero cotizar el equipo ${name} (${category}).`,
  );
  const waHref = `https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${waMessage}`;

  const svgSrc = (categorySlug && CATEGORY_SVG[categorySlug]) || CATEGORY_SVG["contadoras-billetes"];

  return (
    <article
      className={cn(
        "card-base overflow-hidden group flex flex-col",
        className,
      )}
    >
      {/* Equipment image — large, transparent SVG */}
      <Link
        href={detailHref}
        className="relative flex items-center justify-center px-6 pt-8 pb-4 sm:px-8 sm:pt-10 sm:pb-6 bg-gradient-to-b from-muted/30 to-transparent overflow-hidden"
        aria-label={`Ver detalles de ${name}`}
      >
        {/* Tag badge */}
        {tag && (
          <span
            className={cn(
              "absolute top-3 left-3 z-10",
              tagClassMap[tagVariant],
            )}
          >
            {tag}
          </span>
        )}

        {/* Large equipment illustration */}
        <img
          src={svgSrc}
          alt={name}
          className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 object-contain text-primary/20 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Card body — mobile-first text layout */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 flex flex-col flex-1">
        {/* Category label */}
        <div className="overline text-muted-foreground mb-1.5">{category}</div>

        {/* Product name */}
        <Link
          href={detailHref}
          className="font-display font-bold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors leading-tight"
        >
          {name}
        </Link>

        {/* Brand */}
        {brand && (
          <p className="text-xs text-muted-foreground mb-3">{brand}</p>
        )}

        {/* Summary if available */}
        {summary && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
            {summary}
          </p>
        )}

        {/* Actions — full width CTA */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <Link
            href={detailHref}
            className="btn-primary flex-1 py-2.5 text-sm justify-center"
          >
            Ver detalles
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-md border border-border hover:border-success/40 hover:bg-success/5 hover:text-success transition-colors flex-shrink-0"
            aria-label={`Cotizar ${name} por WhatsApp`}
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </article>
  );
}