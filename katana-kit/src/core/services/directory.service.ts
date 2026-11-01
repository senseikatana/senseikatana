import { AccessService } from "@/core/services/access.service.js";
import type {
	DirectoryError,
	DirectoryErrorCode,
	DirectoryPageResult,
	DirectoryQuery,
	DirectoryResult,
	DirectoryUser,
} from "@/schemas/directory.schema.js";
import { DirectoryQuerySchema } from "@/schemas/directory.schema.js";
import type { AccessRole } from "@/types/index.js";

/* -------------------------------------------------------------------------- */
/* Port                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Where user records actually live.
 *
 * Injected, never implemented here. A role ladder that cannot decide its own
 * questions is fine; a role ladder that decides where the rows go is not — that
 * is what would tie the kit to one database and make "the core does no I/O" a
 * lie.
 *
 * Everything here is `Promise` because nothing here should be: an in-memory
 * adapter for tests returns already-resolved promises, and a caller is never
 * tempted to write sync code that only works against the fake.
 */
export interface DirectoryRepository {
	useList(query: DirectoryQuery): Promise<DirectoryPageResult>;
	useGet(id: string | number): Promise<DirectoryResult<DirectoryUser>>;
	/** Persists a new person. Fails with `already_active` on a duplicate. */
	useCreate(user: Omit<DirectoryUser, "id">): Promise<DirectoryResult<DirectoryUser>>;
	useUpdate(
		id: string | number,
		patch: Partial<Omit<DirectoryUser, "id">>,
	): Promise<DirectoryResult<DirectoryUser>>;
	/** Row removal. Soft-delete belongs in {@link useUpdate}, not here. */
	useDelete(id: string | number): Promise<DirectoryResult<true>>;
	/**
	 * How many active users hold each role.
	 *
	 * Called before any demotion so the "last owner" check cannot be raced by a
	 * second concurrent demotion. A repository that cannot answer this cheaply
	 * should cache it — the count is the only thing standing between a routine
	 * role change and an unadministrable system.
	 */
	useCountByRole(role: AccessRole): Promise<number>;
}

/* -------------------------------------------------------------------------- */
/* Refusals                                                                   */
/* -------------------------------------------------------------------------- */

function refuse(
	code: DirectoryErrorCode,
	message: string,
	subject?: string,
): DirectoryResult<never> {
	const error: DirectoryError = subject ? { code, message, subject } : { code, message };
	return { data: null, error, ok: false };
}

/* -------------------------------------------------------------------------- */
/* The invariants                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Actions that lock every administrator out of their own system.
 *
 * Each of these is a single line of code and a support ticket. A user
 * directory is the one place where a friendly-looking edit has no undo button,
 * so the rules live here rather than in a `// TODO: add auth checks` comment.
 */
export interface DirectoryActor {
	id: string | number;
	/** The actor's roles, already resolved by the caller. */
	roles: AccessRole[];
}

/**
 * Privilege rank of a role, lower is more powerful.
 *
 * Read from the live registry rather than a private copy, so a deployment that
 * registered its own roles gets correct escalation behaviour for free. An
 * unknown role ranks after every known one — the conservative direction, since
 * it only ever makes the guard stricter.
 */
function useRank(role: AccessRole): number {
	const found = AccessService.getInstance()
		.useRoles()
		.find((entry: { slug: string; rank: number }) => entry.slug === role);
	return found?.rank ?? Number.MAX_SAFE_INTEGER;
}

/** The actor's most privileged rank, or `Infinity` when they hold nothing. */
function useBestRank(actor: DirectoryActor): number {
	if (actor.roles.length === 0) return Number.POSITIVE_INFINITY;
	return Math.min(...actor.roles.map(useRank));
}

/**
 * Whether the actor may hand out `role`.
 *
 * Holding the role yourself, or holding something *more* powerful, both
 * qualify. Equality of role is not enough: that is what stops two admins from
 * minting a third admin when only an owner should be able to widen the circle.
 */
function useMayGrant(actor: DirectoryActor, role: AccessRole): boolean {
	return useRank(role) >= useBestRank(actor);
}

/**
 * The last remaining holder of a role cannot lose it.
 *
 * Only roles actually being *removed* are checked — adding one must never trip
 * this, or an admin could not create their first peer. Counts every **active**
 * holder, so a suspended owner does not keep a seat warm for a privilege nobody
 * can exercise. Promoting someone else first is the supported way out, and the
 * message says so: a refusal without a way forward is the worst kind.
 */
async function useGuardLastRole(
	repository: DirectoryRepository,
	user: DirectoryUser,
	losing: AccessRole[],
): Promise<DirectoryResult<never> | null> {
	if (user.status !== "active") return null;

	for (const role of losing) {
		const holders = await repository.useCountByRole(role);
		if (holders <= 1) {
			return refuse(
				"last_owner",
				`This is the only active user with the "${role}" role. ` +
					`Promote someone else to "${role}" before removing it.`,
				role,
			);
		}
	}
	return null;
}

/**
 * Runs the guards that apply to removing a role from one user.
 *
 * Extracted so `useRemoveRole` and `useUpdate` cannot drift apart — two copies
 * of an authz check is how one of them ends up missing a case.
 */
async function useGuardDemotion(
	repository: DirectoryRepository,
	actor: DirectoryActor,
	target: DirectoryUser,
	nextRoles: AccessRole[],
): Promise<DirectoryResult<never> | null> {
	const demoted = target.roles.filter((role) => !nextRoles.includes(role));

	if (demoted.length === 0) return null;

	if (String(actor.id) === String(target.id)) {
		return refuse("self_demotion", "You cannot remove your own roles. Ask another administrator.");
	}

	// A role the actor could never grant is a role they may never revoke either:
	// that is the direction privilege is lost, and it is the direction an
	// attacker moves in. Peers *can* demote each other, which is what an admin
	// role is for.
	for (const role of demoted) {
		if (!useMayGrant(actor, role)) {
			return refuse(
				"privilege_escalation",
				`You cannot remove the "${role}" role: it outranks the roles you hold.`,
				role,
			);
		}
	}

	return useGuardLastRole(repository, target, demoted);
}

/* -------------------------------------------------------------------------- */
/* Operations                                                                 */
/* -------------------------------------------------------------------------- */

export interface DirectoryServiceOptions {
	repository: DirectoryRepository;
}

/**
 * User management over any storage, with the lockout guards built in.
 *
 * Pure orchestration: every method either returns a `DirectoryResult` or hands
 * the decision back to the repository. No exceptions for expected refusals —
 * "you may not do that" is an answer, not a crash, and a caller should not have
 * to distinguish the two in a `catch`.
 *
 * **Deliberately not here:** deleting a provider account, revoking a live
 * session, forcing a password change. Those belong to the identity provider
 * and are the caller's to invoke — a directory row disappearing must not be the
 * only thing that happened.
 *
 * @example
 * ```ts
 * const directory = new DirectoryService({ repository });
 *
 * const suspended = await directory.useSuspend(actor, 42, "left the company");
 * if (!suspended.ok && suspended.error.code === "last_owner") {
 *   // render the "promote someone else first" message
 * }
 * ```
 */
export class DirectoryService {
	private readonly repository: DirectoryRepository;

	constructor({ repository }: DirectoryServiceOptions) {
		this.repository = repository;
	}

	/** Lists users, filtered and paginated by the repository. */
	async useList(query: Partial<DirectoryQuery> = {}): Promise<DirectoryPageResult> {
		const parsed = DirectoryQuerySchema.safeParse(query);
		if (!parsed.success) {
			return refuse("invalid_input", "Invalid list query.");
		}
		return this.repository.useList(parsed.data);
	}

	/** Fetches one user. */
	async useGet(id: string | number): Promise<DirectoryResult<DirectoryUser>> {
		return this.repository.useGet(id);
	}

	/**
	 * Registers a person.
	 *
	 * The actor is required even though creating is usually permissive: it is
	 * what lets a deployment decide later that creation is itself a capability,
	 * without changing this signature.
	 */
	async useCreate(
		actor: DirectoryActor,
		user: Omit<DirectoryUser, "id">,
	): Promise<DirectoryResult<DirectoryUser>> {
		const guard = useGuardEscalation(actor, user.roles);
		if (guard) return guard;

		if (user.roles.includes("owner")) {
			return refuse("privilege_escalation", "You cannot create an owner.", "owner");
		}
		return this.repository.useCreate(user);
	}

	/**
	 * Patches a user's fields.
	 *
	 * Roles go through the demotion guards even here, because an `update` that
	 * silently accepts `{ roles: [] }` is a way around `useRemoveRole` entirely.
	 */
	async useUpdate(
		actor: DirectoryActor,
		id: string | number,
		patch: Partial<Omit<DirectoryUser, "id">>,
	): Promise<DirectoryResult<DirectoryUser>> {
		const found = await this.repository.useGet(id);
		if (!found.ok) return found;

		// Privilege first: an actor who may not grant these roles may certainly
		// not assign them, and checking demotion first would report a confusing
		// "last owner" refusal for what is really an escalation attempt.
		if (patch.roles) {
			const escalation = useGuardEscalation(actor, patch.roles);
			if (escalation) return escalation;
		}

		const nextRoles = patch.roles ?? found.data.roles;
		const guard = await useGuardDemotion(this.repository, actor, found.data, nextRoles);
		if (guard) return guard;

		return this.repository.useUpdate(id, patch);
	}

	/** Grants a role. Refuses when the actor does not already hold it. */
	async useAddRole(
		actor: DirectoryActor,
		id: string | number,
		role: AccessRole,
	): Promise<DirectoryResult<DirectoryUser>> {
		const found = await this.repository.useGet(id);
		if (!found.ok) return found;

		if (role === "owner") {
			return refuse(
				"privilege_escalation",
				'Use a dedicated ownership transfer rather than granting "owner".',
				"owner",
			);
		}
		if (!useMayGrant(actor, role)) {
			return refuse(
				"privilege_escalation",
				`You cannot grant "${role}": you do not hold a role at least as privileged.`,
				role,
			);
		}
		if (found.data.roles.includes(role)) return { data: found.data, error: null, ok: true };

		return this.repository.useUpdate(id, {
			roles: [...found.data.roles, role],
		});
	}

	/** Revokes a role, keeping the person active. */
	async useRemoveRole(
		actor: DirectoryActor,
		id: string | number,
		role: AccessRole,
	): Promise<DirectoryResult<DirectoryUser>> {
		const found = await this.repository.useGet(id);
		if (!found.ok) return found;

		if (!found.data.roles.includes(role)) {
			return refuse("invalid_input", `This user does not hold "${role}".`, role);
		}

		const nextRoles = found.data.roles.filter((held) => held !== role);
		const guard = await useGuardDemotion(this.repository, actor, found.data, nextRoles);
		if (guard) return guard;

		return this.repository.useUpdate(id, { roles: nextRoles });
	}

	/**
	 * Suspends access while keeping the record and its audit trail.
	 *
	 * This is the operation a real offboarding uses, and it is **not**
	 * `useDelete`. Removing the row loses the evidence that the account existed;
	 * leaving the account merely "inactive" in a provider that has no such state
	 * means someone can still sign in. Suspension is the reversible, auditable
	 * middle ground, and {@link useDelete} is reserved for a genuine correction.
	 */
	async useSuspend(
		actor: DirectoryActor,
		id: string | number,
		reason?: string,
	): Promise<DirectoryResult<DirectoryUser>> {
		const found = await this.repository.useGet(id);
		if (!found.ok) return found;

		if (String(actor.id) === String(found.data.id)) {
			return refuse("self_suspension", "You cannot suspend your own account.");
		}
		if (found.data.status === "deactivated") {
			return refuse(
				"deactivated_identity",
				"This account is deactivated. Reactivate it instead of suspending.",
			);
		}
		if (found.data.status === "suspended") {
			return refuse("already_suspended", "This account is already suspended.");
		}
		// Suspending drops every role in practice, so the last-owner guard must
		// run against the roles it is about to lose.
		const guard = await useGuardDemotion(this.repository, actor, found.data, []);
		if (guard) return guard;

		return this.repository.useUpdate(id, {
			status: "suspended",
			metadata: reason ? { ...found.data.metadata, suspensionReason: reason } : found.data.metadata,
		});
	}

	/** Returns a suspended account to service. */
	async useReactivate(
		actor: DirectoryActor,
		id: string | number,
	): Promise<DirectoryResult<DirectoryUser>> {
		const found = await this.repository.useGet(id);
		if (!found.ok) return found;

		if (found.data.status === "deactivated") {
			return refuse(
				"deactivated_identity",
				"A deactivated account cannot be reactivated. Create a new one.",
			);
		}
		if (found.data.status === "active") {
			return refuse("already_active", "This account is already active.");
		}
		return this.repository.useUpdate(id, { status: "active" });
	}

	/**
	 * Removes the record permanently.
	 *
	 * Separate from {@link useSuspend} on purpose — and it does not touch the
	 * provider account, so a caller who needs real revocation must do that too.
	 */
	async useDelete(actor: DirectoryActor, id: string | number): Promise<DirectoryResult<true>> {
		const found = await this.repository.useGet(id);
		if (!found.ok) return found;

		if (String(actor.id) === String(found.data.id)) {
			return refuse("self_demotion", "You cannot delete your own account.");
		}

		const guard = await useGuardLastRole(this.repository, found.data, found.data.roles);
		if (guard) return guard;

		return this.repository.useDelete(id);
	}
}

/**
 * An actor cannot grant a role they do not hold.
 *
 * Without this, an `admin` could promote someone to `owner` and take the system
 * over; with it, escalation has to go through someone who already has the role.
 */
function useGuardEscalation(
	actor: DirectoryActor,
	nextRoles: AccessRole[],
): DirectoryResult<never> | null {
	if (actor.roles.length === 0) {
		return refuse("privilege_escalation", "You do not hold any role that permits this.");
	}
	for (const role of nextRoles) {
		// `owner` is not something you may simply hand out: even an existing
		// owner needs the explicit transfer flow. This is what stops an editor
		// reaching `owner` through `useUpdate({ roles: ["owner"] })`.
		if (role === "owner") {
			return refuse(
				"privilege_escalation",
				'Use a dedicated ownership transfer rather than assigning the "owner" role.',
				"owner",
			);
		}
		if (!useMayGrant(actor, role)) {
			return refuse(
				"privilege_escalation",
				`You cannot grant "${role}": you do not hold a role at least as privileged.`,
				role,
			);
		}
	}
	return null;
}
