import "reflect-metadata";

import { type ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
	KATANA_KIT_OPTIONS,
	KatanaKitModule,
	KatanaKitService,
	KatanaLogger,
	useRequireCapability,
} from "@/adapters/nestjs/index";
import { useResetRoles } from "@/core/services/access.service";
import type { AccessSubject } from "@/types/index";

/** Minimal ExecutionContext: only `switchToHttp().getRequest()` is used. */
function contextFor(request: unknown): ExecutionContext {
	return {
		switchToHttp: () => ({ getRequest: () => request }),
	} as unknown as ExecutionContext;
}

afterEach(() => {
	vi.restoreAllMocks();
	useResetRoles();
});

describe("KatanaKitModule", () => {
	it("builds a global dynamic module with the service and the options token", () => {
		const options = { apis: {} };
		const dynamic = KatanaKitModule.forRoot(options);

		expect(dynamic.module).toBe(KatanaKitModule);
		expect(dynamic.global).toBe(true);
		expect(dynamic.exports).toContain(KatanaKitService);
		expect(dynamic.providers).toEqual(
			expect.arrayContaining([
				KatanaKitService,
				expect.objectContaining({ provide: KATANA_KIT_OPTIONS, useValue: options }),
			]),
		);
	});

	it("can opt out of global registration", () => {
		expect(KatanaKitModule.forRoot({ global: false }).global).toBe(false);
	});

	it("defaults to global with no options", () => {
		expect(KatanaKitModule.forRoot().global).toBe(true);
	});
});

describe("KatanaKitService", () => {
	it("registers APIs on module init and builds URLs through the facade", () => {
		const kit = new KatanaKitService({
			apis: {
				dummyjson: {
					baseUri: "https://dummyjson.com",
					endpoints: { productById: "/products/:id" },
				},
			},
		});

		kit.onModuleInit();

		expect(Object.keys(kit.useGetApis())).toContain("dummyjson");
		expect(kit.useBuildUrl("dummyjson", "productById", { params: { id: 7 } })).toBe(
			"https://dummyjson.com/products/7",
		);
	});

	it("initializes once even if Nest calls the hook again", () => {
		const kit = new KatanaKitService({ apis: {} });

		expect(() => {
			kit.onModuleInit();
			kit.onModuleInit();
		}).not.toThrow();
	});

	it("accepts a service constructed without options", () => {
		const kit = new KatanaKitService();
		expect(() => kit.onModuleInit()).not.toThrow();
	});
});

describe("useRequireCapability", () => {
	const Guard = useRequireCapability<{ account?: AccessSubject }>(
		"content:publish",
		(request) => request.account ?? null,
	);

	it("rejects anonymous requests with 401", () => {
		const guard = new Guard();
		expect(() => guard.canActivate(contextFor({}))).toThrow(UnauthorizedException);
	});

	it("rejects authenticated subjects without the capability", () => {
		const guard = new Guard();
		expect(() => guard.canActivate(contextFor({ account: { id: 3, roles: ["member"] } }))).toThrow(
			ForbiddenException,
		);
	});

	it("allows subjects whose role grants the capability", () => {
		const guard = new Guard();
		expect(guard.canActivate(contextFor({ account: { id: 5, roles: ["owner"] } }))).toBe(true);
	});

	it("fails closed when the subject is malformed", () => {
		const guard = new Guard();
		expect(() =>
			guard.canActivate(contextFor({ account: { id: 9 } as unknown as AccessSubject })),
		).toThrow(ForbiddenException);
	});
});

describe("KatanaLogger", () => {
	it("forwards every level to the matching console method", () => {
		const log = vi.spyOn(console, "log").mockImplementation(() => {});
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const error = vi.spyOn(console, "error").mockImplementation(() => {});

		const logger = new KatanaLogger();
		logger.log("boot");
		logger.debug("cache miss", "CacheService");
		logger.verbose("details");
		logger.warn("careful");
		logger.error(new Error("boom"), "stack");

		expect(log).toHaveBeenCalledWith("boot");
		expect(log).toHaveBeenCalledWith("cache miss", ["CacheService"]);
		expect(log).toHaveBeenCalledWith("details");
		expect(warn).toHaveBeenCalledWith("careful");
		expect(error).toHaveBeenCalledWith("boom", ["stack"]);
	});

	it("tables data through the native console", () => {
		const table = vi.spyOn(console, "table").mockImplementation(() => {});

		new KatanaLogger().table([{ id: 1 }]);

		expect(table).toHaveBeenCalledWith([{ id: 1 }]);
	});
});
