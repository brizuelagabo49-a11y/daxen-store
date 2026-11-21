import Link from "next/link";
import type { SiteContent } from "@/lib/types";
import { normalizePhone, whatsappLink } from "@/lib/format";

export default function Footer({ content }: { content: SiteContent }) {
  const phone = normalizePhone(content.whatsapp);
  const pretty = phone.startsWith("506") ? `+506 ${phone.slice(3, 7)} ${phone.slice(7)}` : `+${phone}`;
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-3xl font-extrabold tracking-[0.25em]">
            DAX<span className="text-pink">E</span>N
          </p>
          <p className="mt-3 max-w-xs text-sm text-mute">Moda que te define.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="kicker mb-3">Explora</p>
          <Link href="/catalogo" className="block text-bone/80 hover:text-pink">Catálogo</Link>
          <Link href="/#nosotros" className="block text-bone/80 hover:text-pink">Nosotros</Link>
          <Link href="/#como-comprar" className="block text-bone/80 hover:text-pink">Cómo comprar</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="kicker mb-3">Contacto</p>
          <a href={whatsappLink(phone, "Hola DAXEN 👋")} target="_blank" rel="noopener" className="block text-bone/80 hover:text-wa">
            WhatsApp {pretty}
          </a>
          {content.instagram && (
            <a href={content.instagram} target="_blank" rel="noopener" className="block text-bone/80 hover:text-pink">Instagram</a>
          )}
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none text-center font-display text-[24vw] font-extrabold leading-[0.75] tracking-tighter text-white/[0.04]">
        DAXEN
      </p>
      <div className="flex items-center justify-between border-t border-white/5 px-5 py-5 text-xs text-mute md:px-10">
        <span>© {new Date().getFullYear()} DAXEN</span>
        <Link href="/login" className="opacity-40 transition hover:opacity-100">Acceso</Link>
      </div>
    </footer>
  );
}
