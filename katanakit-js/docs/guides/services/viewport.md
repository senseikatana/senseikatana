---
title: Viewport
description: "SSR-safe viewport size, media queries, scroll position and actions, focus, fullscreen, visibility and document title — every helper explained."
---

# Viewport

`viewport.service.ts` is a **function module**: standalone `use*` helpers with no
instance to create. It covers everything tied to the browser viewport and the
document itself: dimensions, media queries, scroll reads and actions, focus,
fullscreen, visibility and the document title.

Three design rules apply to every function on this page:

1. **SSR-safe by default** — outside a browser (`typeof window === "undefined"`
   or `typeof document === "undefined"`) reads return a neutral value
   (`0`, `false`, `""`, `null` or `{0, 0}`) and actions are no-ops. The only
   exception is [`useRequestFullscreen()`](#userequestfullscreen-target), which
   throws because a server cannot enter fullscreen.
2. **One-shot, not reactive** — every read snapshots the current state when it
   is called. Nothing subscribes to `resize`, `scroll` or media-query changes
   for you. Register a listener with
   [`useOn()`](/guides/services/dom#useontarget-event-callback-options) and
   `{ passive: true }` when you need live values.
3. **Cleanup is explicit** — the only helper that registers a listener,
   [`useOnVisibilityChange()`](#useonvisibilitychange-callback), returns an
   unsubscribe function. Keep the reference and call it during teardown.

**SSR fallbacks at a glance:**

| Helpers | Outside the browser |
| --- | --- |
| `useGetViewportSize()` | `{ width: 0, height: 0 }` |
| `useMatchesMedia()`, `usePrefersReducedMotion()`, `usePrefersDarkMode()` | `false` |
| `useGetScrollY()`, `useGetScrollX()`, `useGetScrollProgress()` | `0` |
| `useGetScrollPosition()` | `{ x: 0, y: 0 }` |
| `useIsAtTop()` | `true` — the scroll position is `0`, which counts as "at top" |
| `useIsAtBottom()` | `false` |
| `useScrollTo()`, `useScrollToTop()`, `useScrollToBottom()` | no-op |
| `useScrollToElement()` | `false` |
| `useFocusElement()` | `false` |
| `useBlurActiveElement()`, `usePrintPage()`, `useSetTitle()`, `useSetTempTitle()` | no-op |
| `useGetActiveElement()` | `null` |
| `useGetTitle()` | `""` |
| `useRequestFullscreen()` | throws `Error("Fullscreen not supported")` |
| `useExitFullscreen()` | resolved promise, no-op |
| `useIsFullscreen()` | `false` |
| `useIsDocumentVisible()` | `true` — assume the document is visible |
| `useOnVisibilityChange()` | no-op cleanup function |

## Quick example

```ts
import {
  useGetScrollProgress, useIsAtTop, useScrollToTop,
  useOnVisibilityChange, useOn,
} from "katanakit-js";

// Reading progress — one-shot read inside a passive listener
const offScroll = useOn(window, "scroll", () => {
  document.documentElement.style.setProperty(
    "--read-progress",
    String(useGetScrollProgress()),
  );
}, { passive: true });

// Back-to-top state, driven by the same scroll stream
const toTop = document.querySelector<HTMLElement>("#to-top");
useOn(window, "scroll", () => {
  if (toTop) toTop.hidden = useIsAtTop(100);
}, { passive: true });

// Reduced-motion aware by default
useScrollToTop();

// The only subscription helper: keep the cleanup
const offVisibility = useOnVisibilityChange((visible) => {
  document.body.classList.toggle("paused", !visible);
});

// Teardown
offScroll?.();
offVisibility();
```

## Size & media queries

### useGetViewportSize()

`useGetViewportSize(): ViewportSize` returns `{ width, height }` built from
`window.innerWidth` and `window.innerHeight`, or `{ width: 0, height: 0 }` on
the server. Each call is a fresh snapshot — it does not update on resize.

Because `window.innerWidth` includes the scrollbar while
`document.documentElement.clientWidth` does not, the two values can differ by
roughly 15 px on desktop. Prefer this helper when you care about the actual
viewport the user sees.

```ts
import { useGetViewportSize } from "katanakit-js";

const { width, height } = useGetViewportSize();
const isCompact = width < 768;
```

**Real use case** — responsive navigation: choose the drawer variant of a menu
when the viewport is narrow, and the inline variant when it is wide. On the
server `width` is `0`, so `isCompact` is `true` by default; pair the check with
a CSS media query (or [`useMatchesMedia()`](#usematchesmedia-query)) so the
static markup already matches the intended layout.

### useMatchesMedia(query)

`useMatchesMedia(query: string): boolean` tests one CSS media query against the
current viewport and returns `false` outside the browser or when
`window.matchMedia` is unavailable. It is a point-in-time answer: a query that
starts matching after a rotation or resize will not notify you.

```ts
import { useMatchesMedia } from "katanakit-js";

const isDesktop = useMatchesMedia("(min-width: 1024px)");
const canHover = useMatchesMedia("(hover: hover)");
const highContrast = useMatchesMedia("(prefers-contrast: more)");
```

To keep a value in sync, re-run the query inside a resize listener:

```ts
import { useMatchesMedia, useOn } from "katanakit-js";

const off = useOn(window, "resize", () => {
  element.classList.toggle("desktop", useMatchesMedia("(min-width: 1024px)"));
}, { passive: true });
```

**Real use case** — responsive navigation and capability detection: switch
between a collapsible drawer and a persistent sidebar with
`(min-width: 1024px)`, and gate hover previews behind `(hover: hover)` so touch
devices never get sticky tooltips.

### usePrefersReducedMotion()

`usePrefersReducedMotion(): boolean` is a named shortcut for
`useMatchesMedia("(prefers-reduced-motion: reduce)")` and returns `false` on the
server.

The scroll helpers read this preference at call time and force
`behavior: "auto"` when it is active, so you rarely need to check it before
calling [`useScrollTo()`](#usescrollto-x-0-y-0-behavior-smooth) and friends. Use
it directly to disable custom animations that the library does not control.

```ts
import { usePrefersReducedMotion } from "katanakit-js";

const duration = usePrefersReducedMotion() ? 0 : 400;
card.animate([{ opacity: 0 }, { opacity: 1 }], { duration });
```

**Real use case** — an onboarding carousel with autoplay: skip the auto-advance
timer entirely when reduced motion is requested, instead of merely shortening
each transition.

### usePrefersDarkMode()

`usePrefersDarkMode(): boolean` is a shortcut for
`useMatchesMedia("(prefers-color-scheme: dark)")`, `false` on the server. It
reports the operating-system preference; it does not persist the user's choice.
For a themed app with persistence, use the
[Theme](/guides/services/theme) service as the source of truth and this helper
only for a first-paint hint.

```ts
import { usePrefersDarkMode } from "katanakit-js";

const scheme = usePrefersDarkMode() ? "dark" : "light";
```

**Real use case** — charting libraries that cannot read CSS variables: pick the
palette before the first chart renders, then let the Theme service override it
when the user toggles the mode.

## Scroll position

The scroll reads below are all one-shot. For a sticky header, reading progress
bar or infinite scroll, wrap them in a `useOn(window, "scroll", ...)` listener
with `{ passive: true }` — passive listeners tell the browser they will never
call `preventDefault()`, which keeps scrolling smooth on touch devices.

`window.scrollY` and `window.scrollX` are usually integers but can be
fractional under browser zoom or high-DPI scaling; round the value when you
compare it with `===` or use it as an index.

### useGetScrollY()

`useGetScrollY(): number` returns the current vertical scroll offset
(`window.scrollY`) and `0` on the server. It can be negative during rubber-band
overscroll at the top of a page on some platforms.

```ts
import { useGetScrollY, useOn } from "katanakit-js";

const off = useOn(window, "scroll", () => {
  document.body.classList.toggle("header-stuck", useGetScrollY() > 16);
}, { passive: true });
```

**Real use case** — sticky headers: once the page scrolls past a small
threshold, add a compact style (shadow, reduced padding) and remove it when the
page returns to the top. Keep the listener passive and avoid extra layout reads
inside it.

### useGetScrollX()

`useGetScrollX(): number` returns the current horizontal scroll offset
(`window.scrollX`) and `0` on the server.

```ts
import { useGetScrollX } from "katanakit-js";

const isPanned = useGetScrollX() > 0;
```

**Real use case** — wide data tables with a pinned first column: when the user
pans horizontally, toggle the pinned-column shadow by checking
`useGetScrollX() > 0` from a passive listener.

### useGetScrollPosition()

`useGetScrollPosition(): ScrollPosition` returns both axes in one object —
`{ x, y }` — using [`useGetScrollX()`](#usegetscrollx) and
[`useGetScrollY()`](#usegetscrolly) internally. Returns `{ x: 0, y: 0 }` on the
server.

```ts
import { useGetScrollPosition } from "katanakit-js";

const { x, y } = useGetScrollPosition();
```

**Real use case** — restoring where the user was: save `{ x, y }` before a
full-page navigation (for example in `sessionStorage`) and call
[`useScrollTo()`](#usescrollto-x-0-y-0-behavior-smooth) with the saved values
when the page opens.

### useGetScrollProgress()

`useGetScrollProgress(): number` returns how far the document has been scrolled
vertically, normalized to `[0, 1]`: `0` at the top and `1` at the bottom. It
computes `document.documentElement.scrollHeight - window.innerHeight` first and
returns `0` when that value is `<= 0` (a short page with nothing to scroll).
The result is clamped, so overscroll bounce cannot push it below `0` or above
`1`. On the server it returns `0`.

```ts
import { useGetScrollProgress, useOn } from "katanakit-js";

const bar = document.querySelector<HTMLElement>("#reading-progress");

useOn(window, "scroll", () => {
  if (bar) bar.style.width = `${useGetScrollProgress() * 100}%`;
}, { passive: true });
```

**Real use case** — a reading progress bar for long articles: update a CSS
variable from the passive listener and let the stylesheet animate the width, so
the JavaScript stays cheap.

### useIsAtTop(threshold = 0)

`useIsAtTop(threshold?: number): boolean` returns `true` when
`useGetScrollY() <= threshold`. The default threshold of `0` means "exactly at
the top"; pass a few pixels (for example `24`) to treat a small offset as the
top and avoid flicker from fractional scroll values or bounce.

On the server this helper returns `true`, because a `0` scroll position is
within any non-negative threshold. Keep that in mind when the server-rendered
state must be `false`; gate the call behind `useIsBrowser()` in that case.

```ts
import { useIsAtTop, useOn } from "katanakit-js";

const toTop = document.querySelector<HTMLElement>("#to-top");

useOn(window, "scroll", () => {
  if (toTop) toTop.hidden = useIsAtTop(100);
}, { passive: true });
```

**Real use case** — a back-to-top button that appears after the first 100 px and
disappears near the top: the SSR fallback (`true`) is convenient here, because
the button starts hidden on the server exactly as it is on a freshly loaded
page.

### useIsAtBottom(threshold = 50)

`useIsAtBottom(threshold?: number): boolean` returns `true` when the viewport is
within `threshold` pixels of the bottom of the document:

`window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - threshold`.

The default tolerance is `50`. It returns `false` on the server. Because the
comparison uses the full document height, a page shorter than the viewport
reports `true` immediately — guard infinite scroll with a `hasMore` flag so it
does not fetch forever on short lists.

```ts
import { useIsAtBottom, useOn } from "katanakit-js";

let loading = false;

const off = useOn(window, "scroll", async () => {
  if (loading || !hasMore || !useIsAtBottom(200)) return;
  loading = true;
  await loadNextPage();
  loading = false;
}, { passive: true });
```

**Real use case** — infinite scroll: preload the next page when the user is
within 200 px of the bottom and keep a `loading` guard, since scroll events
fire in bursts. Remember to call `off?.()` during teardown.

## Scroll actions

All four actions are no-ops on the server, and all four respect
`prefers-reduced-motion`: when the user requested reduced motion, the behavior
is forced to `"auto"` even when `"smooth"` was explicitly passed. `smooth` is a
preference, not a guarantee — the browser may ignore it (for example, in a
background tab).

### useScrollTo(x = 0, y = 0, behavior = "smooth")

`useScrollTo(x?: number, y?: number, behavior?: ScrollBehavior): void` scrolls
the window to `(x, y)`. Note the argument order: horizontal first, vertical
second — matching `window.scrollTo(left, top)`, not the object form. All three
arguments have defaults, so `useScrollTo()` scrolls to the top-left corner with
smooth behavior.

Pass `behavior: "auto"` for an instant jump. When reduced motion is active, the
function replaces the requested behavior with `"auto"` before calling
`window.scrollTo({ top: y, left: x, behavior })`.

```ts
import { useScrollTo } from "katanakit-js";

useScrollTo(0, 500);         // smooth scroll to 500 px from the top
useScrollTo(0, 500, "auto"); // instant, no animation
useScrollTo();               // back to the top-left corner
```

**Real use case** — carousel and tab navigation where the page must keep a
stable scroll offset: compute the target `y` in JavaScript and scroll without
changing the URL hash.

### useScrollToTop(smooth = true)

`useScrollToTop(smooth?: boolean): void` scrolls to `(0, 0)`. Smooth behavior is
used only when `smooth` is `true` **and** the user has not requested reduced
motion; otherwise the jump is instant. No-op on the server.

```ts
import { useScrollToTop } from "katanakit-js";

useScrollToTop();      // animated when allowed
useScrollToTop(false); // always instant
```

**Real use case** — back-to-top button: pair it with
[`useIsAtTop()`](#useisattop-threshold-0) to show the button only after a
threshold, and call `useScrollToTop()` in the click handler.

### useScrollToBottom(smooth = true)

`useScrollToBottom(smooth?: boolean): void` scrolls the window to the bottom by
targeting `document.documentElement.scrollHeight`. The browser clamps the value
to the maximum scrollable offset, so the call never overshoots. It honors
reduced motion the same way as
[`useScrollToTop()`](#usescrolltotop-smooth-true) and is a no-op on the server.

This helper scrolls the **window**. For an inner scroll container (a chat log, a
virtualized list), use
[`useScrollToElement()`](#usescrolltoelement-target-options) with its last
child, or set `container.scrollTop = container.scrollHeight`.

```ts
import { useScrollToBottom, useOn } from "katanakit-js";

useOn("#jump-to-latest", "click", () => useScrollToBottom());
```

**Real use case** — a live activity feed with a "jump to latest" control: leave
the user where they are while reading, and scroll to the newest entry only when
they ask for it.

### useScrollToElement(target, options = {})

`useScrollToElement(target, options?): boolean` scrolls an element into view. It
returns `true` once the element is found and `scrollIntoView()` has been called,
and `false` when the selector matches nothing or when running on the server.
`target` accepts an `HTMLElement` or a CSS selector string; a string is resolved
with `document.querySelector`.

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `behavior` | `ScrollBehavior` | `"smooth"` | Forced to `"auto"` when reduced motion is active |
| `block` | `ScrollLogicalPosition` | `"start"` | Vertical alignment: `"start"`, `"center"`, `"end"`, `"nearest"` |
| `inline` | `ScrollLogicalPosition` | `"nearest"` | Horizontal alignment |

The defaults are tuned for anchor navigation: the element lands at the top of
the viewport (`block: "start"`) and the page scrolls as little as possible
horizontally (`inline: "nearest"`). Use `block: "center"` when the element
should sit in the middle of the screen.

An invalid selector string raises the same `DOMException` as
`document.querySelector`; only a _missing_ element degrades to `false`.

```ts
import { useScrollToElement } from "katanakit-js";

useScrollToElement("#section-2");
useScrollToElement("#section-2", { behavior: "smooth", block: "start" });
useScrollToElement(document.querySelector("#pricing")!, { block: "center" });
```

**Real use case** — table of contents and form validation: scroll a section into
view from an anchor click, and after a failed submit scroll the first invalid
field to the center of the screen so the user sees the message without extra
navigation.

## Focus & printing

### useFocusElement(target)

`useFocusElement(target): boolean` focuses an `HTMLElement` or the first element
matching a selector, and returns `true` when the element was found. It returns
`false` on the server and when the selector matches nothing. Calling `.focus()`
on a non-focusable element does not throw — the element is found, so the
function still returns `true`, but the browser ignores the focus request. Native
`focus()` scrolls the element into view by default, which is usually what you
want for validation errors.

```ts
import { useFocusElement } from "katanakit-js";

useFocusElement("#search-input");
useFocusElement(document.querySelector<HTMLInputElement>(".field-error"));
```

**Real use case** — command palettes and search overlays: open the overlay and
move the keyboard focus to its input in the same handler, so typing works
immediately and screen readers announce the right control.

### useBlurActiveElement()

`useBlurActiveElement(): void` calls `.blur()` on `document.activeElement` when
it exposes one, and does nothing on the server. On desktop, blurring usually
moves focus to `<body>`; if the user is navigating with the keyboard, prefer
[`useFocusElement()`](#usefocuselement-target) to move focus to a logical next
control instead.

```ts
import { useBlurActiveElement } from "katanakit-js";

useBlurActiveElement();
```

**Real use case** — mobile forms: blur the focused input after a successful
submit so the on-screen keyboard closes and the confirmation message is
visible.

### useGetActiveElement()

`useGetActiveElement(): Element | null` returns `document.activeElement`, or
`null` on the server. In the browser it is almost never `null` — with nothing
focused it returns `<body>`.

```ts
import { useGetActiveElement, useFocusElement } from "katanakit-js";

const previouslyFocused = useGetActiveElement();
openDialog();
// later, when the dialog closes
if (previouslyFocused instanceof HTMLElement) useFocusElement(previouslyFocused);
```

**Real use case** — focus restoration for modals: capture the active element
before opening the dialog and restore it on close, so keyboard users land back
where they were instead of at the start of the page.

### usePrintPage()

`usePrintPage(): void` calls `window.print()` and is a no-op on the server. The
browser opens its native print dialog; style the printed output with `@media
print` rules. The helper does not open a new window or generate a PDF itself.

```ts
import { usePrintPage, useOn } from "katanakit-js";

useOn("#print-invoice", "click", () => usePrintPage());
```

**Real use case** — invoices and receipts: a print button on an order page that
sends the same DOM to the printer, paired with print styles that hide the app
chrome.

## Fullscreen

### useRequestFullscreen(target?)

`useRequestFullscreen(target?: HTMLElement): Promise<void>` requests fullscreen
on an element, defaulting to `document.documentElement`. It **throws**
`Error("Fullscreen not supported")` on the server and when
`document.fullscreenEnabled` is `false`; this is the one viewport helper without
an SSR no-op fallback.

Browsers require a user gesture to enter fullscreen, so call it from a click or
key handler. The returned promise can also reject when the request is denied
(for example, an iframe without `allow="fullscreen"`), so wrap it in
`try/catch`.

```ts
import { useRequestFullscreen } from "katanakit-js";

async function enterPlayerMode(video: HTMLVideoElement) {
  try {
    await useRequestFullscreen(video);
  } catch {
    // Fallback: keep the inline player
  }
}
```

**Real use case** — video players, games and presentation modes: give a custom
fullscreen button for the element that should fill the screen, not the whole
document.

### useExitFullscreen()

`useExitFullscreen(): Promise<void>` exits fullscreen when it is active. It
resolves immediately on the server and when the document is not in fullscreen,
so it is safe to call unconditionally.

```ts
import { useExitFullscreen } from "katanakit-js";

await useExitFullscreen();
```

**Real use case** — closing a presentation view from a custom control. Users can
also press `Esc`, so treat the document fullscreen state as the source of truth
and listen for the `fullscreenchange` event to stay in sync.

### useIsFullscreen()

`useIsFullscreen(): boolean` returns `true` while
`document.fullscreenElement` is set, and `false` on the server.

```ts
import { useIsFullscreen, useOn } from "katanakit-js";

useOn(document, "fullscreenchange", () => {
  button.textContent = useIsFullscreen() ? "Exit" : "Enter fullscreen";
});
```

**Real use case** — a reader mode that hides its toolbar in fullscreen: keep the
UI driven by `useIsFullscreen()` inside a `fullscreenchange` listener so it also
reacts when the user leaves fullscreen with `Esc`.

## Document visibility

### useIsDocumentVisible()

`useIsDocumentVisible(): boolean` returns `true` when
`document.visibilityState === "visible"`. On the server it returns `true` as
well — the fallback assumes content is being rendered normally.

```ts
import { useIsDocumentVisible } from "katanakit-js";

if (useIsDocumentVisible()) startPolling();
```

**Real use case** — battery-friendly dashboards: check the current state before
starting a polling loop, then let
[`useOnVisibilityChange()`](#useonvisibilitychange-callback) pause and resume
it.

### useOnVisibilityChange(callback)

`useOnVisibilityChange(callback: (isVisible: boolean) => void): () => void`
registers a `visibilitychange` listener on `document` and returns an
**unsubscribe function** — the only cleanup contract in this module, matching
[`useOn()`](/guides/services/dom#useontarget-event-callback-options). On the
server it returns a no-op function, so the same teardown code works in both
environments.

The callback is **not invoked at registration time** — only when the visibility
changes. Combine it with `useIsDocumentVisible()` if you need to handle the
initial state.

```ts
import { useIsDocumentVisible, useOnVisibilityChange } from "katanakit-js";

let timer: ReturnType<typeof setInterval> | undefined;

function start() {
  timer = setInterval(refreshFeed, 5000);
}

function stop() {
  if (timer !== undefined) clearInterval(timer);
  timer = undefined;
}

if (useIsDocumentVisible()) start();

const off = useOnVisibilityChange((visible) => (visible ? start() : stop()));

// Teardown
off();
stop();
```

**Real use case** — pause timers, animations and background requests when the
user switches tabs, then resume when the tab becomes visible again. Use the
`false` edge to flush unsaved state before the page is hidden.

## Document title

### useGetTitle()

`useGetTitle(): string` returns `document.title`, or `""` on the server.

```ts
import { useGetTitle } from "katanakit-js";

const previous = useGetTitle();
```

**Real use case** — remember the current title before a temporary change and
compare it later, or feed it to analytics alongside the current route.

### useSetTitle(title)

`useSetTitle(title: string): void` writes `document.title` and is a no-op on the
server. Use it from client-side navigation to keep the browser tab in sync with
the current route.

```ts
import { useSetTitle } from "katanakit-js";

useSetTitle("Inbox — Acme");
```

**Real use case** — SPA routing: on every route change, set a stable
`"Page — App"` title. For the document metadata that search engines and social
networks read, use the [SEO](/guides/services/seo) service instead — this helper
only changes the live tab.

### useSetTempTitle(tempTitle, durationMs = 3000)

`useSetTempTitle(tempTitle: string, durationMs?: number): void` shows a
temporary title and restores the previous one after `durationMs` milliseconds
(default `3000`). It is a no-op on the server.

The helper keeps the original title captured by the **first** call in a
module-level variable and a single pending timer:

- Calling it again before the timer fires cancels the previous countdown, keeps
  the original title from the first call, and restarts the delay.
- The original title is restored only if `document.title` still equals
  `tempTitle` when the timer fires. If something else — such as
  [`useSetTitle()`](#usesettitle-title) — changed the title in the meantime, the
  restore is skipped and the newer title wins.

```ts
import { useSetTempTitle } from "katanakit-js";

useSetTempTitle("(2) New messages!", 5000);
// The tab shows the temporary title for 5 seconds, then reverts.
```

**Real use case** — unread-message counters in the tab: flash `"(3) New
messages!"` when a message arrives while the page is in the background, and let
the title settle back to the app name without tracking the original string
yourself.

## Related

- [DOM](/guides/services/dom) — selectors, attributes, classes and events.
- [Watch](/guides/watch) — framework-agnostic reactive watcher for Vue and Nuxt.
- [Timing](/guides/services/timing) — debounce and throttle for the scroll listeners shown above.
- [API Reference](/api/) — every export, generated from source.
