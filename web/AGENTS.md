## Architecture

Feature-Based Architecture, scoped to domain slices only.

- `src/features/<name>/` owns one domain: its components and its `queries.ts`. Nothing imports
  across features.
- App shell is **not** a feature: `src/layouts/`, `src/components/`, `src/config/`, `src/i18n/`,
  `src/lib/` and `src/styles/` sit at the root of `src/`, following Astro conventions.
- There is no `features/shared/`. Shared code belongs in `src/components/` or `src/lib/`.
- `src/pages/` is a thin route layer. It composes features and never queries collections directly.

Content is Markdown under `src/content/`, validated by `src/content.config.ts`.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status` and `astro dev logs`.

## Documentation

- Routing: https://docs.astro.build/en/guides/routing/
- Content collections: https://docs.astro.build/en/guides/content-collections/
- Styling and Tailwind: https://docs.astro.build/en/guides/styling/
