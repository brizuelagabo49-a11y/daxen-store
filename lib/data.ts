import { CONTENIDO, PRODUCTOS } from "./tienda";
import type { Product, SiteContent } from "./types";

const activos = () => PRODUCTOS.filter((p) => p.active).sort((a, b) => a.sort - b.sort);

export const getProducts = async (): Promise<Product[]> => activos();
export const getProduct = async (slug: string) => activos().find((p) => p.slug === slug) ?? null;
export const getContent = async (): Promise<SiteContent> => CONTENIDO;
