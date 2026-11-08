---
title: Timing
description: "Managed timeouts, intervals, debounce, throttle, retries and timeout races — every timing helper explained."
---

# Timing

`timing.service.ts` hosts the Singleton facade `TimingService`, whose methods
are re-exported as thin `use*` wrappers, so there is no instance to create.
The public surface covers three jobs — one-shot delays,
recurring timers, and rate-limiting wrappers — plus `useSleep()` and
`useRetry()`, re-exported here from `utils.service.ts` because they belong to
the same timing toolbox. Every function is imported directly from
`"katanakit-js"`.

Three design rules apply across the page:

1. **Managed timers over raw `setTimeout`.** Every helper owns its timer
   lifecycle and exposes a proper handle: `TimeoutControl` has
   `promise` + `cancel()`, `IntervalControl` has `pause()`/`resume()`/`stop()`.
   Intervals use **recursive `setTimeout`**, so async callbacks never overlap:
   the next tick is only scheduled after the current callback settles. This
   guarantees a gap of at least `ms` between executions, at the cost of exact
   cadence when callbacks run long.
2. **Errors are routed, not lost.** `useSetTimeout()` and `useRace()` reject
   their promises so you can `await` them. The fire-and-forget wrappers
   (`useInterval`, `useDebounce*`, `useThrottle*`, `useRepeat`) catch callback
   errors, log them through the Logger service, and keep going — one bad tick
   never kills an interval.
3. **SSR-safe, but mind the event loop.** Nothing here touches `window` or
   `document`, so calling any helper on the server is safe. The flip side:
   timers keep a Node/Bun process alive and serverless runtimes may cut them
   off when the request ends. Always `stop()` intervals and `cancel()` pending
   timeouts at the end of a request or component lifecycle.

There is no `useDelay()` or `useTimeout()` export — the one-shot primitive is
`useSetTimeout()`, with `useSleep()` as the plain-await shorthand.

## Quick example

```ts
import {
  useSetTimeout, useInterval, useDebounce, useThrottleTrailing,
  useSleep, useRetry, useRace, useRepeat,
} from "katanakit-js";

// One-shot with cancellation
const { promise, cancel } = useSetTimeout(() => "done", 5000);
cancel(); // rejects promise with Error("Timeout cancelled")

// Recurring timer with pause/resume/stop
const poll = useInterval(async () => {
  await refreshStatus();
}, 2000, true);
poll.pause();
poll.resume();
poll.stop();

// Rate limiting
const onSearch = useDebounce((query: unknown) => {
  void fetch(`/api/search?q=${encodeURIComponent(String(query))}`);
}, 300);

const onResize = useThrottleTrailing(() => redrawChart(), 200);
window.addEventListener("resize", onResize);

// Coordination
await useSleep(250);
const data = await useRetry(() => fetchJson("/api/flaky"), 3, 500);
const fresh = await useRace(fetchJson("/api/slow"), 5000, "API took too long");
await useRepeat((i) => console.log(`step ${i + 1}`), 3, 1000);
```

## Delays & timers

### useSleep(ms)

Returns a promise that resolves after `ms` milliseconds. This is the thinnest
possible wrapper around `setTimeout` — no handle, no cancellation, no return
value. It delegates to the Utils service but is documented here because it is
the natural companion to the timing primitives.

```ts
import { useSleep } from "katanakit-js";

async function drainQueue(items: string[]) {
  for (const item of items) {
    await process(item);
    await useSleep(250); // stay under the provider's rate limit
  }
}
```

Because there is no cancel, do not use `useSleep()` for delays the user must be
able to abort. Use `useSetTimeout(() => {}, ms)` and call `cancel()` instead.

**Real use case** — CLI scripts and seeders: a small fixed pause between
external calls keeps you inside provider quotas without adding a rate-limiter
dependency.

### useSetTimeout(callback, ms)

Executes `callback` after `ms` milliseconds and returns a
`TimeoutControl<T> = { promise, cancel }`. The callback may be synchronous or
async (`() => T | Promise<T>`); its awaited result becomes the resolved value
of `promise`.

- `cancel()` is **idempotent**, clears the pending timer, and rejects
  `promise` with `new Error("Timeout cancelled")`. Call it before the timer
  fires (route dismissal, component unmount) or even while an async callback
  is still in flight — in that case the rejection wins and the callback's
  result is discarded.
- After the promise has settled, `cancel()` is a harmless no-op.
- If you cancel and never await the promise, catch it: an unhandled rejection
  will otherwise surface in strict runtimes.

```ts
import { useSetTimeout } from "katanakit-js";

const { promise, cancel } = useSetTimeout(async () => {
  const res = await fetch("/api/report");
  return res.json();
}, 10_000);

try {
  const report = await promise;
  console.log(report);
} catch (error) {
  if ((error as Error).message === "Timeout cancelled") return;
  throw error;
}

cancel(); // safe to call at any time
```

**Real use case** — an undo window on optimistic deletes: schedule the real
`DELETE` after five seconds and call `cancel()` when the user hits "Undo".
The same shape works for delayed redirects and auto-dismissing toasts.

### useInterval(callback, ms, immediate?)

Runs `callback` repeatedly and returns an
`IntervalControl = { pause, resume, stop, isRunning }`. The callback may be
async; the next tick is scheduled only after it finishes, so slow callbacks
never stack up. Errors thrown by the callback are logged as
`[interval] Callback error:` and the loop continues.

- `pause()` — prevents the next tick from being scheduled. A callback already
  in flight still completes.
- `resume()` — restarts scheduling, but only if the interval is currently
  paused and not stopped.
- `stop()` — permanent teardown: clears the timer, marks the interval as
  stopped, and makes `resume()` a no-op.
- `isRunning()` — returns `true` when the interval is neither stopped nor
  paused (including while a callback is executing).
- `immediate = false` (default) — the first tick fires after `ms`. Pass `true`
  to run the callback right away and schedule the first interval after it
  settles.

```ts
import { useInterval } from "katanakit-js";

const poll = useInterval(async () => {
  await refreshStatus();
}, 2000, true);

// Later, from a visibilitychange handler or a component teardown
poll.pause();

// Re-enter the page
poll.resume();

// Permanent cleanup
poll.stop();
```

**Real use case** — polling a long-running job: start with `immediate: true`
so the first status appears without waiting a full interval, `pause()` while
the tab is hidden to save requests, and `stop()` once the job reaches a
terminal state. Remember to `stop()` in the teardown path — on the server an
unstopped interval keeps the process alive.

### useRepeat(callback, iterations, delayMs?)

Sequentially awaits `callback` `iterations` times, passing the 0-based index.
`delayMs` defaults to `0` and is applied **between** iterations only — never
after the last one. The function resolves with `void` when the loop finishes;
callback errors are logged and swallowed, so one failed iteration does not
cancel the rest.

```ts
import { useRepeat, useSleep } from "katanakit-js";

await useRepeat(async (i) => {
  const page = await fetchPage(i + 1);
  console.log(`Fetched page ${i + 1}: ${page.items.length} items`);
}, 10, 200);
```

**Real use case** — cursor-less pagination against a fixed page count, or a
scripted replay of steps with a fixed pause between them. For a delay before
each attempt including the first, await `useSleep()` at the top of the
callback instead.

## Rate limiting

Debounce waits for **quiet**; throttle samples at a **fixed cadence**. Both
default to the trailing edge and have a leading-edge variant:

| Helper                    | Fires first call           | Fires during window     | Fires after quiet       |
| ------------------------- | -------------------------- | ----------------------- | ----------------------- |
| `useDebounce()`           | No                         | No (timer resets)       | Yes, latest args        |
| `useDebounceImmediate()`  | Yes                        | Queues latest args      | Only if extra calls     |
| `useThrottle()`           | Yes                        | Dropped (args lost)     | No                      |
| `useThrottleTrailing()`   | Yes                        | Queues latest args      | Yes, latest args        |

None of the wrappers expose `cancel()`: they own an internal timer but return a
plain function with the same signature. When you need cancellable debounced
state, use `useCreateDebouncedSignal()` from the
[Reactive](/guides/services/reactive) service instead.

### useDebounce(func, delayMs)

Returns a **trailing-edge** debounced function. Each call resets the timer, so
`func` runs once after `delayMs` of quiet with the **latest** arguments. The
wrapper returns `void` regardless of what `func` returns, and errors thrown by
`func` are logged as `[debounce] Callback error:`.

```ts
import { useDebounce } from "katanakit-js";

const search = useDebounce(async (query: unknown) => {
  const res = await fetch(`/api/search?q=${encodeURIComponent(String(query))}`);
  renderResults(await res.json());
}, 300);

input.addEventListener("input", (event) => {
  search((event.target as HTMLInputElement).value);
});
```

**Real use case** — search-as-you-type: keystrokes arrive every 50–150 ms, but
the API only sees one request after the user pauses. Debouncing also collapses
autosave requests on text areas and expensive validation on forms.

### useDebounceImmediate(func, delayMs)

**Leading + trailing** debounce. The first call fires `func` immediately; calls
during the window are coalesced and, once `delayMs` of quiet passes, `func`
runs a second time with the latest arguments — but only if at least one extra
call arrived. A lone call produces exactly one invocation, then the internal
state resets for the next burst.

```ts
import { useDebounceImmediate } from "katanakit-js";

const saveDraft = useDebounceImmediate((content: unknown) => {
  void fetch("/api/draft", {
    method: "PUT",
    body: JSON.stringify({ content }),
  });
}, 1000);

saveDraft(editor.value); // persisted right away
saveDraft(editor.value); // queued, overwrites the previous pending value
// after 1s of quiet: persisted again with the latest value
```

**Real use case** — autosave with instant feedback: the first edit is persisted
immediately so the UI can confirm "Saved", while a typing burst produces a
single follow-up write with the final content instead of one request per
keystroke.

### useThrottle(func, limitMs)

**Leading-edge** throttle. The first call fires `func` and opens a window of
`limitMs`; calls inside that window are dropped entirely — their arguments are
discarded, not queued. Errors are logged as `[throttle] Callback error:`.

```ts
import { useThrottle } from "katanakit-js";

const trackScroll = useThrottle(() => {
  analytics.track("scroll", { depth: window.scrollY });
}, 500);

window.addEventListener("scroll", trackScroll, { passive: true });
```

**Real use case** — high-frequency telemetry: scroll, pointer-move and resize
events fire dozens of times per second. Throttling to one sample per window
keeps analytics cheap, and dropping intermediate values is fine because only
the latest state matters.

### useThrottleTrailing(func, limitMs)

**Leading + trailing** throttle. The first call fires immediately; calls inside
the window queue the latest arguments and, at the end of the window, `func`
runs once more with them. If no extra calls arrived, only the leading
invocation happens — no duplicate work.

```ts
import { useThrottleTrailing } from "katanakit-js";

const previewFilter = useThrottleTrailing((range: unknown) => {
  applyFilter(range);
}, 150);

slider.addEventListener("input", (event) => {
  previewFilter((event.target as HTMLInputElement).value);
});
```

**Real use case** — live previews driven by sliders or drag gestures: the
leading call gives instant feedback while the user is still moving, and the
trailing call guarantees the final value is applied even if the last input
lands mid-window.

## Retries & coordination

### useRetry(fn, retries?, delayMs?)

Re-exported from `utils.service.ts`. Calls the async `fn`, and on rejection
waits `delayMs` before trying again. `retries` defaults to `3` and counts
**retries after the first attempt**, so the function runs at most
`retries + 1` times. The delay is fixed — there is no exponential backoff and
no abort signal. When the budget is exhausted, the **last error** is thrown.

```ts
import { useRetry } from "katanakit-js";

const data = await useRetry(
  async () => {
    const res = await fetch("/api/flaky");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
  3,
  500,
);
```

**Real use case** — flaky third-party APIs: wrap the call in `useRetry()` and
absorb transient `5xx`/network failures without duplicating retry loops in
every caller. Combine it with `useRace()` to cap each individual attempt.

### useRace(promise, timeoutMs, errorMessage?)

Races a promise against a timeout and resolves with the promise's value. If
`timeoutMs` elapses first, it rejects with `new Error(errorMessage)` —
defaulting to `"Operation timed out"`. The internal timer is always cleared
when either side settles, so no stray rejection escapes after the race.

The input promise is **not cancelled**: a `fetch` keeps running in the
background after the timeout. When the request must actually stop, pass an
`AbortController` signal to `fetch` and abort it in your `catch` block.

```ts
import { useRace } from "katanakit-js";

const controller = new AbortController();

try {
  const res = await useRace(fetch("/api/export", { signal: controller.signal }), 8000);
  return await res.json();
} catch (error) {
  controller.abort(); // stop the request the race gave up on
  throw error;
}
```

**Real use case** — hard deadlines on slow endpoints (exports, reports, AI
calls) so a hung request cannot block a UI transition or a server handler
forever.

### Putting it together: resilient search

```ts
import { useDebounce, useRace, useRetry, useSleep } from "katanakit-js";

const search = useDebounce(async (query: unknown) => {
  const q = String(query).trim();
  if (!q) return;

  try {
    const results = await useRetry(
      () => useRace(fetch(`/api/search?q=${encodeURIComponent(q)}`), 3000),
      2,
      400,
    );
    renderResults(await results.json());
  } catch (error) {
    showError("Search failed", error);
  }
}, 300);

input.addEventListener("input", (event) => {
  search((event.target as HTMLInputElement).value);
});
```

The debounce collapses keystrokes, `useRetry()` absorbs transient failures,
and `useRace()` keeps every attempt under three seconds — three helpers, one
predictable request budget.

## Related

- [Observer](/guides/services/observer) — react to visibility changes before
  starting or stopping a poll.
- [Viewport](/guides/services/viewport) — resize/scroll signals worth feeding
  into `useThrottle*()`.
- [Dates](/guides/services/dates) — format durations and timestamps around your
  timers.
- [API Reference](/api/) — every export, generated from source.
