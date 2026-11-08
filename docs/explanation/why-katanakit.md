---
title: Why KatanaKit
description: The goals behind the toolkit, its design stance, and when it is the wrong tool for the job.
---

# Why KatanaKit

Most TypeScript projects rewrite the same plumbing: a fetch wrapper, an error
envelope, storage with the same four methods, date helpers, a logger. KatanaKit
is that plumbing, written once and kept framework-agnostic — not a framework,
and not an app template.

## What it is

A **service toolkit**: small services with one consistent shape, each usable
alone. The main barrel exports `use*` functions for HTTP, logging, storage,
dates, formatting, filesystem, workers and more; framework adapters layer on
top as thin bindings. You adopt it piece by piece — `useLogger` today, the
query cache next week — and nothing forces the rest.

## The goals this design serves

1. **One consistent API.** Every public helper is a `use*` function over a
   Singleton facade, every fallible call returns the same Safe Result, every
   configuration entry point is a `define*Config`. Learn one service and you
   can guess the shape of the next. The reasoning is recorded in
   [ADR-0002](/explanation/decisions/adr-0002-singleton-facades) and
   [ADR-0001](/explanation/decisions/adr-0001-safe-results).
2. **A pure core, thin edges.** Domain logic never touches `window` or the
   filesystem; runtime I/O lives one layer out with SSR guards, and framework
   integrations live on subpaths so they never enter a bundle that does not
   use them ([ADR-0004](/explanation/decisions/adr-0004-hexagonal-core),
   [ADR-0003](/explanation/decisions/adr-0003-adapter-subpath-exports)).
3. **Failures are values, not surprises.** The network is unreliable and
   payloads lie; `{ data, error, ok }` plus Zod validation at the boundary
   make both facts visible in the types. See the
   [Tutorial](/tutorials/first-api-client) for what that feels like in use.
4. **Install only what you use.** Runtime dependencies are counted — three
   (`@js-temporal/polyfill`, `zod`, `@tanstack/query-core`). Framework packages,
   faker, photoswipe and the database client are optional peers, loaded only
   when imported.
5. **Docs that cannot drift.** The API reference is generated from the source
   on every docs build, so a signature cannot silently disagree with its
   documentation ([ADR-0005](/explanation/decisions/adr-0005-docs-as-code)).

## When KatanaKit is the wrong tool

- **You want a framework to own the app.** Next.js, Nuxt and Astro already
  solve data fetching, routing and server functions natively. Use their
  solutions in the parts of the app they own; mixing two data layers costs
  more than it saves. KatanaKit is at its best in the gaps they leave —
  helpers, nodes, services, side projects.
- **You need zero conventions.** The `use*` naming, Safe Results and
  process-wide registries are opinions. If a codebase cannot absorb them, a
  smaller utility library per problem will fit better.
- **One dependency already solves your problem.** If all you need is date
  math, `date-fns` is the honest answer. The optional-peer design exists so
  the toolkit never forces a choice — and so you can leave.

## What it is not

Not a UI kit (that is the [UI Kit](/ui-kit/) section), not a database layer
(Prisma is an optional integration), and not an application framework. It is
glue for the parts every project rewrites — designed so the day a part stops
earning its place, you can delete it without a migration.
