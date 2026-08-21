# 🦁 SINGHA — Nacida del Oro

Landing page premium para la cerveza Singha, con sincronización de video con scroll del usuario.

## 📋 Stack Técnico

| Capa | Tecnología |
|------|-----------|
| **Framework** | [Solid.js](https://solidjs.com/) + [SolidStart](https://start.solidjs.com/) |
| **Lenguaje** | TypeScript |
| **Estilos** | [Tailwind CSS v4](https://tailwindcss.com/) con `@theme` |
| **Componentes** | [solid-ui](https://github.com/stefan-karger/solid-ui) (port de shadcn/ui) |
| **Base de Datos** | [Supabase](https://supabase.com/) (Postgres + Auth) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **Deploy** | [Vercel](https://vercel.com/) (primario) + [GitHub Pages](https://pages.github.com/) (sync) |
| **Package Manager** | [pnpm](https://pnpm.io/) |

## 🚀 Características

- **Video sincronizado con scroll** — El video avanza/retrocede según el desplazamiento del usuario
- **10 capítulos narrativos** — Historia de Singha desde 1933 hasta hoy
- **Animaciones fluidas** — IntersectionObserver para revelar contenido al scroll
- **Contadores animados** — Estadísticas con animación de números
- **Formulario de contacto** — Con validación, honeypot anti-spam y almacenamiento en Supabase
- **FAQ accordion** — Preguntas frecuentes interactivas
- **Accesibilidad** — Skip link, prefers-reduced-motion, WCAG AA compliant
- **SEO optimizado** — Meta tags, Open Graph, sitemap, robots.txt
- **Responsive** — Mobile-first, adapta desde 320px hasta 4K

## 🛠️ Instalación

### Prerrequisitos

- Node.js >= 22
- pnpm >= 9

### Setup

```bash
# Clonar el repositorio
git clone https://github.com/senseikatana/singha-beer-landing.git
cd singha-beer-landing

# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env.local

# Editar .env.local con tus credenciales de Supabase
# (Opcional: el proyecto funciona sin Supabase)

# Iniciar servidor de desarrollo
pnpm dev
```

## 📦 Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build para producción
pnpm start        # Servidor de producción
pnpm typecheck    # Verificar tipos TypeScript

# Base de datos (requiere Supabase configurado)
pnpm db:generate  # Generar migraciones
pnpm db:migrate   # Ejecutar migraciones
pnpm db:push      # Push directo a la base de datos
pnpm db:studio    # Abrir Drizzle Studio
```

## 🗄️ Configuración de Supabase

1. Crear un proyecto en [supabase.com](https://supabase.com)
2. Obtener las credenciales:
   - `VITE_SUPABASE_URL` → Settings → API → Project URL
   - `VITE_SUPABASE_ANON_KEY` → Settings → API → anon public
   - `DATABASE_URL` → Settings → Database → Connection string → URI
3. Agregar a `.env.local`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
DATABASE_URL=postgresql://postgres:password@db.tu-proyecto.supabase.co:5432/postgres
```

4. Ejecutar migraciones:

```bash
pnpm db:push
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── about/          # Componentes de la página "Nosotros"
│   ├── contact/        # Componentes de la página "Contacto"
│   ├── home/           # Componentes de la página principal
│   ├── layout/         # Componentes de layout (Header, Footer, Loader)
│   ├── shared/         # Componentes compartidos (Reveal, Stats, etc.)
│   └── ui/             # Componentes de solid-ui (shadcn port)
├── hooks/              # Custom hooks (useVideoSync, useReveal, etc.)
├── lib/
│   ├── db/             # Drizzle ORM (schema, migraciones)
│   ├── supabase/       # Cliente Supabase
│   └── utils/          # Utilidades (cn, formatters)
├── pages/              # Páginas/rutas
├── routes/             # API routes
└── styles/             # CSS global con Tailwind
```

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Green 950 | `#051710` | Fondo principal |
| Green 900 | `#082418` | Fondo secundario |
| Gold | `#d9a83f` | Acentos, iconos |
| Gold Bright | `#f2cd6b` | Highlights |
| Cream | `#f4ecd8` | Texto principal |
| Red | `#b23a30` | Acentos secundarios |

## 🔤 Tipografías

- **Display**: [Cinzel](https://fonts.google.com/specimen/Cinzel) (títulos, brand)
- **Body**: [Archivo](https://fonts.google.com/specimen/Archivo) (texto, UI)

## 🚀 Deploy

### Vercel (Recomendado)

1. Conectar el repositorio a [Vercel](https://vercel.com)
2. Configurar variables de entorno en Vercel Dashboard
3. Deploy automático en cada push a `main`

### GitHub Pages

1. Ir a Settings → Pages → Source: GitHub Actions
2. El workflow se ejecuta automáticamente en cada push a `main`

## 📊 Métricas de Rendimiento

| Métrica | Objetivo |
|---------|----------|
| Bundle JS | < 50KB gzipped |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | 0 |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |

## 📄 Licencia

MIT © 2026 [samuraicoderdev](https://github.com/senseikatana)
