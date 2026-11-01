---
title: Hono
description: "Runtime-agnostic Hono adapter: a hardened app factory, Safe Result JSON responses and capability guards for Node, Bun, Deno and Cloudflare Workers."
---

# Hono

`katanakit-js/adapters/hono` integrates the toolkit with
[Hono](https://hono.dev), the small, Web-Standards HTTP framework. The same app
you build here runs unchanged on every runtime Hono supports:

- **Node** through `@hono/node-server`;
- **Bun** through `Bun.serve({ fetch: app.fetch })`;
- **Deno** by `export default app` — or `Deno.serve(app.fetch)` in a plain
  script;
- **Cloudflare Workers** by `export default app` — the app already implements
  the `{ fetch }` shape the Workers runtime expects.

The adapter is an **optional subpath**: the main `katanakit-js` barrel never
imports Hono, and `hono` (`>=4.0.0`) is declared as an optional peer
dependency, so the adapter costs nothing unless you install it deliberately.
Install it with `npm i katanakit-js hono`; `@hono/node-server` is only needed
when you serve from Node.

It exports three building blocks plus one type:

| Export | Kind | Purpose |
| --- | --- | --- |
| `useCreateApp()` | factory | creates a Hono app with hardened headers, CORS, `/health` and JSON error bodies |
| `useSafeJson()` | response helper | maps a Safe Result to a JSON response with the matching status |
| `useRequireCapability()` | middleware factory | turns an access capability into a Hono middleware |
| `HonoAppOptions` | type | options accepted by `useCreateApp()` |

Two design rules shape everything on this page:

1. **Safe Results cross the boundary unchanged.** Handlers never throw on an
   upstream failure; they return `useSafeJson(c, result)` and let the helper
   pick the status. Every error body the adapter produces — 401, 403, 404, 500
   — uses the same `{ ok, data, error }` envelope as the rest of the toolkit,
   so clients parse one shape everywhere.
2. **Conventions come from the Express adapter.** `CORS_ORIGINS` is read with
   the same comma-separated rule, the same default origin
   (`http://localhost:3000`) and the same "empty variable means no
   cross-origin" behavior documented in
   [Express Server](/guides/services/express-server). If you are migrating an
   Express service, the environment does not change.

## Install

```bash
npm i katanakit-js hono
```

For the Node runtime, add the Node server package as well:

```bash
npm i @hono/node-server
```

- `hono` is the adapter's only peer (`>=4.0.0`, optional). Bun, Deno and
  Cloudflare Workers need nothing else.
- KatanaKit publishes ESM and requires Node `>=22.18` (see `engines`).
  TypeScript projects on `module: nodenext` can import the subpath directly.
- The API registry behind every request comes from `defineApiConfig()` in the
  main barrel, exactly as in [HTTP Client](/guides/services/http-client).
  Register it once at module scope — the registry is process-global and is
  shared by every request.

## Create the app

`useCreateApp()` returns a ready-to-mount Hono application. It is not a
singleton: every call builds a fresh app, which is what you want in tests and
worker isolates, and in a server entry point you simply call it once.

### useCreateApp(options?)

```ts
import { useCreateApp } from "katanakit-js/adapters/hono";

const app = useCreateApp({
  corsOrigins: ["https://app.example.com"],
  health: true,
});
```

| Option | Type | Default | What it does |
| --- | --- | --- | --- |
| `corsOrigins` | `string[]` | `CORS_ORIGINS` env or `["http://localhost:3000"]` | allow-list passed to Hono's `cors()` middleware |
| `health` | `boolean` | `true` | registers `GET /health` |

Both options are resolved **before** any route is mounted, so the only way to
change the CORS policy is to pass it at creation time.

### What the factory mounts

In order, on every path:

1. **`secureHeaders()`** from Hono — sets the hardened defaults for every
   response (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`,
   `Referrer-Policy: no-referrer`,
   `Strict-Transport-Security: max-age=15552000; includeSubDomains`,
   `Cross-Origin-Opener-Policy`, `X-DNS-Prefetch-Control`, and more) and
   removes `X-Powered-By`.
2. **`cors()`** with `origin` set to the resolved allow-list and
   `allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"]`. Preflight
   `OPTIONS` requests are answered by the middleware; when the request carries
   `Access-Control-Request-Headers` (for example `Authorization`), those
   headers are echoed back in `Access-Control-Allow-Headers`. Responses append
   `Vary: Origin`.
3. **`GET /health`** unless `health: false`. The body is a liveness payload,
   deliberately not the Safe Result envelope:
   `{ "status": "ok", "timestamp": "2026-10-05T12:00:00.000Z" }`.
4. **A JSON 404** via `app.notFound()` for any unmatched route:
   `{ "ok": false, "data": null, "error": { "message": "Not Found", "status": 404 } }`.
5. **A JSON 500** via `app.onError()` for anything a route or middleware
   throws. The error is logged with `useLogger("Unhandled error:", error, "error")`
   and the response body is
   `{ "ok": false, "data": null, "error": { "message": "Internal Server Error", "status": 500 } }`.
   The internal message never reaches the client.

Because `secureHeaders()` and `cors()` are registered with `app.use("*")`
before your routes, **routes you add after the factory are automatically
covered** — no second registration step.

### Adding routes

Mount routes with the standard Hono verbs. Handlers can be registered
individually or chained; middleware runs in the order it is listed.

```ts
const app = useCreateApp();

app.get("/ping", (c) => c.json({ pong: true }));

app.post("/echo", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body }, 201);
});
```

**Real use case** — one app for every runtime: the same `src/server.ts` file is
the Node server, the Bun server, the Deno entry point and the Workers entry
point; deployment decides which line at the bottom actually starts it.

## Safe JSON responses

The point of a proxy route is to forward the upstream outcome *as data*, not as
an exception. `useSafeJson()` takes the Safe Result a KatanaKit fetch already
returned and turns it into the HTTP response, status included.

### useSafeJson(context, result, fallbackStatus?)

```ts
import { useSafeJson } from "katanakit-js/adapters/hono";

app.get("/products/:id", async (c) => {
  const result = await useGetApi("shop", "productById", {
    params: { id: c.req.param("id") },
  });
  return useSafeJson(c, result);
});
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `context` | `Context` | — | the Hono context of the current request |
| `result` | `FetchResult<T>` | — | any Safe Result from a KatanaKit fetch method |
| `fallbackStatus` | `ContentfulStatusCode` | `500` | status used when the error carries none |

The mapping is deterministic:

| Safe Result | Response status | Body |
| --- | --- | --- |
| `ok: true` | `200` (always) | the whole result: `{ ok, data, error, url, status }` |
| `ok: false`, `error.status` between `400` and `599` | that upstream status | the whole result, so `404`, `429` and `503` keep their meaning |
| `ok: false`, `error.status` outside `400`–`599` (network/config errors use `0`) | `fallbackStatus` | the whole result |

`fallbackStatus` is typed as Hono's `ContentfulStatusCode`, so TypeScript
rejects statuses that cannot carry a body (`204`, `304`, …) at compile time.
A common choice is `502` for proxy endpoints: it tells your clients "the
upstream is unreachable" instead of collapsing everything into a generic 500.

Two behaviors worth internalizing:

- **Success is normalized to 200.** Even when the upstream answered `201` or
  `202`, the response status is `200`; the original status is still visible in
  the body's `status` field. If the exact upstream status matters, branch on
  `result.ok` and use `c.json(result, result.status)` yourself.
- **The whole Safe Result is the wire format.** That includes `url` and
  `status`, which makes debugging easy but can expose internal upstream
  addresses. When that is sensitive, map the result to a smaller shape before
  responding.

### Proxying reads and writes

A GET proxy only needs `params`; a POST proxy forwards a body — either what
the caller sent, or a payload your route builds. `usePost()` serializes plain
objects to JSON with the matching `Content-Type` and forwards raw bodies
(`FormData`, `Blob`, `ReadableStream`, …) untouched.

```ts
import { useGetApi, usePost } from "katanakit-js";
import { useSafeJson } from "katanakit-js/adapters/hono";

app.get("/catalog/search", async (c) => {
  const result = await useGetApi("shop", "products", {
    query: { q: c.req.query("q"), limit: c.req.query("limit") },
  });
  return useSafeJson(c, result, 502);
});

app.post("/catalog/products", async (c) => {
  const body = await c.req.json();
  const result = await usePost("shop", "products", body);
  return useSafeJson(c, result);
});
```

**Real use case** — a thin backend-for-frontend: the browser talks to your Hono
server with one origin and one auth model, and the server fans out to several
registered upstreams. Every upstream failure keeps its status on the way out,
so the frontend can distinguish "not found" from "rate limited" without
parsing prose.

## Access guard

`useRequireCapability(capability, resolveSubject)` builds a Hono
`MiddlewareHandler` around the toolkit's access service, mirroring the Express
guard and the Nest guard. The adapter ships **no auth provider** on purpose:
you resolve the subject from whatever the request carries — JWT, session, API
key — and the guard maps the outcome to the API-shaped response.

```ts
import type { AccessSubject } from "katanakit-js";
import { useRequireCapability } from "katanakit-js/adapters/hono";

const canPublish = useRequireCapability("content:publish", (c) => {
  const authorization = c.req.header("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return resolveSubjectFromToken(authorization.slice(7)); // your verification
});

app.post("/articles/:id/publish", canPublish, (c) => c.json({ ok: true }));
```

| Parameter | Type | Description |
| --- | --- | --- |
| `capability` | `AccessCapability` | the capability the route requires |
| `resolveSubject` | `(context: Context) => AccessSubject \| null` | resolves the caller per request; return `null` for anonymous |

| Outcome | Status | Body |
| --- | --- | --- |
| `resolveSubject` returns `null` | `401` | `{ ok: false, data: null, error: { message: "Authentication required", status: 401 } }` |
| `useCan()` returns `false` or throws | `403` | `{ ok: false, data: null, error: { message: "Missing capability: <capability>", status: 403 } }` |
| allowed | — | `await next()` |

Returning `null` means **anonymous** (401); a subject that lacks the capability
means **authenticated but forbidden** (403). The guard never redirects — it is
designed for JSON APIs and returns the toolkit envelope in both rejection
cases.

### Subjects, roles and fail-closed behavior

The subject is structural, so any `{ id, roles }` works — a decoded JWT
payload, a session row, an API-key record:

```ts
type AccessRole = "owner" | "admin" | "editor" | "author" | "member" | "guest";

interface AccessSubject {
  id: string | number;
  roles: AccessRole[];
}
```

`AccessSubject`, `AccessRole` and `AccessCapability` can be imported as types
from the main `katanakit-js` barrel. Capabilities are inherited down the role
hierarchy (`owner` > `admin` > `editor` > `author` > `member` > `guest`).

`useCan()` grants the capability when **any** of the subject's roles provides
it, directly or by inheritance. A malformed subject or unknown role makes
`useCan()` throw; the guard catches that and fails closed with the 403 body, so
an invalid subject never reaches your handler. **Fail closed is total:** if
`resolveSubject` itself throws — for example a token decoder exploding on
garbage — Hono routes the error to `app.onError()`, which logs it and answers
`500`. Keep the resolver total by catching verification errors inside it and
returning `null` for anything you cannot authenticate.

`useRequireCapability` returns a standard Hono middleware, so it composes like
any other:

```ts
app.get("/admin/reports", canViewReports, logAccess, (c) => c.json({ reports: [] }));

// Or guard a whole subtree once:
app.use("/admin/*", canAccessAdmin);
```

Edge cases:

- **`resolveSubject` is synchronous.** The adapter calls it without `await`,
  so a promise return value is truthy and would skip the 401. When auth needs
  a database or a JWKS lookup, run an upstream middleware and stash the
  result on the context, then read it in the resolver:

  ```ts
  import type { AccessSubject } from "katanakit-js";

  declare module "hono" {
    interface ContextVariableMap {
      subject: AccessSubject | null;
    }
  }

  app.use("/api/*", async (c, next) => {
    c.set("subject", await verifyToken(c.req.header("authorization")));
    await next();
  });

  const canCreate = useRequireCapability("content:create", (c) =>
    c.get("subject") ?? null,
  );
  ```

- Register the guard **before** the handler it protects, either inline
  (`app.post(path, guard, handler)`) or via `app.use(path, guard)`. Hono runs
  middleware in registration order.
- Define guards at module scope so the capability string and resolver closure
  are created once and reused by every route that needs them.

**Real use case** — public reads, gated writes: leave `GET` routes open, attach
guards only to mutating routes with the narrowest capability that fits
(`content:create` for POST, `content:edit:any` for PATCH, `system:admin` for
operational endpoints).

## Deploy everywhere

The app object is the same in all four environments; only the boot line
changes.

### Node

```ts
import { serve } from "@hono/node-server";
import app from "./server.js";

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});
```

### Bun

```ts
import app from "./server.js";

Bun.serve({
  port: 3000,
  fetch: app.fetch,
});
```

### Cloudflare Workers

```ts
import app from "./server.js";

export default app;
```

A minimal `wrangler.jsonc` for the entry point:

```jsonc
{
  "name": "my-katanakit-api",
  "main": "src/server.ts",
  "compatibility_date": "2026-10-01"
}
```

The factory returns a plain `Hono`, so `c.env` is untyped. Annotate it at the
call site when a binding needs a shape:

```ts
app.get("/files/:key", async (c) => {
  const bucket = (c.env as { FILES?: R2Bucket }).FILES;
  // ...
});
```

### Deno

```ts
import app from "./server.ts";

export default app; // deno serve / Deno Deploy
```

For a plain local script that should bind a port itself, call
`Deno.serve(app.fetch)` instead of the default export.

### CORS_ORIGINS at deploy time

`useCreateApp()` resolves its allow-list in this order: the `corsOrigins`
option, then `process.env.CORS_ORIGINS` (split on commas, trimmed, empties
filtered), then `["http://localhost:3000"]`. Notes for real deployments:

- On **Node and Bun**, set `CORS_ORIGINS=https://app.example.com,https://admin.example.com`
  in the environment and no code changes are needed.
- On **Cloudflare Workers**, `process.env` is only populated when the
  `nodejs_compat` compatibility flag is enabled. Prefer passing
  `corsOrigins` explicitly, read from the Worker `env` binding, so the behavior
  does not depend on the flag.
- On **Deno**, pass `corsOrigins` explicitly for the same reason — the env
  lookup is skipped entirely when the option is present.
- The allow-list is resolved **once**, when `useCreateApp()` runs — not per
  request. Build the app at startup and every request sees the same policy.
- The factory enables no CORS credentials (`Access-Control-Allow-Credentials`
  is never set). Cookie-based cross-origin auth is therefore not supported by
  the factory; if you need it, build a plain `new Hono()` and mount Hono's
  `cors()` with `credentials: true` yourself, reusing `useSafeJson()` and the
  other helpers.

## Testing

Every Hono app exposes `app.request(path, init?)`, which executes the full
middleware chain and returns a `Response` — **no server, no port, no socket**.
This makes the adapter trivial to test with Vitest: build a tiny app per
assertion and inspect status and body. The examples below mirror the real
adapter tests.

### The factory: health, 404 and CORS

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCreateApp } from "katanakit-js/adapters/hono";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("useCreateApp", () => {
  it("serves /health with the toolkit JSON shape", async () => {
    const response = await useCreateApp().request("/health");

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ status: "ok" });
  });

  it("can disable the health route", async () => {
    const response = await useCreateApp({ health: false }).request("/health");
    expect(response.status).toBe(404);
  });

  it("answers unknown routes with the safe-result 404 body", async () => {
    const response = await useCreateApp().request("/nope");

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      ok: false,
      data: null,
      error: { message: "Not Found", status: 404 },
    });
  });

  it("reads CORS origins from the environment", async () => {
    vi.stubEnv("CORS_ORIGINS", "https://one.dev, https://two.dev");

    const response = await useCreateApp().request("/health", {
      headers: { Origin: "https://two.dev" },
    });

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://two.dev");
  });
});
```

The `afterEach` hook restores the stubbed environment so `CORS_ORIGINS` does
not leak into the next test.

### The guard: 401, 403, 200 and fail-closed

A fixed subject per test keeps the app deterministic:

```ts
import { afterEach, describe, expect, it } from "vitest";
import { useResetRoles } from "katanakit-js";
import { useCreateApp, useRequireCapability } from "katanakit-js/adapters/hono";
import type { AccessSubject } from "katanakit-js";

afterEach(() => {
  useResetRoles();
});

function appWithGuard(subject: AccessSubject | null) {
  const app = useCreateApp();
  app.get(
    "/admin",
    useRequireCapability("content:publish", () => subject),
    (c) => c.json({ ok: true }),
  );
  return app;
}

describe("useRequireCapability", () => {
  it("rejects anonymous requests with 401", async () => {
    const response = await appWithGuard(null).request("/admin");

    expect(response.status).toBe(401);
    expect(await response.json()).toMatchObject({
      ok: false,
      error: { message: "Authentication required", status: 401 },
    });
  });

  it("rejects authenticated subjects without the capability with 403", async () => {
    const response = await appWithGuard({ id: 3, roles: ["member"] }).request("/admin");

    expect(response.status).toBe(403);
    expect(await response.json()).toMatchObject({
      ok: false,
      error: { message: "Missing capability: content:publish", status: 403 },
    });
  });

  it("lets subjects whose role grants the capability through", async () => {
    const response = await appWithGuard({ id: 5, roles: ["owner"] }).request("/admin");

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it("fails closed when the subject is malformed", async () => {
    const response = await appWithGuard({ id: 9 } as unknown as AccessSubject).request("/admin");

    expect(response.status).toBe(403);
  });
});
```

`useResetRoles()` clears any custom role definitions registered through
`useRegisterRole()`, keeping the access service clean across tests.

### `useSafeJson`: status mapping

Test the helper directly by mounting a route that returns a canned result:

```ts
import { describe, expect, it } from "vitest";
import { useCreateApp, useSafeJson } from "katanakit-js/adapters/hono";
import type { FetchResult } from "katanakit-js";

function appWithResult(result: FetchResult<unknown>, fallbackStatus = 500) {
  const app = useCreateApp();
  app.get("/data", (c) => useSafeJson(c, result, fallbackStatus));
  return app;
}

const ok: FetchResult<{ name: string }> = {
  ok: true,
  data: { name: "pikachu" },
  error: null,
  url: "https://pokeapi.co/api/v2/pokemon/25",
  status: 200,
};

const notFound: FetchResult<unknown> = {
  ok: false,
  data: null,
  error: { message: "HTTP Error: Not Found", status: 404 },
  url: "https://pokeapi.co/api/v2/pokemon/99999",
  status: 404,
};

const network: FetchResult<unknown> = {
  ok: false,
  data: null,
  error: { message: "Network Error: fetch failed", status: 0 },
  url: "",
  status: 0,
};

describe("useSafeJson", () => {
  it("returns the Safe Result with 200 on success", async () => {
    const response = await appWithResult(ok).request("/data");

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(ok);
  });

  it("echoes upstream HTTP error statuses", async () => {
    const response = await appWithResult(notFound).request("/data");
    expect(response.status).toBe(404);
  });

  it("falls back to 500 for network errors without a status", async () => {
    const response = await appWithResult(network).request("/data");
    expect(response.status).toBe(500);
  });

  it("honors a custom fallback status", async () => {
    const response = await appWithResult(network, 502).request("/data");
    expect(response.status).toBe(502);
  });
});
```

The API registry is **process-global**, shared across test files in the same
worker. Register unique API keys per file, or register the same fixture in
`beforeEach()` — later definitions win for identical keys.

## Full example: a small proxy API

This walkthrough builds a tiny backend-for-frontend: a public read proxy, a
guarded write proxy that forwards the caller's JSON body, health checking and
error mapping. Everything lives in one `src/server.ts`, and the exported app
runs on all four runtimes from [Deploy everywhere](#deploy-everywhere).

### Step 1 — Register the upstream API

```ts
// src/server.ts
import type { AccessSubject } from "katanakit-js";
import { defineApiConfig, useGetApi, usePost } from "katanakit-js";
import {
  useCreateApp,
  useRequireCapability,
  useSafeJson,
} from "katanakit-js/adapters/hono";

defineApiConfig({
  store: {
    baseUri: "https://api.example.com/v1",
    endpoints: {
      productById: "/products/:id",
      products: "/products",
      orders: "/orders",
    },
    defaultQueryParams: { products: { limit: 20 } },
  },
});
```

Registration is a module-scope side effect: it happens once when the module is
loaded, before the first request. The upstream base URL and placeholders live
here, not in route handlers, so changing the provider is a one-line edit.

### Step 2 — Build the app and the public read proxy

```ts
const app = useCreateApp();

app.get("/api/products", async (c) => {
  const result = await useGetApi("store", "products", {
    query: { q: c.req.query("q") },
  });
  return useSafeJson(c, result, 502);
});

app.get("/api/products/:id", async (c) => {
  const result = await useGetApi("store", "productById", {
    params: { id: c.req.param("id") },
  });
  return useSafeJson(c, result, 502);
});
```

`useCreateApp()` already mounted `secureHeaders()`, CORS and `/health`, so the
only thing left is routes. Both handlers read the request (`query`, `param`),
call the registered endpoint and hand the Safe Result to `useSafeJson()`. The
`502` fallback marks network and configuration failures as upstream problems,
while a real upstream `404` still leaves as a `404`.

### Step 3 — Guard the write route

```ts
// Your authentication layer — the adapter ships no auth provider.
function resolveSubjectFromToken(token: string): AccessSubject | null {
  // Verify the JWT signature, load the session, check the revocation list…
  // Return { id, roles } for authenticated callers, or null for anonymous.
  return null;
}

const canCreateOrder = useRequireCapability("content:create", (c) => {
  const authorization = c.req.header("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return resolveSubjectFromToken(authorization.slice(7));
});
```

Requests without a Bearer token get the 401 envelope; requests whose subject
lacks `content:create` get the 403 envelope with the capability name; only
callers that pass both checks reach the handler.

### Step 4 — Forward the JSON body

```ts
app.post("/api/orders", canCreateOrder, async (c) => {
  const body = await c.req.json().catch(() => null);

  if (body === null) {
    return c.json(
      { ok: false, data: null, error: { message: "Invalid JSON body", status: 400 } },
      400,
    );
  }

  const result = await usePost("store", "orders", body);
  return useSafeJson(c, result);
});
```

The `.catch(() => null)` is deliberate: a malformed body would otherwise throw
inside the handler and be swallowed by `onError()` as a 500. Validating it
first keeps client mistakes at 400. A valid body is forwarded as-is — `usePost`
serializes plain objects to JSON with the correct `Content-Type` — and the
upstream response (including a validation `422`, for example) travels back
through `useSafeJson()`.

### Step 5 — Export the app

```ts
export default app;
```

That single line is the Cloudflare Workers and Deno entry point. For Node and
Bun, import this file and add the four-line boot from
[Deploy everywhere](#deploy-everywhere).

Request summary:

| Route | Access | Upstream call | Error mapping |
| --- | --- | --- | --- |
| `GET /health` | public | none | — |
| `GET /api/products` | public | `useGetApi` + `query` | `useSafeJson`, fallback `502` |
| `GET /api/products/:id` | public | `useGetApi` + `params` | `useSafeJson`, fallback `502` |
| `POST /api/orders` | `content:create` | `usePost` + body | 400 for bad JSON, then `useSafeJson` |

## Related

- [HTTP Client](/guides/services/http-client) — `defineApiConfig()`, URL building
  and every fetch option the handlers forward.
- [Error Handling](/guides/errors) — the Safe Result contract behind
  `useSafeJson()`.
- [Express Server](/guides/services/express-server) — the same conventions for
  Express, including `CORS_ORIGINS` and the capability guard.
- [NestJS](/guides/nestjs) — the DI version of the capability guard and the
  same Safe Result rules.
- [Bun Adapter](/guides/bun-adapter) — the native `Bun.serve` route
  table alternative to Hono.
- [API Reference](/api/) — every export, generated from source.
