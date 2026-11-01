---
title: "ADR-0016: Universal runtime APIs in the core"
description: Classifies fetch, URL, crypto and guarded process.env as allowed in core/services, amending the breach list in ADR-0004.
---

# ADR-0016: Universal runtime APIs in the core

**Status:** Accepted (amends ADR-0004) · **Date:** 2026-10-25 (released in v7.1.3)

## Context

ADR-0004 declared `src/core/services/` free of runtime I/O and listed two
"breaches": `OpenAiCompatibleStrategy` and `agent.service.ts` calling the global
`fetch`, and `agent.service.ts` reading `process.env.DASHSCOPE_API_KEY` as a
documented fallback. Both are **universal runtime APIs**: `fetch`, `URL` and
`crypto` exist in every supported runtime (Node, Bun, workers), and
`process.env` is available in Node and Bun and read behind a
`typeof process !== "undefined"` guard elsewhere. The toolkit ships an HTTP
client, so `fetch` is domain logic here. The contributor rules (AGENTS.md,
CONTRIBUTING.md) already permitted them, which left the ADR and the rule
telling different stories.

Platform-specific APIs are a different matter: `node:*` modules, the
filesystem, framework globals and provider SDKs do not exist in every runtime
and must stay out of the core.

## Decision

`src/core/services/` may use the universal runtime APIs every supported runtime
provides: `fetch`, `URL`, `crypto`, `TextEncoder`, plus guarded reads of
`process.env` and browser globals. It must not statically import platform
modules (`node:*`), the filesystem, frameworks or provider SDKs; a platform
module may only enter through a lazy `import()` inside a method — the pattern
`generator.service.ts` uses for `node:crypto`.

`http.service.ts` remains the HTTP facade (interceptors, Safe Results, the
SSRF redirect policy). `agent.service.ts` and `OpenAiCompatibleStrategy` are
reclassified as compliant under this rule; their behavior does not change. The
two items stay recorded in ADR-0004 and are noted here so nobody "fixes" them
into a behavior change by accident.

## Consequences

**Better.** The written rule matches the code and the enforced test
(`tests/architecture.test.ts` still forbids `core/` importing
`infrastructure/`). A reviewer can classify a new API with one question: does
it exist in every supported runtime?

**Worse.** The boundary is a convention, not a compiler check: a future
contributor can still add a platform import that fails in one runtime only. The
lazy-import exception is invisible to the architecture test.

## Links

- [ADR-0004: Hexagonal layout with a pure core](/explanation/decisions/adr-0004-hexagonal-core)
- [Architecture](/guides/architecture) — the layer rules contributors follow.
- [Service architecture](/explanation/service-architecture) — why the port/adapter split exists.
