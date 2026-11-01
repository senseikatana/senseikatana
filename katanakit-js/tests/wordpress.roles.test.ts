import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	defineWordPressConfig,
	useWpAssignRole,
	useWpAsSubject,
	useWpAuditRole,
	useWpDefineRoles,
	useWpGetRole,
	useWpGetUsersByRole,
	useWpRegisterRole,
	useWpResetRoles,
	useWpRoles,
	useWpSyncRoles,
	useWpUnassignRole,
} from "@/adapters/wordpress/wordpress.service";
import {
	useCan,
	useResetRoles as useResetAccessRoles,
	useRoles as useAccessRoles,
} from "@/core/services/access.service";
import type { WpRoleDefinition, WpUser } from "@/types/index";

/** A customer role over an `order` custom post type. */
const customer: WpRoleDefinition = {
	slug: "store_customer",
	label: "Store Customer",
	rank: 5,
	capabilities: ["orders:read:own", "orders:update:own"],
	wpCapabilities: ["read", "read_order", "edit_order"],
};

/** A site administrator mapped onto the top of the toolkit ladder. */
const manager: WpRoleDefinition = {
	slug: "store_manager",
	label: "Store Manager",
	rank: 1,
	capabilities: ["orders:read:any", "orders:update:any"],
	wpCapabilities: ["edit_others_orders", "read_private_orders"],
};

function jsonResponse(payload: unknown, status = 200): Response {
	return new Response(JSON.stringify(payload), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

function user(id: number, roles: string[], capabilities: Record<string, boolean> = {}): WpUser {
	return { id, roles, capabilities } as WpUser;
}

beforeEach(() => {
	defineWordPressConfig({ baseUrl: "https://example.com" });
	useWpResetRoles();
	useResetAccessRoles();
});

afterEach(() => {
	vi.unstubAllGlobals();
	useWpResetRoles();
	useResetAccessRoles();
});

describe("wordpress roles — declaration", () => {
	it("registers roles and returns copies ordered by rank", () => {
		useWpDefineRoles([customer, manager]);

		const roles = useWpRoles();
		expect(roles.map((role) => role.slug)).toEqual(["store_manager", "store_customer"]);

		// Mutating what a caller holds must not reach the registry.
		roles[0].capabilities.push("orders:delete:any");
		expect(useWpGetRole("store_manager")?.capabilities).toEqual([
			"orders:read:any",
			"orders:update:any",
		]);
	});

	it("replaces a role when the same slug is declared twice", () => {
		useWpRegisterRole(customer);
		useWpRegisterRole({ ...customer, label: "Renamed" });

		expect(useWpRoles()).toHaveLength(1);
		expect(useWpGetRole("store_customer")?.label).toBe("Renamed");
	});

	it("throws on an invalid definition instead of storing it", () => {
		expect(() => useWpRegisterRole(customer)).not.toThrow();
		expect(() =>
			useWpDefineRoles([{ ...customer, capabilities: ["not_namespaced"] as never }]),
		).toThrow(/Invalid role definitions/);
	});

	it("leaves the registry untouched when one definition in the batch is invalid", () => {
		expect(() =>
			useWpDefineRoles([customer, { ...manager, rank: -1 } as never, { ...manager, rank: 2 }]),
		).toThrow(/Invalid role definitions/);

		expect(useWpRoles()).toEqual([]);
	});
});

describe("wordpress roles — access service bridge", () => {
	it("publishes declarations so useCan understands WordPress role slugs", () => {
		useWpDefineRoles([customer, manager]);
		useWpSyncRoles();

		expect(useCan({ id: 7, roles: ["store_customer"] }, "orders:read:own")).toBe(true);
		expect(useCan({ id: 7, roles: ["store_customer"] }, "orders:read:any")).toBe(false);
		// rank 5 also inherits guest; rank 1 inherits everything less privileged.
		expect(useCan({ id: 8, roles: ["store_manager"] }, "orders:read:own")).toBe(true);
		expect(useWpGetRole("store_customer")).toBeDefined();
		expect(useAccessRoles().some((role) => role.slug === "store_customer")).toBe(true);
	});

	it("throws on an unsynced role instead of silently denying", () => {
		useWpDefineRoles([customer]);
		expect(() => useCan({ id: 7, roles: ["store_customer"] }, "orders:read:own")).toThrow(
			/Unknown access role/,
		);
	});

	it("mirrors a WordPress user's roles into an access subject", () => {
		const subject = useWpAsSubject(user(42, ["store_customer", "subscriber"]));

		expect(subject).toEqual({ id: 42, roles: ["store_customer", "subscriber"] });
		// A copy, so the caller cannot rewrite the user object through it.
		subject.roles.push("store_manager");
		expect(user(42, ["store_customer"]).roles).toEqual(["store_customer"]);
	});
});

describe("wordpress roles — assignment", () => {
	it("adds the role and confirms it landed", async () => {
		const fetchMock = vi.fn().mockImplementation((url: string) => {
			if (url.includes("_fields")) return Promise.resolve(jsonResponse(user(42, ["subscriber"])));
			return Promise.resolve(jsonResponse(user(42, ["subscriber", "store_customer"])));
		});
		vi.stubGlobal("fetch", fetchMock);

		const result = await useWpAssignRole(42, "store_customer");

		expect(result.ok).toBe(true);
		if (result.ok) expect(result.data.roles).toEqual(["subscriber", "store_customer"]);

		const [updateUrl, updateInit] = fetchMock.mock.calls[1];
		expect(updateUrl).toContain("/users/42");
		expect(JSON.parse(updateInit.body as string)).toEqual({
			roles: ["subscriber", "store_customer"],
		});
	});

	it("fails with 422 when WordPress silently drops the role", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockImplementation(() => Promise.resolve(jsonResponse(user(42, ["subscriber"])))),
		);

		const result = await useWpAssignRole(42, "store_customer");

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.status).toBe(422);
			expect(result.error.message).toContain("store_customer");
			expect(result.error.message).toContain("REST API cannot");
		}
	});

	it("does not rewrite the profile when the role is already held", async () => {
		const fetchMock = vi
			.fn()
			.mockImplementation(() => Promise.resolve(jsonResponse(user(42, ["store_customer"]))));
		vi.stubGlobal("fetch", fetchMock);

		const result = await useWpAssignRole(42, "store_customer");

		expect(result.ok).toBe(true);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it("rejects a malformed role slug without calling WordPress", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);

		const result = await useWpAssignRole(42, "Store Customer");

		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.status).toBe(400);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("removes the role, keeping the others", async () => {
		const fetchMock = vi.fn().mockImplementation((url: string) => {
			if (url.includes("_fields")) {
				return Promise.resolve(jsonResponse(user(42, ["subscriber", "store_customer"])));
			}
			return Promise.resolve(jsonResponse(user(42, ["subscriber"])));
		});
		vi.stubGlobal("fetch", fetchMock);

		const result = await useWpUnassignRole(42, "store_customer");

		expect(result.ok).toBe(true);
		const [, updateInit] = fetchMock.mock.calls[1];
		expect(JSON.parse(updateInit.body as string)).toEqual({ roles: ["subscriber"] });
	});

	it("is a no-op when the user does not hold the role", async () => {
		const fetchMock = vi
			.fn()
			.mockImplementation(() => Promise.resolve(jsonResponse(user(42, ["subscriber"]))));
		vi.stubGlobal("fetch", fetchMock);

		const result = await useWpUnassignRole(42, "store_customer");

		expect(result.ok).toBe(true);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});
});

describe("wordpress roles — lookup and audit", () => {
	it("asks for context=edit so roles come back", async () => {
		const fetchMock = vi
			.fn()
			.mockImplementation(() => Promise.resolve(jsonResponse([user(42, ["store_customer"])])));
		vi.stubGlobal("fetch", fetchMock);

		const result = await useWpGetUsersByRole("store_customer");

		expect(result.ok).toBe(true);
		const [url] = fetchMock.mock.calls[0];
		expect(url).toContain("roles=store_customer");
		expect(url).toContain("context=edit");
	});

	it("verifies a role whose holders report every declared capability", async () => {
		useWpDefineRoles([customer]);
		vi.stubGlobal(
			"fetch",
			vi
				.fn()
				.mockImplementation(() =>
					Promise.resolve(
						jsonResponse([
							user(1, ["store_customer"], { read: true, read_order: true, edit_order: true }),
							user(2, ["store_customer"], { read: true, read_order: true, edit_order: true }),
						]),
					),
				),
		);

		const result = await useWpAuditRole("store_customer");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.data.status).toBe("verified");
			expect(result.data.holders).toBe(2);
			expect(result.data.missing).toEqual([]);
			expect(result.data.undeclared).toEqual([]);
		}
	});

	it("reports a capability only some holders have as partial", async () => {
		useWpDefineRoles([customer]);
		vi.stubGlobal(
			"fetch",
			vi
				.fn()
				.mockImplementation(() =>
					Promise.resolve(
						jsonResponse([
							user(1, ["store_customer"], { read: true, read_order: true, edit_order: true }),
							user(2, ["store_customer"], { read: true, read_order: true }),
						]),
					),
				),
		);

		const result = await useWpAuditRole("store_customer");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.data.status).toBe("partial");
			expect(result.data.granted).toEqual(["read", "read_order"]);
			expect(result.data.missing).toEqual(["edit_order"]);
		}
	});

	it("flags capabilities the site grants but the declaration omits", async () => {
		useWpDefineRoles([customer]);
		vi.stubGlobal(
			"fetch",
			vi.fn().mockImplementation(() =>
				Promise.resolve(
					jsonResponse([
						user(1, ["store_customer"], {
							read: true,
							read_order: true,
							edit_order: true,
							delete_orders: true,
						}),
					]),
				),
			),
		);

		const result = await useWpAuditRole("store_customer");

		expect(result.ok).toBe(true);
		if (result.ok) expect(result.data.undeclared).toEqual(["delete_orders"]);
	});

	it("never claims verified when nobody holds the role", async () => {
		useWpDefineRoles([customer]);
		vi.stubGlobal(
			"fetch",
			vi.fn().mockImplementation(() => Promise.resolve(jsonResponse([]))),
		);

		const result = await useWpAuditRole("store_customer");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.data.status).toBe("unverifiable");
			expect(result.data.holders).toBe(0);
			expect(result.data.missing).toEqual(customer.wpCapabilities);
		}
	});

	it("propagates the failure when the audit cannot read holders", async () => {
		useWpDefineRoles([customer]);
		vi.stubGlobal(
			"fetch",
			vi.fn().mockImplementation(() => Promise.resolve(jsonResponse({}, 403))),
		);

		const result = await useWpAuditRole("store_customer");

		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.status).toBe(403);
	});
});
