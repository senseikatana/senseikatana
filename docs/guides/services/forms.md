---
title: Forms
description: Native form validation with Zod — uncontrolled inputs, per-field messages and accessible errors, without react-hook-form.
---

# Forms

Native forms validated with the schema you already write. No form library, no
`useForm`, no resolvers, no controlled inputs: the browser owns the field state
and the schema owns the rules.

```tsx
import { Form, Field, Input, Submit } from "katanakit-js/adapters/react";
import { SignUpSchema } from "./schemas/auth-schema";

export function RegisterForm() {
	return (
		<Form schema={SignUpSchema} onSubmit={(values) => signUp(values)}>
			<Field name="name" label="Name">
				<Input placeholder="Ada Lovelace" autoComplete="name" required />
			</Field>
			<Field name="email" label="Email" hint="Only used for receipts.">
				<Input type="email" autoComplete="email" required />
			</Field>
			<Field name="terms" label="Accept the terms">
				<Checkbox />
			</Field>
			<Submit pendingLabel="Creating account…">Create account</Submit>
		</Form>
	);
}
```

`values` is typed from the schema (`z.infer<typeof SignUpSchema>`); nothing is
controlled, so typing re-renders nothing.

## Why not react-hook-form

| Concern | react-hook-form | This |
| --- | --- | --- |
| Dependencies | `react-hook-form` + `@hookform/resolvers` | none — Zod is already yours |
| Field state | `register()` per field | native `name` + `FormData` |
| Re-renders while typing | subscription per field | zero (uncontrolled) |
| Validation | resolver adapter | `schema.safeParse` at submit, per-field re-check on blur/input |
| Bundle | ~25 KB | the core is a singleton, the adapter is ~6 KB |

What you give up: field-array helpers and dynamic forms. See
[Limits](#limits) at the bottom.

## Install

Nothing to install beyond what you have. The React adapter needs `react` (peer,
already required by `katanakit-js/adapters/react`) and a schema that exposes
`safeParse` — Zod, Valibot or any Standard Schema.

```bash
npm install katanakit-js zod
```

## The core (framework-agnostic)

The validation logic is pure and lives in the toolkit, so the same rules run in
a React app, a vanilla page or an Astro island.

| Helper | Input | Output |
| --- | --- | --- |
| `useParseForm(schema, data)` | `FormData` or plain object | `{ ok, values, errors }` |
| `useFormData(formData)` | `FormData` | plain object (nested by dots) |
| `useFieldErrors(error)` | anything with `issues` | `{ field: message }` |
| `useFieldError(errors, name)` | error map + name | `string \| undefined` |

```ts
import { useParseForm } from "katanakit-js";

const result = useParseForm(SignUpSchema, new FormData(form));
if (result.ok) await signUp(result.values);
else showErrors(result.errors);
```

### How `FormData` becomes values

The browser's rules are the rules:

- repeated names (checkbox groups, `multiple` selects) become **arrays**;
- a lone `"on"` — a checked box without `value` — becomes **`true`**, so
  `z.boolean()` / `z.literal(true)` work;
- unchecked boxes are **absent**: an optional flag is
  `z.boolean().optional().default(false)`;
- dotted names expand into **nested objects** (`name="address.city"` →
  `{ address: { city } }`), matching a nested schema;
- numbers need `z.coerce.number()` — `FormData` carries strings.

```ts
const Schema = z.object({
	name: z.string().min(2),
	age: z.coerce.number().min(18),
	terms: z.literal(true, { message: "Required" }),
	address: z.object({ city: z.string() }),
	tags: z.array(z.string()).optional(),
});
```

## React components

Everything below is a thin wrapper over a native element. No styling is
imposed: pass `className` and style it with your Tailwind, the SCSS framework,
or nothing at all.

| Component | Native element | What it adds |
| --- | --- | --- |
| `<Form schema onSubmit>` | `<form noValidate>` | validation, error map, focus-first-error, pending state |
| `<Field name label hint>` | `<div>` + `<label>` + `<p>` | id wiring, hint, error slot, `aria-describedby` |
| `<Input>` `<Textarea>` `<Select>` `<Checkbox>` | the matching input | inherits `id`, `name`, `aria-*` from `Field` |
| `<Submit pendingLabel>` | `<button type="submit">` | `disabled` + `aria-busy` while submitting |

### Form props

| Prop | Type | Notes |
| --- | --- | --- |
| `schema` | `ValidationSchema<T>` | Zod, Valibot, Standard Schema. |
| `onSubmit` | `(values: T) => void \| Promise<void>` | Receives typed values; may be async. |
| `onInvalid` | `(errors) => void` | Called with the error map on a failed submit. |
| `resetOnSuccess` | `boolean` | Clears the native fields after a successful submit. |
| `formProps` | native `<form>` props | `className`, `id`, `aria-*`, … |

### Custom controls

`useField()` returns the wiring for any element you want to render yourself:

```tsx
function PriceInput() {
	const field = useField();
	return <input {...field?.inputProps} className="my-input" />;
}
```

`useFormPending()` and `useFormErrors()` expose the form state for custom
submits and summaries.

## Validation timing

1. **On submit** — everything is validated; the first invalid field is focused.
2. **On blur** — after the first failed submit, each field re-checks as the
   user leaves it.
3. **On input** — a field that already has a message clears it as soon as it
   passes.

Errors render inside their `Field` with `role="status"`, so a screen reader
announces them politely while `aria-invalid` and `aria-describedby` mark the
control — the standard accessible error pattern.

## Vanilla

The core does not need React: collect the form once and render messages where
they belong.

```ts
import { useParseForm } from "katanakit-js";

const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const result = useParseForm(SignUpSchema, new FormData(form));
	for (const [name, message] of Object.entries(result.errors)) {
		const slot = form.querySelector(`[data-error="${name}"]`);
		if (slot) slot.textContent = message;
	}
	if (result.ok) await signUp(result.values);
});
```

## Limits

- **Field arrays** (add/remove rows) are not built in: repeat names (`name="items"`)
  collect into an array, but a dynamic editor is a `useState` + `map` on your side.
- **File inputs**: files arrive as `File` objects and validate fine, but the
  upload itself is your transport's job — the form only collects them.
- **`noValidate`** is always set: the schema decides the messages. Keep `type`,
  `required` and `autocomplete` on inputs anyway — they drive keyboards,
  autofill and zoom behaviour.
