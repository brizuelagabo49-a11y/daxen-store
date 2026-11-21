import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { formatCRC } from "@/lib/format";
import type { Product } from "@/lib/types";
import { deleteProduct } from "../actions";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function ProductsAdmin() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("products").select("*").order("sort");
  const products = (data ?? []) as Product[];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-4xl font-extrabold">Productos</h1>
        <Link href="/admin/productos/nuevo" className="btn-light">+ Nuevo</Link>
      </div>
      <div className="mt-8 divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-panel">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-white/5">
              {p.image_url && <Image src={p.image_url} alt="" fill sizes="48px" className="object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{p.name}</p>
              <p className="text-xs text-mute">
                {formatCRC(p.price)} · {p.category}
                {p.featured && <span className="text-pink"> · destacado</span>}
                {!p.active && <span className="text-red-400"> · oculto</span>}
              </p>
            </div>
            <Link href={`/admin/productos/${p.id}`} className="btn-ghost px-4 py-2 text-xs">Editar</Link>
            <form action={deleteProduct}>
              <input type="hidden" name="id" value={p.id} />
              <ConfirmButton message={`¿Borrar "${p.name}"?`} className="rounded-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10">
                Borrar
              </ConfirmButton>
            </form>
          </div>
        ))}
        {!products.length && <p className="p-10 text-center text-mute">No hay productos. Crea el primero.</p>}
      </div>
    </div>
  );
}
