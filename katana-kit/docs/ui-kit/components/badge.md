---
title: Badge
description: Status pill with five semantic variants.
---

# Badge

`useBadge(options)` creates a `<span class="badge">`; `badgeClass(options)`
returns the classes for SSR markup.

## Variants

<div ref="badges" class="demo-row"></div>

```ts
import { useBadge } from "@katanakit/ui";

row.append(
  useBadge({ label: "Draft" }),
  useBadge({ label: "Info", variant: "info" }),
  useBadge({ label: "Paid", variant: "success" }),
  useBadge({ label: "Pending", variant: "warning" }),
  useBadge({ label: "Failed", variant: "danger" }),
);
```

<ComponentContract
	name="Badge"
	root="badge"
	pure="badgeClass"
	factory="useBadge"
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

import { useBadge } from "@katanakit/ui";

const badges = ref<HTMLElement>();

onMounted(() => {
	badges.value?.append(
		useBadge({ label: "Draft" }),
		useBadge({ label: "Info", variant: "info" }),
		useBadge({ label: "Paid", variant: "success" }),
		useBadge({ label: "Pending", variant: "warning" }),
		useBadge({ label: "Failed", variant: "danger" }),
	);
});
</script>
