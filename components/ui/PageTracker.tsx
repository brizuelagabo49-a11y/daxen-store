"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Registra cada visita para las estadísticas del panel. */
export default function PageTracker() {
  const path = usePathname();
  useEffect(() => {
    const body = JSON.stringify({ path });
    if (!navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) {
      fetch("/api/track", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true }).catch(() => {});
    }
  }, [path]);
  return null;
}
