---
title: "ADR-0012: The currency rate adapter lives in src/infrastructure/, with flat helpers as the composition point"
description: The core knows only the ICurrencyRateProvider port; the Frankfurter adapter and the default wiring live in src/infrastructure/currency/.
---

# ADR-0012: The currency rate adapter lives in `src/infrastructure/`, with flat helpers as the composition point

**Status:** Accepted · **Date:** 2026-10-19

## Context

Currency conversion needs exchange rates, and exchange rates mean network I/O.
The kit's hexagonal rule (ADR-0004) says the pure core
(`src/core/services/`) never performs I/O and never imports
`src/infrastructure/` — `tests/architecture.test.ts` enforces it. So the
feature could not simply live in a core service that calls `fetch`.

Two seams were needed: the core had to express *what* it needs (a dated rate
snapshot for a base currency) without knowing *who* provides it, and something
outside the core had to pick a default provider and plug it in — a package
consumer calling `useConvertCurrency()` should not have to wire anything.

## Decision

The need is expressed as the **port** `ICurrencyRateProvider` in
`src/types/index.ts` (the shared kernel). `CurrencyConverterService` lives in
`src/core/services/currency.service.ts` and knows only that port.

The default implementation — `FrankfurterCurrencyProvider`, which performs its
requests through the kit's own `FetchApiManager` — lives in
`src/infrastructure/currency/`, alongside the **composition module**: the flat
helpers (`useCurrencyConverter`, `useConvertCurrency`,
`useGetExchangeRate`, `useRefreshExchangeRates`, `useSubscribeRates`) that wire
the default provider
into the shared singleton on first use. Wiring is idempotent and never
replaces a provider the consumer injected.

## Consequences

**Better.** The core compiles, typechecks and tests with no network and no
infrastructure import. The rate source is a swappable decision rather than a
dependency (ADR-0014), and every runtime concern of the kit — interceptors,
Safe Results, the anti-SSRF redirect policy — applies to rate traffic too,
because the adapter goes through `FetchApiManager` like everything else. The
composition module is one small file to read when you want to know exactly how
the default gets installed.

**Worse.** The flat helpers live outside `src/core/`, so the path
`src/infrastructure/currency/currency.service.ts` reads redundantly and the
"where do I find the helpers?" question has a non-obvious answer (they cannot
live beside the service they wrap). A consumer importing only the core class
gets an actionable error instead of rates until something wires a provider —
the `NO_PROVIDER_MESSAGE` error text exists to make that first failure
explain the fix.

**Also.** The same shape — port in `types/`, adapter in `infrastructure/`,
composition at the edge — is now the template for any future core capability
that needs the outside world.
