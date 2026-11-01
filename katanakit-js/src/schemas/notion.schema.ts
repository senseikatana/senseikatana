import { z } from "zod";

import type { NotionFilter } from "@/types/index.js";

/** Config for the Notion API integration. */
export const NotionConfigSchema = z.object({
	/** Notion integration token (starts with "ntn_" or "secret_"). */
	token: z.string(),
	/** API version header (default: "2022-06-28"). */
	apiVersion: z.string().optional(),
	/** Custom base URL (default: "https://api.notion.com/v1"). */
	apiBaseUrl: z.string().optional(),
});

/** Rich text object used in Notion blocks and properties. */
export const NotionRichTextSchema = z.looseObject({
	type: z.literal("text"),
	text: z.looseObject({
		content: z.string(),
		link: z.looseObject({ url: z.string() }).nullable().optional(),
	}),
	annotations: z
		.looseObject({
			bold: z.boolean().optional(),
			italic: z.boolean().optional(),
			strikethrough: z.boolean().optional(),
			underline: z.boolean().optional(),
			code: z.boolean().optional(),
			color: z.string().optional(),
		})
		.optional(),
	plain_text: z.string().optional(),
	href: z.string().nullable().optional(),
});

/** Parent reference for pages and databases. */
export const NotionParentSchema = z.union([
	z.looseObject({ type: z.literal("database_id"), database_id: z.string() }),
	z.looseObject({ type: z.literal("page_id"), page_id: z.string() }),
	z.looseObject({ type: z.literal("workspace"), workspace: z.literal(true) }),
]);

/** Property value on a Notion page. */
export const NotionPropertyValueSchema = z
	.looseObject({
		id: z.string().optional(),
		type: z.string(),
		title: z.array(NotionRichTextSchema).optional(),
		rich_text: z.array(NotionRichTextSchema).optional(),
		number: z.number().optional(),
		select: z
			.looseObject({
				id: z.string(),
				name: z.string(),
				color: z.string().optional(),
			})
			.nullable()
			.optional(),
		multi_select: z
			.array(
				z.looseObject({
					id: z.string(),
					name: z.string(),
					color: z.string().optional(),
				}),
			)
			.optional(),
		date: z
			.looseObject({
				start: z.string(),
				end: z.string().nullable().optional(),
			})
			.nullable()
			.optional(),
		checkbox: z.boolean().optional(),
		url: z.string().nullable().optional(),
		email: z.string().nullable().optional(),
		phone_number: z.string().nullable().optional(),
		formula: z
			.looseObject({
				type: z.string(),
				string: z.string().optional(),
				number: z.number().optional(),
				boolean: z.boolean().optional(),
			})
			.optional(),
		relation: z.array(z.looseObject({ id: z.string() })).optional(),
		rollup: z
			.looseObject({
				type: z.string(),
				number: z.number().optional(),
			})
			.optional(),
		status: z
			.looseObject({
				id: z.string(),
				name: z.string(),
				color: z.string().optional(),
			})
			.nullable()
			.optional(),
	})
	.catchall(z.unknown());

/** Icon on a page or database (emoji or file). */
export const NotionIconSchema = z.union([
	z.looseObject({ type: z.literal("emoji"), emoji: z.string() }),
	z.looseObject({ type: z.literal("file"), file: z.looseObject({ url: z.string() }) }),
]);

/** Cover image on a page. */
export const NotionCoverSchema = z.union([
	z.looseObject({ type: z.literal("external"), external: z.looseObject({ url: z.string() }) }),
	z.looseObject({ type: z.literal("file"), file: z.looseObject({ url: z.string() }) }),
]);

/** A Notion page object. */
export const NotionPageSchema = z.looseObject({
	object: z.literal("page"),
	id: z.string(),
	created_time: z.string(),
	last_edited_time: z.string(),
	created_by: z.looseObject({ object: z.literal("user"), id: z.string() }),
	last_edited_by: z.looseObject({ object: z.literal("user"), id: z.string() }),
	parent: NotionParentSchema,
	archived: z.boolean(),
	url: z.string(),
	properties: z.record(z.string(), NotionPropertyValueSchema),
	icon: NotionIconSchema.nullable().optional(),
	cover: NotionCoverSchema.nullable().optional(),
});

/** A Notion block object. */
export const NotionBlockSchema = z
	.looseObject({
		object: z.literal("block"),
		id: z.string(),
		type: z.string(),
		created_time: z.string().optional(),
		last_edited_time: z.string().optional(),
		has_children: z.boolean().optional(),
		archived: z.boolean().optional(),
	})
	.catchall(z.unknown());

/** Result of listing block children (paginated). */
export const NotionBlockListSchema = z.looseObject({
	object: z.literal("list"),
	results: z.array(NotionBlockSchema),
	has_more: z.boolean(),
	next_cursor: z.string().nullable(),
	type: z.literal("block"),
	block: z.record(z.string(), z.unknown()),
});

/** Schema definition for a database property. */
export const NotionPropertySchemaSchema = z
	.looseObject({
		id: z.string().optional(),
		name: z.string().optional(),
		type: z.string(),
	})
	.catchall(z.unknown());

/** A Notion database object. */
export const NotionDatabaseSchema = z.looseObject({
	object: z.literal("database"),
	id: z.string(),
	created_time: z.string(),
	last_edited_time: z.string(),
	title: z.array(NotionRichTextSchema),
	description: z.array(NotionRichTextSchema),
	parent: NotionParentSchema,
	url: z.string(),
	icon: NotionIconSchema.nullable().optional(),
	cover: NotionCoverSchema.nullable().optional(),
	properties: z.record(z.string(), NotionPropertySchemaSchema),
	archived: z.boolean().optional(),
});

/** Filter for querying a Notion database. */
export const NotionFilterSchema: z.ZodType<NotionFilter> = z
	.looseObject({
		and: z.array(z.lazy(() => NotionFilterSchema)).optional(),
		or: z.array(z.lazy(() => NotionFilterSchema)).optional(),
		property: z.string().optional(),
	})
	.catchall(z.unknown());

/** Sort option for querying a Notion database. */
export const NotionSortSchema = z.object({
	property: z.string().optional(),
	timestamp: z.enum(["created_time", "last_edited_time"]).optional(),
	direction: z.enum(["ascending", "descending"]),
});

/** Query options for a Notion database. */
export const NotionDatabaseQuerySchema = z.object({
	filter: NotionFilterSchema.optional(),
	sorts: z.array(NotionSortSchema).optional(),
	start_cursor: z.string().optional(),
	page_size: z.number().optional(),
});

/** Result of querying a Notion database (paginated). */
export const NotionPageListSchema = z.looseObject({
	object: z.literal("list"),
	results: z.array(NotionPageSchema),
	has_more: z.boolean(),
	next_cursor: z.string().nullable(),
	type: z.literal("page"),
	page: z.record(z.string(), z.unknown()),
});

/** A Notion user object. */
export const NotionUserSchema = z.looseObject({
	object: z.literal("user"),
	id: z.string(),
	type: z.enum(["person", "bot"]),
	name: z.string().optional(),
	avatar_url: z.string().optional(),
	person: z.looseObject({ email: z.string().optional() }).optional(),
	bot: z.looseObject({ owner: z.looseObject({ type: z.string() }) }).optional(),
});

/** Paginated list of Notion users. */
export const NotionUserListSchema = z.looseObject({
	object: z.literal("list"),
	results: z.array(NotionUserSchema),
	has_more: z.boolean(),
	next_cursor: z.string().nullable(),
});

/** Search query options for the Notion API. */
export const NotionSearchQuerySchema = z.object({
	query: z.string().optional(),
	filter: z
		.object({
			value: z.enum(["database", "page"]),
			property: z.literal("object"),
		})
		.optional(),
	sort: z
		.object({
			direction: z.enum(["ascending", "descending"]),
			timestamp: z.literal("last_edited_time"),
		})
		.optional(),
	start_cursor: z.string().optional(),
	page_size: z.number().optional(),
});

/** Result of a Notion search (paginated). */
export const NotionSearchResultSchema = z.looseObject({
	object: z.literal("list"),
	results: z.array(z.union([NotionPageSchema, NotionDatabaseSchema])),
	has_more: z.boolean(),
	next_cursor: z.string().nullable(),
});

/* -------------------------------------------------------------------------- */
/* Partial response variants (Notion returns sparse shapes on some endpoints)  */
/* -------------------------------------------------------------------------- */

/** Single page response (fields may be sparse depending on the endpoint). */
export const NotionPageResponseSchema = NotionPageSchema.partial();

/** Single block response (fields may be sparse depending on the endpoint). */
export const NotionBlockResponseSchema = NotionBlockSchema.partial();

/** Single database response (fields may be sparse depending on the endpoint). */
export const NotionDatabaseResponseSchema = NotionDatabaseSchema.partial();

/** Single user response (fields may be sparse depending on the endpoint). */
export const NotionUserResponseSchema = NotionUserSchema.partial();
