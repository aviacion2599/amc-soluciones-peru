import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
    default: "AMC Soluciones Perú | Contadoras de Billetes, Monedas y Servicio Técnico GLORY",
    template: "%s | AMC Soluciones Perú",
  },
  description:
    "Especialistas en servicio técnico y soluciones de conteo de efectivo. Venta de contadoras de billetes, monedas, clasificadoras y detectores en Perú. Precisión, Seguridad y Respaldo Técnico.",
  keywords: [
    "contadoras de billetes",
    "contadoras de monedas",
    "clasificadoras de billetes",
    "detectores de billetes falsos",
    "servicio técnico GLORY",
    "AMC Soluciones Perú",
    "calibración contadoras",
    "mantenimiento contadoras Perú",
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
      "Especialistas en soluciones de conteo de efectivo. Venta, servicio técnico, calibración y mantenimiento de contadoras de billetes y monedas en Perú.",
    url: "https://amcsolucionesperu.com",
    siteName: "AMC Soluciones Perú",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMC Soluciones Perú | Contadoras de Billetes y Servicio Técnico",
    description:
      "Especialistas en soluciones de conteo de efectivo. Venta y servicio técnico de contadoras en Perú.",
  },
  icons: {
    icon: "/favicon.ico",
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
