"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { ArrowRight, Banknote } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { PageTransition, StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriaDetallePage({ slug }: { slug: string }) {
  return (
    <PageTransition>
      <CategoriaDetalleContent slug={slug} />
    </PageTransition>
  );
}

function CategoriaDetalleContent({ slug }: { slug: string }) {
  const [category, setCategory] = React.useState<any>(null);
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch(`/api/products?categoria=${slug}&limit=100`).then((r) => r.json()),
    ])
      .then(([catsRes, prodsRes]) => {
        const cat = (catsRes.data || []).find((c: any) => c.slug === slug);
        if (!cat) {
          setError(true);
          setLoading(false);
          return;
        }
        setCategory(cat);
        setProducts(prodsRes.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container-amc py-10">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !category) {
    notFound();
  }

  const Icon = (LucideIcons as any)[category.icon || "Banknote"] || Banknote;

  return (
    <>
      <PageHero
        overline="Categoría"
        title={category.name}
        description={category.description || "Explora nuestra selección de equipos profesionales."}
        icon={Icon}
      />

      <div className="container-amc py-10">
        <Breadcrumb
          items={[
            { label: "Categorías", href: "/categorias" },
            { label: category.name },
          ]}
        />

        <div className="flex items-baseline justify-between mt-6 mb-8">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{products.length}</strong> producto{products.length !== 1 ? "s" : ""} en esta categoría
          </p>
        </div>

        {products.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Banknote className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Sin productos disponibles</h3>
              <p className="text-sm text-muted-foreground">
                Estamos trabajando en agregar productos a esta categoría. Vuelve pronto.
              </p>
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
      </div>
    </>
  );
}
