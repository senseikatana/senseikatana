---
title: "ADR-0010: The use* prefix is kept for public methods; on* is reserved for Observer callbacks"
description: Public methods stay use*; on* marks only callbacks the service invokes — the two prefixes encode who calls whom.
---

# ADR-0010: The `use*` prefix is kept for public methods; `on*` is reserved for Observer callbacks

**Status:** Accepted · **Date:** 2026-10-19

## Context

The currency converter brought the Observer pattern to a core service:
subscribers pass `onRatesUpdate` / `onRatesError` handlers that the service
invokes when a rate snapshot lands or a fetch fails. Seeing `on*` names next to
`use*` methods raised a natural question: should callback-shaped surface rename
to `on*`, or should the `use*` convention bend for event-ish methods
(`useSubscribe` → `onSubscribe`, `useConvert` → …)?

`CONTRIBUTING.md` had always said: every public method (except `getInstance()`)
uses the `use` prefix. Renaming would have been a public contract break across
every service; keeping two conventions with no boundary between them would make
both meaningless.

## Decision

The `use*` prefix is kept for **every public method you call imperatively**.
The `on*` prefix is reserved **exclusively** for Observer callbacks — functions
the service invokes, never methods you call. The two prefixes encode direction:
`use*` means *you call the service*, `on*` means *the service calls you*.

Registration is itself a `use*` method — `useSubscribe(events)` — and the
`on*` names live only inside the payload it accepts
(`CurrencyRateEvents.onRatesUpdate`, `.onRatesError`). No imperative method is
ever named `on*`, no callback is ever named `use*`.

## Consequences

**Better.** Direction is readable from the prefix alone, in any call site and
any review. The public API of twenty-plus services stays untouched — the
refactor to Singleton classes changed no call site, which would have been
impossible under a rename. New contributors can be told one sentence: *if you
call it, it starts with `use`; if it calls you, it starts with `on`.*

**Worse.** The rule is a naming convention, not a type — nothing stops a
future contributor from writing `onRefresh()` as a method. Lint rules do not
enforce it today; code review does. And `use*` keeps the mild surprise for
readers who expect hooks, which is accepted (ADR-0002).

**Also.** Where a name feels event-ish, the verb keeps the `use*` form and the
noun moves into the payload: `useSubscribe({ onRatesUpdate })`. That shape now
guides every future Observer in the kit.
