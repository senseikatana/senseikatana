# CV Digital — Sergio Jurado

Portfolio profesional multilingüe (ES/CA/EN) construido con Astro.

## Estructura

```
src/
├── data/resume.ts          ← Datos reales del CV
├── layouts/ResumeLayout.astro
├── pages/resume/
│   ├── index.astro         ← Redirect a /resume/es/
│   └── [lang]/
│       ├── index.astro     ← Home por idioma
│       └── [page].astro    ← about/services/contact/shop + perfiles
└── public/
```

## Ejecutar

```bash
bun install
bun run dev      # → http://localhost:4321/resume/
bun run build    # → dist/
```

## Rutas generadas (25 páginas)

- `/resume/es/`, `/resume/ca/`, `/resume/en/` — Home
- `/resume/{lang}/about`, `services`, `contact`, `shop`
- `/resume/{lang}/logistica`, `fullstack`, `generico`
