---
title: Badge
description: Status pill with five semantic variants.
---

# Badge

`onBadge(options)` creates a `<span class="badge">`; `badgeClass(options)`
returns the classes for SSR markup.

## Variants

<div ref="badges" class="demo-row"></div>

```ts
import { onBadge } from "@katanakit/ui";

row.append(
  onBadge({ label: "Draft" }),
  onBadge({ label: "Info", variant: "info" }),
  onBadge({ label: "Paid", variant: "success" }),
  onBadge({ label: "Pending", variant: "warning" }),
  onBadge({ label: "Failed", variant: "danger" }),
);
```

<ComponentContract
	name="Badge"
	root="badge"
	pure="badgeClass"
	factory="onBadge"
/>

## Options

| Option    | Type                                                        | Default     | Notes             |
| --------- | ----------------------------------------------------------- | ----------- | ----------------- |
| `label`   | `string`                                                    | `""`        | Badge text.        |
| `variant` | `"neutral" \| "info" \| "success" \| "warning" \| "danger"` | `"neutral"` | Semantic color.    |

::: tip Dark mode
Variants use KatanaKit palette tokens, so they invert automatically with
`data-theme="dark"` (toggle the site theme to see it).
:::

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { onBadge } from "@katanakit/ui";

const badges = ref<HTMLElement>();

onMounted(() => {
	badges.value?.append(
		onBadge({ label: "Draft" }),
		onBadge({ label: "Info", variant: "info" }),
		onBadge({ label: "Paid", variant: "success" }),
		onBadge({ label: "Pending", variant: "warning" }),
		onBadge({ label: "Failed", variant: "danger" }),
	);
});
</script>
