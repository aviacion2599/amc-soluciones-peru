"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Banknote, Coins, ScanLine, Settings2, Filter, X, SlidersHorizontal } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Banknote as BanknoteIcon } from "lucide-react";

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
    <>
      <PageHero
        overline="Catálogo completo"
        title={
          <>
            Equipos profesionales de{" "}
            <span className="bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
              manejo de efectivo
            </span>
          </>
        }
        description="Explora nuestra gama completa de contadoras, clasificadoras, detectores y accesorios. Cada equipo con ficha técnica detallada, garantía oficial y soporte técnico certificado."
        icon={Banknote}
      />

      <div className="container-amc py-10">
        <Breadcrumb
          items={[
            { label: "Productos" },
          ]}
        />

        <div className="grid lg:grid-cols-[260px_1fr] gap-8 mt-6">
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
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
              <div className="text-sm text-muted-foreground">
                {loading ? (
                  <span>Cargando...</span>
                ) : (
                  <span>
                    <strong className="text-foreground">{pagination.total}</strong> producto{pagination.total !== 1 ? "s" : ""} encontrado{pagination.total !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden btn-outline px-3 py-2 text-xs"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filtros
                </button>
                <Select value={filters.sort} onValueChange={(v) => updateFilter("sort", v)}>
                  <SelectTrigger className="w-[200px] h-9 text-xs">
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

            {/* Products grid */}
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
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
    </>
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
            const Icon = (LucideIcons as any)[c.icon] || BanknoteIcon;
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
