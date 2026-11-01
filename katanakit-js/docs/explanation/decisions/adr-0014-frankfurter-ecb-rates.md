---
title: "ADR-0014: Frankfurter/ECB reference rates behind the ICurrencyRateProvider port"
description: Frankfurter is the default rate source (MIT, ECB daily reference rates, no API key); the provider port is the documented escape hatch for live-market quotes.
---

# ADR-0014: Frankfurter/ECB reference rates behind the `ICurrencyRateProvider` port

**Status:** Accepted · **Date:** 2026-10-19

## Context

Currency conversion is useless without a rate source, and rate sources are a
minefield: most commercial forex APIs need a key, a signup and a billing plan;
free ones vary in trust, uptime and coverage; some return mid-market intraday
quotes, others daily fixings. A library cannot pick "the" exchange rate — it
can only pick one and be honest about what that one is.

Requirements: no API key and no account for the default path (a kit must work
on `bun install` and one call), a trustworthy issuer, a permissive licence,
stable JSON, and a clean way out when the default is wrong for the use case.

## Decision

The default provider is **Frankfurter** (MIT licence), which serves **ECB
daily reference rates** — no key, no account. The bundled
`FrankfurterCurrencyProvider` targets the canonical host
(`https://api.frankfurter.dev/v1`) and performs its request through the kit's
`FetchApiManager`.

The **escape hatch is the `ICurrencyRateProvider` port** (ADR-0012): implement
`useFetchRates(base, quotes?)` returning a `SafeResult<CurrencyRateSnapshot>`
and inject it through `CurrencyConverterService.create({ provider })` or
`useSetProvider()`. The kit documents this as the path to a live-market
provider, not as an emergency workaround.

The limitations are documented wherever the feature is taught, not buried:
ECB reference rates are published around 14:15 CET on working days (not on
weekends or ECB holidays), carry no intraday movement and no bid/ask spread,
and `date` on every conversion names the day the rate belongs to. Frankfurter
covers the ECB currency set — `ARS`, `COP` and `CLP` are not in it, so those
pairs return an explicit `404` error instead of a wrong number.

## Consequences

**Better.** The default path works with zero configuration and zero secrets,
backed by a public institution's published data under an MIT-licensed API.
Every conversion carries the rate and its `date`, so an auditor can see exactly
which fixing a number came from. Unsupported pairs fail loudly (`404`) instead
of silently converting through a wrong or stale quote. Swapping to a trading
feed later is a provider class and one injection call — no service, cache or
helper changes.

**Worse.** The default is *not* an intraday quote and cannot become one by
configuration — anyone building trading, hedging or FX-per-visitor pricing on
the default gets numbers that lag the market by up to a day and a weekend.
`ARS`, `COP` and `CLP` cannot be converted with the default at all. And
Frankfurter is a third-party free service: its availability is not this kit's
to promise, which is why the cache, the single-flight fetch and the
`onRatesError` callback exist.

**Also.** `api.frankfurter.app` 301-redirects to `api.frankfurter.dev/v1`, and
the fetch manager fails closed on redirects (anti-SSRF), so the adapter pins
the canonical host. Anyone writing another Frankfurter client on the kit's
HTTP API must do the same or watch every request fail.
