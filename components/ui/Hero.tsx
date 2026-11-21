"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/types";
import { whatsappLink } from "@/lib/format";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

export default function Hero({ content }: { content: SiteContent }) {
  const [ready, setReady] = useState(false);

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene onReady={() => setReady(true)} />
      </div>

      {/* Título HTML: visible mientras carga el 3D y siempre para lectores de pantalla */}
      <h1
        className={`pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[22vw] font-extrabold tracking-tighter transition-opacity duration-1000 md:text-[15vw] ${
          ready ? "sr-only opacity-0" : "chrome-text animate-shine opacity-100"
        }`}
      >
        {content.hero_title}
      </h1>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 pb-12 md:flex-row md:items-end md:px-10 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md"
        >
          <p className="kicker mb-4">{content.hero_kicker}</p>
          <p className="text-base leading-relaxed text-bone/80 md:text-lg">{content.hero_subtitle}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-3"
        >
          <Link href="/catalogo" className="btn-light">
            Ver catálogo →
          </Link>
          <a
            href={whatsappLink(content.whatsapp, "Hola DAXEN 👋 Quiero ver el catálogo.")}
            target="_blank"
            rel="noopener"
            className="btn-ghost"
          >
            WhatsApp
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-mute md:block"
      >
        Scroll
      </motion.div>
    </section>
  );
}
