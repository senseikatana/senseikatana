---
title: DOM
description: "SSR-safe DOM queries, element creation, attributes, classes and events — every helper explained."
---

# DOM

`dom.service.ts` is a **function module**: standalone `use*` helpers with no
instance to create. Two design rules apply to every function on this page:

1. **SSR-safe by default** — outside a browser (`typeof document === "undefined"`)
   queries return `null` / `[]`, boolean helpers return `false`, and setters are
   no-ops. The only exception is `useCreateElement()`, which throws because a
   detached element has no server meaning.
2. **Selectors or elements** — every helper that targets an element accepts
   either a CSS selector string (`"#submit"`, `".card"`) or an
   `Element` reference. Pass references when you already have them; pass
   selectors for terse event-delegation code paths.

The setters are also hardened: `useSetAttribute()` blocks `on*` handlers,
`javascript:`/`vbscript:` URLs and unsafe `data:` URIs, while `useSetText()` is
the safe way to render user content. See [Attributes](#attributes--data) and
[Content](#content) for details.

## Quick example

```ts
import {
  useQuerySelector, useQuerySelectorAll, useOn, useToggleClass,
  useSetText, useGetRoot,
} from "katanakit-js";

const root = useGetRoot();
const button = useQuerySelector<HTMLButtonElement>("#menu-toggle");
const items = useQuerySelectorAll<HTMLLIElement>("nav .item");

// Toggle a class on <html> and update an accessible label
const off = useOn(button, "click", () => {
  const open = useToggleClass(root!, "menu-open");
  button?.setAttribute("aria-expanded", String(open ?? false));
});

items.forEach((item) => useSetText(item, item.textContent?.toUpperCase() ?? ""));

// Cleanup when the component unmounts
off?.();
```

## Browser & root references

### useIsBrowser()

Returns `true` only when both `window` and `document` exist. Use it to gate
code that cannot be expressed through the other helpers — for example, deciding
whether to attach a third-party library that touches `window`.

```ts
import { useIsBrowser } from "katanakit-js";

if (useIsBrowser()) {
  const { default: confetti } = await import("canvas-confetti");
  confetti({ particleCount: 80, spread: 60 });
}
```

**Real use case** — progressive enhancement: a marketing page can ship a
canvas animation that only loads in the browser, while the same module stays
importable from a server component that pre-renders the static fallback.

### useGetRoot()

Returns `document.documentElement` (the `<html>` element) or `null` on the
server. This is the canonical hook for theme classes, `lang` attributes and
anything that must be set at the document level.

```ts
import { useGetRoot, useAddClass, useRemoveClass } from "katanakit-js";

const root = useGetRoot();

export function setDarkMode(enabled: boolean) {
  if (!root) return;
  useToggleClass(root, "dark", enabled);
}
```

### useGetBody()

Returns `document.body` cast as `HTMLBodyElement`, or `null` on the server.
Use it for scroll locking, page-level classes and global overlays.

```ts
import { useGetBody, useAddClass, useRemoveClass } from "katanakit-js";

const body = useGetBody();

export function lockScroll(locked: boolean) {
  if (!body) return;
  if (locked) useAddClass(body, "overflow-hidden");
  else useRemoveClass(body, "overflow-hidden");
}
```

**Real use case** — a modal component locks body scroll while open; because
`useGetBody()` returns `null` during SSR, the same component renders on the
server without branching on `typeof window`.

## Querying elements

### useQuerySelector(selector)

Typed wrapper around `document.querySelector`. The overloads infer the element
type from the tag name (`useQuerySelector("input")` → `HTMLInputElement | null`)
or from an explicit type argument for selectors.

```ts
import { useQuerySelector } from "katanakit-js";

const form = useQuerySelector("form.checkout");                 // HTMLFormElement | null
const email = useQuerySelector<HTMLInputElement>("#email");     // HTMLInputElement | null
const firstRow = useQuerySelector<HTMLTableRowElement>("tbody tr");
```

Returns `null` when the element does not exist **or** when called outside the
browser, so always guard with `?.` or an early return.

**Real use case** — form validation: grab the field once per submit and reuse
the reference for `setCustomValidity()`:

```ts
const email = useQuerySelector<HTMLInputElement>("#email");

function validateEmail() {
  if (!email) return true;
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value);
  email.setCustomValidity(valid ? "" : "Enter a valid email");
  return valid;
}
```

### useQuerySelectorAll(selector)

Typed `querySelectorAll` that returns a **real array** (`Element[]`, never a
`NodeList`), so `.map()`, `.filter()` and `for...of` work without
`Array.from()`. Returns `[]` outside the browser.

```ts
import { useQuerySelectorAll } from "katanakit-js";

const rows = useQuerySelectorAll<HTMLTableRowElement>("tbody tr");
const emails = rows.map((row) => row.dataset.email).filter(Boolean);
```

**Real use case** — bulk row selection in a data table: toggle a checkbox in
every row, then read the selection in one pass.

```ts
const checkboxes = useQuerySelectorAll<HTMLInputElement>("tbody input[type=checkbox]");

export function selectAll(checked: boolean) {
  checkboxes.forEach((box) => (box.checked = checked));
}
```

### useGetElementById(id)

Shortcut for `document.getElementById`, with an optional type parameter.
Unlike `useQuerySelector`, the id is passed **without** `#`.

```ts
import { useGetElementById } from "katanakit-js";

const dialog = useGetElementById<HTMLDialogElement>("confirm-dialog");
```

**Real use case** — imperative UI (dialogs, popovers, video players): keep a
stable id in the markup and grab the element when the action runs, avoiding
global state just to hold a reference.

### useGetElementByClass(className)

Finds the **first** element with a class, accepting `"card"` or `".card"` —
handy when class names arrive from configuration or CMS data.

```ts
import { useGetElementByClass } from "katanakit-js";

const hero = useGetElementByClass("hero");     // `.hero` added internally
const card = useGetElementByClass<HTMLElement>(".card");
```

## Classes

### useAddClass(target, className)

Adds a class to the resolved element; silent no-op when the element or the DOM
is missing. Idempotent: adding twice does nothing.

```ts
import { useAddClass } from "katanakit-js";

useAddClass("#header", "sticky");
useAddClass(myElement, "visible");
```

### useRemoveClass(target, className)

Removes one class or an **array of classes** in a single call — useful when
cleanup depends on several mutually exclusive states.

```ts
import { useRemoveClass } from "katanakit-js";

useRemoveClass("#header", "sticky");
useRemoveClass(myElement, ["visible", "active", "loading"]);
```

### useToggleClass(target, className, force?)

Toggles a class and returns whether it is now present (`boolean | undefined`).
Pass `force` to make the operation deterministic — `force: true` adds, `false`
removes — which avoids read-then-write races in event handlers.

```ts
import { useToggleClass } from "katanakit-js";

const isOpen = useToggleClass(".sidebar", "open");
useToggleClass(".sidebar", "hidden", false);  // guaranteed closed
```

**Real use case** — accordions and drawers: keep the source of truth in the DOM
class and mirror it to `aria-expanded`, so CSS and accessibility never drift:

```ts
const trigger = "#faq-1-trigger";
const panel = "#faq-1-panel";

useOn(trigger, "click", () => {
  const open = useToggleClass(panel, "is-open") ?? false;
  useSetAttribute(trigger, "aria-expanded", String(open));
});
```

### useHasClass(target, className)

Returns `false` (never throws) when the element is missing — safe to call in
render paths and SSR.

```ts
import { useHasClass } from "katanakit-js";

if (useHasClass(".btn-submit", "disabled")) {
  showTooltip("Complete the form first");
}
```

## Attributes & data

### useGetAttribute(target, attr)

Returns the attribute value or `null` when the attribute or element is absent.

```ts
import { useGetAttribute } from "katanakit-js";

const href = useGetAttribute("a.cta", "href");
const alt = useGetAttribute<HTMLImageElement>("img.cover", "alt");
```

### useSetAttribute(target, attr, value)

Sets an attribute with **XSS protection**. The function throws when:

- the attribute is an event handler (`onclick`, `onerror`, …) — use
  [`useOn()`](#useontarget-event-callback-options) instead;
- the value of a URL-like attribute (`href`, `src`, `action`, `formaction`,
  `xlink:href`) uses a `javascript:` or `vbscript:` scheme;
- a `data:` URI is not a raster image (`png`, `jpg`, `gif`, `webp`);
- the attribute is `srcdoc` — sanitize HTML with a dedicated library instead.

Control characters are stripped before the scheme check, so obfuscations like
`java\nscript:` are rejected too.

```ts
import { useSetAttribute } from "katanakit-js";

useSetAttribute("img.hero", "src", "/photo.jpg");
useSetAttribute("a.link", "href", "https://example.com");
useSetAttribute("button.next", "aria-disabled", "true");

// Throws — use useOn() for events
// useSetAttribute("button", "onclick", "doSomething()");
```

**Real use case** — link previews built from API data: you can safely write
`href` and `src` from fetched content, because protocol-relative attacks and
script URLs are rejected at the boundary:

```ts
const { data } = await useGet<Card>("cms", "cardById", { params: { id } });

if (data) {
  useSetAttribute("#card-link", "href", data.url);
  useSetAttribute("#card-image", "src", data.image);
}
```

### useRemoveAttribute(target, attr)

Removes an attribute; no-op when the element is missing. Common for enabling
controls (`disabled`), clearing validation hints, or resetting ARIA state.

```ts
import { useRemoveAttribute } from "katanakit-js";

useRemoveAttribute("#submit", "disabled");
```

### useGetDataAttribute(target, key)

Reads `data-*` values through `dataset`, so the key is camelCase
(`data-user-id` → `"userId"`). Returns `undefined` when absent.

```ts
import { useGetDataAttribute } from "katanakit-js";

const userId = useGetDataAttribute("tr.row", "userId");
```

### useSetDataAttribute(target, key, value)

Writes `data-*` values through `dataset`; the DOM reflects the kebab-case
attribute (`key: "userId"` → `data-user-id`).

```ts
import { useSetDataAttribute } from "katanakit-js";

useSetDataAttribute("tr.row", "status", "active");
```

**Real use case** — list-to-detail navigation without a router state library:
stamp each row with the entity id at render time and read it in the click
handler.

```ts
useQuerySelectorAll<HTMLTableRowElement>("tbody tr").forEach((row) => {
  useSetDataAttribute(row, "recordId", row.id);
  useOn(row, "dblclick", () => openRecord(useGetDataAttribute(row, "recordId")));
});
```

## Events

### useOn(target, event, callback, options?)

Attaches a listener and returns an **unsubscribe function** (`() => void`), or
`null` outside the browser or when the selector matches nothing. `target` can
be any `EventTarget` (element, `window`, `document`, a `WebSocket`, …) or a CSS
selector. The callback is typed from `HTMLElementEventMap`, and `options` is
forwarded to `addEventListener` (`capture`, `once`, `passive`, …).

```ts
import { useOn } from "katanakit-js";

const offScroll = useOn(window, "scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

const offClick = useOn("#cta", "click", (event) => {
  event.preventDefault();
  track("cta-click");
});

// Later — during teardown
offScroll?.();
offClick?.();
```

**Real use case** — a sticky header that reacts to scroll: the listener is
`passive` (no scroll jank), and the unsubscribe function makes cleanup
explicit. In component frameworks this pairs directly with lifecycle hooks:

```ts
// Vue
onMounted(() => { off = useOn(window, "resize", onResize); });
onBeforeUnmount(() => off?.());

// React
useEffect(() => useOn(window, "resize", onResize) ?? undefined, []);
```

## Content

### useCreateElement(tagName, options?)

Creates a detached element with typed tag inference. **Throws outside the
browser** — this is the one helper that cannot degrade to a no-op, because the
return value is always used. The optional `options` argument is the standard
`ElementCreationOptions` (customized built-ins).

```ts
import { useCreateElement, useSetText, useAppend } from "katanakit-js";

const badge = useCreateElement("span");
useSetText(badge, "New");
useAddClass(badge, "badge");

useAppend("#product-name", badge);
```

### useSetText(target, text)

Sets `textContent`. **This is the safe sink for user-generated content** — no
HTML parsing happens, so `<script>` in the string is displayed literally.

```ts
import { useSetText } from "katanakit-js";

useSetText("#greeting", `Hello, ${user.name}!`);
```

**Real use case** — comments, chat messages and profile names: any value that
originated from another user must go through `useSetText`, never
`useSetHtml`.

### useSetHtml(target, html)

Sets `innerHTML`. Powerful and equally dangerous: it is an **HTML injection
sink**. Only pass trusted static markup; sanitize everything else with a
dedicated library (for example DOMPurify) before calling.

```ts
import { useSetHtml } from "katanakit-js";

// Safe — developer-authored markup
useSetHtml("#banner", "<strong>Black Friday</strong> — 40% off");

// Never do this with user input
// useSetHtml("#comment", comment.body);
```

### useAppend(target, child)

Appends a child (element or selector) to a parent (element or selector).
Missing parents or children are ignored, so it is safe for optional UI.

```ts
import { useCreateElement, useSetText, useAppend, useAddClass } from "katanakit-js";

function addTodo(text: string) {
  const item = useCreateElement("li");
  useSetText(item, text);
  useAddClass(item, "todo-item");
  useAppend("#todo-list", item);
}
```

**Real use case** — an optimistic "pending" row while a mutation resolves:
append the row immediately, then replace its contents or remove it when the
server confirms — no virtual DOM required.

### useRemove(target)

Removes the element from the DOM. No-op when missing.

```ts
import { useRemove } from "katanakit-js";

useRemove(".toast--dismissed");
```

## Modals

### useModalClose(modalSelector, useRemoveDOM?)

Closes a modal in one call, with two strategies:

- `useRemoveDOM = false` (default) toggles the `hidden` class, keeping the
  element in the DOM — the right choice when the modal may reopen and you want
  to preserve its state.
- `useRemoveDOM = true` removes the node entirely — useful for one-shot
  interstitials and modals created per session.

```ts
import { useModalClose, useOn, useQuerySelector } from "katanakit-js";

// Close button inside the dialog
useOn("#modal .close", "click", () => useModalClose("#modal"));

// Click on the backdrop — but not on the panel itself
useOn("#modal", "click", (event) => {
  if (event.target === useQuerySelector("#modal")) useModalClose("#modal", true);
});
```

**Real use case** — a promo modal that should never come back during the
session: remove it from the DOM when dismissed, and the backdrop click handler
above will not find it again.

## Putting it together: a dismissible banner

```ts
import {
  useQuerySelector, useAddClass, useRemove, useOn, useGetStorage, useSetStorage,
} from "katanakit-js";

const DISMISS_KEY = "promo:dismissed";
const banner = useQuerySelector("#promo-banner");

if (banner && !useGetStorage<boolean>(DISMISS_KEY)) {
  useAddClass(banner, "is-visible");
}

useOn("#promo-close", "click", () => {
  useRemove("#promo-banner");
  useSetStorage(DISMISS_KEY, true);
});
```

The banner composes three services (`DOM` here, `Storage` for persistence and
`useOn` for wiring) and still renders safely on the server, because every call
degrades or no-ops without a `document`.

## Related

- [Watch](/guides/watch) — reactive `MutationObserver` wrapper for DOM changes.
- [Storage](/guides/services/storage) — persist UI state like dismissed banners.
- [Theme](/guides/services/theme) — the themed cousin of `useGetRoot()`.
- [API Reference](/api/variables/useQuerySelector) — every export, generated from source.
