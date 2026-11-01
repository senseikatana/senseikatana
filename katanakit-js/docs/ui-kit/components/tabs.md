---
title: Tabs
description: A tablist with roving tabindex, automatic or manual activation, and keyboard-reachable panels.
---

# Tabs <span class="vp-new-badge">new</span>

```ts
import { useTabs } from "@katanakit/ui";

const tabs = useTabs({
	label: "Account settings",
	tabs: [
		{ id: "profile", label: "Profile", content: "…" },
		{ id: "billing", label: "Billing" },
	],
});

document.body.append(tabs.root);
```

Built on the [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):
`role="tablist"` over `role="tab"` buttons, each owning a `role="tabpanel"`.

<ClientOnly>
  <div ref="demo" class="tabs-demo"></div>
</ClientOnly>

## Why roving tabindex

A tablist is **one composite widget**, not a list of independent controls. The user
tabs *into* it once and then uses <kbd>←</kbd>/<kbd>→</kbd> to move between tabs.
Giving every tab `tabindex="0"` would put N stops in the page's tab order for what
is conceptually a single control — and a keyboard user would have to press Tab N
times just to get past the group.

So the selected tab carries `tabindex="0"` and the rest carry `tabindex="-1"`.
Pressing <kbd>Tab</kbd> once leaves the whole widget.

<ClientOnly>
  <div ref="stops" class="tabs-demo"></div>
</ClientOnly>

::: tip Panels are always keyboard reachable
Every panel gets `tabindex="0"`. A panel containing nothing focusable would
otherwise be unreachable — the user selects a tab, focus stays on the tab, and
they can never read what it revealed.
:::

## Activation

`activation: "automatic"` (the default) selects a tab the moment it receives
focus. That is what most users expect from tabs.

`activation: "manual"` moves focus with the arrows but requires
<kbd>Enter</kbd> or <kbd>Space</kbd> to commit. Use it when selecting a tab is
expensive, or when it would change the URL.

<ClientOnly>
  <div class="tabs-demo tabs-demo--row">
    <button type="button" class="btn btn--primary" @click="mount('automatic')">Automatic</button>
    <button type="button" class="btn btn--secondary" @click="mount('manual')">Manual</button>
  </div>
</ClientOnly>

| Key            | Action                                                        |
| -------------- | ------------------------------------------------------------- |
| <kbd>←</kbd> / <kbd>→</kbd> | Previous / next **enabled** tab, wrapping around. |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last enabled tab.                   |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Commit, in `manual` mode only.        |
| <kbd>Tab</kbd> | Leave the whole widget.                                       |

Disabled tabs are skipped in **both** directions and ignored on click.

## Options

| Option      | Type                                  | Default             | Notes                                   |
| ----------- | ------------------------------------- | ------------------- | --------------------------------------- |
| `tabs`      | `TabDefinition[]`                     | —                   | The tabs, in order.                     |
| `label`     | `string`                              | `"Tabs"`            | Accessible name for the tablist.        |
| `active`    | `string`                              | first enabled tab   | Id of the initially selected tab.       |
| `activation`| `"automatic" \| "manual"`             | `"automatic"`       | Selection follows focus, or not.        |
| `onChange`  | `(id: string) => void`                | —                   | Called when the selected tab changes.   |

A `TabDefinition` is `{ id, label, content?, disabled? }`. `content` accepts a
`string` (inserted with `textContent`, never parsed as HTML) or a `Node`; omit it
to render the panel yourself.

## The returned elements

```ts
const { root, list, buttons, panels, select } = useTabs({ tabs, label: "Sections" });

document.body.append(root);
select("billing"); // select without moving focus
```

## SSR

`useTabs` needs a DOM. `tabsClass()` is pure and safe to call on the server.

<ComponentContract
	name="Tabs"
	root="tabs"
	pure="tabsClass"
	factory="useTabs"
/>

<style scoped>
.tabs-demo {
	margin: var(--spacing-4) 0;
}

.tabs-demo--row {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-3);
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useTabs } from "@katanakit/ui";

const demo = ref<HTMLElement>();
const stops = ref<HTMLElement>();

const DEFS = [
	{ id: "one", label: "One", content: "First panel. Focus one tab, then use the arrow keys." },
	{ id: "two", label: "Two", content: "Second panel." },
	{ id: "three", label: "Three", content: "Disabled — skipped by the arrows.", disabled: true },
	{ id: "four", label: "Four", content: "Fourth panel." },
];

const mount = (target?: HTMLElement, activation: "automatic" | "manual" = "automatic") => {
	if (!target) return;
	target.replaceChildren();
	target.append(
		useTabs({
			label: "Sections",
			activation,
			tabs: DEFS,
		}).root,
	);
};

onMounted(() => {
	mount(demo.value);
	mount(stops.value);
});
</script>