import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProduct() {
  return (
    <div>
      <Link href="/admin/productos" className="text-sm text-mute hover:text-pink">← Productos</Link>
      <h1 className="mt-2 font-display text-4xl font-extrabold">Nuevo producto</h1>
      <ProductForm />
    </div>
  );
}
