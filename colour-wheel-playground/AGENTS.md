# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project overview

Color Compass (package name: `hueplay`) is a zero-dependency, single-page teaching tool that
compares the HSL and OKLCH color models: a 360° dual-ring dial, two slider panels, and live
CSS output. It is deployed as a Cloudflare Worker with Static Assets on
`https://senseikatana.com/showcase/*`.

## Architecture

- Static files only: `index.html`, `styles.css`, `index.js` are loaded directly by the browser.
  No bundler, no framework, no build step — `scripts/build.sh` just copies files into `dist/`.
- `worker.js` is the edge router: redirects `/` and `/showcase`, strips the `/showcase` prefix,
  forwards to `env.ASSETS`, and sets cache/security headers. SPA fallback comes from
  `wrangler.jsonc` (`not_found_handling`), not from the worker.
- `wrangler.jsonc` binds the Worker to the `senseikatana.com` custom domains and serves `dist/`.
- Asset paths in `index.html` must stay **relative** (`./styles.css`) so they resolve under the
  `/showcase/` subpath.

## Directory map

| Path | Role |
|---|---|
| `index.html` | Markup, meta/OG tags, element ids |
| `styles.css` | Layout, dial rings (`conic-gradient` + `mask`), slider chrome |
| `index.js` | Dial drag logic, hue mapping table (`map`), UI updates |
| `worker.js` | Edge router for `/showcase/*` |
| `wrangler.jsonc` | Worker + static assets configuration |
| `scripts/build.sh` | Copies static files (and `preview.png`) into `dist/` |
| `dist/` | Build output (git-ignored), served as assets |
| `README.md`, `CHANGELOG.md` | Docs — keep them in sync with code changes |

## Commands

```bash
bun install      # once
bun run dev      # wrangler dev (runs the build command) -> http://localhost:8787/showcase/
bun run build    # populate dist/
bun run deploy   # build + wrangler deploy
```

## Code conventions

- Vanilla JS loaded as a plain `<script>` tag: no modules, imports, or npm runtime dependencies.
- English identifiers (`mapHslToOklch`, `updateUI`); comments in Spanish (existing convention),
  only where the code is not self-explanatory.
- Small, single-purpose functions; UI writes go through `updateUI()`.
- Do not introduce a bundler, transpiler, or framework.

## Color-mapping constraint

Hue equivalence is a piecewise-linear lookup table: `map` in `index.js` plus its inverse
`mapOklchToHsl`. Any change to it must keep three places in sync:

1. the `map` array in `index.js` (forward and inverse directions);
2. the `map` code block and the worked-example table in `README.md`;
3. the `conic-gradient` stop angles in `updateDialRings()` and in the OKLCH hue slider gradient.

The mapping is a pedagogical approximation, not a color-managed conversion. Do not replace it
with the full sRGB → OKLCH formula without an explicit decision, and never describe its output
as exact in the docs.

## Verification

There is no test suite. Verify manually: open `index.html` directly in a browser, or run
`bun run dev` and load `http://localhost:8787/showcase/`. Then drag the dial, move every slider,
and confirm that both code strings and both swatches update.

## Rules

- Ask before adding any dependency (runtime or dev).
- Do not change the `/showcase` mount path, `BASE` in `worker.js`, or the `custom_domain` routes.
- Do not edit ignored/build output (`dist/`, `.wrangler/`, `node_modules/`).
- Update `README.md` and `CHANGELOG.md` whenever behavior or the mapping table changes.
