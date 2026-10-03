# Design System — senseikatana.com

## Status

- **Logo**: Pending
- **Color Palette**: v3.0.0 — 8 palettes, OKLCH, Tailwind CSS v4
- **Typography**: Nuxt UI defaults (Inter body, Inter headline)

## Brand Palette

| Color | Hex | OKLCH (base) | Role | Usage |
|---|---|---|---|---|
| `rose` | `#F43F5E` | `oklch(0.63 0.23 17)` | primary + error | CTAs, links, errors, destructive |
| `teal` | `#38686B` | `oklch(0.45 0.06 185)` | secondary | Acciones secundarias, borders |
| `emerald` | `#10B981` | `oklch(0.72 0.19 162)` | success | Confirmaciones, estados positivos |
| `yellow` | `#F6DC8E` | `oklch(0.90 0.12 85)` | warning | Warnings, highlights, badges |
| `sky` | `#25ABE4` | `oklch(0.72 0.12 225)` | info | Info, badges, enlaces |
| `dark` | `#11151C` | `oklch(0.15 0.02 260)` | neutral | Backgrounds, text, borders |
| `white` | `#E4E4E7` | `oklch(0.93 0.005 260)` | — | Contraste sobre dark |
| `lavender` | `#8C86AA` | `oklch(0.58 0.05 270)` | — | Decorativo, acentos, tags |

## Nuxt UI Semantic Mapping (app.config.ts)

```
primary   → rose
secondary → teal
success   → emerald
warning   → yellow
error     → rose
info      → sky
neutral   → dark
```

## Shade Scales

Each palette has shades from `50` to `950` defined in `app/assets/css/main.css`
via `@theme static` (Tailwind CSS v4).

Utilities: `bg-rose-400`, `text-dark-800`, `border-teal-200`, `bg-sky-100`, etc.

## Design Decisions

- Dark mode by default (`dark-800` as base)
- Minimalist, clean layout
- Cards with subtle borders
- `white-200` for body text on dark backgrounds
- `rose-400` as primary accent
- `sky` for info states (distinct from `teal` secondary)
- `emerald` for success (distinct from `teal`)
- Hero with profile image on the right
- Tags/hashtags in monospace font
- CTA banner at top of homepage

## Pending

- [ ] Custom logo for senseikatana.com
- [ ] Custom typography (consider display font for headings)
- [ ] Custom iconography
- [ ] Favicon update
- [ ] OG image design

## References

- Inspired by minimalist dev portfolios
- Dark theme with accent colors
- Responsive mobile-first approach
