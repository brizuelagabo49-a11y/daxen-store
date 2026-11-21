import { requireAdmin } from "@/lib/auth";
import type { Inquiry } from "@/lib/types";
import { deleteInquiry, setInquiryStatus } from "../actions";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function InquiriesAdmin({ searchParams }: { searchParams: Promise<{ estado?: string }> }) {
  const { estado } = await searchParams;
  const { supabase } = await requireAdmin();
  let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(300);
  if (estado === "nuevo" || estado === "atendido") query = query.eq("status", estado);
  const { data } = await query;
  const list = (data ?? []) as Inquiry[];

  const tabs = [
    { v: "", l: "Todas" },
    { v: "nuevo", l: "Nuevas" },
    { v: "atendido", l: "Atendidas" },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold">Consultas y pedidos</h1>
      <p className="mt-1 text-sm text-mute">Se registran cada vez que alguien toca “Pedir por WhatsApp” en un producto.</p>
      <div className="mt-6 flex gap-2">
        {tabs.map((t) => (
          <a
            key={t.v}
            href={t.v ? `?estado=${t.v}` : "?"}
            className={`rounded-full px-4 py-1.5 text-sm ${(estado ?? "") === t.v ? "bg-bone text-ink" : "text-bone/70 hover:bg-white/5"}`}
          >
            {t.l}
          </a>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {list.map((q) => (
          <div key={q.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-panel p-5 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${q.status === "nuevo" ? "bg-pink" : "bg-mute"}`} />
                <p className="font-medium">{q.product_name ?? "Consulta general"}</p>
              </div>
              <p className="mt-1 text-xs text-mute">{new Date(q.created_at).toLocaleString("es-CR")}</p>
              <p className="mt-2 whitespace-pre-line text-sm text-bone/70">{q.message}</p>
            </div>
            <div className="flex gap-2">
              <form action={setInquiryStatus}>
                <input type="hidden" name="id" value={q.id} />
                <input type="hidden" name="status" value={q.status === "nuevo" ? "atendido" : "nuevo"} />
                <button className="btn-ghost px-4 py-2 text-xs">{q.status === "nuevo" ? "Marcar atendida" : "Reabrir"}</button>
              </form>
              <form action={deleteInquiry}>
                <input type="hidden" name="id" value={q.id} />
                <ConfirmButton message="¿Borrar esta consulta?" className="rounded-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10">Borrar</ConfirmButton>
              </form>
            </div>
          </div>
        ))}
        {!list.length && <p className="rounded-2xl border border-white/10 bg-panel p-10 text-center text-mute">No hay consultas todavía.</p>}
      </div>
    </div>
  );
}
