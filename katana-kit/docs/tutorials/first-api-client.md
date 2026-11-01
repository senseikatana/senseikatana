---
title: "Tutorial: Your First API Client"
description: Build a typed, validated, cached API client with KatanaKit, step by step — every step ends in a visible result.
---

# Tutorial: Your First API Client

In this tutorial you will build a small script that calls the public
[PokéAPI](https://pokeapi.co/), validates the response with Zod, caches it, and
reports failures without a single `try/catch`.

You need Node.js >= 22.18 or Bun >= 1.2, and a terminal. It takes about fifteen
minutes. By the end, running the script prints something like:

```
pikachu — electric type
requests: 1 (the second read came from cache)
```

## 1. Create the project

```bash
mkdir katana-tutorial && cd katana-tutorial
bun init -y
bun add katanakit-js zod
```

With npm instead: `npm init -y && npm install katanakit-js zod`, then add
`"type": "module"` to `package.json` — KatanaKit is pure ESM.

**You should see:** `katanakit-js` and `zod` listed in `package.json`.

## 2. Register the API

Create `src/api.ts`:

```ts [src/api.ts]
import { defineApiConfig } from "katanakit-js";

export default defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: {
      pokemonById: "/pokemon/:id/",
    },
  },
});
```

`defineApiConfig` registers the registry **and** hands it back, so this one
default export is the entire setup — no second initialization step. `:id` is a
placeholder that `params` fills in per call.

**You should see:** nothing yet — importing this file is a side effect you
trigger in the next step.

## 3. Make the first call

Create `src/index.ts`:

```ts [src/index.ts]
import { useGetApi } from "katanakit-js";

import "./api.ts";

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
}

const result = await useGetApi<Pokemon>("pokeapi", "pokemonById", {
  params: { id: 25 },
});

if (result.ok) {
  console.log(`${result.data.name} — ${result.data.types[0].type.name} type`);
} else {
  console.error(`Failed: ${result.error.message} (${result.error.status})`);
}
```

Run it:

```bash
bun run src/index.ts
# or with Node >= 22.18: node src/index.ts
```

**You should see:** `pikachu — electric type`. The request went out and
`result.ok` is `true`.

Notice what is missing: no `try/catch`. A call never throws — it resolves to a
**Safe Result**, a discriminated union of `{ data, error, ok }` that the `ok`
flag narrows for you.

## 4. Watch a failure behave

Change the id in `src/index.ts` to `99999` — a Pokémon that does not exist —
and run the script again.

**You should see:** `Failed: HTTP Error: Not Found (404)`. The script did not
crash: the same return value now has `ok: false`, and `result.error` carries a
`status` and a `message`. Code that fails on purpose is still code that runs.

Put the id back to `25` before the next step.

## 5. Validate the payload with Zod

The `Pokemon` interface is a promise you made to the compiler, and nothing
checks that the network keeps it. Add a schema and validate the data at the
boundary.

Create `src/pokemon.schema.ts`:

```ts [src/pokemon.schema.ts]
import { z } from "zod";

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.object({ type: z.object({ name: z.string() }) })),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
```

Now wrap the response in `useValidate` — in `src/index.ts`, replace the body:

```ts [src/index.ts]
import { useGetApi, useValidate } from "katanakit-js";

import "./api.ts";
import { PokemonSchema } from "./pokemon.schema.ts";

const result = await useGetApi("pokeapi", "pokemonById", { params: { id: 25 } });

if (!result.ok) {
  console.error(`Failed: ${result.error.message} (${result.error.status})`);
  process.exit(1);
}

const validated = useValidate(PokemonSchema, result.data);

if (!validated.ok) {
  console.error(`Unexpected payload: ${validated.error.message}`);
  process.exit(1);
}

console.log(`${validated.data.name} — ${validated.data.types[0].type.name} type`);
```

`useValidate` returns a Safe Result too, so both failure modes — transport and
malformed payload — are branches, not exceptions. The `Pokemon` type now comes
from the schema, which means there is exactly one place to update when the API
changes shape.

**You should see:** `pikachu — electric type` again. To prove the guard
works, temporarily change `id: z.number()` to `id: z.string()` and run the
script — the payload is rejected with a validation message instead of leaking a
wrong type into the rest of the program. Undo the change afterwards.

## 6. Stop refetching the same data

The script now makes one request per run. Real apps read the same resource from
many places, so let the query cache decide when a network call is actually
needed. Replace `src/index.ts` with:

```ts [src/index.ts]
import { useGetApi, useValidate } from "katanakit-js";
import { useQueryClient, useSafeQueryFn } from "katanakit-js/adapters/vanilla";

import "./api.ts";
import { PokemonSchema } from "./pokemon.schema.ts";

let requests = 0;

const fetchPokemon = useSafeQueryFn(async () => {
  requests += 1;
  const result = await useGetApi("pokeapi", "pokemonById", { params: { id: 25 } });
  if (!result.ok) return result;
  return useValidate(PokemonSchema, result.data);
});

const client = useQueryClient();
const query = { queryKey: ["pokemon", 25], queryFn: fetchPokemon, staleTime: 60_000 };

const first = await client.fetchQuery(query);
const second = await client.fetchQuery(query);

console.log(`${second.name} — ${second.types[0].type.name} type`);
console.log(`requests: ${requests} (the second read came from cache)`);
console.log(`first and second are the same object: ${first === second}`);
```

Two reads of the same `queryKey` inside the 60-second `staleTime` window mark
one network call. `useSafeQueryFn` bridges the two contracts: it unwraps the
Safe Result for the query cache (throwing turns a failure into a cached
`error` state) and the vanilla adapter hands you plain TanStack Query — the
same engine the React, Vue, Svelte, Solid and Angular adapters wrap.

**You should see:**

```
pikachu — electric type
requests: 1 (the second read came from cache)
first and second are the same object: true
```

## Where to go next

You built the whole loop: register → call → branch on failure → validate →
cache. From here:

- **Do a concrete task** → [How-to guides](/guides/getting-started) — add auth
  headers, use the client inside Astro/Express/Nuxt, set up a filesystem
  script.
- **Look up an exact fact** → the [HTTP Client](/guides/services/http-client)
  page and the generated [API Reference](/api/).
- **Understand the design** → [Error Handling](/guides/errors) and the
  decision behind it,
  [ADR-0001: Safe Results instead of exceptions](/explanation/decisions/adr-0001-safe-results).
