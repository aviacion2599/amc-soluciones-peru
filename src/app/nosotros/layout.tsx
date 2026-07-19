import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "7 años profesionalizando el manejo de efectivo en Perú. Técnicos certificados GLORY, 2,500+ equipos instalados y cobertura nacional.",
  alternates: { canonical: "https://amcsolucionesperu.com/nosotros" },
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
