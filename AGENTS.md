# AGENTS.md

Guidance for agents working in this repository. Verified 2026-10-17.

Known repo defects are tracked as GitHub issues (#4 to #10). Check
`gh issue list --state open` before changing anything here — several of the traps below are
already filed with a proposed fix.

## What this repo is

`senseikatana/senseikatana` is the **GitHub profile README repo**. It renders at
`github.com/senseikatana`. It holds no application code — the only tracked files are
`README.md`, `CHANGELOG.md`, `AGENTS.md`, `LICENSE`, `package.json`, `package-lock.json`,
`.gitignore`.

**The repo name must stay exactly `senseikatana`.** GitHub only renders a profile README
when the repository name matches the username. Renaming this to `senseikatana.github.io`
silently removes the README from the profile. A showcase site belongs in a separate repo.

## Branches

`main` is the default branch and the one GitHub renders. `dev` is where work happens.
They are expected to be identical.

They drift silently: if the local `main` is behind, `git push origin dev main` pushes only
`dev` and reports success. Always confirm with `git ls-remote --heads origin` after pushing.

## Scripts: none of them work

Do not try to run this project — there is no app, no build and no test.

- `npm run dev` / `npm run build` — the script is `"bun run dev"`, which calls itself. It
  recurses until `E2BIG: Argument list too long` **and still exits 0**, so CI and any script
  checking the exit code reads the failure as a pass.
- `npm run check` / `npm run format` — point at `./snippets-lab/`, which no longer exists in
  this repo. Biome fails with `INTERNAL / No such file or directory`. Exits 1.

## Committing

- Conventional commits only. No `Co-Authored-By`, no AI attribution.
- The pre-commit hook runs `npx lint-staged`. Markdown, JSON, YAML, CSS and HTML go through
  `prettier --write` only.
- **JS/TS files go through `eslint --fix`, and there is no ESLint config at the root**, so the
  hook fails on the first commit that touches a `.js`/`.ts`/`.mjs`/`.cjs` file. Expect it, and
  do not silence it with `--no-verify` without asking.

## `.gitignore` landmines

- Line 10 is `.*`, which silently ignores `.github/`, `.husky/` and `.nojekyll`. A CI workflow
  will appear to save and never be committed. Husky hooks are **not** tracked, so a fresh clone
  has no hooks at all.
- `dist/` is ignored everywhere, so build output cannot be committed without `git add -f`.
- Before writing any workflow here, add `!.github/` to `.gitignore`.

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
- Rollback refs from the 2026-10-17 rewrite: `refs/backup/pre-rewrite-old1` (`1ab191a`) and
  `refs/backup/pre-rewrite-old2` (`38df417`). Delete them once the user is satisfied.
- `CHANGELOG.md` is hand-maintained Keep a Changelog. A version bump touches `CHANGELOG.md` and
  `package.json` together, committed as `docs(changelog): v<version>`.
