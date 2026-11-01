---
title: Button
description: Framework-agnostic button with variants, sizes, loading state and accessible focus.
---

# Button

`useButton(options)` creates a styled `<button>`; `buttonClass(options)` returns
the class list for SSR or framework templates.

## Variants

<div ref="variants" class="demo-row"></div>

```ts
import { useButton } from "@katanakit/ui";

row.append(
  useButton({ label: "Primary" }),
  useButton({ label: "Secondary", variant: "secondary" }),
  useButton({ label: "Ghost", variant: "ghost" }),
  useButton({ label: "Danger", variant: "danger" }),
);
```

## Sizes and states

<div ref="states" class="demo-row"></div>

```ts
useButton({ label: "Small", size: "sm" });
useButton({ label: "Large", size: "lg" });
useButton({ label: "Loading", loading: true });
useButton({ label: "Disabled", disabled: true });
```

<ComponentContract
	name="Button"
	root="btn"
	pure="buttonClass"
	factory="useButton"
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

import { useButton } from "@katanakit/ui";

const variants = ref<HTMLElement>();
const states = ref<HTMLElement>();

onMounted(() => {
	variants.value?.append(
		useButton({ label: "Primary" }),
		useButton({ label: "Secondary", variant: "secondary" }),
		useButton({ label: "Ghost", variant: "ghost" }),
		useButton({ label: "Danger", variant: "danger" }),
	);
	states.value?.append(
		useButton({ label: "Small", size: "sm" }),
		useButton({ label: "Medium" }),
		useButton({ label: "Large", size: "lg" }),
		useButton({ label: "Loading", loading: true }),
		useButton({ label: "Disabled", disabled: true }),
	);
});
</script>
