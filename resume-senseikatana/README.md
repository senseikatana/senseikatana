# Sergio Jurado · CV / Portfolio

CV digital y portfolio multilingüe construido con [Astro](https://astro.build).

## Estructura

```
src/
├── layouts/
│   └── Base.astro      ← Layout compartido (head, header, footer, scripts)
└── pages/
    ├── index.astro      ← Redirige a /es/
    ├── es/
    │   ├── index.astro       ← Inicio español
    │   ├── logistica.astro
    │   ├── fullstack.astro
    │   └── generico.astro
    ├── ca/                   ← Catalán (misma estructura)
    └── en/                   ← Inglés (misma estructura)
public/
├── _astro/_profile_.BHwwt2wB.css   ← Estilos generados por Perplexity
└── favicon.svg
```

## Rutas

| Ruta | Contenido |
|------|-----------|
| `/` | Redirige a `/es/` |
| `/es/`, `/ca/`, `/en/` | Home por idioma |
| `/es/logistica`, `/ca/logistica`, `/en/logistica` | CV Logística |
| `/es/fullstack`, `/ca/fullstack`, `/en/fullstack` | CV Fullstack |
| `/es/generico`, `/ca/generico`, `/en/generico` | CV Genérico |

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Genera dist/
npm run preview  # Previsualiza build
```
