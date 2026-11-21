# DAXEN — tienda oficial

Sitio web negro con animaciones 3D y compra directa por WhatsApp (**+506 8307 1066**). No tiene login ni panel: todo se edita en un solo archivo.

- Portada 3D (logo cromado, anillos de neón, partículas), carrusel 3D de destacados, catálogo con filtros y tarjetas que se inclinan en 3D, y página de cada producto.
- Cada producto tiene su botón **“Pedir por WhatsApp”**, que abre el chat con la prenda y el precio ya escritos.

## Cómo cambiar productos y textos

Todo está en **`lib/tienda.ts`**:

- **Textos**: cambia lo que está entre comillas en `CONTENIDO` (portada, aviso, Nosotros, Cómo comprar, WhatsApp).
- **Agregar un producto**:
  1. Pon la foto en `public/products/`, por ejemplo `public/products/top-rojo.jpg`.
  2. En `PRODUCTOS`, copia una línea y cámbiala:
     ```ts
     p(8, "top-rojo", "Top rojo", 9500, "bodies", "jpg", true),
     ```
     El orden es: posición, nombre de la foto, nombre visible, precio en colones, categoría (`conjuntos`, `vestidos`, `bodies` u `otros`), extensión de la foto y `true` si debe salir en el carrusel 3D.
- **Quitar un producto**: borra su línea.

Si lo publicas en Vercel conectado a GitHub, cada cambio que guardes en GitHub se publica solo en un minuto. Incluso puedes editar `lib/tienda.ts` desde la web de GitHub, con el lápiz ✏️.

## Probarlo en tu computadora

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Publicar gratis (Vercel)

1. Entra en https://vercel.com con tu cuenta de GitHub.
2. **Add New → Project**, elige `daxen-store` y luego **Deploy**. No hace falta configurar nada.
3. Opcional: agrega la variable `NEXT_PUBLIC_SITE_URL` con la dirección final del sitio para que los mensajes de WhatsApp incluyan el enlace del producto.
