import { z } from "zod";

import { AccessRoleSchema } from "./access.schema.js";

/* -------------------------------------------------------------------------- */
/* Principal — what authentication produced                                    */
/* -------------------------------------------------------------------------- */

/**
 * A principal is the *result of authenticating*: who the provider says you
 * are, and how it proved it.
 *
 * It deliberately carries no roles. The method that proved the identity
 * (`oauth:google`, `password`, `otp`, `passkey`) is a fact about the
 * credential, never about the person — that separation is what lets one
 * deployment offer SSO to contractors and a password to employees without the
 * authorization layer noticing.
 *
 * `provider` and `method` are open strings. The kit has no opinion about the
 * catalog: `better-auth`, `insforge`, `ldap`, `saml`, or a national identity
 * document number are all just values here.
 */
export const PrincipalSchema = z.object({
	/** Stable identifier **at the provider**, not in your database. */
	subject: z.string().min(1),
	/** How the identity was proved, e.g. `password`, `oauth:google`, `otp`. */
	method: z.string().min(1),
	/** Which identity provider vouched, e.g. `better-auth`, `insforge`. */
	provider: z.string().min(1),
	email: z.string().optional(),
	/** Whether the provider vouched the email itself. Not the same as "is an employee". */
	emailVerified: z.boolean().optional(),
	/** Anything else the provider asserted. Opaque to the kit. */
	claims: z.record(z.string(), z.unknown()).optional(),
});

/* -------------------------------------------------------------------------- */
/* Identity — who the person is, in your system                                */
/* -------------------------------------------------------------------------- */

/**
 * Lifecycle of an account you own.
 *
 * `deactivated` is not `deleted`. Removing the row at the provider leaves a
 * live session and an account the provider still recognises; deactivation
 * keeps the audit trail, revokes your own access, and is reversible.
 */
export const IdentityStatusSchema = z.enum(["pending", "active", "suspended", "deactivated"]);

/**
 * A person **in your system**, as opposed to the principal they log in with.
 *
 * The split exists because the two have different owners and different
 * lifecycles. The principal belongs to the provider and is recreated at every
 * login. The identity belongs to you: it survives a password change, a new
 * phone, a move between providers, and it is what a role attaches to.
 *
 * `metadata` holds whatever your deployment needs to know about the person —
 * a national identity number, a department, a hire date. The kit has no
 * opinion about those fields; putting them here rather than in the schema is
 * what keeps the kit usable outside one country.
 */
export const IdentitySchema = z.object({
	id: z.string().min(1),
	/** The provider-side id this identity was resolved from. */
	principalSubject: z.string().min(1),
	provider: z.string().min(1),
	status: IdentityStatusSchema.default("pending"),
	email: z.string().optional(),
	displayName: z.string().optional(),
	/** Roles held globally. A grant on a resource is separate — see `grant.schema.ts`. */
	roles: z.array(AccessRoleSchema).default([]),
	metadata: z.record(z.string(), z.unknown()).optional(),
});

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

/** The authenticated subject, as reported by an identity provider. */
export type Principal = z.infer<typeof PrincipalSchema>;

/** Account lifecycle state you own. */
export type IdentityStatus = z.infer<typeof IdentityStatusSchema>;

/** A person in your system. */
export type Identity = z.infer<typeof IdentitySchema>;
