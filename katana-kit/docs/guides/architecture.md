---
title: Architecture
description: Hexagonal architecture, layer breakdown, design patterns and conventions.
---

KatanaKit follows **hexagonal architecture** (ports and adapters). The goal is a
pure, framework-agnostic core surrounded by adapters that talk to the outside
world (browser APIs, HTTP, frameworks) and a shared kernel of contracts.

The choices behind this shape — and their costs — are recorded as decision
records: [ADR-0004: Hexagonal layout with a pure core](/explanation/decisions/adr-0004-hexagonal-core),
[ADR-0002: Singleton facades](/explanation/decisions/adr-0002-singleton-facades)
and [ADR-0003: Subpath adapters](/explanation/decisions/adr-0003-adapter-subpath-exports).

```
               src/
               │
   ┌───────────▼───────────┐
   │        index.ts       │   main barrel — the public API surface
   └───────────┬───────────┘
               │
   ┌───────────▼───────────┐
   │        types/         │   shared kernel — contracts, domain types,
   │   (single source of   │   facades interfaces (I*), strategy contracts
   │        truth)         │
   └───────────┬───────────┘
               │  implements / consumes contracts
   ┌───────────▼──────────────────────────────────────┐
   │                   core/services/                 │  pure domain services
   │  logger · http · formatter · converter · error   │  (no platform I/O: no
   │  generator · dates · geometry · timing · utils   │   fs, no framework;
   │  reactive · currency                             │   fetch allowed (ADR-0016))
   └───────────┬──────────────────────────────────────┘
               │  owned I/O lives one layer out
   ┌───────────▼──────────────────────────────────────┐
   │              infrastructure/                      │  browser/runtime adapters
   │  dom · storage · viewport · sensors              │  (guard or fall back in SSR)
   │  observer · worker · theme · currency            │
   └───────────┬──────────────────────────────────────┘
               │  framework-facing entry points
   ┌───────────▼──────────────────────────────────────┐
   │                  adapters/                       │  framework adapters
   │   astro/  (AstroService, RssService)            │
   │   express/ (ServerExpress reference)            │
   │   nuxt/    (pure Nuxt helpers)                  │
   │   vue/     (useRequest composable)          │
   └──────────────────────────────────────────────────┘
   │
   ├── config/   siteConfig (typed SiteConfig) + SEO helpers (seo.service.ts)
   ├── prisma/   Prisma schema, generated contract types, db client
```

## Layer-by-layer

### `types/` — the shared kernel

`src/types/index.ts` is the single source of truth for every contract and domain
type in the library: the strategy contracts (`StorageStrategy`, `ICryptoStrategy`,
`IUuidStrategy`), the facade interfaces (`IFetchApiManager`, `IFormatterService`,
`IRssService`, …) and every shared type (`LogLevel`, `Currency`, `FetchResult`,
`ApiError`, …). The complete inventory lives in the
[API Reference](/api/#interfaces).

Services implement these contracts; adapters consume them. Domain rules never
reach for concrete `window` globals or provider SDKs directly; `http.service.ts`
is the documented `fetch` facade
([ADR-0016](/explanation/decisions/adr-0016-universal-runtime-apis-in-core)).

### `core/services/` — the pure layer

Twenty-five service modules with pure logic. This layer never touches `window`,
`document`, the filesystem or any framework. It may use the universal runtime
APIs every supported runtime provides — `fetch` (`http.service.ts` is the HTTP
facade), `URL`, `crypto` and guarded `process.env` — per
[ADR-0016](/explanation/decisions/adr-0016-universal-runtime-apis-in-core).
Platform modules enter only through a lazy `import()` inside a method, as
`generator.service.ts` does with `node:crypto`. The storage-backed signal
`useCreateStorageSignal` lives in
`infrastructure/storage/storage-signal.service.ts`, so no module in `core/`
imports `infrastructure/` — `tests/architecture.test.ts` enforces it.

| File                   | Exports (public facade)                     |
| ---------------------- | ------------------------------------------- |
| `logger.service.ts`    | `LoggerService`, `useLogger`, `useLoggerTable`, `useLoggerClear` |
| `http.service.ts`      | `FetchApiManager`                           |
| `formatter.service.ts` | `FormatterService`                          |
| `converter.service.ts` | `UnitConverterService` (injects `IFormatterService`) |
| `currency.service.ts`  | `CurrencyConverterService` (port: `ICurrencyRateProvider`) |
| `error.service.ts`     | `ErrorService`, `useErrorNormalize`, `useErrorSerialize`, `useErrorCustom`     |
| `result.service.ts`    | `ResultService`, `useAttempt`, `useTryJsonParse`             |
| `generator.service.ts` | `GeneratorService`, `LazyNodeCryptoStrategy`, `NativeUuidStrategy` |
| `faker.service.ts`     | `FakerService` + `useFake*` wrappers (`useFakeEmail`, `useFakeList`, `useFakeSeed`, …) over an optional, lazy-loaded `@faker-js/faker` peer — see [Faker](/guides/faker) |
| `dates.service.ts`     | `DatesService` (Temporal polyfill adapter)  |
| `geometry.service.ts`  | `GeometryAreaService`, `GeometryPerimeterService`, `GeometryVolumeService`, composed as `GeometryUtils` |
| `timing.service.ts`    | `TimingService`                             |
| `utils.service.ts`     | `DataUtils`, `SystemUtils`, `AppUtils`      |
| `reactive.service.ts`  | `ReactiveService` (signals kernel)          |

Every service is a **Singleton class** (`getInstance()`) that owns its state and
exposes `use*` methods; the module also exports thin `use*` wrapper functions
that delegate to `getInstance()`. The wrappers keep the public API stable while
the class carries the implementation:

```ts
export class LoggerService {
	private static instance: LoggerService;
	static getInstance(): LoggerService { /* ... */ }
	useLog(message: string, data?: unknown, level: LogLevel = "log"): void { /* ... */ }
}

// backward-compatible wrapper over the singleton
export function useLogger(message: string, data?: unknown, level: LogLevel = "log"): void {
	LoggerService.getInstance().useLog(message, data, level);
}
```

Some services additionally expose `create()` (or an injectable strategy) for
non-singleton, isolated instances — dependency injection for tests, per-request
clients and custom collaborators (`CurrencyConverterService.create({
provider: fakeRates })`):

### `infrastructure/` — the adapter layer

Adapters that own browser/runtime I/O. Each is SSR-safe: it guards or falls back
gracefully when `window`/`document`/`navigator` is absent.

- `dom/` — `DomService` (query, classes, attributes, events, HTML/text setting)
  plus the `DOM_SERVICE` singleton instance.
- `storage/` — `StorageService` over `localStorage`/`sessionStorage` with
  `LocalStorageStrategy`, `SessionStorageStrategy` and an in-memory
  `MemoryStorageStrategy` SSR fallback.
- `currency/` — `FrankfurterCurrencyProvider` (ECB reference rates, fetched
  through `FetchApiManager`) and the flat helpers (`useCurrencyConverter`,
  `useConvertCurrency`, …) that wire it into `CurrencyConverterService`: the
  composition point between the pure core and the I/O. The core only knows the
  `ICurrencyRateProvider` port — see
  [Currency Conversion](/guides/currency) and
  [ADR-0012](/explanation/decisions/adr-0012-currency-adapter-in-infrastructure).
- `filesystem/` — Node/Bun helpers over `node:fs/promises` (read/write/append,
  JSON, directories, stats, copy/move/remove, hashing) plus `path.service.ts`.
  Built-ins load through dynamic `import()`; every fallible call returns a Safe
  Result with the native errno `code`, and non-Node runtimes get
  `ERR_FS_UNAVAILABLE`. `useReadJsonFile`/`useReadModuleJson` accept an optional
  Zod schema. Full surface: [Filesystem](/guides/filesystem).
- `viewport/` — `ViewportService` (dimensions, scroll, media queries,
  fullscreen, visibility, title).
- `sensors/` — `SensorsUtils` (camera/microphone, geolocation, motion,
  vibration, battery) exported as the `sensorsUtils` instance.
- `observer/` — `ObserverService` and `LazyLoaderService` wrappers around
  `IntersectionObserver`.
- `worker/` — `WorkerService` (one-shot workers and worker pools with an
  SSR/main-thread fallback).
- `theme/` — theme mode switching over DOM + storage + a media-query listener
  (`useInitTheme`, `useToggleTheme`, `useGetThemeMode`, …).
- `decorators/` — composable function decorators (Decorator Pattern) that add
  behaviour without touching the wrapped function:
  - `RetryDecorator(fn, retries?, delayMs?)` — re-runs a failing async function
    with a fixed delay before propagating the last error.
  - `CacheDecorator(fn, { ttlMs?, keyFn? })` — memoizes results by argument key;
    the decorated function also exposes `useClearCache()` / `useCacheSize()`.
  - `LoggerDecorator(fn, label?, level?)` — traces start/ok/error with duration
    for sync and async functions.

  They compose: `RetryDecorator(LoggerDecorator(flakyRequest, "flaky"), 2)`.

  Decorators are exported from the **main barrel** (there is no
  `katanakit-js/infrastructure/*` subpath):

  ```ts
  import { RetryDecorator, CacheDecorator, LoggerDecorator } from "katanakit-js";
  ```

`infrastructure/index.ts` re-exports every module (including the decorators)
and gives stable named exports to the default-exported classes
(`StorageService`, `ViewportService`, `WorkerService`).

### `adapters/` — the framework layer

- `astro/` — pure `use*` helpers: `useAstroPathsFrom` (converts collections
  into `getStaticPaths` payloads, Safe Result style), the RSS family
  (`useAstroGenerateRss`, `useAstroCreateRssEndpoint`, …) for RSS 2.0 XML and
  Astro `GET` endpoints, and SEO re-exports (`useSeoTag`, `useHeadTags`,
  …) for Layout frontmatter. Published as `katanakit-js/adapters/astro`
  (Astro + RSS also available from the main barrel).
- `express/` — a reference Express server (`ServerExpress`), a demo
  `ProductController` and a `router`. Published only as the
  `katanakit-js/adapters/express` subpath so the main bundle never pulls in
  Express. Requires the `express` optional peer dependency.
- `nuxt/` — three **pure exported functions**, not singletons:
  `useUnwrap(result, context?)`, `useSafeResponse(result)` and
  `useEventResponse(event, result)`. They bridge KatanaKit `FetchResult` values
  to Nuxt/Nitro server routes without importing `h3`. Published only as the
  `katanakit-js/adapters/nuxt` subpath.
- `vue/` — `useRequest`, a Vue 3 composable that wraps `useGet` with the
  reactivity system (`data`, `error`, `loading`, `refetch`). It imports `vue`
  directly and is published only as the `katanakit-js/adapters/vue` subpath;
  `vue` is an optional peer dependency.
- `photoswipe/` — `usePhotoSwipe(options)` binds a lightbox from CSS
  selectors (`gallery`, `children`, `root`), plus `usePhotoSwipeOpen`,
  `usePhotoSwipeDestroy` and `usePhotoSwipeSupported`. Rebinding is
  idempotent, so late-rendered galleries are safe. Published only as the
  `katanakit-js/adapters/photoswipe` subpath; `photoswipe` is an optional peer.
- `better-auth/` — `useAuthClient({ framework })` creates the Better Auth
  client for vanilla/react/vue/svelte/solid (only that entry is imported), and
  `useAuthSession` / `useAuthHandler` / `useAstroAuthLocals` wrap the server
  calls in Safe Results. Published only as the
  `katanakit-js/adapters/better-auth` subpath; `better-auth` is an optional peer.

### `config/` — site configuration and SEO

- `site.config.ts` — the `SiteConfig` interface and a default `siteConfig`
  instance (site URL, title, description, language, author, RSS options, SEO
  toggles and optional nav). Required vs optional at a glance:
  `seo` required · `rss` required · `nav?` optional · `ogImage?` optional.
  (`UseSeoMetaOptions` keeps `seo`/`rss` partial because the `defaults`
  fill the gaps; a full `SiteConfig` must carry them.)
- `seo.service.ts` — pure Nuxt-inspired `useSeoMeta(input, config?)` flat object
  API (`SeoMetaInput` / `SeoMetaFlat`: OG, Twitter, article, robots, canonical,
  …), plus `useApplySeoTag` (Vanilla), legacy `useSeoTag`, and helpers
  `useGenerateMetaTags`, `useTitle`, `useRssHeadLink`, `useHeadTags`. Prefer
  Nuxt's own head APIs inside Nuxt. `SiteConfig` inputs are validated
  fail-fast (`assertSiteConfigSeo` / `assertSiteConfigRss`): a missing
  `seo`/`rss` throws `[Seo] SiteConfig.seo is required (caller)` /
  `[Seo] SiteConfig.rss is required (caller)`; `nav` is copied by
  reference and never dereferenced, so it stays optional.

Both are re-exported from the main barrel (`import { siteConfig, type
SiteConfig, useSeoMeta } from "katanakit-js"`) and from
`katanakit-js/adapters/astro`.

### `prisma/` — database layer (optional)

- `schema.prisma` — the Prisma schema (`Account`, `Post`, `Conversation`,
  `Message` models, Prisma ORM contract-first syntax; packaged at
  `dist/prisma/schema.prisma`).
- `schema.json` / `schema.d.ts` — generated contract artifacts
  (**do not edit**; regenerate with `prisma contract emit`).
- `use-prisma.ts` — `usePrismaClient()`, the typed database client built with
  `@prisma/orm-postgres` from the contract and `DATABASE_URL`, read from the
  environment on first call (the package never loads `.env` itself).
- `prisma.config.ts` (repo root) — Prisma CLI/ORM configuration.

This layer is optional: `@prisma/orm-postgres` is an optional peer dependency
(install it with `bun add @prisma/orm-postgres`) and the client is not exported
from the main barrel.

## Package layout and ESM

- **Pure ESM.** `package.json` has `"type": "module"`, `"module":
  "nodenext"` and `"exports"`. Imports always carry an explicit `.js`
  extension (e.g. `import { useLogger } from
  "@/core/services/logger.service.js"`), and cross-folder imports use the `@/`
  alias, so the emitted `dist/` resolves identically under Node's ESM loader
  and bundlers once `tsc-alias` has rewritten the alias (ADR-0009).
- **Exports map.**

  | Import specifier                  | What it exposes                               |
  | --------------------------------- | --------------------------------------------- |
  | `katanakit-js`                    | astro (Astro + RSS), config (site + SEO), core, infrastructure, types |
  | `katanakit-js/adapters/astro`     | `AstroService`, `RssService`, SEO re-exports (`useSeoTag`, …) |
  | `katanakit-js/adapters/express`   | Express reference adapter                     |
  | `katanakit-js/adapters/nuxt`      | Nuxt helpers                                  |
  | `katanakit-js/adapters/vue`       | Vue 3 composable                              |
  | `katanakit-js/adapters/photoswipe`| Lightbox bound by CSS selectors                |
  | `katanakit-js/adapters/better-auth` | Auth client factory + session helpers       |

- **`@/` alias** maps to `src/` in `tsconfig.json` and `vitest.config.ts`. It is
  the standard cross-folder import form inside `src/` itself — same-folder
  imports stay relative (`./x.js`), and `tsc-alias` rewrites the alias in the
  build output. See
  [ADR-0009](/explanation/decisions/adr-0009-alias-imports-in-src).
- **No side effects on import.** Barrel files only re-export; strategy
  instantiation happens lazily inside services, and so do environment reads:
  `usePrismaClient()` resolves `DATABASE_URL` on first call, never at import,
  and it is not exported from the main barrel.

## Design patterns in use

| Pattern    | Where                                                              |
| ---------- | ------------------------------------------------------------------ |
| Singleton  | every service (`FetchApiManager`, `LoggerService`, `ExpressService`, `WordPressService`, `NotionService`, `InsForgeService`, `AssistantService`, `QueryService`, ...) |
| Facade     | `FetchApiManager`, `CurrencyConverterService`, `DomService`, `AppUtils` |
| Strategy   | `AccessService` (`HierarchicalAccessStrategy` / `FlatAccessStrategy`), `AgentService` (`OpenAiCompatibleStrategy`), storage backends, generator crypto/UUID, worker |
| Factory    | `QueryClientFactory` (per-request `QueryClient` for SSR); debounce/throttle/timeout factories in `TimingService`; crypto strategies in `GeneratorService` |
| Observer   | `ReactiveService` signals, `ObserverService`, theme media query, `CurrencyConverterService` (`onRatesUpdate` / `onRatesError`) |
| Dependency Injection | `UnitConverterService` → `IFormatterService`, `CurrencyConverterService` → `ICurrencyRateProvider`, access/crypto strategies — injected via `create()` or `useSet*` |
| Decorator  | `RetryDecorator`, `CacheDecorator`, `LoggerDecorator` (`infrastructure/decorators/`) |
| Adapter    | `DatesService` (Temporal), infrastructure layer, framework adapters |

### How the patterns fit together

Stateful services follow **Singleton + (Strategy | Decorator | Factory | Observer | DI)**:

- **Singleton** — one instance owns the configuration/state
  (`ExpressService`, `WordPressService`, `FetchApiManager`,
  `AssistantService`, `QueryService`).
- **Singleton + Strategy** — the singleton delegates a swappable algorithm:
  `AccessService.useSetStrategy(new FlatAccessStrategy())` and
  `AgentService.useSetStrategy(...)` swap implementations at runtime; both also
  expose a static `create(strategy)` for isolated (non-singleton) instances.
- **Singleton + Decorator** — cross-cutting behaviour wraps functions without
  modifying them (`RetryDecorator`, `CacheDecorator`, `LoggerDecorator`).
- **Singleton + Factory** — the singleton fabricates collaborators through a
  single creation point (`QueryClientFactory.create()` for per-request SSR
  clients vs. the shared `QueryService` singleton).
- **Singleton + Observer + DI** — `CurrencyConverterService` owns the rate
  cache, notifies `onRatesUpdate` / `onRatesError` subscribers and fetches
  through an injected `ICurrencyRateProvider`; `useConvertCurrency()` is the
  Facade layered on top.

SOLID is preserved because the client only knows the contracts
(`IAccessStrategy`, `IAiProviderStrategy`, `StorageStrategy`,
`ICurrencyRateProvider`, `I*Service` facades), never the concrete
implementations. [Service architecture](/explanation/service-architecture)
walks through the vocabulary with the currency converter as the worked example.

## Conventions

- **`use*` methods** — every public method (except `getInstance()` and the
  static factory `create()`) uses the `use` prefix, mirroring React hooks. This
  makes the API consistent and predictable.
- **Singleton class + `use*` wrappers** — each stateful service is a Singleton
  class (`getInstance()`) and the module re-exports thin `use*` wrapper
  functions that delegate to it, so callers keep the functional API
  (`useLogger(...)`, `useFetch(...)`) while the class owns the state. Decorators
  are the exception to the `use*` rule: `RetryDecorator`/`CacheDecorator`/
  `LoggerDecorator` use PascalCase because they are composables, not API
  functions. See [ADR-0002](/explanation/decisions/adr-0002-singleton-facades).
- **`on*` is for callbacks only** — the `on*` prefix marks Observer callbacks
  the service invokes (`onRatesUpdate`, `onRatesError`), never an imperative
  method; registration stays a `use*` call (`useSubscribe`). Statics are
  limited to `getInstance()` and `create(options)` — there are no static
  business methods. See
  [ADR-0010](/explanation/decisions/adr-0010-use-prefix-on-callbacks) and
  [ADR-0011](/explanation/decisions/adr-0011-no-static-business-methods).
- **Safe Result** — fallible operations return a discriminated union
  `{ data, error, ok }` instead of throwing. The generic `SafeResult<T, E>` is
  the base of `FetchResult<T>`, `FilesystemResult<T>`, `AstroServiceResult<T>`,
  `AiResult<T>` and `RssResult`; see [Error Handling](/guides/errors) and
  [ADR-0001](/explanation/decisions/adr-0001-safe-results).
- **Single source of truth** — all contracts and shared types live in
  `src/types/`.
- **English only** — comments, identifiers and messages are written in English.

## Development tooling

The scripts, the gate (`bun run check`) and the local release flow are part of
the [contributing contract](https://github.com/senseikatana/katanakit-js/blob/dev/CONTRIBUTING.md) —
this page stays about the architecture.
