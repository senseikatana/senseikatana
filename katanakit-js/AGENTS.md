# AGENTS.md — katanakit-js

TypeScript service toolkit using ESM and hexagonal architecture. Bun is the package manager and script runner; Node.js >= 22.18 is required. Read `CONTRIBUTING.md` before architectural changes; it is the detailed development contract.

## Working rules

- Keep changes focused. For public features or API changes, update `README.md` and the relevant docs pages with the code.
- Write code, identifiers, comments, errors, and documentation in English.
- Never commit real tokens or secrets. Use `.env.example` as the template; `.env` is gitignored. Leave `CLOUDFLARE_API_TOKEN` empty locally when using Wrangler's OAuth login.
- `.npmrc` disables dependency lifecycle scripts with `allow-scripts=`. Allow a script explicitly only when a new dependency requires it.

## Architecture and API

- `src/core/services/` contains domain logic and stays free of **platform** I/O: no filesystem, no framework or unguarded browser access, and no static `node:*` imports — a platform module may only enter through a lazy `import()` inside a method, as `generator.service.ts` does with `node:crypto`. Universal APIs present in every supported runtime (`fetch`, `URL`, `crypto`, guarded `process.env`) are allowed — `http.service.ts` wraps the global `fetch` by design; ADR-0004 and ADR-0016 record the boundary. `src/infrastructure/` owns platform I/O; `src/adapters/` contains framework and platform integrations; `src/config/` contains site and SEO configuration.
- Keep shared contracts in `src/types/index.ts` and validation schemas in `src/schemas/`. Prefer deriving types from schemas where practical; do not duplicate existing shapes.
- **Use the `@/` alias for imports inside `src/`.** `@/*` maps to `src/*`, so `@/core/services/access.service.js` works at any depth — never a chain of `../../`. Keep a `./` sibling import relative, where it is already the shortest form. `tsc` alone does **not** rewrite the alias in its output, so `bun run build` runs `tsc-alias` right after `tsc6`; a new alias or a new tsconfig needs adding to that chain too. `~/*` and `~#/…` are declared as Nuxt-style aliases for the same target.
- Framework integrations must remain out of the main `src/index.ts` barrel. Expose and import them through their package subpaths declared in `package.json`.
- Public methods use the `use*` prefix except `getInstance()`. Services are generally Singleton facades with destructured `use*` exports; `adapters/nuxt` is an intentional pure-function exception. Pure value builders in `packages/ui` are a second exception: `toastClass()`, `buttonClass()` and their siblings return strings and imply no lifecycle, so a `use*` prefix would be a lie. Component facades exported as stable module bindings (currently `toast`) follow the same rule.
- Every `packages/ui` component follows one contract: a pure `<name>Class(options)` string builder (SSR-safe, no DOM) and a `use<Name>(options)` element factory (needs a DOM, throws with a pointer to the pure alternative). Only stateful components add a stable module binding — `toast` is the sole one today, because it is the only component with cross-call state. Do not add a binding to a stateless component just for symmetry.
- Component class names in `packages/ui` are **unprefixed** (`.btn`, `.card`, `.toast`) and all wrapped in `@layer katana` in `packages/ui/src/styles/index.scss`. Unlayered CSS beats layered CSS regardless of specificity, which is what makes coexistence with daisyUI deterministic instead of import-order-dependent. Theme tokens stay outside the layer (a layer cannot influence `:root`); `@keyframes` and kit-private custom properties keep the `katana-` prefix.
- Keep imports side-effect-free. Guard browser APIs (`window`, `document`, `navigator`) so browser-dependent code remains safe in Node/Bun and SSR.
- For fallible async operations, use the Safe Result shape `{ data, error, ok }`; prefer existing helpers such as `useAttempt()`, `useTryJsonParse()`, and `useErrorNormalize()` at boundaries.
- Optional integrations belong in `peerDependencies` with `peerDependenciesMeta.optional`, not in `dependencies`. `adapters/better-auth` is one: its social-provider id union is re-derived from `better-auth/social-providers` (type import plus a lazy runtime read), so `SocialProviderId` follows whatever the installed peer ships — never hand-list vendor ids.
- `src/prisma/schema.d.ts` and `src/prisma/schema.json` are generated. Edit `src/prisma/schema.prisma` and regenerate with `bunx --bun prisma contract emit`; Prisma config requires `DATABASE_URL`.

## Commands and verification

Scripts are grouped so nothing runs twice. The shipping commands chain them in one order:
**tests → build → docs → deploy**, each step exactly once.

**Quality gate** — run this before anything else:

- `bun run check` — ESLint, root and UI typechecks, then Vitest. This is the gate.
- `bun run test`, `bun run typecheck`, `bun run lint` — the three pieces of `check`, usable alone.
- `bun run test:e2e` — the Playwright suite in `tests/e2e/` for `@katanakit/ui` (browser-only behaviour: the `@layer` cascade, animations, `animationend`, `prefers-reduced-motion`). jsdom has no animation engine, so `animationend` never fires there and those paths are unreachable from the unit suite — see `docs/ui-kit/testing.md`. `bun run test:all` runs `check` plus e2e.
- `bun run lint:fix` applies ESLint auto-fixes to `src` and the UI package.
- Run one test file with `bunx vitest run <path>`. Tests live under `tests/` and `packages/**/tests/`; Vitest maps `@/` to `src`.

**Build** — `clean` runs here and nowhere else:

- `bun run build` — `clean`, then `build:lib` and `build:examples`.
- `bun run build:lib` — `tsc` + `tsc-alias`, `build:ui`, copies `styles.css` into `dist/`, then synchronizes version references. That step can modify `package.json` and README/docs references; review those changes rather than discarding them blindly.
- `bun run build:examples` type-checks the examples as its last step, so a change to examples or package exports is covered.

`build` deliberately does **not** run `check`. Call `bun run check && bun run build`, or use a shipping script below — chaining `check` into `build` made the tests run twice.

**Docs** — production build by default, `:dev` for the server:

- `bun run docs` — production build (`node scripts/docs.mjs build`).
- `bun run docs:dev` — VitePress dev server. `bun run docs:preview` serves the built site.
- `bun run docs:clean` — purges shared VitePress temp state.

**Shipping** — each runs `check`, then `build`, then its deployment:

- `bun run deploy` — Cloudflare Pages. `bun run deploy:gh` — GitHub Pages.
- `bun run release` — npm publish via `scripts/npm-publish.mjs`.

All three pass `--skip-ui` to `scripts/docs.mjs`, because `build` has already produced
`packages/ui/dist/styles.css`. Without the flag `chain()` rebuilds it.

`node scripts/docs.mjs` with **no mode argument prints usage and exits 1** — it is not a
build. Always pass an explicit mode (`build`, `deploy`, `gh`, `dev`, `preview`, `clean`).

**Dev** — suffix `:dev`, never run as part of a shipping script:

- `bun run dev` — VitePress and the Express API side by side via `concurrently`.
- `bun run api:dev` — the Express server alone. `bun run docs:dev` — docs alone.
- `bun run bun:dev` — the Bun server.

ESLint uses flat config in `eslint.config.mjs`; do not add `.eslintrc` files. Prettier runs through ESLint.

## Documentation

- The docs site uses VitePress. Pages use YAML frontmatter and Vue-in-Markdown (`<script setup>`), not MDX.
- Docs follow Diátaxis: tutorials in `docs/tutorials/`, how-to guides in `docs/guides/`, reference generated in `docs/api/` plus the UI kit `reference/` pages, explanation in `docs/explanation/`. One page, one kind — do not mix them in a single page.
- The "why" behind hard-to-reverse decisions lives in `docs/explanation/decisions/` (context, decision, consequences). Add a numbered record there instead of burying rationale in prose; superseded records are never rewritten.
- `scripts/docs-prepare.mjs` generates `docs/api/`, `docs/changelog.md`, and `docs/.vitepress/theme/signals.json`; do not edit these generated files by hand.
- `scripts/docs.mjs` manages shared VitePress temporary state. Do not run `bun run dev` concurrently with `bun run deploy` or `bun run deploy:gh`. Never delete `.cache/docs.lock.json` by hand: the runner already clears locks whose owner is dead, and deleting a *live* one lets two builds write `docs/.vitepress/.temp` at once, which fails cryptically (`Cannot read properties of undefined (reading 'title')`, `Cannot find module '…/.temp/….js'`).
- Production docs deploy to Cloudflare Pages with `bun run deploy`: it builds the site first, then publishes `docs/.vitepress/dist` to the `katanakit-docs` project via Wrangler. `bun run deploy:gh` is the GitHub Pages branch instead, and `bun run release` is the npm path. Credentials come from `CLOUDFLARE_API_TOKEN` in `.env` or a `bunx wrangler login` session. Keep Cloudflare as the hosting/storage provider; INSForge is the database fallback and Prisma is the local ORM.

## Git and releases

- Use Conventional Commits. Features land in `dev` first; PRs to `main` come from `dev`.
- There is no GitHub Actions pipeline. Releases are performed locally.
- `CHANGELOG.md` contains released versions only—do not add an `[Unreleased]` section or hand-edit release entries. `scripts/generate-release-notes.mjs` generates release notes from commit subjects when a release is prepared.
- `bun run build` runs the version synchronization step; review any resulting changes to version references.
