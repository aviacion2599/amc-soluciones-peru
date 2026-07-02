import { BRANDS } from "@/lib/site-config";

/**
 * BrandsStrip — Strip de marcas que AMC representa con respaldo internacional.
 */
export function BrandsStrip() {
  return (
    <section id="marcas" className="py-16 bg-muted/30" aria-label="Marcas que representamos">
      <div className="container-amc">
        <p className="overline text-muted-foreground text-center mb-3">
          Experiencia técnica
        </p>
        <h2 className="font-display font-bold text-2xl text-center mb-2">
          Diferentes marcas de procesamiento de efectivo
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          Contamos con experiencia técnica en distintas marcas de equipos de procesamiento de efectivo.
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANDS.map((b) => (
            <li
              key={b.name}
              className="group card-base p-5 text-center hover:border-primary/30 transition-all"
            >
              <div className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                {b.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1 font-mono">
                {b.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
