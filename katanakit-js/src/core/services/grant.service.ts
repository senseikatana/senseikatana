import type { AccessResource, Grant } from "@/schemas/grant.schema.js";
import type { AccessCapability, AccessRole, AccessSubject } from "@/types/index.js";

import { AccessService } from "./access.service.js";

/* -------------------------------------------------------------------------- */
/* Contract                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Supplies the roles a subject holds over one resource.
 *
 * Injected, never implemented here. The core must not know whether grants live
 * in Postgres, in a `shares` table behind an RLS policy, or in a test fixture —
 * and it must not know that a *global* role ladder and a *per-resource* ACL
 * need different storage with different query shapes.
 *
 * Return every grant you can see for this pair, expired or not. Expiry is
 * evaluated by {@link useGrantAwareCan} so the rule lives in one place instead
 * of in every caller that remembered to write it.
 */
export type GrantResolver = (input: {
	subject: AccessSubject;
	resource: AccessResource;
}) => readonly Grant[];

/** Where a permission came from. Kept so audit logs can say *why*. */
export type AccessSource = "role" | "grant" | "none";

export interface ResourceAccessDecision {
	/** Whether the capability is permitted on this resource. */
	allowed: boolean;
	/** Whether it came from a global role, a resource grant, or nowhere. */
	source: AccessSource;
	/** The role that carried it — the granted one when `source` is `"grant"`. */
	via?: AccessRole;
}

export interface GrantAwareOptions {
	subject: AccessSubject;
	resource: AccessResource;
	capability: AccessCapability;
	/** Omit to deny every grant-scoped check. Global roles still resolve. */
	useGrants?: GrantResolver;
	/** Override the registry (tests, isolated instances). */
	access?: AccessService;
	/** Injected clock, so expiry is testable. */
	now?: Date;
}

/* -------------------------------------------------------------------------- */
/* Resolution                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Resolves a capability against a subject **and** a resource.
 *
 * Two independent sources, checked in order:
 *
 * 1. the subject's global roles — a department head may sign any payroll;
 * 2. a grant on this exact resource — an employee sees only their own file.
 *
 * Neither subsumes the other, which is why this is not `useCan` with extra
 * arguments. A global role answers *"what class of thing may this person ever
 * do"*; a grant answers *"may they do it to this one"*. A deployment needs
 * both the moment anyone shares a document with one person and nothing with
 * everybody else.
 *
 * An expired grant is treated as absent, so revoking a contractor is deleting
 * one row — not auditing every query path that might have cached the role.
 *
 * Pure: no storage access, no clock read, no globals.
 *
 * @example
 * ```ts
 * useGrantAwareCan({
 *   subject: sessionSubject,
 *   resource: { type: "expediente", id: 42 },
 *   capability: "expediente:read",
 *   useGrants: ({ subject, resource }) => listShares(subject.id, resource),
 * });
 * ```
 */
export function useGrantAwareCan(options: GrantAwareOptions): ResourceAccessDecision {
	const { subject, resource, capability, useGrants, access, now } = options;
	const service = access ?? AccessService.getInstance();

	// 1. Global roles. A subject with no roles and no grants is not "maybe".
	if (service.useCan(subject, capability)) {
		return { allowed: true, source: "role" };
	}

	// 2. Resource grants. Missing resolver means no grant-scoped access exists,
	//    not that the check is skipped — fail closed.
	if (!useGrants) return { allowed: false, source: "none" };

	const at = (now ?? new Date()).getTime();
	for (const grant of useGrants({ subject, resource })) {
		if (!useGrantApplies(grant, resource, at)) continue;
		const granted: AccessSubject = { id: grant.subjectId, roles: [grant.role] };
		// A grant is *data*, not configuration: a row left behind by an earlier
		// deployment can name a role this one never registered. The registry
		// throws on an unknown role — loudly and correctly for a global role,
		// which is configuration — but here the right answer is to skip the row.
		// Otherwise one stale share takes a route down instead of merely
		// granting nothing.
		try {
			if (service.useCan(granted, capability)) {
				return { allowed: true, source: "grant", via: grant.role };
			}
		} catch {
			continue;
		}
	}

	return { allowed: false, source: "none" };
}

/**
 * Whether a grant is usable right now: it targets this resource and has not
 * expired. A malformed expiry is treated as expired — a share whose deadline
 * cannot be read is a share nobody meant to leave open.
 */
function useGrantApplies(grant: Grant, resource: AccessResource, at: number): boolean {
	if (grant.resource.type !== resource.type) return false;
	if (String(grant.resource.id) !== String(resource.id)) return false;
	if (grant.expiresAt === undefined) return true;

	const expires = Date.parse(grant.expiresAt);
	return Number.isFinite(expires) && expires > at;
}
