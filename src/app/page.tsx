import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { HeroPremium } from "@/components/home/HeroPremium";
import { TrustedBy } from "@/components/home/TrustedBy";
import { Benefits } from "@/components/home/Benefits";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TechnicalService } from "@/components/home/TechnicalService";
import { WorkProcess } from "@/components/home/WorkProcess";
import { BrandsStrip } from "@/components/home/BrandsStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { AMCCONFIG } from "@/lib/site-config";

/**
 * Home AMC Soluciones Perú — Compone todas las secciones modulares.
 * SEO: metadata dinámica + JSON-LD Organization + LocalBusiness.
 */
export const metadata: Metadata = {
  title: {
    default: `${AMCCONFIG.company.legalName} | Contadoras de Billetes, Monedas y Servicio Técnico GLORY`,
    template: "%s | AMC Soluciones Perú",
  },
  description: AMCCONFIG.company.description,
  alternates: {
    canonical: AMCCONFIG.company.domain,
  },
  openGraph: {
    title: `${AMCCONFIG.company.legalName} | Contadoras de Billetes y Servicio Técnico`,
    description: AMCCONFIG.company.description,
    url: AMCCONFIG.company.domain,
    siteName: AMCCONFIG.company.brandName,
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${AMCCONFIG.company.legalName} | Contadoras de Billetes y Servicio Técnico`,
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
    <div className="min-h-screen flex flex-col bg-background">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1">
        <HeroPremium />
        <TrustedBy />
        <Benefits />
        <CategoriesGrid />
        <FeaturedProducts />
        <TechnicalService />
        <WorkProcess />
        <BrandsStrip />
        <Testimonials />
        <CTASection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
