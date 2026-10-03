# Changelog

## v4.0.0 — External Products, Secure Checkout & Webhook

### Added

- **External (second-hand) products**: `Product` now supports optional `externalUrl` and `externalPlatform: 'wallapop' | 'vinted'`. Added 2 example products (`Apple Watch Series 7`, `Zapatillas Nike Air Max`) under the `segunda-mano` category with a TODO to replace the real listing URLs
- **`externalPlatformLabel(platform)` helper**: exported from `data/products.ts` for the platform display name
- **Stripe webhook** (`server/api/webhook.post.ts`): `POST /api/webhook` verifies the `stripe-signature` header via `stripe.webhooks.constructEvent` on `readRawBody` and handles `checkout.session.completed` and `checkout.session.expired`. Requires `STRIPE_WEBHOOK_SECRET`
- **Security headers** (`nuxt.config.ts` → `routeRules`): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- **Stripe seed script** (`scripts/seed-stripe.ts`): `bun run seed:stripe` creates Products/Prices for digital-only products (ignores external). Idempotent via `app_id` metadata. `--update` rewrites the real `stripePriceId` into `data/products.ts`. Fails with exit 1 if `STRIPE_SECRET_KEY` is missing
- **ESLint flat config** (`eslint.config.mjs`) with devDependencies `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-vue`; readonly Vue/Nuxt auto-import globals; ignores for build/deps dirs
- **External product cards**: store index, product detail and homepage featured cards show a "Ver en Wallapop / Ver en Vinted" button (per `externalPlatformLabel`) opening the external URL in a new tab with `i-lucide-external-link`. Digital products keep the View Details → Add to Cart flow

### Changed

- **Secure checkout** (`server/api/checkout.post.ts`): input now validated server-side — accepts only `priceId` that exist in `data/products.ts` and `quantity` integer 1-10 (`MAX_QUANTITY`). The server decides what gets charged, never the client
- `data/profiles.ts`: removed unused `useSlugify` import
- `app/pages/about.vue`: moved `<script setup>` before `<template>`

### Tests

- `tests/products.test.ts` now has 6 tests, adding validations for external products (valid platform, `https` `externalUrl`, empty `stripePriceId`)

---

## v3.0.0 — Brand Palette Refactor

### Breaking Changes

- **Renamed all color palettes**: removed `sensei-*` prefix entirely
  - `sensei-pink` → `rose` (#F43F5E)
  - `sensei-teal` → `teal` (#38686B)
  - `sensei-teal-bright` → removed (replaced by `emerald`)
  - `sensei-teal-light` → removed (consolidated into `teal`)
  - `sensei-yellow` → `yellow` (#F6DC8E)
  - `sensei-lavender` → `lavender` (#8C86AA)
  - `sensei-dark` → `dark` (#11151C)
  - `sensei-white` → `white` (#E4E4E7)
- **Added new palettes**: `emerald` (#10B981), `sky` (#25ABE4)
- **Removed palettes**: `sensei-teal-light`, `sensei-teal-bright` (overlapping teals consolidated)

### Updated

- `app/assets/css/main.css` — 8 palettes × 11 shades (50-950) in OKLCH
- `app/app.config.ts` — Nuxt UI semantic role mapping
- `nuxt.config.ts` — `ui.theme.colors` array
- `DESIGN.md` — Complete brand documentation

### Color Role Mapping

| Role | Color | Hex |
|---|---|---|
| primary | rose | #F43F5E |
| secondary | teal | #38686B |
| success | emerald | #10B981 |
| warning | yellow | #F6DC8E |
| error | rose | #F43F5E |
| info | sky | #25ABE4 |
| neutral | dark | #11151C |

---

## v2.0.0 — Initial Brand Palette

- Applied brand palette from PDF (v2.0.0)
- 8 `sensei-*` palettes with OKLCH values
- Dark mode by default

## v1.0.0 — Project Setup

- Nuxt 4 + Nuxt UI v4 + Pinia + Content + Stripe
- CV/Resume multi-language pages
- Blog with Nuxt Content v3
- Store with cart and Stripe checkout
- Unit tests with Vitest
