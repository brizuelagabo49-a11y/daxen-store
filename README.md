# DAXEN — tienda oficial

Sitio web negro con animaciones 3D, catálogo con compra directa por WhatsApp (**+506 8307 1066**) y un panel de administración al que solo entra tu correo.

- **Tienda pública** (sin necesidad de cuenta): portada 3D (logo cromado, anillos de neón, partículas), carrusel 3D de destacados, catálogo con filtros y tarjetas que se inclinan en 3D, y página de producto.
- **WhatsApp**: cada producto tiene su botón **“Pedir por WhatsApp”**, que abre el chat con la prenda y el precio ya escritos.
- **Panel `/admin`**: estadísticas, productos (crear, editar, borrar, subir fotos), consultas recibidas y textos del sitio.

Tecnología: Next.js 15, Tailwind, Three.js (React Three Fiber), Framer Motion y Supabase (login, base de datos y fotos).

---

## 1. Probarlo en tu computadora

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Sin Supabase configurado, la tienda funciona con las 7 prendas de `lib/seed.ts`, pero el panel no estará disponible.

## 2. Conectar Supabase (gratis) y crear tu acceso único

1. Crea un proyecto en https://supabase.com.
2. **SQL Editor** → pega todo `supabase/schema.sql`. **Antes de ejecutarlo**, cambia `TU-CORREO@ejemplo.com` por tu correo. Ejecuta.
3. **Authentication → Providers → Email**: desactiva **“Allow new users to sign up”**. Así nadie más puede registrarse.
4. **Authentication → Users → Add user**: crea tu usuario con tu correo y una contraseña segura (marca *Auto confirm*).
5. Copia `.env.example` a `.env.local` y completa los datos (están en **Project Settings → API**):

   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ADMIN_EMAIL=tu-correo
   NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
   ```

6. Reinicia `npm run dev` y entra en http://localhost:3000/login. También hay un enlace discreto, “Acceso”, en el pie de página.

> Tu contraseña **nunca** se guarda en el código. La protección es doble: el servidor revisa `ADMIN_EMAIL` en cada página de `/admin`, y la base de datos (RLS) rechaza cambios de cualquier otra cuenta.

## 3. Publicar (Vercel)

1. Importa este repositorio en https://vercel.com.
2. Agrega las mismas 4 variables de entorno.
3. Deploy. Pon la URL final en `NEXT_PUBLIC_SITE_URL` para que los mensajes de WhatsApp incluyan el enlace del producto.

## Estructura

```
app/(site)/          tienda pública: portada, catálogo, producto
app/admin/           panel: estadísticas, productos, consultas, textos (actions.ts = acciones del servidor)
app/login/           inicio de sesión
app/api/             registro de visitas y consultas
components/3d/       escena 3D de la portada
components/ui/       navbar, tarjetas 3D, carrusel 3D, botón de WhatsApp…
lib/                 datos, Supabase, formato de precios y enlaces de WhatsApp
supabase/schema.sql  tablas, seguridad y datos iniciales
legacy/              catálogo HTML original
```

El número de WhatsApp se cambia desde **Admin → Textos del sitio**. Puedes escribir `8307 1066` y se agrega `+506` automáticamente.
