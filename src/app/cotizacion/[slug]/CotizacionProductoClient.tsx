"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { FileText, Banknote } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { QuoteForm } from "@/components/shared/QuoteForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function CotizacionProductoPage({ slug }: { slug: string }) {
  return (
    <PageTransition>
      <CotizacionProductoContent slug={slug} />
    </PageTransition>
  );
}

function CotizacionProductoContent({ slug }: { slug: string }) {
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container-amc py-20">
        <Skeleton className="h-10 w-64 mb-4" />
        <div className="grid lg:grid-cols-2 gap-10 mt-8">
          <Skeleton className="aspect-[4/3] rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  return (
    <>
      <PageHero
        overline="Cotización de producto"
        title={`Cotizar: ${product.name}`}
        description="Completa el formulario y recibe una propuesta personalizada para este equipo en menos de 24 horas hábiles."
        icon={FileText}
      />

      <div className="container-amc py-10">
        <Breadcrumb
          items={[
            { label: "Productos", href: "/productos" },
            { label: product.name, href: `/productos/${product.slug}` },
            { label: "Cotización" },
          ]}
        />
      </div>

      <section className="container-amc pb-20">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          {/* Product summary */}
          <FadeIn>
            <div className="card-base overflow-hidden sticky top-24">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-surface-2 flex items-center justify-center">
                {product.images?.[0]?.url ? (
                   
                  <img src={product.images[0].url} alt={product.images[0].alt} className="w-full h-full object-contain p-8" />
                ) : (
                  <Banknote className="w-32 h-32 text-secondary" strokeWidth={1} />
                )}
              </div>
              <div className="p-6">
                <div className="overline text-muted-foreground mb-1">{product.category.name}</div>
                <h2 className="font-display font-bold text-lg mb-2">{product.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{product.summary}</p>

                {product.price && (
                  <div className="mb-4">
                    <div className="overline text-muted-foreground mb-1">Precio referencial</div>
                    <div className="font-display text-2xl font-bold text-primary">
                      S/ {product.price.toLocaleString("es-PE")}
                      <span className="text-sm font-normal text-muted-foreground ml-2">+ IGV</span>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU</span>
                    <span className="font-mono font-semibold">{product.sku}</span>
                  </div>
                  {product.brand && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Marca</span>
                      <span className="font-semibold">{product.brand.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Garantía</span>
                    <span className="font-semibold">12 meses</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.1}>
            <div className="card-base p-6 lg:p-8">
              <h2 className="font-display font-bold text-xl mb-2">Datos de cotización</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Completa tus datos y te enviaremos la propuesta personalizada.
              </p>
              <QuoteForm
                productName={product.name}
                productId={product.id}
                source="cotizacion"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
