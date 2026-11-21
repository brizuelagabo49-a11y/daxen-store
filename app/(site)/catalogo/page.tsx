import type { Metadata } from "next";
import CatalogGrid from "./CatalogGrid";
import { getContent, getProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Catálogo" };

export default async function CatalogPage() {
  const [products, content] = await Promise.all([getProducts(), getContent()]);
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 pt-36 md:px-10">
      <p className="kicker">Catálogo</p>
      <h1 className="mt-3 font-display text-6xl font-extrabold tracking-tight md:text-8xl">
        Todo <span className="chrome-text animate-shine">DAXEN</span>
      </h1>
      <p className="mt-5 max-w-xl text-mute">{content.notice}</p>
      <CatalogGrid products={products} phone={content.whatsapp} />
    </section>
  );
}
