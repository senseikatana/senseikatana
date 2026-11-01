---
title: Observer
description: "Registry-based IntersectionObserver management, lazy image loading and SSR-safe no-ops — every helper explained."
---

# Observer

`observer.service.ts` is a **function module**: standalone `use*` helpers with
no instance to create. Observers are managed through a module-level
**registry keyed by string**, so one part of the app can register an observer
and any other part can attach targets to it just by knowing the key.

Three design rules apply to every function on this page:

1. **Registry-based lifecycle** — `useObserverCreate()` registers an
   `IntersectionObserver` under a key, `useObserverObserve()` /
   `useObserverObserveAll()` attach elements to it, and
   `useObserverDisconnect()` removes the observer together with every tracked
   target. You pass keys around, never observer handles.
2. **SSR-safe no-ops** — `useIsSupported()` is `false` outside a browser, so
   creation is skipped (with a warning) and every read returns a neutral value
   (`false`, `[]`). The module never touches `window` or `document` on the
   server because the registry stays empty.
3. **Cleanup is explicit** — the registry is module-level state that stores
   strong `Set<HTMLElement>` references. An observer that is never disconnected
   keeps its callback and its elements alive. Always pair creation with
   disconnect during teardown.

**Intersection only.** This module wraps `IntersectionObserver` and nothing
else — there is no `ResizeObserver` or DOM `MutationObserver` wrapper in
KatanaKit. See [Intersection, resize and mutation](#intersection-resize-and-mutation)
for the supported patterns.

The public types `ObserverTarget` (`HTMLElement | string`) and
`ObserverCallback` (`(entry: IntersectionObserverEntry) => void`) describe
every target and callback accepted below, and are exported from `katanakit-js`.

**Behavior at a glance when there is no browser:**

| Function | Outside the browser |
| --- | --- |
| `useIsSupported()` | `false` |
| `useObserverCreate()` | no-op; logs a warning, key is not registered |
| `useObserverObserve()`, `useObserverObserveAll()` | no-op |
| `useObserverUnobserve()`, `useObserverDisconnect()`, `useObserverDisconnectAll()` | no-op |
| `useObserverHas()` | `false` |
| `useObserverKeys()` | `[]` |
| `useLazyLoaderInit()` | no-op |
| `useLazyLoaderStop()`, `useLazyLoaderStopAll()` | no-op |
| `useLazyLoaderHas()` | `false` |

## Quick example

```ts
import {
  useObserverCreate, useObserverObserve, useObserverObserveAll,
  useObserverDisconnect,
} from "katanakit-js";

// Register an observer; the callback runs only for intersecting entries.
useObserverCreate("reveal", (entry) => {
  entry.target.classList.add("is-visible");
}, { threshold: 0.25 });

// Attach targets by selector or by element reference.
useObserverObserve("reveal", "#hero");
useObserverObserveAll("reveal", ".card");

// Teardown — disconnects the observer and forgets the key.
useObserverDisconnect("reveal");
```

## Registry & lifecycle

Every observer lives in a single `Map<string, ObserverEntry>` shared by the
module. The key is the unit of ownership: creating, observing and disconnecting
always go through it. This makes keys a natural fit for page sections
(`"hero"`, `"feed"`, `"gallery"`) and for cleanup routines that receive nothing
but a string.

### useIsSupported()

Checks whether the current environment can run observers:
`typeof window !== "undefined" && "IntersectionObserver" in window`.

Returns `true` only in a browser with `IntersectionObserver` available, and
`false` on the server and in runtimes that lack the API. The rest of the module
calls it internally, but use it directly when you want to feature-detect and
avoid the warning that `useObserverCreate()` logs on unsupported runtimes.

```ts
import { useIsSupported, useObserverCreate } from "katanakit-js";

if (useIsSupported()) {
  useObserverCreate("reveal", (entry) => entry.target.classList.add("in"));
}
```

**Real use case** — progressive enhancement: a landing page registers reveal
animations only when the API exists, while browsers without support still get
the full content in its final, visible state.

### useObserverCreate(key, callback, options?, autoUnobserve?)

Registers an `IntersectionObserver` under `key` and returns `void`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | — | Unique name for this observer in the registry. |
| `callback` | `ObserverCallback` | — | Invoked for every **intersecting** entry. |
| `options` | `IntersectionObserverInit` | `{ threshold: 0.1 }` | Forwarded to the `IntersectionObserver` constructor. |
| `autoUnobserve` | `boolean` | `true` | Stop observing each target after its first callback. |

Behavior and edge cases:

- **Unsupported environment** — logs
  `[ObserverService] IntersectionObserver not supported.` at `warn` level via
  `useLogger()` and returns without registering anything, so the key stays
  absent.
- **Duplicate key** — an observer already registered under `key` is
  disconnected first (`useObserverDisconnect(key)`), including its targets.
  Re-creating a key is therefore a safe reset for hot-reload and strict-mode
  double mounts.
- **Filtering** — the wrapper checks `entry.isIntersecting` and only calls
  `callback` for entries that are intersecting. Non-intersecting entries are
  skipped, so you never need an `if (!entry.isIntersecting) return;` guard.
- **`autoUnobserve: true`** — after each callback invocation the wrapper calls
  `useObserverUnobserve(key, entry.target)`. One callback per element, and the
  target set shrinks as elements are revealed.
- **Options default** — `{ threshold: 0.1 }` applies only when the argument is
  omitted or `undefined`. Passing `{}` gives you the browser default threshold
  of `0`.
- **Exceptions** — errors thrown inside `callback` propagate to the observer
  microtask; they are not caught by the wrapper. Handle failures inside the
  callback.

The callback receives a native `IntersectionObserverEntry` with `target`,
`isIntersecting`, `intersectionRatio`, `boundingClientRect`,
`intersectionRect`, `rootBounds` and `time`.

```ts
import { useObserverCreate, useObserverObserve, useObserverObserveAll } from "katanakit-js";

useObserverCreate("reveal", (entry) => {
  entry.target.classList.add("is-visible");
  console.log(entry.intersectionRatio, entry.time);
}, { threshold: [0, 0.25, 0.75] });

useObserverObserveAll("reveal", ".reveal-on-scroll");
```

**Real use case** — infinite scroll with a sentinel element: each time the
sentinel enters the preloading margin, load the next page and re-arm the
sentinel, because `autoUnobserve` removed it after the callback.

```ts
useObserverCreate("feed", async (entry) => {
  await loadNextPage();
  // autoUnobserve removed the sentinel; re-observe it for the next page.
  useObserverObserve("feed", entry.target as HTMLElement);
}, { rootMargin: "400px" });

useObserverObserve("feed", "#feed-sentinel");
```

If you prefer a callback that fires on every entry/exit crossing instead, pass
`autoUnobserve = false` and guard against concurrent loads with a `loading`
flag.

### useObserverHas(key)

Returns `true` when an observer is currently registered under `key`, `false`
otherwise. On the server it always returns `false`, because nothing can be
registered there.

Use it to guard against typos and double initialization, or to check whether a
setup step already ran before calling `useObserverObserve()` with a string key.

```ts
import { useObserverHas, useObserverCreate } from "katanakit-js";

if (!useObserverHas("gallery")) {
  useObserverCreate("gallery", onImageVisible);
}
```

**Real use case** — a filter component that can mount twice (mobile and desktop
toolbars) initializes the shared observer only once, whichever instance mounts
first.

### useObserverKeys()

Returns a snapshot array of every registered key, in insertion order. On the
server it returns `[]`. The list includes the internal keys created by the lazy
loader (`lazy_loader_<key>`), which makes it a useful debugging entry point.

```ts
import { useObserverKeys, useObserverDisconnect } from "katanakit-js";

console.table(useObserverKeys()); // ["reveal", "feed", "lazy_loader_gallery"]

for (const key of useObserverKeys()) {
  if (key.startsWith("lazy_loader_")) continue;
  useObserverDisconnect(key);
}
```

**Real use case** — a devtools overlay that lists active observers and offers a
"disconnect all" button during development, exposed only when
`useIsSupported()` is `true`.

### useObserverDisconnect(key)

Disconnects the observer registered under `key`, clears its target set and
deletes the registry entry. Returns `void`; unknown keys are silently ignored. After the call,
callbacks stop firing, no elements remain observed, and the key can be reused
with `useObserverCreate()`.

`disconnect()` stops **every** target at once. To stop a single element while
keeping the observer alive, use
[`useObserverUnobserve()`](#useobserverunobservekey-element) instead.

```ts
import { useObserverDisconnect } from "katanakit-js";

// Vue
onMounted(() => {
  useObserverCreate("grid", onCardVisible, { threshold: 0.2 });
  useObserverObserveAll("grid", ".card");
});
onBeforeUnmount(() => useObserverDisconnect("grid"));

// React
useEffect(() => {
  useObserverCreate("grid", onCardVisible, { threshold: 0.2 });
  useObserverObserveAll("grid", ".card");
  return () => useObserverDisconnect("grid");
}, []);
```

**Real use case** — a single-page application route change: the new route owns
different reveal sections, so the old route's observer key is disconnected
before the new view creates its own.

### useObserverDisconnectAll()

Disconnects and removes every observer in the registry by iterating
`useObserverKeys()` and calling `useObserverDisconnect()` for each. Returns
`void`; safe to call at any time, and a no-op when the registry is empty.

It does **not** clear the lazy-loader registry. If lazy loaders are active,
their underlying observers are disconnected (they live in the same registry),
but `useLazyLoaderHas()` still reports `true` and the lazy entries must be
stopped separately with `useLazyLoaderStopAll()`.

```ts
import { useLazyLoaderStopAll, useObserverDisconnectAll } from "katanakit-js";

export function teardownObservers() {
  useLazyLoaderStopAll();
  useObserverDisconnectAll();
}
```

**Real use case** — test isolation: call it in `afterEach` so each test starts
with an empty registry, no lingering callbacks and no leaked element
references.

## Observing elements

Targets are attached through the key. `useObserverObserve()` takes a single
element or selector; `useObserverObserveAll()` expands a selector to every
match. Both are idempotent — observing the same element twice under the same
key does not produce duplicate callbacks, because the wrapper tracks targets in
a `Set` and the browser ignores repeated `observe()` calls for the same element.

### useObserverObserve(key, element)

Starts observing one target under an existing observer key. Returns `void`.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | An observer key created with `useObserverCreate()`. |
| `element` | `ObserverTarget` (`HTMLElement \| string`) | An element reference or a CSS selector. |

Behavior and edge cases:

- **Unknown key** — returns silently. A typo in the key will not throw and will
  not log, so verify with `useObserverHas(key)` when in doubt.
- **String targets** — resolved with `document.querySelector`, which returns
  the **first** match only. If the selector matches nothing, a warning is
  logged with the key and the raw selector, and nothing is observed. Use
  `useObserverObserveAll()` when you want every match.
- **Duplicate observations** — no-ops. The same element is never observed twice
  under the same key.
- **Initial callback** — after `observe()`, the browser delivers the first
  intersection state asynchronously, so the callback may run shortly after this
  call when the element is already visible.
- **SSR** — the registry is empty on the server, so the call returns
  immediately without touching the DOM.

```ts
import { useObserverCreate, useObserverObserve } from "katanakit-js";

useObserverCreate("impressions", (entry) => {
  track("impression", { id: (entry.target as HTMLElement).dataset.adId });
}, { threshold: 0.5 });

useObserverObserve("impressions", "#sponsored-banner");
useObserverObserve("impressions", document.querySelector("#hero")!);
```

**Real use case** — impression tracking for a single sponsored banner: record
one impression when at least half the banner has been visible, then
`autoUnobserve` removes it so the metric is not double-counted.

### useObserverObserveAll(key, selector)

Expands a CSS selector with `document.querySelectorAll` and observes every
match under `key`. This is the bulk entry point for lists and repeated
components. Returns `void`.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | An observer key created with `useObserverCreate()`. |
| `selector` | `string` | CSS selector matching all elements to observe. |

Behavior and edge cases:

- **Unsupported environment** — guarded by `useIsSupported()`, so it is an
  explicit no-op on the server.
- **Unknown key** — each nested `useObserverObserve()` call no-ops silently; no
  warning is emitted.
- **No matches** — nothing happens and nothing is logged. If you need to know
  whether elements were found, query them yourself or count with
  `useQuerySelectorAll()`.
- **Static snapshot** — only elements present at call time are observed.
  Elements appended later (infinite scroll, filtered lists, framework
  re-renders) need another `useObserverObserveAll()` call for the same key or
  `useObserverObserve()` for the specific node.

```ts
import { useObserverCreate, useObserverObserveAll } from "katanakit-js";

useObserverCreate("sections", (entry) => {
  entry.target.classList.add("in-view");
}, { threshold: 0.2 });

useObserverObserveAll("sections", "main > section");
```

**Real use case** — scroll-reveal animation across an article: every section is
observed once, receives a CSS class on first view, and is automatically
unobserved so the animation never replays on scroll-back.

### useObserverUnobserve(key, element)

Stops observing a single element under `key` while keeping the observer, its
config and its other targets alive. Returns `void`.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | The observer key. |
| `element` | `HTMLElement` | The element to stop observing. **Must be a reference, not a selector.** |

Behavior and edge cases:

- **Unknown key** — silent no-op.
- **Element not observed** — silent no-op; native `unobserve()` ignores unknown
  targets.
- **Selector strings are not accepted** here. Resolve the element first with
  `useQuerySelector()`. If you only have a selector, pass it to
  `useObserverObserve()` at attach time and keep the reference you observed.
- **Internal use** — `autoUnobserve: true` calls this helper after each
  callback, so the "one callback per element" behavior and this API share the
  same code path.
- **SSR** — silent no-op, like every other mutation on this page.

```ts
import {
  useObserverCreate, useObserverObserve, useObserverUnobserve, useQuerySelector,
} from "katanakit-js";

useObserverCreate("promo", () => track("promo-seen"), { threshold: 0.5 }, false);
useObserverObserve("promo", "#promo-widget");

// The user dismissed the widget — stop tracking only this element.
const widget = useQuerySelector<HTMLElement>("#promo-widget");
if (widget) useObserverUnobserve("promo", widget);
```

**Real use case** — analytics with opt-out: when a visitor dismisses a
promotional widget, stop observing that element while the same observer keeps
tracking the other campaigns on the page.

## Lazy image loading

`useLazyLoaderInit()` is a thin, opinionated preset built on top of the
registry: it creates an observer whose callback swaps `data-src` into `src`.
Each lazy-loader instance owns a plain key and an internal observer key named
`lazy_loader_<key>`, which is visible in `useObserverKeys()`.

### useLazyLoaderInit(key?, selector?, rootMargin?)

Initializes lazy loading for images using `IntersectionObserver`. Returns
`void`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | `"default"` | Name of this lazy-loader instance. |
| `selector` | `string` | `"img[data-src]"` | CSS selector for lazy-loadable images. |
| `rootMargin` | `string` | `"200px"` | Intersection margin, forwarded to the observer root. |

Behavior and edge cases:

- **Unsupported environment** — no-op; nothing is registered.
- **Duplicate key** — an existing instance under `key` is stopped first
  (`useLazyLoaderStop(key)`), so re-initializing is a clean reset.
- **Callback payload** — for every intersecting image the preset reads
  `data-src`, assigns it to `src`, and removes the `data-src` attribute. The
  target is cast to `HTMLImageElement`; non-image elements may break, so keep
  the selector image-specific.
- **Threshold is `0`**, not the `0.1` default of `useObserverCreate()`: the
  preset passes `{ rootMargin }` as options, so the browser default threshold
  applies. The callback fires as soon as any pixel intersects the expanded
  root.
- **`autoUnobserve` is `true`**: each image is unobserved after the swap.
  Already-swapped images have no `data-src`, so re-observing them is harmless.
- **Static snapshot** — images are collected once at init. Images added later
  need `useObserverObserveAll("lazy_loader_" + key, selector)` or a re-init.
- **No error handling** — a broken `data-src` produces a broken image; listen
  for `error` yourself if you need a fallback.

```ts
import { useLazyLoaderInit } from "katanakit-js";

useLazyLoaderInit("gallery", "img[data-src]", "300px");
```

```html
<img data-src="/photos/01.jpg" src="/photos/01-thumb.jpg" alt="Campaign" />
<!-- after intersection: src="/photos/01.jpg", data-src removed -->
```

**Real use case** — a product gallery: render a tiny placeholder in `src` for
instant layout, put the full-resolution URL in `data-src`, and let the loader
swap images 200–300 px before they enter the viewport. Native
`loading="lazy"` is a valid alternative when you do not need custom margins or
JS-driven src swapping.

### useLazyLoaderStop(key)

Stops one lazy-loader instance: disconnects its underlying observer and deletes
the lazy registry entry. Returns `void`; unknown keys are silently ignored. Images that already
loaded are untouched; images not yet swapped stop loading and keep their
`data-src`.

```ts
import { useLazyLoaderStop } from "katanakit-js";

// The user changed the gallery filter — the old grid is gone.
useLazyLoaderStop("gallery");
```

**Real use case** — replacing a filtered grid: on each filter change, stop the
old instance before initializing a new one for the re-rendered markup.

### useLazyLoaderStopAll()

Stops every registered lazy-loader instance by iterating the lazy registry.
Returns `void`; safe on the server and when nothing is registered.

```ts
import { useLazyLoaderStopAll } from "katanakit-js";

window.addEventListener("beforeunload", () => useLazyLoaderStopAll());
```

**Real use case** — teardown in a micro-frontend host: before unmounting the
remote application, stop all of its lazy loaders so no observer references its
detached DOM nodes.

### useLazyLoaderHas(key)

Returns `true` while a lazy-loader instance is registered under `key`. This
reads the lazy registry, not the observer registry — a subtle but important
difference: after a plain `useObserverDisconnect("lazy_loader_gallery")`, this
function still returns `true` even though the underlying observer is gone,
because the lazy entry remains until `useLazyLoaderStop()` is called.

```ts
import { useLazyLoaderHas, useLazyLoaderInit } from "katanakit-js";

if (!useLazyLoaderHas("gallery")) {
  useLazyLoaderInit("gallery", "img[data-src]");
}
```

**Real use case** — guard double initialization from two components that share
the same loader key, and assert the initialization state in tests.

## Intersection, resize and mutation

`IntersectionObserver` is the only observer type this module wraps. The
patterns below show how to cover the other two cases honestly, using KatanaKit
helpers where they exist and native APIs where they do not.

### Intersection patterns

- **One-shot visibility** (`autoUnobserve: true`, the default) — reveals,
  impressions, lazy loading. The callback runs once per element.
- **Continuous visibility** (`autoUnobserve: false`) — video
  play/pause, sticky headers, scrollspy. Guard repeated work with your own
  flags.
- **Sentinel** — infinite scroll and pagination. Observe a thin element at the
  end of a list and re-arm it after each page load, as shown in
  [`useObserverCreate()`](#useobservercreatekey-callback-options-autounobserve).

### Resize: window and element size

This service does not wrap `ResizeObserver`, and viewport reads are one-shot.
For **window** resize, re-read the value inside a passive listener:

```ts
import { useMatchesMedia, useOn } from "katanakit-js";

const syncLayout = () => {
  document.body.dataset.layout = useMatchesMedia("(min-width: 1024px)")
    ? "desktop"
    : "mobile";
};

syncLayout();
const off = useOn(window, "resize", syncLayout, { passive: true });
// Teardown: off?.()
```

**Real use case** — layout breakpoints: `useMatchesMedia()` answers the media
query at call time, and the resize listener keeps the state in sync, so CSS and
JS never disagree about the active layout.

For **element** size (a chart container, a resizable panel), use the native
`ResizeObserver` and remember to disconnect it:

```ts
import { useQuerySelector } from "katanakit-js";

const chart = useQuerySelector<HTMLElement>("#chart");
const resizeObserver = new ResizeObserver(() => redrawChart());
if (chart) resizeObserver.observe(chart);

// Teardown
resizeObserver.disconnect();
```

**Real use case** — a dashboard chart that re-renders at its container's real
width, independent of the window.

**Auto-resize textarea** — no observer is needed. Grow the field from its
content with one `input` listener:

```ts
import { useOn, useQuerySelector } from "katanakit-js";

useOn("#note", "input", () => {
  const field = useQuerySelector<HTMLTextAreaElement>("#note");
  if (!field) return;
  field.style.height = "auto";
  field.style.height = `${field.scrollHeight}px`;
});
```

### Mutation: reacting to DOM changes

There is no DOM `MutationObserver` wrapper either. When new nodes appear after
a lazy loader was initialized, re-run `useObserverObserveAll()` — optionally
from a native `MutationObserver` when you cannot hook into the render path:

```ts
import { useObserverObserveAll } from "katanakit-js";

const mutations = new MutationObserver(() => {
  useObserverObserveAll("lazy_loader_gallery", "img[data-src]");
});

mutations.observe(document.body, { childList: true, subtree: true });

// Teardown
mutations.disconnect();
```

**Real use case** — a chat or feed that appends images from a WebSocket: the
mutation observer notices new `<img data-src>` nodes and attaches them to the
existing lazy loader without re-initializing it.

If you are watching **Vue state** rather than the DOM, the
[Generic Watch](/guides/watch) helper is the reactive tool for that job.

## Related

- [DOM](/guides/services/dom) — selectors, events and safe attribute writes used to build observer targets.
- [Viewport](/guides/services/viewport) — one-shot viewport reads and media queries for layout breakpoints.
- [Generic Watch](/guides/watch) — reactive watcher for Vue state, the state-layer complement to DOM observation.
- [API Reference](/api/) — every export on this page, generated from source.
