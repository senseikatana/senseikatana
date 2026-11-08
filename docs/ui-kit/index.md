---
title: UI Kit
description: Katana UI — the planned framework-agnostic UI kit built on top of KatanaKit.
---

# Katana UI

::: warning Status

**Foundations available.** The first components (button, input, card, badge, alert,
toast, tabs, select, modal <span class="vp-new-badge">new</span>) live in the private `packages/ui` workspace (`@katanakit/ui`) and are styled with
the [SCSS framework](./css/index.md) vendored in `katanakit-js` (`scss/`). The package is **not published to npm yet** — inside
this repo you import it by name, outside it you cannot install it. The rest of the kit
is still planned; the name **Katana UI** is provisional.

The full **SCSS framework reference** lives in this section too: design tokens, colors,
breakpoints, dark mode, `@apply`, layout mixins, every utility class and the complete
API reference.

:::

## Install and styles

Import the stylesheet once (it ships the full vendored framework, dark-theme
tokens and the `.*` component classes) before using any factory:

```ts
import "@katanakit/ui/styles.css";
import { useButton, useInput, useCard, useBadge, useAlert, toast } from "@katanakit/ui";

document.body.append(
	useButton({ label: "Save" }),
	useInput({ label: "Email", type: "email" }).root,
);

toast.success("Saved.");
```

Every snippet below assumes that CSS import — without it the components render as
unstyled markup. Component classes are unprefixed (`.btn`, `.card`, `.toast`, …) and
live inside `@layer katana`, so they never win an import-order accident against
another framework — see [Architecture](./architecture.md#why-unprefixed-and-why-layer-katana).
Dark mode follows the KatanaKit contract: set `data-theme="dark"` on the root
element (the `ThemeService` in `katanakit-js` owns that attribute).

Katana UI is the planned UI kit for KatanaKit: design tokens, headless primitives,
components, blocks, layouts and full application pages that reuse the toolkit's core
services instead of rebuilding them.

## Why a kit on top of the toolkit

KatanaKit already owns the invisible parts of a product — HTTP with Safe Results,
storage strategies, reactive signals, theming, observers, sensors, workers and the AI
assistant. Every dashboard, storefront and operational console needs exactly those
capabilities on every screen. The kit exists so a team can assemble those screens from
the same primitives the toolkit already guarantees.

## Principles

| Principle | What it means |
| --- | --- |
| Framework-agnostic core | Tokens, primitives and styles are vanilla TypeScript and CSS. Framework bindings are thin adapters. |
| Token-first styling | Components consume CSS custom properties only. Tailwind and daisyUI are optional presets, never a requirement. |
| SSR-safe | Every module guards browser-only APIs and hydrates without layout shifts. |
| Tree-shakeable | Per-component entry points and no side effects on import. |
| Accessible by default | WCAG 2.2 AA target: semantics, focus management, keyboard flows, reduced motion. |
| Safe Result aware | Data-bound components speak the same `{ data, error, ok }` contract as the HTTP client. |

## Relationship with the toolkit

| UI need | KatanaKit service |
| --- | --- |
| Tables, filters, pagination | `FetchApiManager`, `useGetApi` |
| Theme switching and persistence | `ThemeService`, `useInitTheme` |
| Remembered UI state | `StorageService` strategies |
| Reactive widgets and stores | `ReactiveService` signals |
| Lazy blocks, infinite scroll | `ObserverService`, `LazyLoaderService` |
| Device capabilities | `SensorsUtils`, `ViewportService` |
| Chat and Gen-AI surfaces | `AssistantService`, `adapters/assistant` |
| Heavy computation | `WorkerService` |
| Formatting numbers, dates, currency | `FormatterService`, `DatesService` |

## Scope

- **Application pages** — eight dashboard layouts, a landing page, ten e-commerce
  pages, a file manager, a chat app, a four-page Gen-AI app and the Agentic Storage UI.
- **Account flows** — four auth pages, profile settings and a support/FAQ page.
- **Building blocks** — a foundation component example, 15+ ready-to-use UI blocks,
  50+ common layout examples and 100+ interaction examples with plugin integrations.
- **Theming** — token-first themes with an optional Tailwind/daisyUI preset.
- **Charts** — ApexCharts behind a swappable adapter.
- **LLM files** — machine-readable artifacts so agents can consume the kit.

## Out of scope

- Backend and business logic (the kit consumes APIs, it does not own them).
- Real datasets, seed content and domain-specific integrations.
- Framework state managers (the reactive signals kernel covers the kit's needs).

## Read next

- [Components](./components/button.md) — button, input, card, badge, alert and toast foundations.
- [Tailwind Components](./tailwind-components/index.md) — 592 Tailwind CSS 4 snippets in HTML and React TSX.
- [HyperUI](./hyperui.md) — free Tailwind catalog, vendored with live previews.
- [SCSS framework](./css/index.md) — the framework behind the kit (vendored from `katanakit-css@0.12.5`): tokens, utilities, mixins and API reference.
- [Testing](./testing.md) — the two suites that cover the kit, and what only a browser can prove.
- [Architecture](./architecture.md) — layers, theming, distribution and patterns.
- [Inventory](./inventory.md) — every planned page, block, layout and interaction.
- [LLM files](./llm-files.md) — machine-readable artifacts for AI agents.
- [Roadmap](./roadmap.md) — delivery phases and exit criteria.
