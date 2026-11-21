"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Day = { label: string; visitas: number; consultas: number };
type Top = { name: string; vistas: number };

const axis = { stroke: "#6b6b6b", fontSize: 11, tickLine: false, axisLine: false } as const;
const tooltip = {
  contentStyle: { background: "#0e0e0e", border: "1px solid #2a2a2a", borderRadius: 12, fontSize: 12 },
  labelStyle: { color: "#9a9a9a" },
};

export default function StatsCharts({ days, top }: { days: Day[]; top: Top[] }) {
  return (
    <div className="mt-6 grid gap-4 xl:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-panel p-5 xl:col-span-2">
        <h2 className="mb-4 font-semibold">Visitas y consultas por día</h2>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={days} margin={{ left: -20, right: 8 }}>
              <defs>
                <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f1a2c7" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#f1a2c7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#25d366" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#25d366" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1f1f1f" vertical={false} />
              <XAxis dataKey="label" {...axis} interval="preserveStartEnd" minTickGap={24} />
              <YAxis {...axis} allowDecimals={false} />
              <Tooltip {...tooltip} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="visitas" stroke="#f1a2c7" strokeWidth={2} fill="url(#gv)" />
              <Area type="monotone" dataKey="consultas" stroke="#25d366" strokeWidth={2} fill="url(#gc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-panel p-5">
        <h2 className="mb-4 font-semibold">Productos más vistos</h2>
        {top.length ? (
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={top} layout="vertical" margin={{ left: 0, right: 16 }}>
                <XAxis type="number" hide allowDecimals={false} />
                <YAxis type="category" dataKey="name" {...axis} width={120} />
                <Tooltip {...tooltip} cursor={{ fill: "#ffffff08" }} />
                <Bar dataKey="vistas" fill="#f1a2c7" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="py-20 text-center text-sm text-mute">Aún no hay visitas a productos.</p>
        )}
      </div>
    </div>
  );
}
