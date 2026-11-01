---
title: Nuxt Adapter
description: "H3 server-route helpers (useUnwrap, useSafeResponse, useEventResponse) and Vue watchers (useKatanaWatch, useWatch) for Nuxt apps — every export explained."
---

# Nuxt Adapter

`src/adapters/nuxt/` is a **framework entry point** published as
`katanakit-js/adapters/nuxt`. Like every server adapter it is never re-exported
from the main `katanakit-js` barrel, so always import it from the subpath.

The adapter covers the two boundaries where a Nuxt app meets KatanaKit:

1. **Server routes** — `useUnwrap()`, `useSafeResponse()` and `useEventResponse()`
   translate a core Safe Result (`FetchResult<T>`) into an H3-compatible error
   or response. Nitro route handlers return plain values, throw errors, or
   mutate the event's status code; these three helpers cover each combination.
2. **Client reactivity** — `useKatanaWatch()` and its short alias `useWatch()`
   re-export the Vue adapter's deep-by-default watcher, so Nuxt components can
   import it from the same subpath used by their server code.

Requests themselves are already isomorphic: the core HTTP client runs on the
global `fetch` and returns Safe Results on the server and in the browser alike.
That is why this adapter deliberately ships **no request wrappers** — it is glue
for types and runtime boundaries, not a second HTTP facade. `defineApiConfig()`
still comes from `katanakit-js`, and every `useGetApi()` / `usePost()` call in a
server route is a direct core call.

::: warning Server-only vs client-safe
`nuxt.service.ts` imports `node:module` at the top level to detect H3. Treat
`useUnwrap()`, `useSafeResponse()` and `useEventResponse()` as **server-only**.
The watcher module is client-safe and SSR-safe; client-only code can also
import it from `katanakit-js/adapters/vue`, which has no Node dependency.
:::

::: tip h3 is detected, not required
KatanaKit does not declare `h3` as a dependency. `useUnwrap()` resolves it
lazily from the host app and caches the result for the process lifetime. In a
Nuxt project H3 is already present; elsewhere the helper falls back to a
branded plain `Error` (see [`useUnwrap()`](#useunwrapresult-context)).
:::

## Quick example

Register the API registry in a Nitro plugin, then map the result in a server
route:

```ts
// server/plugins/api.ts
import { defineApiConfig } from "katanakit-js";

defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: { pokemonById: "/pokemon/:id/" },
  },
});
```

```ts
// server/api/pokemon/[id].ts
import { useGetApi } from "katanakit-js";
import { useUnwrap } from "katanakit-js/adapters/nuxt";

interface Pokemon {
  id: number;
  name: string;
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const result = await useGetApi<Pokemon>("pokeapi", "pokemonById", {
    params: { id },
  });

  return useUnwrap(result, `Pokemon ${id}`);
});
```

A `200` from PokeAPI returns the Pokémon object directly. A `404` throws an
H3 error with `statusCode: 404` and message `Pokemon 25: Not Found`, which
Nitro converts into the matching HTTP response. The route handler itself never
branches on `result.ok`.

## Server routes

The three helpers share one input — the `FetchResult<T>` produced by any core
fetch method — and differ only in how they hand the outcome back to Nitro.

| Helper             | On success              | On failure                                  | HTTP status                    | Never throws |
| ------------------ | ----------------------- | ------------------------------------------- | ------------------------------ | ------------ |
| `useUnwrap()`      | returns `data`          | throws an H3 error                          | from `error.status` (500 on 0) | no           |
| `useSafeResponse()`| returns `{ data, error: null, ok: true }` | returns `{ data: null, error, ok: false }` | left untouched (200)           | yes          |
| `useEventResponse()`| returns `data`         | returns `{ error, status }`                 | set from `error.status` (500 on 0) | yes       |

Pick the helper by where the failure should surface: in the **HTTP status and
error page** (`useUnwrap`, `useEventResponse`) or in the **response body**
(`useSafeResponse`).

### useUnwrap(result, context?)

Unwraps a Safe Result and **throws** on failure, which is the idiomatic way to
fail a Nitro route. On success it returns `result.data` unchanged, so the
handler reads as if the request could not fail — and TypeScript narrows `T`
without a manual `if (result.ok)` branch.

**Parameters**

| Name      | Type                | Default     | Description                                                                 |
| --------- | ------------------- | ----------- | --------------------------------------------------------------------------- |
| `result`  | `FetchResult<T>`    | —           | A result from `useGetApi`, `useFetchApi`, `usePost`, or any core method.    |
| `context` | `string`            | `undefined` | Optional prefix added to the thrown message, e.g. `"Pokemon 25"`.           |

**Returns** — `T`: the data from the successful branch. There is no failure
return value; the only outcomes are the data or a throw.

**How the error is built**

1. `statusCode` is `result.error.status || 500`, so a `0` (the
   `useErrorNormalize()` fallback for network failures) becomes `500`.
2. With `context`, the message is `` `${context}: ${result.error.message}` ``;
   otherwise the upstream message is passed through.
3. When the host app exposes `h3`, `h3.createError({ statusCode, statusMessage,
   message })` is used, producing a real H3 error.
4. When `h3` cannot be resolved, a plain `Error` is branded with `statusCode`,
   `status` (both set), `statusMessage` and `name: "H3Error"`. Nitro maps it by
   property, but `instanceof H3Error` checks would fail — a real edge case when
   unit-testing the adapter outside a Nuxt build.

The H3 lookup runs once and caches both hits and misses for the process, so
there is no `require()` overhead per request.

```ts
// server/api/orders/[id].ts
import { useGetApi } from "katanakit-js";
import { useUnwrap } from "katanakit-js/adapters/nuxt";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  // No context: the upstream message is thrown as-is
  const result = await useGetApi("shop", "orderById", { params: { id } });
  return useUnwrap(result);
});
```

**Real use case** — a typed BFF proxy. The route forwards an upstream 404 as a
404 with a contextual message, and mutations keep the same shape:

```ts
// server/api/contacts.post.ts
import { usePost } from "katanakit-js";
import { useUnwrap } from "katanakit-js/adapters/nuxt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await usePost("crm", "createContact", body);
  return useUnwrap(result, "Create contact");
});
```

**Edge cases**

- The thrown message is what lands in the error response body as
  `statusMessage`; keep `context` short and free of secrets — it is user-visible
  in development and often in production error payloads.
- `useUnwrap()` must run inside an active request: throwing is only meaningful
  where Nitro can catch it. Do not call it in `server/plugins/` startup code.
- For non-2xx upstream responses with a `0` status (network-level failure), the
  client sees `500`, not `0`, because HTTP has no zero status.

### useSafeResponse(result)

Normalizes a Safe Result into a stable three-field envelope without throwing
and without touching the event. It is the helper for endpoints whose **body**
is the contract — typically internal routes consumed by your own pages, where a
failure should still deserialize predictably.

**Parameters**

| Name     | Type             | Default | Description                                        |
| -------- | ---------------- | ------- | -------------------------------------------------- |
| `result` | `FetchResult<T>` | —       | A result from any core fetch method.               |

**Returns**

```ts
{
  data: T | null;
  error: { message: string; status: number } | null;
  ok: boolean;
}
```

On success: `{ data, error: null, ok: true }`. On failure:
`{ data: null, error: { message, status }, ok: false }`.

Three details matter:

- The returned `ok` mirrors `FetchResult`'s discriminant, so a client can
  narrow the same way it does on the server.
- Only `message` and `status` are forwarded. The optional `details` field of the
  upstream `ApiError` is **dropped**, so do not rely on it crossing the wire.
- The helper does **not** set the HTTP status code. The route answers `200`
  even when the upstream failed; the failure lives in the JSON body. Use
  [`useEventResponse()`](#useeventresponseevent-result) when the HTTP status must
  mirror the upstream one, and [`useUnwrap()`](#useunwrapresult-context) when
  you want an error page.

```ts
// server/api/users.ts
import { useGetApi } from "katanakit-js";
import { useSafeResponse } from "katanakit-js/adapters/nuxt";

interface User {
  id: string;
  name: string;
}

export default defineEventHandler(async () => {
  const result = await useGetApi<User[]>("api", "users");
  return useSafeResponse(result);
});
```

A failed upstream request produces this body with status `200`:

```json
{
  "data": null,
  "error": { "message": "Service unavailable", "status": 503 },
  "ok": false
}
```

**Real use case** — a dashboard widget that distinguishes "the endpoint
answered but the upstream failed" from "the endpoint itself is broken". The page
keeps its normal render path and surfaces the failure inline:

```ts
// app/pages/users.vue
const { data } = await useFetch("/api/users");

if (data.value && !data.value.ok) {
  showBanner(data.value.error?.message ?? "Unknown error");
}
```

Because the HTTP status stays `200`, client-side error interceptors and CDN
error handling do not swallow the body — the component decides how loud the
failure should be.

**Edge cases**

- Do not point a generic error boundary at these routes: a `503` upstream is
  delivered as a successful response. The `ok` flag is the only signal.
- If you cache the route, failed responses are cacheable too. Add cache keys or
  `Cache-Control` headers over the whole envelope, not just over successful
  bodies.
- The envelope is JSON only. Streaming or binary upstream responses do not fit
  this helper — return the raw response from the route instead.

### useEventResponse(event, result)

Sets the HTTP status on the H3 event and returns either the data or a compact
error body. It is the middle ground between the other two helpers: the HTTP
status mirrors the upstream failure, and no exception is thrown.

**Parameters**

| Name     | Type                                              | Default | Description                                                            |
| -------- | ------------------------------------------------- | ------- | ---------------------------------------------------------------------- |
| `event`  | `{ node: { res: { statusCode: number } } }`       | —       | The event passed to `defineEventHandler`. Only this structural shape is required, so no H3 type import is needed at compile time. |
| `result` | `FetchResult<T>`                                  | —       | A result from any core fetch method.                                   |

**Returns** — `T | { error: string; status: number }`.

- Success: sets `event.node.res.statusCode = 200` and returns `result.data`.
- Failure: sets `event.node.res.statusCode = result.error.status || 500` and
  returns `{ error: <message>, status: <upstream status> }`.

Note the asymmetry on failure: the event status uses the `|| 500` fallback,
but the **body's `status` keeps the raw upstream value**. A network failure
(`status: 0`) therefore produces HTTP `500` with a body of
`{ error: "Network error", status: 0 }`. That is intentional — the body tells
you what the upstream reported, while the HTTP layer must answer with a valid
status.

```ts
// server/api/products.ts
import { useFetchApi } from "katanakit-js";
import { useEventResponse } from "katanakit-js/adapters/nuxt";

interface Product {
  sku: string;
  title: string;
}

export default defineEventHandler(async (event) => {
  const result = await useFetchApi<Product[]>("shop", "products");
  return useEventResponse(event, result);
});
```

An upstream `401` makes the route answer `401` with
`{ "error": "Unauthorized", "status": 401 }`; an upstream `200` makes the route
answer `200` with the product array.

**Real use case** — a transparent proxy route that must preserve status codes
for an external consumer (a webhook, a mobile client, or another service). The
consumer can keep standard HTTP retry logic (`429`, `5xx`) while the error body
stays small and predictable.

**Edge cases**

- The helper mutates `event.node.res.statusCode` directly. Any code that reads
  the status later in the same request sees the mapped value — do not reset it
  afterwards.
- If the route throws after `useEventResponse()` returns, Nitro's error handler
  takes over and the status is replaced. Use this helper only as the route's
  final statement.
- `error` in the returned body is a **string**, unlike the object returned by
  [`useSafeResponse()`](#usesaferesponseresult). Keep the two envelopes straight
  when the same consumer calls both route styles.

## Composable wrappers

This subpath intentionally exports **no data-fetching composables**. There is
no `useRequest`, no `useQuery`, no `useNuxtQuery` and no `useMutation` in
`katanakit-js/adapters/nuxt`. Reaching for those from this import path is a
common assumption that the source does not support.

The reason is compositional: requests in KatanaKit are already isomorphic, so a
Nuxt component can call the core client directly, and reactive composables are a
Vue concern that lives in `katanakit-js/adapters/vue` (see the
[Vue adapter](/guides/services/vue-adapter)). The package also does not ship a
Nuxt module, so nothing is auto-imported — every helper on this page is a named
import.

The complete public surface of `katanakit-js/adapters/nuxt` is:

| Export             | Kind              | Runtime      | Summary                                                        |
| ------------------ | ----------------- | ------------ | -------------------------------------------------------------- |
| `useUnwrap`        | function          | server only  | Returns data or throws an H3 error.                            |
| `useSafeResponse`  | function          | server only  | Returns a `{ data, error, ok }` body, status untouched.        |
| `useEventResponse` | function          | server only  | Maps the result onto the event status and returns data/error.  |
| `useKatanaWatch`   | function          | client + SSR | Vue `watch` with `deep: true` by default.                      |
| `useWatch`         | constant alias    | client + SSR | The same function reference as `useKatanaWatch`.               |

For reactive GETs inside `<script setup>`, pair the core client with the Vue
adapter's `useRequest`, or call `useGetApi()` in an event handler — both are
outside this subpath on purpose.

## Query/watch integration

The watcher half of the adapter is a straight re-export of the Vue adapter's
watcher. It exists so Nuxt code has one import path for everything KatanaKit
related, and it adds no Nuxt-specific behavior: same signature, same defaults,
same SSR safety.

### useKatanaWatch(source, callback, options?)

Thin wrapper around Vue's `watch` with `deep: true` as the default, so nested
mutations on refs and reactive objects re-trigger the callback without extra
configuration. It accepts the same source shapes as native `watch`: a ref, a
reactive object, a getter function, or an array of those.

**Parameters**

| Name       | Type                                            | Default | Description                                                                                      |
| ---------- | ----------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| `source`   | `WatchSource<T> \| Array<WatchSource<unknown>>` | —       | Native `watch` source (ref, reactive object, getter, or array).                                  |
| `callback` | `WatchCallback<T, T \| undefined>`              | —       | Native `watch` callback. Sync or async, `(newValue, oldValue)` or no args; `oldValue` can be `undefined` on the first call. |
| `options`  | `WatchOptions`                                  | `{}`    | Native `watch` options forwarded verbatim. `deep` defaults to `true` but can be overridden.       |

**Returns** — `WatchStopHandle`: calling it tears the watcher down. When the
composable runs inside a component's `setup`, the handle is also registered with
`onUnmounted`, so cleanup is automatic; outside a component instance you own the
teardown.

The module touches no DOM APIs, so it is SSR-safe. It only reads the optional
`vue` peer dependency, which every Nuxt app already provides.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useKatanaWatch } from "katanakit-js/adapters/nuxt";

const draft = ref({ title: "", body: "" });

// deep: true by default — editing any nested field fires the callback
useKatanaWatch(draft, (next, previous) => {
  if (next.title !== previous?.title) scheduleAutosave(next);
});
</script>
```

**Real use case** — live validation of a nested form model. Because the watcher
is deep by default, you do not have to rebuild the source expression for every
new field; the callback receives the whole model after each mutation:

```ts
import { ref } from "vue";
import { useKatanaWatch } from "katanakit-js/adapters/nuxt";

const newProduct = ref({ name: "", price: 0 });
const fieldErrors = ref<Record<string, string>>({});

useKatanaWatch(newProduct, () => {
  fieldErrors.value = validate(newProduct.value);
});
```

**Edge cases**

- Opt out of deep tracking explicitly when the object is large:
  `useKatanaWatch(cart, onChange, { deep: false })` — the call-site option
  overrides the default because options are spread last.
- Watching several sources uses the native array form:
  `useKatanaWatch([() => filters.min, () => filters.max], refetch)`.
- `flush`, `immediate` and `once` are forwarded untouched, so timing-sensitive
  watchers behave exactly like native Vue.
- Outside `setup` there is no component instance to attach to; keep the returned
  handle and call it when the owning scope ends (for example, in a Pinia store
  teardown or a manual effect cleanup).

### useWatch(source, callback, options?)

Short alias of [`useKatanaWatch()`](#usekatanawatchsource-callback-options).
It is the **same function reference** (`useWatch = useKatanaWatch`), not a
re-implementation, so every parameter, default and return type above applies
unchanged. The long name is the safer choice when a file also imports a
framework-level watcher and you want the origin to be obvious at a glance.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useWatch } from "katanakit-js/adapters/nuxt";

const query = ref({ text: "", page: 1 });

useWatch(query, (next, previous) => {
  if (next.text !== previous?.text) next.page = 1; // reset pagination on search
  track("filter-changed", next);
});
</script>
```

**Real use case** — resetting dependent state in one place. Instead of wiring
`@input` handlers on every control, watch the filter object and derive the
consequences (page reset, analytics event, refetch) from a single callback.

**Edge cases**

- Nuxt does not auto-import a `useWatch` composable, so an explicit import is
  always required — and explicit imports win over any auto-import regardless.
- Because both names are the same reference, there is no behavioral difference
  to document; pick one per file and stay consistent for readability.
- Calling the alias during SSR is safe (no DOM access), but reactive effects do
  not run while rendering on the server. Do not rely on the callback firing
  during server-side rendering.

## Related

- [HTTP Client](/guides/services/http-client) — `defineApiConfig` and the Safe Result every helper on this page consumes.
- [Error Handling](/guides/errors) — `useAttempt`, `useErrorNormalize` and the `ApiError` shape behind `error.status`.
- [Vue Adapter](/guides/services/vue-adapter) — the composables that live outside this server-focused subpath.
- [Framework Adapters](/guides/framework-adapters) — how the Nuxt adapter fits next to the React, Solid, Svelte, Angular and Vue entries.
- [API Reference](/api/) — every export, generated from source.
