import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { MobileNavProvider } from "./MobileNavProvider";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <MobileNavProvider>
      <Header />
      {/* Sin pt aquí — cada página extiende su hero detrás del header con -mt */}
      {children}
      <Footer />
      <WhatsAppFloat />
      {/* Bottom padding on mobile so last content isn't hidden behind bottom nav */}
      <div className="h-[70px] lg:hidden" aria-hidden="true" />
    </MobileNavProvider>
  );
}