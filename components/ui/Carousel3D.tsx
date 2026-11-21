"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { formatCRC } from "@/lib/format";

/** Carrusel giratorio 3D (CSS) con los productos destacados. */
export default function Carousel3D({ products }: { products: Product[] }) {
  const [radius, setRadius] = useState(520);
  useEffect(() => {
    const fit = () => setRadius(window.innerWidth < 640 ? 260 : window.innerWidth < 1024 ? 400 : 560);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const n = products.length;
  if (!n) return null;
  const cardW = radius < 300 ? 150 : 220;

  return (
    <div className="relative flex h-[440px] items-center justify-center overflow-hidden md:h-[560px]" style={{ perspective: 1800 }}>
      <div className="absolute bottom-10 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[50%] bg-pink/20 blur-3xl" />
      <div className="group/ring relative animate-spinY hover:[animation-play-state:paused]" style={{ transformStyle: "preserve-3d", width: cardW, height: cardW * 1.35 }}>
        {products.map((p, i) => (
          <Link
            key={p.id}
            href={`/producto/${p.slug}`}
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-panel shadow-2xl transition hover:border-pink"
            style={{ transform: `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`, backfaceVisibility: "hidden" }}
          >
            <Image src={p.image_url} alt={p.name} fill sizes="240px" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-3 pt-10">
              <p className="line-clamp-1 text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-pink">{formatCRC(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
