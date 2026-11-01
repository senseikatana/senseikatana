---
title: "ADR-0003: Framework adapters only on subpath exports"
description: Anything that imports a framework is published only through the exports map subpaths, with optional peers.
---

# ADR-0003: Framework adapters only on subpath exports

**Status:** Accepted · **Date:** 2026-09-20 (released in v4.0.0)

## Context

Adapters import framework packages: `express`, `vue`, `react`, `svelte`,
`solid-js`, `@angular/core`, `hono`, `better-auth`, `photoswipe`, Nuxt's
`safe` conventions, and so on. If the main barrel re-exported them, a bare
`import { useLogger } from "katanakit-js"` would drag peers into every
bundle, every install would demand them, and the "zero side effects on
import" guarantee would be impossible to defend.

## Decision

Anything that imports a framework stays out of `src/index.ts` and is published
**only** through the `exports` map as a subpath: `katanakit-js/adapters/express`,
`/vue`, `/nuxt`, `/react`, `/svelte`, `/solid`, `/angular`, `/vanilla`,
`/hono`, `/nestjs`, `/astro`, `/better-auth`, `/photoswipe`, `/notion`,
`/wordpress`, `/insforge`, `/telegram`, `/whatsapp`, `/assistant`, plus
`/prisma` and `/schemas`. Framework dependencies are `peerDependencies` with
`peerDependenciesMeta.optional`, never `dependencies`. The
`examples:check` script typechecks example projects against the built `dist/`,
so a broken or missing subpath fails the build instead of reaching npm.

## Consequences

**Better.** The main bundle stays free of frameworks; consumers install only
the peers they use; and the two guarantees that depend on this — zero side
effects on import and a minimal install — hold without audit.

**Worse.** The import path differs per adapter and there is no "kitchen sink"
entry; nothing is discoverable from the main barrel, so docs must carry the
map (the [entry-point list](/guides/getting-started#import-entry-points) is
it). Adding an adapter means touching `package.json`, the docs and examples
in the same change — by design, since that is the change the reviewer must
see.

## Links

- [Getting Started — import entry points](/guides/getting-started#import-entry-points)
- [Architecture](/guides/architecture) — the exports map in context.
