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
  /** URL of the primary product image (from /uploads/products/{slug}/) */
  image?: string;
  /** When true, renders a larger card (first product on mobile) */
  featured?: boolean;
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
  "linea-esencial": "/equip/contadora-billetes.svg",
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
  image,
  featured = false,
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
        "card-base overflow-hidden group flex flex-col h-full",
        className,
      )}
    >
      {/* Product image — real photo with fallback to SVG */}
      <Link
        href={detailHref}
        className={cn(
        "relative flex items-center justify-center product-img-bg overflow-hidden aspect-[3/4] sm:aspect-[4/5]",
      )}
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

        {/* Product image or SVG fallback */}
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <img
            src={svgSrc}
            alt={name}
            className="w-36 h-36 sm:w-44 sm:h-44 object-contain text-primary/20 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
      </Link>

      {/* Card body — mobile-first text layout */}
      <div className="flex flex-col flex-1 px-5 pb-5 sm:px-6 sm:pb-6">
        {/* Category label */}
        <div className="overline text-muted-foreground mb-1.5">{category}</div>

        {/* Product name */}
        <Link
          href={detailHref}
          className="font-display font-bold group-hover:text-primary transition-colors leading-tight text-base sm:text-lg mb-1 line-clamp-1"
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