---
title: "ADR-0017: The on* prefix marks module helpers; class methods stay unprefixed"
description: Module-level helpers and side-effecting factories use on*; pure and stateful class methods use plain descriptive names.
---

# ADR-0017: The `on*` prefix marks module helpers; class methods stay unprefixed

**Status:** Accepted · **Date:** 2026-11-28 (released in v7.6.0) · **Supersedes:** ADR-0010 (naming), amends ADR-0002 (naming)

## Context

ADR-0010 established that imperative public methods start with `use*` and
`on*` is reserved for Observer callbacks. That convention predates the
Singleton refactor and the framework adapters, and it aged badly:

- `use*` reads as a React hook to every React developer, even on plain
  functions that run on the server or in a Worker.
- The kit now exposes three different kinds of surface — module-level
  helpers, singleton class methods and framework adapters — and one prefix
  could not describe all three.
- Third-party names (`useQuery`, `useSession`, `@UseGuards`) kept colliding
  conceptually with the kit's own `use*`, making stack traces and search
  results ambiguous.

## Decision

The naming contract is inverted and split:

1. **Module-level helpers and facades use `on*`** — `onFetch`, `onLogger`,
   `onDateBetween`, `onConvertCurrency`, `onFilter`, `onButton`. This covers
   the thin wrappers over singleton methods and every framework-adapter
   helper (`onRequest`, `onQuery`, `onAuthClient`).
2. **Class methods use plain descriptive names** — `fetch`, `log`, `convert`,
   `getSnapshot`, `setProvider`, `addDays`, `uuid`, `pathsFrom`. This applies
   whether the method is pure or side-effecting; the class boundary already
   says "you call this".
3. **Observer callbacks keep `on*`** — `onRatesUpdate`, `onRatesError`. The
   prefix here reads as "when X happens, call this", which is the same
   grammatical role as a DOM event handler.
4. **Third-party APIs are never renamed in documentation or adapter code** —
   React's `useState`, TanStack's `useQuery`, Better Auth's `useSession`,
   NestJS's `@UseGuards` keep their upstream names.
5. **UI factories follow the same split** — `on<Name>(options)` returns a live
   element, `<name>Class(options)` stays the pure string builder
   (`onButton` / `buttonClass`).

The `packages/ui` facade rule from ADR-0002 is unchanged: only stateful
components get a stable module binding (`toast`).

## Consequences

**Better.** No helper reads as a React hook anymore. The class-versus-module
split is visible at the call site (`logger.log()` vs `onLogger()`), the
adapters match their frameworks' shape without pretending to be hooks, and
third-party names stop colliding with our own.

**Worse.** `on*` now means two things — "public module helper" and "callback
the service invokes" — so the prefix no longer encodes direction on its own;
the argument position does. The rename is a breaking change for every `use*`
consumer, which is why it ships as a major-line refactor with a codemod-style
migration table in the release notes. Lint still does not enforce the rule.

**Also.** The ADR-0010 rule is retired, not reinterpreted: where the two
records disagree about a name, this one wins. ADR-0002's Singleton mechanics
stand; only its naming paragraph is amended.

## Links

- [Service architecture](/explanation/service-architecture) — the naming
  contract section as applied to services.
- [ADR-0010](/explanation/decisions/adr-0010-use-prefix-on-callbacks) — the
  superseded convention.
- [ADR-0002](/explanation/decisions/adr-0002-singleton-facades) — Singleton
  facades, amended here only for naming.
