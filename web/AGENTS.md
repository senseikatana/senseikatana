## Architecture

Feature-Based Architecture. `src/pages/` is a thin route layer: it composes feature modules and
never holds data queries. Each feature under `src/features/` owns its components and `queries.ts`.
Shared UI, layout and site config live in `src/features/shared/`.

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
