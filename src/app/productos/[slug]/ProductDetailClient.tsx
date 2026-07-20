"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import {
  Banknote,
  ShieldCheck,
  Wrench,
  FileText,
  MessageCircle,
  CheckCircle2,
  Download,
  Maximize2,
} from "lucide-react";
import { FadeIn } from "@/components/shared/Motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { QuoteForm } from "@/components/shared/QuoteForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AMCCONFIG } from "@/lib/site-config";
import { Lightbox, useLightbox, type LightboxImage } from "@/components/shared/Lightbox";
import * as LucideIcons from "lucide-react";

/* ── Types ────────────────────────────────────────── */

interface ProductDetail {
  id: string;
  slug: string;
  sku: string;
  name: string;
  summary: string;
  description: string;
  price: number | null;
  currency: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  category: { slug: string; name: string; description: string; icon: string };
  brand: { slug: string; name: string; logo: string | null } | null;
  images: { id: string; url: string; alt: string; isPrimary: boolean }[];
  videos: { id: string; url: string; provider: string; title: string | null }[];
  documents: { id: string; url: string; type: string; title: string; size: number | null }[];
  features: { id: string; title: string; description: string | null; icon: string | null }[];
  specifications: { id: string; group: string; key: string; value: string }[];
  applications: { id: string; name: string; description: string | null }[];
  seoTitle: string | null;
  seoDescription: string | null;
}

interface Related {
  id: string;
  slug: string;
  name: string;
  summary: string;
  isFeatured: boolean;
  isNew: boolean;
  category?: { slug: string; name: string } | null;
  images?: { url: string; alt: string }[];
}

/* ── Export ───────────────────────────────────────── */

export default function ProductDetailClient({ slug }: { slug: string }) {
  return (
    <div className="min-h-screen">
      <ProductDetailContent slug={slug} />
    </div>
  );
}

/* ── Content ─────────────────────────────────────── */

function ProductDetailContent({ slug }: { slug: string }) {
  const [product, setProduct] = React.useState<ProductDetail | null>(null);
  const [related, setRelated] = React.useState<Related[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [showQuoteForm, setShowQuoteForm] = React.useState(false);

  /* Lightbox */
  const lightboxImages: LightboxImage[] = React.useMemo(
    () =>
      product?.images.map((img) => ({
        src: img.url,
        fullSrc: img.url,
        alt: img.alt,
        title: product!.name,
      })) || [],
    [product],
  );
  const { isOpen: lbOpen, open: lbOpenFn, close: lbClose, activeIndex: lbIndex } =
    useLightbox(lightboxImages);

  /* Fetch */
  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((res) => {
        setProduct(res.data);
        setRelated(res.related || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="pt-[62px] sm:pt-[68px]">
        <div className="container-amc py-6">
          <Skeleton className="h-4 w-64 mb-6" />
        </div>
        <div className="container-amc pb-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-10 w-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) notFound();

  const waMessage = encodeURIComponent(
    `Hola AMC, quiero cotizar el equipo ${product!.name} (SKU: ${product!.sku}).`,
  );
  const waHref = `https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${waMessage}`;

  const p = product!;

  const specsByGroup = p.specifications.reduce(
    (acc, s) => {
      if (!acc[s.group]) acc[s.group] = [];
      acc[s.group].push(s);
      return acc;
    },
    {} as Record<string, typeof p.specifications>,
  );

  /* JSON-LD */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.summary,
    sku: p.sku,
    brand: p.brand ? { "@type": "Brand", name: p.brand.name } : { "@type": "Brand", name: "AMC" },
    category: p.category.name,
    offers: p.price
      ? {
          "@type": "Offer",
          price: p.price,
          priceCurrency: p.currency,
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "AMC Soluciones Perú" },
        }
      : undefined,
    featureList: p.features.map((f) => f.title),
  };

  /* ── Render ── */
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── 1. Top spacing for fixed header ─── */}
      <div className="h-[62px] sm:h-[68px]" aria-hidden="true" />

      {/* ─── 2. Breadcrumb ─── */}
      <div className="container-amc pb-4 sm:pb-5">
        <Breadcrumb
          items={[
            { label: "Productos", href: "/productos" },
            { label: p.category.name, href: `/productos?categoria=${p.category.slug}` },
            { label: p.name },
          ]}
        />
      </div>

      {/* ─── 3. Main product: Gallery + Info ─── */}
      <section className="container-amc pb-8 lg:pb-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">

          {/* ── Gallery column ── */}
          <div className="min-w-0">
            {/* Main image */}
            <div
              className="relative aspect-[3/4] sm:aspect-square rounded-xl overflow-hidden border border-border cursor-zoom-in product-img-bg"
              onClick={() => p.images.length > 0 && lbOpenFn(selectedImage)}
            >
              {p.images[selectedImage] ? (
                <>
                  <img
                    src={p.images[selectedImage].url}
                    alt={p.images[selectedImage].alt}
                    className="w-full h-full object-contain p-4 sm:p-6"
                    loading="lazy"
                  />
                  {/* Zoom hint — desktop only */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-sm text-white/70 text-xs px-2.5 py-1 rounded-full items-center gap-1.5 hidden sm:flex pointer-events-none">
                    <Maximize2 className="w-3 h-3" />
                    Clic para ampliar
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Banknote className="w-20 h-20 sm:w-24 sm:h-24 text-secondary" strokeWidth={1} />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1.5">
                {p.isBestSeller && <span className="badge-success text-[10px] sm:text-xs">Más vendido</span>}
                {p.isNew && <span className="badge-primary text-[10px] sm:text-xs">Nuevo</span>}
                {p.isFeatured && !p.isBestSeller && !p.isNew && (
                  <span className="badge-warning text-[10px] sm:text-xs">Destacado</span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {p.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none pb-1">
                {p.images.map((img, i) => (
                  <button
                    key={img.id || i}
                    onClick={() => setSelectedImage(i)}
                    onDoubleClick={() => lbOpenFn(i)}
                    className={`flex-shrink-0 w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-lg overflow-hidden border-2 transition-colors product-img-bg ${
                      selectedImage === i ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                    title={`${img.alt} — doble clic para ampliar`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
              {[
                { icon: ShieldCheck, label: "Garantía 12m", color: "text-success" },
                { icon: Wrench, label: "Soporte téc.", color: "text-primary" },
                { icon: CheckCircle2, label: "Repuestos orig.", color: "text-primary" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="text-center p-2 sm:p-3 rounded-lg bg-muted/40 border border-border"
                >
                  <b.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${b.color} mx-auto mb-1`} />
                  <div className="text-[10px] sm:text-xs font-medium leading-tight">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Info column ── */}
          <div className="min-w-0">
            <div className="overline text-muted-foreground mb-1 sm:mb-1.5">{p.category.name}</div>
            <h1 className="display-2 text-foreground mb-2 sm:mb-3 text-2xl sm:text-3xl lg:text-4xl">{p.name}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {p.summary}
            </p>

            {/* SKU + Brand */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
              <div>
                <span className="font-mono">SKU: </span>
                <span className="font-mono font-semibold text-foreground">{p.sku}</span>
              </div>
              {p.brand && (
                <div>
                  <span>Marca: </span>
                  <span className="font-semibold text-foreground">{p.brand.name}</span>
                </div>
              )}
            </div>

            {/* Price */}
            {p.price ? (
              <div className="mb-5">
                <div className="overline text-muted-foreground mb-1">Precio referencial</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-primary">
                  S/ {p.price.toLocaleString("es-PE")}
                  <span className="text-sm font-normal text-muted-foreground ml-2">+ IGV</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Cotiza para obtener el precio final con descuentos por volumen.
                </p>
              </div>
            ) : (
              <div className="mb-5 p-3.5 sm:p-4 bg-primary-tint rounded-lg border border-primary/20">
                <p className="text-sm font-semibold text-primary">Precio bajo cotización</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Solicita tu cotización personalizada según volumen y necesidades.
                </p>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-5">
              <Button
                onClick={() => setShowQuoteForm(!showQuoteForm)}
                size="lg"
                className="btn-primary flex-1"
              >
                <FileText className="w-4 h-4" />
                Solicitar Cotización
              </Button>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 py-3 text-center text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp directo
              </a>
            </div>

            {/* Quick features */}
            {p.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {p.features.slice(0, 4).map((f) => {
                  const Icon = (LucideIcons as any)[f.icon || "CheckCircle2"] || CheckCircle2;
                  return (
                    <div key={f.id} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/40">
                      <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-foreground">{f.title}</div>
                        {f.description && (
                          <div className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                            {f.description}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── 4. Quote form (collapsible) ─── */}
      {showQuoteForm && (
        <FadeIn>
          <section className="container-amc pb-8">
            <div className="card-base p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
              <h3 className="font-display font-bold text-base sm:text-lg mb-2">Cotizar: {p.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5">
                Completa el formulario y recibe una propuesta personalizada en menos de 24 horas hábiles.
              </p>
              <QuoteForm productName={p.name} productId={p.id} source="producto-detalle" />
            </div>
          </section>
        </FadeIn>
      )}

      {/* ─── 5. Tabs: features, specs, applications, documents, videos ─── */}
      {hasTabContent(p) && (
        <section className="border-t border-border">
          <div className="container-amc py-6 sm:py-8 lg:py-10">
            <Tabs defaultValue={firstTab(p)} className="w-full">
              <TabsList className="w-full justify-start flex-wrap h-auto p-1 bg-muted/40">
                {p.features.length > 0 && (
                  <TabsTrigger value="features" className="data-[state=active]:bg-background text-xs sm:text-sm">
                    Características
                  </TabsTrigger>
                )}
                {p.specifications.length > 0 && (
                  <TabsTrigger value="specs" className="data-[state=active]:bg-background text-xs sm:text-sm">
                    Especificaciones
                  </TabsTrigger>
                )}
                {p.applications.length > 0 && (
                  <TabsTrigger value="applications" className="data-[state=active]:bg-background text-xs sm:text-sm">
                    Aplicaciones
                  </TabsTrigger>
                )}
                {p.documents.length > 0 && (
                  <TabsTrigger value="documents" className="data-[state=active]:bg-background text-xs sm:text-sm">
                    Documentos
                  </TabsTrigger>
                )}
                {p.videos.length > 0 && (
                  <TabsTrigger value="videos" className="data-[state=active]:bg-background text-xs sm:text-sm">
                    Videos
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Features */}
              {p.features.length > 0 && (
                <TabsContent value="features" className="mt-5 sm:mt-6">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {p.features.map((f) => {
                      const Icon = (LucideIcons as any)[f.icon || "CheckCircle2"] || CheckCircle2;
                      return (
                        <div key={f.id} className="card-base p-3.5 sm:p-5">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary-tint text-primary flex items-center justify-center mb-2.5 sm:mb-3">
                            <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.75} />
                          </div>
                          <h3 className="font-display font-semibold text-sm sm:text-base mb-1 sm:mb-1.5">
                            {f.title}
                          </h3>
                          {f.description && (
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              )}

              {/* Specs */}
              {p.specifications.length > 0 && (
                <TabsContent value="specs" className="mt-5 sm:mt-6">
                  <div className="space-y-5 sm:space-y-6">
                    {Object.entries(specsByGroup).map(([group, specs]) => (
                      <div key={group}>
                        <h3 className="font-display font-bold text-sm sm:text-base lg:text-lg mb-2.5 sm:mb-3 pb-2 border-b border-border">
                          {group}
                        </h3>
                        <dl className="divide-y divide-border">
                          {specs.map((s) => (
                            <div key={s.id} className="grid grid-cols-2 py-2.5 text-sm">
                              <dt className="text-xs sm:text-sm text-muted-foreground">{s.key}</dt>
                              <dd className="font-mono font-semibold text-xs sm:text-sm text-foreground text-right">{s.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}

              {/* Applications */}
              {p.applications.length > 0 && (
                <TabsContent value="applications" className="mt-5 sm:mt-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {p.applications.map((a) => (
                      <div key={a.id} className="card-base p-3.5 sm:p-5">
                        <div className="font-display font-semibold text-sm sm:text-base mb-1 sm:mb-1.5">
                          {a.name}
                        </div>
                        {a.description && (
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{a.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}

              {/* Documents */}
              {p.documents.length > 0 && (
                <TabsContent value="documents" className="mt-5 sm:mt-6">
                  <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
                    {p.documents.map((d) => (
                      <a
                        key={d.id}
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 sm:p-4 card-base"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-error/10 text-error flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs sm:text-sm truncate">{d.title}</div>
                          <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                            {d.type === "ficha"
                              ? "Ficha técnica"
                              : d.type === "manual"
                                ? "Manual de usuario"
                                : d.type === "garantia"
                                  ? "Documento de garantía"
                                  : "Certificado"}{" "}
                            {d.size && `· ${(d.size / 1024 / 1024).toFixed(2)} MB`}
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </TabsContent>
              )}

              {/* Videos */}
              {p.videos.length > 0 && (
                <TabsContent value="videos" className="mt-5 sm:mt-6">
                  <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                    {p.videos.map((v) => (
                      <div key={v.id} className="card-base overflow-hidden">
                        <div className="aspect-video bg-slate-950">
                          {v.provider === "youtube" ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${v.url}`}
                              title={v.title || "Video del producto"}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : v.provider === "vimeo" ? (
                            <iframe
                              src={`https://player.vimeo.com/video/${v.url}`}
                              title={v.title || "Video del producto"}
                              className="w-full h-full"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video controls className="w-full h-full">
                              <source src={v.url} />
                            </video>
                          )}
                        </div>
                        {v.title && <div className="p-3 sm:p-3.5 text-xs sm:text-sm font-medium">{v.title}</div>}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </section>
      )}

      {/* ─── 6. Description ─── */}
      <section className="border-t border-border">
        <div className="container-amc py-6 sm:py-8 lg:py-10">
          <div className="grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-8">
            <div>
              <h2 className="display-3 mb-3 sm:mb-4">Descripción detallada</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {p.description}
              </p>
            </div>
            <aside className="hidden lg:block">
              <div className="card-base p-4 sm:p-5 sticky top-24">
                <h3 className="font-display font-semibold text-sm mb-2">¿Necesitas ayuda?</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Nuestros especialistas están listos para asesorarte.
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── 7. Related products ─── */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="container-amc py-6 sm:py-8 lg:py-10">
            <h2 className="display-3 mb-4 sm:mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {related.map((r) => (
                <ProductCard
                  key={r.id}
                  name={r.name}
                  slug={r.slug}
                  category={r.category?.name || ""}
                  categorySlug={r.category?.slug || ""}
                  tag={r.isFeatured ? "Destacado" : r.isNew ? "Nuevo" : undefined}
                  tagVariant={r.isFeatured ? "warning" : "primary"}
                  isNew={r.isNew}
                  image={r.images?.[0]?.url || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 8. Mobile CTA (sticky bottom) ─── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border p-3 flex gap-2.5">
        <Button
          onClick={() => setShowQuoteForm(!showQuoteForm)}
          className="btn-primary flex-1 py-3 text-sm"
        >
          <FileText className="w-4 h-4" />
          Cotizar
        </Button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1 py-3 text-center text-sm flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 lg:hidden" />

      {/* ─── Lightbox ─── */}
      <Lightbox images={lightboxImages} isOpen={lbOpen} onClose={lbClose} initialIndex={lbIndex} />
    </>
  );
}

/* ── Helpers ─────────────────────────────────────── */

function hasTabContent(p: ProductDetail) {
  return (
    p.features.length > 0 ||
    p.specifications.length > 0 ||
    p.applications.length > 0 ||
    p.documents.length > 0 ||
    p.videos.length > 0
  );
}

function firstTab(p: ProductDetail) {
  if (p.features.length > 0) return "features";
  if (p.specifications.length > 0) return "specs";
  if (p.applications.length > 0) return "applications";
  if (p.documents.length > 0) return "documents";
  return "videos";
}