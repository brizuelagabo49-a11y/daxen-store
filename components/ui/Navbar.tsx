"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#como-comprar", label: "Cómo comprar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled || open ? "glass" : "border border-transparent"
        }`}
      >
        <Link href="/" className="font-display text-xl font-extrabold tracking-[0.25em]">
          DAX<span className="text-pink">E</span>N
        </Link>
        <ul className="hidden items-center gap-8 text-sm text-bone/80 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group relative transition hover:text-bone">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-pink transition-all group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/catalogo" className="btn-light hidden px-5 py-2 text-xs md:inline-flex">
          Comprar
        </Link>
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative h-8 w-8 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span className={`absolute left-1 h-px w-6 bg-bone transition ${open ? "top-4 rotate-45" : "top-3"}`} />
          <span className={`absolute left-1 h-px w-6 bg-bone transition ${open ? "top-4 -rotate-45" : "top-5"}`} />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -20, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ transformPerspective: 800 }}
            className="glass mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-3xl p-4 md:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-xl px-4 py-3 font-display text-2xl font-bold hover:bg-white/5" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
