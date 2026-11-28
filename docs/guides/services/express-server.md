---
title: Express Server
description: "Reference Express 5 server with hardened defaults, raw-body capture, capability guards and demo routes — every export explained."
---

# Express Server

`katanakit-js/adapters/express` is an optional subpath built on
[Express 5](https://expressjs.com). It ships a **reference server**: a small,
production-shaped HTTP application you can start with one call, plus the
building blocks to wire KatanaKit into an Express app you already own.

Both `express` (`>=5`) and `cors` (`>=2.8`) are declared as optional peer
dependencies, so this subpath costs nothing unless you import it deliberately.

What the reference server provides:

- **App factory** — `onExpressCreate()`, `onExpressGetApp()`, `onGetApp()`
  and `app` all resolve to the same process-wide `Application`.
- **Hardened defaults** — CORS allow-list read from `CORS_ORIGINS`,
  `x-powered-by` disabled, and 100 kB caps on JSON and URL-encoded bodies.
- **Lifecycle helpers** — `onExpressStart()` and `onExpressFinalize()` are
  idempotent, so bootstrapping code can be repeated safely.
- **Raw body handling** — the JSON parser captures the raw request buffer and
  `onGetRawBody()` exposes it for webhook signature verification.
- **Capability guard** — `onRequireCapability()` turns a `onCan()` access
  check into 401/403 Express middleware.
- **Demo surface** — a health check and a users router mount automatically; a
  products CRUD controller is exported for you to mount yourself.

| Concern | Default |
| --- | --- |
| CORS origins | `CORS_ORIGINS` (comma-separated) or `["http://localhost:3000"]` |
| CORS methods | `GET`, `POST`, `PUT`, `DELETE` |
| Body limits | `100kb` for JSON and URL-encoded payloads |
| `X-Powered-By` | disabled |
| Health check | `GET /health` |
| Demo users router | mounted at `/` |
| Error + 404 handler | registered by `onExpressFinalize()`, invoked by `onExpressStart()` |

**Use the reference server** for prototypes, dev servers, demos and small
internal APIs where you want a running server with sane defaults in two lines
and do not already have an Express app.

**Mount the pieces in an existing app** when you already run Express: import
only what you need — `onRequireCapability()`, `onGetRawBody()`, the products
controller handlers — and skip `onExpressCreate()` / `onExpressStart()` so the
demo users router, the automatic `/health` route and the global 404 never enter
your middleware stack. The caveat: the factory and lifecycle exports share a
module-level singleton, so you cannot build a second independent reference
server in the same process.

## Quick example

```ts
import { onExpressStart } from "katanakit-js/adapters/express";

// Finalizes error/404 handling and listens on http://localhost:3000
onExpressStart();
```

The server answers immediately:

```bash
curl http://localhost:3000/health
# {"status":"ok","timestamp":"2026-10-05T12:00:00.000Z"}

curl http://localhost:3000/
# {"message":"Get all users"}
```

Pass a port and host when the defaults do not fit:

```ts
onExpressStart(8080, "0.0.0.0"); // all interfaces, custom port
```

## Lifecycle

The adapter keeps three process-wide flags: whether the app was created,
whether error handling was finalized, and whether the server was started.
Every lifecycle call checks its flag first, so `onExpressCreate()` →
`onExpressFinalize()` → `onExpressStart()` is safe to call from more than one
module. The intended order is: create, mount your routers, finalize, start —
`onExpressStart()` performs the last two steps for you.

### onExpressStart(port?, host?)

```ts
const onExpressStart: (port?: number, host?: string) => void;
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `port` | `number` | `3000` | Port passed to `app.listen()`. |
| `host` | `string` | `"localhost"` | Interface to bind. Loopback only by default. |

Starting is **idempotent**: the first call sets the `started` flag, finalizes
error handling, resolves the app and calls `app.listen()`. When the socket is
listening, the log line `Server running on http://<host>:<port>` is emitted
through `onLogger`. Subsequent calls are no-ops, even with different
arguments — whoever starts first wins.

```ts
import { onExpressStart } from "katanakit-js/adapters/express";

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "localhost";

onExpressStart(port, host);
```

Edge cases:

- **No stop or restart.** The function returns `void` and discards the
  underlying `http.Server`; there is no `onStop()`. Stop the process instead.
- **Binding.** `localhost` accepts connections only from the same machine.
  Containers and PaaS runtimes usually need `"0.0.0.0"`.
- **Occupied port.** No `'error'` listener is attached to the server, so
  `EADDRINUSE` surfaces as an unhandled error event — the process crashes
  rather than receiving a rejected promise.
- **Random port.** `onExpressStart(0)` lets the OS pick a port, but the log
  line prints the literal `0`, so you cannot discover the assigned port from
  the adapter.

**Real use case** — container deployment: read `PORT` and `HOST` from the
environment, start once at the top of your entry file, and let the platform
handle restarts.

### onStart(port?, host?)

```ts
const onStart: typeof onExpressStart;
```

A shorter alias re-exported from `app.ts` (`export const onStart =
onExpressStart`). It is the same function reference, so behavior, defaults and
idempotency are identical; pick the name that reads best next to the `app`
proxy.

```ts
import { app, onStart } from "katanakit-js/adapters/express";

app.get("/ping", (_request, response) => response.json({ pong: true }));
onStart(3000);
```

**Real use case** — one-file scripts: `app` plus `onStart` keeps route
registration and boot in a single module without importing the longer names.

### onExpressFinalize()

```ts
const onExpressFinalize: () => void;
```

Registers the two terminal middlewares, in order:

1. a global error handler that logs `Unhandled error:` with the error object
   and responds `500 { "error": "Internal Server Error" }`;
2. a 404 catch-all that responds `404 { "error": "Not Found" }`.

Express runs middleware in registration order, so finalize **after** mounting
every router; otherwise the 404 catch-all shadows the routes you add later.
`onExpressStart()` calls it automatically; call it yourself when you want the
error/404 behavior without listening. It is idempotent, but the `finalized`
flag latches — finalizing too early permanently shadows anything mounted
afterwards in that process.

```ts
import { onExpressCreate, onExpressFinalize } from "katanakit-js/adapters/express";

const app = onExpressCreate();

app.get("/reports", (_request, response) => response.json({ reports: [] }));

// 404 catch-all goes last — then hand `app` to a test runner or an external
// HTTP server without starting one here.
onExpressFinalize();
```

**Real use case** — integration tests: build the app, mount the router under
test, finalize, and pass the app to `supertest` without binding a real port.
The 401/403/404/500 responses you assert on are exactly the reference server's.

## App factory

All four factory exports resolve to the **same** `Application`. The first call
builds it, and building applies the full default stack in this order: CORS,
`x-powered-by` disabled, JSON parser (with raw-body capture), URL-encoded
parser, `GET /health`, and the demo users `router` mounted at `/`. The error
handler and 404 are **not** part of creation — they only arrive with
`onExpressFinalize()`.

### onExpressCreate()

```ts
const onExpressCreate: () => Application;
```

Returns the existing app when one was already created; otherwise creates an
`express()` instance, applies the default middleware stack and mounts the
health check plus the demo router. Idempotent — later calls return the same
object. Mount your own routers on the returned app before finalizing or
starting.

```ts
import { onExpressCreate, onExpressStart } from "katanakit-js/adapters/express";

const app = onExpressCreate();

app.use("/products", productsRouter); // your router

onExpressStart(3000); // finalizes first, then listens
```

Edge cases:

- `CORS_ORIGINS` is split on commas, trimmed and filtered. When the variable is
  unset the fallback is `["http://localhost:3000"]`; when it is set but empty,
  the result is an empty allow-list (no fallback), so cross-origin browser
  requests receive no CORS headers.
- Cross-origin `PATCH` is not advertised by the CORS config; only `GET`,
  `POST`, `PUT` and `DELETE` are listed.
- The demo users router is always mounted at `/` by the factory — if you need
  a clean root, do not use the factory; import the individual pieces instead.

**Real use case** — feature-router architecture: create the app once, mount
`/users`, `/products` and `/webhooks` routers from separate modules, then start.

### onExpressGetApp()

```ts
const onExpressGetApp: () => Application;
```

Returns the app instance, creating it if needed. Behaviorally identical to
`onExpressCreate()` — both delegate to the same `onCreate()` method — but the
name documents intent: "give me the app that may already exist". Prefer it in
middleware-heavy setup code and in tests.

```ts
import { onExpressGetApp } from "katanakit-js/adapters/express";

const app = onExpressGetApp();

app.get("/version", (_request, response) => response.json({ version: "1.0.0" }));
```

**Real use case** — a plugin module receives no arguments and still needs the
app: `onExpressGetApp().use(metricsMiddleware)` registers against the shared
instance without care for who created it.

### onGetApp()

```ts
const onGetApp: typeof onExpressGetApp;
```

The shorter alias, re-exported from `app.ts` (`export const onGetApp =
onExpressGetApp`). Same function reference, same lazy creation, same
singleton. It exists to pair with `onStart` and the `app` proxy in compact
entry modules.

```ts
import { onGetApp, onStart } from "katanakit-js/adapters/express";

onGetApp().get("/ready", (_request, response) => response.json({ ready: true }));
onStart();
```

**Real use case** — smoke-test scripts that need to register a route and boot
the server with the shortest names available.

### app

```ts
const app: Application;
```

A lazy `Proxy` around the real application. Importing
`katanakit-js/adapters/express` has no side effects: the proxy resolves (and
therefore creates) the app on the **first property access**. Property reads are
forwarded to the real instance, and function properties are returned bound, so
`app.get(...)`, `app.use(...)` and destructuring all work as expected.

```ts
import { app } from "katanakit-js/adapters/express";

app.get("/custom", (_request, response) => response.json({ ok: true }));
```

Edge cases:

- The proxy is not strictly equal to the instance returned by `onGetApp()`
  (`app === onGetApp()` is `false`). Prefer `onGetApp()` when you need the
  concrete reference, for example to pass it to another library that inspects
  it.
- Calling `app.listen()` directly bypasses the lifecycle: error handling is
  never finalized and nothing is logged. Use `onStart()` / `onExpressStart()`
  instead.
- Each access to a method returns a freshly bound function, which is harmless
  for calls but makes `app.use === app.use` false.

**Real use case** — a module that registers exactly one route and lets the
entry point decide when to start: importing `app` does not boot anything, so
test setups can import it freely.

## Body handling

The factory installs two parsers:

| Content-Type | Parser | Limit | Raw body |
| --- | --- | --- | --- |
| `application/json` | `express.json({ verify })` | `100kb` | captured on `request.rawBody` |
| `application/x-www-form-urlencoded` | `express.urlencoded({ extended: true })` | `100kb` | not captured |
| anything else (multipart, text, …) | none | — | not captured |

Multipart is not handled by default (there is no `multer` equivalent), and body
parser failures — malformed JSON, payloads over the limit — are forwarded to
the global error handler, which always responds
`500 { "error": "Internal Server Error" }` regardless of the error status. To
return `400`/`413` instead, register your own four-argument error middleware
**before** calling `onExpressFinalize()`.

### onGetRawBody(request)

```ts
function onGetRawBody(request: Request): Buffer | undefined;
```

Returns the raw request body buffer captured by the JSON parser's `verify`
hook — the exact bytes the client sent, before parsing. Returns `undefined`
when the request did not pass through a JSON parser that writes `rawBody`
(URL-encoded and multipart requests, or your own app where you configured the
parser differently).

| Parameter | Type | Description |
| --- | --- | --- |
| `request` | `Request` | The Express request to inspect. |

Raw bytes matter for HMAC verification: re-serializing `request.body` with
`JSON.stringify()` can change key order or whitespace and invalidate the
signature. Capture the buffer and hash it as-is.

```ts
import { createHmac, timingSafeEqual } from "node:crypto";
import { onExpressGetApp, onGetRawBody } from "katanakit-js/adapters/express";

const app = onExpressGetApp();

app.post("/webhooks/github", (request, response) => {
  const raw = onGetRawBody(request);
  const received = request.header("x-hub-signature-256") ?? "";
  const expected = `sha256=${createHmac("sha256", process.env.WEBHOOK_SECRET ?? "")
    .update(raw ?? Buffer.alloc(0))
    .digest("hex")}`;

  const valid =
    received.length === expected.length &&
    timingSafeEqual(Buffer.from(received), Buffer.from(expected));

  if (!valid) {
    response.status(401).json({ error: "Invalid signature" });
    return;
  }

  response.json({ received: true });
});
```

Edge cases:

- The buffer is `undefined` — not an empty `Buffer` — when no JSON body was
  parsed, so always guard before hashing.
- The `verify` hook runs for every JSON request, including malformed payloads,
  but the global error handler still turns parse failures into a 500 response.
- Mounting KatanaKit in an **existing** Express app means implementing the
  `verify` hook yourself if you want `onGetRawBody()` to find anything: the
  accessor only reads `request.rawBody`.

**Real use case** — GitHub, Stripe and Slack webhooks all sign the raw
payload; verify the signature before trusting `request.body`, then dispatch the
parsed object.

## Access guard

`onRequireCapability()` builds a standard `RequestHandler` around the toolkit's
access service. The adapter ships no auth provider on purpose: your callback
resolves the subject from whatever the request carries — JWT, session, API
key — and the guard maps the outcome to an API-shaped response:

| Outcome | Status | Body |
| --- | --- | --- |
| `resolveSubject` returns `null` | `401` | `{ ok: false, data: null, error: { message: "Authentication required", status: 401 } }` |
| `onCan()` returns `false` or throws | `403` | `{ ok: false, data: null, error: { message: "Missing capability: <capability>", status: 403 } }` |
| allowed | — | calls `next()` |

Returning `null` means **anonymous** (401); returning a subject that lacks the
capability means **authenticated but forbidden** (403). The guard never
redirects — it is designed for JSON APIs.

### onRequireCapability(capability, resolveSubject)

```ts
function onRequireCapability(
  capability: AccessCapability,
  resolveSubject: (request: Request) => AccessSubject | null,
): RequestHandler;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `capability` | `AccessCapability` | Capability the route requires. |
| `resolveSubject` | `(request) => AccessSubject \| null` | Resolves the caller per request; `null` for anonymous. |

The subject is structural — any `{ id, roles }` works (a Prisma row, a JWT
payload, a test fixture). `AccessSubject` and its companions come from the main
`katanakit-js` barrel:

```ts
type AccessRole = "owner" | "admin" | "editor" | "author" | "member" | "guest";

type AccessCapability =
  | "content:create" | "content:publish"
  | "content:edit:own" | "content:edit:any"
  | "content:delete:own" | "content:delete:any"
  | "conversations:use" | "conversations:moderate"
  | "members:manage" | "roles:assign"
  | "system:admin";

interface AccessSubject {
  id: string | number;
  roles: AccessRole[];
}
```

`onCan()` grants the capability when **any** of the subject's roles provides
it, directly or by inheritance. A malformed subject or unknown role makes
`onCan()` throw; the guard catches that and fails closed with the 403 body —
an invalid subject never reaches your handler.

```ts
import type { Request } from "express";
import type { AccessSubject } from "katanakit-js";
import { onExpressGetApp, onRequireCapability } from "katanakit-js/adapters/express";

type RequestWithSubject = Request & { subject?: AccessSubject };

const resolveSubject = (request: Request): AccessSubject | null =>
  (request as RequestWithSubject).subject ?? null;

const app = onExpressGetApp();

app.get(
  "/admin/reports",
  onRequireCapability("system:admin", resolveSubject),
  (_request, response) => response.json({ reports: [] }),
);
```

Edge cases:

- `resolveSubject` runs on **every** request. Exceptions it throws are not
  caught by the guard and reach the global error handler as a 500, so keep it
  total.
- Subject resolution is not `async`: the callback must return a subject
  synchronously. Await tokens, sessions or database lookups in an earlier
  middleware and stash the result on `request`.
- Register the guard **before** the route handler (or via `router.use()`) —
  Express only runs middleware registered upstream in the chain.
- A falsy subject covers both `null` and `undefined`, so `?? null` is safe even
  when the property is missing.

**Real use case** — session middleware authenticates and attaches `request.user`,
then every sensitive route composes the guard with its capability:
`router.delete("/posts/:id", onRequireCapability("content:delete:any", resolve), handler)`.

## Demo controllers

`products.controller.ts` is an in-memory CRUD demo. A module-level
`const products: ProductType[] = []` holds the records and a `nextId` counter
starts at `1` and only moves forward, so ids are never reused after deletion.
State lives for the lifetime of the process.

These handlers are **exported but not mounted** by the reference server — it
only mounts the health check and the users `router`. Wire them into your own
router when you want a working CRUD surface:

```ts
import { Router } from "express";
import {
  onExpressCreateProduct,
  onExpressDeleteProduct,
  onExpressGetAllProducts,
  onExpressGetProductById,
  onExpressGetApp,
  onExpressUpdateProduct,
} from "katanakit-js/adapters/express";

const productsRouter = Router();

productsRouter.get("/", onExpressGetAllProducts);
productsRouter.get("/:id", onExpressGetProductById);
productsRouter.post("/", onExpressCreateProduct);
productsRouter.put("/:id", onExpressUpdateProduct);
productsRouter.delete("/:id", onExpressDeleteProduct);

onExpressGetApp().use("/products", productsRouter);
```

### onExpressGetAllProducts(request, response)

```ts
const onExpressGetAllProducts: (request: Request, response: Response) => void;
```

Responds `200` with the whole array, unwrapped:
`[{ "id": 1, "name": "Widget", "price": 9.99 }]`. Returns `[]` when nothing has
been created yet.

```ts
productsRouter.get("/", onExpressGetAllProducts);
// GET /products → [{ "id": 1, "name": "Widget", "price": 9.99 }]
```

**Real use case** — replacing the demo with a real source: keep the handler's
response shape and swap the module-level array for your Prisma query, so
clients do not notice the change.

### onExpressGetProductById(request, response)

```ts
const onExpressGetProductById: (request: Request, response: Response) => void;
```

Reads `request.params.id`, parses it with `Number.parseInt(id, 10)` and finds a
matching product. On success responds `200` with the product **wrapped under a
`productById` key**; when no product matches, responds
`404 { "error": "Product not found" }`.

```ts
productsRouter.get("/:id", onExpressGetProductById);
// GET /products/1 → { "productById": { "id": 1, "name": "Widget", "price": 9.99 } }
// GET /products/999 → 404 { "error": "Product not found" }
```

Edge cases:

- Non-numeric ids (`/products/abc`) parse to `NaN`, never match and return 404
  rather than throwing.
- The wrapper key is `productById`, not `product` — preserve it if you write
  tests against the demo.

**Real use case** — a typed detail endpoint: the `:id` param is the natural
place to authorize row-level access with `onRequireCapability("content:edit:own", …)`
before loading the record.

### onExpressCreateProduct(request, response)

```ts
const onExpressCreateProduct: (request: Request, response: Response) => void;
```

Reads `name` and `price` from `request.body`, defaulting to `""` and `0`
respectively. Assigns `id = nextId++`, coerces `price` with `Number()` and
responds `201` with the created product.

```ts
productsRouter.post("/", onExpressCreateProduct);
// POST /products { "name": "Gadget", "price": 19.99 }
// → 201 { "id": 1, "name": "Gadget", "price": 19.99 }
```

Edge cases:

- `POST /products {}` creates `{ id, name: "", price: 0 }` — the defaults are
  applied, not rejected.
- A missing or non-JSON body is treated as `{}`; there is no schema validation
  in the demo.
- `price: "19.99"` is accepted and stored as a number; `price: "abc"` is
  stored as `NaN` (see the update handler for how that serializes).

**Real use case** — a controller skeleton: replace the array push with your
persistence call, keep the `201` contract, and add validation with a Zod schema
from `katanakit-js` at the boundary.

### onExpressUpdateProduct(request, response)

```ts
const onExpressUpdateProduct: (request: Request, response: Response) => void;
```

Finds the product by parsed `:id` (404 when missing) and applies **partial**
updates: `name ?? product.name` and `Number(price ?? product.price)`. Responds
`200` with the updated product.

```ts
productsRouter.put("/:id", onExpressUpdateProduct);
// PUT /products/1 { "name": "Updated Widget" }
// → { "id": 1, "name": "Updated Widget", "price": 9.99 }
```

Edge cases:

- `null` and `undefined` preserve the current value; an empty string
  (`name: ""`) overwrites because `""` is not nullish.
- `price` is always coerced: `"5"` becomes `5`, while `"abc"` becomes `NaN` —
  and `NaN` serializes to `null` in JSON responses.
- Like the read handler, non-numeric ids fall through to the 404 branch.

**Real use case** — PATCH-like edits with a PUT route: clients send only the
fields they changed, and the demo's nullish coalescing gives you
partial-update semantics without extra code.

### onExpressDeleteProduct(request, response)

```ts
const onExpressDeleteProduct: (request: Request, response: Response) => void;
```

Finds the index by parsed `:id`; responds `404 { "error": "Product not found" }`
when absent, otherwise removes the record from the array with `splice()` and
responds `204` with an empty body.

```ts
productsRouter.delete("/:id", onExpressDeleteProduct);
// DELETE /products/1 → 204 No Content
// DELETE /products/999 → 404 { "error": "Product not found" }
```

Edge cases:

- The `204` response intentionally has no JSON body; clients should not parse
  it.
- Deleting frees the array slot but not the id — `nextId` never decreases, so a
  later create gets a fresh id.

**Real use case** — destructive routes are exactly where to require
`content:delete:any` or `content:delete:own`, so anonymous and under-privileged
callers are stopped before the handler runs.

### router (default export)

```ts
const router: Router; // default export
```

A minimal users router mounted at `/` by the reference server. It is a
placeholder for replacing with your own domain routes:

| Method | Path | Response |
| --- | --- | --- |
| `GET` | `/` | `{ "message": "Get all users" }` |
| `GET` | `/:id` | `{ "message": "Get user by <id>" }` |
| `POST` | `/` | `{ "message": "Create a new user" }` |

```ts
import { router } from "katanakit-js/adapters/express";
```

Edge cases:

- `GET /health` is registered before the router, so Express matches it first
  and it never reaches `GET /:id`.
- Any other single-segment `GET` (for example `/favicon.ico`) falls into the
  `/:id` demo branch and returns a message; replace the router for real
  services.
- Using `onExpressCreate()` always mounts it; if that conflicts with your
  routes, build a plain Express app and import only the pieces you need.

**Real use case** — scaffolding: keep the router shape as a template
(`GET` list, `GET` detail, `POST` create) while you grow a real API around it.

## Putting it together

A reference server with guarded product writes, a raw-body webhook and a
subject stub:

```ts
import type { Request } from "express";
import { Router } from "express";
import type { AccessSubject } from "katanakit-js";
import {
  onExpressCreateProduct,
  onExpressDeleteProduct,
  onExpressGetAllProducts,
  onExpressGetProductById,
  onExpressGetApp,
  onExpressStart,
  onExpressUpdateProduct,
  onGetRawBody,
  onRequireCapability,
} from "katanakit-js/adapters/express";

type RequestWithSubject = Request & { subject?: AccessSubject };

const resolveSubject = (request: Request): AccessSubject | null =>
  (request as RequestWithSubject).subject ?? null;

const app = onExpressGetApp();

// Demo identity — replace with JWT/session verification in production.
app.use((request, _response, next) => {
  (request as RequestWithSubject).subject = { id: "demo", roles: ["admin"] };
  next();
});

const products = Router();
products.get("/", onExpressGetAllProducts);
products.get("/:id", onExpressGetProductById);
products.post("/", onRequireCapability("content:create", resolveSubject), onExpressCreateProduct);
products.put("/:id", onRequireCapability("content:edit:any", resolveSubject), onExpressUpdateProduct);
products.delete("/:id", onRequireCapability("content:delete:any", resolveSubject), onExpressDeleteProduct);

app.use("/products", products);

app.post("/webhooks/github", (request, response) => {
  const raw = onGetRawBody(request);
  response.json({ bytes: raw?.length ?? 0 });
});

onExpressStart(3000); // finalizes error/404 handling, then listens
```

Register routes before `onExpressStart()` so the 404 catch-all stays last, and
keep granular data validation inside handlers while the guard owns coarse
capability checks.

## Related

- [NestJS](/guides/nestjs) — the same `onRequireCapability` pattern expressed
  as a Nest `CanActivate` guard.
- [HTTP Client](/guides/services/http-client) — call outbound APIs from your
  route handlers with Safe Results.
- [Errors](/start/errors) — the `{ ok, data, error }` shape reused by the
  guard's 401/403 bodies.
- [Framework Adapters](/guides/framework-adapters) — the client-side adapters
  that consume the API this server exposes.
- [API Reference](/api/) — every export on this page, generated from source.
