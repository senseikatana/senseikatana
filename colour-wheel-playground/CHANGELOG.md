# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
