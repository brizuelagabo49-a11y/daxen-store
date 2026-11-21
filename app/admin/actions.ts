"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import type { SiteContent } from "@/lib/types";

const refreshSite = () => revalidatePath("/", "layout");

async function uploadImage(file: File | null) {
  if (!file || file.size === 0) return null;
  if (!file.type.startsWith("image/")) throw new Error("El archivo debe ser una imagen");
  const { supabase } = await requireAdmin();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${slugify(file.name.replace(/\.\w+$/, ""))}.${ext}`;
  const { error } = await supabase.storage.from("products").upload(path, file, { contentType: file.type });
  if (error) throw new Error("No se pudo subir la imagen: " + error.message);
  return supabase.storage.from("products").getPublicUrl(path).data.publicUrl;
}

export async function saveProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("El nombre es obligatorio");
  const image = await uploadImage(formData.get("image") as File | null);

  const row = {
    name,
    slug: slugify(String(formData.get("slug") || "") || name),
    price: Number(formData.get("price") || 0),
    sizes: String(formData.get("sizes") || ""),
    description: String(formData.get("description") || ""),
    category: String(formData.get("category") || "otros"),
    sort: Number(formData.get("sort") || 0),
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
    ...(image ? { image_url: image } : {}),
  };

  const { error } = id
    ? await supabase.from("products").update(row).eq("id", id)
    : await supabase.from("products").insert(row);
  if (error) throw new Error(error.message);
  refreshSite();
  redirect("/admin/productos");
}

export async function deleteProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("products").delete().eq("id", String(formData.get("id")));
  refreshSite();
}

export async function saveContent(formData: FormData) {
  const { supabase } = await requireAdmin();
  const keys: (keyof SiteContent)[] = [
    "hero_kicker", "hero_title", "hero_subtitle", "notice", "about_title", "about", "how_to_buy", "whatsapp", "instagram",
  ];
  const rows = keys.map((key) => ({ key, value: String(formData.get(key) ?? "") }));
  const { error } = await supabase.from("site_content").upsert(rows);
  if (error) throw new Error(error.message);
  refreshSite();
  redirect("/admin/contenido?ok=1");
}

export async function setInquiryStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("inquiries").update({ status: String(formData.get("status")) }).eq("id", String(formData.get("id")));
  revalidatePath("/admin/consultas");
}

export async function deleteInquiry(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("inquiries").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/consultas");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/login");
}
