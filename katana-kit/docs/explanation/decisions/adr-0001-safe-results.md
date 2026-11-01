---
title: "ADR-0001: Safe Results instead of exceptions"
description: Fallible operations return { data, error, ok } instead of throwing — the decision, its costs and its exceptions.
---

# ADR-0001: Safe Results instead of exceptions

**Status:** Accepted · **Date:** 2026-09-26 (released in v5.2.0)

## Context

Most of what this library does can fail for reasons the caller cannot prevent:
a request times out, a file does not exist, an endpoint returns 500, a device
is offline. Modelled as exceptions, those failures share one catch-all channel
with programmer errors, disappear from type signatures, and force `try/catch`
at every call site — which in practice means they are handled inconsistently,
or not at all. By September 2026 the codebase carried scattered ad-hoc
`try/catch` blocks that normalised errors differently in each service.

## Decision

Fallible async operations return a discriminated union instead of throwing:

```ts
type SafeResult<T, E> =
  | { data: T; error: null; ok: true }
  | { data: null; error: E; ok: false };
```

`FetchResult<T>`, `FilesystemResult<T>`, `AstroServiceResult<T>`, `AiResult<T>`
and `RssResult` all derive from it. Errors travel as structured values
(`ApiError`: `message`, `status`, `details?`), and the boundary helpers
`useAttempt()`, `useTryJsonParse()` and `useErrorNormalize()` convert unknown
throws into the same shape. Synchronous preconditions still throw by
convention — `useBuildUrl()` on an unregistered API, for example — because
Safe Result covers fallible async work, and building a URL never leaves the
process.

## Consequences

**Better.** Failure is visible in the type: `if (result.ok)` narrows both
branches, and no `try/catch` ceremony is needed, so the happy path stays
linear and failures cannot be silently swallowed by an empty catch. Results
compose — a handler can return the same envelope all the way to the client,
which is what the Nuxt/Nitro helpers do.

**Worse.** Callers who ignore `ok` still compile and get `data: null` at
runtime. Libraries that expect exceptions (TanStack Query, error boundaries)
need a bridge — `useSafeQueryFn()` exists for exactly that. And the
convention only works if it is followed everywhere: one throwing service
would split the error story in two.

## Links

- [Error Handling](/guides/errors) — the contract and its helpers in practice.
- [HTTP Client](/guides/services/http-client) — where Safe Results are most visible.
- [Query Client](/guides/query-client) — the exception-expecting bridge.
