---
title: Alert
description: Inline alert with semantic variants, title/message and accessible dismissal.
---

# Alert

`onAlert(options)` creates a `.alert` with `role="alert"` for
`warning`/`danger` and `role="status"` for `info`/`success`. Dismissible alerts get
a button with `aria-label="Dismiss"`. `alertClass(options)` returns the classes
for SSR markup.

## Variants

<div ref="alerts" class="demo-stack"></div>

```ts
import { onAlert } from "@katanakit/ui";

stack.append(
  onAlert({ variant: "info", title: "Heads up", message: "Deploy starts in 10 minutes." }),
  onAlert({ variant: "success", message: "Backup finished." }),
  onAlert({ variant: "warning", message: "Quota at 90%." }),
  onAlert({ variant: "danger", title: "Build failed", message: "Check the logs." }),
);
```

## Dismissible

<div ref="dismissible" class="demo-stack"></div>

```ts
onAlert({
  variant: "info",
  message: "This one can be dismissed.",
  dismissible: true,
  onDismiss: () => console.log("closed"),
});
```

<ComponentContract
	name="Alert"
	root="alert"
	pure="alertClass"
	factory="onAlert"
/>

## Options

| Option        | Type                                          | Default  | Notes                                  |
| ------------- | --------------------------------------------- | -------- | -------------------------------------- |
| `variant`     | `"info" \| "success" \| "warning" \| "danger"` | `"info"` | Colors and ARIA role.                   |
| `title`       | `string`                                      | —        | Bold title line.                        |
| `message`     | `string`                                      | —        | Body text.                              |
| `dismissible` | `boolean`                                     | `false`  | Adds the accessible close button.       |
| `onDismiss`   | `() => void`                                  | —        | Called after the alert is removed.      |

::: info SSR
The factory needs a DOM. On the server use `alertClass()` and render the
markup yourself — the classes are stable strings.
:::

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { onAlert } from "@katanakit/ui";

const alerts = ref<HTMLElement>();
const dismissible = ref<HTMLElement>();

onMounted(() => {
	alerts.value?.append(
		onAlert({ variant: "info", title: "Heads up", message: "Deploy starts in 10 minutes." }),
		onAlert({ variant: "success", message: "Backup finished." }),
		onAlert({ variant: "warning", message: "Quota at 90%." }),
		onAlert({ variant: "danger", title: "Build failed", message: "Check the logs." }),
	);
	dismissible.value?.append(
		onAlert({
			variant: "info",
			message: "This one can be dismissed.",
			dismissible: true,
		}),
	);
});
</script>
