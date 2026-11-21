# DAXEN — tienda oficial

Tienda negra con animaciones 3D y compra directa por WhatsApp (**+506 8307 1066**).

- `index.html`: toda la página.
- `products/`: fotos de las prendas.
- `fonts/`: tipografía del logo 3D.
- `legacy/`: catálogo HTML original.

## Verla en internet (GitHub Pages)

1. Ve a **Settings → Pages**.
2. En **Branch**, elige `main` y la carpeta `/ (root)`, y toca **Save**.
3. En 1 o 2 minutos queda en https://brizuelagabo49-a11y.github.io/daxen-store/

## Cambiar productos

1. Sube la foto a la carpeta `products/`.
2. Edita `index.html` con el lápiz ✏️ y busca `const PRODUCTS`. Copia una línea y cámbiala:

```js
{ slug:"top-rojo", name:"Top rojo", price:9500, cat:"bodies", img:"products/top-rojo.jpg" },
```

Categorías: `conjuntos`, `vestidos` o `bodies`. Para quitar una prenda, borra su línea.
