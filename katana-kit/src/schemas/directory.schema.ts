import { z } from "zod";

import { AccessRoleSchema } from "./access.schema.js";
import { IdentityStatusSchema } from "./identity.schema.js";

/**
 * A person as your directory stores them.
 *
 * Distinct from the `Identity` in `identity.schema.ts`, which describes who a
 * provider says someone is. This is the record *you* own: it carries the
 * department, the employee number, the hire date — the facts that stay true
 * when the person switches sign-in method.
 *
 * `principalSubject` is optional on purpose. A row with no provider account is
 * how a contractor, a temp, or a member who has not signed in yet exists in
 * the system without being a row in someone else's auth table.
 */
export const DirectoryUserSchema = z.object({
	id: z.union([z.string(), z.number()]),
	principalSubject: z.string().min(1).optional(),
	email: z.string().min(1).optional(),
	displayName: z.string().min(1).optional(),
	status: IdentityStatusSchema.default("pending"),
	roles: z.array(AccessRoleSchema).default([]),
	/** Set by the caller; the kit has no opinion about department structure. */
	scope: z.string().min(1).optional(),
	/** Domain fields (national id, hire date…) — opaque to the kit. */
	metadata: z.record(z.string(), z.unknown()).optional(),
});

/**
 * Why an operation was refused.
 *
 * A stable, machine-readable `code` is the whole point: a UI needs to say
 * something different for "you cannot demote the last owner" than for "that
 * email is already registered", and matching on message text is how that breaks.
 */
export const DirectoryErrorCodeSchema = z.enum([
	"not_found",
	"last_owner",
	"self_suspension",
	"self_demotion",
	"privilege_escalation",
	"already_active",
	"already_suspended",
	"deactivated_identity",
	"invalid_input",
]);

/**
 * A page request. `cursor` is opaque and provider-defined — the kit neither
 * issues nor interprets it.
 */
export const DirectoryQuerySchema = z.object({
	search: z.string().min(1).optional(),
	status: IdentityStatusSchema.optional(),
	role: AccessRoleSchema.optional(),
	scope: z.string().min(1).optional(),
	limit: z.number().int().positive().max(200).default(50),
	cursor: z.string().min(1).optional(),
});

/** A page of results plus the cursor for the next one. */
export const DirectoryPageSchema = z.object({
	users: z.array(DirectoryUserSchema),
	/** Absent on the last page. */
	nextCursor: z.string().min(1).optional(),
	total: z.number().int().nonnegative().optional(),
});

export type DirectoryUser = z.infer<typeof DirectoryUserSchema>;
export type DirectoryErrorCode = z.infer<typeof DirectoryErrorCodeSchema>;
export type DirectoryQuery = z.infer<typeof DirectoryQuerySchema>;
export type DirectoryPage = z.infer<typeof DirectoryPageSchema>;

/** Safe result of a directory operation. Never throws for a refused action. */
export type DirectoryResult<T> =
	{ data: T; error: null; ok: true } | { data: null; error: DirectoryError; ok: false };

/** Shape a repository must satisfy — lets a plain object be passed as one. */
export type DirectoryPageResult = DirectoryResult<{
	users: DirectoryUser[];
	nextCursor?: string;
	total?: number;
}>;

export interface DirectoryError {
	code: DirectoryErrorCode;
	message: string;
	/** The subject or role the refusal is about, for a precise UI message. */
	subject?: string;
}
