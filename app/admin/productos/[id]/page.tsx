import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/auth";
import type { Product } from "@/lib/types";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <div>
      <Link href="/admin/productos" className="text-sm text-mute hover:text-pink">← Productos</Link>
      <h1 className="mt-2 font-display text-4xl font-extrabold">Editar: {data.name}</h1>
      <ProductForm product={data as Product} />
    </div>
  );
}
