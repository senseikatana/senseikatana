# Senseikatana

Portfolio, CV y Blog de **Sergio Jurado Casado** — construido con Nuxt 4, Nuxt UI v4 y Nuxt Content.

**Live**: [senseikatana.com](https://senseikatana.com)

## Características

- **CV/Resume**: Páginas multi-idioma (ES/CA/EN) servidas desde una colección de `@nuxt/content`
- **Blog**: CMS basado en archivos con Nuxt Content v3 (Markdown), con soporte de `draft`
- **Dark-first**: `preference: 'dark'` con toggle light/dark/system persistido
- **Seguridad**: CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` en todas las rutas
- **UI**: Nuxt UI v4, paleta brand en OKLCH
- **Testing**: Vitest sobre la integridad de las colecciones de contenido
- **Lint**: ESLint flat config con soporte de TypeScript y Vue/Nuxt auto-imports

## Stack Tecnológico

- Nuxt 4 (compatibility version 4)
- Nuxt UI v4
- Nuxt Content v3
- `@nuxtjs/i18n` v10
- better-sqlite3 (backend de contenido)
- Vitest
- ESLint
- TypeScript

## Brand Palette

| Color | Hex | Role |
|---|---|---|
| rose | #F43F5E | primary / error |
| teal | #38686B | secondary |
| emerald | #10B981 | success |
| yellow | #F6DC8E | warning |
| sky | #25ABE4 | info |
| dark | #11151C | neutral |
| white | #E4E4E7 | contrast |
| lavender | #8C86AA | accent |

Los tokens se definen en `app/assets/css/main.css` con `@theme` en OKLCH, y las
escalas `dark-*` / `white-*` se invierten bajo `.dark`.

## Colecciones de contenido

Definidas en `content.config.ts`, cada una con schema Zod:

| Collection | Tipo | Source | Notas |
|---|---|---|---|
| `blog` | page | `blog/**` | Requiere `title`, `description`, `date`. Soporta `draft`. |
| `resume` | data | `resume/**` | Un JSON por idioma (`es`, `ca`, `en`). |
| `services` | page | `services/**` | Cards de servicios. Estado inicial: placeholders `draft: true`. |
| `projects` | page | `projects/**` | Casos de estudio con `challenge` / `solution` / `outcome`. Estado inicial: placeholder `draft: true`. |
| `testimonials` | data | `testimonials/**` | `source` es obligatorio: ninguna cita se publica sin procedencia. |

Los placeholders en `services/`, `projects/` y `testimonials/` están marcados
`draft: true` y `tests/content.test.ts` falla si alguno se publica sin editar.

## Configuración

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   bun install
   ```
3. Copiar `.env.example` a `.env` y configurar las variables de entorno
4. Ejecutar en modo desarrollo:
   ```bash
   bun run dev
   ```

### Variables de entorno

| Variable | Descripción |
|---|---|
| `SITE_URL` | URL del sitio |

## Scripts

| Script | Descripción |
|---|---|
| `bun run dev` | Servidor de desarrollo |
| `bun run build` | Build de producción |
| `bun run preview` | Preview del build |
| `bun run generate` | Generate estático |
| `bun run test` | Ejecutar tests |
| `bun run lint` | Lint con ESLint |

## Estructura

```
├── app/
│   ├── assets/css/     # Tokens y tema (main.css)
│   ├── components/     # Componentes Vue
│   ├── layouts/        # Layouts de la aplicación
│   └── pages/          # Páginas (file-based routing)
├── content/
│   ├── blog/           # Posts en Markdown
│   ├── resume/         # CV por idioma (JSON)
│   ├── services/       # Servicios
│   ├── projects/       # Casos de estudio
│   └── testimonials/   # Testimonios
├── data/
│   └── site.ts         # Nombre y enlaces del sitio
├── i18n/locales/       # Traducciones (es, ca, en)
├── tests/              # Tests con Vitest
└── eslint.config.mjs   # ESLint flat config (TS + Vue/Nuxt)
```

## Seguridad

- **CSP** (`nuxt.config.ts` → `routeRules`): `default-src 'self'` con `frame-src`,
  `frame-ancestors 'none'`, `object-src 'none'` y `base-uri 'self'`.
- **Cabeceras**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin` y `Permissions-Policy`
  (cámara, micrófono y geolocalización deshabilitados), aplicadas a `/**` — cubren
  también las rutas con prefijo de locale.
- **Markdown**: `@nuxt/content` / `@nuxtjs/mdc` elimina atributos peligrosos
  (`onerror`, `javascript:`, `@click`, `v-on:click`) y renderiza `<script>` y
  `<base>` como texto escapado. No hay `v-html` en la aplicación.
- **Dependencias**: `bun audit` limpio para paquetes que llegan a producción
  (`devalue` fijado a `5.9.4` vía `resolutions`).

## Deployment

```bash
bun run build
bun run preview
```

## Licencia

MIT