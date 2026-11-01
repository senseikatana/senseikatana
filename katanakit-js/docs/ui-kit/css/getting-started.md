---
title: Getting Started
description: Install katanakit-js SCSS framework and write your first styles.
---

# Getting Started

This guide walks you through installing the `katanakit-js` SCSS framework and writing your first styles.

## Prerequisites

- **Node.js** >= 18
- **Dart Sass** (the `sass` npm package)

## Installation

```bash
npm install katanakit-js
```

### CDN (no install required)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katanakit-js@latest/dist/styles.css" />
```

## Path 1: Full stylesheet

The simplest approach — import everything:

```scss
@use "katanakit-js/scss/main";
```

This emits:
- CSS reset (preflight)
- Design tokens as custom properties on `:root`
- Color utility classes (`.text-*`, `.bg-*`, `.border-*`, `.hover-*`)
- All opt-in utilities (sizing, flex, effects, layout, spacing)

## Path 2: Compose from modules

Import only what you need:

```scss
@use "katanakit-js/scss/functions" as f;
@use "katanakit-js/scss/variables" as v;
@use "katanakit-js/scss/mixins" as m;

.my-component {
  padding: v.spacing(4);
  border-radius: v.radius("lg");
  box-shadow: v.shadow("md");

  @include m.md {
    padding: v.spacing(8);
  }
}
```

## Compile

From your project root, with Dart Sass installed:

```bash
npx sass --load-path=node_modules --no-source-map --style=compressed \
  node_modules/katanakit-js/scss/main.scss dist/css/main.css
```

## Overriding tokens

Override any `!default` map before importing:

```scss
@use "katanakit-js/scss/variables" as v with (
  $spacing-scale: (
    "0": 0,
    "1": 0.5rem,
    "2": 1rem,
    "4": 2rem
  )
);
```

## Next steps

- [Tailwind CSS & presets](/ui-kit/css/integrations/tailwind) — compose with Tailwind 4, FlyonUI or daisyUI
- [Design Tokens](/ui-kit/css/core/tokens) — all token maps and access functions
- [Colors](/ui-kit/css/core/colors) · [Dark Mode](/ui-kit/css/core/dark-mode) — palettes and theming
- [Breakpoints](/ui-kit/css/core/breakpoints) — responsive mixins
- [Grid](/ui-kit/css/mixins/grid) · [Flexbox](/ui-kit/css/mixins/flex) — layout mixins
- [Utilities](/ui-kit/css/utilities/padding) — the class catalog
- [API Reference](/ui-kit/css/reference/api-reference) — every function, mixin and map

