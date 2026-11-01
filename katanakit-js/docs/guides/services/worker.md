---
title: Worker
description: "Off-thread execution for pure functions — one-shot workers, keyed pools, registry lifecycle, SSR fallbacks and error propagation, every export explained."
---

# Worker

`worker.service.ts` is a **function module**: standalone `use*` helpers backed by
a module-level registry (`Map<string, WorkerPoolEntry>`) keyed by string. There
is no service instance and no `.getInstance()` — you import the helpers and call
them directly. None of the exports take an options object or expose tunable
defaults; every signature below is exact.

The module offers two execution shapes:

- **One-shot work** — [`useRun()`](#userunworkerfunc-data) spins up a dedicated
  Worker per call and destroys it the moment the task settles.
- **Keyed pools** — [`useCreatePool()`](#usecreatepoolkey-workerfunc) keeps one
  Worker alive under a string key and
  [`useRunPool()`](#userunpoolkey-data) reuses it across calls.

Two constraints shape every function on this page:

1. **Function workers only.** KatanaKit serializes `workerFunc` with
   `Function.prototype.toString()` and embeds the source in a Blob URL. There is
   no module-worker mode (`new Worker(new URL("./worker.ts", import.meta.url))`).
   The function must therefore be **pure and self-contained**: no closures over
   module variables, no imported identifiers, no DOM. It runs in the worker
   global scope, where only worker globals such as `self`, `crypto` and
   `TextEncoder` exist. Pass standalone arrow functions or function
   declarations; object-method shorthand (`method() {}`) stringifies to syntax
   that cannot stand alone and will fail in the worker.
2. **Structured-cloneable data only.** Input and output cross the thread
   boundary through `postMessage`; `ArrayBuffer`/typed arrays are copied, not
   transferred (the API exposes no transfer list). Functions, DOM nodes and
   class instances with methods do not survive the trip.

**SSR behavior.** When `window` or `Worker` is unavailable, both runners execute
`workerFunc` inline on the main thread and return a resolved promise. Your
module stays importable from server components and pre-render passes — it just
loses the off-thread benefit. `useCreatePool()` still registers the key, so the
rest of the registry API behaves consistently.

**Cleanup model.** One-shot workers always terminate themselves and revoke their
object URL — on success, on failure and on non-cloneable errors. Pooled workers
live until you terminate them, and termination rejects every in-flight task with
`Worker pool "<key>" was terminated` instead of leaving promises hanging.

Errors never cross the boundary as `Error` objects: the worker reports a string,
and the main thread rejects with a fresh `Error` carrying only that message.
Original types and stack traces are not preserved.

| Export | Signature | Returns |
| --- | --- | --- |
| `useRun` | `<TInput, TOutput>(workerFunc, data)` | `Promise<TOutput>` |
| `useCreatePool` | `<TInput, TOutput>(key, workerFunc)` | `void` |
| `useRunPool` | `<TInput, TOutput>(key, data)` | `Promise<TOutput>` |
| `useTerminate` | `(key)` | `void` |
| `useTerminateAll` | `()` | `void` |
| `useHasWorker` | `(key)` | `boolean` |
| `useWorkerKeys` | `()` | `string[]` |

## Quick example

```ts
import {
  useRun, useCreatePool, useRunPool, useTerminate,
} from "katanakit-js";

// One-shot: a fresh worker per call, destroyed as soon as it answers
const doubled = await useRun((n: number) => n * 2, 21);
console.log(doubled); // 42

// Keyed pool: one long-lived worker reused across calls
useCreatePool<number, number>("math:square", (n) => n ** 2);
const a = await useRunPool<number, number>("math:square", 9);  // 81
const b = await useRunPool<number, number>("math:square", 12); // 144

// Tear the pool down when the feature unmounts
useTerminate("math:square");
```

## Creating & running

One-shot execution is the simplest path: no registry entry, no bookkeeping, and
the worker disappears the moment it replies.

### useRun(workerFunc, data)

Runs `workerFunc` in a **dedicated, one-shot Worker** and returns its result. In
the browser the sequence is: serialize the function, build a Blob and an object
URL, instantiate the Worker, post `data`, and settle the promise on the first
reply. The worker is terminated and the object URL revoked as soon as the
promise settles — success or failure.

Use it for isolated jobs that will not repeat often enough to justify a pool.
Every call pays the worker startup cost, so a loop of `useRun()` calls is a
smell: register a pool instead.

**Parameters**

- `workerFunc` — `WorkerFunc<TInput, TOutput>`, that is
  `(data: TInput) => TOutput | Promise<TOutput>`. Serialized with
  `Function.prototype.toString()`: it must be pure, self-contained and written
  in plain JavaScript. Helpers defined *inside* the function travel with it.
- `data` — the single argument passed to `workerFunc`. Must be
  structured-cloneable; `postMessage` copies it into the worker.

**Returns** — `Promise<TOutput>`, resolving with whatever the worker produced.
Async functions are awaited inside the worker before the reply is posted.

**Edge cases**

- There is **no cancellation handle**: a one-shot worker cannot be aborted from
  outside. Combine with `useRace()` from Timing when you need a deadline.
- A synchronous throw in the SSR fallback still surfaces as a **rejected
  promise**, because `useRun()` is `async`.
- The wire contract is `{ ok: true, payload }` or `{ ok: false, error }`. Error
  messages are flattened; type and stack are lost.
- A non-cloneable return value is caught by the worker's own promise chain and
  reported as an error message, not as a resolved payload.
- Blob creation happens inside a `try` block, so a failure there rejects with
  the original exception rather than throwing synchronously.

| Failure | What the caller receives |
| --- | --- |
| `workerFunc` throws or rejects | `Error` with the original message |
| Worker startup/runtime failure (`onerror`) | `Error("Worker error: <message>")` |
| Message could not be deserialized (`onmessageerror`) | `Error("Worker returned a non-cloneable value.")` |
| `data` is not cloneable | The original `DataCloneError` from `postMessage` |
| Blob or Worker construction fails | The original error from the `try` block |

```ts
import { useRun } from "katanakit-js";

const doubled = await useRun((n: number) => n * 2, 21);
console.log(doubled); // 42

const upper = await useRun(async (lines: string[]) => {
  await Promise.resolve(); // async work is awaited inside the worker
  return lines.map((line) => line.toUpperCase());
}, ["a", "b"]);
console.log(upper); // ["A", "B"]
```

**Real use case** — CSV parsing on demand. A report screen lets the user drop a
large CSV file; parsing it on the main thread would freeze scrolling and paint.
The worker owns the whole transformation, and the UI thread only receives the
finished rows:

```ts
import { useRun } from "katanakit-js";

type CsvRow = Record<string, string>;

const rows = await useRun((csv: string): CsvRow[] => {
  const [headerLine, ...lines] = csv.trim().split("\n");
  const header = headerLine.split(",");
  return lines.map((line) => {
    const cells = line.split(",");
    return Object.fromEntries(
      header.map((key, index) => [key, cells[index] ?? ""]),
    );
  });
}, csvText);

console.table(rows.slice(0, 3));
```

## Pools

A pool is **one Worker plus a pending-task map**. Every
[`useRunPool()`](#userunpoolkey-data) call gets a unique `__taskId`; the worker
echoes it back, and the caller removes its own listeners before settling. That
correlation is what makes concurrent calls safe: reply A can never resolve call
B. Reusing the same worker avoids the startup cost that `useRun()` pays on every
call, which matters when the same transformation runs dozens of times.

A pool holds exactly **one worker** — it is a reuse unit, not a thread pool of N
workers, and it has no built-in concurrency limit. Dispatch as many tasks as you
want; the worker's event loop orders them, and async functions may interleave.

### useCreatePool(key, workerFunc)

Registers a **reusable Worker** under a string key. In the browser the same
serialization used by `useRun()` happens once; the worker then stays alive until
you terminate it. In SSR it registers a placeholder entry with no worker, so
`useHasWorker()`, `useWorkerKeys()` and `useRunPool()` keep working with inline
execution.

**Parameters**

- `key` — unique string identifying the pool. Any string works, but namespace it
  (`"images:grayscale"`, `"crypto:sha256"`) to avoid collisions across features.
- `workerFunc` — same contract and constraints as `useRun()`.

**Returns** — `void`. The key is the handle; there is no pool object to keep.

**Edge cases**

- **Duplicate keys:** if the key is already registered, the existing pool is
  terminated first — its in-flight promises reject with
  `Worker pool "<key>" was terminated` — and a new worker replaces it.
- The function is **fixed for the pool's lifetime**. To change behavior, call
  `useCreatePool()` again with the same key (which tears the old worker down) or
  terminate first.
- There is **no idle timeout**: an unused pool keeps its worker alive until
  `useTerminate()` / `useTerminateAll()`. Register pools at the boundary of the
  feature that owns them so lifetime is obvious.
- Creating a pool does not run anything; it only provisions the worker.

```ts
import { useCreatePool, useRunPool } from "katanakit-js";

useCreatePool<number, number>("math:square", (n) => n ** 2);

const squared = await useRunPool<number, number>("math:square", 9);
console.log(squared); // 81

// Re-registering swaps the function and the worker
useCreatePool<number, number>("math:square", (n) => n ** 3);
console.log(await useRunPool<number, number>("math:square", 3)); // 27
```

**Real use case** — image processing. Register the grayscale transform once at
the boundary of the editor feature; the pool survives route changes in an SPA,
so the second photo never pays worker startup again:

```ts
import { useCreatePool } from "katanakit-js";

type Frame = { data: Uint8ClampedArray; width: number; height: number };

useCreatePool<Frame, Frame>("images:grayscale", (frame) => {
  const out = new Uint8ClampedArray(frame.data.length);
  for (let i = 0; i < frame.data.length; i += 4) {
    const gray =
      0.299 * frame.data[i] + 0.587 * frame.data[i + 1] + 0.114 * frame.data[i + 2];
    out[i] = out[i + 1] = out[i + 2] = gray;
    out[i + 3] = frame.data[i + 3];
  }
  return { data: out, width: frame.width, height: frame.height };
});
```

### useRunPool(key, data)

Dispatches a task to the worker registered under `key` and resolves with its
result. Internally: generate a task id, register per-task `message` and `error`
listeners, store a pending entry, post `{ __taskId, payload: data }`, and clean
up every listener as soon as the matching reply arrives.

**Parameters**

- `key` — a key previously passed to `useCreatePool()`.
- `data` — the task input, structured-cloneable.

**Returns** — `Promise<TOutput>`.

**Edge cases**

- **Unknown key:** returns an immediately rejected promise with
  `Worker pool "<key>" not found`. Note the semantics: it is a *rejection*, not
  a synchronous throw, so a bare `try/catch` around the call will not see it —
  `await` it or attach `.catch()`.
- **SSR fallback:** `entry.func(data)` runs inline. Because `useRunPool()` is
  not `async`, a synchronous throw here propagates synchronously instead of
  rejecting; guard with `useAttempt()` at application boundaries.
- **Concurrency:** tasks are posted in call order and processed by the single
  worker's event loop; async results may interleave. Use several pool keys when
  you genuinely need parallel CPU lanes.
- **Worker-level failures** (for example, a function source that fails to parse
  when the worker starts) fire an `error` event on the shared worker and reject
  **every in-flight task** of that pool, not just one.
- Return values must survive structured cloning, exactly as with `useRun()`.

```ts
import { useCreatePool, useRunPool } from "katanakit-js";

useCreatePool<string, number>("text:count", (text) => text.length);

// Concurrent calls share the worker; __taskId keeps replies correlated
const [title, body] = await Promise.all([
  useRunPool<string, number>("text:count", "KatanaKit"),
  useRunPool<string, number>("text:count", "Worker pool"),
]);

console.log(title, body); // 9 11
```

**Real use case** — crypto hashing. Hashing CPU-bound payloads off the main
thread keeps typing and scrolling smooth, and the pool reuses the same worker
across an entire batch. `crypto.subtle`, `TextEncoder` and typed arrays are all
worker globals, so the same function runs in the browser worker and in the SSR
fallback (Node 22 exposes the same globals):

```ts
import { useCreatePool, useRunPool } from "katanakit-js";

useCreatePool<string, string>("crypto:sha256", async (text) => {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
});

const hashes = await Promise.all(
  chunks.map((chunk) => useRunPool<string, string>("crypto:sha256", chunk)),
);

console.log(hashes.length);
```

## Lifecycle

The registry is observable and explicitly torn down. Nothing is garbage
collected automatically: pools exist until terminated, so treat pool lifetime
as owned by the feature that registered them.

### useTerminate(key)

Terminates the pool registered under `key` and rejects every task still in
flight. The sequence is: reject pending tasks with
`Error("Worker pool \"<key>\" was terminated")`, remove their listeners, call
`worker.terminate()`, revoke the object URL, and delete the registry entry.

**Parameters** — `key`, the pool to destroy. Unknown keys are a silent no-op, so
double termination is safe.

**Returns** — `void`. Termination is synchronous; the rejections land on the
microtask queue.

**Edge cases**

- In-flight callers receive a rejection — handle it (`await` inside `try/catch`,
  or `useAttempt()`) or the console will report an unhandled rejection.
- After termination, `useHasWorker(key)` is `false` and `useRunPool(key, …)`
  rejects with "not found" until the pool is registered again.
- In SSR the worker placeholder is skipped, but pending bookkeeping and the
  registry entry are still cleaned up.

```ts
import { useCreatePool, useHasWorker, useRunPool, useTerminate } from "katanakit-js";

useCreatePool<string, number>("text:length", (text) => text.length);

const job = useRunPool<string, number>("text:length", "hello");
useTerminate("text:length"); // rejects `job` immediately

await job.catch((error) => console.warn(error.message));
// Worker pool "text:length" was terminated

console.log(useHasWorker("text:length")); // false
```

**Real use case** — leaving the image editor route. In-flight grayscale jobs
have no value once the view is gone; terminating the pool cancels them at once
and frees the worker thread instead of letting stale frames complete:

```ts
import { useTerminate } from "katanakit-js";

onRouteLeave(() => {
  useTerminate("images:grayscale");
});
```

### useTerminateAll()

Iterates every key in the registry and calls `useTerminate()` on each, rejecting
all in-flight tasks across all pools. Safe to call when no pools are registered.

**Returns** — `void`.

**Edge cases**

- It delegates to `useTerminate()` per key, so every per-pool guarantee applies.
- It does **not** track one-shot `useRun()` workers — those manage their own
  lifecycle and are already gone by the time they settle.
- Useful in hot-reload hooks and app-level unmount handlers; keep it out of
  render paths, since it kills work other components may still be awaiting.

```ts
import { useTerminateAll, useWorkerKeys } from "katanakit-js";

console.log(useWorkerKeys()); // ["math:square", "crypto:sha256"]
useTerminateAll();
console.log(useWorkerKeys()); // []
```

**Real use case** — session teardown. On logout, drop every background
computation before clearing user state, so no late worker reply repopulates a
store that is being reset:

```ts
import { useTerminateAll } from "katanakit-js";

export function onSessionEnd() {
  useTerminateAll(); // reject and cancel all pooled work
  resetStores();
}
```

### useHasWorker(key)

`true` when a pool is registered under `key`, whether it was created in the
browser or via the SSR fallback. Pure registry lookup: no worker is touched and
nothing is created.

**Parameters** — `key` to look up.

**Returns** — `boolean`.

**Edge cases** — a key that was never created, or one already terminated,
returns `false`. This is the cheap guard before dispatching or provisioning, and
it also lets a re-run effect avoid tearing down a pool that already exists (and
with it, in-flight tasks).

```ts
import { useCreatePool, useHasWorker } from "katanakit-js";

if (!useHasWorker("text:length")) {
  useCreatePool<string, number>("text:length", (text) => text.length);
}
```

**Real use case** — effect hardening. Frameworks that run effects twice in
development (React StrictMode, for instance) can call the guard before
`useCreatePool()`, so the second run does not terminate and rebuild the pool
while the first task is still in flight.

### useWorkerKeys()

Returns a snapshot array of every registered pool key, in insertion order.

**Returns** — `string[]`. The array is a copy (`Array.from(map.keys())`), so
mutating it does not affect the registry.

**Edge cases** — empty array when no pools exist. The snapshot is taken at call
time; keys created or terminated afterwards will not appear or disappear.

```ts
import { useHasWorker, useWorkerKeys } from "katanakit-js";

const active = useWorkerKeys();
console.table(active.map((key) => ({ key, alive: useHasWorker(key) })));
```

**Real use case** — a diagnostics panel or a test assertion that no pool leaked.
Because `useTerminateAll()` empties the registry, pairing the two is the
canonical teardown check:

```ts
import { afterEach, expect } from "vitest";
import { useTerminateAll, useWorkerKeys } from "katanakit-js";

afterEach(() => {
  useTerminateAll();
  expect(useWorkerKeys()).toEqual([]);
});
```

## Related

- [Generator](/guides/services/generator) — `useHash()` and `usePbkdf2Hash()`
  for the hashing work you may want to move into a worker.
- [Timing](/guides/services/timing) — `useRace()` and `useDebounce()` to bound
  how often pool tasks are dispatched.
- [Filesystem](/guides/filesystem) — read the CSV files and binary assets that
  `useRun()` processes.
- [API Reference](/api/) — every export on this page, generated from source.
