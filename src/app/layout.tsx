import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReadingProgress } from "@/components/shared/ReadingProgress";
import { SiteShell } from "@/components/layout/SiteShell";
import { Preloader } from "@/components/layout/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amcsolucionesperu.com"),
  title: {
    default: "AMC Soluciones Perú | Contadoras de Billetes y Monedas — Venta y Servicio Técnico en Perú",
    template: "%s | AMC Soluciones Perú",
  },
  description:
    "AMC Soluciones Perú se especializa en la venta de contadoras profesionales de billetes y monedas, mantenimiento preventivo y correctivo, reparación, calibración, actualización de divisas y soporte técnico para equipos de procesamiento de efectivo.",
  keywords: [
    "precisión",
    "seguridad",
    "control",
    "confianza",
    "respaldo técnico",
    "contadoras de billetes",
    "contadoras de monedas",
    "clasificadoras de billetes",
    "detectores de billetes falsos",
    "servicio técnico GLORY",
    "calibración contadoras",
    "mantenimiento contadoras Perú",
    "AMC Soluciones Perú",
    "venta contadoras billetes Perú",
    "reparación contadoras GLORY",
  ],
  authors: [{ name: "AMC Soluciones Perú" }],
  creator: "AMC Soluciones Perú",
  publisher: "AMC Soluciones Perú",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://amcsolucionesperu.com",
  },
  openGraph: {
    title: "AMC Soluciones Perú | Contadoras de Billetes y Servicio Técnico",
    description:
      "Soluciones profesionales para manejo de efectivo — Contadoras de billetes y monedas con detección avanzada, venta y servicio técnico en Perú.",
    url: "https://amcsolucionesperu.com",
    siteName: "AMC Soluciones Perú",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMC Soluciones Perú | Contadoras de Billetes y Servicio Técnico",
    description:
      "Soluciones profesionales para manejo de efectivo — Contadoras de billetes y monedas con detección avanzada, venta y servicio técnico en Perú.",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-16x16.webp", sizes: "16x16", type: "image/webp" },
    ],
    apple: "/apple-touch-icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <Preloader />
        <ReadingProgress />
        <SiteShell>{children}</SiteShell>
        <Toaster />
      </body>
    </html>
  );
}
