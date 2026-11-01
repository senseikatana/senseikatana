---
title: WordPress
description: Drive a WordPress site's REST API — posts, pages, media, taxonomies, comments, users and custom post types.
---

# WordPress

The WordPress adapter wraps the [WordPress REST API](https://developer.wordpress.org/rest-api/)
with full CRUD for posts, pages, media, categories, tags, comments, users,
custom post types, and batch operations. Every function returns
`FetchResult<T>` — the same Safe Result contract as the rest of the toolkit —
and responses are validated with Zod at the boundary.

## 1. Pick an auth method and connect

Application Passwords is the recommended method for servers and scripts
(WP Admin → Users → Your Profile → Application Passwords):

```ts
import { defineWordPressConfig } from "katanakit-js/adapters/wordpress";

defineWordPressConfig({
	baseUrl: "https://mysite.com",
	auth: { type: "application-passwords", username: "admin", password: "xxxx xxxx xxxx" },
});
```

JWT tokens and theme-side nonces are also supported:

```ts
// JWT
defineWordPressConfig({
	baseUrl: "https://mysite.com",
	auth: { type: "jwt", token: "eyJhbGci..." },
});

// Nonce-based (inside a WP theme, for logged-in users)
defineWordPressConfig({
	baseUrl: "https://mysite.com",
	auth: { type: "nonce", nonce: "abc123" },
});
```

## 2. Posts

```ts
import {
	useWpGetPosts,
	useWpGetPost,
	useWpCreatePost,
	useWpUpdatePost,
	useWpDeletePost,
	useWpListAllPosts,
	useWpSearchAllPosts,
	useWpFindPostBySlug,
} from "katanakit-js/adapters/wordpress";

// Paginated list
const posts = await useWpGetPosts({ per_page: 5, status: "publish", orderby: "date", order: "desc" });

// Single post with embedded resources
const post = await useWpGetPost(42, { _embed: true });
if (post.ok) console.log(post.data.title.rendered);

// Create
await useWpCreatePost({
	title: "My New Post",
	content: "<p>Hello World!</p>",
	status: "publish", // "draft" | "pending" | "publish"
	categories: [1, 3],
	tags: [5, 8],
});

// Update and delete (trash by default, permanent with `true`)
await useWpUpdatePost(42, { title: "Updated Title", status: "publish" });
await useWpDeletePost(42);
await useWpDeletePost(42, true);

// ALL posts — the helper loops through pagination for you
const all = await useWpListAllPosts({ status: "publish" });
if (all.ok) console.log(`Total: ${all.data.length}`);

// Keyword search across all pages of results
const found = await useWpSearchAllPosts("tutorial");
if (found.ok) found.data.forEach((p) => console.log(p.title.rendered));

// Dynamic routes like /blog/:slug
const bySlug = await useWpFindPostBySlug("hello-world");
if (bySlug.ok && bySlug.data) console.log(bySlug.data.title.rendered);
```

## 3. Pages

```ts
import {
	useWpGetPages,
	useWpGetPage,
	useWpCreatePage,
	useWpUpdatePage,
	useWpDeletePage,
} from "katanakit-js/adapters/wordpress";

const pages = await useWpGetPages({ per_page: 20 });

const page = await useWpGetPage(10);
if (page.ok) console.log(page.data.title.rendered);

await useWpCreatePage({
	title: "About Us",
	content: "<p>Welcome to our site!</p>",
	status: "publish",
	parent: 0, // top-level page; set a page ID for child pages
});

await useWpUpdatePage(10, { title: "Updated About" });
await useWpDeletePage(10); // trash
```

## 4. Media

```ts
import {
	useWpGetMedia,
	useWpGetMediaItem,
	useWpUploadMedia,
	useWpUpdateMedia,
	useWpDeleteMedia,
} from "katanakit-js/adapters/wordpress";

const media = await useWpGetMedia({ per_page: 20, media_type: "image" });

const item = await useWpGetMediaItem(42);
if (item.ok) console.log(item.data.source_url);

// Upload from the browser (File from <input type="file">)
const file = document.querySelector("input[type=file]").files[0];
const uploaded = await useWpUploadMedia(file, {
	title: "My Image",
	alt_text: "Description for accessibility",
	caption: "Image caption",
});
if (uploaded.ok) console.log(uploaded.data.source_url); // use in content

// Upload from Node.js (Buffer)
import fs from "node:fs";
const buffer = fs.readFileSync("photo.jpg");
await useWpUploadMedia(buffer, { title: "Photo" });

await useWpUpdateMedia(42, { alt_text: "New alt text", caption: "Updated caption" });
await useWpDeleteMedia(42, true); // permanent
```

## 5. Categories, tags, comments and users

```ts
import {
	useWpGetCategories,
	useWpCreateCategory,
	useWpUpdateCategory,
	useWpDeleteCategory,
	useWpGetTags,
	useWpCreateTag,
	useWpDeleteTag,
	useWpGetComments,
	useWpCreateComment,
	useWpUpdateComment,
	useWpDeleteComment,
	useWpGetUsers,
	useWpGetCurrentUser,
	useWpCreateUser,
	useWpUpdateUser,
	useWpDeleteUser,
} from "katanakit-js/adapters/wordpress";

// Categories and tags
const cats = await useWpGetCategories({ per_page: 50 });
await useWpCreateCategory({ name: "Technology", slug: "tech", description: "Tech posts" });
await useWpUpdateCategory(5, { name: "Tech News" });
await useWpDeleteCategory(5);

const tags = await useWpGetTags({ search: "javascript" });
await useWpCreateTag({ name: "TypeScript", slug: "typescript" });
await useWpDeleteTag(12);

// Comments (creation works for authenticated and public flows)
const comments = await useWpGetComments({ post: 42, per_page: 10 });
await useWpCreateComment({
	post: 42,
	content: "Great article!",
	author_name: "John",
	author_email: "john@example.com",
});
await useWpUpdateComment(7, { content: "Updated comment" });
await useWpDeleteComment(7);

// Users
const users = await useWpGetUsers({ roles: "editor" });
const me = await useWpGetCurrentUser();
await useWpCreateUser({
	username: "johndoe",
	email: "john@example.com",
	password: "secure-password",
	roles: ["editor"],
});
await useWpUpdateUser(2, { name: "John Smith" });
await useWpDeleteUser(2, 1); // reassign content to user 1
```

## 6. Custom post types

Any registered CPT works — `product`, `portfolio`, `event`, …:

```ts
import {
	useWpGetCustomPosts,
	useWpGetCustomPost,
	useWpCreateCustomPost,
	useWpUpdateCustomPost,
	useWpDeleteCustomPost,
} from "katanakit-js/adapters/wordpress";

const products = await useWpGetCustomPosts("product", { per_page: 10 });
const product = await useWpGetCustomPost("product", 15);

await useWpCreateCustomPost("product", {
	title: "Widget",
	content: "<p>A great widget</p>",
	status: "publish",
});

await useWpUpdateCustomPost("product", 15, { title: "Updated Widget" });
await useWpDeleteCustomPost("product", 15, true);
```

## 7. Batch requests

```ts
import { useWpBatch } from "katanakit-js/adapters/wordpress";

const result = await useWpBatch([
	{ method: "GET", path: "/wp/v2/posts?per_page=2" },
	{ method: "GET", path: "/wp/v2/pages?per_page=2" },
	{ method: "GET", path: "/wp/v2/categories?per_page=5" },
]);

if (result.ok) {
	result.data.responses.forEach((resp) => console.log(resp.status));
}
```

## 8. Trim payloads: `_fields`, `_embed` and ACF

`_fields` requests only what a list view needs — a large payload reduction:

```ts
const posts = await useWpGetPosts({ per_page: 20, _fields: "id,title,link,slug,date" });
```

`_embed` inlines related resources (author, featured media, terms) instead of
extra round trips:

```ts
const posts = await useWpGetPosts({ _embed: "author,wp:featuredmedia" });

if (posts.ok) {
	for (const post of posts.data) {
		const author = post._embedded?.author?.[0]?.name;
		const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
		const thumbnail =
			post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail?.source_url;
	}
}
```

[ACF](https://www.advancedcustomfields.com/) fields come through transparently
on the `acf` property of posts, pages, media and CPT entries:

```ts
const posts = await useWpGetPosts({ per_page: 5, _fields: "id,title,acf" });

if (posts.ok) {
	for (const post of posts.data) {
		if (post.acf) console.log(post.acf.my_field_name); // dynamic field names
	}
}

// Everything at once for a full-featured list view
const full = await useWpGetPosts({
	per_page: 5,
	_fields: "id,title,link,slug,date,acf",
	_embed: "author,wp:featuredmedia",
});
```

## 9. Roles and capabilities without PHP

A dashboard usually ships no PHP: no plugin, no theme, no `wp-cli`. It talks to
the site over REST and that changes what it can do about roles.

**WordPress has no roles or capabilities REST endpoint.** `add_role()` and
`add_cap()` are PHP-only, and there is nothing to POST them to. What the REST
API *does* expose is `roles`, `capabilities` and `extra_capabilities` on a user,
but only with `context=edit` and an authenticated caller holding `list_users`.

::: tip The role still has to exist in WordPress
Declaring it here does not create it. For the wp-cli command, the mu-plugin
that does, and the capability rules that keep it from becoming a hole, see
[WordPress Roles](/guides/wordpress-roles).
:::

So the adapter splits the job in two:

| Task | Reachable over REST? | Adapter method |
| --- | --- | --- |
| Declare the site's roles | No — PHP only | `useWpDefineRoles()` |
| Make them usable by guards | Local | `useWpSyncRoles()` |
| Assign a role to a user | Yes | `useWpAssignRole()` |
| Read who holds a role | Yes | `useWpGetUsersByRole()` |
| Check the site grants what you declared | Yes (read-only) | `useWpAuditRole()` |

### Declare

A role carries **two** capability vocabularies, and they are not the same thing:

- `capabilities` — the toolkit's namespaced capabilities (`orders:read:own`).
  These drive `useCan()` and the framework guards, so dashboard routes and the
  rest of the app speak one language.
- `wpCapabilities` — WordPress' own snake_case names (`read_private_orders`).
  These are the declaration the site must actually hold, and the baseline
  `useWpAuditRole()` compares against.

Never derive one from the other. `orders:read:own` is a policy decision;
`read_private_orders` is a WordPress permission. Collapsing them hides who is
allowed to touch somebody else's record.

```ts
import {
	defineWordPressConfig,
	useWpDefineRoles,
	useWpSyncRoles,
} from "katanakit-js/adapters/wordpress";

defineWordPressConfig({
	baseUrl: "https://mysite.com",
	auth: { type: "application-passwords", username: "admin", password: "xxxx xxxx xxxx" },
});

useWpDefineRoles([
	{
		slug: "store_customer",
		label: "Store Customer",
		rank: 5,
		capabilities: ["orders:read:own", "orders:update:own", "orders:cancel:own"],
		wpCapabilities: ["read", "read_order", "edit_order", "edit_orders"],
	},
	{
		slug: "store_manager",
		label: "Store Manager",
		rank: 1,
		capabilities: ["orders:read:any", "orders:update:any", "orders:cancel:any"],
		wpCapabilities: [
			"read",
			"read_order",
			"edit_order",
			"edit_orders",
			"edit_others_orders",
			"read_private_orders",
		],
	},
]);

// Publish the declarations to the access service — without this, `useCan()`
// throws on the unknown slug.
useWpSyncRoles();
```

`rank` places the role on the toolkit ladder (lower is more privileged,
`owner` is `0`). It is an integer, so a custom role **shares** a rung with a
built-in instead of sitting between two: `store_customer` at `5` inherits from
`guest` and adds its own capabilities. A shared rank means equal privilege,
not a conflict.

### Use them as a subject

`useWpAsSubject()` mirrors a user's roles verbatim into an
[`AccessSubject`](/guides/access-control), so the guards accept it directly:

```ts
import { useCan } from "katanakit-js";
import { useWpAsSubject, useWpGetCurrentUser } from "katanakit-js/adapters/wordpress";

const me = await useWpGetCurrentUser();
if (me.ok) {
	const subject = useWpAsSubject(me.data);
	useCan(subject, "orders:read:own"); // true for a store_customer
}
```

It mirrors instead of filtering unknown slugs on purpose: a subject quietly
stripped of its roles fails closed and looks like a missing grant. Unknown roles
throw instead — which is exactly why `useWpSyncRoles()` belongs right after the
declarations.

The subject plugs straight into `useRequireCapability()` — one guard per
framework, same `401`/`403` semantics everywhere. See
[Capability guards](/guides/framework-adapters#capability-guards) for the Astro,
Next, Nuxt, Hono and Express wiring.

The subject composes with the rest of the access kit. A dashboard that shares
one order with one person reaches for `useGrantAwareCan()` — the subject's
global roles answer *"what class of thing may they ever do"*, a grant answers
*"may they do it to this one"*:

```ts
import { useGrantAwareCan } from "katanakit-js";

const decision = useGrantAwareCan({
	subject,
	resource: { type: "order", id: orderId },
	capability: "orders:read:any",
	useGrants: ({ subject, resource }) => listSharedOrders(subject.id, resource),
});
```

### Assign

```ts
import { useWpAssignRole, useWpUnassignRole, useWpGetUsersByRole } from "katanakit-js/adapters/wordpress";

const assigned = await useWpAssignRole(42, "store_customer");

if (!assigned.ok && assigned.status === 422) {
	// WordPress accepted the request but dropped the slug: the site has no such
	// role. Create it in WordPress — a plugin, an mu-plugin, or wp-cli.
	console.error(assigned.error.message);
}

await useWpUnassignRole(42, "store_customer");
const customers = await useWpGetUsersByRole("store_customer", { per_page: 50 });
```

That `422` is the whole reason `useWpAssignRole()` exists instead of a plain
`useWpUpdateUser()`. **WordPress silently discards a role slug it does not
know** and still answers `200` with the user unchanged, so a naive assignment
reports success for a grant that never happened. The adapter re-reads the roles
on the response and fails loudly instead.

Unassignment is idempotent: removing a role the user does not hold already
satisfies the request, and nothing there can be silently ignored.

### Audit

The declaration is only worth something if the site agrees with it:

```ts
import { useWpAuditRole } from "katanakit-js/adapters/wordpress";

const audit = await useWpAuditRole("store_customer");

if (audit.ok) {
	console.log(audit.data.status); // "verified" | "partial" | "unverifiable"
	console.log(audit.data.holders);
	console.log(audit.data.missing);   // declared, absent from a holder
	console.log(audit.data.undeclared); // granted by the site, not declared
}
```

- `verified` — every holder reports every declared `wpCapability`.
- `partial` — at least one declared capability is absent from some holder.
- `unverifiable` — nobody holds the role, so there is nothing to compare
  against. Never reported as `verified`: an empty holder list is not proof.

`granted` is the **intersection** across holders, not the union. A capability
only one holder has is not a capability the role grants, and treating it as one
is how a green badge ends up hiding a hole.

### Pitfalls

- **A role is not a capability grant.** Declaring `wpCapabilities` changes
  nothing on the site. The role itself must already exist in WordPress; the
  declaration is the specification, not the implementation. [WordPress
  Roles](/guides/wordpress-roles) creates it.
- **`roles`, `capabilities` and `extra_capabilities` need `context=edit`.**
  Reading users with the default context returns no roles at all, and an audit
  built on that reports every capability missing. The role methods ask for the
  context explicitly — a bare `useWpGetUsers()` does not.
- **Capabilities are global names, not per-post-type.** `edit_published_orders`
  says nothing about `orders` being the only thing it reaches; that scoping
  lives in the post type's capability map on the PHP side. `read` on a customer
  role is not restricted to the store.
- **Meta capabilities need their `_others_` counterpart.** `read_order` and
  `edit_order` are checked against a specific post id; without
  `read_private_orders` / `edit_others_orders` they pass only for the holder's
  own records. Granting the singular forms alone is the safe direction.
- **Reading capabilities requires `list_users`.** A subscriber-level token gets
  `401`/`403` on every role call, and the audit surfaces it as a failed request
  rather than as a missing capability.

## 10. Framework examples

| Framework | Example | Description |
| --- | --- | --- |
| **Vue 3** | [`examples/wordpress/vue-blog.vue`](https://github.com/senseikatana/katanakit-js/tree/main/examples/wordpress/vue-blog.vue) | Blog listing with categories and featured images |
| **Nuxt 3** | [`examples/wordpress/nuxt-blog.vue`](https://github.com/senseikatana/katanakit-js/tree/main/examples/wordpress/nuxt-blog.vue) | SSR blog listing with `useAsyncData` |
| **Astro** | [`examples/wordpress/astro-blog.astro`](https://github.com/senseikatana/katanakit-js/tree/main/examples/wordpress/astro-blog.astro) | Static blog listing |
| **Next.js** | [`examples/wordpress/next-blog.tsx`](https://github.com/senseikatana/katanakit-js/tree/main/examples/wordpress/next-blog.tsx) | Server component listing |
| **Node.js** | [`examples/wordpress/demo.ts`](https://github.com/senseikatana/katanakit-js/tree/main/examples/wordpress/demo.ts) | Runnable demo covering all operations |

## Related

- [WordPress Roles](/guides/wordpress-roles) — creating the roles this page declares, in wp-cli or PHP.
- [Astro Adapter](/guides/services/astro-adapter) — turning these calls into static routes.
- [Query Client](/guides/query-client) — caching and invalidating CMS reads.
- [HTTP Client](/guides/services/http-client) — the underlying Safe Result and options.
- [Access Control](/guides/access-control) — the roles, capabilities and guards `useWpSyncRoles()` feeds.
