---
title: Drizzle ORM
description: Lazy Postgres client, the conversation tables and a Drizzle-backed assistant store.
---

# Drizzle ORM

[Drizzle ORM](https://orm.drizzle.team) is a TypeScript-first SQL toolkit — a
thin, fully typed layer over Postgres with no code-generation step. The adapter
ships three pieces on `katanakit-js/adapters/drizzle`:

1. **`useDrizzleClient()`** — a lazy singleton client over the node-postgres
   driver (`pg`); `DATABASE_URL` is read on first call, never at import.
2. **`conversations` / `messages`** — `pgTable` definitions shaped after the
   Prisma contract, so both integrations describe the same database and you
   can switch without a migration.
3. **`useCreateDrizzleStore()` / `DrizzleConversationStore`** — a
   `ConversationStore` for the assistant, so history survives restarts.

## Install

```bash
bun add drizzle-orm pg
bun add -D drizzle-kit   # migrations and studio
```

`drizzle-orm` and `pg` are **optional peer dependencies** — only imported when
you use the subpath.

## Client

```ts
import { conversations, useDrizzleClient } from "katanakit-js/adapters/drizzle";

const db = useDrizzleClient(); // DATABASE_URL from the environment
const rows = await db.select().from(conversations).limit(5);
```

`DATABASE_URL` must be in the process environment — the package never loads
`.env` itself (Bun reads it automatically; on Node use `node --env-file=.env`).
Pass a URL explicitly for tests: `useDrizzleClient("postgresql://…")`.

## Tables and migrations

The `conversations` and `messages` tables (Prisma-shaped: camelCase columns,
uuid/serial primary keys, cascade deletes) are exported from the same subpath,
so your own queries are fully typed. Push them with `drizzle-kit push`, or
generate SQL migrations with `drizzle-kit generate` from a `drizzle.config.ts`
that points at your schema re-exports.

## Assistant persistence

```ts
import { useInitAssistant } from "katanakit-js";
import { DrizzleConversationStore, useCreateDrizzleStore } from "katanakit-js/adapters/drizzle";

useInitAssistant({ store: useCreateDrizzleStore() });
// or: { store: DrizzleConversationStore }
```

The store implements the same [`ConversationStore`](/guides/assistant) contract
as the in-memory and Prisma stores: the client stays lazy and `DATABASE_URL`
errors surface on first use, not at import.

## Example

[`examples/drizzle/`](https://github.com/senseikatana/katanakit-js/tree/main/examples/drizzle)
shows the lazy query helper and the assistant wiring.
