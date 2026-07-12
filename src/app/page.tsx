import type { Metadata } from "next";
import { HeroPremium } from "@/components/home/HeroPremium";
import { TrustedBy } from "@/components/home/TrustedBy";
import { AboutAMC } from "@/components/home/AboutAMC";
import { EquipmentLines } from "@/components/home/EquipmentLines";
import { TechnicalService } from "@/components/home/TechnicalService";
import { WorkProcess } from "@/components/home/WorkProcess";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { SectionFade } from "@/components/shared/SectionFade";
import { ScrollSpyWrapper } from "@/components/layout/ScrollSpyWrapper";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * Home AMC Soluciones Perú — Renovación Enterprise.
 * 
 * Arquitectura narrativa: pain-to-proof + operator-case
 * 
 * 1. Hero           → Portada corporativa limpia
 * 2. TrustedBy      → Prueba social institucional
 * 3. EquipmentLines  → 5 líneas comerciales AMC
 * 4. TechnicalService → Servicio técnico diferenciador
 * 5. WorkProcess    → Cómo trabajamos
 * 6. Testimonials   → Prueba social real
 * 7. CTASection     → Cierre con conversión
 */
export const metadata: Metadata = {
  title: {
    default: `${AMCCONFIG.company.legalName} | Contadoras de Billetes y Monedas — Venta y Servicio Técnico en Perú`,
    template: "%s | AMC Soluciones Perú",
  },
  description: AMCCONFIG.company.description,
  keywords: [...AMCCONFIG.company.keywords],
  alternates: {
    canonical: AMCCONFIG.company.domain,
  },
  openGraph: {
    title: `${AMCCONFIG.company.legalName} | Precisión y Seguridad en Manejo de Efectivo`,
    description: AMCCONFIG.company.description,
    url: AMCCONFIG.company.domain,
    siteName: AMCCONFIG.company.brandName,
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${AMCCONFIG.company.legalName} | Precisión y Seguridad en Manejo de Efectivo`,
    description: AMCCONFIG.company.description,
  },
};

/**
 * JSON-LD estructurado para SEO.
 * - Organization: datos corporativos
 * - LocalBusiness: posicionamiento local Lima, Perú
 * - WebSite: sitio web con SearchAction
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${AMCCONFIG.company.domain}/#organization`,
      name: AMCCONFIG.company.legalName,
      alternateName: AMCCONFIG.company.brandName,
      url: AMCCONFIG.company.domain,
      logo: `${AMCCONFIG.company.domain}/logo.svg`,
      description: AMCCONFIG.company.description,
      email: AMCCONFIG.contact.email,
      telephone: AMCCONFIG.contact.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Argentina 1234",
        addressLocality: "Cercado de Lima",
        addressRegion: "Lima",
        addressCountry: "PE",
      },
      sameAs: [
        AMCCONFIG.social.facebook,
        AMCCONFIG.social.instagram,
        AMCCONFIG.social.linkedin,
        AMCCONFIG.social.youtube,
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${AMCCONFIG.company.domain}/#localbusiness`,
      name: AMCCONFIG.company.legalName,
      image: `${AMCCONFIG.company.domain}/og-image.jpg`,
      url: AMCCONFIG.company.domain,
      telephone: AMCCONFIG.contact.phoneRaw,
      email: AMCCONFIG.contact.email,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Argentina 1234",
        addressLocality: "Cercado de Lima",
        addressRegion: "Lima",
        postalCode: "15082",
        addressCountry: "PE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -12.0464,
        longitude: -77.0428,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "13:00",
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Perú",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${AMCCONFIG.company.domain}/#website`,
      url: AMCCONFIG.company.domain,
      name: AMCCONFIG.company.legalName,
      description: AMCCONFIG.company.description,
      publisher: {
        "@id": `${AMCCONFIG.company.domain}/#organization`,
      },
      inLanguage: "es-PE",
    },
  ],
};

export default function HomePage() {
  return (
    <ScrollSpyWrapper>
      <div className="min-h-screen flex flex-col bg-background">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <main className="flex-1">
          <HeroPremium />
          <SectionFade />
          <TrustedBy />
          <AboutAMC />
          <SectionFade />
          <EquipmentLines />
          <SectionFade />
          <TechnicalService />
          <SectionFade />
          <WorkProcess />
          <SectionFade />
          <Testimonials />
          <SectionFade />
          <CTASection />
        </main>
      </div>
    </ScrollSpyWrapper>
  );
}
