# CV Digital — Sergio Jurado

Portfolio profesional multilingüe (ES/CA/EN) construido con Astro 7. Sitio
estático: sin backend, sin adapter, sin JavaScript de framework.

## Estructura

```
cv-sergio-astro/
├── astro.config.mjs
├── public/
│   ├── favicon.svg
│   └── cv/
│       ├── sergio-jurado.jpg    ← retrato (1154×1732)
│       └── sergio-jurado.pdf    ← CV descargable (2 páginas)
└── src/
    ├── data/
    │   ├── cv.ts                ← contenido de /hola (ES)
    │   └── resume.ts            ← contenido de /resume (ES/CA/EN)
    ├── layouts/
    │   └── ResumeLayout.astro   ← shell, nav, i18n switcher, tema
    └── pages/
        ├── index.astro          ← 301 → /hola/
        ├── hola.astro           ← el CV en la web + descarga del PDF
        └── resume/
            ├── index.astro      ← 301 → /resume/es/
            └── [lang]/
                ├── index.astro  ← home por idioma (3 páginas)
                └── [page].astro← about/services/contact/shop + 3 perfiles
```

## Comandos

```bash
bun install
bun run dev        # → http://localhost:4321/
bun run check      # astro check (types + .astro)
bun run build      # astro check && astro build → dist/
bun run preview    # sirve dist/
```

## Rutas generadas (27 páginas)

| Ruta | Páginas | Contenido |
|---|---|---|
| `/` | 1 | redirect instantáneo a `/hola/` |
| `/hola/` | 1 | CV completo en la web, solo ES |
| `/resume/` | 1 | redirect instantáneo a `/resume/es/` |
| `/resume/{es,ca,en}/` | 3 | home por idioma |
| `/resume/{lang}/about/` | 3 | perfil, skills, idiomas, experiencia, formación |
| `/resume/{lang}/services/` | 3 | los 4 servicios ofrecidos |
| `/resume/{lang}/contact/` | 3 | contacto + formulario |
| `/resume/{lang}/shop/` | 3 | tienda de segunda mano |
| `/resume/{lang}/{logistica,fullstack,generico}/` | 9 | perfiles específicos |

`{lang}` ∈ `es` \| `ca` \| `en`. Total: 1 + 1 + 1 + 3 + 3 + 3 + 3 + 3 + 9 = 27.

> **Los redirects no son 301 reales.** En `output: 'static'` Astro no emite
> status HTTP: solo escribe un `<meta http-equiv="refresh" content="0;url=...">`.
> El `status: 301` de `src/pages/index.astro` únicamente controla el *delay* del
> meta refresh (ver `node_modules/astro/dist/core/routing/3xx.js`, donde
> `delay = status === 302 ? 2 : 0`). Para un 301 de verdad hay que agregar una
> regla en el host: `_redirects` (Netlify/Cloudflare Pages), `vercel.json`, o
> una Transform Rule en Cloudflare.

## Fuente de datos

**`src/data/resume.ts` es la fuente de verdad de las rutas y de `/resume`.**

- `LANGS`, `PAGES`, `PROFILE_IDS` y `ROUTE_IDS` viven en ese archivo, no en las
  páginas. `getStaticPaths()` corre en un scope aislado y no puede leer variables
  del frontmatter, pero sí los imports a nivel de módulo, así que las listas se
  importan. Consecuencia práctica: **agregar una página o un perfil es agregar una
  línea acá**, y `astro check` falla si el tipo no encaja con `Page`/`Profile`.
  No hay que tocar `getStaticPaths` en ningún `.astro`.
- `profiles` **no** puede inventar empleadores: la experiencia de cada perfil se
  deriva con `profileExp(lang)` desde `experience[lang]`, que es la lista real de
  empleos. Editar `experience` actualiza los tres perfiles a la vez. Además se
  ordena por fecha descendente y las listas de `tasks` se copian, no se aliasan.
- `ui` está tipado como `Record<Lang, Ui>`, así que TypeScript **falla** si a un
  idioma le falta una clave que los otros tienen. Al agregar un string nuevo hay
  que traducirlo a ES/CA/EN.

`src/data/cv.ts` es una fuente **separada** para `/hola`, que tiene otro shape
(`highlights` vs `tasks`). Ver "Deuda conocida".

## Contacto

No hay backend. El formulario de `/resume/{lang}/contact/` intercepta el submit
con JS y compone un `mailto:` con asunto y cuerpo prellenados, así que abre el
cliente de correo del visitante. El hint debajo del botón lo explica. Si la
validación falla se muestra un mensaje en un `role="alert"` y el foco se mueve al
primer campo inválido; no hay backend al que mandarle los datos.

## Despliegue y headers

Al ser estático, los headers de seguridad hay que definirlos en el host, no en el
HTML (`<meta http-equiv>` no los soporta de forma confiable). Mínimo razonable:
`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin` y `X-Frame-Options: DENY`.
Ojo: una CSP tendría que permitir `'unsafe-inline'` por los dos `<script
is:inline>` (tema y formulario), o habría que convertirlos a scripts externos.

## Deuda conocida

- **Dos fuentes de datos.** `cv.ts` y `resume.ts` duplican nombre, email, teléfono
  y LinkedIn. Hoy los cuatro coinciden (verificado campo por campo), pero el
  riesgo ya es concreto, no hipotético: las fechas de experiencia usan em dash en
  `resume.ts` (`2021 — 2023`) y en dash en `cv.ts` (`2021 – 2023`), y
  `GlovoApp S.L.,` vs `GlovoApp S.L,`. Cualquier edición futura de una sin la
  otra produce `/hola` y `/resume` mostrando datos distintos. No unificado a
  propósito: los shapes son distintos y unificarlos es un refactor sin valor de fix.
- **Los perfiles no están enlazados desde `/hola`**, solo desde el nav de
  `/resume`. Si `/hola` se convierte en la home definitiva, decidir qué pasa con
  `/resume`.
- **Los tres perfiles muestran la misma experiencia.** `profileExp` no filtra, así
  que `/resume/es/fullstack/` (Desarrollo web) lista también los empleos de
  almacén y jardinería. Es honesto —el propio copy del perfil lo dice— pero
  conviene decidir si se filtra por relevancia o se deja así a propósito.
- **Los datos de la tienda son de demostración.** Reemplazar antes de publicar.
- **Las skills están todas en inglés** en el catálogo `es` (`Hard skills`,
  `Soft skills`, `Skills`) mientras `ca` sí las traduce (`Habilitats tècniques`).
  A revisar.
