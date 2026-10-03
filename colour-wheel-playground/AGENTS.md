# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project overview

Color Compass (package name: `hueplay`) is a zero-dependency, single-page teaching tool that
compares the HSL and OKLCH color models: a 360° dual-ring dial, two slider panels, and live
CSS output. It is deployed as a Cloudflare Worker with Static Assets on
`https://senseikatana.com/hueplay/*`.

## Architecture

- Static files only: `index.html`, `styles.css`, `color.js` and `index.js` are loaded directly by
  the browser as classic scripts (no modules). No bundler, no framework — `scripts/build.sh`
  just copies files into `dist/`.
- `color.js` owns all color math and exposes a single global, `ColorMath`. It has no DOM access,
  so it can be imported from Node to run assertions against it.
- `index.js` owns the DOM, the pointer-event drag, and rendering. Every UI write goes through
  `updateUI()`.
- `worker.js` is the edge router: redirects `/` and `/hueplay`, strips the `/hueplay` prefix,
  forwards to `env.ASSETS`, and sets cache/security headers on every response including 404s
  and 405s. There is no SPA fallback — unknown paths return a real 404.
- `wrangler.jsonc` binds the Worker to the `senseikatana.com` custom domains and serves `dist/`.
- Asset paths in `index.html` must stay **relative** (`./styles.css`) so they resolve under the
  `/hueplay/` subpath.

## Directory map

| Path | Role |
|---|---|
| `index.html` | Markup, meta/OG tags, element ids, `aria-labelledby` wiring |
| `styles.css` | Layout, dial rings (`conic-gradient` + `mask`), slider chrome, `:focus-visible` |
| `color.js` | Pure color math: sRGB ↔ OKLCH, hue forward/inverse, gamut mapping |
| `index.js` | Dial drag (Pointer Events), `updateUI()`, ring and track gradients |
| `worker.js` | Edge router for `/hueplay/*` |
| `wrangler.jsonc` | Worker + static assets configuration |
| `scripts/build.sh` | Copies static files (and `preview.png`) into `dist/` |
| `dist/` | Build output (git-ignored), served as assets |
| `README.md`, `CHANGELOG.md` | Docs — keep them in sync with code changes |

## Commands

```bash
bun install      # once
bun run dev      # wrangler dev (runs the build command) -> http://localhost:8787/hueplay/
bun run build    # populate dist/
bun run deploy   # build + wrangler deploy
```

`bun run build` runs `rm -rf dist`, so rebuilding while `wrangler dev` is serving will make the
dev server answer 500 until it is restarted. Rebuild first, then (re)start the dev server.

## Code conventions

- Vanilla JS loaded as plain `<script>` tags: no modules, imports, or npm runtime dependencies.
- English identifiers (`hslHueToOklchHue`, `updateUI`); comments in Spanish (existing convention),
  only where the code is not self-explanatory.
- Small, single-purpose functions; UI writes go through `updateUI()`.
- Do not introduce a bundler, transpiler, or framework.

## Color-mapping constraint

Hue equivalence is a **real conversion**, not a lookup table: `color.js` runs
sRGB → linearize → OKLab → polar for the color described by the HSL panel. Any change here must
keep three things consistent:

1. `hslHueToOklchHue` / `oklchHueToHslHue` in `color.js` (the forward and inverse directions);
2. the anchor table and the worked-example table in `README.md`;
3. the ring stops built from `ColorMath.primaryOklchHues()` in `index.js`.

Because OKLCH hue depends on saturation and lightness too, the mapping is **not** a function of
the hue angle alone — do not "simplify" it back into a table. The inverse is intentionally
ambiguous near the primaries (a 10-15° span of HSL hue collapses into one OKLCH degree around
blue); `oklchHueToHslHue` resolves that by recognising the current hue first, so the
HSL → OKLCH → HSL round trip stays exact.

## Verification

There is no test suite. Verify manually:

1. `bun run dev` and load `http://localhost:8787/hueplay/`.
2. Drag the dial: the pointer, both hue sliders, both swatches and both code strings must move
   together.
3. Round trip: set an HSL hue, note the OKLCH hue, drag the OKLCH hue slider back onto that
   number — the HSL hue must return to where it started.
4. Move HSL saturation: the OKLCH hue must re-derive (it is derived from the color, not copied).
5. Set HSL saturation to 0%: nothing may break, and the OKLCH hue must simply stop updating.
6. Keyboard: `Tab` must reach every slider and show the `:focus-visible` outline.

## Rules

- Ask before adding any dependency (runtime or dev).
- Do not change the `/hueplay` mount path, `BASE` in `worker.js`, or the `custom_domain` routes
  without an explicit request.
- Do not edit ignored/build output (`dist/`, `.wrangler/`, `node_modules/`).
- Update `README.md` and `CHANGELOG.md` whenever behavior or the mapping changes.
- Do not add a `script-src` directive to the worker's CSP: Cloudflare's challenge platform
  injects inline scripts (JavaScript Detections) when a zone challenge is active, and a strict
  `script-src` breaks it. The CSP deliberately covers only `frame-ancestors`, `base-uri` and
  `form-action`.
