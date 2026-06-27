import { BRANDS } from "@/lib/site-config";

/**
 * BrandsStrip — Strip de marcas que AMC representa.
 */
export function BrandsStrip() {
  return (
    <section className="py-16" aria-label="Marcas que representamos">
      <div className="container-amc">
        <p className="overline text-muted-foreground text-center mb-8">
          Marcas que representamos
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 lg:gap-x-12 gap-y-6">
          {BRANDS.map((b) => (
            <li
              key={b}
              className="font-display font-bold text-2xl lg:text-3xl text-muted-foreground hover:text-primary transition-colors cursor-default"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
