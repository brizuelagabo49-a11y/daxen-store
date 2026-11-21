-- DAXEN · esquema de base de datos para Supabase
-- Ejecuta todo este archivo en Supabase → SQL Editor.
-- IMPORTANTE: cambia 'TU-CORREO@ejemplo.com' por tu correo (el mismo de ADMIN_EMAIL).

create extension if not exists pgcrypto;

-- ¿Quién es admin? Solo tu correo.
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower('TU-CORREO@ejemplo.com');
$$;

-- Productos -----------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  price integer not null default 0,
  sizes text not null default 'Tallas por confirmar',
  description text not null default '',
  category text not null default 'otros' check (category in ('conjuntos','vestidos','bodies','otros')),
  image_url text not null default '',
  featured boolean not null default false,
  active boolean not null default true,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;
drop policy if exists "productos visibles" on public.products;
create policy "productos visibles" on public.products for select using (active or public.is_admin());
drop policy if exists "admin gestiona productos" on public.products;
create policy "admin gestiona productos" on public.products for all using (public.is_admin()) with check (public.is_admin());

-- Textos del sitio ----------------------------------------------------------
create table if not exists public.site_content (
  key text primary key,
  value text not null default ''
);
alter table public.site_content enable row level security;
drop policy if exists "contenido público" on public.site_content;
create policy "contenido público" on public.site_content for select using (true);
drop policy if exists "admin edita contenido" on public.site_content;
create policy "admin edita contenido" on public.site_content for all using (public.is_admin()) with check (public.is_admin());

-- Consultas / pedidos -------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  product_name text,
  message text not null default '',
  status text not null default 'nuevo' check (status in ('nuevo','atendido')),
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;
drop policy if exists "cualquiera registra consulta" on public.inquiries;
create policy "cualquiera registra consulta" on public.inquiries for insert with check (status = 'nuevo');
drop policy if exists "admin ve consultas" on public.inquiries;
create policy "admin ve consultas" on public.inquiries for select using (public.is_admin());
drop policy if exists "admin actualiza consultas" on public.inquiries;
create policy "admin actualiza consultas" on public.inquiries for update using (public.is_admin());
drop policy if exists "admin borra consultas" on public.inquiries;
create policy "admin borra consultas" on public.inquiries for delete using (public.is_admin());

-- Visitas (estadísticas) ----------------------------------------------------
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  product_id uuid references public.products(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_idx on public.page_views (created_at);
alter table public.page_views enable row level security;
drop policy if exists "cualquiera registra visita" on public.page_views;
create policy "cualquiera registra visita" on public.page_views for insert with check (true);
drop policy if exists "admin ve visitas" on public.page_views;
create policy "admin ve visitas" on public.page_views for select using (public.is_admin());

-- Almacenamiento de fotos ---------------------------------------------------
insert into storage.buckets (id, name, public) values ('products', 'products', true)
on conflict (id) do nothing;
drop policy if exists "fotos públicas" on storage.objects;
create policy "fotos públicas" on storage.objects for select using (bucket_id = 'products');
drop policy if exists "admin sube fotos" on storage.objects;
create policy "admin sube fotos" on storage.objects for insert with check (bucket_id = 'products' and public.is_admin());
drop policy if exists "admin borra fotos" on storage.objects;
create policy "admin borra fotos" on storage.objects for delete using (bucket_id = 'products' and public.is_admin());

-- Datos iniciales (las 7 prendas del catálogo actual) -----------------------
insert into public.products (slug, name, price, category, image_url, featured, sort, description) values
  ('conjunto-negro', 'Conjunto negro', 10000, 'conjuntos', '/products/conjunto-negro.jpg', true, 1, 'Conjunto negro de la colección DAXEN.'),
  ('vestido-blanco', 'Vestido blanco', 8000, 'vestidos', '/products/vestido-blanco.jpg', true, 2, 'Vestido blanco de la colección DAXEN.'),
  ('body-rosa', 'Body rosa', 10000, 'bodies', '/products/body-rosa.jpg', true, 3, 'Body rosa de la colección DAXEN.'),
  ('conjunto-beige-cargo', 'Conjunto beige cargo', 18500, 'conjuntos', '/products/conjunto-beige-cargo.webp', true, 4, 'Conjunto beige cargo de la colección DAXEN.'),
  ('conjunto-blanco-con-franjas-negras', 'Conjunto blanco con franjas negras', 17000, 'conjuntos', '/products/conjunto-blanco-con-franjas-negras.webp', true, 5, 'Conjunto blanco con franjas negras de la colección DAXEN.'),
  ('conjunto-negro-con-falda', 'Conjunto negro con falda', 15000, 'conjuntos', '/products/conjunto-negro-con-falda.webp', true, 6, 'Conjunto negro con falda de la colección DAXEN.'),
  ('conjunto-negro-cargo', 'Conjunto negro cargo', 16000, 'conjuntos', '/products/conjunto-negro-cargo.webp', true, 7, 'Conjunto negro cargo de la colección DAXEN.')
on conflict (slug) do nothing;

insert into public.site_content (key, value) values ('whatsapp', '50683071066')
on conflict (key) do nothing;
