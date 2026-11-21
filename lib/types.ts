export type Category = "conjuntos" | "vestidos" | "bodies" | "otros";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // colones
  sizes: string;
  description: string;
  category: Category;
  image_url: string;
  featured: boolean;
  active: boolean;
  sort: number;
};

export type SiteContent = {
  hero_kicker: string;
  hero_title: string;
  hero_subtitle: string;
  notice: string;
  about_title: string;
  about: string;
  how_to_buy: string;
  whatsapp: string;
  instagram: string;
};

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "conjuntos", label: "Conjuntos" },
  { value: "vestidos", label: "Vestidos" },
  { value: "bodies", label: "Bodies" },
  { value: "otros", label: "Otros" },
];
