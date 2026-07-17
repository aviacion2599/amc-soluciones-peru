import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* Sin pt aquí — cada página extiende su hero detrás del header con -mt */}
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  );
}