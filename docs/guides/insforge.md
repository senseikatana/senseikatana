---
title: InsForge
description: Use InsForge as the database fallback — typed queries, storage buckets and edge functions behind Safe Results.
---

# InsForge

The InsForge adapter wraps the official `@insforge/sdk` in the same Safe Result
contract as the rest of the toolkit: every input is validated, every call
returns `FetchResult<T>`, and **mass writes are refused** — update and delete
require a non-empty filter, so a forgotten `where` cannot wipe a table. It is
published only as `katanakit-js/adapters/insforge`.

InsForge covers database, object storage and edge functions. In this project it
is the database fallback (the primary data layer is Cloudflare) and an optional
peer: install it only when you use the adapter.

## 1. Install and connect

```bash
bun add @insforge/sdk
```

```ts
import { defineInsforgeConfig } from "katanakit-js/adapters/insforge";

// Server-only admin client (apiKey), or the browser-safe client (anonKey)
defineInsforgeConfig({ baseUrl: process.env.INSFORGE_URL!, apiKey: process.env.INSFORGE_API_KEY! });
```

## 2. Query and write rows

```ts
import {
	onIfSelect,
	onIfInsert,
	onIfUpdate,
	onIfDelete,
	onIfRpc,
} from "katanakit-js/adapters/insforge";

// SELECT — filters, order and limit are typed
const posts = await onIfSelect<{ id: number; title: string }>({
	table: "posts",
	filters: { author_id: 7 },
	order: { column: "created_at", ascending: false },
	limit: 10,
});
if (posts.ok) console.log(posts.data);

// INSERT — one or many rows
const created = await onIfInsert("posts", [{ title: "Hello" }]);

// UPDATE / DELETE — filters are required; a missing filter is a validation error
await onIfUpdate({ table: "posts", filters: { id: 7 } }, { title: "Updated" });
const deleted = await onIfDelete({ table: "posts", filters: { id: 7 } });

// RPC — call a Postgres function
const total = await onIfRpc<number>({ name: "count_posts", params: { author_id: 7 } });
```

## 3. Storage buckets

```ts
import {
	onIfUpload,
	onIfDownload,
	onIfRemove,
	onIfListObjects,
	onIfGetPublicUrl,
} from "katanakit-js/adapters/insforge";

const ref = { bucket: "covers", path: "post-7.webp" };

const uploaded = await onIfUpload(ref, file); // File / Blob; same path replaces
const blob = await onIfDownload(ref);
const objects = await onIfListObjects("covers", { prefix: "post-", limit: 50 });
const publicUrl = onIfGetPublicUrl(ref); // synchronous, returns FetchResult
if (publicUrl.ok) console.log(publicUrl.data.publicUrl);
await onIfRemove(ref);
```

## 4. Edge functions

```ts
import { onIfInvokeFunction } from "katanakit-js/adapters/insforge";

const result = await onIfInvokeFunction<{ processed: number }>({
	name: "resize-images",
	body: { postId: 7 },
});
if (result.ok) console.log(result.data.processed);
```

## Related

- [HTTP Client](/guides/services/http-client) — the shared Safe Result shape.
- [Error Handling](/start/errors) — normalizing edge-function failures.
- [Assistant](/guides/assistant) — the Prisma persistence path when you own the database.
