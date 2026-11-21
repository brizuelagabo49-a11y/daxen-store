import type { Metadata } from "next";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "./actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b border-white/10 bg-panel md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between p-5 md:block">
          <Link href="/" className="font-display text-xl font-extrabold tracking-[0.25em]">
            DAX<span className="text-pink">E</span>N
          </Link>
          <p className="hidden text-xs text-mute md:mt-1 md:block">Panel de administración</p>
        </div>
        <AdminNav />
        <div className="hidden p-5 md:absolute md:bottom-0 md:block md:w-full">
          <p className="truncate text-xs text-mute">{user.email}</p>
          <form action={signOut}>
            <button className="mt-2 text-sm text-bone/70 hover:text-pink">Cerrar sesión</button>
          </form>
        </div>
      </aside>
      <div className="flex-1 p-5 md:p-10">
        <form action={signOut} className="mb-4 text-right md:hidden">
          <button className="text-xs text-mute hover:text-pink">Cerrar sesión</button>
        </form>
        {children}
      </div>
    </div>
  );
}
