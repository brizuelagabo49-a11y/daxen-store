import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ ok: true, stored: false });
  const { slug, message } = (await req.json().catch(() => ({}))) as { slug?: string; message?: string };
  if (typeof slug !== "string" || slug.length > 120) return NextResponse.json({ ok: false }, { status: 400 });
  const { data: product } = await supabase.from("products").select("id,name").eq("slug", slug).maybeSingle();
  await supabase.from("inquiries").insert({
    product_id: product?.id ?? null,
    product_name: product?.name ?? slug,
    message: String(message ?? "").slice(0, 1000),
  });
  return NextResponse.json({ ok: true });
}
