# KatanaKit JS

A framework-agnostic TypeScript toolkit for the services most projects need:
typed HTTP, validation, caching, reactive signals, authorization, currency
conversion, and browser utilities. It ships ESM, is safe to import during SSR,
and keeps every optional framework integration on its own package entry point —
so a Vue app never pulls React, and a server build never pulls the DOM.

[Documentation](https://docs.senseikatana.com/) ·
[Getting started](https://docs.senseikatana.com/guides/getting-started) ·
[Tutorial](https://docs.senseikatana.com/tutorials/first-api-client) ·
[API reference](https://docs.senseikatana.com/api/) ·
[Changelog](https://docs.senseikatana.com/changelog) ·
[Release history](./CHANGELOG.md)

---

## Installation

```bash
npm install katanakit-js
# or
bun add katanakit-js
# or
pnpm add katanakit-js
```

Requires **Node.js >= 22.18** or **Bun >= 1.2**. Runtime dependencies are
`zod`, `@tanstack/query-core` and `@js-temporal/polyfill`. Prisma is only
needed for the optional `/prisma` subpath — `bun add @prisma/orm-postgres`.

Framework integrations are optional peers. Install the one you need:

```bash
bun add better-auth @insforge/sdk   # only if you use those adapters
bun add express hono                 # only if you run a server
```

See the [installation guide](https://docs.senseikatana.com/guides/getting-started)
for CDN usage and integration requirements.

---

## Getting started

Three steps: configure the client once, call it, branch on the result. Nothing
throws for an expected failure.

```ts
import { defineApiConfig, useGetApi } from "katanakit-js";

// 1. Declare the API once, at module scope.
defineApiConfig({
  pokeapi: {
    baseUri: "https://pokeapi.co/api/v2",
    endpoints: { pokemonById: "/pokemon/:id/" },
  },
});

// 2. Call it. The path params are typed from the endpoint name.
const result = await useGetApi<{ name: string }>("pokeapi", "pokemonById", {
  params: { id: 25 },
});

// 3. Branch. `result.ok` narrows the union for you.
if (result.ok) {
  console.log(result.data.name); // "pikachu"
} else {
  console.error(result.error.message);
}
```

### Safe Results

This is the convention the whole toolkit follows. A fallible operation returns
a discriminated union instead of throwing, so a `try`/`catch` around a network
call is never the interesting part of your code:

```ts
type SafeResult<T, E> =
  | { data: T;    error: null; ok: true  }
  | { data: null; error: E;   ok: false };
```

`ok: false` means *the call failed*. `data: null` with `ok: true` means *it
succeeded and the answer is legitimately nothing* — a missing record is not an
error, and the two are never collapsed into one.

The [error handling guide](https://docs.senseikatana.com/guides/errors) covers
the error shapes and the helpers that build them.

### Validate at the boundary

Parsing an untrusted payload is the one thing worth doing every time. It turns a
runtime surprise into a compile-time error:

```ts
import { useValidate } from "katanakit-js";
import { z } from "zod";

const Pokemon = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.object({ type: z.object({ name: z.string() }) })),
});

const parsed = useValidate(Pokemon, await result.data);

if (parsed.ok) {
  parsed.data.types[0]?.type.name; // fully typed
} else {
  console.error(parsed.error.message);
}
```

---

## What it includes

### Currency conversion — ECB reference rates

Convert an amount between two currencies in one call. Rates come from
[Frankfurter](https://www.frankfurter.app/) (ECB daily reference rates, no API
key), every call returns a Safe Result and never throws, and the rate source is
a port — swap in a live-market provider when you need one:

```ts
import { useConvertCurrency, useFormatCurrency } from "katanakit-js";

const result = await useConvertCurrency({ amount: 100, from: "USD", to: "EUR" });
if (result.ok) {
  result.data.converted; // 88.87 — money: exactly 2 decimals (symmetric rounding)
  result.data.rate;      // 0.88865 — full precision from the source
  result.data.date;      // the day the ECB rate belongs to

  // Conversion and formatting are separate concerns — compose them:
  useFormatCurrency({ amount: result.data.converted, currency: "EUR", locale: "es", digits: 2 });
  // "88,87 €"
}
```

These are **reference rates, not intraday forex quotes**: published around
14:15 CET on working days, with no bid/ask spread. **33 currencies** typecheck —
all the majors (`USD`, `EUR`, `GBP`, `JPY`, `CHF`, `CAD`, `AUD`, `NZD`) and the
usual traded set. `ARS`, `COP` and `CLP` format fine but are not covered by the
default source, so those pairs return an explicit error instead of a wrong
number. Pairs are resolved by dividing through a pivot currency, so a small
quote never loses precision and both directions are exactly reciprocal.
Subscribe to rate updates with `useSubscribeRates()`, or implement
`ICurrencyRateProvider` and inject it for live quotes.

→ [Currency conversion guide](https://docs.senseikatana.com/guides/currency)

### Authorization — roles, capabilities and resource grants

A role says *what class of thing* a person may ever do. A grant says *whether
they may do it to this one thing*. Both are needed the moment you share a
document with one person and not with everybody else.

```ts
import { AccessService, useCan, useRegisterRole } from "katanakit-js";

// The built-in ladder is owner > admin > editor > author > member > guest,
// and each role inherits everything below it.
useCan({ id: 1, roles: ["editor"] }, "content:publish"); // true
useCan({ id: 2, roles: ["author"] }, "content:edit:any"); // false

// Register a role for your own domain. Roles and capabilities are open
// strings, not a closed enum — `nomina:aprobar` is a legal capability.
useRegisterRole({
  slug: "rrhh",
  label: "RRHH",
  rank: 4,
  capabilities: ["nomina:aprobar"],
});
```

Then resolve against a **specific** resource. Global roles are checked first,
then grants scoped to that resource:

```ts
import { useGrantAwareCan } from "katanakit-js";

const decision = useGrantAwareCan({
  subject,                                   // from useResolveSubject()
  resource: { type: "expediente", id: 42 },
  capability: "expediente:read",
  useGrants: ({ subject, resource }) => listShares(subject.id, resource),
});

decision.allowed; // boolean
decision.source;  // "role" | "grant" | "none" — why, for your audit log
```

Storage is injected, never assumed: the kit ships the contract, your table
holds the rows. Expired grants are evaluated by the core, so revoking access
means deleting one record.

Pair it with a directory that refuses to lock you out:

```ts
import { DirectoryService } from "katanakit-js";

const directory = new DirectoryService({ repository });
const result = await directory.useSuspend(actor, id, "contract ended");

if (!result.ok) {
  // "last_owner", "self_suspension", "privilege_escalation", ...
  console.error(result.error.code, result.error.message);
}
```

The last active holder of a role cannot lose it, nobody can suspend or demote
themselves, and `owner` is never assigned through these paths.

→ [Access control guide](https://docs.senseikatana.com/guides/access-control)

### Authentication — one port, any provider

Identity, credential and authorization are three different things. The kit
normalizes the first two into a single `Principal` so the third never has to
know which provider produced it:

```ts
import { AuthService, useResolveSubject } from "katanakit-js";
import { useBetterAuthProvider } from "katanakit-js/adapters/better-auth";

AuthService.getInstance().useRegister(useBetterAuthProvider(auth));

// The seam between authentication and authorization. The role lookup is
// yours, so the core stays free of I/O.
const subject = await useResolveSubject("better-auth", request, (principal) =>
  directory.rolesFor(principal.subject),
);

if (!subject.ok) return response.status(500).end(); // the provider is broken
if (!subject.data) return response.status(401).end(); // anonymous
// subject.data is now an AccessSubject with roles
```

Swap the provider, keep the rest of the app. InsForge, Better Auth, or your own
national-identity integration — they all implement the same `IAuthProvider`.

**An anonymous visitor is `{ ok: true, data: null }`, not an error.** Only a real
failure is `ok: false`. Flattening those two turns a broken provider into a
publicly readable route.

→ [Better Auth guide](https://docs.senseikatana.com/guides/better-auth) ·
[InsForge guide](https://docs.senseikatana.com/guides/insforge)

### katanakitAI — API keys, MCP and agent config

One encrypted vault for AI provider keys, MCP server registration and
per-agent configuration. Local-first: scrypt + AES-256-GCM at rest, masked
secrets everywhere except an explicit reveal, and encrypted backups you can
store anywhere. Run it as `kai` (installed) or without installing via `npx katanakit-js` /
`bunx katanakit-js`.

```bash
kai keys add openai --label ci            # secret via --secret or stdin
kai mcp add context7 --url https://mcp.context7.com/mcp
kai agents config opencode --key <id>     # auto config + manual connection
kai keys export --out ~/backups/keys.enc.json
```

See [katanakitAI](https://docs.senseikatana.com/guides/services/katanakit-ai) for the full guide.

### Reactive signals

Framework-free reactivity with automatically tracked dependencies. No build step,
no decorators, no runtime dependency:

```ts
import { useCreateEffect, useCreateMemo, useCreateSignal } from "katanakit-js";

const [count, setCount] = useCreateSignal(0);
const doubled = useCreateMemo(() => count() * 2);

useCreateEffect(() => {
  console.log("now", doubled()); // re-runs only when `count` actually changes
});

// setCount((n) => n + 1);
```

Works identically in Node and in the browser — the effect simply does not run
where there is no DOM to update.

→ [Reactive guide](https://docs.senseikatana.com/guides/services/reactive)

### Framework adapters

One import path per runtime, so a bundle only ever contains what it uses:

```ts
import { useAuthClient } from "katanakit-js/adapters/vue";
import { useRequireCapability } from "katanakit-js/adapters/express";
import { useAstroAuthLocals } from "katanakit-js/adapters/better-auth";
```

Available entry points: `express`, `hono`, `bun`, `nestjs`, `nuxt`, `vue`,
`astro`, `next`, `react`, `solid`, `svelte`, `angular`, `vanilla`, `better-auth`,
`insforge`, `assistant`, `notion`, `wordpress`, `photoswipe`, plus `/schemas`,
`/prisma` and `/styles.css`.

→ [Framework adapters](https://docs.senseikatana.com/guides/framework-adapters)

### Typed HTTP, dates, arrays and more

```ts
import { useDateAdd, useDateBetween, useDateOrder, useFormat } from "katanakit-js";

useFormat("2026-03-01", "es", { dateStyle: "long" }); // "1 de marzo de 2026"
useDateAdd("2026-03-01", 30, "days");                 // "2026-03-31"
useDateBetween("2026-03-01", "2026-04-01", "days");   // 31
useDateBetween("2026-03-01", "2026-04-01", "months"); // 1
useDateOrder("2026-04-01", "2026-03-01");             // "after"
```

`useDateBetween()` is signed and never fractional, and its units are the ones
Notion uses in its formula editor — `years`, `quarters`, `months`, `weeks`,
`days`, `hours`, `minutes`.

→ [All services](https://docs.senseikatana.com/guides/services/)

### One service shape

Every core service is a **Singleton facade class** — `getInstance()` plus
`use*` methods — re-exported as thin `use*` functions, so the call style is the
same whether you reach for `FormatterService`, `UnitConverterService` or
`CurrencyConverterService`. The pattern vocabulary is small and fixed:
**Singleton**, **Facade**, **Observer**, **Strategy** and **Dependency
Injection** (`create()` builds an isolated instance with injected
collaborators). Public methods use the `use*` prefix; `on*` is reserved
exclusively for Observer callbacks the service invokes.

→ [Service architecture](https://docs.senseikatana.com/explanation/service-architecture)

---

## Examples

Runnable projects live in [`examples/`](./examples):

| Example | What it shows |
| --- | --- |
| [`api-manager`](./examples/api-manager) | Typed HTTP clients, interceptors, Safe Results |
| [`query`](./examples/query) | TanStack Query caching and framework adapters |
| [`astro`](./examples/astro) | SSR-safe imports and the Astro integration |
| [`vue`](./examples/vue) | Reactive signals inside Vue |
| [`prisma`](./examples/prisma) | The Prisma contract and typed queries |
| [`assistant`](./examples/assistant) | The AI assistant with a capability guard |
| [`notion`](./examples/notion) · [`wordpress`](./examples/wordpress) | Content integrations |
| [`agent`](./examples/agent) · [`observer`](./examples/observer) · [`geometry`](./examples/geometry) | Agent providers, watchers, geometry helpers |
| [`seed`](./examples/seed) | Faker-driven test data |
| [`dashboard`](./examples/dashboard) | Every documented UI component composed into a full admin dashboard |

---

## Boilerplates and gists

Copy-paste starting points, kept in sync with this repository. Each one is a complete
file set with a README, and each was verified by building it against the version it names.

### Boilerplates

Ready-to-run project scaffolds using `katanakit-js` where it removes boilerplate.

| Gist | What it scaffolds |
| --- | --- |
| [Nuxt 4](https://gist.github.com/senseikatana/0833bd560e547bdebf752b291a65ca8e) | `nuxt.config.ts`, `runtimeConfig` vs `app.config`, route rules, error page, API routes with `useEventResponse` / `useUnwrap` |
| [Astro 7](https://gist.github.com/senseikatana/7b6595e7b51fe39fc7459442de9ba196) | Content collections, `getStaticPaths` with `useAstroPathsFrom`, pagination, tag pages, RSS endpoint |
| [React 19 + Vite 8](https://gist.github.com/senseikatana/8d4a152a98c6f99b3c2745b0787fb393) | `createRoot`, error boundary, `useQuery` + `useSafeQueryFn`, mutations, typed env |
| [VS Code snippets](https://gist.github.com/senseikatana/2dea6c57e380e0c617a9b8662f9a163e) | 36 whole-file scaffolds — type `nuxt-config`, `astro-static-paths`, `react-main`, … |

### Standalone source

Single-file extracts of the services, for reading and adapting without installing
anything. Useful when you want the source in front of you; prefer the package otherwise.

| Gist | Covers |
| --- | --- |
| [DOM](https://gist.github.com/senseikatana/011bc24c3fcc95f6c3338265294abbe7) | SSR-safe element helpers, sanitised attribute writes |
| [Dates](https://gist.github.com/senseikatana/77bd2ebb10233aab44dc84093dfccfe5) | Temporal calendar arithmetic |
| [API Manager](https://gist.github.com/senseikatana/7e76dcb54999fd9c4823c59998ff4e57) | Named endpoints, interceptors, Safe Results |
| [Reactive Core](https://gist.github.com/senseikatana/e06a918763c314932f96ff42513431e9) | Signals, effects, memos, batching |
| [Safe Result](https://gist.github.com/senseikatana/402c590c99287bb80667420c0d96e0d5) | Errors as values |
| [Query Adapters](https://gist.github.com/senseikatana/b2bc514e42533c218820cf86c879aa5d) | TanStack Query bindings for React, Vue, Svelte, Solid, Angular |

The same links live in the docs sidebar under **Boilerplates**.

---

## Documentation

The site follows [Diátaxis](https://diataxis.fr): one page, one kind.

| Kind | Where | Read it when |
| --- | --- | --- |
| Tutorial | [first-api-client](https://docs.senseikatana.com/tutorials/first-api-client) | You are learning the toolkit end to end |
| How-to | [guides](https://docs.senseikatana.com/guides/getting-started) | You know the goal and need the steps |
| Reference | [API reference](https://docs.senseikatana.com/api/) | You need exact signatures |
| Explanation | [why KatanaKit](https://docs.senseikatana.com/explanation/why-katanakit) · [decisions](https://docs.senseikatana.com/explanation/decisions/) | You want the reasoning behind a choice |

Architecture decisions are recorded as ADRs and are never rewritten — see the
[decisions index](https://docs.senseikatana.com/explanation/decisions/).

---

## Contributing

```bash
git clone https://github.com/senseikatana/katanakit-js.git
cd katanakit-js
git checkout dev
bun install
bun run check   # ESLint, typechecks, tests
```

Keep changes focused, add or update tests, and update the relevant docs with any
public API change. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for the
architecture rules, coding conventions and release workflow. To report a
vulnerability, see [SECURITY.md](./SECURITY.md).

## License

MIT