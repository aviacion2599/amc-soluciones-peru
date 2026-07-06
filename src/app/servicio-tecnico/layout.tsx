import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicio Técnico",
  description:
    "Servicio técnico autorizado GLORY. Reparación, calibración, diagnóstico y mantenimiento preventivo de contadoras de billetes y monedas en Perú. Respuesta en 24h.",
  alternates: { canonical: "https://amcsolucionesperu.com/servicio-tecnico" },
};

export default function ServicioTecnicoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
