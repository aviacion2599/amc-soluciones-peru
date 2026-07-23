"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

/** Map category slug → product image (transparent PNG) */
const CATEGORY_IMAGE: Record<string, string> = {
  "contadoras-billetes": "/images/products/contadora-billetes.png",
  "contadoras-de-billetes": "/images/products/contadora-billetes.png",
  "contadoras-monedas": "/images/products/contadora-monedas.png",
  "clasificadoras-billetes": "/images/products/clasificadora-billetes.png",
  "detectores-falsificacion": "/images/products/detector-billetes.png",
  "linea-esencial": "/images/products/contadora-billetes.png",
};

interface CarouselProduct {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  brand?: string;
  tag?: string;
  image?: string;
}

interface ProductCarouselProps {
  products: CarouselProduct[];
  autoplayInterval?: number;
}

export function ProductCarousel({
  products,
  autoplayInterval = 2200,
}: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
  });

  const [paused, setPaused] = React.useState(false);

  // Autoplay — ALL devices
  React.useEffect(() => {
    if (!emblaApi || paused) return;
    const id = setInterval(() => emblaApi.scrollNext(), autoplayInterval);
    return () => clearInterval(id);
  }, [emblaApi, paused, autoplayInterval]);

  if (!products.length) return null;

  return (
    <section
      className="relative overflow-hidden bg-[#0B132B] py-8 sm:py-12 lg:py-12 2xl:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => {
        // Resume after 3s on mobile
        setTimeout(() => setPaused(false), 3000);
      }}
    >
      {/* Subtle background effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/[0.06] rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-amc relative">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Nuestros Equipos
            </h2>
            <p className="text-sm text-white/40 mt-1">
              Scroll automático — toca para pausar
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-white/30">Auto</span>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product) => {
            const imgSrc = product.image ||
              CATEGORY_IMAGE[product.categorySlug] ||
              CATEGORY_IMAGE["contadoras-billetes"];

            return (
              <div
                key={product.id}
                className="flex-[0_0_78%] min-w-0 sm:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_24%]"
              >
                <div className="px-1.5 sm:px-2.5 lg:px-3">
                  <Link
                    href={`/productos/${product.slug}`}
                    className="relative block bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] hover:border-blue-400/30 transition-all duration-300 group overflow-hidden"
                  >
                    {/* Tag — TOP RIGHT, absolute positioned */}
                    {product.tag && (
                      <span className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-500/20 text-blue-300">
                        {product.tag}
                      </span>
                    )}

                    {/* Image — fixed 1:1 aspect ratio */}
                    <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
                      <Image
                        src={imgSrc}
                        alt={product.name}
                        fill
                        className="object-contain p-3 sm:p-4 lg:p-5 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 40vw, 22vw"
                        unoptimized={imgSrc.startsWith('/uploads/')}
                      />
                    </div>

                    {/* Info — centered, consistent padding */}
                    <div className="px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-4 text-center">
                      <h3 className="text-white font-display font-bold text-xs sm:text-sm lg:text-base line-clamp-1 group-hover:text-blue-300 transition-colors">
                        {product.name}
                      </h3>
                      {product.brand && (
                        <p className="text-[10px] sm:text-xs text-white/35 mt-0.5 sm:mt-1">
                          {product.brand}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}