---
title: External APIs
description: The public APIs used across these guides — dummyjson, hp-api and countries — each with a live OpenAPI (Swagger) reference.
---

# External APIs

The examples across these guides call three public APIs. None needs an API key,
all allow browser requests (CORS `*`), and you can drive each one from the
**Try it out** button in the Swagger viewers below — no local setup.

| API | What it is | Endpoints | Spec |
| --- | --- | --- | --- |
| [DummyJSON](https://dummyjson.com/docs) | Sandbox REST: products, carts, users, posts with realistic payloads and full CRUD | 68 | OpenAPI 3.0.3 (upstream) |
| [HP API](https://hp-api.onrender.com) | Harry Potter dataset: 437 characters, 77 spells, houses | 6 | OpenAPI 3.0.3 (maintained here) |
| [Countries](https://countries.trevorblades.com) | GraphQL: countries, continents, languages | 6 queries | [GraphQL playground](https://countries.trevorblades.com) |

## DummyJSON

The workhorse for CRUD examples: `products` with 194 rows, pagination
(`limit`/`skip`), search, and a `posts` collection that accepts the full
`POST` / `PUT` / `PATCH` / `DELETE` cycle. The spec is served by the API
itself:

<SwaggerViewer
  spec="https://dummyjson.com/openapi.json"
  title="DummyJSON"
  description="68 endpoints · openapi 3.0.3"
  :height="700"
/>

## HP API

A read-only dataset, useful for list and lookup examples. It has no upstream
OpenAPI document, so the spec below is maintained in this repository
([`docs/public/swagger/hp-api.json`](https://github.com/senseikatana/katanakit-js/blob/dev/docs/public/swagger/hp-api.json))
and mirrors the live endpoints — the note on the first request after idle is
real: it is a free-tier Render service and can take a few seconds to wake.

<SwaggerViewer
  spec="hp-api.json"
  title="HP API"
  description="6 endpoints · openapi 3.0.3"
  :height="560"
/>

### Endpoints at a glance

| Endpoint | Returns |
| --- | --- |
| `GET /api/characters` | All 437 characters. |
| `GET /api/characters/students` | Characters with `hogwartsStudent: true`. |
| `GET /api/characters/staff` | Characters with `hogwartsStaff: true`. |
| `GET /api/characters/house/{house}` | One house: `gryffindor`, `slytherin`, `hufflepuff`, `ravenclaw`. |
| `GET /api/characters/{id}` | One character by UUID. |
| `GET /api/spells` | All 77 spells with name and description. |

## Countries (GraphQL)

GraphQL is not described by OpenAPI — its schema is its contract, and clients
introspect it. The endpoint keeps a
[live playground](https://countries.trevorblades.com) where you can write
queries and read the schema; the [HTTP Client
guide](./http-client.md#graphql-and-apollo) shows both ways to call it from
your app.

## Reuse these specs

An OpenAPI document is not just documentation: you can generate a typed client
from it, so the response shapes in your code come from the same source the
Swagger page reads.

```bash
npm install -D openapi-typescript
npx openapi-typescript https://dummyjson.com/openapi.json -o src/api/dummyjson.d.ts
```

```ts
import type { paths } from "./api/dummyjson.d.ts";

type Product = paths["/products/{id}"]["get"]["responses"][200]["content"]["application/json"];
```

That pairs with the toolkit as-is — `useGetApi<Product>("dummyjson", "productById", …)`
gets compile-time checked against the generated type — or validate the payload
at runtime with a schema, as the [HTTP Client
guide](./http-client.md#option-a--the-toolkit-makes-the-call) shows.

::: tip Specs are versioned with the docs
Both the HP API spec and the Swagger viewer page live under `docs/public/swagger/`.
The viewer loads Swagger UI from a pinned CDN version, so the reference renders
the same way here and in production.
:::
