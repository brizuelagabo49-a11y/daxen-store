import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Acceso", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ setup?: string }> }) {
  const { setup } = await searchParams;
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite] rounded-full border border-white/5" />
      <div className="glass relative w-full max-w-sm rounded-3xl p-8">
        <Link href="/" className="font-display text-2xl font-extrabold tracking-[0.25em]">
          DAX<span className="text-pink">E</span>N
        </Link>
        <p className="mt-2 text-sm text-mute">Panel de administración</p>
        {!isSupabaseConfigured || setup ? (
          <p className="mt-8 rounded-xl border border-pink/30 bg-pink/10 p-4 text-sm text-bone/80">
            El acceso aún no está configurado. Sigue los pasos de <b>README.md</b> para conectar Supabase y crear tu usuario.
          </p>
        ) : (
          <LoginForm />
        )}
        <Link href="/" className="mt-6 block text-center text-xs text-mute hover:text-bone">← Volver a la tienda</Link>
      </div>
    </main>
  );
}
