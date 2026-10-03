# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
