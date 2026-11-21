"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { saveProduct } from "@/app/admin/actions";
import { CATEGORIES, type Product } from "@/lib/types";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="btn-light disabled:opacity-50">
      {pending ? "Guardando…" : "Guardar producto"}
    </button>
  );
}

export default function ProductForm({ product }: { product?: Product }) {
  const [preview, setPreview] = useState(product?.image_url ?? "");
  return (
    <form action={saveProduct} className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
      <input type="hidden" name="id" value={product?.id ?? ""} />
      <div className="grid gap-5 rounded-2xl border border-white/10 bg-panel p-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="name">Nombre</label>
          <input id="name" name="name" required defaultValue={product?.name} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="price">Precio (₡)</label>
          <input id="price" name="price" type="number" min={0} step={50} required defaultValue={product?.price} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="category">Categoría</label>
          <select id="category" name="category" defaultValue={product?.category ?? "conjuntos"} className="input">
            {CATEGORIES.map((c) => <option key={c.value} value={c.value} className="bg-ink">{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="sizes">Tallas</label>
          <input id="sizes" name="sizes" defaultValue={product?.sizes ?? "S · M · L"} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="sort">Orden</label>
          <input id="sort" name="sort" type="number" defaultValue={product?.sort ?? 0} className="input" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="description">Descripción</label>
          <textarea id="description" name="description" rows={4} defaultValue={product?.description} className="input" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="slug">URL (opcional)</label>
          <input id="slug" name="slug" defaultValue={product?.slug} placeholder="se genera del nombre" className="input" />
        </div>
        <div className="flex gap-6 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="active" defaultChecked={product?.active ?? true} className="accent-pink" /> Visible en la tienda
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="accent-pink" /> Destacado (carrusel 3D)
          </label>
        </div>
        <div className="sm:col-span-2"><Submit /></div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-panel p-6">
        <p className="label">Foto</p>
        <div className="mt-2 aspect-[3/4] overflow-hidden rounded-xl bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {preview && <img src={preview} alt="" className="h-full w-full object-cover" />}
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="mt-4 block w-full text-xs text-mute file:mr-3 file:rounded-full file:border-0 file:bg-bone file:px-4 file:py-2 file:text-ink"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setPreview(URL.createObjectURL(f));
          }}
        />
        <p className="mt-2 text-xs text-mute">JPG, PNG o WEBP · máx. 5 MB</p>
      </div>
    </form>
  );
}
