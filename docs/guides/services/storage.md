---
title: Storage
description: "Typed local and session storage with JSON serialization, strategy objects and an SSR-safe in-memory fallback — every helper explained."
---

# Storage

`storage.service.ts` is a **function module**: standalone `use*` helpers with no
instance to create. Behind them sits a strategy pattern — each call resolves a
`StorageStrategy` (`LocalStorageStrategy`, `SessionStorageStrategy` or
`MemoryStorageStrategy`) for the backend you target, so the same API works in
the browser, in private mode and on the server. Three design rules apply:

1. **Never throws** — reads return `null` when the key is missing or the
   backend is unavailable; writes, removals and clears silently ignore quota
   errors, private-mode restrictions and unavailable storage. There is no Safe
   Result here: persistence is best-effort by contract.
2. **JSON by convention** — plain strings are stored verbatim; every other
   value is serialized with `JSON.stringify`. Reads go through
   [`onTryJsonParse()`](/start/errors), and values that are not valid JSON
   fall back to the raw string (the legacy contract for keys written by other
   code).
3. **SSR-safe with request isolation** — outside the browser the module falls
   back to in-memory storage. Wrap a server request in
   [`onRunStorageScope()`](#onrunstoragescopefn) to share values within that
   request without leaking them across requests.

Web Storage semantics still apply underneath: `localStorage` persists across
sessions and is shared by every tab of the same origin, while `sessionStorage`
lives only for the tab and survives reloads. The module does **not** subscribe
to the `storage` event, so a value written by another tab is picked up on the
next `onGetStorage()` call but never notifies you reactively. The in-memory
fallback lasts only as long as the page or the server scope that owns it.

## Quick example

```ts
import {
  onSetStorage, onGetStorage, onRemoveStorage, onClearStorage, onRunStorageScope,
} from "katanakit-js";

await onRunStorageScope(() => {
  onSetStorage("user", { name: "John", role: "admin" });
  onSetStorage("theme", "dark");

  const user = onGetStorage<{ name: string; role: string }>("user");
  const theme = onGetStorage<string>("theme"); // "dark"

  onRemoveStorage("theme");
  onClearStorage();
});
```

In the browser the same calls run directly — the scope wrapper is a no-op
there:

```ts
import { onGetStorage, onSetStorage } from "katanakit-js";

onSetStorage("sidebar:collapsed", true);

const collapsed = onGetStorage<boolean>("sidebar:collapsed") ?? false;
```

## Backends at a glance

| Target             | Underlying API          | Lifetime                          | Scope                       | Server behavior                     |
| ------------------ | ----------------------- | --------------------------------- | --------------------------- | ----------------------------------- |
| `"localStorage"`   | `window.localStorage`   | Persists across sessions          | Shared by all tabs, same origin | Memory strategy per request/scope   |
| `"sessionStorage"` | `window.sessionStorage` | Until the tab closes              | One tab                     | Memory strategy per request/scope   |
| Memory fallback    | `createMemoryStorage()` | Current page or server scope      | One strategy instance       | Default when no browser is present  |

## Reading & writing

### onGetStorage(key, target?)

Reads a key and deserializes it. `key` is the storage key, and `target`
selects the backend (`"localStorage"` by default, or `"sessionStorage"`).

Returns the parsed value typed as `T` (default `unknown`), or `null` when the
key does not exist, the storage is unavailable, or `getItem` throws.

```ts
import { onGetStorage } from "katanakit-js";

const token = onGetStorage<string>("auth_token");
const session = onGetStorage<SessionData>("session", "sessionStorage");
const collapsed = onGetStorage<boolean>("sidebar:collapsed") ?? false;
```

Two edge cases are worth internalizing:

- **Numeric-looking strings become numbers.** `onSetStorage("count", "42")`
  stores the raw string `"42"`, but `onGetStorage("count")` parses it as JSON
  and returns the number `42`. If you need the string back, read it and coerce,
  or store it inside an object.
- **`null` is ambiguous.** A missing key and a stored `null` (serialized as
  `"null"`) both come back as `null`. Prefer a dedicated sentinel value when
  the distinction matters.

**Real use case** — hydrating a UI preference before the first render, with a
safe fallback when nothing was ever stored:

```ts
import { onGetStorage } from "katanakit-js";

const mode = onGetStorage<"light" | "dark">("theme:mode") ?? "system";
const columns = onGetStorage<number>("table:columns") ?? 4;
```

### onSetStorage(key, value, target?)

Writes a value under `key` on the selected `target` (`"localStorage"` by
default). Strings are stored verbatim; anything else goes through
`JSON.stringify`. Returns `void` — and never throws.

```ts
import { onSetStorage } from "katanakit-js";

onSetStorage("auth_token", "abc123");
onSetStorage("user", { name: "Alice" }, "sessionStorage");
```

Serialization follows JSON rules: functions and `undefined` properties are
dropped, `Date` objects become ISO strings and `undefined` itself is stored as
the literal string `"undefined"`. When the backend rejects the write — quota
exceeded, Safari private mode, storage disabled by the user — the failure is
swallowed on purpose; check with a follow-up `onGetStorage()` if the write
must be confirmed.

**Real use case** — persisting table state so the view survives a reload:

```ts
import { onSetStorage } from "katanakit-js";

function persistFilters(filters: TableFilters) {
  onSetStorage("table:filters", filters);
  onSetStorage("table:updatedAt", Date.now());
}
```

### onRemoveStorage(key, target?)

Deletes a single key from the selected backend. Removing a key that does not
exist is a no-op, and unavailable storage is ignored — so it is safe to call
in cleanup paths and during logout regardless of environment.

```ts
import { onRemoveStorage } from "katanakit-js";

onRemoveStorage("auth_token");
onRemoveStorage("draft", "sessionStorage");
```

**Real use case** — logout: clear credentials from every backend the app
might have used, without worrying about which one is present:

```ts
function logout() {
  onRemoveStorage("auth_token");
  onRemoveStorage("auth_token", "sessionStorage");
  onRemoveStorage("user", "sessionStorage");
}
```

### onClearStorage(target?)

Removes **every key** from the selected backend (`"localStorage"` by default).
Use it for an explicit "reset app" action, not for routine cleanup.

```ts
import { onClearStorage } from "katanakit-js";

onClearStorage("sessionStorage");
```

Because Web Storage is scoped by origin, `onClearStorage()` also wipes keys
written by other libraries or other apps on the same origin. When only your
keys should disappear, remove them one by one with
[`onRemoveStorage()`](#onremovestoragekey-target).

**Real use case** — a support "reset application state" button that also
drops the user's cached preferences:

```ts
function resetApp() {
  onClearStorage();
  onClearStorage("sessionStorage");
  location.reload();
}
```

## SSR & request isolation

### onRunStorageScope(fn)

Runs `fn` against a dedicated pair of in-memory strategies and resolves with
its return value. The function is always async (it returns `Promise<T>`, even
in the browser) and `fn` may be synchronous or return a promise.

- **Browser:** calls `fn()` directly — no scope machinery is involved.
- **Node/Bun SSR:** lazily imports `node:async_hooks` on first use, swaps in a
  real `AsyncLocalStorage`, and runs `fn` with isolated strategies. The import
  is shared, so concurrent first calls await the same promise.

```ts
import { onRunStorageScope, onSetStorage, onGetStorage } from "katanakit-js";

export default defineEventHandler((event) => {
  return onRunStorageScope(() => {
    onSetStorage("req-id", event.context.id);
    return onGetStorage("req-id");
  });
});
```

**The critical gotcha:** on the server, calls made **outside** a scope resolve
a fresh ephemeral memory store on every invocation. That means
`onSetStorage("a", 1)` followed immediately by `onGetStorage("a")` returns
`null` — the write is not visible to the next call. Wrap the whole request
handler so every write and read inside shares the same scope. Inside the
scope, values persist for the duration of `fn` and are discarded when it
settles.

**Real use case** — per-request flash messages in a server-rendered form:
store the message alongside the validation pass, read it later in the same
request, and let the scope discard it automatically so the next visitor starts
clean.

## Strategies

Strategies are plain objects implementing the `StorageStrategy` interface.
The public `use*` helpers below always resolve one internally, but the
factories are exported so you can inject them into tests, wrap a custom
backend, or drive storage directly without the module-level resolution.

### LocalStorageStrategy(storage?)

Returns a `StorageStrategy` backed by the given `Storage` instance, defaulting
to `window.localStorage`. When no backend can be resolved (SSR, denied
access), it returns a [`MemoryStorageStrategy()`](#memorystoragestrategy)
instead, so the result is always safe to call.

```ts
import { LocalStorageStrategy } from "katanakit-js";

const strategy = LocalStorageStrategy();
strategy.onSetItem("token", "abc123");

const token = strategy.onGetItem<string>("token"); // "abc123"
strategy.onRemoveItem("token");
```

Note the difference from the internal resolution: this factory does not probe
the backend, so in a browser where `window.localStorage` exists but rejects
writes (private mode), it returns a web-backed strategy whose writes fail
silently. The module-level `onSetStorage()` path probes first and falls back
to memory; call the factory directly only when you control the storage
instance.

**Real use case** — testing persistence without touching a real browser:
inject a fake `Storage` object and assert the calls your code makes.

### SessionStorageStrategy(storage?)

The `sessionStorage` twin of the factory above: uses the supplied `Storage`
instance or `window.sessionStorage`, and degrades to an in-memory strategy
when the backend is unavailable. The only behavioral difference is the
lifetime of the underlying Web Storage — per tab, cleared when it closes.

```ts
import { SessionStorageStrategy } from "katanakit-js";

const strategy = SessionStorageStrategy();
strategy.onSetItem("wizard-step", 2);

strategy.onGetItem<number>("wizard-step"); // 2
```

**Real use case** — a multi-step checkout wizard: keep the in-progress step in
`sessionStorage` so a reload on the same tab resumes where the user left off,
while a fresh tab starts from scratch.

### MemoryStorageStrategy()

Returns a `StorageStrategy` over a brand-new in-memory store created by
[`createMemoryStorage()`](#creatememorystorage). Each call owns its own `Map`,
so two strategies never share data.

```ts
import { MemoryStorageStrategy } from "katanakit-js";

const strategy = MemoryStorageStrategy();
strategy.onSetItem("temp", "value");

strategy.onGetItem<string>("temp"); // "value"
```

**Real use case** — unit tests for code that depends on storage: the memory
strategy is deterministic, synchronous and disappears with the test, with no
cleanup between cases.

### createMemoryStorage()

Creates a new `Storage` instance implementing the Web Storage API
(`getItem`, `setItem`, `removeItem`, `clear`, `key(index)` and a live
`length` getter) on top of a private `Map`. `key(index)` follows insertion
order.

```ts
import { createMemoryStorage } from "katanakit-js";

const mem = createMemoryStorage();
mem.setItem("key", JSON.stringify({ a: 1 }));

mem.length;            // 1
mem.getItem("key");    // '{"a":1}'
mem.key(0);            // "key"
mem.removeItem("key");
```

Each call returns an independent store — **never share one across server
requests**, or you reintroduce exactly the cross-request leak that
[`onRunStorageScope()`](#onrunstoragescopefn) prevents.

## Types

### StorageTarget and StorageStrategy

The `target` argument is typed as `StorageTarget`, and every factory returns
the `StorageStrategy` contract. Both are exported from the package root:

```ts
type StorageTarget = "localStorage" | "sessionStorage";

interface StorageStrategy {
  onGetItem<T = unknown>(key: string): T | null;
  onSetItem(key: string, value: unknown): void;
  onRemoveItem(key: string): void;
  onClear(): void;
}
```

The interface methods use the same `use*` prefix as the public API, which
makes implementations easy to fake: a test double only needs these four
methods.

## Related

- [Theme](/guides/services/theme) — theme modes persisted through storage.
- [Reactive](/guides/services/reactive) — `onCreateStorageSignal()` wraps these helpers into a signal that writes through to storage.
- [DOM](/guides/services/dom) — composes storage for dismissible banners.
- [Error Handling](/start/errors) — `onTryJsonParse()`, the parser behind `onGetStorage()`.
- [Query Client](/guides/query-client) — caching and persisting server state.
- [API Reference](/api/functions/onGetStorage) — every export, generated from source.
