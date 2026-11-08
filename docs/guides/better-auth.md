---
title: Better Auth
description: Auth client for five frameworks, Safe Result session helpers and validated social provider configuration.
---

# Better Auth

> **Authentication, not authorization.** This page answers *who the user is*.
> Whether they may perform a given action is a separate question, answered by
> [`AccessService`](/guides/access-control). The two are independent: a user can
> be fully authenticated and still be refused a capability, and that refusal is
> a `403`, not a `401`.

[`Better Auth`](https://better-auth.com) is a framework-agnostic auth server for
TypeScript. This adapter adds three things on top of the official integrations:

1. **One client factory for five frameworks** — only the entry you ask for is imported.
2. **Safe Result wrappers** for the server calls, so a failed session lookup never
   throws inside middleware or a route handler.
3. **Social provider validation** — every vendor in one checked call, so a missing
   environment variable fails at startup instead of at sign-in.

The server itself is still Better Auth's: mount `auth.handler`, keep `betterAuth()`
exactly as the [official docs](https://better-auth.com/docs/integrations/astro) describe.

## Install

```bash
bun add better-auth
```

`better-auth` is an **optional peer dependency** — only imported when you call the adapter.

## Server — handler, session, locals

```ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({ /* storage, socialProviders, plugins… */ });
```

### Mount the handler (Astro)

```ts
// src/pages/api/auth/[...all].ts
import type { APIRoute } from "astro";
import { auth } from "~/auth";
import { useAuthHandler } from "katanakit-js/adapters/better-auth";

export const ALL: APIRoute = async ({ request }) => {
	const result = await useAuthHandler(auth, request);
	return result.ok ? result.data : new Response("Auth unavailable", { status: 500 });
};
```

### Middleware → `Astro.locals`

```ts
// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { auth } from "~/auth";
import { useAstroAuthLocals } from "katanakit-js/adapters/better-auth";

export const onRequest = defineMiddleware(async (context, next) => {
	const locals = await useAstroAuthLocals(auth, context.request);
	if (locals.ok) {
		context.locals.user = locals.data.user;
		context.locals.session = locals.data.session;
	}
	return next();
});
```

Anonymous visitors resolve to `{ user: null, session: null }` with `ok: true` —
only a real failure returns `ok: false`.

### Read the session anywhere server-side

```ts
import { useAuthSession } from "katanakit-js/adapters/better-auth";

const session = await useAuthSession(auth, request); // Request | Headers | { headers }
if (session.ok && session.data) {
	console.log(session.data.user.email);
}
```

## Social providers — one call, every vendor

Better Auth ships **36 social providers** (Google, GitHub, Discord, Microsoft,
LinkedIn, Apple, TikTok, Notion, Spotify…). `useSocialProviders` validates your
`socialProviders` before `betterAuth()` ever sees it, so a missing environment
variable fails at **startup** instead of when a visitor clicks *Sign in with
Google*.

```ts
// auth.ts — top-level await is fine in ESM
import { betterAuth } from "better-auth";
import { useSocialProviders } from "katanakit-js/adapters/better-auth";

const social = await useSocialProviders({
	google: {
		clientId: process.env.GOOGLE_CLIENT_ID ?? "",
		clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
	},
	github: {
		clientId: process.env.GITHUB_CLIENT_ID ?? "",
		clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
	},
	discord: {
		clientId: process.env.DISCORD_CLIENT_ID ?? "",
		clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
	},
});

if (!social.ok) throw new Error(social.error.message);

export const auth = betterAuth({ socialProviders: social.data /* storage, plugins… */ });
```

The result carries the same object you passed in — spread it straight into
`socialProviders`. Every problem in the configuration is reported at once:

| Message | Meaning |
| ------- | ------- |
| `unknown provider` | The id is not in the installed Better Auth catalog (a typo, or a vendor your peer version dropped). The message lists the ids that do exist. |
| `missing a client identifier` | Neither `clientId` nor `clientKey` was configured. |
| `clientId is empty` | An unset environment variable — `?? ""` makes it typecheck, not work. |
| `clientSecret is empty` / `clientId is an empty array` | Same class of mistake. |

Two configurations are passed through untouched, because their credentials only
exist inside Better Auth:

```ts
await useSocialProviders({
	google: () => ({ clientId: load("GOOGLE_ID"), clientSecret: load("GOOGLE_SECRET") }), // thunk
	tiktok: { enabled: false }, // switched off — nothing to configure
});
```

::: warning `clientSecret` is validated but never required
TikTok identifies itself with `clientKey` (no `clientId`), and public PKCE
clients carry no secret — so demanding both would reject valid setups. Type
checking still enforces each vendor's own required fields; the helper only
catches what TypeScript cannot see: empty values and unknown ids.
:::

## Client — five frameworks, one factory

```ts
import { useAuthClient } from "katanakit-js/adapters/better-auth";

// vanilla (no framework, plain <script>)
const authClient = await useAuthClient();

// the four framework entries — only the one you pick is bundled
const vue = await useAuthClient({ framework: "vue" });
const react = await useAuthClient({ framework: "react" });
const svelte = await useAuthClient({ framework: "svelte" });
const solid = await useAuthClient({ framework: "solid" });
```

The return type follows the framework, so destructuring keeps Better Auth's own types:

```ts
// lib/auth-client.ts (Vue)
import { useAuthClient } from "katanakit-js/adapters/better-auth";

export const authClient = await useAuthClient({ framework: "vue" });
export const { signIn, signUp, signOut, useSession } = authClient;
```

Options are Better Auth's `BetterAuthClientOptions`:

```ts
const authClient = await useAuthClient({
	framework: "react",
	baseURL: "https://auth.example.com",
	plugins: [/* organization(), twoFactor() … */],
});
```

## API

| Function                          | Returns                          | Fails when                         |
| --------------------------------- | -------------------------------- | ---------------------------------- |
| `useAuthClient(options?)`         | Framework-typed auth client      | the entry cannot be imported       |
| `useAuthSession(auth, request)`   | Session \| `null`                | the API call throws                |
| `useAuthHandler(auth, request)`   | `Response`                       | the handler throws                 |
| `useAstroAuthLocals(auth, request)` | `{ user, session }`            | the session lookup fails           |
| `useSocialProviders(providers)`   | The validated `socialProviders`  | a credential is empty, missing or unknown |

Everything returns `{ data, error, ok }` — no `try/catch` at the call site.

## Other frameworks

Better Auth ships its own integrations for Next.js (`better-auth/next-js`),
SvelteKit (`better-auth/svelte-kit`), SolidStart, TanStack Start and Node
(`better-auth/node`). Use those directly; this adapter covers the client factory
and the Safe Result server helpers.
