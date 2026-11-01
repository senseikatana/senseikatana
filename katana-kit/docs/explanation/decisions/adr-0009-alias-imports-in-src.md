---
title: "ADR-0009: The @/ alias is used in src/, rewritten by tsc-alias at build"
description: Cross-folder imports use @/ instead of ../../ chains; tsc-alias rewrites them in the emitted JavaScript.
---

# ADR-0009: The `@/` alias is used in `src/`, rewritten by `tsc-alias` at build

**Status:** Accepted · **Date:** 2026-10-18

## Context

`src/` used relative imports throughout. The rule was explicit — every
cross-folder import carried an explicit `.js` extension for NodeNext ESM, and
`AGENTS.md` stated that "`@/` is for tests and examples, not source imports".

That rule has a cost that grows with the tree. A service reached from an adapter
is `../../core/services/access.service.js`; from a deeper adapter, a fourth
level. Every one of those is a path a reader must count, and a refactor that
moves a file breaks all of them.

The `@/*` alias was already declared in `tsconfig.json`, `tsconfig.examples.json`
and Vitest's config. It mapped to `src/*`, and nothing in `src/` used it.

The counter-argument was real and was verified before deciding: **`tsc` does not
rewrite path aliases in its output.** A file importing `@/schemas/access.schema.js`
compiles cleanly and emits that specifier verbatim into `dist/`, where Node
cannot resolve it. The package would install successfully and fail at first
import.

## Decision

Cross-folder imports in `src/` use the alias, keeping the `.js` extension:
`import { useLogger } from "@/core/services/logger.service.js"`. Same-folder
imports stay relative, where `./x.js` is already the shortest correct form.

`tsc-alias` is a dev dependency and runs immediately after `tsc6` in
`bun run build`, which rewrites every alias to a relative path in the emitted
JavaScript **and** in the declaration files.

`~/*` and `~#/…` are declared alongside `@/*`, pointing at the same target, for
readers who expect the Nuxt convention.

## Consequences

**Better.** Import depth stops mattering. `@/core/services/access.service.js` is
as readable from five levels down as from one, and moving a file no longer
touches every importer. `@/*` resolves to `src/*` rather than a barrel, so a new
module needs no index and no export wiring to be importable.

**Worse.** A build step that was a single `tsc` now has a second tool, and the
failure mode of forgetting it is silent at build time and loud only at install
time for the consumer. `bun run check` alone does **not** run `tsc-alias`; it
typechecks only, which is correct — the rewrite belongs to emit, not to
verification. Anything else that compiles `src/` independently (`tsconfig.examples.json`,
an editor task, a one-off `tsc`) emits unresolved aliases and must either run
`tsc-alias` after it or only be used for typechecking.

**Also.** TypeScript 6 deprecates `baseUrl` and requires `paths` entries to be
tsconfig-relative (`"./src/*"`). That is why the mapping is written with the
leading `./` it no longer needs for `baseUrl` resolution.