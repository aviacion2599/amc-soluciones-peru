import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para cotización de contadoras de billetes, monedas y servicio técnico. Respuesta en menos de 24 horas hábiles. AMC Soluciones Perú.",
  alternates: { canonical: "https://amcsolucionesperu.com/contacto" },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
