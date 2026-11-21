export const formatCRC = (n: number) => "₡" + Math.round(n).toLocaleString("es-CR").replace(/\s|,/g, ".");

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Normaliza un número de WhatsApp: "8307 1066" -> "50683071066" (Costa Rica por defecto). */
export const normalizePhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 8 ? "506" + digits : digits;
};

export const whatsappLink = (phone: string, text: string) =>
  `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(text)}`;

export const productMessage = (name: string, price: number, url?: string) =>
  `Hola DAXEN 👋 Me interesa: *${name}* (${formatCRC(price)}).` +
  (url ? `\n${url}` : "") +
  `\n¿Me confirman tallas y disponibilidad?`;
