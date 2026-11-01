---
title: Error Handling
description: The Safe Result contract ({ data, error, ok }) and the useAttempt, useTryJsonParse and useErrorNormalize helpers.
---

# Error Handling

Every fallible operation in KatanaKit resolves to a **Safe Result** instead of
throwing: a discriminated union where the `ok` flag narrows between success and
failure.

```ts
export type SafeResult<T, E = ApiError> =
  | { data: T; error: null; ok: true }
  | { data: null; error: E; ok: false };
```

Domain results are aliases of the same shape: `FetchResult<T>` (adds `url` and
`status`), `FilesystemResult<T>`, `AstroServiceResult<T>`, `AiResult<T>` and
`RssResult`. Errors are serializable `ApiError` values: `{ message, status, details? }`.

## The problem

Nested `try/catch` at every boundary, with `catch (error: unknown)` and
third-party SDKs that throw different shapes:

```ts
try {
  const raw = await sdk.call();
  const parsed = JSON.parse(raw);
  return { data: parsed, error: null, ok: true };
} catch (error) {
  return { data: null, error: { message: String(error), status: 0 }, ok: false };
}
```

The rationale for replacing that pattern — and the trade-offs accepted — is
recorded in [ADR-0001: Safe Results instead of exceptions](/explanation/decisions/adr-0001-safe-results).

## useAttempt()

Runs a sync or async operation and normalizes **any** throw into a Safe Result.
The default mapper is `useErrorNormalize`, so SDK errors, `Error` instances and
plain strings all come back with the same shape.

```ts
import { useAttempt } from "katanakit-js";

const result = await useAttempt(() => sdk.insert("posts", row));
if (!result.ok) console.error(result.error.status, result.error.message);
```

Custom mappers keep domain-specific prefixes:

```ts
const result = await useAttempt(operation, (error) => ({
  message: `[Sdk] ${error instanceof Error ? error.message : String(error)}`,
  status: 0,
}));
```

## useTryJsonParse()

Non-throwing `JSON.parse`; the fallback policy stays at the call site
(`error.status` is always `0`).

```ts
const parsed = useTryJsonParse<Book[]>(raw);
return parsed.ok ? parsed.data : raw;
```

## useErrorNormalize()

Coerces SDK errors, `Error` instances and strings into `ApiError`. Precedence:
numeric `status` → `statusCode` → `fallbackStatus` (`0`); `message` defaults to
`"Unknown error"`, and string `details` are capped at 2000 characters.

| Caught value                        | `message`     | `status`         |
| ----------------------------------- | ------------- | ---------------- |
| Object with numeric `status`        | its `message` | `status`         |
| Object with numeric `statusCode`    | its `message` | `statusCode`     |
| Object without either               | its `message` | `fallbackStatus` |
| `string`                            | the string    | `fallbackStatus` |
| Anything else                       | `"Unknown error"` | `fallbackStatus` |

## When not to use it

- **TanStack Query** needs `queryFn` to throw: bridge Safe Results with
  [`useSafeQueryFn`](./query-client.md).
- **Configuration errors** fail fast by design (SEO `SiteConfig`, init calls).
- **Tests** where throwing is the behavior under test.

## Related

- [Architecture](architecture.md) — layers and conventions.
- [Getting Started](getting-started.md) — HTTP with Safe Results.
- [Filesystem](filesystem.md) — errno codes as Safe Results.
- [Faker](faker.md) — helpers that throw and how to wrap them.
- [ADR-0001: Safe Results instead of exceptions](/explanation/decisions/adr-0001-safe-results) — why the contract exists.
