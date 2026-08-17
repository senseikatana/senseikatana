# AGENTS.md

Empresa Plana (CA) website. Screens are designed in **Google Stitch** (project
`Dashboard Empresa Plana`, design system **"Empresa Plana - Branding"**) and
exported as HTML into `stitch-export/`, then transformed into Astro pages.

## Stack

- Astro 7 + `@astrojs/node` adapter + `@astrojs/react` (islands)
- Package manager: **bun** (`bun.lock` present)
- Node >= 22.12
- Database: **Turso** (libsql) via `@libsql/client` + **Drizzle ORM**
  (`drizzle-orm` + `drizzle-kit`), validation with **zod v4**, auth tokens with
  **jose** (HS256 JWT in an httpOnly cookie). Credentials in `.env`
  (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`).
- Styling: **Tailwind CSS v4 build-time** via `@tailwindcss/vite` (no CDN) +
  Geist + Material Symbols. Theme lives in `src/styles/global.css` (`@theme`
  block mirroring `src/assets/DESIGN.md`; brand colors exposed as CSS custom
  properties in `:root`).

## Commands

Run everything from this directory:

- `bun install`
- `bun run dev` — dev server on port 4321
- `bun run build` — builds `dist/` (server entry + client assets)
- `bun run preview` — serves the production build

## Rendering mode

- `astro.config.mjs` sets `output: "server"` with the Node adapter
  (`mode: "standalone"`). Astro 7 removed `output: "hybrid"`; `server` renders
  every route on request.
- `security: { checkOrigin: false }` — the API endpoints are consumed by
  non-browser clients (no `Origin` header). CSRF is mitigated by the session
  cookie's `sameSite: "lax"` (browsers don't send it on cross-site POSTs).
- All pages declare `export const prerender = false;` (redundant but explicit
  in server mode). The only client-side code is the `BusTrackingPanel` React
  island (`client:load`).
- Client-side prefetching is enabled (`prefetch: { prefetchAll: true }`).

## Design system

Canonical tokens live in `src/assets/DESIGN.md` (mirror of the Stitch
"Empresa Plana - Branding" design system). Key facts:

- Brand colors: `deep-navy` `#013990`, `coastal-teal` `#13AEB8`,
  `energetic-orange` `#EB8E02` (CTAs only), background `#f8f9fa`.
- Font: Geist (400/600/700). Radius: `DEFAULT 0.25rem` / `lg 0.5rem` /
  `xl 0.75rem` / `full`. Ambient shadow `0px 4px 20px rgba(1,57,144,0.08)`.
- Spacing tokens: `margin-desktop 48px`, `margin-mobile 16px`, `gutter 24px`,
  `stack-sm/md/lg 8/16/32px`, `container-max 1280px`.

## Structure

- `src/layouts/BaseLayout.astro` — owns `<head>` (fonts, Tailwind CDN, the
  canonical `tailwind.config`, Material Symbols, shared utility styles) and the
  `<body>` wrapper. Pages only contribute body content via `<slot />`.
- `src/pages/*.astro` — one page per Stitch screen:
  `/rutas-horarios`, `/mobile`, `/donde-estamos`, `/home-variant-1`,
  `/donde-estamos-mobile`, `/home-variant-2`, `/servicios-discrecionales`,
  `/rastreig` (bus tracking demo), plus `/` (hub linking all screens).
- `stitch-export/` — raw exports from Stitch (HTML + PNG per screen). Use these
  as the source of truth when regenerating pages.
- `src/config/i18n/` — all site copy (ES/EN/CA) in `es.json` / `en.json` /
  `ca.json` (406 keys, identical shape). Includes pages, about, full legal
  texts (notice, cookies, privacy) and the bus-tracking UI, formerly scraped
  into `src/data/`.

## Database (Turso + Drizzle)

- `db/schema.ts` — Drizzle schema: `lines`, `schedules` (route timetables,
  stops denormalized in `stops_json`), `line_connections` (same-bus line
  chaining: from_line_id → at_stop label → to_line_id, wait_min default 0)
  and `usuarios` (name, full_name, phone, email unique, passkey_hash, username
  unique, role enum `client|worker|admin`, created_at). `db/schema.sql` is the
  legacy bootstrap for `lines`/`schedules`/`line_connections` (idempotent
  `IF NOT EXISTS`); new tables go through Drizzle migrations in `drizzle/`.
- `drizzle.config.ts` — `dialect: "turso"`, reads `.env`. Gotcha:
  `drizzle-kit migrate` hangs against Turso under bun; apply migrations via
  the Turso HTTP `/v2/pipeline` API (statements `{ q, params }`) and record
  the sha256 hash of the file in `__drizzle_migrations`. `drizzle-kit
  generate` works normally.
- `src/lib/db.ts` — exports `client` (raw libsql) and `db` (drizzle).
- Seed scripts (`bun scripts/seed.mjs`, `bun scripts/seed-users.mjs`): scrape
  the real site (`empresaplana.cat/descargas`) in BOTH directions per line
  (seasonal lines return 0 rows out of season, so the seeder tries
  15/08/2026, 15/09/2026 and 15/11/2026 and keeps the richest response). Line
  names come from the resolved PDF filename. Idempotent (DELETE + insert).

## Google Sheets sync

- Source of truth for line stops is a Google Sheets spreadsheet; Turso stays
  the read model for the search. `scripts/seed.mjs` (scraper) is only a
  bootstrap — add/edit missing lines in the sheet and sync. Template (see
  `sheets-export/` for a real dump):
  - Tab `LÍNEAS`: columns `id | nombre | pdf_url`.
  - One tab per line named `{id} - {nombre}`. Row 1 = stops as
    `{Población} — {Parada}`; each following row = one departure with
    `HH:MM` per stop (empty cells = express skips). origin/dest/duration are
    derived from first/last stop.
  - Tab `CONEXIONES`: columns `desde_linea | parada | hasta_linea | espera_min`
    — same-bus line chaining (e.g. `46 | Cambrils — Psg. d'Albert | 11 | 0`).
- Credentials in `.env`: `GOOGLE_SERVICE_ACCOUNT_JSON` (path to the service
  account key JSON, relative to repo root) + `GOOGLE_SPREADSHEET_ID`. Share
  the spreadsheet with the service account email (reader). The service
  account JWT (RS256) is signed with `jose` and exchanged for an OAuth token —
  no extra deps.
- `bun scripts/sync-sheets.mjs` (`bun run sync:sheets`) — reads the
  spreadsheet (Sheets API `values`) and REPLACES `lines`/`schedules` in Turso
  (idempotent).
- `bun scripts/export-sheets.mjs` (`bun run export:sheets`) — dumps current
  Turso data to `sheets-export/*.csv` in the exact template format (import
  into Google Sheets to bootstrap). Round-trip is lossless (verified 710/710).
- Grid caveats: stops are per-line fixed (header); departures whose stops are
  a subset of the header survive; `lat`/`lon` are not carried through the
  sheet.

## Search & results

- `src/lib/search.ts` — `searchRoutes(origin, destination, withTransfers)`:
  accent-insensitive match of towns inside `stops_json` (order matters:
  origin must appear before destination). Returns per-line summaries
  (stops, departures capped at 24, first/last, PDF) + transfer options via
  shared hub towns (cap 6).
- "Same bus" journeys (`through`): reads `line_connections`; for each chain
  A→B at stop S, pairs departures where the A-schedule reaches S and the
  B-schedule leaves S within `max(wait_min, 10)` minutes. Origin must precede
  S on line A and S must precede destination on line B. Results show both
  legs, the connection stop and the aligned departure pairs.
- `/rutas-horarios` posts to itself (`#results` anchor) and renders
  `RouteAccordion` / `TransferAccordion` / `ThroughAccordion` components.
  Form defaults: Tarragona → Salou.

## Auth & users

- `src/lib/passkey.ts` — scrypt hashing (`salt:hash`, node:crypto, no deps).
- `src/lib/auth.ts` — JWT session via `jose` (HS256, `AUTH_SECRET`, 7d) in
  the `ep_session` httpOnly cookie; `authorize(cookies, role?)` guard returns
  a ready-made 401/403 `Response`.
- `src/lib/validation/users.ts` — zod v4 schemas (create/update/login);
  errors map to `{ error, issues }`. Unique conflicts are pre-checked →
  `{ error: "conflict", field }` 409.
- API: `POST /api/auth/login|logout`, `GET /api/auth/me`, `GET|POST
  /api/users` (admin), `GET|PATCH|DELETE /api/users/[id]` (admin; can't
  delete yourself). `passkey_hash` is never exposed.
- Demo users (seed-users): `admin/ADMIN1234`, `worker/WORKER12`,
  `client/CLIENT01`. Google Auth is planned as a future addition.

## Bus tracking (Glovo-style)

- `src/components/BusTrackingPanel.tsx` — React island (`client:load`) with
  report buttons (passed / on time / late / early / not passed / cancelled),
  escalation progress and a review (stars) form. Receives `t` (the
  `busTracking` dictionary) and `stops` from the page.
- Demo page: `/rastreig` (`src/pages/rastreig.astro`), linked from the hub.
- API (server-rendered, `prerender = false`):
  - `GET|POST /api/bus-tracking/reports` — submit/list stop reports.
  - `GET|POST /api/bus-tracking/reviews` — submit/list reviews.
- `src/lib/tracking-store.ts` — JSON file persistence (`.data/bus-tracking.json`,
  git-ignored; override path with `BUS_TRACKING_DATA_FILE`). Escalation: after
  `ESCALATION_THRESHOLD` (3) negative reports on a line, an escalation record
  is created (company + driver coordinator notified). Swap this store for
  Supabase when real persistence is needed.

## Gotchas

- Design tokens live ONLY in `src/styles/global.css` (`@theme`) — add colors,
  spacing, fonts or text sizes there, never ad-hoc `bg-[#...]` values.
- `BaseLayout.astro` imports `../styles/global.css`; do not remove that import
  or styling breaks.
- `astro.config.mjs` must import from `astro/config` (not `astro/defineConfig`)
  and wire `tailwindcss()` from `@tailwindcss/vite` under `vite.plugins`.
- `AGENTS.md` / `DESIGN.md` / `stitch-export/` live at the repo root of this
  project; do not nest another git repo here (`.git` already exists at root).
- Never commit `.env` (copy from `.env.example` when needed).

## Regenerating pages from Stitch

1. Re-export the updated screen HTML/PNG into `stitch-export/`.
2. Transform each HTML: strip `<head>`, keep `<body>` inner content, then wrap
   in `BaseLayout` with `export const prerender = false;`.
3. Run `bun run build` and verify all routes.
