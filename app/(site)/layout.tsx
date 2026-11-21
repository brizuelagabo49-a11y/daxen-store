import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import PageTracker from "@/components/ui/PageTracker";
import { getContent } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <div className="grain">
      <SmoothScroll />
      <Cursor />
      <PageTracker />
      <Navbar />
      <main>{children}</main>
      <Footer content={content} />
      <WhatsAppFloat phone={content.whatsapp} />
    </div>
  );
}
