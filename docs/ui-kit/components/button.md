---
title: Button
description: Framework-agnostic button with variants, sizes, loading state and accessible focus.
---

# Button

`onButton(options)` creates a styled `<button>`; `buttonClass(options)` returns
the class list for SSR or framework templates.

## Variants

<div ref="variants" class="demo-row"></div>

```ts
import { onButton } from "@katanakit/ui";

row.append(
  onButton({ label: "Primary" }),
  onButton({ label: "Secondary", variant: "secondary" }),
  onButton({ label: "Ghost", variant: "ghost" }),
  onButton({ label: "Danger", variant: "danger" }),
);
```

## Sizes and states

<div ref="states" class="demo-row"></div>

```ts
onButton({ label: "Small", size: "sm" });
onButton({ label: "Large", size: "lg" });
onButton({ label: "Loading", loading: true });
onButton({ label: "Disabled", disabled: true });
```

<ComponentContract
	name="Button"
	root="btn"
	pure="buttonClass"
	factory="onButton"
/>

## Options

| Option     | Type                                             | Default     | Notes                                              |
| ---------- | ------------------------------------------------ | ----------- | -------------------------------------------------- |
| `label`    | `string`                                         | `""`        | Visible text.                                       |
| `variant`  | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"primary"` | Visual style.                                       |
| `size`     | `"sm" \| "md" \| "lg"`                            | `"md"`      | Padding and font size.                              |
| `type`     | `"button" \| "submit" \| "reset"`                 | `"button"`  | Native type.                                        |
| `loading`  | `boolean`                                        | `false`     | Spinner, `aria-busy` and disabled interaction.      |
| `disabled` | `boolean`                                        | `false`     | Native disabled state.                              |
| `onClick`  | `(event: MouseEvent) => void`                     | —           | Attached with `addEventListener`.                   |

::: info SSR
The factories need a DOM. On the server use `buttonClass()` and render the
markup yourself — the classes are stable strings.
:::

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { onButton } from "@katanakit/ui";

const variants = ref<HTMLElement>();
const states = ref<HTMLElement>();

onMounted(() => {
	variants.value?.append(
		onButton({ label: "Primary" }),
		onButton({ label: "Secondary", variant: "secondary" }),
		onButton({ label: "Ghost", variant: "ghost" }),
		onButton({ label: "Danger", variant: "danger" }),
	);
	states.value?.append(
		onButton({ label: "Small", size: "sm" }),
		onButton({ label: "Medium" }),
		onButton({ label: "Large", size: "lg" }),
		onButton({ label: "Loading", loading: true }),
		onButton({ label: "Disabled", disabled: true }),
	);
});
</script>
