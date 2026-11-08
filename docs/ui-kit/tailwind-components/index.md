---
title: Tailwind Components
description: 592 Tailwind CSS 4 components, mirrored as framework-agnostic HTML and React TSX.
---

# Tailwind Components

592 production-ready components migrated from Tailwind CSS 2/3 to **Tailwind CSS 4**.
Every component exists twice, at the same relative path:

| Tree | Path | Use with |
| --- | --- | --- |
| HTML | `packages/ui/tailwind/html/` | Vue, Astro, plain HTML and any templating language |
| React | `packages/ui/tailwind/react/` | React 18/19 + TypeScript (`.tsx`) |

The HTML tree is the source of truth for structure and classes. The React tree is
the same markup with JSX syntax and, for interactive components, Headless UI wiring.

## Install Tailwind 4

The components use plain Tailwind utilities — there is no runtime dependency and no
KatanaKit import. In your app:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

```css
/* app.css */
@import "tailwindcss";

/* The snippets were written against the Tailwind 3 default border color.
   Tailwind 4 changed it to currentColor; keep the old default with this
   one-time compatibility layer (the same rule the official upgrade tool adds). */
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentcolor);
  }
}
```

## Use the HTML version

The HTML files are complete fragments: copy the file into a template and keep the
class names. Nothing else is required.

::: code-group

```vue [Vue]
<script setup lang="ts">
import markup from "@/components/snippets/primary_buttons.html?raw";
</script>

<template>
	<div v-html="markup" />
</template>
```

```astro [Astro]
---
import markup from "@/components/snippets/primary_buttons.html?raw";
---

<Fragment set:html={markup} />
```

```html [Plain HTML]
<!-- Paste the file contents directly into the page. -->
<button type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2">
	Button text
</button>
```

:::

## Use the React version

The `.tsx` files are self-contained default exports:

```tsx
import Example from "@/components/primary_buttons";

export default function Page() {
	return <Example />;
}
```

Interactive components (menus, modals, comboboxes, switches) import
`@headlessui/react` **1.x** (`Menu.Button`, `Transition.Child`), and icons come from
`@heroicons/react` **1.x** (`/solid`, `/outline`):

```bash
npm install @headlessui/react@^1 @heroicons/react@^1
```

- 218 of the 592 components use Headless UI for interaction.
- 320 import Heroicons; 118 inline their SVG and need no icon package.
- 256 are pure markup with no imports at all.

If you already run Headless UI 2.x, the API renamed `Menu.Button` → `MenuButton`
and `Transition.Child` → `TransitionChild`; migrate those imports when you copy a
component.

## What the v4 migration changed

The catalog went through the official `@tailwindcss/upgrade` codemod plus a
supplemental pass for utilities the codemod leaves alone:

| Tailwind 2/3 | Tailwind 4 |
| --- | --- |
| `shadow-sm` / `shadow` | `shadow-xs` / `shadow-sm` |
| `rounded-sm` / `rounded` | `rounded-xs` / `rounded-sm` |
| `outline-none` | `outline-hidden` |
| `ring` | `ring-3` |
| `flex-shrink-0` / `flex-grow` | `shrink-0` / `grow` |
| `bg-gradient-to-r` | `bg-linear-to-r` |
| `bg-opacity-75` | `bg-black/75` (color + opacity modifier) |
| `ring-opacity-5` | `ring-black/5` |
| `placeholder-gray-500` | `placeholder:text-gray-500` |
| `warm-gray` / `blue-gray` / `grape` | `stone` / `slate` / `purple` |
| `max-w-screen-xl` | `max-w-(--breakpoint-xl)` |
| `backdrop-blur` | `backdrop-blur-sm` |
| `aspect-w-10 aspect-h-7` | `aspect-[10/7] *:absolute *:inset-0 *:h-full *:w-full` |
| `aspect-none` | `aspect-auto` |

The aspect-ratio plugin is not used in Tailwind 4. The migration rewrites every
`aspect-w-*`/`aspect-h-*` pair to a core `aspect-[w/h]` (or `aspect-square`) and
recreates the plugin's child rule with the `*:` variant, so images and overlays
still fill the frame.

`prose` content uses `@tailwindcss/typography`. The docs preview loads it from
this repo; in your app add the plugin to your entry stylesheet:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

The bare `border` / `divide` utilities keep the Tailwind 3 gray default through the
compatibility layer above — without it, they inherit `currentColor`.

## Structure

The tree follows **Feature-Based Architecture**: business capabilities first,
then a `shared/` layer for the primitives they all compose.

```
packages/ui/tailwind/
├── html/
│   ├── shared/       # primitives, forms, feedback, navigation, data display, layout, shells
│   ├── auth/
│   ├── dashboard/
│   ├── workspace/
│   ├── settings/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── storefront/
│   └── marketing/
└── react/            # the same feature paths as .tsx
```

Browse every category in the [catalog](./catalog.md), or jump to a group:

- [Shared UI](./shared.md) — cross-feature primitives, forms, feedback, navigation and shells.
- [Features](./features.md) — auth, dashboard, workspace, settings, products, cart, checkout, orders, storefront and marketing.

::: tip Regenerating this section
The preview copies and the catalog table are generated by
`node scripts/sync-tailwind-components.mjs`, which `scripts/docs.mjs` runs before
every build. The component sources under `packages/ui/tailwind/` are the only
files you edit.
:::
