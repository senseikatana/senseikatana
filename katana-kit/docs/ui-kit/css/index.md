---
title: KatanaKit CSS
description: A lightweight, modular SCSS mini-framework — design tokens, utility classes and layout mixins.
---

# KatanaKit CSS

A lightweight, modular SCSS mini-framework. Design tokens, utility classes and layout mixins — zero runtime overhead.

## Why KatanaKit CSS?

KatanaKit CSS is a **pure SCSS** framework inspired by the utility-first approach of Tailwind CSS, but without a build pipeline you don't control. Everything is generated at compile time from `!default` design-token maps.

- **Design tokens** — fonts, spacing, radius, shadows, z-layers, durations and easings as SCSS maps, emitted as CSS custom properties.
- **Color system** — 6 palettes × 7 shades + special colors, with utility classes, hover variants and an automatic dark theme.
- **Layout mixins** — breakpoints (7 tiers, mobile-first), a full CSS Grid toolkit and flexbox helpers.
- **Utility classes** — spacing, sizing, flex, effects, typography and layout generated from maps.
- **`@apply`-style composition** — a tiny registry system so you can compose utilities inside your components.

## Quick install

```bash
npm install katanakit-js
```

```scss
// Full stylesheet (reset + tokens + utilities)
@use "katanakit-js/scss/main";

// Or compose your own from modules
@use "katanakit-js/scss/functions" as f;
@use "katanakit-js/scss/variables" as v;
@use "katanakit-js/scss/mixins" as m;
```

## Explore the framework

| Section         | Pages                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Getting Started** | [Install and first styles](/ui-kit/css/getting-started)                                                                                                                         |
| **Integrations** | [Tailwind CSS & presets](/ui-kit/css/integrations/tailwind)                                                                                                                      |
| **Foundations** | [Design Tokens](/ui-kit/css/core/tokens) · [Colors](/ui-kit/css/core/colors) · [Breakpoints](/ui-kit/css/core/breakpoints) · [Dark Mode](/ui-kit/css/core/dark-mode) · [@apply](/ui-kit/css/core/apply) |
| **Mixins**      | [Grid](/ui-kit/css/mixins/grid) · [Flexbox](/ui-kit/css/mixins/flex)                                                                                                                 |
| **Utilities**   | [Spacing](/ui-kit/css/utilities/padding) · [Display](/ui-kit/css/utilities/display) · [Typography](/ui-kit/css/utilities/typography) · [Effects](/ui-kit/css/utilities/effects) · [Grid Classes](/ui-kit/css/utilities/grid-classes) and 20 more |
| **Reference**   | [Functions](/ui-kit/css/reference/functions) · [API Reference](/ui-kit/css/reference/api-reference) · [Architecture](/ui-kit/css/reference/architecture)                            |

