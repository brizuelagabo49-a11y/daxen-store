"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Foto del producto como una "carta" 3D con grosor, que gira al arrastrar o mover el mouse. */
export default function ProductViewer({ src, alt }: { src: string; alt: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-28, 28]), { stiffness: 120, damping: 14 });
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 120, damping: 14 });

  return (
    <div
      className="relative mx-auto w-full max-w-md touch-none"
      style={{ perspective: 1400 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="absolute inset-10 rounded-full bg-pink/25 blur-[90px]" />
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4]"
      >
        {/* capas traseras para dar grosor */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-700 to-zinc-900" style={{ transform: `translateZ(${-(i + 1) * 2}px)` }} />
        ))}
        <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20">
          <Image src={src} alt={alt} fill priority sizes="(max-width:768px) 90vw, 40vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-display text-xs tracking-[0.5em] text-mute" style={{ transform: "translateZ(60px)" }}>
          DAXEN
        </div>
      </motion.div>
    </div>
  );
}
