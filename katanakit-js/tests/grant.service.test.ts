import { beforeEach, describe, expect, it } from "vitest";

import { AccessService, FlatAccessStrategy, useRegisterRole } from "@/core/services/access.service";
import { useGrantAwareCan } from "@/core/services/grant.service";
import type { Grant } from "@/schemas/grant.schema";

const expediente = { type: "expediente", id: 42 } as const;
const otro = { type: "expediente", id: 43 } as const;

// Isolated registry per test file: the module-level singleton is process-global.
const globals = AccessService.create();

function grant(partial: Partial<Grant> = {}): Grant {
	return { subjectId: 7, resource: expediente, role: "author", ...partial };
}

beforeEach(() => {
	globals.useResetRoles();
});

describe("useGrantAwareCan", () => {
	describe("global roles", () => {
		it("allows on the role alone, with no grants and no resolver", () => {
			const decision = useGrantAwareCan({
				subject: { id: 1, roles: ["owner"] },
				resource: expediente,
				capability: "system:admin",
				access: globals,
			});

			expect(decision).toEqual({ allowed: true, source: "role" });
		});

		it("denies when neither a role nor a grant covers it", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "content:create",
				access: globals,
			});

			expect(decision).toEqual({ allowed: false, source: "none" });
		});

		it("checks the global role before any grant, so it wins", () => {
			const decision = useGrantAwareCan({
				subject: { id: 1, roles: ["editor"] },
				resource: expediente,
				capability: "content:edit:any",
				useGrants: () => [grant({ role: "guest" })],
				access: globals,
			});

			expect(decision.source).toBe("role");
		});
	});

	describe("resource grants", () => {
		it("allows through a grant and reports which role carried it", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "content:create",
				useGrants: () => [grant({ role: "author" })],
				access: globals,
			});

			expect(decision).toEqual({ allowed: true, source: "grant", via: "author" });
		});

		it("does not let one resource's grant leak onto another", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: otro,
				capability: "content:create",
				useGrants: () => [grant({ role: "author" })],
				access: globals,
			});

			expect(decision.allowed).toBe(false);
		});

		it("does not let a grant on one resource type leak onto another", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: { type: "invoice", id: 42 },
				capability: "content:create",
				useGrants: () => [grant({ role: "author" })],
				access: globals,
			});

			expect(decision.allowed).toBe(false);
		});

		it("matches ids across string and number without a mismatch surprise", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: { type: "expediente", id: "42" },
				capability: "content:create",
				useGrants: () => [grant({ role: "author" })],
				access: globals,
			});

			expect(decision.allowed).toBe(true);
		});

		it("fails closed when no resolver is supplied", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: ["member"] },
				resource: expediente,
				capability: "content:create",
				access: globals,
			});

			expect(decision).toEqual({ allowed: false, source: "none" });
		});

		it("reuses a deployment role registered for the domain", () => {
			globals.useRegisterRole({
				slug: "lector",
				label: "Lector",
				rank: 5,
				capabilities: ["expediente:read"],
			});

			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "expediente:read",
				useGrants: () => [grant({ role: "lector" })],
				access: globals,
			});

			expect(decision).toEqual({ allowed: true, source: "grant", via: "lector" });
		});

		it("skips a grant naming a role this deployment never registered", () => {
			// A row left behind by an earlier deployment must deny, not throw —
			// one stale share should not take a route down.
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "content:create",
				useGrants: () => [grant({ role: "retired-role" })],
				access: globals,
			});

			expect(decision).toEqual({ allowed: false, source: "none" });
		});

		it("still honours a valid grant after skipping a stale one", () => {
			globals.useRegisterRole({
				slug: "lector",
				label: "Lector",
				rank: 5,
				capabilities: ["expediente:read"],
			});

			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "expediente:read",
				useGrants: () => [grant({ role: "retired-role" }), grant({ role: "lector" })],
				access: globals,
			});

			expect(decision).toEqual({ allowed: true, source: "grant", via: "lector" });
		});
	});

	describe("expiry", () => {
		const now = new Date("2026-01-01T12:00:00.000Z");

		it("ignores a grant whose deadline has passed", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "content:create",
				useGrants: () => [grant({ expiresAt: "2025-12-31T23:59:59.000Z" })],
				now,
				access: globals,
			});

			expect(decision.allowed).toBe(false);
		});

		it("honours a grant whose deadline is still ahead", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "content:create",
				useGrants: () => [grant({ expiresAt: "2026-06-01T00:00:00.000Z" })],
				now,
				access: globals,
			});

			expect(decision.allowed).toBe(true);
		});

		it("treats an unreadable deadline as expired, not as open", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "content:create",
				useGrants: () => [grant({ expiresAt: "not-a-date" })],
				now,
				access: globals,
			});

			expect(decision.allowed).toBe(false);
		});

		it("skips the expired grant and still honours a live one", () => {
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "content:create",
				useGrants: () => [
					grant({ role: "guest", expiresAt: "2020-01-01T00:00:00.000Z" }),
					grant({ role: "author" }),
				],
				now,
				access: globals,
			});

			expect(decision).toEqual({ allowed: true, source: "grant", via: "author" });
		});
	});

	describe("strategy interplay", () => {
		it("reads grants through the flat strategy when that is the active one", () => {
			const flat = AccessService.create(new FlatAccessStrategy());
			// `author` under the flat strategy grants exactly what it lists, so
			// publishing is refused even though the hierarchy would allow it.
			const decision = useGrantAwareCan({
				subject: { id: 7, roles: [] },
				resource: expediente,
				capability: "content:publish",
				useGrants: () => [grant({ role: "author" })],
				access: flat,
			});

			expect(decision.allowed).toBe(false);
		});
	});
});
