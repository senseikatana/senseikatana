---
title: Input
description: Accessible text field with label, help/error wiring and invalid state.
---

# Input

`onInput(options)` returns `{ root, input }`: a `.field` wrapper with the label
and message already wired through `for`, `aria-invalid` and `aria-describedby`.
`inputClass(options)` returns the control classes for SSR markup.

## Basic field

<div ref="basic" class="demo-stack"></div>

```ts
import { onInput } from "@katanakit/ui";

const { root } = onInput({
  label: "Email",
  type: "email",
  name: "email",
  placeholder: "you@example.com",
  help: "We only use it for receipts.",
});

form.append(root);
```

## Error state

<div ref="errors" class="demo-stack"></div>

```ts
onInput({ label: "Email", type: "email", error: "Enter a valid email." });
```

<ComponentContract
	name="Input"
	root="field"
	pure="inputClass"
	factory="onInput"
/>

## Options

| Option        | Type                                                       | Default  | Notes                                        |
| ------------- | ---------------------------------------------------------- | -------- | -------------------------------------------- |
| `label`       | `string`                                                   | —        | Rendered as `<label for>`.                    |
| `name`        | `string`                                                   | —        | `name` attribute; derives the input id.       |
| `type`        | `"text" \| "email" \| "password" \| "search" \| "tel" \| "url"` | `"text"` | Native input type.                            |
| `value`       | `string`                                                   | —        | Initial value.                                |
| `placeholder` | `string`                                                   | —        | Placeholder text.                             |
| `help`        | `string`                                                   | —        | Helper text (`aria-describedby`).             |
| `error`       | `string`                                                   | —        | Error message; adds `aria-invalid` + styling. |
| `required`    | `boolean`                                                  | `false`  | Native `required` + visual marker.            |
| `disabled`    | `boolean`                                                  | `false`  | Native disabled state.                        |
| `onInput`     | `(value: string) => void`                                  | —        | Fired on every `input` event.                 |

::: tip Validation
Pair the field with `onValidate()` from `katanakit-js`: run the Safe Result
and pass `error.issues[0].message` to `onInput` — or rebuild the field when
the state changes.
:::

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { onInput } from "@katanakit/ui";

const basic = ref<HTMLElement>();
const errors = ref<HTMLElement>();

onMounted(() => {
	basic.value?.append(
		onInput({
			label: "Email",
			type: "email",
			name: "email",
			placeholder: "you@example.com",
			help: "We only use it for receipts.",
		}).root,
		onInput({ label: "Password", type: "password", name: "password", value: "secret" }).root,
	);
	errors.value?.append(
		onInput({
			label: "Email",
			type: "email",
			name: "email-error",
			value: "not-an-email",
			error: "Enter a valid email.",
		}).root,
	);
});
</script>
