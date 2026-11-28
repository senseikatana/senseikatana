---
title: Bun Adapter
description: Serve dummyjson.com-backed HTTP routes with Bun.serve, a native alternative to Express.
---

KatanaKit ships a Bun-native server adapter (`katanakit-js/adapters/bun`) built on `Bun.serve` with the modern `routes` API (Bun v1.2.3+). It's a drop-in alternative to the Express adapter for Bun projects — no Express, no middleware chain, just a typed route table.

## Install

```bash
bun add katanakit-js
```

Add `bun-types` to your `tsconfig.json` `types` for the `Bun` global:

```json
{
  "compilerOptions": {
    "types": ["bun-types"]
  }
}
```

## Quick start

`bun run dev:bun` boots the dummyjson demo server:

```bash
bun run dev:bun
# Server running at http://localhost:3000
```

```ts
import { defineApiConfig } from "katanakit-js";
import { dummyJsonApiConfig, onBunStart } from "katanakit-js/adapters/bun";

defineApiConfig(dummyJsonApiConfig);

const server = onBunStart(3000);
console.log(`Server running at ${server.url}`);
```

## The route table

`onBuildDummyJsonRoutes()` returns a typed `Bun.serve` route table. Handlers are pure and return `Response` — they reuse the core `onFetch` with the Safe Result pattern.

```ts
import { onBuildDummyJsonRoutes } from "katanakit-js/adapters/bun";

Bun.serve({
  routes: onBuildDummyJsonRoutes(),
  fetch: () => new Response("Not Found", { status: 404 }),
});
```

| Route | Handler |
|---|---|
| `GET /api/status` | static JSON |
| `GET /api/products` | `onDummyJsonProducts` |
| `GET /api/products/:id` | `onDummyJsonProductById` |
| `GET /api/products/search?q=` | `onDummyJsonProductSearch` |
| `GET /api/products/categories` | `onDummyJsonProductCategories` |
| `GET /api/products/category/:category` | `onDummyJsonProductsByCategory` |
| `GET /api/users`, `GET /api/users/:id` | users |
| `GET /api/posts`, `GET /api/posts/:id` | posts |
| `GET /api/quotes`, `GET /api/quotes/random` | quotes |
| `GET /api/seed` | offline seed data |
| `GET /api/*` | 404 catch-all |

## Direct handlers

You can use the handlers anywhere a `Response` is expected — no Bun router required:

```ts
import { defineApiConfig } from "katanakit-js";
import { dummyJsonApiConfig, onDummyJsonProducts } from "katanakit-js/adapters/bun";

defineApiConfig(dummyJsonApiConfig);
const response = await onDummyJsonProducts(); // Response with the product list
```

## Seed data

```ts
import { onGetDummyJsonSeed } from "katanakit-js/adapters/bun";

const seed = onGetDummyJsonSeed();
seed.products; // [{ id, title, description, category, price, rating, stock, brand }]
seed.users;    // [{ id, firstName, lastName, username, email, age, role }]
```

## Server facade

`onBunCreate` is a singleton — subsequent calls return the same server:

```ts
import { onBunCreate, onBunGetServer, onBunStop } from "katanakit-js/adapters/bun";

onBunCreate({ port: 3000, hostname: "localhost" });
onBunGetServer()?.url; // URL
await onBunStop();
```
