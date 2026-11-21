"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/admin", label: "Estadísticas", icon: "◆" },
  { href: "/admin/productos", label: "Productos", icon: "▣" },
  { href: "/admin/consultas", label: "Consultas", icon: "✉" },
  { href: "/admin/contenido", label: "Textos del sitio", icon: "✎" },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
      {ITEMS.map((i) => {
        const active = i.href === "/admin" ? path === "/admin" : path.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition ${
              active ? "bg-bone text-ink" : "text-bone/70 hover:bg-white/5 hover:text-bone"
            }`}
          >
            <span className={active ? "text-pink-deep" : "text-pink"}>{i.icon}</span>
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
