# @senseikatana/web

Astro site for [senseikatana.com](https://senseikatana.com): services, case studies and blog.

## Structure

```
src/
├── content/          # Markdown collections (blog, services, works)
├── content.config.ts # Collection schemas
├── features/         # Feature-Based Architecture
│   ├── blog/         # components + queries
│   ├── i18n/         # locales + t() helper
│   ├── seo/          # JSON-LD builders
│   ├── services/     # components + queries
│   ├── shared/       # layout, UI primitives, site config
│   └── works/        # components + queries
├── pages/            # Thin route layer: compose features only
└── styles/           # Design tokens and global CSS
```

## Rules

- `src/pages/` never contains business logic or data queries. It composes feature modules.
- Each feature owns its `components/` and `queries.ts`. Nothing imports across features except through `features/shared`.
- Content lives in `src/content/<collection>/` and is validated by `src/content.config.ts`.

## Commands

From the repository root (Bun workspace):

```bash
bun run dev      # astro dev
bun run build    # astro build
bun run preview  # astro preview
bun run check    # prettier + eslint + astro check
```
