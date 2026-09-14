# CV Digital — Sergio Jurado

Portfolio profesional multilingüe (ES/CA/EN) construido con Astro, con CV
descargable en PDF generado desde los mismos datos que la web.

## Estructura

```
src/
├── data/resume.ts          ← Datos reales del CV (única fuente de verdad)
├── layouts/ResumeLayout.astro
├── pages/
│   ├── index.astro         ← Redirige a /hola/
│   ├── hola.astro          ← El CV explicado sección a sección + descarga PDF
│   └── resume/
│       ├── index.astro     ← Redirige a /resume/es/
│       └── [lang]/
│           ├── index.astro ← Home por idioma
│           └── [page].astro← about/services/contact/shop + perfiles
├── public/
│   ├── favicon.svg
│   └── cv/                 ← PDFs generados (sergio-jurado-cv-{es,ca,en}.pdf)
scripts/
└── build-pdf.ts            ← Genera los PDF con Chromium headless
```

## Ejecutar

```bash
bun install
bun run dev        # → http://localhost:4321/
bun run pdf        # Regenera los PDF tras editar resume.ts (requiere chromium en el PATH)
bun run build      # → dist/
```

## Rutas generadas (27 páginas + 3 PDFs)

- `/` → redirige a `/hola/`
- `/hola/` — el CV explicado en la propia web, con botón de descarga del PDF
  (también en català e English)
- `/resume/es/`, `/resume/ca/`, `/resume/en/` — Home por idioma
- `/resume/{lang}/about`, `services`, `contact`, `shop`
- `/resume/{lang}/logistica`, `fullstack`, `generico` — perfiles adaptados
- `/cv/sergio-jurado-cv-{es,ca,en}.pdf` — CV descargable (A4, 2 páginas)

## Editar el CV

Todo el contenido (web y PDF) vive en `src/data/resume.ts`. Tras editarlo:

```bash
bun run pdf && bun run build
```

Los PDF quedan versionados en `public/cv/` para que el build no dependa de
Chromium en el servidor de despliegue.
