// Extrae las fotos base64 del catálogo viejo (legacy/) a public/products/*.jpg
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const html = readFileSync(new URL("../legacy/DAXEN-Catalogo-Final.html", import.meta.url), "utf8");
const match = html.match(/const products = (\[.*?\]);/s);
if (!match) throw new Error("No se encontró el arreglo de productos");
const products = JSON.parse(match[1]);

const slugify = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

mkdirSync(new URL("../public/products/", import.meta.url), { recursive: true });
for (const p of products) {
  const m = p.src.match(/^data:image\/(\w+);base64,(.*)$/s);
  if (!m) { console.warn("Sin imagen:", p.name); continue; }
  const ext = m[1] === "jpeg" ? "jpg" : m[1];
  const file = `${slugify(p.name)}.${ext}`;
  writeFileSync(new URL(`../public/products/${file}`, import.meta.url), Buffer.from(m[2], "base64"));
  console.log(file, p.price);
}
