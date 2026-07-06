import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Breadcrumb visual + accesible. Genera también BreadcrumbList JSON-LD.
 */
export function Breadcrumb({
  items,
  jsonLd = true,
}: {
  items: BreadcrumbItem[];
  jsonLd?: boolean;
}) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://amcsolucionesperu.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      )}
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center flex-wrap gap-1 text-sm">
          <li className="flex items-center gap-1">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center"
              aria-label="Inicio"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
              {item.href && i < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
