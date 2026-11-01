---
title: HTTP Client
description: "Register APIs with defineApiConfig, build URLs with params and query strings, and call every HTTP method with a Safe Result discriminated union."
---

# HTTP Client

`http.service.ts` is a **singleton facade over a pure core**. `FetchApiManager`
holds one module-level registry of API definitions (`ApisConfig`) and exposes
two kinds of work:

1. **Pure building** — URL construction and body serialization are plain
   functions with no I/O. You can call `useBuildUrl()` to get the exact address
   `useFetch()` would request, without touching the network.
2. **Safe async requests** — every fetch returns a `FetchResult<T>`
   (`{ data, error, url, status, ok }`), a discriminated union that never
   throws. HTTP failures, network errors, config mistakes and even a failing
   `transform` come back as `ok: false` instead of an exception.

The named `use*` exports are thin wrappers around
[`FetchApiManager.getInstance()`](#class-access); use the class directly when
you want to inject a facade instead of importing the module singleton.

SSR notes: the service only uses the global `fetch` (Node >= 22.18 / Bun /
workers), so it is safe to import and call on the server. Register APIs once at
module scope with `defineApiConfig`. On a long-lived server the registry is
shared across requests, so treat it as immutable after startup and pass
per-request data (tokens, tenant ids) through `params`, `query` or `headers` —
never by mutating the registry per request.

## Quick example

```ts
import { defineApiConfig, useGetApi, usePost } from "katanakit-js";

defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: {
      pokemonById: "/pokemon/:id/",
      pokemons: "/pokemon/",
    },
    defaultQueryParams: { pokemons: { limit: 20 } },
  },
  jsonplaceholder: {
    baseUri: "https://jsonplaceholder.typicode.com",
    endpoints: {
      posts: "/posts",
      postById: "/posts/:id",
    },
  },
});

interface Pokemon {
  name: string;
  id: number;
  types: { type: { name: string } }[];
}

const result = await useGetApi<Pokemon>("pokeapi", "pokemonById", {
  params: { id: 25 },
});

if (result.ok) {
  console.log(result.data.name);   // "pikachu"
  console.log(result.status);      // 200
} else {
  console.error(result.error.status, result.error.message);
}

await usePost("jsonplaceholder", "posts", {
  title: "Hello World",
  body: "My first post",
  userId: 1,
});
```

## Registration

### defineApiConfig(input)

Declares the whole API registry in a single call and returns the facade: the
registered config under `config` plus every method written on the same literal.
This is the config-file entry point — one `export default` is the entire setup,
with no second registration step.

```ts
import { defineApiConfig, useFetch } from "katanakit-js";

export default defineApiConfig({
  pokeapi: { baseUri: "https://pokeapi.co/api/v2", endpoints: { byId: "/pokemon/:id/" } },
  debug: true,
  getPokemon: async function () {
    if (this.config.debug) console.log("fetching pokemon");
    return useFetch("pokeapi", "byId", { params: { id: 25 } });
  },
});
```

Rules the function enforces:

- Entries shaped like `{ baseUri, endpoints }` are registered as APIs;
  `defaultQueryParams` is optional.
- Boolean flags are kept on `config` for your own methods to read — they are
  **never** registered as APIs.
- Methods are split out of the config (via `useSplitConfig`) and returned on
  the facade. Write them with `function`, **not** arrow functions: `this.config`
  is undefined inside an arrow.
- Any other non-method object value throws
  `[FetchApiManager] defineApiConfig: "<name>" is not an API entry (expected an
  object with baseUri and endpoints).`

TypeScript infers the registry keys from the literal, so `api.config.pokeapi`
is typed as `ApiEntry` and `api.getPokemon()` keeps its return type.

**Real use case** — `src/apis/config.ts` can own every integration (CMS,
analytics, commerce), expose boolean feature flags, and export typed methods
that read `this.config`; components only import the methods.

### useInit(apisConfig) / useInitApis(apisConfig)

::: warning Deprecated
Both are deprecated in favor of [`defineApiConfig()`](#defineapiconfiginput),
which registers **and** returns the config. They remain exported for backwards
compatibility.
:::

`useInit()` merges (shallow-spreads) the given definitions into the singleton
registry; `useInitApis()` is an alias that delegates to it. Called twice, the
later definition wins for identical keys:

```ts
import { useInit } from "katanakit-js";

useInit({
  pokeapi: { baseUri: "https://pokeapi.co/api/v2", endpoints: { byId: "/pokemon/:id/" } },
});
```

**Real use case** — legacy code paths that register a plugin API at runtime
(for example a test fixture) can keep calling `useInit()` without migrating the
rest of the app.

### useGetApis() / useGetApisConfig()

Return a **shallow copy** of the registry, so iterating or deleting keys
locally never mutates the singleton. `useGetApisConfig()` is an alias for
`useGetApis()`.

```ts
import { useGetApis } from "katanakit-js";

const apis = useGetApis();
for (const [name, entry] of Object.entries(apis)) {
  console.log(name, entry.baseUri, Object.keys(entry.endpoints));
}
```

**Real use case** — a health-check endpoint that pings every registered API:
read the copy, `Promise.allSettled(useGet(name, endpoint))` over each entry, and
report which integrations are reachable.

## URL building

### useBuildUrl(apiName, endpointName, options?)

Returns the URL of a registered endpoint **without calling `fetch`**. It runs
the exact same pipeline as `useFetch()` — registry lookup, `:param`
substitution, `defaultQueryParams` merge and the http(s) guard — then hands you
the string:

```ts
import { useBuildUrl } from "katanakit-js";

useBuildUrl("pokeapi", "pokemonById", { params: { id: 25 } });
// → "https://pokeapi.co/api/v2/pokemon/25/"
```

How the pieces are assembled:

- `baseUri` and endpoint paths handle the slash boundary for you: a trailing
  slash on the base and a missing leading slash on the path are both fixed.
- `params` replaces `:name` placeholders (`:id` → `encodeURIComponent(id)`),
  globally and word-bounded, so `:id` never eats part of `:identifier`.
- `query` is merged **over** `api.defaultQueryParams[endpointName]`; `null`
  and `undefined` values are skipped, everything else is stringified.
- Pass `ignoreDefaultQuery: true` to drop the endpoint defaults entirely.
- The resulting scheme must be `http:` or `https:` — anything else throws, which
  blocks `javascript:` URLs and the obvious SSRF shapes at the boundary.

Because the function is synchronous, it **throws** instead of returning a Safe
Result: Safe Result covers fallible async work, and URL building never leaves
the process. It throws on an unregistered API, an unknown endpoint and a
disallowed scheme.

```ts
useBuildUrl("pokeapi", "pokemonById");              // throws: endpoint is missing :id
useBuildUrl("nope", "byId");                        // throws: API not registered
```

**Real use case** — SSR/prerender links: render `<a href>` for a detail page
without fetching it on the server, then let the client call `useGetApi()`
on demand.

```tsx
<a href={useBuildUrl("myApi", "download", { params: { id: 42 } })}>Download</a>
```

If you need the URL a request **did** use, read `result.url` from a
`FetchResult` instead.

### useBuildApiUrl(apiName, endpointName, options?)

::: warning Deprecated
Behaviorally identical wrapper kept for backwards compatibility and scheduled
for removal in the next major. Use [`useBuildUrl()`](#usebuildurlapiname-endpointname-options).
:::

## Requests per method

Every request helper returns a `FetchResult<T>` and never throws. The method
helpers (`useGet`, `usePost`, …) accept **only URL options** — for headers,
`signal`, `credentials` or `transform`, use [`useFetch()`](#usefetchapiname-endpointname-options).

### useFetch(apiName, endpointName, options?)

The general-purpose request. URL options live at the **top level**, next to
`method`/`headers`/`body`/`signal` and any other `RequestInit` field — no
nesting:

```ts
import { useFetch } from "katanakit-js";

const result = await useFetch<{ results: unknown[] }>("pokeapi", "pokemons", {
  method: "GET",
  query: { limit: 2 },
  headers: { Authorization: `Bearer ${token}` },
});

if (result.ok) console.log(result.data.results);
```

What the method does, in order:

1. Builds the URL; a failure here returns
   `{ data: null, error: { message: "Config Error: …", status: 0 }, url: "", status: 0, ok: false }`.
2. Calls `fetch` with `redirect: "error"` by default. This fails closed because
   the scheme allow-list only validates the initial URL; following a 3xx could
   steer the request to a private host. Opt into redirects explicitly with
   `redirect: "follow"` — the spread after the default lets you override it.
3. On a non-2xx response, returns
   `error.message = "HTTP Error: <statusText>"`, `error.status` and
   `error.details` with the parsed body (truncated to 32 KiB so a hostile
   response cannot exhaust memory).
4. Reads the body: `204` and empty bodies become `null`; JSON content is parsed
   with [`useTryJsonParse()`](/guides/errors#usetryjsonparse); anything else is
   returned as raw text.
5. Applies `transform` when given, and returns `{ data, error: null, url, status, ok: true }`.
6. Catches thrown `fetch` errors as
   `"Network/Client Error: <message>"` with `status: 0`.

`useFetchApi()` is an alias of `useFetch()` with the same options object.

**Real use case** — authenticated mutations: attach a bearer token and an
`AbortSignal` for cancellation, and inspect `error.details` to surface the
backend's validation message.

```ts
const result = await useFetch("jsonplaceholder", "posts", {
  method: "POST",
  body: { title: "Hello" },
  headers: { Authorization: `Bearer ${token}` },
  signal: controller.signal,
});
```

### useGet(apiName, endpointName, urlOptions?) / useGetApi(apiName, endpointName, urlOptions?)

GET helper over a registered endpoint; `useGetApi()` is the alias. Both accept
the same [`UrlOptions`](#params-query-and-ignoredefaultquery) and return a
`FetchResult<T>` — the type argument is not inferred, so annotate it with the
response shape:

```ts
import { useGetApi } from "katanakit-js";

const result = await useGetApi<Pokemon>("pokeapi", "pokemonById", {
  params: { id: 25 },
});

if (result.ok) {
  console.log(result.data.name);   // "pikachu"
  console.log(result.data.types);  // [{ type: { name: "electric" } }]
} else {
  console.error(result.error.status, result.error.message);
}
```

**Real use case** — search-as-you-type against a list endpoint: pass the term
as a query param and read `result.status` to distinguish "no results" (`200`)
from a backend failure (`5xx`).

```ts
const result = await useGetApi<Post[]>("jsonplaceholder", "posts", {
  query: { q: term, _limit: 10 },
});
```

### usePost(apiName, endpointName, body?, urlOptions?)

POST helper. The body is auto-serialized (see
[Body serialization](#body-serialization)) and `urlOptions` is the fourth
argument, so `params` and `query` work exactly as in GET:

```ts
import { usePost } from "katanakit-js";

const result = await usePost<Post>("jsonplaceholder", "posts", {
  title: "Hello World",
  body: "My first post",
  userId: 1,
});

// result.ok === true; result.data is the created resource
```

**Real use case** — file upload: pass a `FormData` and the service forwards it
untouched, letting the runtime set the multipart boundary instead of forcing a
JSON content type.

```ts
const form = new FormData();
form.append("file", file);

await usePost("myApi", "upload", form, { query: { visibility: "private" } });
```

### usePut(apiName, endpointName, body?, urlOptions?)

PUT helper for full-resource replacement. Same signature and serialization
rules as `usePost()`.

```ts
import { usePut } from "katanakit-js";

await usePut("jsonplaceholder", "postById", { title: "Updated" }, {
  params: { id: 1 },
});
```

**Real use case** — admin editors: a "Save" action sends the complete record,
while draft autosave can use `usePatch()` to send only the changed fields.

### usePatch(apiName, endpointName, body?, urlOptions?)

PATCH helper for partial updates.

```ts
import { usePatch } from "katanakit-js";

await usePatch("jsonplaceholder", "postById", { title: "New title" }, {
  params: { id: 1 },
});
```

**Real use case** — toggling a single field (a `status` flag, a `pinned`
boolean) without round-tripping the whole entity, which avoids clobbering
concurrent edits.

### useDelete(apiName, endpointName, urlOptions?)

DELETE helper. It takes no body; pass identifiers through `params` or `query`.

```ts
import { useDelete } from "katanakit-js";

await useDelete("jsonplaceholder", "postById", { params: { id: 1 } });
```

**Real use case** — delete the row from a list, then branch on `result.ok` to
remove it from local state or show a toast on failure. Because the call never
throws, it composes cleanly inside event handlers.

### OPTIONS and other methods

There is **no dedicated OPTIONS helper and no `usePostApi`/`usePutApi`/… aliases**
in the current API. For any method without a helper, call
[`useFetch()`](#usefetchapiname-endpointname-options) with an explicit `method`:

```ts
const result = await useFetch("myApi", "corsProbe", { method: "OPTIONS" });
```

## Configuration

### params, query and ignoreDefaultQuery

`UrlOptions` is the shared URL-building shape used by `useBuildUrl()` and every
method helper:

```ts
interface UrlOptions {
  params?: Record<string, string | number>;                  // fills :placeholders
  query?: Record<string, string | number | boolean | null | undefined>; // search string
  ignoreDefaultQuery?: boolean;                              // skip endpoint defaults
}
```

- `params` values are URL-encoded before substitution.
- `query` values win over `defaultQueryParams` for the same key, and
  `null`/`undefined` entries are silently skipped.
- `ignoreDefaultQuery` defaults to `false`; set `true` to drop the endpoint's
  configured defaults for a single call.

```ts
import { defineApiConfig, useGetApi } from "katanakit-js";

defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: { pokemons: "/pokemon/" },
    defaultQueryParams: { pokemons: { limit: 20 } },
  },
});

await useGetApi("pokeapi", "pokemons", { query: { offset: 40 } });
// → /pokemon/?limit=20&offset=40

await useGetApi("pokeapi", "pokemons", { query: { limit: 5 }, ignoreDefaultQuery: true });
// → /pokemon/?limit=5
```

### RequestInit passthrough

`FetchOptions<T>` extends `RequestInit`, so `method`, `headers`, `body`,
`signal`, `credentials`, `cache`, `redirect` and friends pass straight through
to `fetch`. The only injected default is `redirect: "error"`; everything you
specify wins because it is spread afterwards.

```ts
const result = await useFetch("myApi", "session", {
  method: "GET",
  credentials: "include",
  cache: "no-store",
  redirect: "follow", // explicit opt-in
});
```

### transform

`transform` maps the parsed body to `T` before the result is returned, and may
be async. If it throws, the request is still a failed result:
`error.message = "Transform Error: …"` with the real `response.status` and
`data: null`.

```ts
interface PokemonPage {
  names: string[];
}

const result = await useFetch<PokemonPage>("pokeapi", "pokemons", {
  query: { limit: 20 },
  transform: (body) => {
    const { results } = body as { results: { name: string }[] };
    return { names: results.map((p) => p.name) };
  },
});

if (result.ok) console.log(result.data.names);
```

**Real use case** — API normalization: keep the raw transport untouched and map
vendor responses into your domain type at the boundary, so components never see
wire-format fields.

### urlOptions (deprecated)

::: warning Deprecated
The nested form `{ urlOptions: { params, query, ignoreDefaultQuery } }` is kept
for backwards compatibility and scheduled for removal in the next major. Pass
the keys at the top level instead. When both are present, the flat keys win;
`undefined` flat keys never overwrite the nested values.
:::

### Body serialization

Helpers and `useFetch()` share one serializer:

- **Passed through untouched** — `FormData`, `Blob`, `URLSearchParams`,
  `ArrayBuffer`, typed arrays (`ArrayBuffer.isView`), `ReadableStream` and
  plain strings. No `Content-Type` is forced, so multipart boundaries and raw
  payloads stay correct.
- **Everything else** — `JSON.stringify` plus
  `Content-Type: application/json`.

`body: undefined` adds neither a body nor the JSON header. Note that `null` is
*not* `undefined`: it is stringified to `"null"` with the JSON content type.

```ts
await usePost("myApi", "events", { type: "click", at: Date.now() }); // JSON
await usePost("myApi", "raw", new URLSearchParams({ a: "1" }));      // no JSON header
```

### The Safe Result

Every request resolves to the same discriminated union, so `try/catch` around
HTTP calls is unnecessary — `ok` narrows the branches:

```ts
type FetchResult<T> =
  | { data: T; error: null; url: string; status: number; ok: true }
  | { data: null; error: ApiError; url: string; status: number; ok: false };

interface ApiError {
  message: string;   // "HTTP Error: …", "Config Error: …", "Network/Client Error: …"
  status: number;    // response status, or 0 for config/network failures
  details?: unknown; // parsed error body, truncated to 32 KiB
}
```

On transport failures `url` is the final URL (`response.url`), except for
config errors where it stays `""`. This is the same `{ data, error, ok }`
contract documented in [Error Handling](/guides/errors); internally the service
parses bodies with `useTryJsonParse()` from `result.service.ts`, and the shape
mirrors `useAttempt()`. Wrap the result in TanStack Query with
[`useSafeQueryFn()`](/guides/query-client) when you need caching, retries or
refetching.

## Class access

### Request interceptors

Register an interceptor to inspect or modify the URL and `RequestInit` before a
request reaches `fetch`. Interceptors run sequentially in registration order;
each receives the changes made by the previous interceptor. They may be
synchronous or asynchronous:

```ts
import { FetchApiManager } from "katanakit-js";

const http = FetchApiManager.getInstance();
const removeAuth = http.useAddRequestInterceptor(({ init }) => {
  const headers = new Headers(init.headers);
  headers.set("X-Example", "intercepted");
  init.headers = headers;
});

const result = await http.useGet("service", "items");
removeAuth();
```

`useAddRequestInterceptor()` returns a function that unregisters that
interceptor. The interceptor list is captured when a request starts, so changes
to registrations while a request is running apply to later requests. With no
registered interceptors, requests keep the existing fetch behavior.

If an interceptor throws or rejects, later interceptors and `fetch` are skipped.
The request resolves to a failed `FetchResult` with status `0` and an error
message prefixed with `Request Interceptor Error:`. Interceptor-modified URLs
must remain absolute HTTP(S) URLs; other schemes fail with the same result.

### FetchApiManager.getInstance()

The class enforces the singleton pattern with a private constructor; the only
way in is `getInstance()`, which lazily creates the instance and reuses it for
the lifetime of the process:

```ts
import { FetchApiManager } from "katanakit-js";

const http = FetchApiManager.getInstance();

http.useInit({
  pokeapi: { baseUri: "https://pokeapi.co/api/v2", endpoints: { byId: "/pokemon/:id/" } },
});

const result = await http.useFetch<Pokemon>("pokeapi", "byId", { params: { id: 25 } });
```

Instance methods, in one table:

| Method | Signature | Notes |
| --- | --- | --- |
| `useInit` | `(apisConfig: ApisConfig) => void` | Deprecated; merges into the registry. |
| `useGetApis` | `() => ApisConfig` | Shallow copy of the registry. |
| `useBuildUrl` | `(apiName, endpointName, options?) => string` | Synchronous; throws. |
| `useAddRequestInterceptor` | `(interceptor: RequestInterceptor) => () => void` | Adds a FIFO request interceptor; returns its unregister function. |
| `useFetch` | `<T>(apiName, endpointName, options?) => Promise<FetchResult<T>>` | Full option set. |
| `useGet` | `<T>(apiName, endpointName, urlOptions?) => Promise<FetchResult<T>>` | URL options only. |
| `usePost` | `<T>(apiName, endpointName, body?, urlOptions?) => Promise<FetchResult<T>>` | Auto-serialized body. |
| `usePut` | `<T>(apiName, endpointName, body?, urlOptions?) => Promise<FetchResult<T>>` | Auto-serialized body. |
| `usePatch` | `<T>(apiName, endpointName, body?, urlOptions?) => Promise<FetchResult<T>>` | Auto-serialized body. |
| `useDelete` | `<T>(apiName, endpointName, urlOptions?) => Promise<FetchResult<T>>` | No body. |

The module-level aliases `useFetchApi`, `useGetApi` and `useGetApisConfig` are
**not** methods on the class — they exist only as exported wrappers.

**Real use case** — dependency injection in tests: hand a mock
`FetchApiManager`-shaped object to your service layer instead of stubbing the
global `fetch`, and leave the real registry untouched.

## Related

- [Error Handling](/guides/errors) — the Safe Result contract and the
  `useAttempt()` / `useTryJsonParse()` / `useErrorNormalize()` helpers.
- [Query Client](/guides/query-client) — cache, retry and invalidate HTTP
  results through `useSafeQueryFn()`.
- [Framework Adapters](/guides/framework-adapters) — reactive `useQuery` /
  `useMutation` bindings per framework.
- [API Reference](/api/classes/FetchApiManager) — the class generated from
  source.
