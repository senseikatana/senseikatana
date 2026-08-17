# AGENTS.md

Umbrella repo: 9 independent web projects tracked by a single git repo.
No root `package.json`, no workspaces, no shared tooling, no root build.

## Golden rules

- Work on ONE subproject at a time; run every command from inside that
  subproject's directory. Nothing builds or runs from the repo root.
- NEVER run `git init` or `git clone` inside a subproject — nested `.git`
  dirs are intentionally absent; everything is tracked by the root repo only.
- Package manager varies per project: check the lockfile first (table below).
- The root `.gitignore` ignores ALL dotfiles/dotfolders (`.*`) — do not
  commit `.env`, `.astro/`, `.vscode/`, etc.

## Projects

| Directory | What | Stack | Install | Notes |
|---|---|---|---|---|
| `astrophy-tmp/` | Astrofy template (reference) | Astro 2 + Tailwind 3 + daisyUI | npm | upstream starter, kept for reference |
| `astroship-tmp/` | Astroship template (reference) | Astro 4 + Tailwind 3 | pnpm | only project using pnpm |
| `astrowind-tmp/` | AstroWind template (reference) | Astro 2 + Tailwind 3 | npm | no lockfile; has prettier/eslint scripts |
| `boutique-treslunas-cambrils/` | Boutique store | Astro 6 + React 19 + TW4 + @astrojs/db + Stripe + Firebase | bun | build sets `ASTRO_DATABASE_FILE=local.db` (in script); `bun run db:push` / `db:seed`; GitLab CI = secret detection only |
| `coffeeshop-astrojs/` | Coffee shop | **NOT Astro** — Vite + React 19 + TS | bun | `bun dev` = vite; build = `tsc -b && vite build` |
| `empresaplana-cat-astrojs/` | Empresa Plana (CA) | Astro 7, minimal | bun | read its AGENTS.md: dev server via `astro dev --background` |
| `numperfume-joaquin/` | Perfume store | Astro 6 + React 19 + TW4 + Supabase + Stripe | bun | READ `numperfume-joaquin/AGENTS.md` first; bun.lock + package-lock.json both exist — use bun |
| `senseikatana-resume/` | Personal CV | Astro 6, minimal | bun | bun.lock + package-lock.json both exist — use bun |
| `sga-esinsa-astrojs/` | SGA site + WhatsApp bot | Astro 7 + React 18 + TW3 + Clerk + InsForge | bun | read its AGENTS.md (InsForge MCP); `bun run bot` = builderbot WhatsApp bot; Pages deploy needs `DEPLOY_TARGET=pages` |

## Conventions & gotchas

- Node >=22.12 required by several projects (`engines` field).
- Standard scripts in all Astro projects: `dev` / `build` / `preview` (port 4321).
- Local `.env` files exist in `boutique-treslunas-cambrils/`,
  `numperfume-joaquin/`, `sga-esinsa-astrojs/` and are git-ignored —
  never commit them; copy from each `.env.example`.
- Project-specific instructions live in each subproject's own AGENTS.md;
  this root file only covers cross-project facts.
