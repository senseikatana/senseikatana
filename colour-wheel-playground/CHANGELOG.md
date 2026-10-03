# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Color input.** A field above the dial accepts `#f00`, `#rrggbb`, `#rrggbbaa`, `rgb()`, `hsl()`,
  `oklch()` in both modern and legacy syntax. *Aplicar* (or `Enter`) seeds all six sliders with
  the exact conversion, normalizes the field to `#rrggbb`, and shows an inline error without
  touching the state when the string cannot be parsed. Alpha is parsed but ignored — the tool
  has no alpha channel.
- **Exact equivalence chips.** `#hex`, `hsl()` and `oklch()` for the color on screen, click to
  copy. They are the full conversion (two decimals), not the rounded slider values.
- **Numeric fields** next to every slider, synced in both directions. They do not write while the
  value is still outside range, and clamp on blur.
- **Fuera de Gamut badge** on the OKLCH panel when the triple has no sRGB representation. It
  lights up both when you drag the chroma up and when you paste an out-of-gamut `oklch()` — in
  that case the panel keeps the numbers exactly as typed instead of the gamut-mapped round trip.
- **Shareable URL**: the six-slider state is written to the query string with `replaceState`.
- **Test suite**: `tests/color.test.mjs` with `bun test` (~43k assertions) covering conversions,
  the parser, formatting and every round trip.

### Fixed

- `oklchToRgb` collapsed to the wrong color when the triple sat barely outside the
  gamut. The sRGB primaries lie exactly on the boundary and two-decimal formatting pushes them
  past it; chroma reduction is unsound there because the linear channel is cubic in chroma, so
  the in-gamut set is not an interval and the binary search converged to the first crossing
  (chroma 0.266 instead of 0.313 for blue, a 46/255 error). A `GAMUT_EPS` tolerance now clips
  instead, which is both correct and what round trips need.

### Removed

- **CIE LCH / `lab()` support** (panel, `lch()` input, `lch()` chip, hue sync and all the color
  math). It was implemented, tested against CSS Color 4 (D50 + linear Bradford) and then taken
  out on purpose: `lab()`/`lch()` are an ICC/print convention with a large part of the gamut
  outside sRGB, and this tool is for web projects, Tailwind and digital branding, where only
  sRGB-reachable coordinates are useful. The decision is recorded in `AGENTS.md` so it does not
  get reintroduced by accident.
- The hue sliders could report `hsl(360, …)` instead of `hsl(0, …)` after pasting a near-red
  color; hues are normalized to `[0, 360)` now.


## [0.2.0] - 2026-10-03

### Changed

- **Mount path moved from `/showcase/*` to `/hueplay/*`.** The old URL is gone; `README.md`,
  `index.html` (canonical and OG/Twitter URLs) and `worker.js` all point at the new path.
- **The hue mapping is now a real conversion instead of a lookup table.** New `color.js` runs
  sRGB → linearize → OKLab → OKLCH for the color described by the HSL panel, so the OKLCH hue
  is correct for any saturation and lightness rather than only for the six sampled anchors.
  The previous table was up to 31.6° off (yellow reported 90° against a true 109.8°, magenta
  360° against 328.4°, mean error 14.3°).
- The OKLCH hue re-derives whenever the HSL saturation or lightness changes, because OKLCH hue
  is a property of the whole color, not of the hue angle alone.
- The inner ring paints the six HSL primaries at their true OKLCH hues (29.2°, 109.8°, 142.5°,
  194.8°, 264.1°, 328.4°), so its sectors are correctly uneven.
- The OKLCH hue slider track is now a full OKLCH hue wheel instead of a stop list keyed to the
  old table.
- `Cache-Control: no-cache` for every asset — the filenames carry no fingerprint, so
  revalidation is the honest policy (`max-age=300` could serve stale JS for five minutes after
  a deploy).
- Unknown paths now return a real **404**; the `single-page-application` fallback was removed
  from `wrangler.jsonc` because there is no client-side routing (it used to serve `index.html`
  with a 200 for missing `.js` and `.css` files).

### Added

- `color.js`: pure color module (`hslToRgb`, `rgbToOklch`, `oklchToRgb`, forward and inverse
  hue mapping, chroma reduction for out-of-gamut values). It has no DOM access, so it can be
  imported from Node for assertions.
- Security headers on every response, including 404s and 405s: `Content-Security-Policy`
  (`frame-ancestors 'none'; base-uri 'none'; form-action 'none'`), `X-Frame-Options: DENY`,
  `Permissions-Policy` and `Strict-Transport-Security`.
- `HEAD`/`GET`-only guard in the worker (405 with an `Allow` header otherwise).
- The worker rebuilds the asset path instead of slicing it, so `//host` and `..` cannot reach
  the `ASSETS` binding, and redirects derive from a fixed allow-list of hostnames instead of
  reflecting the request `Host`.
- Accessible slider labels (`aria-labelledby` pointing at the visible control label) and a
  `:focus-visible` outline — the sliders previously had `outline: none` with no replacement.
- `<link rel="canonical">` and a real `<meta name="author">`.

### Fixed

- The dial no longer gets stuck: the drag moved to Pointer Events with `setPointerCapture` and
  now also ends on `pointercancel`, instead of relying on `mouseup`/`touchend` alone.
- Clicks inside the dial hub no longer throw the pointer to an arbitrary angle.
- Removed the dead `isSyncing` guard (programmatic `.value =` never fires `input`), the
  per-event `getElementById` lookups, and the two static hue gradients that were rebuilt on
  every frame.
- `jsconfig.json` now loads the DOM libraries; it previously declared `jsx: "react-jsx"` and
  `types: ["bun"]` for a project that uses neither, so `strict` never applied to the browser
  code.
- `index.html` no longer ships the placeholder author and its title now matches `README.md`.

## [0.1.0] - 2026-10-03

Initial release.

### Added

- 360° dual-ring dial: drag to set the hue; the outer ring shows the HSL wheel, the inner ring shows the OKLCH wheel, and both sliders stay synchronized.
- Dual control panels with independent sliders: Hue, Saturation and Lightness for HSL; Hue, Chroma and Lightness for OKLCH.
- Live gradient tracks on both hue sliders (sRGB primaries for HSL, OKLCH anchor hues for OKLCH).
- Real-time CSS output: the `hsl()` and `oklch()` strings update next to their color swatches as you drag or slide.
- Piecewise-linear HSL ↔ OKLCH hue mapping table (`map` in `index.js`), documented with worked examples in `README.md`.
- Zero-dependency implementation: plain HTML, CSS and vanilla JavaScript — no framework, no bundler.
- Cloudflare Worker with Static Assets serving the playground on `/showcase/*` of `senseikatana.com`, including root redirects, SPA fallback, cache control and security headers.
- `bun run dev`, `bun run build` and `bun run deploy` scripts backed by Wrangler.
