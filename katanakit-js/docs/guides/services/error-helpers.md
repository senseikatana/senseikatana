---
title: Error Helpers
description: "Safe Results and the useAttempt, useTryJsonParse, useErrorNormalize, useErrorSerialize and useErrorCustom helpers — every function explained."
---

# Error Helpers

`error.service.ts` and `result.service.ts` host the Singleton facades
`ErrorService` and `ResultService`; their methods are re-exported as thin
`use*` wrappers, so there is no instance to create. They implement the Safe
Result contract shared across the library, so three design rules apply to every
function on this page:

1. **Fallible operations never throw.** `useAttempt()` returns a Safe Result for
   both sync throws and async rejections, `useTryJsonParse()` returns one for
   malformed JSON, and `useErrorNormalize()` accepts any caught value at all —
   `Error`, SDK object, string, `null`, `undefined`.
2. **Errors are values, not control flow.** The `SafeResult<T, E = ApiError>`
   discriminated union is the single shape every caller routes through:

   ```ts
   export type SafeResult<T, E = ApiError> =
     | { data: T; error: null; ok: true }
     | { data: null; error: E; ok: false };
   ```

   The `ok` flag narrows the union, so TypeScript guarantees `error` is present
   when `ok` is `false` and `data` is present when it is `true`.

3. **Two error shapes, two moments.** Inbound, unknown failures become an
   `ApiError` — `{ message, status, details? }` — via `useErrorNormalize()`.
   Outbound, errors that cross an HTTP/JSON boundary become an
   `ISerializedError` — `{ message, code }` — via `useErrorSerialize()` or
   `useErrorCustom()`. Mixing them up is the most common source of `undefined`
   fields in API responses.

**When to still throw.** Safe Results are for *fallible operations*: network
calls, SDKs, parsing untrusted text, storage. Keep throwing for *programming
errors* that should stop the program at its first invalid state — missing
configuration, invalid arguments in pure functions, invariant violations.
`useAttempt()` exists to draw that line at the boundary: everything inside the
operation may throw; the boundary hands back a value.

## Quick example

```ts
import {
  useAttempt,
  useTryJsonParse,
  useErrorNormalize,
  useErrorSerialize,
} from "katanakit-js";

// 1. Wrap a fallible boundary — sync throws and rejections both resolve
const user = await useAttempt(() => sdk.users.find(id));

// 2. Parse untrusted text without try/catch
const parsed = useTryJsonParse<{ id: number; name: string }>(
  '{"id":1,"name":"Kira"}',
);
console.log(parsed.ok ? parsed.data.name : parsed.error.message);

// 3. Normalize a value that escaped a third-party boundary
const normalized = useErrorNormalize(
  { message: "Rate limited", statusCode: 429, details: { retryAfter: 30 } },
);
// { message: "Rate limited", status: 429, details: { retryAfter: 30 } }

// 4. Build the payload for an HTTP error response
const body = useErrorSerialize(normalized.message, normalized.status);
// { message: "Rate limited", code: 429 }
```

## Boundaries

### useAttempt(operation, mapError?)

Runs an operation — sync or async — and captures **any** throw as a Safe Result.
It is the canonical replacement for ad-hoc `try/catch` at service boundaries:
the mapper defaults to [`useErrorNormalize()`](#useerrornormalizeerror-fallbackstatus),
so SDK errors, `Error` instances and plain strings all come back with the same
shape.

- `operation: () => T | Promise<T>` — the function to run. Because the helper
  `await`s it, a returned value and a returned promise are handled identically.
- `mapError: (error: unknown) => ApiError` — optional error mapper, applied to
  the caught value. Defaults to `useErrorNormalize`.
- **Returns** `Promise<SafeResult<T>>`: `{ data, error: null, ok: true }` on
  success, `{ data: null, error, ok: false }` on failure. With the default
  mapper it never rejects.

```ts
import { useAttempt } from "katanakit-js";

const result = await useAttempt(() => sdk.insert("posts", row));

if (result.ok) {
  console.log(result.data);           // Post
} else {
  console.error(result.error.status); // number, 0 when unknown
  console.error(result.error.message);
}
```

The type parameter is inferred from the operation's return value. Annotate it
when the operation returns `any` or a union you want narrowed:

```ts
const result = await useAttempt<User[]>(() => sdk.users.list());
```

**Edge cases.**

- **A custom mapper must be total.** `mapError` runs inside the internal `catch`,
  so if the mapper itself throws, the returned promise rejects. Keep mappers
  pure and defensive; when in doubt, avoid property access that can throw.
- **Fallback status.** Thrown values without a numeric status normalize with
  `status: 0`, which is the library-wide "no HTTP status available" marker. Pass
  a domain mapper — for example `(error) => useErrorNormalize(error, 500)` — to
  treat unknown failures as server errors.
- **Aborts are just errors.** An `AbortController` rejection is normalized like
  any other throw: its `message` survives, its `status` falls back to `0`.
  Branch on `result.error.message` if the caller must distinguish cancellation.
- **No rethrow option.** If a caller genuinely needs to propagate the original
  exception (TanStack Query's `queryFn`, for example), don't wrap it in
  `useAttempt`; throwing is the contract there.

**Real use case** — an API boundary around a typed SDK that throws several
different shapes. One call normalizes them all, and the caller decides policy
once:

```ts
import { useAttempt } from "katanakit-js";

async function getUser(id: string) {
  const result = await useAttempt(() => sdk.users.find(id));

  if (!result.ok) {
    if (result.error.status === 404) return null;
    throw new Error(result.error.message); // escalate deliberately
  }

  return result.data;
}
```

**Real use case** — a worker request handler. The handler never lets an
unexpected throw terminate the worker; every reply is a Safe Result envelope:

```ts
import { useAttempt } from "katanakit-js";

self.onmessage = async (event: MessageEvent) => {
  const result = await useAttempt(() => handleMessage(event.data));
  self.postMessage(result);
};
```

## Parsing

### useTryJsonParse(text)

Parses JSON without throwing; failures come back as a Safe Result. The helper
wraps `JSON.parse` and keeps the fallback policy at the call site — return the
raw string, retry, or surface the error — instead of nesting another
`try/catch`.

- `text: string` — the raw JSON text.
- **Returns** `SafeResult<T>` with `T = unknown` by default. On success:
  `{ data, error: null, ok: true }`. On failure: `{ data: null, error: { message, status: 0 }, ok: false }`,
  where `message` is the underlying parse error truncated to 300 characters.
- **Never throws** for malformed JSON, and `error.status` is always `0` — this
  is a syntax failure, not an HTTP one.

```ts
import { useTryJsonParse } from "katanakit-js";

const parsed = useTryJsonParse<{ id: number }>(raw);
return parsed.ok ? parsed.data : raw;
```

**Edge cases.**

- **`ok: true` with `data: null` is valid.** The text `"null"` parses to `null`.
  Always branch on `ok`, never on the truthiness of `data`, or valid payloads
  get treated as failures.
- **No schema validation.** The generic parameter is an assertion, not a
  guarantee: `useTryJsonParse<{ id: number }>('{"id":"x"}')` succeeds and lies.
  Run the parsed value through `useValidate()` when the shape matters.
- **Only syntax matters.** Trailing whitespace is fine, trailing commas are not.
  A string that parses to a primitive (`"42"`, `"true"`) is returned as such.
- **Circular data cannot reach the parser.** JSON text cannot contain reference
  cycles; the failure mode lives one step earlier — `JSON.stringify()` throws on
  a circular object before any text exists. If you serialize error `details`,
  sanitize them first (see [`useErrorNormalize()`](#useerrornormalizeerror-fallbackstatus)).
- **Runtime abuse falls outside the contract.** The signature requires a string;
  at runtime `JSON.parse` coerces `null` to the string `"null"` and returns
  `null`, while `undefined` fails as invalid JSON.

**Real use case** — HTTP response bodies, exactly as the HTTP client reads them:
JSON when the content type lies or is missing, raw text otherwise.

```ts
import { useTryJsonParse } from "katanakit-js";

async function readBody(response: Response) {
  const text = await response.text();
  if (!text) return null;

  const parsed = useTryJsonParse(text);
  return parsed.ok ? parsed.data : text;
}
```

**Real use case** — worker messages. Structured messages are serialized by the
`postMessage` boundary, so every handler re-validates the envelope before
routing it:

```ts
import { useTryJsonParse } from "katanakit-js";

self.onmessage = (event: MessageEvent<string>) => {
  const parsed = useTryJsonParse<WorkerMessage>(event.data);
  if (!parsed.ok) return postError(parsed.error);
  route(parsed.data);
};
```

## Shaping & serializing

Two shapes serve two directions. `useErrorNormalize()` handles values coming
**in** from unknown code and produces the runtime `ApiError`. `useErrorSerialize()`
and `useErrorCustom()` prepare errors going **out** to clients, logs and queues
as the transport-safe `ISerializedError`.

### useErrorNormalize(error, fallbackStatus?)

Normalizes any thrown value into the shared `ApiError` shape. It reads
`message`, a numeric `status` (or `statusCode`, used by some SDKs) and `details`
when present; every other value becomes a generic error. This is the canonical
mapper behind `useAttempt()`.

- `error: unknown` — the caught value: `Error`, SDK error object, string, or
  anything else.
- `fallbackStatus: number` — status used when the value has none. Defaults to
  `0`.
- **Returns** `ApiError`: `{ message, status, details? }`, fully serializable.
- **Never throws** and never inspects the prototype — plain objects work as well
  as `Error` instances.

| Caught value                        | `message`            | `status`          |
| ----------------------------------- | -------------------- | ----------------- |
| Object with numeric `status`        | its string `message` | `status`          |
| Object with numeric `statusCode`    | its string `message` | `statusCode`      |
| Object without either               | its string `message` | `fallbackStatus`  |
| `string`                            | the string           | `fallbackStatus`  |
| `null`, `number`, `undefined`, etc. | `"Unknown error"`    | `fallbackStatus`  |

Precedence matters: `status` wins over `statusCode`, and both win over
`fallbackStatus`. Non-string `message` values are discarded in favor of
`"Unknown error"`.

```ts
import { useAttempt, useErrorNormalize } from "katanakit-js";

const result = await useAttempt(() => sdk.call(), useErrorNormalize);
if (!result.ok) console.error(result.error.status, result.error.message);

// Object.assign(new Error("boom"), { statusCode: 503, details: { retry: true } })
// → { message: "boom", status: 503, details: { retry: true } }
```

**Edge cases.**

- **`status: 0` is a number.** It is preserved, not replaced by
  `fallbackStatus`, so `0` remains the explicit "unknown" marker.
- **String statuses are ignored.** `{ status: "404" }` falls back; only
  `typeof === "number"` counts.
- **String `details` are capped at 2000 characters.** A hostile upstream body
  cannot be persisted or logged verbatim. Non-string `details` are attached
  as-is, without a deep clone — mutations are shared, and a circular object
  graph will break a later `JSON.stringify()`, so sanitize before attaching.
- **Stack traces are not copied.** The result is a serializable summary. Read
  `error.stack` before normalizing if the logger needs it.
- **`null` and `undefined` throws are routine.** Both normalize to
  `"Unknown error"` with the fallback status.

**Real use case** — a logging pipeline. Normalize once at the catch site, then
log the stable fields; downstream sinks never need to know which SDK threw:

```ts
import { useErrorNormalize, useLogger } from "katanakit-js";

try {
  await processQueue();
} catch (error) {
  const apiError = useErrorNormalize(error, 500);
  useLogger(`Queue failed: ${apiError.message}`, apiError, "error");
}
```

**Real use case** — a decorated mapper for SDK calls. Wrap the default mapper,
keep its precedence rules, and add a source prefix for grepping:

```ts
import { useAttempt, useErrorNormalize } from "katanakit-js";

const result = await useAttempt(() => sdk.call(), (error) => {
  const normalized = useErrorNormalize(error, 500);
  return { ...normalized, message: `[sdk] ${normalized.message}` };
});
```

### useErrorSerialize(message, code)

Serializes an error into the transport-safe `{ message, code }` object. When
`message` is omitted or empty, the message falls back to a sensible default for
the status code — so you can pass `""` and still get a correct HTTP reason
phrase.

- `message: string` — error message. Defaults to `""`, which triggers the
  status-code default.
- `code: number` — HTTP status code. Defaults to `400`.
- **Returns** `ISerializedError`: `{ message, code }`.
- **Never throws.** There is no validation of `code`; it is copied as-is.

The built-in message table covers the statuses services emit most:

| `code` | Default `message`       |
| ------ | ----------------------- |
| `400`  | `"Bad Request"`         |
| `401`  | `"Unauthorized"`        |
| `403`  | `"Forbidden"`           |
| `404`  | `"Not Found"`           |
| `500`  | `"Internal Server Error"` |

Any other code falls back to `"Error"` unless a message is supplied.

```ts
import { useErrorSerialize } from "katanakit-js";

useErrorSerialize("User not found", 404); // { message: "User not found", code: 404 }
useErrorSerialize("", 500);               // { message: "Internal Server Error", code: 500 }
useErrorSerialize("", 418);               // { message: "Error", code: 418 }
```

**Edge cases.**

- **An empty string triggers the default; whitespace does not.** `" "` is
  truthy, so it is serialized verbatim.
- **Unknown codes are preserved.** `418` with no message yields
  `{ message: "Error", code: 418 }` — the code is never rewritten.
- **This is a data shape, not an `Error`.** Throwing it does nothing special;
  to throw, build an `Error` and let `useAttempt()` normalize it.
- **Mind the naming.** Serialized errors use `code`; runtime `ApiError` values
  use `status`. Converting between them is explicit:
  `useErrorSerialize(error.message, error.status)`.

**Real use case** — an HTTP boundary that turns any failure into a JSON
response. The `|| 500` floors unknown statuses (which normalize to `0`) into a
valid HTTP code, and the empty message produces `"Internal Server Error"`:

```ts
import { useAttempt, useErrorSerialize } from "katanakit-js";

const result = await useAttempt(() => loadDashboard(userId));

if (!result.ok) {
  const code = result.error.status || 500;
  return Response.json(useErrorSerialize(result.error.message, code), {
    status: code,
  });
}

return Response.json(result.data);
```

**Real use case** — worker error replies and queue dead-letter payloads. Both
cross a JSON boundary, so both use the serialized shape:

```ts
import { useErrorSerialize } from "katanakit-js";

self.postMessage(useErrorSerialize("Job failed: invalid payload", 400));
```

### useErrorCustom(msg, code)

Creates a custom serialized error in one call. It is a thin, intention-revealing
alias of `useErrorSerialize()` with both parameters required, used when an error
is *authored* rather than reactively serialized — a domain rule failure, an
explicit rejection, a guard clause.

- `msg: string` — error message (required).
- `code: number` — HTTP status code (required).
- **Returns** `ISerializedError`: `{ message, code }`, with the same
  status-code message fallback as `useErrorSerialize()` when `msg` is empty.
- **Never throws.**

```ts
import { useErrorCustom, useLogger } from "katanakit-js";

const error = useErrorCustom("User not found", 404);
useLogger(error.message, error, "error");
// { message: "User not found", code: 404 }
```

**Edge cases.**

- **The parameters are required at the type level,** but `useErrorCustom("", 404)`
  still resolves to `"Not Found"` because it delegates to `useErrorSerialize()`.
  Prefer writing the real message.
- **No stack, no prototype.** Like `useErrorSerialize()`, the result is a plain
  data object — convenient for RPC, logging and tests.
- **Do not use it as an exception.** If control flow must stop inside the
  operation, throw an `Error`; `useAttempt()` turns it into the right shape at
  the boundary.

**Real use case** — a validation service returning domain errors without
committing to HTTP mechanics. Controllers later map `code` to a response
status:

```ts
import { useErrorCustom } from "katanakit-js";

function assertAge(age: number) {
  if (age < 18) {
    return useErrorCustom("Must be 18 or older", 403);
  }
  return null;
}
```

### Which helper should I reach for?

| Situation                                     | Helper               | Result shape        |
| --------------------------------------------- | -------------------- | ------------------- |
| A boundary that can throw or reject (sync/async) | `useAttempt`      | `SafeResult<T>`     |
| Untrusted JSON text                           | `useTryJsonParse`    | `SafeResult<T>`     |
| An unknown caught value                       | `useErrorNormalize`  | `ApiError`          |
| An outbound HTTP/JSON error payload           | `useErrorSerialize`  | `ISerializedError`  |
| An intentionally authored domain error        | `useErrorCustom`     | `ISerializedError`  |

## Related

- [Error Handling](/guides/errors) — the Safe Result contract, the full
  `useAttempt` / `useTryJsonParse` / `useErrorNormalize` walkthrough and when
  not to use them.
- [HTTP Client](/guides/services/http-client) — the fetch facade, which reads
  response bodies with `useTryJsonParse()`.
- [Logger](/guides/services/logger) — where `useErrorCustom()` payloads usually
  end up.
- [API Reference](/api/) — every export, generated from source.
