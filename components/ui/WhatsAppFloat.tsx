"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/format";
import { WaIcon } from "./WhatsAppButton";

export default function WhatsAppFloat({ phone }: { phone: string }) {
  return (
    <motion.a
      href={whatsappLink(phone, "Hola DAXEN 👋 Tengo una consulta.")}
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 14 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-wa text-ink shadow-[0_0_30px_#25d36666]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-wa/40" />
      <WaIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
