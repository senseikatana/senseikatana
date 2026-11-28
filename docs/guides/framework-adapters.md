---
title: Framework Adapters
description: Use KatanaKit's query client from React, Solid, Svelte, and Angular with native reactivity in each framework.
---

KatanaKit ships first-class adapters for the major front-end frameworks. They wrap the same core [`QueryClient`](./query-client.md) and Safe Result pattern, but expose it with each framework's native reactivity:

- **React** — hooks with `useState` / `useEffect` (`katanakit-js/adapters/react`)
- **Solid** — fine-grained signals (`katanakit-js/adapters/solid`)
- **Svelte** — readable stores (`katanakit-js/adapters/svelte`)
- **Angular** — signals, injection-context aware (`katanakit-js/adapters/angular`)
- **Vue** — composables with `ref`/`shallowRef` (`katanakit-js/adapters/vue`)
- **Nuxt** — H3 server helpers (`katanakit-js/adapters/nuxt`)

Every UI adapter exposes the same surface: `onQuery`, `onMutation`, `onRequest`, and `onWatch`. `onQuery`/`onMutation` wrap TanStack Query and return its native result object (`isPending`, `isFetching`, `isSuccess`, `isError`, `data`, `error`, `status`, …); `onRequest`/`onWatch` are KatanaKit's own primitives, each exposed with the framework's reactivity. Meta-frameworks such as Nuxt and Astro layer their own server helpers on top — see their pages for the exact surface.

## onQuery

::: code-group

```tsx [React]
import { onQuery, onSafeQueryFn } from "katanakit-js/adapters/react";
import { onGet, defineApiConfig } from "katanakit-js";

defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: { pokemonById: "/pokemon/:id/" },
  },
});

function Pokemon({ id }: { id: number }) {
  const { data, isPending, error } = onQuery({
    queryKey: ["pokemon", id],
    queryFn: onSafeQueryFn(() => onGet("pokeapi", "pokemonById", { params: { id } })),
  });

  if (isPending) return <div>Loading…</div>;
  if (error) return <div>{error.message}</div>;
  return <div>{data?.name}</div>;
}
```

```tsx [Solid]
import { Show } from "solid-js";
import { onQuery, onSafeQueryFn } from "katanakit-js/adapters/solid";
import { onGet } from "katanakit-js";

function Pokemon() {
  const query = onQuery(() => ({
    queryKey: ["pokemon", 25],
    queryFn: onSafeQueryFn(() => onGet("pokeapi", "pokemonById", { params: { id: 25 } })),
  }));

  return (
    <Show when={!query.isPending} fallback={<div>Loading…</div>}>
      <div>{query.data?.name}</div>
    </Show>
  );
}
```

```svelte [Svelte]
<script lang="ts">
  import { onQuery, onSafeQueryFn } from "katanakit-js/adapters/svelte";
  import { onGet } from "katanakit-js";

  const query = onQuery({
    queryKey: ["pokemon", 25],
    queryFn: onSafeQueryFn(() => onGet("pokeapi", "pokemonById", { params: { id: 25 } })),
  });
</script>

{#if $query.isPending}
  <div>Loading…</div>
{:else if $query.isError}
  <div>{$query.error?.message}</div>
{:else}
  <div>{$query.data?.name}</div>
{/if}
```

```ts [Angular]
import { Component } from "@angular/core";
import { onQuery, onSafeQueryFn } from "katanakit-js/adapters/angular";
import { onGet } from "katanakit-js";

@Component({
  selector: "app-pokemon",
  template: `@if (query.isPending()) { Loading… } @else { {{ query.data()?.name }} }`,
})
export class PokemonComponent {
  readonly query = onQuery({
    queryKey: ["pokemon", 25],
    queryFn: onSafeQueryFn(() => onGet("pokeapi", "pokemonById", { params: { id: 25 } })),
  });
}
```

:::

The Angular adapter must be called inside an injection context (component field initializer, constructor, or service) so it can auto-cleanup via `DestroyRef`.

## onMutation

Mutations are not cached — they execute and report their state. Call `mutate(variables)` and read the result:

::: code-group

```tsx [React]
import { onMutation, onQueryClient } from "katanakit-js/adapters/react";
import { onPost } from "katanakit-js";

function CreateUser() {
  const qc = onQueryClient();
  const { mutate, isPending } = onMutation({
    mutationFn: (name: string) => onPost("api", "createUser", { name }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  return <button disabled={isPending} onClick={() => mutate("Ada")}>Create</button>;
}
```

```tsx [Solid]
import { onMutation, onQueryClient } from "katanakit-js/adapters/solid";
import { onPost } from "katanakit-js";

function CreateUser() {
  const qc = onQueryClient();
  const mutation = onMutation(() => ({
    mutationFn: (name: string) => onPost("api", "createUser", { name }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  }));

  return <button disabled={mutation.isPending} onClick={() => mutation.mutate("Ada")}>Create</button>;
}
```

```svelte [Svelte]
<script lang="ts">
  import { onMutation, onQueryClient } from "katanakit-js/adapters/svelte";
  import { onPost } from "katanakit-js";

  const qc = onQueryClient();
  const mutation = onMutation({
    mutationFn: (name: string) => onPost("api", "createUser", { name }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
</script>

<button disabled={$mutation.isPending} on:click={() => $mutation.mutate("Ada")}>Create</button>
```

```ts [Angular]
import { Component } from "@angular/core";
import { onMutation, onQueryClient } from "katanakit-js/adapters/angular";
import { onPost } from "katanakit-js";

@Component({ selector: "app-create", template: `<button [disabled]="mutation.isPending()" (click)="mutation.mutate('Ada')">Create</button>` })
export class CreateUserComponent {
  private readonly qc = onQueryClient();
  readonly mutation = onMutation({
    mutationFn: (name: string) => onPost("api", "createUser", { name }),
    onSuccess: () => this.qc.invalidateQueries({ queryKey: ["users"] }),
  });
}
```

:::

## onRequest

`onRequest` is a lighter, no-cache reactive GET over a registered API — ideal for one-off fetches that don't need the full query cache. It returns `{ data, error, loading, refetch }` and never throws on HTTP errors. (Previously exported as `useKatanaFetch`; the old name was removed in v7.)

```tsx
import { onRequest } from "katanakit-js/adapters/react"; // or /solid, /svelte, /angular, /vue

function Pokemon() {
  const { data, error, loading } = onRequest<{ name: string }>(
    "pokeapi",
    "pokemonById",
    { params: { id: 25 } },
  );
  if (loading) return <div>Loading…</div>;
  if (error) return <div>{error.message}</div>;
  return <div>{data?.name}</div>;
}
```

## onWatch

`onWatch(source, callback)` invokes `callback(value, previous)` whenever the watched value changes. The `source` type is framework-idiomatic: a getter in React/Solid/Angular, a store in Svelte, and a ref/reactive/getter in Vue.

```tsx
// React / Solid / Angular: a getter
onWatch(() => product, (next, prev) => console.log(next, prev));
```

```svelte
<!-- Svelte: a store -->
<script>
  import { writable } from "svelte/store";
  const product = writable({ name: "", price: 0 });
  onWatch(product, (next, prev) => console.log(next, prev));
</script>
```

## Capability guards

`onRequireCapability()` turns an access capability into whatever a framework
uses to gate a request. Every adapter answers the same two refusals the same
way:

| | Anonymous | Authenticated, missing capability |
| --- | --- | --- |
| Message | `Authentication required` | `Missing capability: <capability>` |
| Server guards (Express, Hono, Nest) | `401` | `403` |
| Astro / Next — defaults | `401` | `403` |
| Astro / Next — with `redirectTo` | redirect | redirect to `forbiddenTo` |
| Nuxt route middleware | `redirectTo` | `forbiddenTo` |

Both bodies are the toolkit's `{ ok, data, error }` envelope. A subject with a
role the registry does not know is treated as **unauthorized**, never as an
error — a typo in a role slug must not become an open route.

The subject is resolved by the caller, because the toolkit ships no auth
provider. A WordPress backend resolves it from the user it just fetched:

```ts
import { onWpAsSubject } from "katanakit-js/adapters/wordpress";

const subject = onWpAsSubject(wpUser); // { id, roles }
```

::: code-group

```ts [Astro]
// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { onRequireCapability } from "katanakit-js/adapters/astro";

const guard = onRequireCapability(
  "orders:read:any",
  (context) => resolveSubject(context.locals.user),
  { redirectTo: "/login", forbiddenTo: "/403" },
);

export const onRequest = defineMiddleware((context, next) =>
  context.url.pathname.startsWith("/admin") ? guard(context, next) : next(),
);
```

```ts [Next.js]
// proxy.ts  (Next.js 16+; use middleware.ts on 15 and earlier)
import { onRequireCapability } from "katanakit-js/adapters/next";

export const proxy = onRequireCapability(
  "orders:read:any",
  (request) => resolveSubject(readUserFromCookie(request.headers.get("cookie"))),
  { redirectTo: "/login", forbiddenTo: "/403" },
);

export const config = { matcher: ["/admin/:path*"] };
```

```ts [Nuxt]
// middleware/admin.ts
import { onRequireCapability } from "katanakit-js/adapters/nuxt";

export default defineNuxtRouteMiddleware(
  onRequireCapability(
    "orders:read:any",
    (to) => resolveSubject(readUserFromCookie(to)),
    { redirectTo: "/login", forbiddenTo: "/403" },
  ),
);
```

```ts [Hono]
import { onRequireCapability } from "katanakit-js/adapters/hono";

app.post("/orders/:id/publish", onRequireCapability("orders:update:any", resolve), handler);
```

:::

Two things are different per platform, and both are the platform's doing:

- **A page navigation cannot receive a JSON body.** Astro and Next therefore
  take `redirectTo`; leaving it out reproduces the server guards exactly, which
  is what an API route wants. `forbiddenTo` is separate because a subject who
  *is* signed in and lacks the capability must not be sent back to sign-in.
- **Nuxt's route layer has no HTTP status at all.** A route middleware either
  navigates or aborts, so the refusals are destinations rather than codes.
  Omitting them aborts the navigation with no error page — give both.

Server routes in Nuxt are a different path: `onUnwrap()` and `onSafeResponse()`
on an H3 event already carry the status code.

## Sharing state across frameworks

All adapters share the same global [`QueryClient`](./query-client.md) singleton (unless you pass your own instance), so cached data is shared across adapters and even across frameworks in the same app. The `queryKey` is the single source of truth for identity and invalidation.
