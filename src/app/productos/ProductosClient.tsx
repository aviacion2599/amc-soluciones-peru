"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Banknote, Filter, X, SlidersHorizontal, ChevronDown, LayoutGrid, List } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/Motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCarousel } from "@/components/product/ProductCarousel";
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
  const [mobileColumns, setMobileColumns] = React.useState<1 | 2>(1);

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
      {/* ===== FULL-BLEED PRODUCT HERO ===== */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#080e1a] pt-[62px] sm:pt-[68px] pb-[80px] sm:pb-0">
        {/* Background image — desktop: horizontal, mobile: vertical.
            Starts at the very top (behind transparent header) */}
        <picture className="absolute inset-0">
          <source
            media="(min-width: 768px)"
            srcSet="/productos-hero-desktop.webp"
            type="image/webp"
          />
          <img
            src="/productos-hero-mobile.webp"
            alt="AMC Soluciones Perú — Equipos profesionales para manejo de efectivo"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] md:object-center"
          />
        </picture>

        {/* Multi-layer overlay for depth + readability (aligned to picture area below header) */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Base dark veil */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/30" />
          {/* Left-to-right text readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/20 md:from-black/60 md:via-transparent md:to-black/30" />
          {/* Bottom fade — no white */}
          <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Blue accent glow */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.06] rounded-full blur-3xl" />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Top edge gradient for transparent header blend */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative w-full py-16 sm:py-20 lg:py-0 lg:pb-16 pt-8 sm:pt-12 lg:pt-0 px-6 sm:px-8">
          <div className="container-amc">
            <div className="max-w-2xl mx-auto lg:mx-auto text-center">
              {/* Overline */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 justify-center lg:justify-start">
                <div className="w-8 h-px bg-gold" />
                <span className="overline text-gold tracking-widest">CATÁLOGO COMPLETO</span>
                <div className="w-8 h-px bg-gold" />
              </div>

              {/* Headline */}
              <h1 className="display-2 text-white mb-5 sm:mb-6">
                Equipos profesionales para{" "}
                <span className="bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                  manejo de efectivo
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-xl mb-8 sm:mb-10 mx-auto lg:mx-0">
                Explora nuestra gama completa de contadoras, clasificadoras, detectores y accesorios. Cada equipo con ficha técnica detallada, garantía oficial y soporte técnico especializado.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="#productos-grid"
                  className="btn-glass px-5 py-2.5 text-sm"
                >
                  Ver catálogo
                  <Banknote className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/51984569125?text=Hola%20AMC%2C%20quiero%20información%20sobre%20productos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-5 py-2.5 text-sm bg-white text-primary hover:bg-slate-100"
                  style={{ backgroundColor: "white", color: "var(--primary)" }}
                >
                  <Banknote className="w-4 h-4" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator — Ver más */}
        <button
          onClick={() => {
            const el = document.getElementById("productos-grid");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors"
          aria-label="Ver más productos"
        >
          <span className="text-[10px] sm:text-xs tracking-widest uppercase">Ver más</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>
      {/* ===== END FULL-BLEED PRODUCT HERO ===== */}

      {/* ===== PRODUCT IMAGE CAROUSEL ===== */}
      {!loading && products.length > 0 && (
        <ProductCarousel
          products={products.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            categorySlug: p.category.slug,
            brand: p.brand?.name || undefined,
            tag: p.isBestSeller ? "Más vendido" : p.isNew ? "Nuevo" : p.isFeatured ? "Destacado" : undefined,
            image: p.images?.[0]?.url || undefined,
          }))}
        />
      )}
      {/* ===== END PRODUCT IMAGE CAROUSEL ===== */}

      <div id="productos-grid" className="container-amc py-6 sm:py-10">
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
                {/* Column toggle — mobile only */}
                <div className="flex lg:hidden border border-border rounded-md overflow-hidden">
                  <button
                    onClick={() => setMobileColumns(1)}
                    className={`p-1.5 transition-colors ${mobileColumns === 1 ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
                    aria-label="1 columna"
                    title="1 columna"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setMobileColumns(2)}
                    className={`p-1.5 transition-colors ${mobileColumns === 2 ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
                    aria-label="2 columnas"
                    title="2 columnas"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
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

            {/* Products grid — mobile: toggleable 1/2 col, sm: 2 col, lg: 3 col */}
            {/* Full-width on mobile: break out of container padding */}
            <div className="-mx-[14px] sm:mx-0">
            {loading ? (
              <div className={`grid ${mobileColumns === 1 ? "grid-cols-1 gap-0 sm:gap-5" : "grid-cols-2 gap-3"} sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6`}>
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
              <StaggerContainer className={`grid ${mobileColumns === 1 ? "grid-cols-1 gap-0 sm:gap-5" : "grid-cols-2 gap-3"} sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6`}>
                {products.map((p, idx) => (
                  <StaggerItem key={p.id} className="h-full">
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
                      image={p.images?.[0]?.url || undefined}
                      className={mobileColumns === 1 ? "rounded-none sm:rounded-xl" : ""}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            </div>
            {/* End full-width wrapper */}

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
