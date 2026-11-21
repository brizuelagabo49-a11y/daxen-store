import Link from "next/link";
import Hero from "@/components/ui/Hero";
import Carousel3D from "@/components/ui/Carousel3D";
import Marquee from "@/components/ui/Marquee";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { getContent, getProducts } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [content, products] = await Promise.all([getContent(), getProducts()]);
  const featured = products.filter((p) => p.featured);
  const steps = content.how_to_buy
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      const [title, ...rest] = l.split("|");
      return { title: title.trim(), text: rest.join("|").trim() };
    });

  return (
    <>
      <Hero content={content} />

      <Marquee words={["DAXEN", "Moda que te define", "Nueva colección", "Pide por WhatsApp"]} />

      <section className="mx-auto max-w-7xl px-5 pt-28 md:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="kicker">Destacados</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
              La <span className="chrome-text animate-shine">colección</span>
            </h2>
          </div>
          <Link href="/catalogo" className="btn-ghost">Ver todo →</Link>
        </Reveal>
      </section>
      <Carousel3D products={featured.length ? featured : products} />

      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} phone={content.whatsapp} index={i} />
          ))}
        </div>
        {content.notice && (
          <Reveal className="mt-8 flex gap-4 rounded-2xl border border-pink/20 bg-gradient-to-r from-pink/10 to-transparent p-5 text-sm text-bone/80">
            <span className="text-pink">✦</span>
            <p>{content.notice}</p>
          </Reveal>
        )}
      </section>

      <section id="nosotros" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-32 md:px-10">
        <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-pink/10 blur-[120px]" />
        <Reveal>
          <p className="kicker">Nosotros</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            {content.about_title}
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 max-w-2xl text-lg leading-relaxed text-bone/70">
          <p>{content.about}</p>
        </Reveal>
      </section>

      <section id="como-comprar" className="mx-auto max-w-7xl scroll-mt-24 px-5 md:px-10">
        <Reveal>
          <p className="kicker">Cómo comprar</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl">Tres pasos. Cero complicaciones.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3" style={{ perspective: 1200 }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="group h-full rounded-3xl border border-white/10 bg-panel p-8 transition duration-500 hover:-translate-y-2 hover:border-pink/50 hover:[transform:rotateX(6deg)_rotateY(-6deg)]">
                <span className="font-display text-6xl font-extrabold text-white/10 transition group-hover:text-pink">0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
