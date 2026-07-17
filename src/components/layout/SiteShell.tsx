import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* pt compensates the fixed header height (h-[62px] sm:h-[68px]) */}
      <div className="pt-[62px] sm:pt-[68px]">
        {children}
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}