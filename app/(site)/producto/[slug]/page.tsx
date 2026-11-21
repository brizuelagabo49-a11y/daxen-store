import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductViewer from "./ProductViewer";
import ProductCard from "@/components/ui/ProductCard";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getContent, getProduct, getProducts } from "@/lib/data";
import { formatCRC } from "@/lib/format";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  return p ? { title: p.name, description: p.description, openGraph: { images: [p.image_url] } } : {};
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const [product, content, all] = await Promise.all([getProduct(slug), getContent(), getProducts()]);
  if (!product) notFound();
  const related = all.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-32 md:grid-cols-2 md:px-10">
        <ProductViewer src={product.image_url} alt={product.name} />
        <div>
          <Link href="/catalogo" className="text-sm text-mute hover:text-pink">← Catálogo</Link>
          <p className="kicker mt-6">{product.category}</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl">{product.name}</h1>
          <p className="mt-6 font-display text-4xl text-pink">{formatCRC(product.price)}</p>
          <p className="mt-2 text-sm text-mute">{product.sizes}</p>
          <p className="mt-8 max-w-md leading-relaxed text-bone/75">{product.description}</p>
          <div className="mt-10 max-w-sm">
            <WhatsAppButton phone={content.whatsapp} slug={product.slug} name={product.name} price={product.price} className="btn-wa w-full py-4 text-base" />
            <p className="mt-3 text-xs text-mute">{content.notice}</p>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="mb-8 font-display text-3xl font-bold">También te puede gustar</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} phone={content.whatsapp} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
