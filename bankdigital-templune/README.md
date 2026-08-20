# Banca Digital - Templune Template

## 🚀 Descripción

Proyecto **bankdigital-templune** construido con **Bun** y **React 19**. Incluye un SPA cliente con **React Router DOM v7** (rutas) y **TanStack Query v5** (gestión de datos).

- `bun dev` levanta el dev server SPA (`bun --hot index.html`) con HMR.
- `bun run build` genera un sitio estático en `dist/`.
- Las variables de entorno públicas llevan el prefijo `BUN_PUBLIC_*` (ver `bunfig.toml`).

## 📦 Instalación

```bash
bun install
```

## 🛠️ Desarrollo

```bash
# Iniciar en modo desarrollo con hot-reload
bun run dev

# Build para producción
bun run build

# Ejecutar tests
bun run test
```

## 📚 Scripts disponibles

- `bun run dev` - Inicia el servidor de desarrollo
- `bun run build` - Compila el proyecto para producción
- `bun run preview` - Previsualiza el build de producción
- `bun run test` - Ejecuta los tests
- `bun run format` - Formatea el código con Prettier
- `bun run lint` - Ejecuta el linter

## 📄 Licencia

MIT © 2026 samuraicoderdev
