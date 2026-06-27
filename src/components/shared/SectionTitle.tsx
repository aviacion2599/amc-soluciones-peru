import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SectionTitleProps {
  overline?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  icon?: LucideIcon;
  className?: string;
}

/**
 * SectionTitle — Componente estandarizado para encabezados de sección.
 * Mantiene consistencia tipográfica en todo el sitio.
 */
export function SectionTitle({
  overline,
  title,
  description,
  align = "left",
  icon: Icon,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {overline && (
        <div
          className={cn(
            "flex items-center gap-2 mb-3",
            align === "center" && "justify-center",
          )}
        >
          {Icon && (
            <div className="w-8 h-8 rounded-md bg-primary-tint text-primary flex items-center justify-center">
              <Icon className="w-4 h-4" strokeWidth={1.75} />
            </div>
          )}
          <span className="overline text-muted-foreground">{overline}</span>
        </div>
      )}
      <h2 className="display-2 text-foreground mb-4 text-balance">{title}</h2>
      {description && (
        <p className="text-base text-muted-foreground leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
