---
title: Notion
description: Connect a Notion workspace and drive pages, databases, blocks and search from code.
---

# Notion

The Notion adapter wraps the official [Notion API](https://developers.notion.com/reference)
with full TypeScript types, cursor-based auto-pagination helpers, and the
toolkit's Safe Result contract — every function returns `FetchResult<T>` and
never throws. It is published only as `katanakit-js/adapters/notion`
([ADR-0003](/explanation/decisions/adr-0003-adapter-subpath-exports)).

## 1. Create an integration and connect

1. Open [My integrations](https://www.notion.so/my-integrations) and create an
   internal integration.
2. Copy the token — it starts with `ntn_` or `secret_`.
3. In Notion, share the pages and databases with the integration
   (⚙ → Connections). Without this step the API sees nothing.

```ts
import { defineNotionConfig } from "katanakit-js/adapters/notion";

defineNotionConfig({ token: process.env.NOTION_TOKEN });
```

## 2. Read and write pages

```ts
import {
	useNotionGetPage,
	useNotionCreatePage,
	useNotionUpdatePage,
	useNotionArchivePage,
} from "katanakit-js/adapters/notion";

// Get a single page with all its properties
const page = await useNotionGetPage("page-id");
if (page.ok) console.log(page.data.properties);

// Create a page inside a database
const created = await useNotionCreatePage(
	{ type: "database_id", database_id: "db-id" },
	{
		Name: { title: [{ type: "text", text: { content: "My Task" } }] },
		Status: { select: { name: "To Do" } },
	},
);

// Create a child page with content blocks
const child = await useNotionCreatePage(
	{ type: "page_id", page_id: "parent-id" },
	{ title: { title: [{ type: "text", text: { content: "Child Page" } }] } },
	[{ type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Hello!" } }] } }],
);

// Update only the changed properties
await useNotionUpdatePage("page-id", {
	Status: { select: { name: "Done" } },
	DueDate: { date: { start: "2025-12-31" } },
});

// Archive (soft-delete) a page
await useNotionArchivePage("page-id");
```

## 3. Query databases

```ts
import {
	useNotionGetDatabase,
	useNotionQueryDatabase,
	useNotionCreateDatabase,
	useNotionUpdateDatabase,
	useNotionListAllDatabasePages,
} from "katanakit-js/adapters/notion";

// Inspect the schema (property names, types, options)
const schema = await useNotionGetDatabase("db-id");
if (schema.ok) {
	Object.entries(schema.data.properties).forEach(([name, prop]) => {
		console.log(`${name}: ${prop.type}`);
	});
}

// One page of results, with filter + sort
const page1 = await useNotionQueryDatabase("db-id", {
	filter: { property: "Status", select: { equals: "Published" } },
	sorts: [{ property: "Date", direction: "descending" }],
	page_size: 10,
});

// ALL results — cursor pagination handled internally
const all = await useNotionListAllDatabasePages("db-id");

const published = await useNotionListAllDatabasePages(
	"db-id",
	{ property: "Status", select: { equals: "Published" } },
	[{ property: "Date", direction: "descending" }],
);

// Create and rename databases
await useNotionCreateDatabase(
	{ type: "page_id", page_id: "parent-id" },
	[{ type: "text", text: { content: "My Tasks" } }],
	{
		Name: { title: {} },
		Status: { select: { options: [{ name: "To Do" }, { name: "Done" }] } },
		Priority: { select: { options: [{ name: "Low" }, { name: "High" }] } },
	},
);

await useNotionUpdateDatabase("db-id", [{ type: "text", text: { content: "Renamed Database" } }]);
```

## 4. Work with blocks

```ts
import {
	useNotionGetBlock,
	useNotionGetBlockChildren,
	useNotionListAllBlockChildren,
	useNotionAppendBlocks,
	useNotionUpdateBlock,
	useNotionDeleteBlock,
} from "katanakit-js/adapters/notion";

// ALL blocks of a page (auto-pagination)
const blocks = await useNotionListAllBlockChildren("page-id");
if (blocks.ok) {
	blocks.data.forEach((b) => console.log(b.type)); // "paragraph", "heading_1", …
}

// Manual pagination when you need the raw cursor
const page = await useNotionGetBlockChildren("page-id", { page_size: 50 });
if (page.ok) {
	console.log(page.data.results); // blocks
	console.log(page.data.has_more); // true if more pages exist
	console.log(page.data.next_cursor); // pass as start_cursor for the next page
}

// Append content to a page
await useNotionAppendBlocks("page-id", [
	{
		type: "heading_2",
		heading_2: { rich_text: [{ type: "text", text: { content: "New Section" } }] },
	},
	{
		type: "paragraph",
		paragraph: { rich_text: [{ type: "text", text: { content: "Body text here." } }] },
	},
	{
		type: "to_do",
		to_do: {
			rich_text: [{ type: "text", text: { content: "Checklist item" } }],
			checked: false,
		},
	},
]);

// Update and delete blocks
await useNotionUpdateBlock("block-id", {
	paragraph: { rich_text: [{ type: "text", text: { content: "Updated text" } }] },
});
await useNotionDeleteBlock("block-id");
```

## 5. Search and users

```ts
import { useNotionSearchContent, useNotionGetUser, useNotionListUsers } from "katanakit-js/adapters/notion";

// Search everything
const found = await useNotionSearchContent({ query: "meeting notes" });

// Search only databases
const dbs = await useNotionSearchContent({
	query: "tasks",
	filter: { value: "database", property: "object" },
});

// Search only pages, most recently edited first
const pages = await useNotionSearchContent({
	filter: { value: "page", property: "object" },
	sort: { direction: "descending", timestamp: "last_edited_time" },
});

// Workspace members (page.created_by.id / page.last_edited_by.id)
const user = await useNotionGetUser("user-id");
if (user.ok) console.log(user.data.name);

const users = await useNotionListUsers();
if (users.ok) users.data.results.forEach((u) => console.log(u.name));
```

## 6. Framework examples

| Framework | Example | Description |
| --- | --- | --- |
| **Vue 3** | [`examples/notion/vue-blog.vue`](https://github.com/senseikatana/katanakit-js/tree/main/examples/notion/vue-blog.vue) | Blog listing with the `useQuery` composable |
| **Nuxt 3** | [`examples/notion/nuxt-blog.vue`](https://github.com/senseikatana/katanakit-js/tree/main/examples/notion/nuxt-blog.vue) | SSR blog listing with `useAsyncData` |
| **Astro** | [`examples/notion/astro-blog.astro`](https://github.com/senseikatana/katanakit-js/tree/main/examples/notion/astro-blog.astro) | Static blog listing |
| **Next.js** | [`examples/notion/next-blog.tsx`](https://github.com/senseikatana/katanakit-js/tree/main/examples/notion/next-blog.tsx) | Server component listing |
| **Node.js** | [`examples/notion/demo.ts`](https://github.com/senseikatana/katanakit-js/tree/main/examples/notion/demo.ts) | Runnable demo covering every operation |

A content-site pattern end to end lives in the
[Astro Adapter](/guides/services/astro-adapter) guide; request-level options
(headers, `signal`, caching) are covered in the
[HTTP Client](/guides/services/http-client).
