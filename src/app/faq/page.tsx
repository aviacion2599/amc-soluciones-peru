"use client";

import * as React from "react";
import { ChevronDown, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AMCCONFIG } from "@/lib/site-config";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = React.useState<FAQ[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<string>("Todas");

  React.useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((res) => {
        setFaqs(res.data || []);
        setLoading(false);
      });
  }, []);

  const categories = React.useMemo(() => {
    const cats = new Set(faqs.map((f) => f.category));
    return ["Todas", ...Array.from(cats)];
  }, [faqs]);

  const filteredFaqs = React.useMemo(() => {
    if (activeCategory === "Todas") return faqs;
    return faqs.filter((f) => f.category === activeCategory);
  }, [faqs, activeCategory]);

  // JSON-LD FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        overline="Preguntas frecuentes"
        title={
          <>
            Resolvemos tus{" "}
            <span className="bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
              dudas
            </span>
          </>
        }
        description="Encuentra respuestas a las preguntas más comunes sobre nuestros productos, servicios técnicos, garantías, envíos y métodos de pago."
        icon={HelpCircle}
      />

      <div className="container-amc py-10">
        <Breadcrumb items={[{ label: "FAQ" }]} />
      </div>

      <section className="container-amc pb-20">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          {/* FAQ list */}
          <div>
            {/* Category filter */}
            {categories.length > 1 && (
              <FadeIn className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary-tint hover:text-primary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Accordion */}
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-16 bg-muted/40 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredFaqs.length === 0 ? (
              <FadeIn>
                <div className="text-center py-20">
                  <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    No hay preguntas en esta categoría.
                  </p>
                </div>
              </FadeIn>
            ) : (
              <StaggerContainer className="space-y-3">
                {filteredFaqs.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <StaggerItem key={faq.id}>
                      <div className="card-base overflow-hidden">
                        <button
                          onClick={() => setOpenId(isOpen ? null : faq.id)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/40 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <div className="flex-1">
                            {activeCategory === "Todas" && (
                              <div className="overline text-primary mb-1">{faq.category}</div>
                            )}
                            <h3 className="font-display font-semibold text-sm">{faq.question}</h3>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                              isOpen ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          <div className="p-5 pt-0 text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-4">
              <div className="card-base p-6">
                <h3 className="font-display font-semibold text-sm mb-2">¿No encuentras tu respuesta?</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Contáctanos directamente y te ayudamos.
                </p>
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/${AMCCONFIG.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-success/40 hover:bg-success/5 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-success" />
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-xs text-muted-foreground">{AMCCONFIG.contact.phone}</div>
                    </div>
                  </a>
                  <a
                    href={`mailto:${AMCCONFIG.contact.email}`}
                    className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary/40 hover:bg-primary-tint/50 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-xs text-muted-foreground truncate">{AMCCONFIG.contact.email}</div>
                    </div>
                  </a>
                  <a
                    href={`tel:${AMCCONFIG.contact.phoneRaw}`}
                    className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary/40 hover:bg-primary-tint/50 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">Llamada directa</div>
                      <div className="text-xs text-muted-foreground">{AMCCONFIG.schedule.weekdays}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}
