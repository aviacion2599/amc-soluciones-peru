import type { Metadata } from "next";
import { Suspense } from "react";
import CotizacionProductoClient from "./CotizacionProductoClient";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({
    where: { slug, isActive: true },
    select: { name: true, summary: true, sku: true },
  });

  if (!product) {
    return { title: "Producto no encontrado", robots: { index: false, follow: false } };
  }

  return {
    title: `Cotizar ${product.name} | AMC Soluciones Perú`,
    description: `Solicita una cotización personalizada para ${product.name}. Respuesta en menos de 24 horas hábiles.`,
    alternates: { canonical: `/cotizacion/${slug}` },
    openGraph: {
      title: `Cotizar ${product.name}`,
      description: product.summary,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const products = await db.product.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div className="container-amc py-20 text-sm text-muted-foreground">Cargando cotización...</div>}>
      <CotizacionProductoClient slug={slug} />
    </Suspense>
  );
}
