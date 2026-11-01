---
title: Logger
description: "Singleton console facade with context prefixes, three levels and table output — LoggerService and every useLogger* helper explained."
---

# Logger

`logger.service.ts` is a **singleton facade over the native `console`** with zero
dependencies. It adds three things on top of the platform: an optional context
prefix, a narrowed three-level API, and top-level `use*` helpers so application
code never calls `console` directly.

1. **Environment-agnostic** — the module only touches `console`, never `window`
   or `document`. It behaves the same in browsers, Node/Bun, SSR rendering and
   Web Workers.
2. **One instance, two entry points** — `LoggerService.getInstance()` and the
   `useLogger*` wrappers resolve to the same lazy singleton, so they share state,
   including the context prefix.
3. **Levels map 1:1 onto console methods** — `log`, `warn`, `error`. No
   transport, no formatting pipeline, no dependencies.

The context prefix is **process-wide mutable state**: set it once at startup for
a stable label, and pass per-call identity (request id, user id) through the
`data` argument instead. See
[useSetContext()](#usesetcontextcontext).

## Quick example

```ts
import {
  useLogger,
  useLoggerWarn,
  useLoggerError,
  useLoggerTable,
  useLoggerClear,
} from "katanakit-js";

// Default level ("log")
useLogger("Application started");

// Level as the third argument, data as the second
useLogger("Cache miss", { key: "user:42" }, "warn");

// Dedicated helpers for the other two levels
useLoggerWarn("Cache miss", { key: "user:42" });
useLoggerError("Database timeout", { query: "SELECT 1", duration: 5000 });

// Console utilities
useLoggerTable([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
useLoggerClear();
```

> **Note** — `data` is optional everywhere. When it is `undefined` (or omitted)
> the call is forwarded to `console` with a single argument; any other value —
> including `null` — is attached as the second argument.

## Class API

`LoggerService` is a true Singleton: the constructor is `private`, and
`getInstance()` lazily creates the only instance on first use. Reach for the
class when you need instance-only features — today that means the context
prefix — or when a test needs the shared object; otherwise prefer the
[level helpers](#level-helpers).

```ts
import { LoggerService } from "katanakit-js";

const logger = LoggerService.getInstance();

logger.useSetContext("billing");
logger.useLog("Invoice created", { id: "inv_123" }); // [billing] Invoice created { id: "inv_123" }
```

### getInstance()

Returns the process-wide `LoggerService`. Creation happens on the first call and
every later call returns the exact same object. There is no public constructor,
so this is the only way to own a reference.

```ts
import { LoggerService } from "katanakit-js";

const a = LoggerService.getInstance();
const b = LoggerService.getInstance();

console.log(a === b); // true
```

Because the instance is shared, code that calls `getInstance()` can be placed in
several modules: the context set in one module is visible in the others.

**Real use case** — a CLI or scheduled job configures its context once at boot,
then the rest of the codebase logs through the plain `useLogger` helpers:

```ts
import { LoggerService, useLogger } from "katanakit-js";

LoggerService.getInstance().useSetContext("daily-report");
useLogger("Job started"); // [daily-report] Job started
```

### useSetContext(context)

Sets the prefix prepended to every subsequent `useLog()`, `useLogWarn()` and
`useLogError()` message. The effective message is `[context] message`, with the
brackets added internally. Passing an empty string `""` removes the prefix —
that is the default state.

```ts
import { LoggerService, useLogger } from "katanakit-js";

const logger = LoggerService.getInstance();

logger.useSetContext("checkout");
useLogger("Cart validated");      // [checkout] Cart validated

logger.useSetContext("");
useLogger("Cart validated");      // Cart validated
```

Edge cases that matter:

- **Only the message is prefixed.** `data` is forwarded untouched, so structured
  payloads stay parseable.
- **`useClear()` and `useTable()` ignore the context** — they delegate straight
  to `console.clear` / `console.table`, which have no message channel.
- **No nesting or scope stack.** Setting a context replaces the previous one; it
  is not saved, stacked or restored.
- **Shared across concurrent work.** On a server, every request in the same
  process sees the same context. Do not encode per-request identity here — put
  it in `data` (for example `{ requestId }`) so interleaved requests do not
  overwrite each other's label.

**Real use case** — one worker per task: a Web Worker dedicated to image
encoding sets `"image-encode"` once, and every log from that worker is
identifiable in the inspector without a per-call label.

### useLog(message, data?, level?)

The core method every other helper funnels through. It maps directly onto the
native console: `level` selects the method (`"log"`, `"warn"` or `"error"`),
`message` is formatted with the context prefix, and `data` becomes the second
argument when it is not `undefined`.

| Parameter | Type | Description |
| --- | --- | --- |
| `message` | `string` | Text shown in the console. Must be a string; use `data` for objects. |
| `data` | `unknown` (optional) | Payload attached as the second console argument. `undefined` means "no payload". |
| `level` | [`LogLevel`](#loglevel) (optional) | One of `"log"`, `"warn"`, `"error"`. Defaults to `"log"`. |

```ts
import { LoggerService } from "katanakit-js";

const logger = LoggerService.getInstance();

logger.useLog("Server listening on :3000");
logger.useLog("Cache miss", { key: "user:42" }, "warn");
logger.useLog("Payment failed", paymentError, "error");
```

The `data !== undefined` check is deliberate: `useLog("ready")` calls
`console.log("ready")` with exactly one argument, while
`useLog("value", null)` calls `console.log("value", null)` with two. If you
need to surface an explicit `undefined`, wrap it in an object.

**Real use case** — a boundary handler logs its payload with the matching level
in a single call, keeping the message stable and the diagnostics structured:

```ts
import { useAttempt, useLogger } from "katanakit-js";

const { data, error, ok } = await useAttempt(() =>
  useGet<User>("api", "userById", { params: { id } }),
);

if (!ok) useLogger("user fetch failed", error, "error");
else useLogger("user fetched", { id: data.id });
```

### useLogWarn(message, data?)

Shorthand for `useLog(message, data, "warn")`. Use it for recoverable
conditions: retries, fallbacks, deprecations, cache misses.

```ts
import { useLogWarn } from "katanakit-js";

useLogWarn("Falling back to cached response", { ttl: 30 });
```

**Real use case** — a polling loop that hits a transient API error logs the
retry at `warn` and keeps running, so the console distinguishes noise from real
failures without any extra branching.

### useLogError(message, data?)

Shorthand for `useLog(message, data, "error")`. Pass the caught error object or
a normalized error as `data` so stacks and codes reach the console untouched.

```ts
import { useLogError } from "katanakit-js";

useLogError("Database timeout", { query: "SELECT 1", duration: 5000 });
```

**Real use case** — internal services log through this shorthand so every
failure keeps its level; `reactive.service.ts` reports listener and effect
errors this way.

### useClear()

Clears the console via `console.clear()`. No message, no context, no level.

```ts
import { LoggerService } from "katanakit-js";

LoggerService.getInstance().useClear();
```

**Real use case** — a "clear console" action in a developer toolbar or a REPL
helper. Keep it out of library code and request handlers, where it would erase
logs the host application expects to keep. In tests, spying on `console.clear`
verifies that it was invoked.

### useTable(data)

Renders `data` with `console.table()`. Accepts anything `console.table`
accepts — arrays of objects, arrays of arrays, plain objects — and is typed as
`unknown`. Like `useClear()`, it is unaffected by the context prefix and has no
level.

```ts
import { LoggerService } from "katanakit-js";

LoggerService.getInstance().useTable([
  { route: "/", requests: 1204, p95: 32 },
  { route: "/api/users", requests: 892, p95: 87 },
]);
```

Rendering is delegated to the host: browsers and Node/Bun print a real table,
while other inspectors may fall back to a flat representation. Prefer
`useLog(message, data)` in worker or serverless environments where the output
format is unknown.

**Real use case** — a debug command that dumps feature flags or a query result
in one line of code; the NestJS adapter exposes exactly this through its extra
`table()` method.

## LogLevel

`LogLevel` is the union `"log" | "warn" | "error"`, inferred from the shared Zod
schema and re-exported from the package root. It is the same type accepted by
`useLog()` and by [`LoggerDecorator`](/api/functions/LoggerDecorator), so a
level can be threaded through application code without loss.

| `LogLevel` | Console method | Typical use |
| --- | --- | --- |
| `"log"` | `console.log` | Default; lifecycle events and successful work. |
| `"warn"` | `console.warn` | Recoverable problems: retries, fallbacks, deprecations. |
| `"error"` | `console.error` | Failures that deserve attention: exceptions, failed requests. |

```ts
import { useLogger, type LogLevel } from "katanakit-js";

const level: LogLevel = process.env.NODE_ENV === "development" ? "log" : "warn";
useLogger("Verbose diagnostics", { pid: 1234 }, level);
```

TypeScript rejects any other string at compile time; the runtime does not
re-validate it, so stick to the three documented values.

## Level helpers

The top-level functions `useLogger`, `useLoggerWarn` and `useLoggerError` are
one-line wrappers that call `LoggerService.getInstance()` on every invocation.
They exist so application code depends on a stable `use*` API instead of the
global `console`, and they share context with the class API for free.

### useLogger(message, data?, level?)

Wraps [`useLog()`](#uselogmessage-data-level) with the default level `"log"`.
Pass a level explicitly when severity is dynamic; otherwise prefer the
dedicated helpers below for readability.

```ts
import { useLogger } from "katanakit-js";

useLogger("Application started");
useLogger("Cache miss", { key: "user:42" }, "warn");
useLogger("Something went wrong", undefined, "error");
```

**Real use case** — a request logger where the level comes from configuration:
`useLogger("slow query", { ms, sql }, thresholdExceeded ? "warn" : "log")`
keeps a single call site while the configuration decides the channel.

### useLoggerWarn(message, data?)

Wraps `useLogWarn()`; the log always lands on `console.warn`.

```ts
import { useLoggerWarn } from "katanakit-js";

useLoggerWarn("Retrying request", { attempt: 2, max: 3 });
```

**Real use case** — the NestJS bridge declares warn semantics once
([`KatanaLogger.warn()`](/guides/nestjs)) and application code keeps calling
`useLoggerWarn` without touching Nest.

### useLoggerError(message, data?)

Wraps `useLogError()`; the log always lands on `console.error`.

```ts
import { useLoggerError } from "katanakit-js";

try {
  await charge(order);
} catch (error) {
  useLoggerError("Charge failed", { orderId: order.id, error });
  throw error;
}
```

**Real use case** — global error boundaries: normalize the error first (see
[Error helpers](/guides/errors)) and log the normalized shape so every failure
is searchable and consistent.

## Utilities

### useLoggerClear()

Wrapper for [`useClear()`](#useclear). Clears the console with no arguments.

```ts
import { useLoggerClear } from "katanakit-js";

useLoggerClear();
```

**Real use case** — a "reset output" step in a dev dashboard script; it pairs
with `useLoggerTable()` when a script reprints a snapshot on every run.

### useLoggerTable(data)

Wrapper for [`useTable()`](#usetable-data). Renders tabular data and accepts the
same `unknown` payload.

```ts
import { useLoggerTable } from "katanakit-js";

useLoggerTable([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
]);
```

**Real use case** — inspecting the result of a query in a script before
formatting it; the NestJS adapter surfaces this helper as `logger.table(data)`
so Nest modules get the same output.

## Putting it together: traced work with request identity

The context prefix is global, so request identity belongs in `data`. The
[`LoggerDecorator`](/api/functions/LoggerDecorator) then traces individual
functions on top of the same logger:

```ts
import { LoggerDecorator, useLogger, useLoggerError } from "katanakit-js";

const loadUser = LoggerDecorator(async (id: number) => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json() as Promise<{ id: number; name: string }>;
}, "loadUser");

const requestId = "req_8f3c";

try {
  const user = await loadUser(42);
  useLogger("user loaded", { requestId, userId: user.id });
} catch (error) {
  useLoggerError("user load failed", { requestId, error });
}
```

`loadUser` emits `start` / `ok` / `error` entries with duration, while the
handler adds the request id only where it matters. Two concurrent requests can
interleave safely because neither one mutates shared logger state.

## Related

- [NestJS adapter](/guides/nestjs) — `KatanaLogger` forwards Nest logs to this
  service (`debug` and `verbose` collapse to `log`).
- [Error helpers](/guides/errors) — normalize errors before logging them with
  `useLoggerError`.
- [DOM](/guides/services/dom) — the other zero-dependency core service, with the
  same method-by-method page format.
- [API Reference](/api/classes/LoggerService) — the class generated from source.
- [API Reference](/api/functions/useLogger) — the top-level helpers.
