"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Loader2, Banknote } from "lucide-react";
import { AMCCONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/site-config";

interface SearchResult {
  id: string;
  slug: string;
  name: string;
  summary: string;
  category: { slug: string; name: string };
  images?: { url: string; alt: string }[];
}

/**
 * SearchOverlay — Buscador full-screen para mobile.
 *
 * Se activa desde el BottomNav, cubre toda la pantalla
 * con input de búsqueda y resultados en tiempo real.
 */
export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [debounced, setDebounced] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input on open
  React.useEffect(() => {
    if (open) {
      // Small delay for transition to complete
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Reset on close
  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setDebounced("");
    }
  }, [open]);

  // Debounce query
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Search products
  React.useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const params = new URLSearchParams({ q: debounced, limit: "8", sort: "destacados" });
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((res) => {
        setResults(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
      });
  }, [debounced]);

  // Lock body scroll when open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const goToProduct = (slug: string) => {
    onClose();
    router.push(`/productos/${slug}`);
  };

  const goToCategory = (slug: string) => {
    onClose();
    router.push(`/productos?categoria=${slug}`);
  };

  const goToAllResults = () => {
    onClose();
    router.push(`/productos?q=${encodeURIComponent(debounced)}`);
  };

  const showResults = debounced.trim().length > 0;

  // Filter categories that match the query
  const matchedCategories = showResults
    ? CATEGORIES.filter(
        (c) =>
          c.title.toLowerCase().includes(debounced.toLowerCase()) ||
          c.slug.toLowerCase().includes(debounced.toLowerCase()),
      ).slice(0, 3)
    : CATEGORIES.slice(0, 4);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] lg:hidden transition-all duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 bottom-0 bg-background flex flex-col",
          "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        {/* Search bar */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar equipos, productos..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted/60 border border-border text-base placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
              autoComplete="off"
              enterKeyHint="search"
            />
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted/60 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            aria-label="Cerrar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {!showResults ? (
            /* ── Default: Quick access categories ── */
            <div className="p-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Categorías populares
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {matchedCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => goToCategory(cat.slug)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/70 active:scale-[0.98] transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-tight truncate">
                        {cat.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Ver equipos
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick actions */}
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3">
                Accesos rápidos
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => { onClose(); router.push("/servicio-tecnico"); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-muted/60 active:scale-[0.99] transition-all text-left"
                >
                  <div>
                    <div className="text-sm font-semibold">Servicio Técnico</div>
                    <div className="text-[11px] text-muted-foreground">Mantenimiento y reparación</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => { onClose(); router.push("/contacto"); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-muted/60 active:scale-[0.99] transition-all text-left"
                >
                  <div>
                    <div className="text-sm font-semibold">Contacto</div>
                    <div className="text-[11px] text-muted-foreground">
                      {AMCCONFIG.contact.phone} · {AMCCONFIG.contact.addressShort}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ) : (
            /* ── Search results ── */
            <div className="p-4">
              {/* Loading */}
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  <span className="ml-3 text-sm text-muted-foreground">Buscando...</span>
                </div>
              )}

              {/* Results */}
              {!loading && results.length > 0 && (
                <>
                  <div className="text-xs text-muted-foreground mb-3">
                    {results.length} resultado{results.length !== 1 ? "s" : ""}
                  </div>
                  <div className="space-y-2">
                    {results.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => goToProduct(product.slug)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface border border-border/50 hover:bg-muted/60 active:scale-[0.98] transition-all text-left"
                      >
                        {/* Product image thumbnail */}
                        <div className="w-14 h-14 rounded-lg bg-muted flex-shrink-0 overflow-hidden product-img-bg">
                          {product.images?.[0]?.url ? (
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="w-full h-full object-contain p-1.5"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Banknote className="w-6 h-6 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold leading-tight truncate">
                            {product.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                            {product.category.name}
                          </div>
                          {product.summary && (
                            <div className="text-[11px] text-muted-foreground/70 mt-1 line-clamp-1">
                              {product.summary}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                      </button>
                    ))}
                  </div>

                  {/* Ver todos */}
                  <button
                    onClick={goToAllResults}
                    className="w-full mt-4 py-3 rounded-xl border border-border text-sm font-semibold text-primary hover:bg-primary/5 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    Ver todos los resultados
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* No results */}
              {!loading && results.length === 0 && (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-semibold text-base mb-2">Sin resultados</h3>
                  <p className="text-sm text-muted-foreground max-w-[240px] mx-auto mb-6">
                    No encontramos productos para &ldquo;{debounced}&rdquo;. Intenta con otro término.
                  </p>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    Categorías
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => goToCategory(cat.slug)}
                        className="px-3 py-1.5 rounded-full bg-muted/60 text-xs font-medium hover:bg-muted transition-colors"
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}