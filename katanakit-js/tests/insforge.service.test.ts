import { afterEach, describe, expect, it, vi } from "vitest";

const createClientMock = vi.fn();
const createAdminClientMock = vi.fn();

vi.mock("@insforge/sdk", () => ({
	createClient: (...args: unknown[]) => createClientMock(...args),
	createAdminClient: (...args: unknown[]) => createAdminClientMock(...args),
}));

import {
	defineInsforgeConfig,
	useIfDelete,
	useIfGetPublicUrl,
	useIfInsert,
	useIfListObjects,
	useIfSelect,
	useIfUpdate,
	useIfUpload,
} from "@/adapters/insforge/insforge.service";

/** Builds a thenable builder that records chained calls. */
function createBuilder(outcome: { data: unknown; error: unknown }): Record<string, unknown> {
	const builder: Record<string, unknown> = {};
	const chain = (): Record<string, unknown> => builder;
	for (const method of ["select", "eq", "order", "limit", "range"]) {
		builder[method] = vi.fn(chain);
	}
	builder.then = (
		onFulfilled: (value: { data: unknown; error: unknown }) => unknown,
		onRejected?: (reason: unknown) => unknown,
	): Promise<unknown> => Promise.resolve(outcome).then(onFulfilled, onRejected);
	return builder;
}

function createStorageBucket() {
	const bucket = {
		upload: vi.fn().mockResolvedValue({ data: { key: "a.png" }, error: null }),
		download: vi.fn().mockResolvedValue({ data: new Blob(["x"]), error: null }),
		remove: vi.fn().mockResolvedValue({ data: { message: "deleted" }, error: null }),
		list: vi.fn().mockResolvedValue({ data: { objects: [] }, error: null }),
		getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: "https://cdn/a.png" }, error: null }),
	};
	return bucket;
}

function setupClient(outcome: { data: unknown; error: unknown }) {
	const builder = createBuilder(outcome);
	const table = {
		select: vi.fn(() => builder),
		insert: vi.fn(() => builder),
		update: vi.fn(() => builder),
		delete: vi.fn(() => builder),
	};
	const database = {
		from: vi.fn(() => table),
		rpc: vi.fn(() => builder),
		schema: vi.fn(),
	};
	const bucket = createStorageBucket();
	const client = {
		database,
		storage: { from: vi.fn(() => bucket) },
		functions: { invoke: vi.fn().mockResolvedValue({ data: { ok: true }, error: null }) },
	};
	createClientMock.mockReturnValue(client);
	return { client, database, table, builder, bucket };
}

afterEach(() => {
	vi.clearAllMocks();
});

describe("insforge.service", () => {
	describe("when not configured", () => {
		it("returns a status 0 config error", async () => {
			const result = await useIfSelect({ table: "posts" });
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.status).toBe(0);
				expect(result.error.message).toMatch(/Not configured/);
			}
		});
	});

	describe("defineInsforgeConfig", () => {
		it("throws on invalid config", () => {
			expect(() => defineInsforgeConfig({ baseUrl: "" })).toThrow(/Invalid config/);
		});

		it("creates a browser client with anonKey and schema", () => {
			defineInsforgeConfig({
				baseUrl: "https://x.insforge.app",
				anonKey: "anon",
				schema: "analytics",
			});
			expect(createClientMock).toHaveBeenCalledWith({
				baseUrl: "https://x.insforge.app",
				anonKey: "anon",
				db: { schema: "analytics" },
			});
			expect(createAdminClientMock).not.toHaveBeenCalled();
		});

		it("prefers the admin client when apiKey is provided", () => {
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", apiKey: "secret" });
			expect(createAdminClientMock).toHaveBeenCalledWith({
				baseUrl: "https://x.insforge.app",
				apiKey: "secret",
			});
		});
	});

	describe("defineInsforgeConfig", () => {
		it("registers the config and returns declared methods bound to `this.config`", () => {
			const facade = defineInsforgeConfig({
				baseUrl: "https://x.insforge.app",
				anonKey: "anon",
				readKey: function () {
					return this.config.anonKey;
				},
			});

			expect(createClientMock).toHaveBeenCalledWith({
				baseUrl: "https://x.insforge.app",
				anonKey: "anon",
			});
			expect(facade.config.baseUrl).toBe("https://x.insforge.app");
			expect(facade.readKey()).toBe("anon");
		});

		it("validates the config", () => {
			expect(() => defineInsforgeConfig({ baseUrl: "" })).toThrow(/Invalid config/);
		});
	});

	describe("useIfSelect", () => {
		it("returns rows and applies filters, order, limit and offset", async () => {
			const { table, builder } = setupClient({ data: [{ id: 1 }], error: null });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const result = await useIfSelect<{ id: number }>({
				table: "posts",
				filters: { author_id: 7 },
				order: { column: "created_at", ascending: false },
				limit: 10,
				offset: 20,
			});

			expect(result.ok).toBe(true);
			if (result.ok) expect(result.data).toEqual([{ id: 1 }]);
			expect(table.select).toHaveBeenCalledWith("*");
			expect(builder.eq).toHaveBeenCalledWith("author_id", 7);
			expect(builder.order).toHaveBeenCalledWith("created_at", { ascending: false });
			expect(builder.limit).toHaveBeenCalledWith(10);
			expect(builder.range).toHaveBeenCalledWith(20, 29);
		});

		it("rejects an empty table without touching the client", async () => {
			const { database } = setupClient({ data: [], error: null });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const result = await useIfSelect({ table: "" });

			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.status).toBe(400);
			expect(database.from).not.toHaveBeenCalled();
		});

		it("maps SDK errors to a Safe Result", async () => {
			setupClient({ data: null, error: { message: "RLS denied", statusCode: 403 } });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const result = await useIfSelect({ table: "posts" });

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.status).toBe(403);
				expect(result.error.message).toBe("RLS denied");
			}
		});
	});

	describe("writes", () => {
		it("inserts rows and returns created rows", async () => {
			const { table } = setupClient({ data: [{ id: 9 }], error: null });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const result = await useIfInsert("posts", [{ title: "Hi" }]);

			expect(result.ok).toBe(true);
			expect(table.insert).toHaveBeenCalledWith([{ title: "Hi" }]);
		});

		it("refuses to insert an empty batch", async () => {
			const { table } = setupClient({ data: [], error: null });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const result = await useIfInsert("posts", []);

			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.status).toBe(400);
			expect(table.insert).not.toHaveBeenCalled();
		});

		it("refuses mass updates without filters", async () => {
			const { table } = setupClient({ data: [], error: null });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const result = await useIfUpdate({ table: "posts", filters: {} }, { title: "x" });

			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.status).toBe(400);
			expect(table.update).not.toHaveBeenCalled();
		});

		it("updates with filters", async () => {
			const { builder } = setupClient({ data: [{ id: 1 }], error: null });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const result = await useIfUpdate({ table: "posts", filters: { id: 1 } }, { title: "x" });

			expect(result.ok).toBe(true);
			expect(builder.eq).toHaveBeenCalledWith("id", 1);
		});

		it("deletes with filters", async () => {
			const { builder } = setupClient({ data: [{ id: 2 }], error: null });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const result = await useIfDelete({ table: "posts", filters: { id: 2 } });

			expect(result.ok).toBe(true);
			expect(builder.eq).toHaveBeenCalledWith("id", 2);
		});
	});

	describe("storage", () => {
		it("uploads a file", async () => {
			const { bucket } = setupClient({ data: null, error: null });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const result = await useIfUpload({ bucket: "media", path: "a.png" }, new Blob(["x"]));

			expect(result.ok).toBe(true);
			expect(bucket.upload).toHaveBeenCalledWith("a.png", expect.any(Blob));
		});

		it("lists objects and builds public URLs", async () => {
			setupClient({ data: null, error: null });
			defineInsforgeConfig({ baseUrl: "https://x.insforge.app", anonKey: "anon" });

			const listed = await useIfListObjects("media", { prefix: "2024/" });
			const publicUrl = useIfGetPublicUrl({ bucket: "media", path: "a.png" });

			expect(listed.ok).toBe(true);
			expect(publicUrl.ok).toBe(true);
			if (publicUrl.ok) expect(publicUrl.data.publicUrl).toBe("https://cdn/a.png");
		});
	});
});
