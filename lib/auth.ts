import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const isAdminEmail = (email?: string | null) =>
  Boolean(email && process.env.ADMIN_EMAIL && email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase());

/** Devuelve el cliente Supabase autenticado como admin, o redirige a /login. */
export async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) redirect("/login?setup=1");
  const { data } = await supabase.auth.getUser();
  if (!isAdminEmail(data.user?.email)) redirect("/login");
  return { supabase, user: data.user! };
}
