---
title: "ADR-0011: No static business methods — Singleton plus DI instead"
description: Statics are limited to getInstance() and create(); business behaviour lives on instances so dependencies can be injected and tested.
---

# ADR-0011: No static business methods — Singleton plus DI instead

**Status:** Accepted · **Date:** 2026-10-19

## Context

As core modules became Singleton classes, a tempting shortcut appeared:
`CurrencyConverterService.convert(...)` as a static method that reaches for the
singleton internally. It reads compactly, and for a purely computational
helper it can even be defensible.

But the services in this kit are not purely computational. The currency
converter caches snapshots per base currency, notifies subscribers, and fetches
rates through a source that must be replaceable. A static business method hides
exactly those dependencies: it hardwires the instance, offers no seam for a
fake rate provider in tests, and makes the state invisible in the signature.

## Decision

Business behaviour is defined on **instances**. Statics are limited to the two
lifecycle methods: `getInstance()` (the Singleton accessor) and
`create(options)` (the DI factory for non-singleton instances). Everything
else — conversion, formatting, fetching, subscribing — is a `use*` method on
the instance.

Dependencies arrive through `create(options)` at construction time or through
`useSet*` at runtime (`useSetProvider`, `useSetFormatter`), never through
static reach-ins.

## Consequences

**Better.** Every service can be tested with injected fakes —
`CurrencyConverterService.create({ provider: fakeRates })` exercises the whole
conversion path without a network. State and dependencies are visible in the
API: if a method needs something, the constructor or a `useSet*` says so. The
flat `use*` wrappers keep the ergonomic call style for the 90% case, so nobody
pays for the discipline at the call site.

**Worse.** Two ways to call the same thing exist (wrapper function vs.
instance method), and readers must learn when each is appropriate. Instances
held across a long-lived app are shared mutable state — correct for caches and
subscriber sets, wrong if someone treats a singleton like a namespace for
globals; `create()` exists precisely to avoid that in tests and per-request
scenarios.

**Also.** The rule scales by omission: a new static business method in review
is now a defect by definition, no judgement call required.
