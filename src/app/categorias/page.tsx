"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Banknote } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  _count: { products: number };
}

export default function CategoriasPage() {
  return (
    <PageTransition>
      <CategoriasContent />
    </PageTransition>
  );
}

function CategoriasContent() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((res) => {
        setCategories(res.data || []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHero
        overline="Catálogo"
        title={
          <>
            Categorías especializadas en{" "}
            <span className="bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
              manejo de efectivo
            </span>
          </>
        }
        description="Explora nuestras categorías de equipos para conteo, clasificación, detección y mantenimiento de billetes y monedas. Cada categoría incluye productos profesionales con garantía oficial."
        icon={Banknote}
      />

      <div className="container-amc py-10">
        <Breadcrumb items={[{ label: "Categorías" }]} />

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/2] rounded-xl" />
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {categories.map((c) => {
              const Icon = (LucideIcons as any)[c.icon || "Banknote"] || Banknote;
              return (
                <StaggerItem key={c.id}>
                  <Link
                    href={`/categorias/${c.slug}`}
                    className="group card-base card-hover p-7 block h-full"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-14 h-14 rounded-lg bg-primary-tint text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-7 h-7" strokeWidth={1.6} />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                        {c._count.products} modelos
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {c.description || "Explora nuestra selección de equipos profesionales."}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Ver productos
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>
    </>
  );
}
