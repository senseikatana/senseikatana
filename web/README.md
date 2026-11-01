# @senseikatana/web

Astro site for [senseikatana.com](https://senseikatana.com): services, case studies and blog.

## Structure

```
src/
├── components/       # Global UI used by more than one feature
├── config/           # Site, brand and navigation data
├── content/          # Markdown collections (blog, services, works)
├── content.config.ts # Collection schemas
├── features/         # Vertical slices — only real domains
│   ├── blog/         # components/ + queries.ts
│   ├── services/     # components/ + queries.ts
│   └── works/        # components/ + queries.ts
├── i18n/             # Locales and the t() helper
├── layouts/          # App shell (Base.astro)
├── lib/              # Cross-cutting helpers (JSON-LD)
├── pages/            # Thin route layer: composes features only
└── styles/           # Design tokens and global CSS
```

## Architecture rule

Feature-Based Architecture applies to **domain slices**, not to infrastructure.

- `features/<name>/` holds the components and data queries that belong to one domain. A slice
  owns its UI and its data access; nothing reaches into another slice.
- The app shell — layout, global components, site config, i18n, SEO helpers — is **not** a
  feature. It lives in the conventional Astro folders at the root of `src/`.
- `src/pages/` never queries a collection directly. It imports from a feature's `queries.ts`.
- There is no `features/shared/`. If something is shared, it is not a feature.

This is deliberate FBA-lite: three slices that each earn their keep, and no boilerplate around
them. Adding a fourth slice means adding a real domain, not a folder for leftovers.
