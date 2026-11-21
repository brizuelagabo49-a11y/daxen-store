"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { Product } from "@/lib/types";
import { formatCRC } from "@/lib/format";
import WhatsAppButton from "./WhatsAppButton";

/** Tarjeta con inclinación 3D y reflejo que sigue al cursor. */
export default function ProductCard({ product, phone, index = 0 }: { product: Product; phone: string; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 180, damping: 18 });
  const ry = useSpring(0, { stiffness: 180, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.22), transparent 55%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 18);
    rx.set(-(py - 0.5) * 18);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 25 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-panel"
      >
        <Link href={`/producto/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
            <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
              {product.category}
            </span>
          </div>
        </Link>
        <div className="space-y-3 p-4" style={{ transform: "translateZ(40px)" }}>
          <div>
            <h3 className="line-clamp-1 font-display text-lg font-bold">{product.name}</h3>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-pink">{formatCRC(product.price)}</span>
              <span className="text-xs text-mute">{product.sizes}</span>
            </div>
          </div>
          <WhatsAppButton phone={phone} slug={product.slug} name={product.name} price={product.price} className="btn-wa w-full py-2.5 text-xs" />
        </div>
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: glare }} />
      </motion.div>
    </motion.div>
  );
}
