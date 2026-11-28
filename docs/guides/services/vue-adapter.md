---
title: Vue Adapter
description: "Vue 3 composables for the shared TanStack Query Core client and the HTTP client — onQuery, onMutation, onRequest and onKatanaWatch, documented function by function."
---

# Vue Adapter

The Vue adapter lives at `katanakit-js/adapters/vue` and bridges two engines
with Vue's reactivity system:

- the shared **TanStack Query Core** client — caching, request deduplication,
  retries, stale-while-revalidate, focus/reconnect refetch and invalidation —
  through `onQuery()` and `onMutation()`;
- KatanaKit's **HTTP client** — Safe Result requests over the registered APIs —
  through `onRequest()`.

Vue is an optional peer dependency (`vue >= 3.0.0`): install it next to
`katanakit-js` when you import this subpath. There is no Vue plugin to register;
every export is a plain composable or a plain function.

Three rules shape the whole page:

1. **Call composables in `setup()` or an active effect scope.** `onQuery()`,
   `onMutation()` and `onRequest()` create observers and watchers that must be
   disposed; cleanup is automatic when an active scope or component instance
   exists (see [Lifecycle and cleanup](#lifecycle-and-cleanup)). Outside one,
   you own the teardown.
2. **One shared `QueryClient` by default.** Every adapter resolves the same
   process-global client unless you pass a scoped client as the second argument,
   so cached data is shared across components and across
   [framework adapters](/guides/framework-adapters). `queryKey` is the single
   source of identity.
3. **Reactivity style depends on the function.** `onQuery()` / `onMutation()`
   return one shallow-reactive result object (read `query.data` directly);
   `onRequest` returns individual `Ref`s (read `data.value` in script,
   `data` in templates).

**SSR note (Nuxt).** The process-global `QueryClient` must not be shared across
requests on a server. Create a per-request client with `onCreateQueryClient()`,
prefetch and `dehydrate()` / `hydrate()` — see
[Query Client](/guides/query-client) — or use the server helpers documented in
[Nuxt Adapter](/guides/services/nuxt-adapter). No composable here blocks `setup`
while fetching, so server-rendered markup shows the pending state unless you
prefetch first.

## What this entry point exports

| Export | Kind | Purpose |
| --- | --- | --- |
| `onQuery` | Composable | Cached query observer with a reactive TanStack result. |
| `onMutation` | Composable | Mutation observer with a reactive TanStack result. |
| `onRequest` | Composable | Non-cached reactive GET returning `{ data, error, loading, refetch }`. |
| `onKatanaWatch` / `onWatch` | Composable | Vue `watch` with `deep: true` by default and auto-stop on unmount. |
| `onQueryClient` | Accessor | Returns the shared `QueryClient` singleton. |
| `onInitQueryClient` | Config | Replaces the shared client with configured defaults. |
| `onCreateQueryClient` | Factory | Creates a fresh client (per request on SSR). |
| `onSafeQueryFn` | Bridge | Unwraps a Safe Result into a TanStack `queryFn` that throws. |
| `RequestState<T>` | Type | Contract of the `onRequest` return value. |

## Quick example

A component that follows a prop change, shares the cache with any other
`["pokemon", id]` observer, and refreshes the entry through the client:

```vue
<script setup lang="ts">
import { computed } from "vue";
import { defineApiConfig, onGet } from "katanakit-js";
import { onQuery, onQueryClient, onSafeQueryFn } from "katanakit-js/adapters/vue";

defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: { pokemonById: "/pokemon/:id/" },
  },
});

interface Pokemon {
  id: number;
  name: string;
}

const props = defineProps<{ id: number }>();

const query = onQuery(
  computed(() => ({
    queryKey: ["pokemon", props.id],
    queryFn: onSafeQueryFn(() =>
      onGet<Pokemon>("pokeapi", "pokemonById", { params: { id: props.id } }),
    ),
    staleTime: 60_000,
  })),
);

const qc = onQueryClient();
const refresh = () => qc.invalidateQueries({ queryKey: ["pokemon"] });
</script>

<template>
  <p v-if="query.isPending">Loading…</p>
  <p v-else-if="query.isError" role="alert">{{ query.error?.message }}</p>
  <article v-else>
    <h2>{{ query.data?.name }}</h2>
    <small v-if="query.isFetching">refreshing…</small>
    <button @click="refresh">Refresh</button>
  </article>
</template>
```

## Shared query client

These four functions are re-exported from the adapter entry point so a Vue app
can import everything from one path. Their full behavior is documented in
[Query Client](/guides/query-client); this section focuses on what matters from
Vue.

### onQueryClient()

```ts
function onQueryClient(): QueryClient;
```

Returns the shared `QueryClient`, lazily creating it on first call. Use it to
invalidate, prefetch, seed or clear cache entries from component code, stores
and event handlers. Because the client is module-global, the same instance is
returned by every adapter (React, Solid, Svelte, Angular) in the same runtime.

```ts
import { onQueryClient } from "katanakit-js/adapters/vue";

const qc = onQueryClient();

await qc.invalidateQueries({ queryKey: ["pokemon"] });
qc.setQueryData(["pokemon", 25], { id: 25, name: "pikachu" });
```

When called `onQuery({ ... }, client)`, the explicit `client` argument wins and
the singleton is not touched.

**Real use case** — an optimistic update from a non-component module: when an
external event (websocket, service worker message) says a record changed, grab
the shared client and invalidate the matching key so every mounted
`onQuery()` refetches without prop drilling.

### onInitQueryClient(config?)

```ts
function onInitQueryClient(config?: QueryClientConfig): QueryClient;
```

Replaces the shared client with a configured one and **clears the previous
client's caches** before swapping. Call it once at bootstrap to set app-wide
defaults. Every later `onQuery()` / `onMutation()` picks up the new instance;
observers created before the swap keep pointing at the old one.

```ts
import { onInitQueryClient } from "katanakit-js/adapters/vue";

onInitQueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 2, refetchOnWindowFocus: true },
  },
});
```

`defaultQueryOptions()` is applied to the options passed to every
`onQuery()` — both at creation and on each reactive option update.

**Real use case** — configure retry/`staleTime` policy once in the app entry
file, then forget about it: components stay free of cache tuning, and tests can
call `onInitQueryClient()` to start from a clean, deterministic cache.

### onCreateQueryClient(config?)

```ts
function onCreateQueryClient(config?: QueryClientConfig): QueryClient;
```

Creates a **fresh** client without touching the singleton. This is the SSR
primitive: one client per request avoids leaking one user's data to another.

```ts
import { dehydrate, onCreateQueryClient } from "katanakit-js";

const client = onCreateQueryClient();
await client.prefetchQuery({ queryKey, queryFn });
const state = dehydrate(client); // ship to the client, then hydrate()
```

**Real use case** — a Nuxt server plugin or SSR handler that prefetches page
data per request, dehydrates the cache, and hydrates it in the browser so the
first client render reads warm data instead of refetching.

### onSafeQueryFn(fn)

```ts
function onSafeQueryFn<T>(
  fn: (context: QueryFunctionContext) => Promise<FetchResult<T>>,
): (context: QueryFunctionContext) => Promise<T>;
```

Bridges the two error contracts. KatanaKit requests return a Safe Result
(`{ data, error, ok }`) and never throw; TanStack expects `queryFn` to resolve
with data and **throw** on failure. `onSafeQueryFn()` unwraps the result and
throws a real `Error` carrying `status` on failure, so `error`, `isError` and
retry logic behave normally. The upstream response body is **not** attached to
the thrown error.

```ts
import { onFetch, onSafeQueryFn } from "katanakit-js";

queryFn: onSafeQueryFn(({ signal }) =>
  onFetch("pokeapi", "pokemonById", { method: "GET", params: { id }, signal }),
);
```

The `context` argument is TanStack's `QueryFunctionContext`; forward its
`signal` when you want a query cancellation to abort the HTTP request too.

**Real use case** — migrate an existing `onGet()` call to a cached query
without changing its error handling: wrap it in `onSafeQueryFn()` and the Safe
Result failure becomes a thrown error that TanStack retries and surfaces.

## Queries

### onQuery(options, client?)

```ts
function onQuery<TQueryFnData = unknown, TError = Error, TData = TQueryFnData>(
  options: MaybeRef<QueryObserverOptions<TQueryFnData, TError, TData>>,
  client?: QueryClient,
): QueryObserverResult<TData, TError>;
```

Creates a `QueryObserver` against the resolved client (the shared singleton when
`client` is omitted) and returns its result as a **shallow-reactive object**.
Subscribing to the observer is what starts the fetch, and the subscription feeds
every cache event into the returned state, so templates re-render on their own
when `data`, `status` or `fetchStatus` change.

`options` may be a plain `QueryObserverOptions` object or a `ref` / `computed`.
When it is reactive, a deep watcher calls `observer.setOptions()` with the
unwrapped value, which changes the `queryKey` and triggers a fetch for the new
key. `client.defaultQueryOptions()` is applied on creation and on every update,
so app-wide defaults from `onInitQueryClient()` are honored.

The result is TanStack's native `QueryObserverResult`. The fields you will reach
for most:

| Field | Type | Meaning |
| --- | --- | --- |
| `data` | `TData \| undefined` | Last successful data. |
| `error` | `TError \| null` | Last error. |
| `status` | `"pending" \| "error" \| "success"` | Query status. |
| `fetchStatus` | `"fetching" \| "paused" \| "idle"` | Fetch activity, separate from `status`. |
| `isPending` | `boolean` | No data yet. |
| `isFetching` | `boolean` | A request is in flight (first load **or** background refetch). |
| `isLoading` | `boolean` | `isPending && isFetching`. |
| `isSuccess` / `isError` | `boolean` | Derived from `status`. |
| `isRefetching` | `boolean` | Refetching while data already exists. |
| `isStale` | `boolean` | Data is older than `staleTime`. |
| `refetch` | `(options?) => Promise<…>` | Manually refetch. |

Edge cases worth knowing:

- **Do not destructure the result.** The object is reactive, but its properties
  are plain values; `const { data } = onQuery(...)` captures a snapshot. Read
  `query.data` or convert with `toRefs(query)`.
- **Reactive options need a reactive source.** A plain object passed directly is
  evaluated once for the deep watcher; wrap it in `computed()` / `ref()` to
  change keys. Mutating a nested property of a non-reactive options object is
  invisible to Vue.
- **Identity is the `queryKey`.** Changing it makes the observer switch cache
  entries; the previous entry stays available for `gcTime` and is returned
  instantly if you switch back.
- **Cleanup is scope-based.** `onScopeDispose()` unsubscribes the observer when
  a component or `effectScope()` owns it. Outside a scope the subscription lives
  on — run inside `const scope = effectScope()` and `scope.stop()` when calling
  it from plain scripts.

```vue
<script setup lang="ts">
import { computed } from "vue";
import { onGet } from "katanakit-js";
import { onQuery, onSafeQueryFn } from "katanakit-js/adapters/vue";

const props = defineProps<{ id: number }>();

const query = onQuery(
  computed(() => ({
    queryKey: ["pokemon", props.id],
    queryFn: onSafeQueryFn(() =>
      onGet<{ name: string }>("pokeapi", "pokemonById", { params: { id: props.id } }),
    ),
  })),
);
</script>

<template>
  <span v-if="query.isPending">Loading…</span>
  <span v-else-if="query.isError">{{ query.error?.message }}</span>
  <span v-else>{{ query.data?.name }}</span>
</template>
```

**Cache sharing across components** — two components calling `onQuery()` with
the same `queryKey` share one cache entry; only one request is in flight
(deduplication), both reactive results update together, and
`invalidateQueries({ queryKey })` from anywhere refetches both. This is what
makes list/detail screens consistent without a global store.

**Real use case** — a search box with a debounced filter: keep the term in a
`ref`, build the options with `computed()`, and let the observer swap keys as
the user types. `keepPreviousData` or `placeholderData` keeps the old page on
screen while the next one loads, which is exactly the stale-while-revalidate
behavior TanStack provides.

## Mutations

### onMutation(options, client?)

```ts
function onMutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  options: MaybeRef<MutationObserverOptions<TData, TError, TVariables, TContext>>,
  client?: QueryClient,
): MutationObserverResult<TData, TError, TVariables, TContext>;
```

Creates a `MutationObserver` and returns its result as a shallow-reactive
object. Mutations are **not cached**: each `mutate()` call executes the
`mutationFn`, updates the reactive state, then finishes — the result stays until
`reset()` or the next call.

`options` accepts the full TanStack mutation surface — `mutationFn`,
`onMutate`, `onSuccess`, `onError`, `onSettled`, `retry` — as a plain object or
a `ref` / `computed`. A deep watcher forwards changes to
`observer.setOptions()`, which affects the next `mutate()` call (it does not
cancel an in-flight one).

The returned `MutationObserverResult` exposes:

| Member | Type | Meaning |
| --- | --- | --- |
| `mutate` | `(variables, options?) => void` | Fire-and-forget trigger; callbacks still run. |
| `mutateAsync` | `(variables, options?) => Promise<TData>` | Awaited trigger; rejects on failure. |
| `reset` | `() => void` | Returns the observer to `idle` and clears `data` / `error`. |
| `data` | `TData \| undefined` | Result of the last successful call. |
| `error` | `TError \| null` | Error of the last failed call. |
| `variables` | `TVariables \| undefined` | Variables of the current/last call. |
| `status` | `"idle" \| "pending" \| "success" \| "error"` | Mutation status. |
| `isPending` | `boolean` | A call is running. |
| `isSuccess` / `isError` | `boolean` | Derived from `status`. |
| `failureCount` / `failureReason` | `number` / `TError \| null` | Retry bookkeeping. |

Edge cases worth knowing:

- **Invalidate explicitly.** A mutation never touches query caches. Call
  `qc.invalidateQueries()` / `qc.setQueryData()` in `onSuccess`, or use
  `onMutate` for optimistic updates.
- **`mutate()` swallows errors by design** (they land in `error`); use
  `mutateAsync()` when you want to `await` and `try/catch` in the caller.
- **Reusing one observer.** Calling `mutate()` again while pending is allowed;
  the latest call wins the reactive state. Call `reset()` to clear it.
- **Cleanup is scope-based**, like `onQuery()`: the subscription is removed via
  `onScopeDispose()` when a scope owns the composable.

```vue
<script setup lang="ts">
import { onPost } from "katanakit-js";
import { onMutation, onQueryClient } from "katanakit-js/adapters/vue";

const qc = onQueryClient();

const create = onMutation({
  mutationFn: (name: string) => onPost<{ id: number; name: string }>("api", "createUser", { name }),
  onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
});
</script>

<template>
  <button :disabled="create.isPending" @click="create.mutate('Ada')">Create</button>
  <p v-if="create.isError">{{ create.error?.message }}</p>
</template>
```

**Real use case** — an inline “mark as done” toggle: call `mutateAsync({ id })`,
and in `onMutate` write the optimistic value into the cached list with
`setQueryData`; on error TanStack restores the snapshot you return from
`onMutate`, keeping the UI truthful without a manual rollback path.

## Requests without a cache

### onRequest(apiName, endpointName, options?)

```ts
interface RequestState<T> {
  data: Ref<T | null>;
  error: Ref<ApiError | null>;
  loading: Ref<boolean>;
  refetch: () => Promise<void>;
}

function onRequest<T>(
  apiName: string,
  endpointName: string,
  options?: MaybeRef<UrlOptions>,
): RequestState<T>;
```

A lightweight, no-cache reactive GET over a registered API, built on `onFetch()`
with `method: "GET"`. It bridges the Safe Result pattern to idiomatic Vue state
and **never throws on HTTP errors** — failures go to `error` instead. Reach for
it for one-off fetches that do not need TanStack's cache; use
[`onQuery()`](#onqueryoptions-client) when you want caching, deduplication or
retries.

Parameters:

| Param | Type | Notes |
| --- | --- | --- |
| `apiName` | `string` | Name used in `defineApiConfig()`. |
| `endpointName` | `string` | Endpoint key inside that API. |
| `options` | `MaybeRef<UrlOptions>` | `params`, `query`, `ignoreDefaultQuery`; plain or reactive. |

Returned refs:

| Member | Type | Notes |
| --- | --- | --- |
| `data` | `Ref<T \| null>` | `shallowRef`, starts `null`; keeps the previous value while a refetch runs and after failures. |
| `error` | `Ref<ApiError \| null>` | Safe Result error (`message`, `status`, `details?`); reset to `null` when a refetch starts. |
| `loading` | `Ref<boolean>` | Starts `true` because the composable fetches on setup; `true` during any refetch. |
| `refetch` | `() => Promise<void>` | Re-runs the request manually; resolves even on failure. |

Behavior details:

- **Initial fetch.** `refetch()` is invoked once during setup (not awaited), so
  the first render already has `loading === true`.
- **Reactive options.** When `options` is a ref/computed, a deep watcher
  refetches on every change, so path params and query strings can drive the
  request. A plain object is evaluated once.
- **Stale responses are dropped.** A version counter plus a per-request
  `AbortController` guarantee that only the newest request writes state; the
  previous controller is aborted when a new `refetch()` starts.
- **Abort errors are suppressed.** A result from an aborted or superseded
  request never lands in `error`, so unmounting a component cannot flash an
  “aborted” message.
- **Cleanup on unmount.** Inside a component, `onUnmounted` marks the composable
  disposed and aborts the in-flight controller. Outside a component instance
  there is no unmount hook: the request is not aborted automatically.
- **SSR.** The fetch starts on the server too, but rendering does not await it;
  use `onQuery()` with prefetching or the Nuxt server helpers when the first
  paint needs data.

```vue
<script setup lang="ts">
import { computed } from "vue";
import { onRequest } from "katanakit-js/adapters/vue";

const props = defineProps<{ id: number }>();

const { data, error, loading, refetch } = onRequest<{ name: string }>(
  "pokeapi",
  "pokemonById",
  computed(() => ({ params: { id: props.id } })),
);
</script>

<template>
  <p v-if="loading">Loading…</p>
  <p v-else-if="error">{{ error.message }}</p>
  <div v-else>
    <h1>{{ data?.name }}</h1>
    <button @click="refetch">Refresh</button>
  </div>
</template>
```

**Real use case** — a dashboard widget that must always show fresh server state
and never serve a cached copy: `onRequest()` refetches on every mount and on
every filter change, while `data` stays visible during the refetch so the card
does not collapse back into a spinner.

## Watch integration

The adapter also ships a generic reactive watcher. It is a thin wrapper around
Vue's native `watch` with one changed default — `deep: true` — plus automatic
teardown on unmount. It has no DOM dependency, so it is SSR-safe. A longer,
framework-level overview lives in [Generic Watch](/guides/watch).

### onKatanaWatch(source, callback, options?)

```ts
function onKatanaWatch<T>(
  source: WatchSource<T> | Array<WatchSource<unknown>>,
  callback: WatchCallback<T, T | undefined>,
  options: WatchOptions = {},
): WatchStopHandle;
```

Creates the watcher and returns Vue's native stop handle. Because `deep` is
merged as `{ deep: true, ...options }`, passing `{ deep: false }` restores the
shallow behavior; every other option is forwarded untouched.

| Option | Default | Notes |
| --- | --- | --- |
| `deep` | `true` | Watch nested mutations on refs, reactive objects and getters. |
| `immediate` | `false` | Run the callback once on creation. |
| `flush` | `"pre"` | `"pre"`, `"post"` or `"sync"`. |
| `once` | `false` | Stop after the first trigger. |

`source` accepts exactly what `watch` accepts: a `ref`, a `reactive` object, a
getter function, or an array of those. `callback` receives
`(newValue, oldValue)` and may be sync or async, with or without arguments —
`() => checkValidations()` is valid. A manual `stop()` works at any time, and
calling it twice is harmless.

In-component cleanup uses `getCurrentInstance()` + `onUnmounted(stop)`, so the
watcher stops automatically when called from `setup`. Called outside a
component, it keeps running until you call the returned handle.

```ts
import { ref } from "vue";
import { onKatanaWatch } from "katanakit-js/adapters/vue";

const product = ref({ name: "", price: 0 });

const stop = onKatanaWatch(product, (next, previous) => {
  console.log(previous, "->", next);
});

stop(); // manual teardown outside a component
```

**Real use case** — draft autosave: debounce inside the callback (or watch a
`computed` of the draft), and every nested edit re-triggers persistence without
deep-watching boilerplate or a manual `watch(..., { deep: true })` at each call
site.

### onWatch(source, callback, options?)

`onWatch` is **the same function reference** as `onKatanaWatch` — same
signature, same defaults, same cleanup. It exists purely as the short everyday
name.

```ts
import { ref } from "vue";
import { onWatch } from "katanakit-js/adapters/vue";

const cart = ref({ items: [] as { price: number }[] });
const total = ref(0);

onWatch(
  () => cart.value.items,
  (items) => {
    total.value = items.reduce((sum, item) => sum + item.price, 0);
  },
);
```

`onWatch` can also run schema-agnostic validation on every nested change:
whatever parser exposes `safeParse` (Zod, Valibot, a custom function) can fill a
`fieldErrors` ref from the callback.

**Real use case** — derived state that must not live in a `computed` because it
performs a side effect: recalculate a cart total, update a form’s valid flag, or
mirror a selection into URL state, all with a single teardown handle.

## Lifecycle and cleanup

| Function | Cleanup mechanism | Trigger |
| --- | --- | --- |
| `onQuery` | `getCurrentScope()` + `onScopeDispose(unsubscribe)` | Component unmount or `effectScope().stop()`. |
| `onMutation` | `getCurrentScope()` + `onScopeDispose(unsubscribe)` | Component unmount or `effectScope().stop()`. |
| `onRequest` | `getCurrentInstance()` + `onUnmounted(abort)` | Component unmount only. |
| `onKatanaWatch` | `getCurrentInstance()` + `onUnmounted(stop)` | Component unmount; manual `stop()` anywhere. |

`onQuery()` and `onMutation()` are the flexible pair: any active
`effectScope()` — not just a component — gets automatic disposal, which makes
them safe inside composables and tests. `onRequest` and `onKatanaWatch` key on
a component instance, matching the lifecycle hooks they use. When no scope or
instance exists, none of them registers cleanup; the returned stop handle (where
available) or the owning scope is your responsibility.

## Related

- [Nuxt Adapter](/guides/services/nuxt-adapter) — server helpers and Vue
  re-exports for Nuxt.
- [Query Client](/guides/query-client) — the shared TanStack engine behind
  `onQuery()` and `onMutation()`.
- [HTTP Client](/guides/services/http-client) — `defineApiConfig`,
  `onGet()` and the Safe Result consumed by `onRequest()`.
- [Framework Adapters](/guides/framework-adapters) — the same surface across
  React, Solid, Svelte and Angular.
- [API Reference](/api/) — every export generated from source.
