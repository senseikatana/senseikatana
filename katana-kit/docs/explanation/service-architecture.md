---
title: Service Architecture
description: "Why every service is a Singleton facade — the Singleton/Facade/Observer/Strategy/DI vocabulary, the use* vs on* naming rule, and how the core stays free of I/O."
---

# Service architecture: one vocabulary

Every `src/core/services/` module in KatanaKit is a **Singleton class** that
exposes `use*` methods, and every module also re-exports those methods as thin
`use*` wrapper functions. That shape is not decoration — it is the vocabulary
that lets you read any service in the kit the same way, whether it is
`FormatterService`, `UnitConverterService`, `CurrencyConverterService` or
`ReactiveService`.

This page explains why the vocabulary exists and where its seams are. For the
tasks, see the [guides](/guides/services/); for exact signatures, the
[API Reference](/api/).

## The shape of a service

```ts
export class CurrencyConverterService {
  private static instance: CurrencyConverterService;

  private constructor() {
    /* wires defaults */
  }

  static getInstance(): CurrencyConverterService {
    /* the shared instance */
  }

  async useConvert(options: CurrencyConvertOptions): Promise<SafeResult<CurrencyConversion>> {
    /* ... */
  }
}

// Thin wrapper over the singleton — the functional API stays stable.
export async function useConvertCurrency(options: CurrencyConvertOptions) {
  return CurrencyConverterService.getInstance().useConvert(options);
}
```

Three things fall out of this shape:

- **One instance owns the state.** A cache, a set of subscribers, a configured
  provider — state needs a home, and the singleton is that home. Pure
  functions cannot hold a TTL cache without smuggling state through globals.
- **The call site never changes.** The wrappers keep the functional surface
  (`useConvertCurrency(...)`) that the kit has always had, so the refactor to
  classes was invisible to consumers. Prefer the class when you need to hold an
  instance or inject dependencies; prefer the wrapper when you just call it.
- **`create()` is the DI door.** Statics are limited to `getInstance()` and
  `create(options)`. There are no static business methods: a static method is
  hidden global state plus a function you cannot substitute in a test. Work
  that needs collaborators goes through the constructor (see
  [ADR-0011](/explanation/decisions/adr-0011-no-static-business-methods)).

## The pattern vocabulary

The kit uses a small, fixed set of patterns. Learn these five and you can
predict the API of any service before reading it.

| Pattern | What it means here | Worked example |
| --- | --- | --- |
| **Singleton** | `getInstance()` returns the one shared instance. | Every core service. |
| **Facade** | One call hides the machinery behind it. | `useConvertCurrency()` hides rate fetching, caching, cross-rate math and rounding. |
| **Observer** | The service invokes your `on*` callbacks when something happens. | `onRatesUpdate` / `onRatesError` on rate fetches. |
| **Strategy** | An algorithm is swapped through a contract. | `IAccessStrategy` (hierarchical vs flat), `ICryptoStrategy` (UUID/hash backends). |
| **Dependency Injection** | Collaborators arrive through `create(options)` or `useSet*`, never through imports at call sites. | `UnitConverterService` formats through an injected `IFormatterService`; `CurrencyConverterService` fetches through an injected `ICurrencyRateProvider`. |

Patterns compose on purpose. `CurrencyConverterService` is Singleton + Facade +
Observer + DI at once: one shared instance, one call per conversion, callbacks
when rates move, and a rate source you can replace. The composition is the
point, not a pile of flags — each pattern answers one question (where does
state live? what does the caller see? how am I told? where does I/O come
from?), and the answers stay separate.

## The naming contract

Names in the kit carry meaning. Three rules, applied uniformly:

1. **`use*` is the public prefix** for every method you call imperatively —
   `useConvert`, `useSubscribe`, `useFormatCurrency`. It is the same convention
   as React hooks: a `use*` name means *you invoke this*.
2. **`on*` is reserved exclusively for Observer callbacks** — handlers the
   service invokes, never methods you call (`onRatesUpdate`, `onRatesError`).
   An `on*` name means *the service invokes this*. Imperative methods are
   never renamed to `on*`, even when they sound event-ish — `useSubscribe` is
   the call; the `on*` handlers are its payload (see
   [ADR-0010](/explanation/decisions/adr-0010-use-prefix-on-callbacks)).
3. **Private helpers use plain, unprefixed names** (`resolveRate`,
   `roundAmount`) — they are implementation, not API.

The payoff is mechanical: in any call site you can tell who calls whom from the
prefix alone. A code review can flag a new `on*` method that should be a
`use*` method (or the reverse) without knowing the module.

## Why the core has no platform I/O

`src/core/services/` is pure domain logic. It never reads the filesystem and
never touches the DOM; its direct contact with the outside world is limited to
universal runtime APIs — chiefly `http.service.ts` wrapping the global `fetch`,
present in every supported runtime. [ADR-0004](/explanation/decisions/adr-0004-hexagonal-core)
introduced the layout and
[ADR-0016](/explanation/decisions/adr-0016-universal-runtime-apis-in-core)
draws the boundary: universal APIs are allowed, platform modules only through a
lazy `import()`. When a domain operation *needs* the outside world — exchange
rates are the worked example — the dependency is expressed as a **port**: an
interface in the shared kernel (`ICurrencyRateProvider` in `src/types/`), not
an import from an implementation.

```
src/core/services/currency.service.ts     knows ICurrencyRateProvider (port)
                     ▲                    never knows Frankfurter
                     │ injects
src/infrastructure/currency/              owns the network I/O
  frankfurter.service.ts                  FrankfurterCurrencyProvider → FetchApiManager
  currency.service.ts                     flat helpers = the composition point
```

The rule `src/core/` never imports `src/infrastructure/` is enforced by
`tests/architecture.test.ts`, not by good intentions. Three consequences
follow:

- **The core compiles and tests without a network.** A test injects a fake
  provider through `CurrencyConverterService.create({ provider })` and never
  waits on a real request.
- **The rate source is a decision, not a dependency.** The default
  (Frankfurter/ECB) is wired by `useCurrencyConverter()` in the composition
  module; a live-market provider is one `useSetProvider()` away (see
  [ADR-0012](/explanation/decisions/adr-0012-currency-adapter-in-infrastructure)
  and
  [ADR-0014](/explanation/decisions/adr-0014-frankfurter-ecb-rates)).
- **Infrastructure's network I/O goes through the kit's HTTP manager.** The
  Frankfurter adapter performs its request through `FetchApiManager`, so
  interceptors, Safe Results and the anti-SSRF redirect policy apply to
  internal traffic too.

The same port/adapter split explains why framework integrations live on
package subpaths (`katanakit-js/adapters/express`, …) instead of the main
barrel: a dependency that only one consumer needs should only that consumer
pay for.

## Deliberate exceptions

Not everything is a Singleton, and the exceptions are named:

- **`adapters/nuxt`** exports pure functions (`useUnwrap`, `useSafeResponse`)
  — they bridge values to Nuxt server routes and own no state.
- **Strategy objects** (`LocalStorageStrategy`, `NativeUuidStrategy`, …) are
  plain values implementing a contract; they are the *swappable* half of DI,
  not services.
- **Pure value builders** in `@katanakit/ui` (`toastClass()`, `buttonClass()`)
  return strings and imply no lifecycle.

## Where to go next

- [Architecture](/guides/architecture) — the hexagonal layering those rules
  describe.
- [Currency conversion](/guides/currency) — the guide for the worked example.
- [Decision records](/explanation/decisions/) — the costs behind each choice.
