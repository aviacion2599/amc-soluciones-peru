"use client";

import * as React from "react";
import { notFound, useRouter } from "next/navigation";
import {
  Banknote,
  ShieldCheck,
  Wrench,
  FileText,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  PlayCircle,
  Download,
  Star,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem, SlideIn } from "@/components/shared/Motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { QuoteForm } from "@/components/shared/QuoteForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AMCCONFIG } from "@/lib/site-config";
import { Lightbox, useLightbox, type LightboxImage } from "@/components/shared/Lightbox";
import * as LucideIcons from "lucide-react";

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

export default function ProductDetailClient({ slug }: { slug: string }) {
  return (
    <PageTransition>
      <ProductDetailContent slug={slug} />
    </PageTransition>
  );
}

function ProductDetailContent({ slug }: { slug: string }) {
  const [product, setProduct] = React.useState<ProductDetail | null>(null);
  const [related, setRelated] = React.useState<Related[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [showQuoteForm, setShowQuoteForm] = React.useState(false);
  const [hoverZoom, setHoverZoom] = React.useState(false);
  const [zoomPos, setZoomPos] = React.useState({ x: 50, y: 50 });
  const mainImgRef = React.useRef<HTMLDivElement>(null);

  // Lightbox
  const lightboxImages: LightboxImage[] = React.useMemo(() =>
    product?.images.map((img) => ({
      src: img.url,
      fullSrc: img.url,
      alt: img.alt,
      title: product!.name,
    })) || [],
    [product]
  );
  const { isOpen: lbOpen, open: lbOpen, close: lbClose, activeIndex: lbIndex } = useLightbox(lightboxImages);

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

  if (loading) {
    return (
      <div className="container-amc py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-[4/3] rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  const waMessage = encodeURIComponent(
    `Hola AMC, quiero cotizar el equipo ${product!.name} (SKU: ${product!.sku}).`,
  );
  const waHref = `https://wa.me/${AMCCONFIG.contact.whatsapp}?text=${waMessage}`;

  // Agrupar specs por grupo
  const p = product!;
  const specsByGroup = p.specifications.reduce((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
    return acc;
  }, {} as Record<string, typeof p.specifications>);

  // JSON-LD Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.summary,
    sku: p.sku,
    brand: p.brand
      ? { "@type": "Brand", name: p.brand.name }
      : { "@type": "Brand", name: "AMC" },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-amc py-6">
        <Breadcrumb
          items={[
            { label: "Productos", href: "/productos" },
            { label: p.category.name, href: `/productos?categoria=${p.category.slug}` },
            { label: p.name },
          ]}
        />
      </div>

      {/* Main product section */}
      <section className="container-amc pb-12">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <SlideIn from="left">
            <div className="space-y-4">
              {/* Main image — click to open lightbox, hover to zoom */}
              <div
                ref={mainImgRef}
                className="relative aspect-square bg-gradient-to-br from-muted to-surface-2 rounded-xl overflow-hidden flex items-center justify-center border border-border cursor-zoom-in"
                onClick={() => p.images.length > 0 && lbOpen(selectedImage)}
                onMouseEnter={() => setHoverZoom(true)}
                onMouseLeave={() => setHoverZoom(false)}
                onMouseMove={(e) => {
                  if (!mainImgRef.current) return;
                  const rect = mainImgRef.current.getBoundingClientRect();
                  setZoomPos({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                  });
                }}
              >
                {p.images[selectedImage] ? (
                  <>
                    {/* Normal view */}
                    <img
                      src={p.images[selectedImage].url}
                      alt={p.images[selectedImage].alt}
                      className={`w-full h-full object-contain p-8 transition-opacity duration-200 ${hoverZoom ? 'opacity-0' : 'opacity-100'}`}
                      loading="lazy"
                    />
                    {/* Zoom view */}
                    {hoverZoom && (
                      <div
                        className="absolute inset-0 bg-no-repeat bg-cover transition-transform duration-75"
                        style={{
                          backgroundImage: `url(${p.images[selectedImage].url})`,
                          backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                          backgroundSize: '200%',
                        }}
                      />
                    )}
                    {/* Zoom hint */}
                    <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white/70 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 pointer-events-none sm:flex hidden">
                      <Maximize2 className="w-3 h-3" />
                      Clic para ampliar
                    </div>
                  </>
                ) : (
                  <Banknote className="w-32 h-32 text-secondary" strokeWidth={1} />
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {p.isBestSeller && (
                    <span className="badge-success">Más vendido</span>
                  )}
                  {p.isNew && (
                    <span className="badge-primary">Nuevo</span>
                  )}
                  {p.isFeatured && !p.isBestSeller && !p.isNew && (
                    <span className="badge-warning">Destacado</span>
                  )}
                </div>
              </div>

              {/* Thumbnails — click to select, double-click to open lightbox */}
              {p.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {p.images.map((img, i) => (
                    <button
                      key={img.id || i}
                      onClick={() => setSelectedImage(i)}
                      onDoubleClick={() => lbOpen(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
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
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="text-center p-3 rounded-md bg-muted/40 border border-border">
                  <ShieldCheck className="w-5 h-5 text-success mx-auto mb-1" />
                  <div className="text-xs font-medium">Garantía 12m</div>
                </div>
                <div className="text-center p-3 rounded-md bg-muted/40 border border-border">
                  <Wrench className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xs font-medium">Soporte téc.</div>
                </div>
                <div className="text-center p-3 rounded-md bg-muted/40 border border-border">
                  <CheckCircle2 className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xs font-medium">Repuestos orig.</div>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Product info */}
          <SlideIn from="right">
            <div>
              <div className="overline text-muted-foreground mb-2">{p.category.name}</div>
              <h1 className="display-2 text-foreground mb-3">{p.name}</h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {p.summary}
              </p>

              {/* SKU + Brand */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
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
                <div className="mb-6">
                  <div className="overline text-muted-foreground mb-1">Precio referencial</div>
                  <div className="font-display text-3xl font-bold text-primary">
                    S/ {p.price.toLocaleString("es-PE")}
                    <span className="text-sm font-normal text-muted-foreground ml-2">+ IGV</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cotiza para obtener el precio final con descuentos por volumen.
                  </p>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-primary-tint rounded-md border border-primary/20">
                  <p className="text-sm font-semibold text-primary">
                    Precio bajo cotización
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Solicita tu cotización personalizada según volumen y necesidades.
                  </p>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
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
                  className="btn-secondary flex-1 py-3"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp directo
                </a>
              </div>

              {/* Quick features preview */}
              {p.features.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {p.features.slice(0, 4).map((f) => {
                    const Icon = (LucideIcons as any)[f.icon || "CheckCircle2"] || CheckCircle2;
                    return (
                      <div key={f.id} className="flex items-start gap-2 p-3 rounded-md bg-muted/40">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                        <div>
                          <div className="text-xs font-semibold text-foreground">{f.title}</div>
                          {f.description && (
                            <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
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
          </SlideIn>
        </div>
      </section>

      {/* Quote form (collapsible) */}
      {showQuoteForm && (
        <FadeIn>
          <section id="quote-form" className="container-amc pb-12 scroll-mt-20">
            <div className="card-base p-6 lg:p-8 max-w-3xl mx-auto">
              <h3 className="font-display font-bold text-lg mb-2">
                Cotizar: {p.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Completa el formulario y recibe una propuesta personalizada en menos de 24 horas hábiles.
              </p>
              <QuoteForm productName={p.name} productId={p.id} source="producto-detalle" />
            </div>
          </section>
        </FadeIn>
      )}

      {/* Tabs: features, specs, applications, documents, videos */}
      <section className="container-amc py-12 border-t border-border">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="w-full justify-start flex-wrap h-auto p-1 bg-muted/40">
            {p.features.length > 0 && (
              <TabsTrigger value="features" className="data-[state=active]:bg-background">
                Características
              </TabsTrigger>
            )}
            {p.specifications.length > 0 && (
              <TabsTrigger value="specs" className="data-[state=active]:bg-background">
                Especificaciones
              </TabsTrigger>
            )}
            {p.applications.length > 0 && (
              <TabsTrigger value="applications" className="data-[state=active]:bg-background">
                Aplicaciones
              </TabsTrigger>
            )}
            {p.documents.length > 0 && (
              <TabsTrigger value="documents" className="data-[state=active]:bg-background">
                Documentos
              </TabsTrigger>
            )}
            {p.videos.length > 0 && (
              <TabsTrigger value="videos" className="data-[state=active]:bg-background">
                Videos
              </TabsTrigger>
            )}
          </TabsList>

          {/* Features tab */}
          {p.features.length > 0 && (
            <TabsContent value="features" className="mt-8">
              <StaggerContainer className="grid sm:grid-cols-2 gap-5">
                {p.features.map((f) => {
                  const Icon = (LucideIcons as any)[f.icon || "CheckCircle2"] || CheckCircle2;
                  return (
                    <StaggerItem key={f.id}>
                      <div className="card-base card-hover p-5 h-full">
                        <div className="w-10 h-10 rounded-md bg-primary-tint text-primary flex items-center justify-center mb-3">
                          <Icon className="w-5 h-5" strokeWidth={1.75} />
                        </div>
                        <h3 className="font-display font-semibold text-base mb-2">{f.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </TabsContent>
          )}

          {/* Specs tab */}
          {p.specifications.length > 0 && (
            <TabsContent value="specs" className="mt-8">
              <div className="space-y-8">
                {Object.entries(specsByGroup).map(([group, specs]) => (
                  <FadeIn key={group}>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-4 pb-2 border-b border-border">
                        {group}
                      </h3>
                      <dl className="divide-y divide-border">
                        {specs.map((s) => (
                          <div key={s.id} className="grid grid-cols-2 py-3 text-sm">
                            <dt className="text-muted-foreground">{s.key}</dt>
                            <dd className="font-mono font-semibold text-foreground text-right">
                              {s.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </TabsContent>
          )}

          {/* Applications tab */}
          {p.applications.length > 0 && (
            <TabsContent value="applications" className="mt-8">
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {p.applications.map((a) => (
                  <StaggerItem key={a.id}>
                    <div className="card-base p-5 h-full">
                      <div className="font-display font-semibold text-base mb-2">{a.name}</div>
                      {a.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {a.description}
                        </p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TabsContent>
          )}

          {/* Documents tab */}
          {p.documents.length > 0 && (
            <TabsContent value="documents" className="mt-8">
              <div className="space-y-3 max-w-2xl">
                {p.documents.map((d) => (
                  <a
                    key={d.id}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 card-base card-hover"
                  >
                    <div className="w-10 h-10 rounded-md bg-error/10 text-error flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{d.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {d.type === "ficha" ? "Ficha técnica" : d.type === "manual" ? "Manual de usuario" : d.type === "garantia" ? "Documento de garantía" : "Certificado"} 
                        {d.size && ` · ${(d.size / 1024 / 1024).toFixed(2)} MB`}
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </a>
                ))}
              </div>
            </TabsContent>
          )}

          {/* Videos tab */}
          {p.videos.length > 0 && (
            <TabsContent value="videos" className="mt-8">
              <div className="grid sm:grid-cols-2 gap-5">
                {p.videos.map((v) => (
                  <div key={v.id} className="card-base overflow-hidden">
                    <div className="aspect-video bg-slate-950 flex items-center justify-center">
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
                    {v.title && (
                      <div className="p-4 text-sm font-medium">{v.title}</div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </section>

      {/* Description (rich text) */}
      <section className="container-amc py-12 border-t border-border">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          <div>
            <h2 className="display-3 mb-6">Descripción detallada</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {p.description}
              </p>
            </div>
          </div>
          <aside className="space-y-4">
            <div className="card-base p-5">
              <h3 className="font-display font-semibold text-sm mb-3">¿Necesitas ayuda?</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Nuestros especialistas están listos para asesorarte.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-2.5 text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="container-amc py-12 border-t border-border">
          <h2 className="display-3 mb-8">Productos relacionados</h2>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((r) => (
              <StaggerItem key={r.id}>
                <ProductCard
                  name={r.name}
                  slug={r.slug}
                  category={r.category?.name || ""}
                  categorySlug={r.category?.slug || ""}
                  tag={r.isFeatured ? "Destacado" : r.isNew ? "Nuevo" : undefined}
                  tagVariant={r.isFeatured ? "warning" : "primary"}
                  isNew={r.isNew}
                  image={r.images?.[0]?.url || undefined}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        isOpen={lbOpen}
        onClose={lbClose}
        initialIndex={lbIndex}
      />
    </>
  );
}
