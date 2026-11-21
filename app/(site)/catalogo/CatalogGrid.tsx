"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { CATEGORIES, type Product } from "@/lib/types";

export default function CatalogGrid({ products, phone }: { products: Product[]; phone: string }) {
  const [cat, setCat] = useState<string>("todo");
  const [q, setQ] = useState("");
  const available = CATEGORIES.filter((c) => products.some((p) => p.category === c.value));
  const list = useMemo(
    () =>
      products.filter(
        (p) => (cat === "todo" || p.category === cat) && p.name.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [products, cat, q],
  );

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {[{ value: "todo", label: "Todo" }, ...available].map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={`relative rounded-full px-5 py-2 text-sm transition ${cat === c.value ? "text-ink" : "text-bone/70 hover:text-bone"}`}
            >
              {cat === c.value && (
                <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative">{c.label}</span>
            </button>
          ))}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar prenda…" className="input md:w-72" aria-label="Buscar prenda" />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} phone={phone} index={i} />
        ))}
      </div>
      {!list.length && <p className="py-20 text-center text-mute">No encontramos prendas con ese filtro.</p>}
    </>
  );
}
