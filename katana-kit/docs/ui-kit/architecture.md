---
title: Architecture
description: Layered architecture, theming, distribution and design patterns for Katana UI.
---

# Architecture

Katana UI is designed as a separate package that consumes `katanakit-js` from the
outside. The toolkit stays a pure service library; the kit adds presentation on top
without reaching into the core.

**Today** the kit is the foundations layer only: nine components (`button`,
`input`, `card`, `badge`, `alert`, `toast`, `tabs`, `select`, `modal` <span class="vp-new-badge">new</span>) in the private `packages/ui` workspace,
styled with the SCSS framework vendored in `katanakit-js` (`scss/`, from `katanakit-css@0.12.5`). Everything else on this page marked "planned" is the
target design, not the current state.

## Layers

```
tokens      CSS custom properties (color, space, radius, typography, elevation)
   │
primitives  headless behavior (disclosure, focus trap, roving tabindex, positioning)
   │
bindings    framework glue (vanilla · Vue/Nuxt · Astro · React · Svelte)
   │
components  styled UI (button, input, table, modal, toast, chart)
   │
blocks      composed sections (KPI row, data-table toolbar, activity feed)
   │
layouts     page shells (app shell, auth shell, marketing shell)
   │
pages       full screens (dashboards, storefront, apps, account flows)
```

| Layer | Responsibility | Examples |
| --- | --- | --- |
| Tokens | Single source of visual truth | `--neutral-500`, `--spacing-4`, `--radius-md` (from the vendored framework) |
| Primitives | Behavior without markup opinions | `createDisclosure`, `createFocusTrap`, `createPopover` |
| Bindings | Lifecycle, reactivity and hydration | `vanilla`, `vue`, `astro`, `react`, `svelte` |
| Components | Accessible, themed markup | Button, Input, Table, Modal, Toast |
| Portal-owning components | Top-layer overlays | `modal` owns its portal: it appends to `document.body` (or a `container` you pass) and removes itself on close. |
| Blocks | Drop-in sections composed of components | KPI stats, chart card, empty state |
| Layouts | Reusable page skeletons | App shell, auth shell, settings shell |
| Pages | Complete screens with mock contracts | CRM, e-commerce, file manager, chat |

## Theming

Theming is token-first. The kit never hardcodes a color, radius or size; it reads CSS
custom properties and lets the host application override them.

The tokens come from the vendored framework and are **not namespaced**: the kit consumes
the shared palette (`--neutral-*`, `--danger-*`, `--success-*`, `--warning-*`,
`--info-*`), spacing (`--spacing-1…6`), radii (`--radius-sm|md|lg|full`) and
typography tokens directly. Component classes are unprefixed too
(`.btn`, `.card`, `.alert`, …).

### Why unprefixed, and why `@layer katana`

Unprefixed class names collide 1:1 with [daisyUI](https://daisyui.com/components/) —
`.btn`, `.card`, `.badge`, `.alert`, `.toast`, `.input`, `.menu`, `.modal`, `.tabs`
are all daisyUI component names as well. Two selectors with one class each have
**equal specificity**, so the winner would be decided by import order: the same
code would render differently depending on whether the kit or the preset was
imported first, with no way to tell from reading it.

Every component class is therefore wrapped in `@layer katana`:

```css
@layer katana {
  .btn { … }
  .btn--primary { … }
}
```

Cascade layers resolve that by priority rather than by luck: **unlayered CSS always
beats layered CSS**, regardless of specificity or order. A consumer who also loads
daisyUI gets daisyUI's styling — deterministically, every time. Layered component
CSS can never win an import-order accident.

The kit's own preflight follows the same rule from the other side: it lives in
`@layer katana-reset`, declared **before** `katana`, so the universal reset
(zero margin/padding/border) loses to the component rules instead of erasing
their padding. Utilities stay unlayered on purpose — `.p-4` has to be able to
adjust `.btn` without a layer deciding for it. Consumers composing the kit with
their own layer statement must include `katana-reset` before `katana`.

Theme tokens stay **outside** the layer, because a cascade layer cannot influence
`:root`: the custom properties have to stay available to utilities and to consumer
styles. The same reasoning keeps the kit's own `@keyframes` and the
`--katana-toast-duration` custom property namespaced — neither is reachable by a
class selector, so neither needs the layer, and both stay collision-proof.

```css
/* Override a token for the whole app */
:root {
  --neutral-500: oklch(62% 0.19 260);
}

/* Dark mode: the same contract the ThemeService drives */
:root[data-theme="dark"] {
  --neutral-50: oklch(18% 0.01 260);
}
```

- `ThemeService` owns the `data-theme` attribute, persistence and the system
  preference listener. The kit only consumes the attribute; the dark tokens are
  compiled into `@katanakit/ui/styles.css` via the upstream `theme("dark")` mixin.
- A theme is a plain stylesheet. Six curated themes are planned; any theme that
  defines the token contract works.
- **Tailwind CSS 4 and daisyUI are optional presets** — planned, not shipped yet.
  Neither will be a dependency of the core kit.

## Distribution

Current state of `packages/ui` (private workspace, not published to npm):

| Concern | Decision |
| --- | --- |
| Location | Workspace package `packages/ui` inside this repo. **Private** (`"private": true`, version `0.0.0`). |
| Package name | `@katanakit/ui` (provisional). |
| Entry points (today) | `.` → `dist/index.js` (the nine component factories + `*Class` helpers) and `./styles.css` → `dist/styles.css`. Nothing else is exported. |
| Peer dependencies | None for CSS — the built stylesheet embeds the vendored framework, so runtime consumers need no extra CSS. |
| Build | `bun run build:ui` — `tsc6` to `dist/` + `sass` (`scss/main.scss` → `dist/base.css`, components → `dist/components.css`) + concat → `dist/styles.css`. |
| Styling | One self-contained stylesheet (`@katanakit/ui/styles.css`) that emits the full vendored framework, dark tokens and the `.*` classes. |
| CSS isolation | Component selectors are namespaced (`.*`); they never target host markup. Palette tokens are shared with the vendored framework (unprefixed). |

Planned, not yet implemented: per-component subpaths, `/tokens`, framework
bindings (`/vue`, `/nuxt`, `/astro`, …) and the `/charts` entry point.

## Charts

Charts sit behind a small strategy contract so the rendering library is replaceable:

```ts
interface ChartAdapter {
  render(target: HTMLElement, config: ChartConfig): ChartHandle;
}
```

- `ApexChartAdapter` is the default implementation; `apexcharts` is an optional peer
  dependency and only loads in the `@katanakit/ui/charts` entry point.
- A lightweight SVG fallback adapter is planned for SSR and minimal bundles.
- Chart blocks consume `ChartAdapter`, never ApexCharts directly.

## Design patterns

| Pattern | Where it applies |
| --- | --- |
| Singleton | Shared kit runtime (theme bridge, chart registry) built on the existing toolkit services. |
| Facade | Each entry point exposes one facade over primitives and components. |
| Factory | Component registration, chart adapter resolution, block factories. |
| Observer | Reactive widgets subscribe to `ReactiveService` signals; lazy blocks use `ObserverService`. |
| Strategy | Chart adapters, storage-backed state, formatting strategies. |
| Decorator | Composition helpers that add behavior (validate, persist, lazy-load) around components. |

## SSR and hydration

- Primitives are no-ops on the server and activate on the client.
- `useInitTheme` already guards `window`; the kit never runs theme code during SSR.
- Charts render a sized placeholder server-side and mount on the client to avoid
  layout shift.
- No component reads `location`, `matchMedia` or storage at import time.

## Accessibility

- Semantic HTML first; ARIA only where semantics are insufficient.
- Focus trap, focus restore and roving tabindex live in primitives, not in each
  component.
- Every interactive block documents its keyboard map in the component metadata
  (see [LLM files](./llm-files.md)).
- `prefers-reduced-motion` disables non-essential animation.

## Performance

- No side effects on import; unused components are dropped by the bundler.
- Per-component entry points keep the initial bundle small.
- Blocks support lazy mounting through dynamic import plus `ObserverService`.
- Expensive data shaping (sorting, filtering, aggregation) can be offloaded to
  `WorkerService`.
