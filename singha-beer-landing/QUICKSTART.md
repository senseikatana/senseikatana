# ⚡ Quickstart — Singha Beer Landing

## Instalación con Bun (Recomendado)

```bash
# 1. Verificar que Bun está instalado
bun --version

# Si no está instalado:
curl -fsSL https://bun.sh/install | bash

# 2. Navegar al directorio del proyecto
cd singha-beer-landing

# 3. Instalar dependencias
bun install

# 4. Copiar variables de entorno
cp .env.example .env.local

# 5. Editar .env.local con tus credenciales
# (Opcional: el proyecto funciona sin Supabase)

# 6. Iniciar desarrollo
bun run dev
```

**URL**: http://localhost:3000

## Instalación con npm (Alternativa)

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts Principales

### Desarrollo
```bash
bun run dev              # Desarrollo + typecheck en tiempo real ✨
bun run dev:server       # Solo servidor
bun run dev:db           # Servidor + Drizzle Studio
bun run dev:clean        # Cache clean + desarrollo
```

### Build y Preview
```bash
bun run build            # Build para producción
bun run build:static     # Build estático (GitHub Pages)
bun run preview          # Preview del build
bun run preview:static   # Preview estático
```

### Laravel DB
```bash
bun run db:push          # Push schema a DB
bun run db:studio        # Drizzle Studio (puerto 4983)
```

## Configuración de Supabase (Opcional)

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Obtener credenciales:
   - `VITE_SUPABASE_URL` → Settings → API → Project URL
   - `VITE_SUPABASE_ANON_KEY` → Settings → API → anon public
   - `DATABASE_URL` → Settings → Database → Connection string
3. Editar `.env.local`
4. Ejecutar: `bun run db:push`

## Despliegue

### Vercel (Recomendado)
```bash
bun run deploy:vercel
```

### GitHub Pages (Sync)
```bash
bun run deploy:gh-pages
```

### Manual
```bash
bun run build
vercel --prod
```

## Troubleshooting

### Problemas de cache
```bash
bun run dev:clean
```

### Reset completo
```bash
bun run reset
```

### Verificar información del sistema
```bash
bun run info
```

## Workflow de Desarrollo

```bash
# 1. Iniciar desarrollo
bun run dev

# 2. Abrir http://localhost:3000

# 3. Trabajar en los archivos
#    - componentes en src/components/
#    - pages en src/pages/
#    - styles en src/styles/

# 4. Verificar tipos
bun run typecheck

# 5. Build para producción
bun run build

# 6. Preview
bun run preview

# 7. Deploy
bun run deploy:vercel
```

## Git Workflow

```bash
# 1. Crear branch
git checkout -b feature/nueva-feature

# 2. Hacer cambios
# ... editar archivos ...

# 3. Verificar antes de commit
bun run typecheck
bun run lint (si está configurado)

# 4. Commit
git add .
git commit -m "feat: nueva feature"

# 5. Push
git push origin feature/nueva-feature

# 6. Crear PR en GitHub

# 7. Merge a main

# 8. Deploy automático
bun run deploy:vercel
```

## Estructura de Archivos

```
singha-beer-landing/
├── 📄 package.json         # Dependencias y scripts
├── 📄 app.config.ts        # Configuración SolidStart
├── 📄 tsconfig.json        # TypeScript config
├── 📄 drizzle.config.ts     # Drizzle ORM config
├── 📄 bunfig.toml           # Bun config
├── 📄 dev.config.ts         # Dev utilities
├── 📄 .env.example          # Variables de entorno
│
├── 📁 src/
│   ├── 📄 app.tsx           # Root layout
│   ├── 📄 entry-client.tsx  # Client entry
│   │
│   ├── 📁 components/
│   │   ├── 📁 layout/      # Header, Footer, Loader
│   │   ├── 📁 home/        # Hero, VideoStage, ChapterSection
│   │   ├── 📁 about/       # Timeline, LawCard, Quote
│   │   ├── 📁 contact/     # ContactForm, FAQAccordion
│   │   └── 📁 shared/      # Reveal, Stats, Bubbles, etc
│   │
│   ├── 📁 hooks/           # Custom hooks
│   ├── 📁 lib/             # Database, Supabase, utils
│   ├── 📁 pages/           # Route pages
│   ├── 📁 routes/          # API routes
│   └── 📁 styles/          # Global CSS
│
├── 📁 public/
│   ├── 📁 images/          # Imágenes estáticas
│   ├── 📁 videos/          # Videos
│   ├── 📄 favicon.svg      # Favicon
│   ├── 📄 robots.txt       # SEO
│   └── 📄 sitemap.xml      # SEO
│
└── 📁 .github/workflows/   # CI/CD
    ├── 📄 deploy-vercel.yml
    ├── 📄 deploy-gh-pages.yml
    └── 📄 typecheck.yml
```

## Arquitectura del Proyecto

### Componentes Reutilizables
- **Reveal** — IntersectionObserver wrapper para animaciones
- **Bubbles** — Burbujas animadas
- **GhostNumber** — Números decorativos grandes
- **Stats** — Contadores animados
- **ChipList** — Tags con estilo
- **FlavorBar** — Barras de sabor animadas

### Hooks Personalizados
- **useVideoSync** — Sincronización video-supervisión
- **useScrollProgress** — Progreso de scroll (0-1)
- **useReveal** — IntersectionObserver compartido
- **useReducedMotion** — Respeta prefers-reduced-motion

### Páginas
- **home.tsx** — 10 capítulos + video sync
- **nosotros.tsx** — Timeline, leyes de la casa
- **contacto.tsx** — Formulario, FAQ, info

### Backend
- **Supabase** — PostgreSQL + Auth + Realtime
- **Drizzle ORM** — Type-safe queries
- **API Routes** — POST /api/contact

## Recursos

- [Solid.js Docs](https://docs.solidjs.com/)
- [SolidStart Docs](https://start.solidjs.com/)
- [Bun Documentation](https://bun.sh/docs)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Supabase](https://supabase.com/docs)
