import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FEATURED_PRODUCTS } from "@/lib/site-config";

/**
 * FeaturedProducts — Grid de 4 productos destacados.
 * Incluye enlace a catálogo completo.
 * Palabras clave: Precisión, Seguridad
 */
export function FeaturedProducts() {
  return (
    <section id="productos" className="py-20 lg:py-28 scroll-mt-20 bg-surface-2">
      <div className="container-amc">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionTitle
            overline="Productos destacados"
            title={
              <>
                Equipos profesionales para{" "}
                <span className="text-primary">cada operación</span>
              </>
            }
            description="Contadoras de billetes y monedas con precisión certificada y seguridad multi-sensorial. El equipo correcto para cada volumen y tipo de negocio."
          />
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark group self-start lg:self-end"
          >
            Ver catálogo completo
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((p) => (
            <ProductCard key={p.slug} {...p} />
          ))}
        </div>

        {/* Quality guarantee badge */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span>Todos los equipos incluyen garantía oficial, capacitación y soporte postventa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
