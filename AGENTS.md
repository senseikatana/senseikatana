# AGENTS.md

Guidance for agents working in this repository. Verified 2026-11-28.

Check `gh issue list --state open` before changing anything here.

## What this repo is

`senseikatana/senseikatana` is three things at once:

1. The **GitHub profile README repo** — `README.md` renders at `github.com/senseikatana`.
2. The **Bun workspace** for the personal site deployed at `senseikatana.com`.
3. The **KatanaKit documentation source** (`docs/`), a VitePress site published to the
   `katanakit-docs` Pages project and mounted under `/docs/` by the docs-proxy Worker
   (lives in `workers/docs-proxy`). `/docs/*` is live: it returns 200, and the Worker
   reverse-proxies the Pages project, so it must not be turned into a redirect. It is the
   only thing serving those paths — `senseikatana-web.pages.dev/docs/*` is a 404.

The only workspace is `web/` (`@senseikatana/web`), an Astro site built with Feature-Based
Architecture: `web/src/pages/` is a thin route layer, `web/src/features/` owns components and
queries, and `web/src/content/` holds the Markdown collections (`<collection>/<locale>/<slug>.md`).
i18n: English is the default locale at the root; `es` and `ca` are prefixed. Site sections are
`/posts`, `/services`, `/works`, `/about`, `/contact`.

**Projects live in this repo.** The case studies are `web/src/content/works/<locale>/<slug>.md`
and are served at `/works/` and `/works/<slug>/` (`/es/works/…` and `/ca/works/…`). The home page
renders the open-source and client cards from `featuredWorks` and `clientWorks` in
`web/src/config/site.ts`, and those hrefs are local `/works/<slug>` paths. `/projects/*` (the old
prefix) 301s to `/works/*`.

> The `samuraicoder.dev` and `katanakami.com` zones and the separate `samuraicoder` Pages
> project were deleted on 2026-11-28. Do not point links back at them: the works content now
> lives here and the old `/works` showcase was reabsorbed.

**Navigation is Works · Services · About · Contact**, centred in the navbar, with no
Documentation entry. The docs still exist at `/docs/` — the nav simply does not link them.

**DNS is the thing to check before blaming a deploy.** Until 2026-11-24 the apex and `www` were
CNAMEs to Surge (unproxied), so every Pages deployment succeeded into a project nobody visited
and the Workers on the zone never fired. `.github/workflows/infra-domain.yml` is the cutover and
is idempotent: run it and it reports. A deactivated Pages custom domain is what produces a 522 —
re-adding the domain re-triggers validation.

**Every outbound link must resolve.** Before adding one to `site.ts` or to content, request it:
an `href` that 404s ships straight to production, and `experience`/`services` content is full of
external links.

**The repo name must stay exactly `senseikatana`.** GitHub only renders a profile README
when the repository name matches the username. Renaming this to `senseikatana.github.io`
silently removes the README from the profile.

## Branches

`main` is the default branch and the one GitHub renders. `dev` is where work happens.
They are expected to be identical.

**Never push `main` by hand. `main` has exactly one writer: the CI sync workflow.**
Pushing `origin dev main` alongside every commit is what silently kept `main` alive while
the workflow was broken, and it races the workflow when both are active. Work on `dev`,
then:

```bash
git push origin dev
```

Pushes to `dev` are synchronized to `main` by `.github/workflows/sync-main.yml`, which
checks out with `fetch-depth: 0`, serializes runs with a `concurrency` group, no-ops when
`main` already matches, and fails loudly with `::error::` if the branches diverged.
Confirm with `git ls-remote --heads origin` after pushing, and confirm the workflow run
with `gh run list --workflow sync-main.yml`.

## Scripts

Run everything with Bun from the repository root:

```bash
bun install        # single lockfile at the root; never commit web/bun.lock
bun run dev        # astro dev for web/
bun run build      # static build into web/dist/
bun run check      # prettier --check, eslint, astro check
bun run format     # prettier --write

bun run docs:dev      # vitepress dev for docs/
bun run docs:build    # sync generated content from ../katanakit-js, then build
bun run docs:preview  # build, then serve the Pages shape locally
bun run docs:deploy   # build and deploy to the katanakit-docs Pages project, then the proxy Worker
bun run docs:gh       # build and publish a `gh-pages` branch deployment
bun run docs:clean    # remove VitePress caches and build output
```

Every `docs:*` mode except `docs:clean` calls `../katanakit-js/scripts/docs-prepare.mjs` when that
checkout exists (generates `docs/api/`, `docs/changelog.md`, the Tailwind catalogue); without
it they skip the sync and build from the committed content.

## Editing content (Obsidian)

The repo doubles as an Obsidian vault: open the repository root as the vault and edit the
Markdown in place. `.obsidian/` is local — the `.*` gitignore rule keeps it out of git — so
each machine keeps its own settings. Recommended vault settings: _Files & Links → disable "Use
[[Wikilinks]]"_ and exclude `node_modules/`, `web/dist/`, `web/.astro/` and `docs/.vitepress/`
from search and graph.

- Content: `web/src/content/<collection>/<locale>/<slug>.md`. Frontmatter keys must match the
  Zod schemas in `web/src/content.config.ts`; quote dates (`date: '2025-01-08'`).
- Docs: `docs/**/*.md` (VitePress).
- Links: plain Markdown with real web paths (`/posts/<slug>`, `/services/<slug>`). Never
  `[[wikilinks]]` — Astro and VitePress do not resolve them.
- Run `bun run check` after editing and before committing; the schemas catch broken
  frontmatter at build time.

There is no test suite yet. `bun run check` is the gate that must pass before committing.

## Deploy

Production is `senseikatana.com`, served by Cloudflare Pages from `main`. Verify with
`curl -sI https://senseikatana.com/` — it must answer `server: cloudflare` with a `cf-ray`;
`server: Surge` means the domain drifted back off Pages.

- Pages project: `senseikatana-web`. Build: `bun run build`. Output: `web/dist`.
- CI: `.github/workflows/deploy.yml` runs after a successful `Sync main` run, or manually with
  `workflow_dispatch`. It requires the `CLOUDFLARE_API_TOKEN` (Pages: Edit) and
  `CLOUDFLARE_ACCOUNT_ID` repository secrets.
- Local: `bun run deploy` (production) and `bun run deploy:preview` (a `dev` preview alias).
- Docs: `bun run docs:deploy` builds `docs/`, publishes the `katanakit-docs` Pages project
  (creating it on first deploy) and deploys `workers/docs-proxy` with the
  `senseikatana.com/docs*` routes.
- Remote preview of the dev server: `bun run tunnel` (cloudflared quick tunnel to port 4321).

The docs pipeline is VitePress in `docs/`; `bun run docs:deploy` builds it, publishes the
`katanakit-docs` Pages project and deploys `workers/docs-proxy`. The Worker mounts the build
under `senseikatana.com/docs/` (home alias `/docs/overview`, legacy `/en/docs*` redirects).
Generated API and changelog pages are synced from `../katanakit-js` on every build by
`scripts/docs.mjs`; narrative pages live here in `docs/`.

## Committing

- Conventional commits only. No `Co-Authored-By`, no AI attribution.
- The pre-commit hook runs `bunx lint-staged`. Never use `npx` here: it resolves binaries
  outside the Bun workspace and fails with `ENOENT`.
- All tooling (Prettier, ESLint, lint-staged, Husky) lives at the root. There is exactly one
  `.husky/` in the repo; do not add one inside `web/`.
- lint-staged formats Markdown, JSON, YAML, CSS, HTML and Astro files with `prettier --write`,
  and runs `eslint --fix` on JS/TS.

## `.gitignore`

- The `.*` rule is followed by exceptions for `.github/`, `.husky/`, `.nojekyll` and
  `docs/.vitepress/`; keep these exceptions if changing the ignore rules.
- `dist/` is ignored everywhere, so build output cannot be committed without `git add -f`.
- Prefer deploying from CI artifacts rather than committing build output.

## README rules

- The README is public. **Verify every link without an authenticated token.** Authenticated API
  and `gh` calls see private repos and make them look public; an unauthenticated request is what
  a visitor gets. `snippets-codes-vault`, `obsidian-workspaces` and `recetas-caseras` are private
  — never link them.
- Only these are public and linkable: `katanakit-js`, `katanakit-css`, `katanakit-wp`,
  `hueplay`, `pos-system`, `suite-vivirdeia`. The old `katanakit-sysli`,
  `empresaplana.cat`, `erp-lite-dashboard` and `plate-numerology` repositories were deleted;
  do not link them. The `empresaplana.cat` live site is still public and linkable.
- `prettier --write` runs on commit, so run it before committing to see the real diff.

## Verifying remote state

- `git ls-remote --heads origin` is the source of truth. Remote-tracking refs go stale and will
  lie to you.
- Force-push only with a pinned lease: `--force-with-lease=refs/heads/dev:<sha>`, using the SHA
  just read from `ls-remote`. Never a bare `--force`.
- `raw.githubusercontent.com` serves a stale CDN copy right after a push. Confirm what is really
  published with `gh api repos/:owner/:repo/contents/README.md?ref=main` or `git hash-object`.

## History hygiene

- ~60 release tags exist. Before rewriting any commit, run `git for-each-ref refs/tags` — if a
  tag points at it, the rewrite is a public event and needs the user's explicit go-ahead.
- Rewrite with `git commit-tree <tree> -p <parent>` so the content is identical by construction,
  then move the ref with `git update-ref <ref> <new> <old>` (compare-and-swap).
- The local-only rollback refs from the 2026-10-17 rewrite were deleted once the replacement
  was confirmed good. Recover that state from GitHub's reflog, not from a local ref.
- `CHANGELOG.md` is hand-maintained Keep a Changelog. A version bump touches `CHANGELOG.md` and
  `package.json` together, committed as `docs(changelog): v<version>`.
