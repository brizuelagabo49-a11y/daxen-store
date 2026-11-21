"use client";

import { productMessage, whatsappLink } from "@/lib/format";

type Props = {
  phone: string;
  slug: string;
  name: string;
  price: number;
  className?: string;
  label?: string;
};

/** Abre WhatsApp directo con el producto ya escrito. */
export default function WhatsAppButton({ phone, slug, name, price, className, label = "Pedir por WhatsApp" }: Props) {
  // Usa la URL pública del sitio (igual en servidor y navegador, evita diferencias de hidratación)
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const url = site && !site.includes("localhost") ? `${site}/producto/${slug}` : undefined;
  const message = productMessage(name, price, url);

  return (
    <a
      href={whatsappLink(phone, message)}
      target="_blank"
      rel="noopener"
      onClick={(e) => e.stopPropagation()}
      className={className ?? "btn-wa w-full"}
    >
      <WaIcon /> {label}
    </a>
  );
}

export function WaIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
