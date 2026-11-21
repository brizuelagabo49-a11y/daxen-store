import type { Product, SiteContent } from "./types";

/*
 * ✏️  AQUÍ SE EDITA TODA LA TIENDA
 *
 * - Textos de la página: cambia lo que está entre comillas en CONTENIDO.
 * - Productos: copia una línea de PRODUCTOS y cambia los datos.
 *     p(orden, "nombre-de-la-foto", "Nombre visible", precio, "categoría", "jpg" o "webp", destacado)
 *   La foto va en  public/products/nombre-de-la-foto.jpg
 *   Categorías: "conjuntos", "vestidos", "bodies", "otros"
 *   destacado = true  → aparece en el carrusel 3D de la portada
 * - Para ocultar un producto sin borrarlo, bórralo de la lista o ponle active: false.
 */

export const CONTENIDO: SiteContent = {
  hero_kicker: "Colección 2026",
  hero_title: "DAXEN",
  hero_subtitle: "Moda que te define. Piezas seleccionadas para quienes visten con actitud.",
  notice:
    "Precios de referencia. Confirma tallas, precio actual y disponibilidad por WhatsApp antes de comprar.",
  about_title: "Tu estilo. Tu forma de expresarte.",
  about:
    "DAXEN nace para quienes no se visten para encajar, sino para destacar. Seleccionamos cada prenda pensando en siluetas limpias, texturas actuales y la confianza de verte como quieres.",
  how_to_buy:
    "Explora las prendas|Elige lo que te guste y revisa el precio de referencia.\nEscríbenos por WhatsApp|Toca el botón del producto: el mensaje ya va escrito.\nConfirma los detalles|Te confirmamos talla, disponibilidad y entrega.",
  whatsapp: "50683071066",
  instagram: "",
};

const p = (
  sort: number,
  slug: string,
  name: string,
  price: number,
  category: Product["category"],
  ext: "jpg" | "webp",
  featured = false,
): Product => ({
  id: slug,
  slug,
  name,
  price,
  sizes: "Tallas por confirmar",
  description: `${name} de la colección DAXEN. Consulta tallas y disponibilidad por WhatsApp.`,
  category,
  image_url: `/products/${slug}.${ext}`,
  featured,
  active: true,
  sort,
});

export const PRODUCTOS: Product[] = [
  p(1, "conjunto-negro", "Conjunto negro", 10000, "conjuntos", "jpg", true),
  p(2, "vestido-blanco", "Vestido blanco", 8000, "vestidos", "jpg", true),
  p(3, "body-rosa", "Body rosa", 10000, "bodies", "jpg", true),
  p(4, "conjunto-beige-cargo", "Conjunto beige cargo", 18500, "conjuntos", "webp", true),
  p(5, "conjunto-blanco-con-franjas-negras", "Conjunto blanco con franjas negras", 17000, "conjuntos", "webp", true),
  p(6, "conjunto-negro-con-falda", "Conjunto negro con falda", 15000, "conjuntos", "webp", true),
  p(7, "conjunto-negro-cargo", "Conjunto negro cargo", 16000, "conjuntos", "webp", true),
];
