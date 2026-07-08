"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Banknote, Filter, X, SlidersHorizontal } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem, HeroReveal, HeroRevealItem, SlideIn } from "@/components/shared/Motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";


interface Product {
  id: string;
  slug: string;
  name: string;
  summary: string;
  sku: string;
  price: number | null;
  currency: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  category: { slug: string; name: string };
  brand: { slug: string; name: string } | null;
  images: { url: string; alt: string }[];
}

interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
}

interface Brand {
  id: string;
  slug: string;
  name: string;
}

const SORT_OPTIONS = [
  { value: "destacados", label: "Destacados primero" },
  { value: "recientes", label: "Más recientes" },
  { value: "nombre", label: "Nombre A-Z" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
];

export default function ProductosPage() {
  return (
    <PageTransition>
      <ProductosContent />
    </PageTransition>
  );
}

function ProductosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const [filters, setFilters] = React.useState({
    categoria: searchParams.get("categoria") || "",
    marca: searchParams.get("marca") || "",
    destacado: searchParams.get("destacado") === "true",
    nuevo: searchParams.get("nuevo") === "true",
    q: searchParams.get("q") || "",
    sort: searchParams.get("sort") || "destacados",
  });

  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  // Load categories and brands on mount
  React.useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/brands").then((r) => r.json()),
    ]).then(([catsRes, brandsRes]) => {
      setCategories(catsRes.data || []);
      setBrands(brandsRes.data || []);
    });
  }, []);

  // Load products when filters change
  React.useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.categoria) params.set("categoria", filters.categoria);
    if (filters.marca) params.set("marca", filters.marca);
    if (filters.destacado) params.set("destacado", "true");
    if (filters.nuevo) params.set("nuevo", "true");
    if (filters.q) params.set("q", filters.q);
    params.set("sort", filters.sort);
    params.set("page", String(pagination.page));
    params.set("limit", String(pagination.limit));

    // Update URL
    router.push(`/productos?${params.toString()}`, { scroll: false });

    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((res) => {
        setProducts(res.data || []);
        setPagination((prev) => ({ ...prev, ...res.pagination }));
        setLoading(false);
      });
     
  }, [filters, pagination.page, pagination.limit]);

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      categoria: "",
      marca: "",
      destacado: false,
      nuevo: false,
      q: "",
      sort: "destacados",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const hasActiveFilters =
    filters.categoria || filters.marca || filters.destacado || filters.nuevo || filters.q;

  return (
    <div className="overflow-x-hidden">
      {/* ===== CUSTOM PRODUCT HERO ===== */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 70% 50%, rgba(56, 130, 246, 0.12), transparent 70%), radial-gradient(ellipse 60% 60% at 30% 30%, rgba(176, 176, 176, 0.10), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="container-amc relative py-16 lg:py-24 pt-24 lg:pt-28">
          <div className="grid lg:grid-cols-[1fr_0.55fr] gap-8 lg:gap-4 items-center">
            {/* LEFT — Text content */}
            <HeroReveal className="max-w-2xl order-2 lg:order-1">
              <HeroRevealItem className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-md flex items-center justify-center bg-white/10 text-sky-200">
                  <Banknote className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <span className="overline text-slate-300">CATÁLOGO COMPLETO</span>
              </HeroRevealItem>

              <HeroRevealItem>
                <h1 className="display-1 mb-5 text-balance text-white" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
                  Equipos profesionales para{" "}
                  <span className="bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
                    manejo de efectivo
                  </span>
                </h1>
              </HeroRevealItem>

              <HeroRevealItem>
                <p className="text-base sm:text-lg leading-relaxed max-w-xl text-slate-300">
                  Explora nuestra gama completa de contadoras, clasificadoras, detectores y accesorios. Cada equipo con ficha técnica detallada, garantía oficial y soporte técnico especializado.
                </p>
              </HeroRevealItem>
            </HeroReveal>

            {/* RIGHT — Equipment composition (hidden on mobile, shown lg+) */}
            <div className="hidden lg:block order-2">
              <SlideIn from="right" delay={0.2}>
                <div className="relative w-full" style={{ maxWidth: '420px', marginLeft: 'auto' }}>
                  {/* Blue glow behind machines */}
                  <div
                    className="absolute inset-0 rounded-full blur-3xl opacity-40"
                    style={{ background: 'radial-gradient(circle, rgba(56, 130, 246, 0.35), transparent 70%)' }}
                    aria-hidden="true"
                  />

                  {/* AMC-3200 — behind left, slightly smaller */}
                  <div className="absolute" style={{ bottom: '10%', left: '-5%', width: '58%', zIndex: 1 }}>
                    <img
                      src="/equip/amc-3200.png"
                      alt="AMC-3200"
                      className="w-full h-auto object-contain"
                      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35)) brightness(1.1)', opacity: 0.75, mixBlendMode: 'screen' }}
                    />
                  </div>

                  {/* AMC-9100 — right, professional line */}
                  <div className="absolute" style={{ bottom: '5%', right: '-8%', width: '55%', zIndex: 1 }}>
                    <img
                      src="/equip/amc-9100.png"
                      alt="AMC-9100"
                      className="w-full h-auto object-contain"
                      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3)) brightness(1.1)', opacity: 0.7, mixBlendMode: 'screen' }}
                    />
                  </div>

                  {/* AMC-2000 — FRONT, main, larger */}
                  <div className="relative" style={{ width: '70%', margin: '0 auto', zIndex: 2 }}>
                    <img
                      src="/equip/amc-2000.png"
                      alt="AMC-2000"
                      className="w-full h-auto object-contain"
                      style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.45)) brightness(1.15)', mixBlendMode: 'screen' }}
                    />
                  </div>
                </div>
              </SlideIn>
            </div>

            {/* MOBILE — Equipment images above title, max 2, mix-blend-mode for transparent look */}
            <div className="lg:hidden order-1 flex justify-center gap-3 mb-4 px-4">
              <FadeIn delay={0.1}>
                <div className="relative" style={{ width: '46%' }}>
                  <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-30"
                    style={{ background: 'radial-gradient(circle, rgba(56, 130, 246, 0.4), transparent 70%)' }}
                    aria-hidden="true"
                  />
                  <img
                    src="/equip/amc-2000.png"
                    alt="AMC-2000"
                    className="relative w-full h-auto object-contain"
                    style={{ filter: 'drop-shadow(0 6px 18px rgba(56,130,246,0.3)) brightness(1.15)', mixBlendMode: 'screen' }}
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.25}>
                <div className="relative" style={{ width: '46%' }}>
                  <img
                    src="/equip/amc-3200.png"
                    alt="AMC-3200"
                    className="w-full h-auto object-contain"
                    style={{ filter: 'drop-shadow(0 6px 18px rgba(56,130,246,0.25)) brightness(1.1)', opacity: 0.8, mixBlendMode: 'screen' }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/40 to-transparent" />
      </section>
      {/* ===== END CUSTOM PRODUCT HERO ===== */}

      <div className="container-amc py-6 sm:py-10">
        <Breadcrumb
          items={[
            { label: "Productos" },
          ]}
        />

        <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 mt-4 lg:mt-6">
          {/* Sidebar filtros — desktop */}
          <aside className="hidden lg:block sticky top-24 self-start space-y-6">
            <FiltersPanel
              categories={categories}
              brands={brands}
              filters={filters}
              updateFilter={updateFilter}
              clearFilters={clearFilters}
              hasActiveFilters={!!hasActiveFilters}
            />
          </aside>

          {/* Mobile filters drawer */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}>
              <div
                className="absolute right-0 top-0 bottom-0 w-80 max-w-[85%] bg-background p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold">Filtros</h3>
                  <button onClick={() => setShowMobileFilters(false)} aria-label="Cerrar">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FiltersPanel
                  categories={categories}
                  brands={brands}
                  filters={filters}
                  updateFilter={updateFilter}
                  clearFilters={clearFilters}
                  hasActiveFilters={!!hasActiveFilters}
                />
              </div>
            </div>
          )}

          {/* Main content */}
          <div>
            {/* Toolbar — compact mobile */}
            <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-border">
              <div className="text-xs sm:text-sm text-muted-foreground">
                {loading ? (
                  <span>Cargando...</span>
                ) : (
                  <span>
                    <strong className="text-foreground">{pagination.total}</strong> producto{pagination.total !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden btn-outline px-2.5 py-1.5 text-xs"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline ml-1">Filtros</span>
                </button>
                <Select value={filters.sort} onValueChange={(v) => updateFilter("sort", v)}>
                  <SelectTrigger className="w-auto min-w-[140px] sm:w-[200px] h-8 sm:h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value} className="text-xs">
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products grid — mobile-first: 1 col, sm: 2 col, lg: 3 col */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <FadeIn>
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">No se encontraron productos</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Intenta ajustar los filtros o limpiar la búsqueda.
                  </p>
                  <Button onClick={clearFilters} variant="outline" size="sm">
                    Limpiar filtros
                  </Button>
                </div>
              </FadeIn>
            ) : (
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map((p, idx) => (
                  <StaggerItem key={p.id}>
                    <ProductCard
                      name={p.name}
                      slug={p.slug}
                      category={p.category.name}
                      categorySlug={p.category.slug}
                      tag={p.isBestSeller ? "Más vendido" : p.isNew ? "Nuevo" : p.isFeatured ? "Destacado" : undefined}
                      tagVariant={p.isBestSeller ? "success" : p.isNew ? "primary" : "warning"}
                      isNew={p.isNew}
                      brand={p.brand?.name}
                      summary={p.summary}
                      featured={idx === 0}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <FadeIn className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.page || pagination.page === 1}
                  onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground px-4">
                  Página {pagination.page} de {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                >
                  Siguiente
                </Button>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FiltersPanel({
  categories,
  brands,
  filters,
  updateFilter,
  clearFilters,
  hasActiveFilters,
}: {
  categories: Category[];
  brands: Brand[];
  filters: any;
  updateFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-sm flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-primary hover:text-primary-dark"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Categorías */}
      <div>
        <h4 className="overline text-muted-foreground mb-3">Categoría</h4>
        <div className="space-y-1.5">
          <button
            onClick={() => updateFilter("categoria", "")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              !filters.categoria
                ? "bg-primary-tint text-primary font-medium"
                : "hover:bg-muted text-muted-foreground"
            }`}
          >
            Todas
          </button>
          {categories.map((c) => {
            const Icon = (LucideIcons as any)[c.icon] || Banknote;
            return (
              <button
                key={c.id}
                onClick={() => updateFilter("categoria", c.slug)}
                className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.categoria === c.slug
                    ? "bg-primary-tint text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Marcas */}
      {brands.length > 0 && (
        <div>
          <h4 className="overline text-muted-foreground mb-3">Marca</h4>
          <div className="space-y-1.5">
            <button
              onClick={() => updateFilter("marca", "")}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                !filters.marca
                  ? "bg-primary-tint text-primary font-medium"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              Todas
            </button>
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => updateFilter("marca", b.slug)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.marca === b.slug
                    ? "bg-primary-tint text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Flags */}
      <div>
        <h4 className="overline text-muted-foreground mb-3">Estado</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={filters.destacado}
              onChange={(e) => updateFilter("destacado", e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span>Solo destacados</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={filters.nuevo}
              onChange={(e) => updateFilter("nuevo", e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span>Solo novedades</span>
          </label>
        </div>
      </div>
    </div>
  );
}
