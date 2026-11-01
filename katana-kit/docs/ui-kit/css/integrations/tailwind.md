---
title: Tailwind CSS & Presets
description: Compose katanakit-js component classes with a Tailwind CSS 4 pipeline you own, including optional FlyonUI and daisyUI presets.
---

# Tailwind CSS & Presets

KatanaKit does not ship a Tailwind pipeline. Its component classes are precompiled
plain CSS inside `@layer katana`, so they can be imported into a Tailwind CSS 4
project you already own. The presets stay on your side of the boundary:

| Piece | Owner |
| --- | --- |
| Tailwind CSS 4 and its Vite/PostCSS plugin, `@plugin` and `@source` directives | your app |
| FlyonUI, daisyUI and their `@source` globs | your app (optional) |
| Kit tokens and component classes, wrapped in `@layer katana` | `katanakit-js/styles.css` |

The kit never adds Tailwind, FlyonUI or daisyUI as dependencies.

## Install

```bash
npm install katanakit-js

# your Tailwind 4 setup, if you do not have one yet
npm install -D tailwindcss @tailwindcss/vite

# optional presets
npm install -D flyonui
```

## The entry stylesheet

Tailwind directives must live in **your** entry CSS (for example `src/app.css`).
They cannot be shipped precompiled inside the package: `@source` paths resolve
relative to the stylesheet that contains them, and `@plugin` resolves packages
from your project. The minimal composition is:

```css
/* Declare layer order once: first declared = lowest priority. */
@layer theme, base, components, katana-reset, katana, utilities;

@import "tailwindcss";
@import "katanakit-js/styles.css";
```

- Keep the `@layer` statement at the top of the file — it is the only place the
  order can be pinned.
- `@import` lines must precede other rules (except `@layer` statements and
  `@charset`).
- Do not `@source` the kit: its CSS is already compiled, so Tailwind has nothing
  to scan for it.

### With FlyonUI

```css
@layer theme, base, components, katana-reset, katana, utilities;

@import "tailwindcss";
@plugin "flyonui";
@import "flyonui/variants.css";
@source "../node_modules/flyonui/flyonui.js";

@import "katanakit-js/styles.css";

/* Optional integrations shipped inside the flyonui package. */
/* @import "flyonui/src/vendor/flatpickr.css"; */
```

- `@plugin "flyonui"` registers the plugin, `variants.css` adds its static
  variants, and `@source` points Tailwind at FlyonUI's JavaScript components so
  the class names they toggle are generated.
- `@source` is relative to this stylesheet (`src/app.css` →
  `../node_modules/flyonui/flyonui.js`), not to the package — that is why this
  recipe lives in your app and not inside `katanakit-js`.
- The commented `flyonui/src/vendor/*.css` files ship **inside the `flyonui`
  package itself**. There is no vendor folder to create: uncomment only the
  integrations for plugins you actually use (flatpickr, notyf, datatables…).

### With daisyUI

```css
@layer theme, base, components, katana-reset, katana, utilities;

@import "tailwindcss";
@plugin "daisyui";
@import "katanakit-js/styles.css";
```

Both presets can coexist — each `@plugin` line is independent.

## Which layer wins

Cascade layers are ordered by first declaration: later layers beat earlier ones,
and **unlayered CSS beats every layer**. With the statement above:

| Layer | Source | What it decides |
| --- | --- | --- |
| `theme` | Tailwind | token variables |
| `base` | Tailwind preflight + kit reset | element defaults |
| `components` | Tailwind/FlyonUI/daisyUI component output | preset components |
| `katana-reset` | kit preflight (`*` margin/padding/border) | element defaults; **loses to kit components** |
| `katana` | `katanakit-js/styles.css` | **kit components beat preset components** |
| `utilities` | Tailwind utilities | **utilities beat the kit's components** |
| *(unlayered)* | rules you write outside a layer, plus the kit's own utility classes | beats every layer above |

The kit's utility classes (`.p-*`, `.flex`, `.text-*`…) are **unlayered today**:
they must be able to adjust a component without a layer stepping in. In a
Tailwind project that means they beat Tailwind's `utilities` layer for the same
property, so import the full stylesheet only when you actually want them.

That is the intended precedence: a Tailwind utility can always adjust a kit
component (`<button class="btn p-2">`), and the kit beats a preset's
equally-named component without depending on import order — the same guarantee
described in [Why unprefixed, and why `@layer katana`](/ui-kit/architecture#why-unprefixed-and-why-layer-katana).

If you want a preset's components to win instead, move `katana` before
`components` in the layer statement. A preset that declares a layer of its own
(for example `@layer flyonui`) is appended after `utilities`; add its name to
the statement when you need to pin its position.

## Dark mode

The kit's dark palette is token-based and opt-in: set `data-theme="dark"` on
`<html>` (see [Dark Mode](/ui-kit/css/core/dark-mode)). Presets that also read
`data-theme` compose with it through the same attribute; Tailwind's own dark
variant keeps its separate mechanism.

## Payload note

`katanakit-js/styles.css` bundles the kit's reset, tokens and utility classes
(~119 KB) plus the component classes (~22 KB). In a Tailwind project the kit's
utilities are mostly redundant — import the full stylesheet when you use them.
A components-only entry point is not published yet; until then, the full
stylesheet is the supported surface.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| A kit `.btn`/`.card` overrides FlyonUI or daisyUI | `katana` is declared after `components`; fix the layer statement |
| Kit components lose their padding or border | `katana-reset` is missing from the statement, so it outranks `katana`; declare it before `katana` |
| Tailwind utilities no longer override `.btn` padding | the `@layer` statement is missing, so `katana` beats `utilities` |
| FlyonUI classes toggled by its JS never generate | `@source` is missing or points at the wrong file |
| `@source` cannot find the file | the path is relative to the stylesheet — adjust it from your entry CSS |
| Kit components render unstyled | `katanakit-js/styles.css` is not imported in the same entry |

## Next steps

- [Getting Started](/ui-kit/css/getting-started) — install the SCSS framework and compile it yourself
- [Architecture](/ui-kit/architecture) — the cascade-layer rationale and preset policy
- [Components](/ui-kit/components/button) — the classes this recipe composes
- [Dark Mode](/ui-kit/css/core/dark-mode) — the token contract behind `data-theme`
