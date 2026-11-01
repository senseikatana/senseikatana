---
title: Alert
description: Inline alert with semantic variants, title/message and accessible dismissal.
---

# Alert

`useAlert(options)` creates a `.alert` with `role="alert"` for
`warning`/`danger` and `role="status"` for `info`/`success`. Dismissible alerts get
a button with `aria-label="Dismiss"`. `alertClass(options)` returns the classes
for SSR markup.

## Variants

<div ref="alerts" class="demo-stack"></div>

```ts
import { useAlert } from "@katanakit/ui";

stack.append(
  useAlert({ variant: "info", title: "Heads up", message: "Deploy starts in 10 minutes." }),
  useAlert({ variant: "success", message: "Backup finished." }),
  useAlert({ variant: "warning", message: "Quota at 90%." }),
  useAlert({ variant: "danger", title: "Build failed", message: "Check the logs." }),
);
```

## Dismissible

<div ref="dismissible" class="demo-stack"></div>

```ts
useAlert({
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
	factory="useAlert"
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

import { useAlert } from "@katanakit/ui";

const alerts = ref<HTMLElement>();
const dismissible = ref<HTMLElement>();

onMounted(() => {
	alerts.value?.append(
		useAlert({ variant: "info", title: "Heads up", message: "Deploy starts in 10 minutes." }),
		useAlert({ variant: "success", message: "Backup finished." }),
		useAlert({ variant: "warning", message: "Quota at 90%." }),
		useAlert({ variant: "danger", title: "Build failed", message: "Check the logs." }),
	);
	dismissible.value?.append(
		useAlert({
			variant: "info",
			message: "This one can be dismissed.",
			dismissible: true,
		}),
	);
});
</script>
