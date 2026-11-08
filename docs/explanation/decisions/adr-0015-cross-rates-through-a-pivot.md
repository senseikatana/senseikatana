---
title: "ADR-0015: Cross-rates divide through a pivot currency"
description: A pair is resolved as pivot[B] / pivot[A] instead of consuming the source's direct quote, because rounded small quotes lose significant digits.
---

# ADR-0015: Cross-rates divide through a pivot currency

**Status:** Accepted · **Date:** 2026-10-19

## Context

The obvious way to price `A → B` is to ask the source for the pair and use the
quote it returns. That is what the service did at first: fetch with `base = A`
and read `rates[B]`.

Sources round their quotes. Frankfurter keeps **5 decimal places**, whatever the
magnitude, so a small quote arrives already starved of significant digits:

| Pair | Direct quote | Computed through the pivot | Error on 1M |
| --- | --- | --- | --- |
| `JPY → USD` | `0.00632` | `0.00631951` | 0.49 USD (0.008%) |
| `KRW → USD` | `0.00075` | `0.00075217` | 2.17 USD (0.288%) |
| `IDR → USD` | `0.000055` | `0.00005542` | 0.42 USD (0.763%) |

`KRW → USD` is not an exotic corner: it is a top-ten traded currency, and the
error is twenty times the rounding the kit bothers to control elsewhere. The
direct quote also makes the two directions of a pair disagree —
`rate(A→B) × rate(B→A)` drifts away from 1 by the rounding of both quotes.

## Decision

Store every rate against **one pivot currency** (`USD` by default, configurable
through `useCurrencyConverter({ pivot })` or `CurrencyConverterService.create({ pivot })`)
and resolve each pair by division:

```ts
rate(A → B) = pivot[B] / pivot[A]   // the pivot itself counts as 1
```

The cache holds one snapshot instead of one per base, and `useGetRate` /
`useConvert` share it. `useGetSnapshot()` and `useRefreshRates()` therefore take
no base: there is exactly one snapshot to read or refresh.

## Consequences

**Better.** The rounding sits on the well-conditioned side of the pair, so small
quotes are never consumed — `1 / 1329.49` carries the precision `0.00075` had
already dropped. Both directions of a pair come from the same snapshot, so
`rate(A→B) × rate(B→A)` is **exactly** 1. One request serves every pair in the
app, which makes the cache and the single-flight path simpler.

**Worse.** A pair the pivot quotes well loses a little to the second rounding:
`EUR → GBP` becomes `0.842053` where the source's own EUR-based quote is
`0.84205` — 0.0004%, far below the ECB-vs-market drift any consumer already
accepts. Choosing `pivot: "EUR"` for a euro-centric app removes even that.

**Accepted trade-off.** A provider that quotes one pair accurately and the rest
poorly cannot be asked for that pair directly; the port fetches a snapshot
against the pivot. That is deliberate — the accuracy of a pair must not depend
on which one the provider happens to quote well.
