---
title: Select
description: A listbox combobox with aria-activedescendant, typeahead and optional form participation.
---

# Select <span class="vp-new-badge">new</span>

```ts
import { useSelect } from "@katanakit/ui";

const select = useSelect({
	label: "Country",
	name: "country",
	options: [
		{ value: "es", label: "Spain" },
		{ value: "ar", label: "Argentina" },
	],
});

document.body.append(select.root);
```

Built on the [WAI-ARIA select-only combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
pattern.

<ClientOnly>
  <div ref="demo" class="select-demo"></div>
</ClientOnly>

## Why `aria-activedescendant`, not roving `tabindex`

Contrast [Tabs](./tabs.md), which uses roving `tabindex`. The difference is
**lifetime**, not preference:

- A tablist is permanently in the DOM, so its children can carry real `tabindex`
  values and the browser's tab order can visit them.
- A listbox is **virtual** — it only exists while open. There is no stable element
  for the tab order to visit.

So focus stays on the button at all times, and the active option is addressed by
id with `aria-activedescendant`. A screen reader still announces each option as
the arrows move, and closing the list does not have to move focus back from
somewhere it never left.

::: warning `label` is not optional in practice
A `role="combobox"` with no accessible name is announced as just "combo box". The
user has no idea what they are being asked to choose. Always pass one.
:::

## Keys

| Key                                  | Action                                             |
| ------------------------------------ | -------------------------------------------------- |
| <kbd>↓</kbd> / <kbd>↑</kbd>          | Open, then move through **enabled** options.        |
| <kbd>Home</kbd> / <kbd>End</kbd>     | First / last enabled option, while open.            |
| <kbd>Enter</kbd> / <kbd>Space</kbd>  | Open; commit when already open.                     |
| <kbd>Esc</kbd>                       | Close without committing — selection is restored.   |
| <kbd>Tab</kbd>                       | Close without committing, and move on.              |
| Type a letter                        | Typeahead, jumping to the matching option.         |

Disabled options are skipped in both directions and cannot be chosen.

## Committing versus browsing

While the list is open, the **active row** and the **selection** are different
things. The arrows move the active row; nothing is committed until
<kbd>Enter</kbd>, <kbd>Space</kbd> or a click. <kbd>Esc</kbd> and <kbd>Tab</kbd>
both discard the active row and leave the selection where it was.

That distinction matters on long lists: a user can scan with the arrows without
changing anything.

## Typeahead

Typing jumps to the first option whose label starts with what you typed. The
buffer holds for 500 ms, so `a` then `r` finds "Argentina", and a mistyped prefix
leaves you where you were rather than resetting.

## Form participation

Pass `name` and the component also renders a hidden `<input>`, so the value joins
a normal form submission. Without it the component is presentational and the
caller owns the value.

<ClientOnly>
  <form id="select-form" class="select-demo">
    <div ref="demo2"></div>
    <button type="submit" class="btn btn--primary">Submit</button>
    <output ref="out" class="select-demo__out"></output>
  </form>
</ClientOnly>

## Options

| Option        | Type                     | Default             | Notes                                                    |
| ------------- | ------------------------ | ------------------- | -------------------------------------------------------- |
| `options`     | `SelectOption[]`         | —                   | The choices, in order.                                   |
| `label`       | `string`                 | —                   | **Accessible name. Always set one.**                     |
| `value`       | `string`                 | first enabled       | Initially selected value.                                 |
| `placeholder` | `string`                 | `"Select…"`         | Shown when nothing is selected.                          |
| `disabled`    | `boolean`                | `false`             | Disables the whole control.                               |
| `name`        | `string`                 | —                   | Renders a hidden input so the value joins a form.        |
| `onChange`    | `(value: string) => void` | —                   | Called with the newly selected value.                    |

## The returned elements

```ts
const { root, button, list, options, input, getValue, setOpen } = useSelect({ label, options });

document.body.append(root);
getValue();   // "es" | undefined
setOpen(true);
```

## SSR

`useSelect` needs a DOM. `selectClass()` is pure and safe on the server.

<ComponentContract
	name="Select"
	root="select"
	pure="selectClass"
	factory="useSelect"
/>

<style scoped>
.select-demo {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-3);
	align-items: center;
	margin: var(--spacing-4) 0;
}

.select-demo__out {
	font-family: var(--font-mono, monospace);
	font-size: 0.8125rem;
	color: var(--neutral-600);
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useSelect } from "@katanakit/ui";

const demo = ref<HTMLElement>();
const demo2 = ref<HTMLElement>();
const out = ref<HTMLOutputElement>();

const CHOICES = [
	{ value: "es", label: "Spain" },
	{ value: "ar", label: "Argentina" },
	{ value: "br", label: "Brazil" },
	{ value: "cl", label: "Chile", disabled: true },
	{ value: "uy", label: "Uruguay" },
];

const mount = (target?: HTMLElement, withName = false) => {
	if (!target) return;
	target.replaceChildren();
	target.append(
		useSelect({
			label: "Country",
			name: withName ? "country" : undefined,
			placeholder: "Pick one",
			options: CHOICES,
			onChange: (value) => {
				if (out.value) out.value.textContent = `submitted: country=${value}`;
			},
		}).root,
	);
};

onMounted(() => {
	mount(demo.value);
	mount(demo2.value, true);

	document.getElementById("select-form")?.addEventListener("submit", (event) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		if (out.value) out.value.textContent = `submitted: country=${String(data.get("country"))}`;
	});
});
</script>