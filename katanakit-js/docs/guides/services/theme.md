---
title: Theme
description: "SSR-safe dark and light mode: persistence, system preference, data-theme sync and every use* theme helper explained."
---

# Theme

`theme.service.ts` is a **function module**: standalone `use*` helpers backed by
module-level state, with no instance to create. Two design rules apply to every
function on this page:

1. **SSR-safe by default** — outside the browser (`typeof window === "undefined"`),
   `useInitTheme()`, `useSetThemeMode()` and `useResetTheme()` are no-ops, the
   getters return safe defaults (`"system"`, `"light"`, `false`) and
   `useDestroyTheme()` only clears an existing listener, so it is safe anywhere.
2. **One mode, one target** — the module keeps a single active mode and a single
   target element (the `<html>` root by default). `useInitTheme()` wires them
   together; every mutation then updates the target's `data-theme` attribute and
   toggles the `light` / `dark` classes.

The default storage key is `"theme"` and the default attribute is `data-theme`,
matching the CSS framework's dark-mode contract. The value persisted in
`localStorage` is the mode itself (`"light"`, `"dark"` or `"system"`), so the
preference survives reloads and can be read by an inline script before the
bundle loads — see [Preventing a flash of the wrong theme](#preventing-a-flash-of-the-wrong-theme).

## Quick example

```ts
import {
  useInitTheme, useGetThemeMode, useGetResolved, useToggleTheme,
} from "katanakit-js";

useInitTheme({
  defaultMode: "system",
  onChange: (mode, resolved) => console.log(mode, resolved),
});

console.log(useGetThemeMode()); // "system" | "light" | "dark"
console.log(useGetResolved());  // "light" | "dark" — system preference applied

document.querySelector("#theme-toggle")?.addEventListener("click", useToggleTheme);
```

## Initialization

### useInitTheme(options?)

Initializes the theme system and is the only function that reads persisted
state. It resolves the starting mode with this precedence:

1. A valid mode stored under `storageKey` (`"light"`, `"dark"` or `"system"`).
2. `options.defaultMode`, when it is a valid `ThemeMode`.
3. `"system"` as the final fallback.

It then applies the theme to the target and registers a
`prefers-color-scheme` media listener that re-applies the theme whenever the OS
scheme changes **while the mode is `"system"`**. Calling it again reconfigures
the module and cleans up the previous listener first, so you never stack
duplicate listeners.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultMode` | `ThemeMode` | `"system"` | Mode used when nothing valid is stored. Invalid runtime values fall back to `"system"`. |
| `storageKey` | `string` | `"theme"` | `localStorage` key read at init and written by `useSetThemeMode()`. |
| `attribute` | `string` | `"data-theme"` | Attribute set on the target with the resolved scheme. |
| `target` | `HTMLElement` | `document.documentElement` | Element that receives the attribute and classes. |
| `onChange` | `(mode, resolved) => void` | `undefined` | Called after every apply, including the initial one. |

Returns `void`. On the server the whole function is a no-op, so a shared layout
can call it unconditionally. If `target` cannot be resolved, the mode and
listener are still configured, but nothing is written to the DOM.

```ts
import { useInitTheme } from "katanakit-js";

useInitTheme({
  defaultMode: "dark",
  storageKey: "app-theme",
  attribute: "data-theme",
  onChange: (mode, resolved) => {
    document.cookie = `theme=${resolved}; path=/; max-age=31536000`;
  },
});
```

**Real use case** — application bootstrap: call it once from the client entry
point. In component frameworks the browser-only lifecycle hook guarantees the
guard is never even needed, and `onChange` becomes the single place that syncs
external chrome (cookies, meta tags, analytics):

```ts
// Vue
onMounted(() => useInitTheme({ defaultMode: "system" }));

// React
useEffect(() => {
  useInitTheme({ defaultMode: "system" });
}, []);
```

Because `target` is configurable, the same module can theme a scoped subtree —
for example a live preview card — instead of the whole document:

```ts
useInitTheme({
  target: document.querySelector<HTMLElement>("#theme-preview")!,
});
```

## Reading the current theme

### useGetThemeMode()

Returns the raw `ThemeMode` currently selected: `"light"`, `"dark"` or
`"system"`. This is a pure module-state read — it never touches the DOM, never
throws and works on the server, where it reports `"system"` because mutations
are no-ops. Use it to distinguish the **user's choice** from the scheme that is
actually rendered.

```ts
import { useGetThemeMode } from "katanakit-js";

const mode = useGetThemeMode(); // "light" | "dark" | "system"
const followsSystem = mode === "system";
```

**Real use case** — a settings screen with three options. The radio group reads
the stored choice once, and the "Use system setting" row explains what happens
when it is selected:

```ts
if (useGetThemeMode() === "system") {
  showHint("Colors follow your operating system preference.");
}
```

### useGetResolved()

Returns the concrete scheme that should be painted: `"light"` or `"dark"`. When
the mode is explicit it returns it untouched; when the mode is `"system"` it
queries the OS preference through `usePrefersColorScheme()`. On the server the
fallback is `"light"`, since `matchMedia` does not exist.

```ts
import { useGetResolved } from "katanakit-js";

const scheme = useGetResolved(); // "light" | "dark"
```

**Real use case** — keeping browser chrome in sync: the resolved value drives
the `theme-color` meta tag and any canvas or chart palette, while the raw mode
stays `"system"` for the settings UI:

```ts
import { useGetResolved, useSetAttribute } from "katanakit-js";

function syncBrowserChrome() {
  const scheme = useGetResolved();
  const color = scheme === "dark" ? "#0a0a0a" : "#ffffff";
  useSetAttribute('meta[name="theme-color"]', "content", color);
}
```

### usePrefersColorScheme()

One-shot check of `window.matchMedia("(prefers-color-scheme: dark)").matches`.
It returns `false` on the server or in browsers without `matchMedia`, and it is
**not reactive** — it reports the preference at call time. Reactive consumers
should rely on `useInitTheme()` plus its `onChange` callback instead of polling
this function.

```ts
import { usePrefersColorScheme } from "katanakit-js";

const prefersDark = usePrefersColorScheme();
```

**Real use case** — third-party widgets that have their own theme option (code
editors, chart libraries). Seed them from the OS preference when the app mode is
`"system"`, and re-seed them from `onChange` whenever the user changes mode:

```ts
const editorTheme = usePrefersColorScheme() ? "vs-dark" : "light";
monaco.editor.create(container, { theme: editorTheme });
```

The viewport service exposes the same media query as `usePrefersDarkMode()`; use
whichever module matches the rest of your imports.

## Changing the theme

### useSetThemeMode(newMode)

Sets `newMode`, persists it to `localStorage` under the active `storageKey` and
applies it to the target. Values that fail the runtime `ThemeMode` check are
coerced to `"system"`, which makes the function safe for data coming from
`dataset`, URL parameters or storage.

Returns `void` and is a no-op on the server. Two ordering caveats matter:

- If you call it **before** `useInitTheme()`, the mode and storage entry are
  updated, but `target` is still `null`, so the DOM is not touched until
  initialization runs.
- A custom `storageKey` only applies after `useInitTheme({ storageKey })` has
  been called, because the module-level key is set there.

```ts
import { useSetThemeMode, type ThemeMode } from "katanakit-js";

useSetThemeMode("dark");
useSetThemeMode("system"); // follow the OS again
```

**Real use case** — a segmented control rendered from a three-value list. The
value read from the DOM is cast once at the boundary, and the runtime guard
inside the service covers any unexpected string:

```ts
document.querySelectorAll<HTMLButtonElement>("[data-theme-option]").forEach((button) => {
  button.addEventListener("click", () => {
    useSetThemeMode(button.dataset.themeOption as ThemeMode);
  });
});
```

### useToggleTheme()

Flips the **resolved** scheme and persists the result as an explicit mode. It
first computes `useGetResolved()`, then calls `useSetThemeMode()` with the
opposite value, so `"light" → "dark"` and `"dark" → "light"`. Toggling from
`"system"` intentionally leaves system mode behind: the user asked for one
specific scheme.

```ts
import { useToggleTheme } from "katanakit-js";

useToggleTheme(); // light -> dark, dark -> light
```

On the server the call is harmless: the resolved fallback is `"light"`, but
`useSetThemeMode()` no-ops, so module state is not mutated.

**Real use case** — the classic single-button switch. Pair it with `onChange` to
keep the accessible label and state in sync without duplicating logic:

```ts
import { useInitTheme, useToggleTheme } from "katanakit-js";

const button = document.querySelector<HTMLButtonElement>("#theme-toggle")!;

useInitTheme({
  onChange: (_mode, resolved) => {
    const dark = resolved === "dark";
    button.setAttribute("aria-pressed", String(dark));
    button.textContent = dark ? "Switch to light" : "Switch to dark";
  },
});

button.addEventListener("click", useToggleTheme);
```

### useResetTheme()

Removes the stored preference and returns the module to `"system"`, then
re-applies the theme. Because the media listener registered at init is still
alive, the UI immediately follows the OS scheme again. It also works before
initialization (it removes the key under the current `storageKey` and sets the
mode to `"system"`), but without a target nothing is painted. On the server it
is a no-op.

```ts
import { useResetTheme } from "katanakit-js";

useResetTheme();
```

**Real use case** — a "Restore defaults" action in preferences. After the call,
`useGetThemeMode()` reports `"system"`, which is the state the settings UI should
render:

```ts
import { useGetThemeMode, useResetTheme } from "katanakit-js";

resetButton.addEventListener("click", () => {
  useResetTheme();
  console.log(useGetThemeMode()); // "system"
});
```

## The DOM contract

Every apply performs the same three steps in order, always with the resolved
scheme — the raw mode is never written to the DOM:

1. Sets the configured attribute on the target: `data-theme="light"` or
   `data-theme="dark"`.
2. Removes both `light` and `dark` classes from the target, then adds the
   resolved one.
3. Invokes `onChange(mode, resolved)`.

```html
<html data-theme="dark" class="dark">
  <!-- Theme active -->
</html>
```

| Concept | Value |
| --- | --- |
| Attribute | `data-theme` (rename with `attribute`) |
| Attribute values | `"light"`, `"dark"` — never `"system"` |
| Classes | `light`, `dark` (fixed names) |
| Default target | `document.documentElement` |
| Storage backend | `localStorage` (via `useSetStorage`) |

The CSS side of the contract is documented in
[Dark Mode](/ui-kit/css/core/dark-mode): the `theme("dark")` mixin emits
`:root[data-theme="dark"]` rules, which is why the attribute is the primary
selector and the classes are a convenience.

## Teardown

### useDestroyTheme()

Unsubscribes the `prefers-color-scheme` media listener and clears its
references. It has **no browser guard** because it only cleans up what exists,
so it is safe to call on the server, in test teardown or from a hot-module
replacement dispose hook.

What it does **not** do: it does not reset the mode, remove the stored
preference, clear `target`, `attribute`, `storageKey` or `onChange`. After
destroying, `useSetThemeMode()`, `useToggleTheme()` and `useResetTheme()` keep
working, but OS preference changes no longer trigger an automatic re-apply until
`useInitTheme()` is called again.

```ts
import { useDestroyTheme, useInitTheme } from "katanakit-js";

useInitTheme({ defaultMode: "dark" });

// Later — during teardown
useDestroyTheme();
```

**Real use case** — test isolation: each test initializes the theme, and
`afterEach` releases the listener so suites cannot leak state into each other.
The same call fits HMR:

```ts
// Vitest
afterEach(() => useDestroyTheme());

// Vite
import.meta.hot?.dispose(() => useDestroyTheme());
```

## Preventing a flash of the wrong theme

`useInitTheme()` runs when your bundle executes, which is after the first paint
in a client-rendered app. To avoid a flash of the wrong scheme, inline a small
blocking script in `<head>` that reads the same `storageKey` and mirrors the
resolution logic. The storage service writes plain strings, so
`localStorage.getItem("theme")` returns `"light"`, `"dark"` or `"system"`
directly:

```html
<script>
  (function () {
    try {
      var mode = localStorage.getItem("theme");
      if (mode !== "light" && mode !== "dark") mode = "system";
      var dark =
        mode === "dark" ||
        (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var root = document.documentElement;
      root.setAttribute("data-theme", dark ? "dark" : "light");
      root.classList.remove("light", "dark");
      root.classList.add(dark ? "dark" : "light");
    } catch (error) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  })();
</script>
```

Keep the script in sync with your `init` options: if you change `storageKey` or
`attribute`, mirror the new names here. It is intentionally a few lines of plain
JavaScript — it must run before stylesheets resolve and before any framework
hydration.

## Putting it together: a three-state switcher

This select combines initialization, persistence and mutation. `useInitTheme()`
fires `onChange` immediately after reading storage, so the control always starts
on the saved value without an extra getter call:

```ts
import { useInitTheme, useSetThemeMode, type ThemeMode } from "katanakit-js";

const select = document.querySelector<HTMLSelectElement>("#theme-select")!;

useInitTheme({
  storageKey: "app-theme",
  onChange: (mode) => {
    select.value = mode;
  },
});

select.addEventListener("change", () => {
  useSetThemeMode(select.value as ThemeMode);
});
```

Each mutation persists to `localStorage`, updates `<html>` (`data-theme` plus
the `light` / `dark` classes) and notifies every `onChange` consumer — one code
path for buttons, selects, cookies and third-party widgets.

## Related

- [DOM](/guides/services/dom) — `useGetRoot()`, `useSetAttribute()` and the class helpers the theme module builds on.
- [Storage](/guides/services/storage) — the localStorage persistence mechanics behind `storageKey`.
- [Viewport](/guides/services/viewport) — one-shot media queries, including `usePrefersDarkMode()`.
- [Dark Mode (CSS)](/ui-kit/css/core/dark-mode) — the `theme("dark")` mixin that styles `[data-theme="dark"]`.
- [API Reference](/api/functions/useInitTheme) — every export, generated from source.
