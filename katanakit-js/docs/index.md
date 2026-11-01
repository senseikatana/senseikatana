---
layout: home
title: KatanaKit
description: A sharp, framework-agnostic TypeScript service toolkit organized with hexagonal architecture.

hero:
 name: KatanaKit
 text: A sharp TypeScript service toolkit
 tagline: Framework-agnostic, hexagonal and SSR-safe. HTTP with Safe Results, Zod validation, query cache, filesystem helpers, fake data and an OpenAI-compatible assistant.
 actions:
  - theme: brand
    text: Get Started
    link: /guides/getting-started
  - theme: alt
    text: API Reference
    link: /api/

features:
 - title: Safe Results
   details: Fallible async calls return `{ data, error, ok }` instead of throwing — HTTP, filesystem and every adapter share the same contract.
 - title: Zod everywhere
   details: "`src/types` is inferred from Zod schemas and API adapters validate every response at the boundary, so malformed payloads never leak."
 - title: Framework adapters
   details: React, Vue, Solid, Svelte, Angular and Nuxt bindings over the same TanStack Query Core engine bundled with the package.
 - title: Node/Bun toolkit
   details: Filesystem and path helpers with native errno codes, plus optional lazy faker for reproducible seed data and fixtures.
 - title: Zero side effects
   details: Importing any module is safe — no fetch calls, no console logs, no storage writes, no top-level Node built-ins.
 - title: SSR-safe
   details: Every infrastructure service guards or falls back gracefully outside the browser; Node-only APIs load through dynamic import.
---
