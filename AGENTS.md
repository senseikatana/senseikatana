# AGENTS.md

Guidance for agents working in this repository. Verified 2026-10-17.

Check `gh issue list --state open` before changing anything here.

## What this repo is

`senseikatana/senseikatana` is the **GitHub profile README repo**. It renders at
`github.com/senseikatana`. It holds no application code — the only tracked files are
`README.md`, `CHANGELOG.md`, `AGENTS.md`, `LICENSE`, `package.json`, `package-lock.json`,
`.gitignore`, `.github/workflows/sync-main.yml` and `.husky/pre-commit`.

**The repo name must stay exactly `senseikatana`.** GitHub only renders a profile README
when the repository name matches the username. Renaming this to `senseikatana.github.io`
silently removes the README from the profile. A showcase site belongs in a separate repo.

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

This repository contains no app, build, or test suite. The `dev` and `build` scripts are
intentionally absent. `npm run check` and `npm run format` run Prettier on the maintained
Markdown and package manifest files.

## Committing

- Conventional commits only. No `Co-Authored-By`, no AI attribution.
- The pre-commit hook runs `npx lint-staged`. Markdown, JSON, YAML, CSS and HTML go through
  `prettier --write` only.
- This is a documentation-only repository; JavaScript and TypeScript files are not configured
  for linting.

## `.gitignore`

- The `.*` rule is followed by exceptions for `.github/`, `.husky/` and `.nojekyll`; keep these
  exceptions if changing the ignore rules.
- `dist/` is ignored everywhere, so build output cannot be committed without `git add -f`.
- Prefer deploying from CI artifacts rather than committing build output.

## README rules

- The README is public. **Verify every link without an authenticated token.** Authenticated API
  and `gh` calls see private repos and make them look public; an unauthenticated request is what
  a visitor gets. `snippets-codes-vault`, `obsidian-workspaces` and `recetas-caseras` are private
  — never link them.
- Only these are public and linkable: `katanakit-js`, `katanakit-css`, `katanakit-sysli`,
  `katanakit-wp`, `hueplay`, `empresaplana.cat`, `erp-lite-dashboard`, `pos-system`,
  `plate-numerology`.
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
