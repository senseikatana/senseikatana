## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Commands

- `bun run check` — typecheck frontend (`astro check`); fix before pushing.
- `bun run check:server` — typecheck backend (`tsc -p server/tsconfig.json`).
- `bun run dev:server` — backend de mensajería en `http://localhost:8787`.
- `bun run build` — production build.
- To test messaging end-to-end locally you need `server/` running (SQLite + SSE + webhooks).

## Roles & permissions

- `src/auth/roles.ts` — capability model (`Capability`), `DEFAULT_ROLES`, and helpers `can()`, `roleLabel()`, `resolveRoleId()`.
- `src/data/rolesStore.ts` — localStorage persistence of customized roles (`whm.roles`), with `resetRoles()` to restore defaults.
- `src/hooks/useRoles.ts` — reactive roles hook.
- UI is gated via `can(roleId, cap, roles)` in `src/components/dashboard/App.tsx` (nav items, view guards, Kitt panel, mock injection) and via `canEdit`/`canDelete` props on `CrudView`.
- Users reference roles by id in the `role` field; `LoginScreen` maps them with `resolveRoleId()`. Seeded roles (`admin`, `manager`, `picker`, `formador`, `practicas`) are merged into an existing DB without deleting custom users.
- `src/data/localStore.ts` uses `SEED_VERSION` (`whm.seed.version`) to run one-time seed merges when the seed data set changes; bump it to force a re-seed of missing rows.

## Authentication (Supabase Auth)

- `src/hooks/useAuth.ts` returns `authMode` (`supabase` | `demo`). Supabase mode activates when `PUBLIC_SUPABASE_URL` + `PUBLIC_SUPABASE_ANON_KEY` are present; otherwise the app falls back to local demo operators (IndexedDB).
- `src/lib/supabase.ts` — browser client singleton, `getSessionToken()`, `signUp()` (registration with role in `user_metadata`), `fetchProfile()`.
- Role resolution (`fetchProfile`) reads `user_metadata.name` / `user_metadata.role_id` FIRST, falling back to the `profiles` table when it exists. This means the app works with zero Postgres setup (registration + seed only need the REST API). Unknown role ids fall back to `picker`.
- `LoginScreen` renders email/password with a "Sign up" toggle (email + password + name + role selector — ALL roles are selectable by design, including admin; privilege-escalation risk, OK for an internal panel). `signInWithPassword` reports errors via `invalidCredentials`; registration reports the raw Supabase error and `needsConfirmation` when the project has *Confirm email* enabled (session is null after signUp).
- Messaging/Kitt clients attach the JWT automatically: `src/lib/messaging.ts` and `src/lib/kit.ts` send `Authorization: Bearer`; `useMessaging` passes the token to SSE as `?token=` (EventSource can't set headers).
- `server/auth.ts` — Express middleware `requireAuth`. Enabled only when `SUPABASE_JWKS_URL` is set (validates against the project JWKS via `jose`); without it all routes stay open for local dev. Protected routes are listed with `auth: true` in `ENDPOINTS` in `server/index.ts`. The Meta webhook, `/api/health`, and the manifest `/api` stay public.
- `scripts/seed-supabase.ts` (`bun run seed:supabase`) is REST-only: creates/updates users via the admin API writing `name`/`role_id` to `user_metadata`. Seeds the 5 role users (`<role_id>@warehouse.local`, password `Cambiame123!` / `SEED_USER_PASSWORD`) plus demo access `admin@admin.com` / `admin12345678` and `picker@demo.com` / `admin12345678` (all `email_confirm: true`). `profiles` sync to Postgres is optional and skipped with a warning if `DATABASE_URL` is missing/broken.

## Project structure

- `src/` — Astro SPA (React island, Tailwind v4, IndexedDB stores).
- `server/` — Express + Drizzle + SQLite (libSQL) messaging backend. Telegram via long-polling, WhatsApp via Cloud API webhooks, SSE hub. Typechecked separately with `server/tsconfig.json`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
