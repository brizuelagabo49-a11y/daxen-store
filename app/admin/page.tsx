import StatsCharts from "@/components/admin/StatsCharts";
import { requireAdmin } from "@/lib/auth";

export default async function AdminHome() {
  const { supabase } = await requireAdmin();
  const since = new Date(Date.now() - 29 * 864e5);
  since.setHours(0, 0, 0, 0);

  const [{ data: views }, { data: inquiries }, { count: productCount }] = await Promise.all([
    supabase.from("page_views").select("path,product_id,created_at").gte("created_at", since.toISOString()).limit(50000),
    supabase.from("inquiries").select("product_name,status,created_at").gte("created_at", since.toISOString()).limit(10000),
    supabase.from("products").select("id", { count: "exact", head: true }),
  ]);
  const { data: products } = await supabase.from("products").select("id,name");
  const names = new Map((products ?? []).map((p) => [p.id, p.name]));

  const days = [...Array(30)].map((_, i) => {
    const d = new Date(since.getTime() + i * 864e5);
    return { key: d.toISOString().slice(0, 10), label: d.toLocaleDateString("es-CR", { day: "2-digit", month: "short" }), visitas: 0, consultas: 0 };
  });
  const byKey = new Map(days.map((d) => [d.key, d]));
  (views ?? []).forEach((v) => {
    const d = byKey.get(new Date(v.created_at).toISOString().slice(0, 10));
    if (d) d.visitas++;
  });
  (inquiries ?? []).forEach((q) => {
    const d = byKey.get(new Date(q.created_at).toISOString().slice(0, 10));
    if (d) d.consultas++;
  });

  const productViews = new Map<string, number>();
  (views ?? []).forEach((v) => {
    if (v.product_id) productViews.set(v.product_id, (productViews.get(v.product_id) ?? 0) + 1);
  });
  const top = [...productViews.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([id, vistas]) => ({ name: names.get(id) ?? "—", vistas }));

  const totalViews = views?.length ?? 0;
  const totalInq = inquiries?.length ?? 0;
  const pending = (inquiries ?? []).filter((q) => q.status === "nuevo").length;
  const kpis = [
    { label: "Visitas (30 días)", value: totalViews },
    { label: "Consultas WhatsApp", value: totalInq },
    { label: "Consultas sin atender", value: pending },
    { label: "Conversión", value: totalViews ? ((totalInq / totalViews) * 100).toFixed(1) + "%" : "—" },
    { label: "Productos", value: productCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold">Estadísticas</h1>
      <p className="mt-1 text-sm text-mute">Últimos 30 días</p>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-panel p-5">
            <p className="text-xs uppercase tracking-wider text-mute">{k.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{k.value}</p>
          </div>
        ))}
      </div>
      <StatsCharts days={days} top={top} />
    </div>
  );
}
