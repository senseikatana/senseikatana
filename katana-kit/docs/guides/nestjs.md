---
title: NestJS
description: "KatanaKitModule, an injectable KatanaKit facade, capability guards and a drop-in logger for Nest applications."
---

# NestJS

`katanakit-js/adapters/nestjs` integrates the toolkit with
[NestJS](https://nestjs.com). It is an **optional subpath**: the main
`katanakit-js` barrel never imports Nest, and `@nestjs/common` (`>=10`) is
declared as an optional peer dependency, so the adapter costs nothing unless you
install it deliberately.

The adapter is deliberately small. It exports four building blocks:

| Export | Kind | Purpose |
| --- | --- | --- |
| `KatanaKitModule` | dynamic module | registers APIs and the shared query client at bootstrap |
| `KatanaKitService` | injectable facade | the same `use*` HTTP methods, resolved through DI |
| `useRequireCapability()` | guard factory | turns an access capability into a Nest `CanActivate` guard |
| `KatanaLogger` | `LoggerService` | forwards Nest logs to `LoggerService` from KatanaKit |

`KATANA_KIT_OPTIONS` and the `KatanaKitModuleOptions` type are also exported for
advanced manual providers.

Two design rules shape everything on this page:

1. **Safe Results stay inside services.** The adapter never throws on an HTTP
   failure and never installs a global exception filter. Every request still
   returns `{ data, error, ok }`, and your service decides which
   `HttpException` (if any) that failure becomes — Nest's exception pipeline
   owns the HTTP mapping.
2. **No magic DI beyond the facade.** `KatanaKitModule` registers exactly one
   provider (`KatanaKitService`) plus the options token. The underlying
   `FetchApiManager` registry and the shared TanStack `QueryClient` are the same
   module-level singletons used everywhere else in KatanaKit; the facade only
   gives Nest providers a typed handle to them.

## Quick example

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { KatanaKitModule } from "katanakit-js/adapters/nestjs";
import { ProductsModule } from "./products/products.module.js";

@Module({
  imports: [
    KatanaKitModule.forRoot({
      apis: {
        catalog: {
          baseUri: "https://api.example.com/v1",
          endpoints: { productById: "/products/:id" },
        },
      },
    }),
    ProductsModule,
  ],
})
export class AppModule {}
```

```ts
// products/products.service.ts
import { Injectable } from "@nestjs/common";
import { KatanaKitService } from "katanakit-js/adapters/nestjs";

@Injectable()
export class ProductsService {
  constructor(private readonly kit: KatanaKitService) {}

  findById(id: string) {
    return this.kit.useGet<{ id: string; name: string }>("catalog", "productById", {
      params: { id },
    });
  }
}
```

The service returns the Safe Result untouched; the full
[products resource](#full-example-a-products-resource) example later maps
`ok: false` to Nest exceptions.

## Install

```bash
npm i katanakit-js @nestjs/common reflect-metadata
```

- `@nestjs/common` is the only peer the adapter declares (`>=10.0.0`,
  optional). `@nestjs/core` arrives with any Nest application and needs no
  extra entry here.
- `reflect-metadata` is a Nest requirement, not a KatanaKit one — Nest relies on
  decorator metadata. Import it once at your entry point if your `main.ts` does
  not already do so.
- KatanaKit publishes ESM and requires Node `>=22.18` (see
  `engines`). Nest projects on TypeScript `module: nodenext` can import the
  subpath directly.

## Module

`KatanaKitModule.forRoot(options?)` returns a `DynamicModule` with three fixed
pieces:

```ts
{
  module: KatanaKitModule,
  global: options.global ?? true,
  providers: [KatanaKitService, { provide: KATANA_KIT_OPTIONS, useValue: options }],
  exports: [KatanaKitService],
}
```

The options object:

| Option | Type | Default | What it does |
| --- | --- | --- | --- |
| `apis` | `ApisConfig` | `undefined` | APIs registered once during module initialization (same shape as `defineApiConfig`) |
| `queryClient` | `QueryClientConfig` | `undefined` | initializes the shared TanStack Query client with this configuration |
| `global` | `boolean` | `true` | registers the module globally so feature modules can inject the service without importing it again |

### Registration timing

`forRoot()` itself does nothing but declare providers — the API registry and the
query client are configured later, when Nest calls
[`KatanaKitService.onModuleInit()`](#onmoduleinit). Nest runs `onModuleInit`
after the dependency graph is resolved, and dependencies are initialized before
their dependents, so any service that injects `KatanaKitService` can already
use the registered APIs inside its own `onModuleInit`.

The hook is idempotent: it registers the options exactly once, guarded by an
internal flag, and never re-registers on repeated calls.

### Global vs. scoped

With the default `global: true`, `KatanaKitService` is injectable everywhere
without importing `KatanaKitModule` in each feature module. Pass
`global: false` when you want the integration scoped to an explicitly importing
module — useful in monorepos or when several Nest contexts should hold
different registries.

```ts
KatanaKitModule.forRoot({
  global: false,
  apis: {
    catalog: {
      baseUri: process.env.CATALOG_URL ?? "https://api.example.com/v1",
      endpoints: { productById: "/products/:id" },
    },
  },
  queryClient: {
    defaultOptions: { queries: { staleTime: 30_000, retry: 2 } },
  },
});
```

**Real use case** — environment-driven wiring: read `baseUri` values from
`process.env` at `forRoot()` time (or provide the options through
`KATANA_KIT_OPTIONS` with a `useFactory` when you need `ConfigService`), and
give the shared query client server-friendly defaults in the same call.

## Injecting the kit

`KatanaKitService` is the single injectable facade. Its constructor receives the
[injection token](#module) `KATANA_KIT_OPTIONS` through `@Inject`, so you never
construct it yourself in application code — declare it as a constructor
parameter and Nest resolves it.

Every method delegates to `FetchApiManager.getInstance()` (or to the shared
query client) and behaves exactly like the module-level helpers documented in
[HTTP Client](/guides/services/http-client). Mixing both styles in one app is
safe because they share the same process-global registry.

| Method | Signature | Notes |
| --- | --- | --- |
| `onModuleInit` | `() => void` | registers `apis` and `queryClient` once |
| `useInit` | `(apisConfig: ApisConfig) => void` | runtime registration, idempotent per entry |
| `useGetApis` | `() => ApisConfig` | shallow copy of the registry |
| `useBuildUrl` | `(apiName, endpointName, options?) => string` | synchronous; throws on config errors |
| `useFetch` | `<T>(apiName, endpointName, options?) => Promise<FetchResult<T>>` | full option set |
| `useGet` | `<T>(apiName, endpointName, urlOptions?) => Promise<FetchResult<T>>` | URL options only |
| `usePost` | `<T>(apiName, endpointName, body?, urlOptions?) => Promise<FetchResult<T>>` | auto-serialized body |
| `usePut` | `<T>(apiName, endpointName, body?, urlOptions?) => Promise<FetchResult<T>>` | auto-serialized body |
| `usePatch` | `<T>(apiName, endpointName, body?, urlOptions?) => Promise<FetchResult<T>>` | auto-serialized body |
| `useDelete` | `<T>(apiName, endpointName, urlOptions?) => Promise<FetchResult<T>>` | no body |
| `useQueryClient` | `() => QueryClient` | shared process-global client |

### onModuleInit()

Lifecycle hook called by Nest after the module is initialized. It registers
`options.apis` when present and initializes the shared query client when
`options.queryClient` is present. You do not call it in application code; tests
do (see [Testing](#testing)).

- **Parameters** — none.
- **Returns** — `void`. Idempotent: repeated calls after the first are no-ops.

### useInit(apisConfig)

Registers APIs without going through the module options. Under the hood it calls
the core `FetchApiManager.useInit()`, which shallow-merges the definitions into
the singleton registry (later definitions win for identical keys) and is
idempotent per entry.

- **Parameters** — `apisConfig: ApisConfig`, the same shape accepted by
  `defineApiConfig()`.
- **Returns** — `void`.

```ts
kit.useInit({
  analytics: {
    baseUri: "https://analytics.example.com",
    endpoints: { events: "/events" },
  },
});
```

**Real use case** — a feature module that registers an integration only when
its feature flag is enabled, or a test that needs a fixture API without booting
the whole module graph. In a Nest app, prefer
`KatanaKitModule.forRoot({ apis })` for the integrations known at bootstrap.

### useGetApis()

Returns a **shallow copy** of the registry, so iterating or deleting keys never
mutates the singleton.

- **Parameters** — none.
- **Returns** — `ApisConfig` (a copy).

```ts
const apis = kit.useGetApis();

for (const [name, entry] of Object.entries(apis)) {
  logger.log(`${name}: ${entry.baseUri} (${Object.keys(entry.endpoints).length} endpoints)`);
}
```

**Real use case** — a `/health/integrations` endpoint that reports which
upstream services are configured. Combine it with `Promise.allSettled()` over a
cheap endpoint per API to distinguish "not configured" from "configured but
unreachable".

### useBuildUrl(apiName, endpointName, options?)

Builds the exact URL a request would use, without performing it: `baseUri` +
endpoint path, `:param` substitution, `defaultQueryParams` merge and the
http(s) scheme guard.

- **Parameters**
  - `apiName: string` — key in the registry.
  - `endpointName: string` — key in the API's `endpoints`.
  - `options?: UrlOptions` — `params`, `query`, `ignoreDefaultQuery`.
- **Returns** — `string`. Because it is synchronous, it **throws** instead of
  returning a Safe Result on an unregistered API, an unknown endpoint, a missing
  placeholder or a disallowed scheme.

```ts
const url = kit.useBuildUrl("catalog", "productById", { params: { id: "p-42" } });
// → "https://api.example.com/v1/products/p-42"
```

**Real use case** — links you hand to another system (webhooks, report
downloads, emails) where you want the URL without paying for a request. Call it
during bootstrap when a config mistake should fail fast, or wrap it with
[`useAttempt()`](/guides/errors) when the failure belongs to the request.

### useFetch(apiName, endpointName, options?)

The general-purpose request. URL options live at the top level, next to
`method`, `headers`, `body`, `signal` and any other `RequestInit` field — no
nesting. It never throws: transport failures, config mistakes and a failing
`transform` all come back as `ok: false`.

- **Parameters**
  - `apiName: string` / `endpointName: string` — registry coordinates.
  - `options?: FetchOptions<T>` — `UrlOptions` plus the full `RequestInit`
    surface and an optional `transform`.
- **Returns** — `Promise<FetchResult<T>>`:

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

Like the core service, `useFetch()` calls `fetch` with `redirect: "error"` by
default — opt into redirects explicitly with `redirect: "follow"` when the
endpoint is trusted.

```ts
const result = await kit.useFetch<{ id: string }>("catalog", "products", {
  method: "POST",
  body: { name: "Canvas Tote", price: 24 },
  headers: { Authorization: `Bearer ${token}` },
  signal: controller.signal,
});

if (result.ok) {
  return result.data.id;
}
```

**Real use case** — per-request authentication: a Nest service receives the
token or tenant id from the current request (middleware, `AsyncLocalStorage`,
request-scoped provider) and attaches it at call time through `headers` or
`query`. The registry itself stays immutable after startup, exactly as the
[HTTP Client](/guides/services/http-client) docs recommend.

### useGet(apiName, endpointName, urlOptions?)

GET helper over a registered endpoint, accepting only URL options.

- **Parameters** — `apiName`, `endpointName`, `urlOptions?: UrlOptions`.
- **Returns** — `Promise<FetchResult<T>>`; annotate `T` with the response shape
  because the type argument is not inferred.

```ts
const result = await kit.useGet<Product>("catalog", "productById", {
  params: { id: "p-42" },
});

if (result.ok) {
  console.log(result.data.name, result.status);
} else {
  console.error(result.error.status, result.error.message);
}
```

**Real use case** — read-through caching in a service: check the local store
first, and only call upstream when the entity is missing, as the
[products example](#full-example-a-products-resource) does.

### usePost(apiName, endpointName, body?, urlOptions?)

POST helper. The body is JSON-serialized with a matching `Content-Type` unless
it is already raw (`FormData`, `Blob`, `URLSearchParams`, `ArrayBuffer`, typed
arrays, `ReadableStream`, plain strings), in which case it is forwarded
untouched.

- **Parameters** — `apiName`, `endpointName`, `body?: unknown`,
  `urlOptions?: UrlOptions`.
- **Returns** — `Promise<FetchResult<T>>`; `T` is the created resource on `ok:
  true`.

```ts
const result = await kit.usePost<Product>("catalog", "products", {
  name: "Canvas Tote",
  price: 24,
});
```

**Real use case** — server-side form or file forwarding: accept a multipart
upload in a Nest interceptor/controller and pass the incoming `File`/`Blob`
straight through, letting the runtime set the boundary instead of forcing JSON.

### usePut(apiName, endpointName, body?, urlOptions?)

PUT helper for full-resource replacement. Same signature and serialization
rules as `usePost()`.

- **Parameters** — `apiName`, `endpointName`, `body?: unknown`,
  `urlOptions?: UrlOptions`.
- **Returns** — `Promise<FetchResult<T>>`.

```ts
await kit.usePut<Product>("catalog", "productById", fullProduct, {
  params: { id: "p-42" },
});
```

**Real use case** — an internal sync job that mirrors a complete record from
one system to another; use `usePatch()` instead when only a few fields change.

### usePatch(apiName, endpointName, body?, urlOptions?)

PATCH helper for partial updates.

- **Parameters** — `apiName`, `endpointName`, `body?: unknown`,
  `urlOptions?: UrlOptions`.
- **Returns** — `Promise<FetchResult<T>>`.

```ts
await kit.usePatch<Product>("catalog", "productById", { price: 29 }, {
  params: { id: "p-42" },
});
```

**Real use case** — toggling a flag or updating one attribute without
round-tripping the entity, which avoids clobbering fields another writer changed
concurrently.

### useDelete(apiName, endpointName, urlOptions?)

DELETE helper. It takes no body; pass identifiers through `params` or `query`.

- **Parameters** — `apiName`, `endpointName`, `urlOptions?: UrlOptions`.
- **Returns** — `Promise<FetchResult<T>>`. Upstream `204` responses produce
  `data: null` with `ok: true`.

```ts
const result = await kit.useDelete("catalog", "productById", {
  params: { id: "p-42" },
});

if (result.ok) {
  store.delete("p-42");
}
```

**Real use case** — idempotent cleanup jobs: a nightly task deletes stale
resources and branches on `result.ok` per item, collecting failures into a
report instead of aborting on the first throw.

### useQueryClient()

Returns the shared TanStack `QueryClient`, creating it on first access.

- **Parameters** — none.
- **Returns** — `QueryClient` from `@tanstack/query-core` (re-exported by
  `katanakit-js`).

```ts
const client = kit.useQueryClient();

await client.invalidateQueries({ queryKey: ["products"] });
```

::: warning
The shared client is **process-global** — the same instance is reused across
requests for the lifetime of the Nest process. Do not use it to cache
per-request, per-user data without scoping the `queryKey` by user; for
request-scoped caches use `useCreateQueryClient()` / `QueryClientFactory.create()`
from `katanakit-js` instead.
:::

**Real use case** — write-through invalidation: after a successful `usePost()`,
invalidate the list key so the next read refetches, or seed the cache with
`client.setQueryData()` using the entity the upstream returned.

### Injecting it into a service

```ts
import { Injectable } from "@nestjs/common";
import { KatanaKitService } from "katanakit-js/adapters/nestjs";

export interface Product {
  id: string;
  name: string;
  price: number;
}

@Injectable()
export class CatalogService {
  constructor(private readonly kit: KatanaKitService) {}

  findById(id: string) {
    return this.kit.useGet<Product>("catalog", "productById", { params: { id } });
  }

  create(input: Pick<Product, "name" | "price">) {
    return this.kit.usePost<Product>("catalog", "products", input);
  }
}
```

That is the entire integration for HTTP: a constructor parameter and the same
method names you would import from the main barrel.

## Route guard

`useRequireCapability(capability, resolveSubject)` builds a Nest guard from the
toolkit's access service. It mirrors the behavior of the Express guard in
[Express Server](/guides/services/express-server) on Nest's exception pipeline.

```ts
import { useRequireCapability } from "katanakit-js/adapters/nestjs";

const Guard = useRequireCapability(
  "content:publish",
  (request) => request.account ?? null,
);
```

- **Parameters**
  - `capability: AccessCapability` — one of the capabilities declared by the
    access schema (`content:create`, `content:publish`, `content:edit:any`,
    `conversations:use`, `members:manage`, `roles:assign`, `system:admin`, …).
  - `resolveSubject: (request: TRequest) => AccessSubject | null` — resolves the
    caller from the request. Return `null` for anonymous requests.
- **Returns** — `Type<CanActivate>`, ready for `@UseGuards(...)`.

The toolkit ships no auth provider, so the subject is whatever your
authentication layer attached to the request: a decoded JWT payload, a session
row, an API-key record. `AccessSubject` only requires `{ id: string | number;
roles: AccessRole[] }`, where roles are `owner | admin | editor | author |
member | guest` and capabilities are inherited down the hierarchy.

### 401 and 403 shapes

| Scenario | Exception | Body |
| --- | --- | --- |
| `resolveSubject` returns `null` | `UnauthorizedException` | `{ "ok": false, "data": null, "error": { "message": "Authentication required", "status": 401 } }` |
| Subject resolved but `useCan()` is `false` | `ForbiddenException` | `{ "ok": false, "data": null, "error": { "message": "Missing capability: <capability>", "status": 403 } }` |
| `useCan()` throws (malformed subject, unknown role) | `ForbiddenException` | same 403 body — the guard fails closed |

Both bodies use the same `{ ok, data, error }` envelope as the rest of the
toolkit, so clients can parse errors uniformly.

### Request typing

`useRequireCapability<TRequest>` defaults to `unknown`, so parameterize it with
the platform request type. Nest runs on Express by default; with the Fastify
adapter the raw request is Fastify's. A structural type works for both and keeps
KatanaKit free of framework imports:

::: code-group

```ts [Express]
import type { Request } from "express";
import type { AccessSubject } from "katanakit-js";
import { useRequireCapability } from "katanakit-js/adapters/nestjs";

interface AccountRequest extends Request {
  account?: AccessSubject | null;
}

export const CanPublish = useRequireCapability<AccountRequest>(
  "content:publish",
  (request) => request.account ?? null,
);
```

```ts [Fastify]
import type { AccessSubject } from "katanakit-js";
import { useRequireCapability } from "katanakit-js/adapters/nestjs";

interface FastifyAccountRequest {
  account?: AccessSubject | null;
}

export const CanPublish = useRequireCapability<FastifyAccountRequest>(
  "content:publish",
  (request) => request.account ?? null,
);
```

:::

Define guards at module scope — as in the examples above — so the capability
and resolver closure are created once and shared by every route that uses the
guard.

### Controller example

```ts
import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CanPublish } from "./content.guards.js";

@Controller("articles")
export class ArticlesController {
  @Get("drafts")
  @UseGuards(CanPublish)
  drafts() {
    return [];
  }

  @Post(":id/publish")
  @UseGuards(CanPublish)
  publish() {
    return { published: true };
  }
}
```

**Real use case** — public reads, gated writes: leave `GET` handlers open and
attach guards only to mutating routes, one capability per route group. Because
the guard is just a class, the same capability can be reused across controllers
without duplicating the check.

## Logger

`KatanaLogger` is a drop-in replacement for Nest's built-in logger. It
implements Nest's `LoggerService` interface and forwards each call to
KatanaKit's logger.

| Nest method | Forwards to | Console level |
| --- | --- | --- |
| `log(message, …)` | `useLogger` | `log` |
| `error(message, …)` | `useLoggerError` | `error` |
| `warn(message, …)` | `useLoggerWarn` | `warn` |
| `debug(message, …)` | `useLogger` | `log` |
| `verbose(message, …)` | `useLogger` | `log` |
| `table(data)` | `useLoggerTable` | `table` |

Nest has five log levels and KatanaKit has three, so **`debug` and `verbose`
both map to `log`**. Messages are normalized before forwarding: strings pass
through, an `Error` becomes its `message`, and anything else is
`JSON.stringify`-ed with a `String()` fallback for circular values. Extra
arguments Nest passes (`context`, error stack, …) are forwarded unchanged as the
logger's `data` argument, so stacks still reach the console.

Bootstrap it once and Nest routes application and framework logs through your
existing console pipeline:

```ts
import { NestFactory } from "@nestjs/core";
import { KatanaLogger } from "katanakit-js/adapters/nestjs";
import { AppModule } from "./app.module.js";

const app = await NestFactory.create(AppModule, { logger: new KatanaLogger() });
await app.listen(3000);
```

The ADAPTER does not register the logger as a provider, so constructing it
manually is expected. If you want to inject it too, add `KatanaLogger` to a
module's `providers` — the `@Injectable()` decorator is already in place.

**Real use case** — a startup summary that prints the registered integrations as
a table, then lets the application run under the same logger:

```ts
import { useGetApis } from "katanakit-js";

const logger = new KatanaLogger();

const apis = useGetApis();
logger.table(
  Object.entries(apis).map(([name, entry]) => ({
    api: name,
    baseUri: entry.baseUri,
    endpoints: Object.keys(entry.endpoints).length,
  })),
);
```

## Full example: a products resource

This walkthrough builds a small products feature with an in-memory store that
delegates persistence to an external catalog API through KatanaKit. Writes are
protected by capability guards, and every `ok: false` becomes an explicit Nest
exception. The pieces are the same ones you would use in a real CRUD module —
only the storage is simplified.

### Step 1 — Register the external API

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { KatanaKitModule } from "katanakit-js/adapters/nestjs";
import { ProductsModule } from "./products/products.module.js";

@Module({
  imports: [
    KatanaKitModule.forRoot({
      apis: {
        catalog: {
          baseUri: "https://api.example.com/v1",
          endpoints: {
            productById: "/products/:id",
            products: "/products",
          },
          defaultQueryParams: { products: { limit: 20 } },
        },
      },
      queryClient: {
        defaultOptions: { queries: { staleTime: 30_000 } },
      },
    }),
    ProductsModule,
  ],
})
export class AppModule {}
```

The module is global by default, so `ProductsModule` injects
`KatanaKitService` without importing anything. Registration happens when Nest
calls `onModuleInit()`, before the first request is served.

### Step 2 — Declare the write guards

```ts
// products/products.guards.ts
import type { AccessSubject } from "katanakit-js";
import { useRequireCapability } from "katanakit-js/adapters/nestjs";

export interface AccountRequest {
  account?: AccessSubject | null;
}

export const CanCreateProduct = useRequireCapability<AccountRequest>(
  "content:create",
  (request) => request.account ?? null,
);

export const CanEditProduct = useRequireCapability<AccountRequest>(
  "content:edit:any",
  (request) => request.account ?? null,
);

export const CanDeleteProduct = useRequireCapability<AccountRequest>(
  "content:delete:any",
  (request) => request.account ?? null,
);
```

An authentication middleware upstream sets `request.account`; the guard reads
it and answers 401/403 before the controller runs. `author` grants
`content:create`, `editor` and above grant the `:any` scopes — see
[Route guard](#route-guard) for the exact capabilities.

### Step 3 — Service: Safe Results become Nest exceptions

```ts
// products/products.service.ts
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { KatanaKitService } from "katanakit-js/adapters/nestjs";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CreateProductInput {
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private readonly store = new Map<string, Product>();

  constructor(private readonly kit: KatanaKitService) {}

  async findById(id: string): Promise<Product> {
    const cached = this.store.get(id);
    if (cached) return cached;

    const result = await this.kit.useGet<Product>("catalog", "productById", {
      params: { id },
    });

    if (!result.ok) {
      if (result.error.status === 404) {
        throw new NotFoundException(`Product ${id} was not found`);
      }
      throw new BadRequestException(result.error.message);
    }

    this.store.set(result.data.id, result.data);
    return result.data;
  }

  async list(query?: string): Promise<Product[]> {
    const result = await this.kit.useGet<Product[]>("catalog", "products", {
      query: { q: query, limit: 20 },
    });

    if (!result.ok) {
      throw new BadRequestException(result.error.message);
    }

    for (const product of result.data) this.store.set(product.id, product);
    return result.data;
  }

  async create(input: CreateProductInput): Promise<Product> {
    const result = await this.kit.usePost<Product>("catalog", "products", input);

    if (!result.ok) {
      throw new BadRequestException({
        message: result.error.message,
        details: result.error.details,
      });
    }

    this.store.set(result.data.id, result.data);
    return result.data;
  }

  async update(id: string, changes: Partial<CreateProductInput>): Promise<Product> {
    const current = await this.findById(id);

    const result = await this.kit.usePatch<Product>(
      "catalog",
      "productById",
      changes,
      { params: { id } },
    );

    if (!result.ok) {
      if (result.error.status === 404) {
        throw new NotFoundException(`Product ${id} was not found`);
      }
      throw new BadRequestException(result.error.message);
    }

    const merged = { ...current, ...result.data };
    this.store.set(merged.id, merged);
    return merged;
  }

  async remove(id: string): Promise<{ id: string }> {
    await this.findById(id);

    const result = await this.kit.useDelete("catalog", "productById", {
      params: { id },
    });

    if (!result.ok) {
      throw new BadRequestException(result.error.message);
    }

    this.store.delete(id);
    return { id };
  }
}
```

Why this shape matters:

1. **One translation point.** The service is the only layer that knows about
   `FetchResult`. Controllers return domain types; Nest turns `NotFoundException`
   and `BadRequestException` into 404/400 responses through its standard
   exception pipeline. The adapter intentionally ships no exception filter, so
   this mapping is explicit and yours to adjust.
2. **`status === 404` is a business answer, not a transport failure.** Upstream
   "not found" becomes a Nest 404; every other failure (5xx, network `status:
   0`, config errors) becomes a `BadRequestException` carrying the original
   message. If you want network failures to surface as `ServiceUnavailable`,
   branch on `result.error.status === 0` before the fallback.
3. **The store is a cache, not a database.** `findById()` fills it on a hit and
   `create()`/`update()` refresh it after upstream confirms, so repeated reads
   skip the network. Restarting the process clears it — replace the `Map` with
   Prisma or another store without touching the HTTP logic.
4. **`useDelete()` may return `data: null` on `204`.** The service ignores the
   upstream body and answers `{ id }`, keeping the controller contract stable.

### Step 4 — Controller: guard the writes

```ts
// products/products.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  CanCreateProduct,
  CanDeleteProduct,
  CanEditProduct,
} from "./products.guards.js";
import {
  CreateProductInput,
  ProductsService,
} from "./products.service.js";

@Controller("products")
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(@Query("q") query?: string) {
    return this.products.list(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.products.findById(id);
  }

  @Post()
  @UseGuards(CanCreateProduct)
  create(@Body() body: CreateProductInput) {
    return this.products.create(body);
  }

  @Patch(":id")
  @UseGuards(CanEditProduct)
  update(@Param("id") id: string, @Body() changes: Partial<CreateProductInput>) {
    return this.products.update(id, changes);
  }

  @Delete(":id")
  @UseGuards(CanDeleteProduct)
  @HttpCode(200)
  remove(@Param("id") id: string) {
    return this.products.remove(id);
  }
}
```

Reads stay public; each mutation carries the narrowest capability that fits.
Because the controller returns the service promise directly, Nest serializes the
result and applies the exceptions thrown inside the service — no `try/catch` in
the controller.

### Step 5 — Feature module

```ts
// products/products.module.ts
import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller.js";
import { ProductsService } from "./products.service.js";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

No import of `KatanaKitModule` is needed: it is global, and
`KatanaKitService` is already available to any provider.

**Request summary:** `GET /products` and `GET /products/:id` are open and go
through `useGet`; `POST /products`, `PATCH /products/:id` and
`DELETE /products/:id` pass a capability guard first, then write through
`usePost`/`usePatch`/`useDelete`, and every upstream failure is translated into
a 404 or 400 by `ProductsService`.

## Testing

The adapter needs no `@nestjs/testing`: `KatanaKitService`, the guards and the
logger are plain classes. Instantiate them directly, call `onModuleInit()`, and
assert.

```ts
import { beforeEach, describe, expect, it } from "vitest";
import { KatanaKitService } from "katanakit-js/adapters/nestjs";

describe("CatalogService", () => {
  let kit: KatanaKitService;

  beforeEach(() => {
    kit = new KatanaKitService({
      apis: {
        catalog: {
          baseUri: "https://api.example.com/v1",
          endpoints: { productById: "/products/:id" },
        },
      },
    });
    kit.onModuleInit();
  });

  it("registers the APIs passed to the module options", () => {
    expect(kit.useGetApis()).toHaveProperty("catalog");
  });

  it("builds the same URL the request would use", () => {
    expect(kit.useBuildUrl("catalog", "productById", { params: { id: "p-42" } }))
      .toBe("https://api.example.com/v1/products/p-42");
  });
});
```

Two gotchas:

- The registry behind `KatanaKitService` is the **process-global**
  `FetchApiManager` singleton, shared across test files in the same worker.
  Register unique API keys per file, or register the same fixture in
  `beforeEach()` — `useInit()` merges and later definitions win.
- `onModuleInit()` is idempotent, so calling it after manually registering a
  fixture is safe; it never re-registers the options.

For a service like `ProductsService`, stub the facade instead of hitting the
network — its methods are ordinary class methods:

```ts
import { NotFoundException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import type { KatanaKitService } from "katanakit-js/adapters/nestjs";
import { ProductsService } from "./products.service.js";

describe("ProductsService", () => {
  it("maps an upstream 404 to NotFoundException", async () => {
    const kit = {
      useGet: vi.fn().mockResolvedValue({
        data: null,
        error: { message: "HTTP Error: Not Found", status: 404 },
        url: "https://api.example.com/v1/products/missing",
        status: 404,
        ok: false,
      }),
    } as unknown as KatanaKitService;

    const products = new ProductsService(kit);

    await expect(products.findById("missing")).rejects.toBeInstanceOf(NotFoundException);
    expect(kit.useGet).toHaveBeenCalledWith("catalog", "productById", {
      params: { id: "missing" },
    });
  });
});
```

Guards are tested with a fake `ExecutionContext` — only `switchToHttp()` and
`getRequest()` are read:

```ts
import {
  ForbiddenException,
  UnauthorizedException,
  type ExecutionContext,
} from "@nestjs/common";
import type { AccessSubject } from "katanakit-js";
import { useRequireCapability } from "katanakit-js/adapters/nestjs";
import { expect, it } from "vitest";

interface TestRequest {
  account?: AccessSubject | null;
}

const Guard = useRequireCapability<TestRequest>(
  "content:publish",
  (request) => request.account ?? null,
);

const contextFor = (request: TestRequest): ExecutionContext =>
  ({
    switchToHttp: () => ({ getRequest: () => request }),
  }) as unknown as ExecutionContext;

const guard = new Guard();

it("allows an editor to publish", () => {
  expect(
    guard.canActivate(contextFor({ account: { id: 1, roles: ["editor"] } })),
  ).toBe(true);
});

it("rejects anonymous requests with 401", () => {
  expect(() => guard.canActivate(contextFor({}))).toThrow(UnauthorizedException);
});

it("rejects a member with 403", () => {
  expect(() =>
    guard.canActivate(contextFor({ account: { id: 2, roles: ["member"] } })),
  ).toThrow(ForbiddenException);
});
```

`KatanaLogger` can be tested the same way: spy on `console.log`, call
`logger.debug("…")`, and assert it landed on `log`.

## Related

- [HTTP Client](/guides/services/http-client) — registration, URL building and
  every option the facade forwards.
- [Error Handling](/guides/errors) — the Safe Result contract and the
  `useAttempt()` helper.
- [Framework Adapters](/guides/framework-adapters) — the browser-side adapters
  sharing the same query client.
- [Express Server](/guides/services/express-server) — the Express variant of the
  capability guard.
- [API Reference](/api/) — every export, generated from source.
