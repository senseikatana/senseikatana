# @katanakit/ui

Katana UI foundations — framework-agnostic components styled with
the KatanaKit SCSS framework vendored in `katanakit-js` (`scss/`).

> **Status:** experimental workspace package (`private`). Not published yet.

## Components

| Factory            | Class helper        | What it renders                                   |
| ------------------ | ------------------- | ------------------------------------------------- |
| `useButton`        | `useButtonClass`    | Button with variants (`primary`/`secondary`/`ghost`/`danger`), sizes and loading state. |
| `useInput`         | `useInputClass`     | Accessible text field (label + input + help/error, `aria-invalid`/`aria-describedby`). |
| `useCard`          | `useCardClass`      | Card with optional header, body and footer.       |
| `useBadge`         | `useBadgeClass`     | Status pill with five semantic variants.          |
| `useAlert`         | `useAlertClass`     | Alert with variants, optional title/message and accessible dismissal. |

The `*Class` helpers are pure strings for SSR or framework templates; the
factories create DOM elements and throw outside a DOM environment.

## Styles

`@katanakit/ui/styles.css` is self-contained: it emits the full vendored
framework (reset, tokens, utilities), the dark theme tokens
(`:root[data-theme="dark"]`) and the `.*` component classes.

```ts
import "@katanakit/ui/styles.css";
import { useButton, useInput, useCard, useBadge, useAlert } from "@katanakit/ui";

document.body.append(
	useButton({ label: "Save", onClick: () => save() }),
	useInput({ label: "Email", type: "email" }).root,
	useCard({ title: "Revenue", children: ["$12,400"] }),
	useBadge({ label: "Paid", variant: "success" }),
	useAlert({ variant: "warning", message: "Quota at 90%.", dismissible: true }),
);
```

Dark mode follows the KatanaKit contract: set `data-theme="dark"` on the
root element (the `ThemeService` in `katanakit-js` owns that attribute).

## Build

```bash
bun run build:ui   # from the repo root: tsc + sass -> packages/ui/dist
```
