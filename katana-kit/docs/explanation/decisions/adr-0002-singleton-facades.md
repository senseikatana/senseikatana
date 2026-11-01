---
title: "ADR-0002: Singleton facades exposed as use* functions"
description: Stateful services are Singleton classes with getInstance(), published to consumers as use* wrapper functions.
---

# ADR-0002: Singleton facades exposed as `use*` functions

**Status:** Accepted · **Date:** 2026-10-04 (released in v6.5.0)

## Context

Services own state: the API registry, the logger's level, the query cache, the
active theme. A purely functional API would have to thread that state through
arguments or hide it in module globals with no identity or lifecycle. A purely
class-based API would force consumers to manage instances, break the
tree-shakeable named-export style the library had shipped since v1, and add
`new` boilerplate to every call. Earlier versions mixed both styles ad hoc —
some services exported loose functions, others exported objects.

## Decision

Every stateful service is a **Singleton class** — private constructor,
`getInstance()` as the only entry — whose public methods use the `use*` prefix
(`getInstance()` and the static `create()` are the exceptions). The module
re-exports thin `use*` wrappers and destructured exports that delegate to the
singleton, so consumers keep the functional API (`useLogger(...)`,
`useFetch(...)`) while the class owns the state. Services that need isolated
instances expose `create()` or an injectable strategy (storage backends,
`AccessService`, `AgentService`). The configuration entry points follow the
same shape: `define*Config` registers and returns the facade — the v6.0.0
rename of `useInit*` kept the principle and improved the name
([Upgrade to v6](/guides/upgrade-to/v6)).

## Consequences

**Better.** There is one obvious instance, a predictable naming rule, and the
public API stays tree-shakeable and stable across the refactor. Tests can
inject `create()` instances or mock the facade shape (the
[HTTP Client](/guides/services/http-client) page shows the DI pattern)
without stubbing globals.

**Worse.** The `use*` prefix on plain functions reads as hooks to React
developers and as an oddity to everyone else; contributors must remember that
`getInstance()` and `create()` are deliberate exceptions. Singleton state is
process-wide: on a long-lived server the API registry is shared across
requests, so it must be treated as immutable after startup and per-request
data passed through `params`, `query` or `headers`. And there are two ways to
reach the same behavior — the wrapper and the class — deliberately kept for
injection and backwards compatibility.

## Links

- [Architecture](/guides/architecture) — the pattern table across all services.
- [HTTP Client](/guides/services/http-client) — wrapper vs. `getInstance()` in practice.
- [Upgrade to v6](/guides/upgrade-to/v6) — the `useInit*` → `define*Config` rename.
