---
title: Reactive
description: "Framework-free signals, derived state, effects, batching and persisted stores — every helper explained."
---

# Reactive

`reactive.service.ts` hosts the Singleton facade `ReactiveService` — the
signals kernel — whose methods are re-exported as thin `use*` wrappers: no
instance to create and no runtime to bootstrap. A signal is a plain callable
getter (`count()`) paired with a setter (`setCount(1)`). Effects and memos track
the signals they read automatically; optional explicit dependency arrays remain
available for compatibility. Dependency tracking is **push-based**: every
signal owns a listener set and notifies it when the value changes. There is no
proxy magic, no component tree and no scheduler — the primitives work in any
JavaScript runtime that supports ES2015+.

Use it when you need reactivity **without a framework**:

- vanilla TypeScript widgets and progressive-enhancement scripts;
- [Astro islands](https://docs.astro.build/en/concepts/islands/) client scripts
  that should not pull a React/Vue/Solid runtime into the bundle;
- shared modules consumed by several frameworks at once;
- small state graphs where a full state library would be overkill.

For server data, caching and retries reach for
[Query Client](/guides/query-client) instead; for DOM observation use
[Watch](/guides/watch).

## SSR behavior

Signals, effects, memos and toggles are pure JavaScript: they import safely on
the server and never touch `window` or `document`. Three server-side caveats
apply:

- **Module scope is process scope.** On the server, a signal created at module
  level lives for the life of the process and is shared by every request.
  Create signals inside the request handler when the value is request-bound.
- **Storage degrades safely.** `useCreateStorageSignal()` relies on the
  [Storage](/guides/services/storage) service, which returns `null` outside the
  browser (falling back to an ephemeral in-memory store). The signal starts from
  its fallback value. Wrap a request handler in `useRunStorageScope()` when
  server-side calls must share state within one request only.
- **Effects run once at creation.** Because `useCreateEffect()` executes its
  callback immediately, an SSR pass runs effects once with the initial values.
  Keep server effects free of browser APIs, or use
  [`useIsBrowser()`](/guides/services/dom#useisbrowser) as a guard.

## Cleanup and disposal

Nothing is torn down implicitly — every primitive that can keep a subscription
or a timer alive exposes an explicit handle:

| Primitive                | Teardown handle                                                |
| ------------------------ | -------------------------------------------------------------- |
| `useCreateEffect()`      | `dispose()` returned by the helper, runs the final cleanup      |
| `useCreateSignal()`      | `getter.useSubscribe()` returns an unsubscribe function         |
| `useCreateDebouncedSignal()` | `setter.useCancel()` aborts the pending write              |
| `useCreateMemo()`        | none — it is a read-only value driven by its dependencies       |
| `useCreateBatch()`       | none — flushing is synchronous                                  |

In a component framework, call these from the matching lifecycle hook
(`onUnmounted`, `useEffect` cleanup, `onDestroy`); in a plain script, call them
when the widget is removed.

## Quick example

```ts
import {
  useCreateSignal, useCreateEffect, useCreateMemo,
  useCreateToggle, useCreateStorageSignal, useCreateDebouncedSignal,
} from "katanakit-js";

// Basic signal: callable getter + value-or-updater setter
const [count, setCount] = useCreateSignal(0);
console.log(count()); // 0
setCount(5);
console.log(count()); // 5

// Effect — re-runs when a signal read by the callback changes
const disposeEffect = useCreateEffect(() => {
  console.log("Count changed:", count());
});

// Memo — derived value, recomputed when count changes
const doubled = useCreateMemo(() => count() * 2);

// Toggle — boolean signal with useSet/useToggle helpers
const [isOpen, { useToggle }] = useCreateToggle(false);
useToggle(); // isOpen() === true

// Storage-persisted signal — reads at creation, writes through on set
const [theme, setTheme] = useCreateStorageSignal("theme", "light");

// Debounced signal — setter commits after 300 ms of quiet
const [search, setSearch] = useCreateDebouncedSignal("", 300);

// Later, during teardown
disposeEffect();
```

## Signals

### useCreateSignal(initialValue)

Creates the source primitive every other helper builds on.

**Parameters**

| Name           | Type | Description                |
| -------------- | ---- | -------------------------- |
| `initialValue` | `T`  | Initial value of the signal |

**Returns** `[SignalGetter<T>, SignalSetter<T>]`:

- the **getter** is callable (`count()`) and exposes
  `useSubscribe(listener)` — the listener receives `(newValue, oldValue)` and
  the call returns an unsubscribe function;
- the **setter** accepts either a value or an updater
  `(prev: T) => T`, so increments do not need a read-then-write sequence.

```ts
import { useCreateSignal } from "katanakit-js";

const [count, setCount] = useCreateSignal(0);

count();                       // 0
setCount(1);                   // direct value
setCount((prev) => prev + 1);  // updater — prev is the current value
count();                       // 2

const unsubscribe = count.useSubscribe((newValue, oldValue) => {
  console.log(`${oldValue} -> ${newValue}`);
});

setCount(10); // logs "2 -> 10"
unsubscribe(); // stop listening
```

**Cleanup rules and edge cases**

- **Equality gate.** Notifications fire only when `newValue !== oldValue`.
  Setting the same primitive value (or the same object reference) is silent.
  For objects and arrays, always pass a new reference
  (`setUser({ ...user, name: "Ada" })`); in-place mutation followed by
  `setUser(user)` will **not** notify.
- **Listener isolation.** A throwing listener is caught and logged through
  [`useLogger()`](/guides/services/logger) (`[createSignal] Listener error:`);
  it never breaks the setter or the other listeners.
- **Unsubscribe is not automatic.** Every `useSubscribe()` call owns its own
  removal function; clearing a component without calling it leaks the listener.
- **Batch-aware.** Inside a `batch()` block, notifications are deferred until
  the outermost batch completes (see
  [`useCreateBatch()`](#usecreatebatch)).

**Real use case** — an Astro island filter bar: hold the query and the selected
tag in signals, keep them in the client script only, and let the browser bundle
stay free of any UI framework.

```ts
const [query, setQuery] = useCreateSignal("");
const [tag, setTag] = useCreateSignal<string | null>(null);

document.querySelector("input")?.addEventListener("input", (event) => {
  setQuery((event.target as HTMLInputElement).value);
});
```

### useCreateToggle(initialValue = false)

A thin boolean specialization of `useCreateSignal()` with ergonomic setters.

**Parameters**

| Name           | Type      | Default | Description        |
| -------------- | --------- | ------- | ------------------ |
| `initialValue` | `boolean` | `false` | Starting state     |

**Returns** `[SignalGetter<boolean>, ToggleSignalSetter]` where the second item
exposes:

- `useSet(value: boolean)` — same semantics as the signal setter;
- `useToggle()` — flips the current value using an updater, so it is safe to
  call at any time, including inside `batch()`.

```ts
import { useCreateToggle } from "katanakit-js";

const [isOpen, { useSet, useToggle }] = useCreateToggle();
isOpen();    // false
useToggle();
isOpen();    // true
useSet(false);
isOpen();    // false
```

**Real use case** — a disclosure widget: the toggle drives an
`aria-expanded` attribute without duplicating boolean state in a data
attribute.

```ts
const [expanded, { useToggle }] = useCreateToggle(false);

useCreateEffect(() => {
  useSetAttribute("#faq-trigger", "aria-expanded", String(expanded()));
}, [expanded]);
```

### useCreateDebouncedSignal(initialValue, delayMs = 300)

Wraps a signal with a trailing debounce on **writes**. The getter continues to
return the last committed value; callers of the setter keep scheduling new
writes until the input goes quiet.

**Parameters**

| Name           | Type     | Default | Description                          |
| -------------- | -------- | ------- | ------------------------------------ |
| `initialValue` | `T`      | —       | Initial value                        |
| `delayMs`      | `number` | `300`   | Quiet period before the write commits |

**Returns** `[SignalGetter<T>, SignalSetter<T> & { useCancel: () => void }]`.
The setter behaves like a regular signal setter, but each call clears the
previous pending timer. `useCancel()` aborts the pending write.

```ts
import { useCreateDebouncedSignal, useCreateEffect } from "katanakit-js";

const [query, setQuery] = useCreateDebouncedSignal("", 300);

input.addEventListener("input", (event) => {
  setQuery((event.target as HTMLInputElement).value); // reschedules on each keystroke
});

// Runs only after 300 ms without typing
useCreateEffect(() => {
  const value = query().trim();
  if (value) void search(value);
}, [query]);

setQuery.useCancel(); // e.g. on widget teardown — drop any pending write
```

**Cleanup rules and edge cases**

- **Trailing only.** The first keystroke does not update the signal; only the
  last one in a burst does, `delayMs` after the burst ends.
- **Updater functions run at flush time.** Because the debounced setter
  forwards the argument to the underlying signal when the timer fires,
  `setQuery((prev) => prev + "!")` is computed against the value at flush time,
  not at call time.
- **Always cancel on teardown.** A pending `setTimeout` keeps the callback
  reachable; on the server it can also delay process shutdown. Call
  `setQuery.useCancel()` when the owning widget is removed.
- **Not a replacement for a raw signal.** Only committed values reach
  subscribers. If another part of the UI must reflect every keystroke
  immediately, keep a plain signal for the raw input and debounce the value you
  feed to expensive consumers.

**Real use case** — search-as-you-type in a vanilla widget: debounce the input
signal, then drive a fetch from an effect so the network sees one request per
pause instead of one per keystroke.

## Derived state

### useCreateMemo(computation, signals?)

Creates a **read-only derived signal**. The computation runs eagerly at
creation and whenever any dependency notifies; the result is stored in an
internal signal and exposed as a `SignalGetter<T>`.

**Parameters**

| Name          | Type                        | Description                                  |
| ------------- | --------------------------- | -------------------------------------------- |
| `computation` | `() => T`                   | Pure function deriving the value             |
| `signals`     | `Subscribable<unknown>[]`   | Optional explicit dependencies, in addition to tracked reads |

**Returns** `SignalGetter<T>` — callable, and subscribable through
`useSubscribe`, which means a memo can be used as a dependency of effects and
other memos.

```ts
import { useCreateSignal, useCreateMemo, useCreateEffect } from "katanakit-js";

const [a, setA] = useCreateSignal(2);
const [b, setB] = useCreateSignal(3);

const sum = useCreateMemo(() => a() + b());
sum(); // 5

setA(10);
sum(); // 13

// Memos are valid dependencies for effects too
useCreateEffect(() => {
  console.log("sum is", sum());
}, [sum]);
```

**Cleanup rules and edge cases**

- **Eager, not lazy.** `computation()` runs at creation even if nobody reads
  the memo, and again on every dependency change. Keep it cheap, or drive
  expensive work from an effect with your own caching.
- **Equality gate on the result.** The internal signal only notifies when the
  computed value changes (`!==`). `useCreateMemo(() => x() % 2, [x])` does not
  notify when `x` moves from `1` to `3`.
- **No dispose function.** The internal effect subscribes to the dependency
  signals for the life of the graph. Create short-lived memos only when their
  dependencies are also short-lived, or rebuild the graph per request/widget.
- **Dynamic dependencies.** Only signals read by the latest computation run
  remain automatically subscribed. Switching branches removes subscriptions to
  signals no longer read.
- **Explicit dependencies.** The optional array is additive: listed signals
  remain subscribed even if the computation does not read them. An empty array
  does not disable automatic tracking.
- **Composition.** Memos are plain `Subscribable` values, so chains like
  `subtotal → tax → total` work; reading an upstream memo tracks it automatically.

**Real use case** — derived totals in a cart: keep line items in a signal,
derive the subtotal and the formatted total with memos, and let an effect
persist or render the summary without recomputing it in every handler.

```ts
const [items, setItems] = useCreateSignal<CartItem[]>([]);

const subtotal = useCreateMemo(
  () => items().reduce((sum, item) => sum + item.price * item.qty, 0),
  [items],
);

const total = useCreateMemo(() => subtotal() * 1.21, [subtotal]);
```

## Effects

### useCreateEffect(callback, signals?)

Runs a side effect immediately, then again whenever a signal read by the
callback emits a new value. This is the bridge between the reactive graph and
the outside world: DOM updates, logging, storage writes, network calls.

**Parameters**

| Name       | Type                              | Description                                      |
| ---------- | --------------------------------- | ------------------------------------------------ |
| `callback` | `() => void \| (() => void)`      | Effect body; may return a cleanup function       |
| `signals`  | `Subscribable<unknown>[]`         | Optional explicit dependencies, in addition to tracked reads |

**Returns** `() => void` — a dispose function that runs the final cleanup and
unsubscribes from every dependency.

```ts
import { useCreateSignal, useCreateEffect } from "katanakit-js";

const [name, setName] = useCreateSignal("world");

const dispose = useCreateEffect(() => {
  console.log(`Hello, ${name()}!`);
  return () => console.log("cleaning up");
});

setName("Katana"); // logs "cleaning up", then "Hello, Katana!"
dispose();         // runs the final cleanup and unsubscribes
```

**Cleanup rules and edge cases**

- **Immediate first run.** The callback executes synchronously during creation,
  so the effect reflects the initial state without an extra manual call.
- **Cleanup before every re-run.** If the callback returns a function, it runs
  before the next execution and once more on `dispose()` — the right place to
  clear timers, abort fetches or detach listeners.
- **Call `dispose()` once.** The returned function is not idempotent; invoking
  it twice runs the final cleanup twice. Keep the reference and drop it after
  teardown.
- **Errors are contained.** Exceptions thrown by the callback or by a cleanup
  are caught and logged through [`useLogger()`](/guides/services/logger)
  (`[createEffect] ...`); they never propagate to the setter.
- **Dynamic dependencies.** The effect tracks signals read during each run.
  When conditional reads change, subscriptions to signals no longer read are
  removed. The optional explicit array keeps listed signals subscribed even if
  they are not read; entries without `useSubscribe` are ignored.
- **Batched notifications.** Inside `batch()`, the effect runs once per queued
  notification when the outermost batch flushes, reading the final state.

**Real use case** — synchronize a preference with the document and the network:
the effect applies the theme to the root element and persists it, and its
cleanup detaches the class when the widget unmounts.

```ts
const [theme, setTheme] = useCreateStorageSignal("theme", "light");

const dispose = useCreateEffect(() => {
  const root = useGetRoot();
  if (!root) return;
  useToggleClass(root, "dark", theme() === "dark");
  return () => useRemoveClass(root, "dark");
});
```

### useCreateBatch()

Returns a `batch(callback)` function that **defers signal notifications** until
the callback completes. All primitives created by this module cooperate with
it — signals queue their notifications, and effects/memos run on the flush.

**Returns** `(callback: () => void) => void`.

```ts
import { useCreateBatch, useCreateSignal, useCreateEffect } from "katanakit-js";

const batch = useCreateBatch();
const [first, setFirst] = useCreateSignal("Ada");
const [last, setLast] = useCreateSignal("Lovelace");

useCreateEffect(() => {
  render(`${first()} ${last()}`);
}, [first, last]);

batch(() => {
  setFirst("Grace");
  setLast("Hopper");
  // No subscriber runs with an intermediate combination
});
```

**Cleanup rules and edge cases**

- **Nested batches are safe.** Only the outermost `batch()` flushes; an inner
  call simply joins the active queue.
- **Deferral, not coalescing.** Batching does not merge writes. If an effect
  subscribes to two changed signals it still runs once per notification at
  flush, always reading the final state; direct `useSubscribe` listeners
  receive each change in order with its historical `(newValue, oldValue)` pair.
- **Synchronous by design.** The callback type returns `void`; keep it
  synchronous. Awaiting inside a batch closes the batch before the async work
  finishes and reintroduces intermediate notifications.
- **Errors do not swallow the flush.** A throwing callback is caught and logged
  (`[createBatch] Batch block error:`), and the queued notifications still run.
- **Reusable.** `useCreateBatch()` returns a stable function bound to the
  module-level queue; create it once and reuse it across handlers.

**Real use case** — a submit handler that updates several related fields (name,
email, dirty flag) must not re-render or persist three times: wrap the writes
in `batch()` and subscribers observe one consistent update cycle.

## Stores / persistence

### useCreateStorageSignal(key, fallbackValue, target = "localStorage")

Creates a signal whose value is read from a storage backend at creation and
written back on every setter call. It composes the
[Storage](/guides/services/storage) service, inheriting its SSR-safe and
private-mode-safe behavior.

Because it is the one reactive helper that performs I/O, it is implemented in
the infrastructure layer (`storage/storage-signal.service.ts`) rather than in
`core/`, and still exported from the main barrel — the import below is
unchanged. See
[ADR-0004](/explanation/decisions/adr-0004-hexagonal-core) for the layering
rule and the regression test that enforces it.

**Parameters**

| Name            | Type                          | Default          | Description                              |
| --------------- | ----------------------------- | ---------------- | ---------------------------------------- |
| `key`           | `string`                      | —                | Storage key                              |
| `fallbackValue` | `T`                           | —                | Value used when the key is absent        |
| `target`        | `"localStorage" \| "sessionStorage"` | `"localStorage"` | Backend to read from and write to |

**Returns** `[SignalGetter<T>, SignalSetter<T>]`. The setter accepts a value or
an updater and writes through to storage; the updater form computes the next
value against the current signal before persisting it.

```ts
import { useCreateStorageSignal } from "katanakit-js";

const [theme, setTheme] = useCreateStorageSignal<"light" | "dark">("theme", "light");

theme();          // "light" on first visit, or the stored value afterwards
setTheme("dark"); // updates the signal and writes to localStorage

const [token, setToken] = useCreateStorageSignal("token", "", "sessionStorage");

setToken((prev) => `${prev}-refreshed`); // updater is persisted too
```

**Cleanup rules and edge cases**

- **Reads happen once.** Only creation reads storage; a second tab writing the
  same key does not update this signal (no `storage` event subscription).
  Recreate the signal or call `useGetStorage(key, target)` to re-read.
- **Writes happen on every call.** Unlike notifications, storage is written
  even when the new value equals the previous one.
- **Serialization.** Values are stored as JSON; strings are stored raw. Keep
  values JSON-serializable (no `Map`, `Set`, `Date` instances or functions).
- **SSR fallback.** Outside the browser the Storage service returns `null`, so
  the signal starts from `fallbackValue`; writes go to an ephemeral in-memory
  store. Use `useRunStorageScope()` around a server handler to share that
  in-memory store within a single request.
- **Removal is separate.** The setter cannot delete the key; call
  `useRemoveStorage(key, target)` from the Storage service when the preference
  should be forgotten.
- **Quota and private mode are silent.** Failed writes are ignored by the
  storage strategy; the in-memory signal keeps working for the session.

**Real use case** — theme and locale preferences that must survive reloads but
degrade gracefully during SSG: the same module renders on the server with the
fallback and picks up the persisted value in the browser.

## Related

- [DOM](/guides/services/dom) — SSR-safe helpers to apply reactive state to the
  document.
- [Watch](/guides/watch) — generic reactive watcher for Vue refs, reactive
  objects and getter functions.
- [Query Client](/guides/query-client) — server-state caching, retries and
  invalidation built on top of these primitives.
- [Storage](/guides/services/storage) — the backend behind
  `useCreateStorageSignal()`, including SSR scoping.
- [API Reference](/api/) — every export, generated from source.
