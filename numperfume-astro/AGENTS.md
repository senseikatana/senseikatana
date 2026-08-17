# AGENTS.md

## Quick Start

- **Runtime**: Bun (install with `bun install --frozen-lockfile`)
- **Node version**: >=22.12.0
- **Dev server**: `bun dev` (Astro dev on port 4321)
- **Build**: `bun build` → outputs to `./dist/`
- **Typecheck**: `bun tsc --noEmit`

## Repo Structure

- **Pages**: Astro file-based routing in `src/pages/`
- **Components**: Reusable Astro/React components in `src/components/`
- **Layouts**: `src/layouts/Layout.astro` (header, footer, navigation)
- **Assets**: `src/assets/` (images, SVGs)
- **Styles**: `src/styles/global.css` with custom Tailwind theme (gold/warm color palettes)

## Branch Strategy

- `main`: Production deployments
- `develop`: Stable development branch
- `feature/`, `patch/`, `hotfix/`: Feature/bugfix branches

## CI/CD Pipeline

**PR/develop pushes** run: `eslint → tsc --noEmit → build → playwright tests`

**main pushes** deploy to Cloudflare Pages:
```bash
bun install --frozen-lockfile
bun build
npx eslint . --max-warnings=0
cloudflare pages deploy --project-name=numperfumes --prod
```

## Theme & Design System

**Colors**: Custom Tailwind theme defined in `src/styles/global.css`:
- `gold-{50-900}`: Primary accent
- `warm-{50-900}`: Neutrals
- `cream`: Background

**Fonts**:
- Serif: `Playfair Display`
- Sans: `Inter`

**Key CSS utilities in use**: `shimmer-text`, `.grain`, `.glass`, custom animations (`animate-fade-in-up`, `animate-float`, etc.)

## Content Structure

- **No content collections**: All content is inline in `.astro` files
- **Supabase**: Installed via `@supabase/supabase-js` and `auth-astro` for auth
- **React**: via `@astrojs/react` integration

## Common Commands

| Command | Purpose |
|---------|---------|
| `bun dev` | Start local dev server |
| `bun build` | Production build |
| `bun preview` | Preview production build locally |
| `bun tsc --noEmit` | Type check |
| `bun audit` | Security audit |
| `bun run astro` | Astro CLI |

## Developer Conventions

- Components use `.astro` extension (Astro components)
- Pages use `.astro` extension (file-based routing)
- No ESLint config found; CI runs `eslint --max-warnings=0`
- Commit messages follow conventional commits pattern (from `.github/WORKFLOW.md`):
  - `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `perf:`

## Operational Notes

- **Deployment secrets required**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- **Preview deployments**: Automatically deployed for PRs to Cloudflare Pages
- **Images**: Hosted on `genspark.ai` (external CDN, cache control: 3600s)

<!-- INSFORGE:START -->
## InsForge backend

This project uses [InsForge](https://insforge.dev): an all-in-one, open-source Postgres-based backend (BaaS) that gives this app a database, authentication, file storage, edge functions, realtime, an AI model gateway, and payments through one platform.

- **Project:** **numperfume** (API base `https://g9tczctc.eu-central.insforge.app`)
- **Skills:** these InsForge skills are installed for supported coding agents. Reach for them before implementing any InsForge feature instead of guessing the API:
  - `insforge`: app code with the `@insforge/sdk` client (database CRUD, auth, storage, edge functions, realtime, AI, email, and Stripe payments).
  - `insforge-cli`: backend and infrastructure via the `insforge` CLI (projects, SQL, migrations, RLS policies, storage buckets, functions, secrets, payment setup, schedules, deploys).
  - `insforge-debug`: diagnosing failures (SDK/HTTP errors, RLS denials, auth and OAuth issues) and running security or performance audits.
  - `insforge-integrations`: wiring external auth providers (Clerk, Auth0, WorkOS, Better Auth, etc.) for JWT-based RLS, or the OKX x402 payment facilitator.
  - `find-skills`: discovering additional skills on demand.
- **Credentials:** app code reads keys from `.env.local`; the CLI reads `.insforge/project.json`. Never hardcode or commit keys.

Key patterns:

- Database inserts take an array: `insert([{ ... }])`.
- Reference users with `auth.users(id)`; use `auth.uid()` in RLS policies.
- For storage uploads, persist both the returned `url` and `key`.
<!-- INSFORGE:END -->
