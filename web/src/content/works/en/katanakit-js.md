---
title: 'KatanaKit'
description: 'Framework-agnostic TypeScript service toolkit organized with hexagonal architecture.'
sector: 'TypeScript toolkit'
year: '2026'
repoUrl: 'https://github.com/senseikatana/katanakit-js'
role: 'Author and maintainer'
stack: ['TypeScript', 'Hexagonal', 'ESM']
challenge: 'Every TypeScript project rewrites the same HTTP, query, date, formatter and storage plumbing, each with its own error model.'
solution: 'A typed service toolkit with one result model, interchangeable adapters and hexagonal boundaries, published as focused ESM entry points.'
outcome: 'One dependency for the boring infrastructure, with the same contracts across Astro, Nuxt, Next and plain Node services.'
featured: true
order: 4
draft: false
---

## Overview

KatanaKit groups the infrastructure pieces most projects rewrite: HTTP clients, query clients, dates, currency, filesystem, storage, validation and formatting. Each service exposes a typed contract and a predictable result.

## What it solves

The toolkit keeps domain code away from framework details. Adapters are replaceable, errors are explicit, and the same service works in Astro, Nuxt, Next and plain Node.

## Architecture

- Hexagonal boundaries between domain, application and infrastructure.
- One `SafeResult` model instead of mixed exceptions and ad-hoc unions.
- Framework adapters for Astro, Nuxt, Next, Hono, Bun and Express.
- Published as ESM with focused subpath exports.

The full reference lives in the [KatanaKit documentation](/docs/overview).
