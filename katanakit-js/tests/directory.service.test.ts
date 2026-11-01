import { beforeEach, describe, expect, it } from "vitest";

import type { DirectoryActor } from "@/core/services/directory.service";
import { DirectoryService } from "@/core/services/directory.service";
import type {
	DirectoryQuery,
	DirectoryRepository,
	DirectoryUser,
} from "@/schemas/directory.schema";

/**
 * An in-memory repository. Doubles as the worked example of what a real one
 * has to implement, and keeps the tests free of a database.
 */
function memoryRepository(seedRows: DirectoryUser[] = []) {
	const rows = new Map<string, DirectoryUser>(seedRows.map((user) => [String(user.id), user]));
	let next = rows.size + 1;
	const calls: string[] = [];

	const notFound = (id: string | number) => ({
		data: null,
		error: { code: "not_found" as const, message: `No user ${String(id)}.` },
		ok: false as const,
	});

	const repository: DirectoryRepository = {
		async useList(query: DirectoryQuery) {
			calls.push("list");
			const users = [...rows.values()].filter((user) => {
				if (query.status && user.status !== query.status) return false;
				if (query.role && !user.roles.includes(query.role)) return false;
				if (query.scope && user.scope !== query.scope) return false;
				return true;
			});
			return { data: { users, total: users.length }, error: null, ok: true };
		},
		async useGet(id) {
			calls.push("get");
			const found = rows.get(String(id));
			return found ? { data: found, error: null, ok: true } : notFound(id);
		},
		async useCreate(user) {
			calls.push("create");
			if (user.email && [...rows.values()].some((row) => row.email === user.email)) {
				return {
					data: null,
					error: { code: "already_active" as const, message: "Email already registered." },
					ok: false as const,
				};
			}
			const created: DirectoryUser = { ...user, id: next++ };
			rows.set(String(created.id), created);
			return { data: created, error: null, ok: true };
		},
		async useUpdate(id, patch) {
			calls.push("update");
			const found = rows.get(String(id));
			if (!found) return notFound(id);
			const merged = { ...found, ...patch };
			rows.set(String(id), merged);
			return { data: merged, error: null, ok: true };
		},
		async useDelete(id) {
			calls.push("delete");
			if (!rows.has(String(id))) return notFound(id);
			rows.delete(String(id));
			return { data: true, error: null, ok: true };
		},
		async useCountByRole(role) {
			calls.push("count");
			return [...rows.values()].filter((row) => row.status === "active" && row.roles.includes(role))
				.length;
		},
	};

	return { repository, calls };
}

/**
 * Every role has at least two holders except `editor`, which has exactly one.
 * That is deliberate: the last-holder guards must be provable on a role that an
 * `admin` is allowed to grant in the first place, since nobody outranks
 * `owner` — an owner removing their own role trips `self_demotion` first.
 */
function seed(): DirectoryUser[] {
	return [
		{ id: 1, status: "active", roles: ["owner"], displayName: "Owner" },
		{ id: 2, status: "active", roles: ["admin"], displayName: "Admin" },
		{ id: 3, status: "active", roles: ["editor"], displayName: "Editor" },
		{ id: 4, status: "active", roles: ["member"], displayName: "Member" },
		{ id: 5, status: "active", roles: ["admin"], displayName: "Second admin" },
		{ id: 6, status: "active", roles: ["member"], displayName: "Another member" },
	];
}

/** Actors that are never the target of the guard under test. */
const secondAdmin: DirectoryActor = { id: 5, roles: ["admin"] };
const editor: DirectoryActor = { id: 3, roles: ["editor"] };
/** Stands in for an owner acting on somebody else. */
const otherOwner: DirectoryActor = { id: 9, roles: ["owner"] };
/** An owner acting on themselves. */
const selfOwner: DirectoryActor = { id: 1, roles: ["owner"] };

function serviceWith(rows: DirectoryUser[]) {
	const built = memoryRepository(rows);
	return {
		directory: new DirectoryService({ repository: built.repository }),
		calls: built.calls,
	};
}

describe("DirectoryService", () => {
	let directory: DirectoryService;
	let calls: string[];

	beforeEach(() => {
		const built = serviceWith(seed());
		directory = built.directory;
		calls = built.calls;
	});

	describe("reading", () => {
		it("lists users", async () => {
			const result = await directory.useList({ limit: 50 });

			expect(result.ok).toBe(true);
			expect(result.data?.users).toHaveLength(6);
		});

		it("filters by role", async () => {
			const result = await directory.useList({ limit: 50, role: "admin" });

			expect(result.data?.users.map((user) => user.id)).toEqual([2, 5]);
		});

		it("applies a default limit when none is given", async () => {
			expect((await directory.useList()).ok).toBe(true);
		});

		it("rejects an invalid query instead of forwarding it", async () => {
			const result = await directory.useList({ limit: 5000 });

			expect(result.ok).toBe(false);
			expect(result.error?.code).toBe("invalid_input");
		});

		it("reports a missing user without throwing", async () => {
			const result = await directory.useGet(999);

			expect(result.ok).toBe(false);
			expect(result.error?.code).toBe("not_found");
		});
	});

	describe("the last holder of a role", () => {
		it("refuses to strip a uniquely held role", async () => {
			// User 3 is the only editor, and an admin may normally grant that
			// role — so this isolates the last-holder rule from escalation.
			const result = await directory.useRemoveRole(secondAdmin, 3, "editor");

			expect(result.ok).toBe(false);
			expect(result.error?.code).toBe("last_owner");
			expect(result.error?.subject).toBe("editor");
		});

		it("refuses to suspend the only holder of a role", async () => {
			const result = await directory.useSuspend(secondAdmin, 3, "going away");

			expect(result.error?.code).toBe("last_owner");
		});

		it("refuses to delete the only holder of a role", async () => {
			const result = await directory.useDelete(secondAdmin, 3);

			expect(result.error?.code).toBe("last_owner");
		});

		it("allows the removal once a second holder exists", async () => {
			const result = await directory.useRemoveRole(secondAdmin, 2, "admin");

			expect(result.ok).toBe(true);
		});

		it("does not let a suspended holder rescue the last active one", async () => {
			// User 7 also holds `editor`, but suspended — so nobody can exercise
			// it. Counting them would let the system drop to zero live editors.
			const scoped = serviceWith([
				{ id: 2, status: "active", roles: ["admin"] },
				{ id: 3, status: "active", roles: ["editor"] },
				{ id: 7, status: "suspended", roles: ["editor"] },
			]);

			const result = await scoped.directory.useRemoveRole(secondAdmin, 3, "editor");

			expect(result.ok).toBe(false);
			expect(result.error?.code).toBe("last_owner");
		});

		it("allows the removal once a second active holder exists", async () => {
			const scoped = serviceWith([
				{ id: 2, status: "active", roles: ["admin"] },
				{ id: 3, status: "active", roles: ["editor"] },
				{ id: 7, status: "active", roles: ["editor"] },
			]);

			const result = await scoped.directory.useRemoveRole(secondAdmin, 3, "editor");

			expect(result.ok).toBe(true);
		});

		it("tells the caller how to get unstuck", async () => {
			const result = await directory.useRemoveRole(secondAdmin, 3, "editor");

			expect(result.error?.message).toMatch(/Promote someone else/);
		});
	});

	describe("self-harm", () => {
		it("refuses to suspend yourself", async () => {
			const result = await directory.useSuspend(selfOwner, 1);

			expect(result.error?.code).toBe("self_suspension");
		});

		it("refuses to delete yourself", async () => {
			const result = await directory.useDelete(selfOwner, 1);

			expect(result.error?.code).toBe("self_demotion");
		});

		it("refuses to remove your own roles", async () => {
			const result = await directory.useRemoveRole(selfOwner, 1, "owner");

			expect(result.error?.code).toBe("self_demotion");
		});
	});

	describe("privilege escalation", () => {
		it("refuses to grant a role you do not hold", async () => {
			const result = await directory.useAddRole(editor, 4, "owner");

			expect(result.error?.code).toBe("privilege_escalation");
		});

		it("refuses to grant owner, even to an existing owner", async () => {
			const result = await directory.useAddRole(otherOwner, 3, "owner");

			expect(result.error?.code).toBe("privilege_escalation");
			expect(result.error?.message).toMatch(/ownership transfer/);
		});

		it("refuses to reach owner through useUpdate", async () => {
			// The hole that `role !== "owner"` used to leave open.
			const result = await directory.useUpdate(editor, 4, { roles: ["owner"] });

			expect(result.error?.code).toBe("privilege_escalation");
		});

		it("refuses to create a new owner", async () => {
			const result = await directory.useCreate(otherOwner, {
				status: "active",
				roles: ["owner"],
			});

			expect(result.error?.code).toBe("privilege_escalation");
		});

		it("refuses to create a user holding a role you lack", async () => {
			const result = await directory.useCreate(editor, {
				status: "active",
				roles: ["admin"],
			});

			expect(result.error?.code).toBe("privilege_escalation");
		});

		it("refuses to revoke a role that outranks the actor", async () => {
			// An editor can never grant `owner`, so it can never revoke it either.
			const result = await directory.useRemoveRole(editor, 1, "owner");

			expect(result.error?.code).toBe("privilege_escalation");
			expect(result.error?.message).toMatch(/outranks/);
		});

		it("lets peers demote each other", async () => {
			const result = await directory.useRemoveRole(secondAdmin, 2, "admin");

			expect(result.ok).toBe(true);
			expect(result.data?.roles).toEqual([]);
		});

		it("lets an owner demote someone below them", async () => {
			const result = await directory.useRemoveRole(otherOwner, 2, "admin");

			expect(result.ok).toBe(true);
		});

		it("refuses an actor with no roles at all", async () => {
			const result = await directory.useAddRole({ id: 99, roles: [] }, 4, "admin");

			expect(result.error?.code).toBe("privilege_escalation");
		});
	});

	describe("update cannot bypass the guards", () => {
		it("refuses to escalate through useUpdate", async () => {
			// Reported as escalation, not as "last owner of member": privilege is
			// judged before demotion so the error names the real problem.
			const result = await directory.useUpdate(editor, 4, { roles: ["admin"] });

			expect(result.error?.code).toBe("privilege_escalation");
		});

		it("refuses to clear a user's roles when they hold the only one", async () => {
			const result = await directory.useUpdate(secondAdmin, 3, { roles: [] });

			expect(result.error?.code).toBe("last_owner");
		});

		it("never reaches the repository when a guard refuses", async () => {
			calls.length = 0;
			await directory.useUpdate(editor, 4, { roles: ["owner"] });

			expect(calls).not.toContain("update");
		});

		it("allows a benign field change", async () => {
			const result = await directory.useUpdate(secondAdmin, 4, { displayName: "New name" });

			expect(result.ok).toBe(true);
			expect(result.data?.displayName).toBe("New name");
		});
	});

	describe("suspension versus deletion", () => {
		it("suspends without removing the record", async () => {
			const result = await directory.useSuspend(secondAdmin, 4, "left the company");

			expect(result.ok).toBe(true);
			expect(result.data?.status).toBe("suspended");
			expect(calls).not.toContain("delete");
		});

		it("records why the account was suspended", async () => {
			const result = await directory.useSuspend(secondAdmin, 4, "contract ended");

			expect(result.data?.metadata?.suspensionReason).toBe("contract ended");
		});

		it("refuses to suspend an already suspended account", async () => {
			await directory.useSuspend(secondAdmin, 4);

			const result = await directory.useSuspend(secondAdmin, 4);

			expect(result.error?.code).toBe("already_suspended");
		});

		it("refuses to suspend a deactivated account", async () => {
			await directory.useUpdate(otherOwner, 4, { status: "deactivated" });

			const result = await directory.useSuspend(secondAdmin, 4);

			expect(result.error?.code).toBe("deactivated_identity");
		});

		it("reactivates a suspended account", async () => {
			await directory.useSuspend(secondAdmin, 4);

			const result = await directory.useReactivate(secondAdmin, 4);

			expect(result.data?.status).toBe("active");
		});

		it("refuses to reactivate a deactivated account", async () => {
			await directory.useUpdate(otherOwner, 4, { status: "deactivated" });

			const result = await directory.useReactivate(secondAdmin, 4);

			expect(result.error?.code).toBe("deactivated_identity");
		});

		it("refuses to reactivate an already active account", async () => {
			const result = await directory.useReactivate(secondAdmin, 4);

			expect(result.error?.code).toBe("already_active");
		});
	});

	describe("creating", () => {
		it("creates a user with roles the actor outranks", async () => {
			const result = await directory.useCreate(secondAdmin, {
				status: "pending",
				roles: ["member"],
				displayName: "New hire",
			});

			expect(result.ok).toBe(true);
			expect(result.data?.displayName).toBe("New hire");
		});

		it("lets an owner create another admin", async () => {
			const result = await directory.useCreate(otherOwner, {
				status: "pending",
				roles: ["admin"],
			});

			expect(result.ok).toBe(true);
		});

		it("defaults a new user to pending", async () => {
			const result = await directory.useCreate(secondAdmin, {
				status: "pending",
				roles: [],
			});

			expect(result.data?.status).toBe("pending");
		});

		it("surfaces a duplicate email from the repository", async () => {
			const first = await directory.useCreate(secondAdmin, {
				status: "pending",
				roles: [],
				email: "dup@example.com",
			});
			expect(first.ok).toBe(true);

			const second = await directory.useCreate(secondAdmin, {
				status: "pending",
				roles: [],
				email: "dup@example.com",
			});

			expect(second.ok).toBe(false);
			expect(second.error?.code).toBe("already_active");
		});
	});

	describe("granting an already held role", () => {
		it("is idempotent", async () => {
			const result = await directory.useAddRole(otherOwner, 2, "admin");

			expect(result.ok).toBe(true);
			expect(result.data?.roles.filter((role) => role === "admin")).toHaveLength(1);
		});

		it("refuses to remove a role the user does not hold", async () => {
			const result = await directory.useRemoveRole(otherOwner, 4, "admin");

			expect(result.error?.code).toBe("invalid_input");
		});
	});
});
