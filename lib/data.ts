import "server-only";
import { cache } from "react";
import { createClient } from "./supabase/server";
import { DEFAULT_CONTENT, SEED_PRODUCTS } from "./seed";
import type { Product, SiteContent } from "./types";

export const getProducts = cache(async (): Promise<Product[]> => {
  const supabase = await createClient();
  if (!supabase) return SEED_PRODUCTS;
  const { data, error } = await supabase.from("products").select("*").eq("active", true).order("sort");
  if (error) {
    console.error("getProducts:", error.message);
    return SEED_PRODUCTS;
  }
  return data as Product[];
});

export const getProduct = async (slug: string) =>
  (await getProducts()).find((p) => p.slug === slug) ?? null;

export const getContent = cache(async (): Promise<SiteContent> => {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_CONTENT;
  const { data, error } = await supabase.from("site_content").select("key,value");
  if (error) return DEFAULT_CONTENT;
  const stored = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  return { ...DEFAULT_CONTENT, ...stored };
});
