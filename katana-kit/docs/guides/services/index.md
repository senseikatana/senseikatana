---
title: Services
description: One page per service — HTTP, DOM, storage, dates, workers and every other building block.
---

# Services

Every service in KatanaKit follows the same architecture: a small public API
over a **pure core**, with the runtime I/O isolated behind it and SSR guards
where the browser or Node/Bun is touched. Two public shapes exist, and both are
re-exported as `use*` helpers from the package root:

- **Singleton facade classes** — every `src/core/services/` module is one:
  `FormatterService`, `UnitConverterService`, `CurrencyConverterService`,
  `LoggerService`, `DatesService`, `FetchApiManager`, … expose `use*` methods
  and a `getInstance()` accessor (plus `create()` where dependencies are
  injected). [Service architecture](/explanation/service-architecture) explains
  the pattern vocabulary and the `use*` vs `on*` naming rule.
- **Function modules with strategies** — the infrastructure modules (DOM,
  storage, theme, viewport, observer and friends) ship standalone `use*`
  functions; behavior is swapped through strategy objects (for example,
  `LocalStorageStrategy`, `SessionStorageStrategy` and `MemoryStorageStrategy`
  behind the storage API).

```ts
// Class-based facade
import { FetchApiManager } from "katanakit-js";

const api = FetchApiManager.getInstance();
api.useGetApi("pokeapi", "pokemonById", { params: { id: 25 } });

// Function module — same contract, no instance
import { useGetApi } from "katanakit-js";

useGetApi("pokeapi", "pokemonById", { params: { id: 25 } });
```

The [API Reference](/api/) is generated from the source; the pages below are
the hand-written reference companion: an overview paragraph, a quick example
and one section per method with runnable examples.

## Core

| Service                                        | Description                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| [HTTP Client](/guides/services/http-client)     | Register APIs, build URLs and call every HTTP method with Safe Results.  |
| [Logger](/guides/services/logger)               | Log at every level with a small, replaceable logger and table output.    |
| [Storage](/guides/services/storage)             | Typed local and session storage with an SSR-safe in-memory fallback.     |
| [DOM](/guides/services/dom)                     | SSR-safe DOM queries, element creation, attributes, classes and scroll.  |
| [Reactive](/guides/services/reactive)           | Signals, effects, memos and toggles for reactive state.                  |
| [Formatter](/guides/services/formatter)         | Locale-aware number, currency and date formatting.                       |
| [Converter](/guides/services/converter)         | Unit conversions for temperature, distance and weight.                   |
| [Currency Conversion](/guides/currency)         | Convert amounts against ECB reference rates, with pluggable providers.  |
| [Error Helpers](/guides/services/error-helpers) | Attempt, JSON parsing, normalize and serialize for unknown throws.       |
| [Generator](/guides/services/generator)         | IDs, slugs, tokens and other generated values with zero dependencies.    |
| [Dates](/guides/services/dates)                 | Temporal-based date math: now, add or subtract days, boundaries.         |
| [Geometry](/guides/services/geometry)           | Area, perimeter and volume helpers with formatted output.                |
| [Timing](/guides/services/timing)               | Delays, intervals, debounce, throttle and retry helpers.                 |
| [Viewport](/guides/services/viewport)           | Viewport size, scroll position, media queries and prefers-* state.       |
| [Observer](/guides/services/observer)           | Create and manage Intersection, Resize and Mutation observers.           |
| [Worker](/guides/services/worker)               | Spawn workers, run functions off-thread and manage worker pools.         |

## Platform

| Service                                        | Description                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| [Theme](/guides/services/theme)                 | Dark and light mode with persistence, system preference and DOM sync.    |
| [Astro Adapter](/guides/services/astro-adapter) | Typed static paths and service access from Astro pages and endpoints.    |
| [RSS](/guides/services/rss)                     | Build RSS endpoints and parse feeds for content channels and embeds.     |
| [SEO](/guides/services/seo)                     | Generate HTML head and Open Graph tags from a single flat config.        |

## Integrations

| Service                                        | Description                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| [Nuxt Adapter](/guides/services/nuxt-adapter)   | Nuxt composables and server-plugin helpers for the HTTP client.   |
| [Vue Adapter](/guides/services/vue-adapter)     | Vue reactivity wrappers around the HTTP client and query cache.   |
| [Express Server](/guides/services/express-server) | Start an Express server with the toolkit defaults and API config. |
