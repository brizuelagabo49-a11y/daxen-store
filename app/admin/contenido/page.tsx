import { requireAdmin } from "@/lib/auth";
import { DEFAULT_CONTENT } from "@/lib/seed";
import type { SiteContent } from "@/lib/types";
import { saveContent } from "../actions";

const FIELDS: { key: keyof SiteContent; label: string; rows?: number; help?: string }[] = [
  { key: "hero_kicker", label: "Portada · etiqueta" },
  { key: "hero_title", label: "Portada · título" },
  { key: "hero_subtitle", label: "Portada · subtítulo", rows: 2 },
  { key: "notice", label: "Aviso de precios", rows: 2 },
  { key: "about_title", label: "Nosotros · título" },
  { key: "about", label: "Nosotros · texto", rows: 4 },
  { key: "how_to_buy", label: "Cómo comprar", rows: 4, help: "Un paso por línea con el formato: Título|Descripción" },
  { key: "whatsapp", label: "WhatsApp", help: "Ej: 8307 1066 (se agrega +506 automáticamente)" },
  { key: "instagram", label: "Instagram (URL)" },
];

export default async function ContentAdmin({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("site_content").select("key,value");
  const content: SiteContent = { ...DEFAULT_CONTENT, ...Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl font-extrabold">Textos del sitio</h1>
      {ok && <p className="mt-4 rounded-xl border border-wa/30 bg-wa/10 p-3 text-sm">Cambios guardados y publicados ✓</p>}
      <form action={saveContent} className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-panel p-6">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="label" htmlFor={f.key}>{f.label}</label>
            {f.rows ? (
              <textarea id={f.key} name={f.key} rows={f.rows} defaultValue={content[f.key]} className="input" />
            ) : (
              <input id={f.key} name={f.key} defaultValue={content[f.key]} className="input" />
            )}
            {f.help && <p className="mt-1 text-xs text-mute">{f.help}</p>}
          </div>
        ))}
        <button className="btn-light">Guardar cambios</button>
      </form>
    </div>
  );
}
