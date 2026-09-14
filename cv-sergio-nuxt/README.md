# CV Sergio Nuxt

Portfolio, CV, Blog y Tienda de **Sergio Esteban** — construido con Nuxt 4, Nuxt UI v4, Nuxt Content, Pinia y Stripe.

**Live**: [senseikatana.com](https://senseikatana.com)

## Características

- **CV/Resume**: Páginas dinámicas multi-idioma (ES/EN) con perfiles flat
- **Blog**: CMS basado en archivos con Nuxt Content v3 (Markdown)
- **Tienda**: Catálogo de productos con carrito (Pinia) y checkout con Stripe
- **Catálogo externo**: Productos de segunda mano (Wallapop, Vinted) que enlazan al anuncio externo sin pasar por Stripe
- **Checkout seguro**: El servidor valida y normaliza la entrada (solo `priceId` del catálogo, `quantity` 1-10); el cliente nunca decide qué se cobra
- **Webhook de Stripe**: `POST /api/webhook` verifica la firma y maneja `checkout.session.completed` / `expired`
- **UI**: Nuxt UI v4, dark mode, paleta brand OKLCH
- **Testing**: Tests unitarios con Vitest
- **Lint**: ESLint flat config con soporte de TypeScript y Vue/Nuxt auto-imports
- **Slugs**: Generados con `useSlugify()` de KatanaKit (`katanakit-js`)

## Stack Tecnológico

- Nuxt 4 (compatibility version 4)
- Nuxt UI v4
- Nuxt Content v3
- Pinia
- Stripe
- KatanaKit (`katanakit-js`)
- Prisma (ORM — conexión a InsForge Postgres)
- Vitest
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

See [DESIGN.md](./DESIGN.md) for full design system documentation.

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
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe (`sk_test_...` o `sk_live_...`) |
| `STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe (`pk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Secreto del webhook de Stripe (`whsec_...`) — necesario para `POST /api/webhook` |
| `SITE_URL` | URL del sitio (usada en las URLs de redirect del checkout) |

## Scripts

| Script | Descripción |
|---|---|
| `bun run dev` | Servidor de desarrollo |
| `bun run build` | Build de producción |
| `bun run preview` | Preview del build |
| `bun run test` | Ejecutar tests |
| `bun run lint` | Lint con ESLint |
| `bun run seed:stripe` | Crea Products/Prices en Stripe para los productos digitales (no toca archivos) |
| `bun run seed:stripe --update` | Además reescribe los `stripePriceId` reales en `data/products.ts` |

## Estructura

```
├── app/
│   ├── assets/css/     # Tokens y tema (main.css)
│   ├── components/     # Componentes Vue
│   ├── layouts/        # Layouts de la aplicación
│   ├── pages/          # Páginas (file-based routing)
│   └── stores/         # Stores de Pinia
├── content/
│   └── blog/           # Posts del blog en Markdown
├── data/
│   ├── products.ts     # Datos de productos (digitales + externos, useSlugify)
│   └── profiles.ts     # Datos del CV (flat array, multi-lang)
├── server/
│   └── api/            # API routes (checkout, webhook de Stripe)
├── scripts/
│   └── seed-stripe.ts  # Seed de Products/Prices en Stripe (idempotente)
├── prisma/
│   └── schema.prisma   # Prisma schema (InsForge Postgres)
├── tests/              # Tests con Vitest
└── eslint.config.mjs   # ESLint flat config (TS + Vue/Nuxt)
```

## Seguridad

- **Checkout validado en servidor** (`server/api/checkout.post.ts`): solo acepta `priceId` existentes en `~~/data/products` y `quantity` entero entre 1 y 10. El servidor decide qué se cobra, nunca el cliente.
- **Webhook firmado** (`server/api/webhook.post.ts`): `POST /api/webhook` verifica la firma `stripe-signature` con `stripe.webhooks.constructEvent` (sobre el body crudo) y maneja `checkout.session.completed` y `checkout.session.expired`. Requiere `STRIPE_WEBHOOK_SECRET`.
- **Cabeceras de seguridad** (`nuxt.config.ts` → `routeRules`): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` y `Permissions-Policy` (cámara, micrófono y geolocalización deshabilitados).

## Productos externos

Los productos con `externalUrl` (segunda mano en Wallapop/Vinted) **no** usan Stripe:

- En la card y la página de detalle, el botón se muestra como "Ver en Wallapop" / "Ver en Vinted" (según `externalPlatformLabel()`) y abre el enlace en pestaña nueva con `i-lucide-external-link`.
- Los productos digitales (sin `externalUrl`) mantienen el flujo View Details → Add to Cart → checkout.
- El seed de Stripe ignora los productos externos (no tienen `stripePriceId`).

## Deployment

```bash
bun run build
bun run preview
```

## Licencia

MIT
