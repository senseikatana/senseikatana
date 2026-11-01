# Contributing to KatanaKit

Thank you for considering contributing to `katanakit-js`! This document
describes the architecture, the conventions and the development workflow so you
can jump in quickly. It is the source of truth for how code lands in this
repository.

## The development contract

These rules keep the codebase consistent and maintainable. Please read
[Architecture](https://docs.senseikatana.com/guides/architecture) for the full context behind each rule.

1. **Hexagonal layering** — keep the pure `core` layer (`src/core/services/`)
   free of platform I/O: no filesystem, no unguarded browser globals, and no
   static `node:*` imports — a platform module may only enter through a lazy
   `import()` inside a method (`generator.service.ts`'s `node:crypto` pattern).
   Universal runtime APIs (`fetch`, `URL`, `crypto`, guarded `process.env`) are
   allowed — `http.service.ts` wraps the global `fetch` by design;
   [ADR-0004](https://docs.senseikatana.com/explanation/decisions/adr-0004-hexagonal-core)
   and
   [ADR-0016](https://docs.senseikatana.com/explanation/decisions/adr-0016-universal-runtime-apis-in-core)
   record the boundary. Adapters that own platform I/O
   live in `src/infrastructure/` (DOM, storage, viewport, sensors, observer,
   worker, theme). Framework-facing adapters live in `src/adapters/` (`astro/`,
   `express/`, `nuxt/`), site config/SEO in `src/config/`. Put new capabilities
   in the layer that matches their responsibility.
2. **Design patterns** — services are Singleton facades and use
   Strategy/Observer/Factory/Facade/Adapter where it makes sense. Preserve the
   pattern when extending a service. `adapters/nuxt` is the one deliberate
   exception: it exports pure functions, not a singleton.
3. **`use*` convention** — every public method (except `getInstance()`) uses the
   `use` prefix (like React hooks), e.g. `useInit`, `useFetch`, `useLogger`,
   `useCreateSignal`. This makes the API consistent and predictable.
4. **`@/` alias in `src/`, `.js` extensions preserved** — the package is
   `"type": "module"` and compiles with `module: nodenext`. Import across folders
   with the alias, never a `../../` chain: `import { useLogger } from
   "@/core/services/logger.service.js"`. Keep the `.js` extension — it is what
   makes the output valid ESM — and keep a same-folder `./x.js` relative, where
   it is already the shortest form.

   `tsc` resolves the alias for typechecking but does **not** rewrite it in the
   emitted JavaScript, so `bun run build` runs `tsc-alias` immediately after
   `tsc6`. If you add an alias or a tsconfig, add it to that chain — otherwise
   the published `dist/` ships imports that Node cannot resolve, and the failure
   only appears when someone installs the package.
5. **Destructured exports** — services expose their methods as arrow-function
   class fields and re-export them destructured at the bottom of the module
   (`export const { useLogger, ... } = LoggerService.getInstance();`) so consumers
   can tree-shake and call them without binding `this`. For modules whose
   consumers are expected to hold an instance (`ObserverService`,
   `SensorsUtils`, `WorkerService`), exporting the singleton instance or a
   stable `getInstance()` is acceptable — document the choice.
6. **Single source of truth for types** — every contract and shared domain type
   lives in `src/types/index.ts`. Services reference these interfaces (`I*`,
   `LogStrategy`, `StorageStrategy`, ...) instead of re-declaring shapes.
7. **Framework adapters as subpaths** — anything that imports a framework
   (`express`, `h3`/Nuxt, `vue`/`astro`) must not be re-exported from the main
   barrel `src/index.ts`. Expose it through the `exports` map in
   `package.json` (`katanakit-js/adapters/express`, `katanakit-js/adapters/nuxt`)
   so library consumers never pull those dependencies.
8. **Optional peer dependencies** — keep heavy/framework dependencies out of
   `dependencies`. Only add a runtime dependency when every consumer needs it.
   New optional integrations go to `peerDependencies` +
   `peerDependenciesMeta.optional` and are installed by developers/devDeps here.
9. **English only** — comments, identifiers, error messages and documentation
   are written in English.
10. **No side effects on import** — importing any public module must never
    trigger network calls, timers, storage writes or DOM mutations. Strategy
    objects and I/O are created lazily inside methods.
11. **SSR safety** — browser-only adapters must guard or fall back gracefully
    when `window`/`document`/`navigator` is unavailable (Node/Bun SSR).
12. **Safe Result for fallible async operations** — prefer returning a
    discriminated union `{ data, error, ok }` over throwing.
13. **Tests** — add or update a Vitest test under `tests/` for every new feature
    or bug fix, and keep the `@/` alias imports there.

## Getting started

```bash
# Prerequisites: Node.js >= 22.18, Bun >= 1.2
git clone https://github.com/senseikatana/katanakit-js.git
cd katanakit-js
git checkout dev
bun install
```

Useful scripts:

| Layer       | Script                 | What it does |
| ----------- | ---------------------- | ------------ |
| **lint**    | `bun run lint`         | ESLint over `src` and the UI package |
|             | `bun run lint:fix`     | Same, with auto-fix applied |
| **build**   | `bun run clean`        | Removes every regenerable artifact (`-- --dry` previews) |
|             | `bun run build`        | `clean` → `check` → compile to `dist/` → build the UI → sync versions → typecheck the examples |
|             | `bun run build:ui`     | Builds `@katanakit/ui` (vendored framework + components CSS) |
| **develop** | `bun run dev`          | Docs site (VitePress) **and** the Express API, side by side via `concurrently` |
|             | `bun run dev:api`      | Express dev server alone (`tsx`) |
|             | `bun run dev:bun`      | Bun adapter server alone |
| **verify**  | `bun run check`        | `lint` → typecheck (root + UI) → unit tests. **The gate.** |
|             | `bun run test:e2e`     | Playwright suite for `@katanakit/ui` — real browser, covers what jsdom cannot |
|             | `bun run test:all`     | `check` then the browser suite |
| **ship**    | `bun run deploy`       | Builds the docs site, then publishes it to Cloudflare Pages (docs.senseikatana.com) |
|             | `bun run deploy:gh`    | Builds with the GitHub Pages base and publishes to the gh-pages branch |
|             | `bun run release`      | `build` → write the CHANGELOG section → preflight → `npm publish` |

At most three commands per job, so the list stays learnable. Coverage is the one
thing without a script — run `bunx vitest run --coverage` when you need it.

`build` and `release` never compile or publish unless `check` passes. `deploy`
builds before it publishes: `scripts/docs.mjs deploy` refuses to run without a
build already present, so the two are chained in the script rather than left as
two steps to remember.

## Test coverage

```bash
bunx vitest run --coverage
```

This runs the unit suite once and writes the report to `coverage/` (already
gitignored). It is **not** part of `check` or `build`: those run `vitest run`
without `--coverage`, so coverage never gates a release. Run it when you add
tests, when you touch a module you know is uncovered, and before a release.

The provider is **`@vitest/coverage-v8`**, pinned to `5.0.3` because Vitest's peer
range is an exact version match, not a caret. V8 coverage needs Node's native
coverage API, which works here only because Vitest forks its worker pool with
Node even though Bun launches the CLI — **do not** run the suite with `--bun`.

### Reading the output

`text` prints a per-file table grouped by directory. The four columns are
`% Stmts`, `% Branch`, `% Funcs`, `% Lines`, and the last column lists the
uncovered **line ranges** — click through them in the HTML report rather than
guessing from the percentages.

The report is scoped to what actually ships: `src/**/*.ts` and
`packages/ui/src/**/*.ts`. The `include` list is explicit on purpose. Without
it the V8 provider only reports the modules it happened to load, which hides
every file no test touches — the opposite of what a coverage report is for.
Barrels (`**/index.ts`), type-only modules and generated `.d.ts` files are
excluded because they compile to **0 statements**; all 28 barrels and both
type-only modules verify as `0/0`, so excluding them removes a zero
denominator rather than hiding untested code.

### Baseline

Measured on `dev` with 554 tests across 51 files and 108 measured source
files. Reproducible: consecutive runs report identical totals. Re-measure and
update this table whenever you add tests.

| Metric | Baseline | Floor | Covered |
| --- | --- | --- | --- |
| Statements | 62.89% | 57 | 3019/4800 |
| Branches | 55.05% | 50 | 1589/2886 |
| Functions | 55.52% | 50 | 688/1239 |
| Lines | 65.28% | 60 | 2858/4378 |

The `thresholds` in `vitest.config.ts` are **ratchet floors, not targets**. Each
one is the measured baseline minus about 5 points of headroom, so ordinary
refactors do not trip it but a genuine regression — quietly deleting a suite —
does. **Raise them as coverage improves.** If you add tests, update this table
and the floors in the same commit.

There is deliberately **no `perFile` threshold**. 20 measured files contain real
code at 0%, and several of them (`viewport`, `sensors`, `observer`, `worker`)
only work against a real browser — the runtime `bun run test:e2e` provides, not
jsdom. A per-file floor would be permanently red, and a permanently red gate is
ignored rather than obeyed.

Biggest gaps at the baseline: `viewport.service.ts` (117 statements, 0%),
`worker.service.ts` (85, 0%), `observer.service.ts` (66, 0%),
`sensors.service.ts` (62, 0%), `dates.service.ts` (43, 0%),
`products.controller.ts` (37, 0%), `generator.service.ts` (33, 0%).

## Directory layout

- `src/types/` — single source of truth for all contracts and domain types.
- `src/core/services/` — pure domain services (no platform I/O).
- `src/infrastructure/` — adapters that own browser/runtime I/O.
- `src/adapters/` — framework adapters (`astro/`, `express/`, `vue/`, `nuxt/`).
- `src/adapters/notion/` — Notion REST API adapter.
- `src/adapters/wordpress/` — WordPress REST API adapter.
- `src/config/` — `site.config.ts` + `seo.service.ts`.
- `src/prisma/` — Prisma schema and conversation store.
- `src/index.ts` — main barrel (public API surface).
- `tests/` — Vitest unit tests (import from `src/` via the `@/` alias).
- `examples/` — runnable demos for all adapters and frameworks.
- `docs/` — VitePress documentation site (keep in sync with code changes).
- `packages/ui/` — private `@katanakit/ui` workspace: Katana UI foundations (button, input, card, badge, alert) styled with the SCSS framework vendored in `scss/`.

## Updating documentation

The public documentation site lives at
**[docs.senseikatana.com](https://docs.senseikatana.com/)** and
is built with VitePress. The source is in `docs/`.

### The four kinds of documentation

The site follows [Diátaxis](https://diataxis.fr/): four kinds of pages, each
answering a different reader need. Keep them apart — **one page, one kind**. A
how-to that explains from scratch wastes the time of someone in a hurry, and a
tutorial that describes every option strands a learner. Link across kinds
instead of mixing them.

| Kind | Answers | Where it lives | How it is written |
| --- | --- | --- | --- |
| **Tutorial** | "Teach me, step by step" | `docs/tutorials/` | One guided lesson whose steps each end in a visible result. No option tables or alternatives — link to them. |
| **How-to guide** | "Help me do this task" | `docs/guides/` | The title states the goal; numbered, copy-pasteable steps for someone who already knows the project. |
| **Reference** | "Tell me the exact facts" | `docs/api/` (generated), `docs/ui-kit/css/reference/`, service pages | Uniform, complete, look-up material; generated from source whenever possible. |
| **Explanation** | "Help me understand why" | `docs/explanation/` | Context and rationale — why the system is the way it is, including the decision records. |

The hand-written service pages (`docs/guides/services/*.md`) accompany the
generated reference and keep one shape: a short overview paragraph, a quick
example, then one section per method (signature, example, real use case).

When you change a public API:

- First ask **"which document is no longer true because of this change?"** and
  update it in the same pull request — docs travel with the code.
- **API Reference is auto-generated** from JSDoc/TSDoc comments in `src/` by
  TypeDoc (`scripts/docs-prepare.mjs` writes `docs/api/` and the VitePress sidebar).
  Write good doc comments on your exported functions and types — they become
  the public API docs automatically.
- Update the matching entry in the README Features list and the docs page that
  covers the API (`docs/guides/*.md`).
- **Hard-to-reverse decisions** (a new runtime dependency, a public contract
  change, an architecture move) get a numbered record under
  `docs/explanation/decisions/`: context, decision, consequences — good and
  bad. Approved records are never rewritten; a new record supersedes the old
  one.
- Describe user‑visible changes in the **Conventional Commit subject** — that
  subject is what `scripts/generate-release-notes.mjs <tag> --write` turns into
  the release's `CHANGELOG.md` entry when the version is cut. `CHANGELOG.md`
  only ever lists released versions (there is no `[Unreleased]` buffer), so
  nothing appears there until it actually ships.
- Use `katanakit-js` in example imports.

### Writing docs pages

Every page starts with YAML frontmatter so both VitePress and Obsidian read it:

```md
---
title: Query Client
description: Cache, retry and invalidate server state.
---
```

- JS/TS inside a page goes in a `<script setup lang="ts">` block after the
  frontmatter (Vue-in-Markdown). VitePress does **not** support MDX.
- Use `::: code‑group` for tabbed code samples and `::: warning` for callouts.
- `docs/api/` and `docs/changelog.md` are generated — never hand‑edit them.

### Running the docs locally

```bash
bun run dev            # generate API + changelog, then live‑reloading server
bun run docs           # static build into docs/.vitepress/dist/
bunx vitepress preview docs   # serve the build on :4173
bun run deploy         # build, then publish to Cloudflare Pages (docs.senseikatana.com)
bun run docs:gh        # manual preview on the gh‑pages branch (no Actions)
bun run clean          # purge every regenerable artifact (docs temp included)
```

`deploy` needs Cloudflare credentials: either `CLOUDFLARE_API_TOKEN` in
`.env` (see `.env.example`, never committed) or a `bunx wrangler login` session.
It always builds first, so the published site is never a stale artifact.

### GitHub Wiki synchronization

The GitHub Wiki is a separate Git repository. The
`.github/workflows/wiki-sync.yml` workflow regenerates its pages from the
tracked Markdown in `README.md`, `docs/`, `examples/` and `packages/ui/` after
those files change on `main`. It can also be run manually from the Actions tab.

To authorize Wiki pushes, create a short-lived classic personal access token
with the `public_repo` scope and add it under **Settings → Secrets and variables
→ Actions** as `WIKI_SYNC_TOKEN`. Never commit the token or paste it into the
workflow. The workflow only runs on `main`; local changes become automatic
after they are committed and merged there.

::: warning Never run dev and docs/docs:gh at the same time
VitePress shares `docs/.vitepress/.temp` between the dev server and the build,
so running both corrupts it and the build fails with
`Cannot find module '…/.vitepress/.temp/…'`. `scripts/docs.mjs` enforces an
exclusive lock and fails fast with that guidance; if a process was killed,
bun run clean resets the temp state.
:::

## Versioning and changelog

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
and keeps a [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)-style
`CHANGELOG.md`. The current version is tracked in `package.json`.

### Releasing (local)

There is no CI or release pipeline; releases are cut locally. The GitHub Wiki
sync is the only automated workflow and does not build or publish releases.

- **`useGit push --release` / `useGit release create`** — computes the bump
  level from Conventional Commits, then calls
  `scripts/generate-release-notes.mjs <tag> --write` when the script exists.
  That writes the complete `CHANGELOG.md` section (every commit type, with the
  files each commit touched), syncs `package.json` and the version refs pinned
  in README/docs, commits the generated files, creates the annotated tag and
  publishes the GitHub release.
- **`bun run release`** — `build` + changelog `--write` + `bun run
  publish`. Use it for the full path once the release is tagged with
  `useGit`.
- **`scripts/npm-publish.mjs`** — preflight only + publish: verifies a clean tree,
  `v<version>` present locally and on origin, a `## [<version>]` CHANGELOG
  section, synced README/docs version refs, a built `dist/` and that the
  version is not already on npm; then runs `npm publish --access public`. Use
  `-- --check` for the dry preflight and `-- --dry-run` for npm's dry run.
  Neither script creates the git tag.

The package requires 2FA at publish time: npm prints an approval URL
(`npm error code EOTP`), you approve it in the browser and the publish
continues by itself — run it from a real terminal, not a non-interactive
shell.

### Version synchronization

Versions must be synchronized across:

1. `package.json` — the source of truth
2. npm registry — published via `npm publish`
3. GitHub tags — created by `useGit release create`

`node scripts/generate-release-notes.mjs --sync-versions` (also run by
`bun run build`) mirrors `package.json` and every version pinned in
README/docs to the newest `v*` tag, so the sources never drift apart.

To verify synchronization:

```bash
grep '"version"' package.json   # check local
npm view katanakit-js version   # check npm
git tag --sort=-creatordate     # check tags
```

## Pull request checklist

- [ ] Code follows the development contract above.
- [ ] All new public methods use the `use*` prefix (except `getInstance`).
- [ ] Relative imports inside `src/` carry explicit `.js` extensions.
- [ ] New contracts/types were added to `src/types/` (not re‑declared).
- [ ] New framework code is reachable via a subpath, not the main barrel.
- [ ] `bun run check` passes (ESLint + typecheck + tests).
- [ ] `bunx vitest run --coverage` run when tests changed — coverage does not drop below the floors in `vitest.config.ts`.
- [ ] `bun run test:e2e` passes when the change touches `packages/ui` (animations, cascade, focus, or anything timing-dependent).
- [ ] Tests added/updated for the change.
- [ ] Documentation and `CHANGELOG.md` updated if the public API changed.
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/).
- [ ] Feature merged into `dev` first (`git checkout dev && git merge <branch>`); PRs to `main` come only from `dev`.

## Code of Conduct

Be kind, respectful, and constructive. We're all here to build great software
and learn from each other. Harassment, discrimination, or toxic behavior will
not be tolerated.

## Secret Management

- Ensure that real Cloudflare API tokens or other sensitive environment variables are not committed to the repository.
- Use `.env.example` as a template for local development; real secrets should be provided as CI secrets.
- The `.env` file is ignored by `.gitignore`; keep it empty in the repo.
- For local development, leave `CLOUDFLARE_API_TOKEN` empty to rely on OAuth via `wrangler login`.

## Questions?

- [Open an issue](https://github.com/senseikatana/katanakit-js/issues) for bugs
- [Start a discussion](https://github.com/senseikatana/katanakit-js/discussions) for questions
- [Read the docs](https://docs.senseikatana.com/) for guides and API reference
