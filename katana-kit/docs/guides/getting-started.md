---
title: Getting Started
description: Install KatanaKit, make your first call and find the right document for what you need.
---

# Getting Started

KatanaKit is a framework-agnostic TypeScript service toolkit. It gives you one
consistent API for the plumbing every project repeats: HTTP requests with Safe
Results, Zod validation at the boundary, a TanStack-powered query cache, plus
logger, storage, dates, filesystem and browser helpers — with adapters for
Astro, Express, NestJS, Hono, Nuxt, Vue, React, Svelte, Solid, Angular and
more.

Two shapes cover the whole library: **`use*` helper functions** exported from
the main barrel, and **Singleton facade classes** (`getInstance()`) underneath
for when you want to inject an instance. The
[Tutorial](/tutorials/first-api-client) builds a real client with both; this
page is installation and orientation.

## Install

```bash
npm install katanakit-js
# or
bun add katanakit-js
```

Runtime dependencies are `@js-temporal/polyfill`, `@tanstack/query-core` and
`zod`. Framework integrations are optional peers (`express`, `hono`, `cors`,
`vue`, `react`, `better-auth`, …). The `/prisma` subpath additionally needs
`@prisma/orm-postgres`.

### CDN (ESM in the browser)

Prefer the **jsDelivr `/+esm`** build in the browser. It rewrites bare
dependencies (e.g. `@js-temporal/polyfill`) so named imports work without a
bundler or import map:

```html
<script type="module">
  import {
    useLogger,
    defineApiConfig,
    useGetApi,
  } from "https://cdn.jsdelivr.net/npm/katanakit-js/+esm";

  useLogger("KatanaKit loaded from CDN");
  defineApiConfig({
    pokeapi: {
      baseUri: "https://pokeapi.co/api/v2",
      endpoints: { pokemonById: "/pokemon/:id/" },
    },
  });
</script>
```

| CDN | URL (browser) | Notes |
|-----|---------------|--------|
| **jsDelivr `/+esm`** | `https://cdn.jsdelivr.net/npm/katanakit-js/+esm` | Recommended for `<script type="module">` |
| **esm.sh** | `https://esm.sh/katanakit-js` | Alternative ESM CDN |
| **Raw package file** | `https://cdn.jsdelivr.net/npm/katanakit-js/dist/index.js` | Needs a bundler or an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) for `@js-temporal/polyfill`, `zod` and `@tanstack/query-core` |
| **unpkg** | `https://unpkg.com/katanakit-js/dist/index.js` | Same caveat as the raw file |

Pin a version in production (e.g. `katanakit-js@7.1.4/+esm`) instead of
floating `@latest`. There is **no IIFE/UMD** build — only ESM
(`"type": "module"`).

## First call

```ts
import { defineApiConfig, useGetApi } from "katanakit-js";

defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: { pokemonById: "/pokemon/:id/" },
  },
});

const result = await useGetApi<{ name: string }>("pokeapi", "pokemonById", {
  params: { id: 25 },
});

if (result.ok) console.log(result.data.name); // "pikachu"
else console.error(result.error.status, result.error.message);
```

`useGetApi` never throws: it resolves to a **Safe Result** (`{ data, error,
ok }`). The [Tutorial](/tutorials/first-api-client) takes this snippet further,
step by step — validating the payload, caching it and handling failures.

## Import entry points

```ts
// Main barrel — core helpers + Astro/RSS + SEO (tree-shakeable named exports)
import {
  useLogger,
  defineApiConfig,
  useGetApi,
  useFormatCurrency,
  useNow,
  useChunk,
  useInitTheme,
  useAstroPathsFrom,
  useAstroGenerateRss,
} from "katanakit-js";

// Optional narrower / framework-only subpaths
import { useAstroPathsFrom, useAstroGenerateRss } from "katanakit-js/adapters/astro";
import { useUnwrap } from "katanakit-js/adapters/nuxt";
import { useRequest } from "katanakit-js/adapters/vue";
import { ServerExpress } from "katanakit-js/adapters/express";
import { useRequireCapability } from "katanakit-js/adapters/next"; // also on /astro, /nuxt, /hono, /express, /nestjs
```

Every public `use*` helper lives on the main barrel (`katanakit-js`). Framework
adapters stay on their subpaths because they pull optional peers.

## Use it in your framework

### Astro — frontmatter (server / SSG)

```astro
---
// src/pages/index.astro
import { useLogger, defineApiConfig, useGetApi, AstroService } from "katanakit-js";

useLogger("Building index page");

defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: { pokemonById: "/pokemon/:id/" },
  },
});

const result = await useGetApi<{ name: string }>("pokeapi", "pokemonById", {
  params: { id: 25 },
});
---

{result.ok ? <h1>{result.data.name}</h1> : <p>Failed to load</p>}
```

### Astro — client script

```astro
<button id="log-btn">Log</button>

<script>
  import { useLogger } from "katanakit-js";

  document.getElementById("log-btn")?.addEventListener("click", () => {
    useLogger("Clicked from Astro client script");
  });
</script>
```

Astro processes local `<script>` tags, so npm imports just work. For a **pure
CDN** import, mark the script `is:inline` so Astro does not rewrite it:

```astro
<script is:inline type="module">
  import { useLogger } from "https://cdn.jsdelivr.net/npm/katanakit-js/+esm";
  useLogger("Loaded from the CDN");
</script>
```

### Vue / Nuxt

```ts
// Vue SFC or Nuxt plugin / server route — main barrel
import { useLogger, defineApiConfig, useGetApi } from "katanakit-js";

// Nuxt-only helpers
import { useUnwrap } from "katanakit-js/adapters/nuxt";

// Vue reactivity wrapper around useGetApi
import { useRequest } from "katanakit-js/adapters/vue";
```

More depth per integration: [Astro Adapter](/guides/services/astro-adapter),
[Nuxt Adapter](/guides/services/nuxt-adapter), [Vue Adapter](/guides/services/vue-adapter),
[Express Server](/guides/services/express-server), and the reactive
`useQuery`/`useMutation` bindings in [Framework Adapters](/guides/framework-adapters).

## Configuration files — `define*Config`

Every service that takes configuration exposes a **`define*Config`** entry
point. One call registers the config and hands it back — there is no second
`useInit*` step, so a whole file can be nothing but:

```ts
// katanakit.config.ts
import { defineApiConfig } from "katanakit-js";

export default defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: { pokemonById: "/pokemon/:id/" },
  },
  debug: true, // boolean flag
  getPokemon: async function () {
    //            ^^^^^^^^ `function`, never an arrow
    return useFetch("pokeapi", "pokemonById", { params: { id: 25 } });
  },
});
```

Importing that file registers the config, and the default export carries both
halves: the declared config under `api.config` and your methods directly on the
facade. Inside a method, `this.config` is the same object.

::: warning Use `function`, not an arrow
Arrow functions have no `this` of their own, so `this.config` inside an arrow
is `undefined`. The compiler catches it — write `async function () { … }`.
:::

| Service | Import | Methods on the facade |
|---------|--------|----------------------|
| API registry | `defineApiConfig` | yes |
| Notion | `defineNotionConfig` | yes |
| WordPress | `defineWordPressConfig` | yes |
| InsForge | `defineInsforgeConfig` | yes |

The old `useInit*` functions still work and are marked `@deprecated` — they are
a one-for-one rename of the config half; the full migration table lives in
[Upgrade to v6](/guides/upgrade-to/v6).

## How these docs are organised

The site has four kinds of pages, one per reader need:

| If you want to… | Read |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| **Learn by building**, step by step | [Tutorial: Your First API Client](/tutorials/first-api-client) |
| **Do a specific task** — HTTP client, framework, filesystem, bots | [Guides](/guides/services/) — [HTTP Client](/guides/services/http-client), [Query Client](/guides/query-client), [Filesystem](/guides/filesystem), [Notion](/guides/notion), [WordPress](/guides/wordpress), [InsForge](/guides/insforge), [Kitt assistant](/guides/assistant) |
| **Look up an exact fact** — signature, option, error code | [Service pages](/guides/services/) and the generated [API Reference](/api/) |
| **Understand why** it is built this way | [Why KatanaKit](/explanation/why-katanakit), [Architecture](/guides/architecture), [Decisions (ADRs)](/explanation/decisions/) |

The [Services overview](/guides/services/) lists every service with its one-line
description.
