import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ ok: true, stored: false });
  const { path } = (await req.json().catch(() => ({}))) as { path?: string };
  if (typeof path !== "string" || !path.startsWith("/") || path.length > 200) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  let product_id: string | null = null;
  const m = path.match(/^\/producto\/([\w-]+)$/);
  if (m) {
    const { data } = await supabase.from("products").select("id").eq("slug", m[1]).maybeSingle();
    product_id = data?.id ?? null;
  }
  await supabase.from("page_views").insert({ path, product_id });
  return NextResponse.json({ ok: true });
}
