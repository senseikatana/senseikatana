import { z } from "zod";

import { AccessRoleSchema } from "./access.schema.js";

/**
 * The thing being acted on — enough for the authorization layer to route a
 * check to the right table, and nothing more.
 *
 * `type` is the storage's partition key (`document`, `expediente`, `invoice`),
 * not a capability domain. Keeping them separate stops the two vocabularies
 * from silently drifting into each other.
 */
export const AccessResourceSchema = z.object({
	type: z.string().min(1),
	id: z.union([z.string(), z.number()]),
});

/**
 * A role held over one specific resource — the "share with restricted access"
 * that a content-management role ladder cannot express.
 *
 * It is a **role**, not a boolean, on purpose. Reusing the same registry as
 * global roles means `viewer` means whatever the deployment registered it to
 * mean, and there is one vocabulary to learn instead of two. The only
 * difference from a global role is the `resource`, which is what scopes it.
 *
 * `expiresAt` exists for temporary shares (a contractor, a substitute). A
 * grant that never expires is a grant nobody remembers revoking.
 */
export const GrantSchema = z.object({
	subjectId: z.union([z.string(), z.number()]),
	resource: AccessResourceSchema,
	role: AccessRoleSchema,
	grantedAt: z.string().datetime().optional(),
	expiresAt: z.string().datetime().optional(),
});

/** Anything the authorization layer can check a subject against. */
export type AccessResource = z.infer<typeof AccessResourceSchema>;

/** A role scoped to one resource. */
export type Grant = z.infer<typeof GrantSchema>;
