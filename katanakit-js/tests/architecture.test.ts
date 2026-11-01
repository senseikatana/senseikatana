import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
	useGetStorage,
	useRunStorageScope,
	useSetStorage,
} from "@/infrastructure/storage/storage.service";
import { useCreateStorageSignal } from "@/infrastructure/storage/storage-signal.service";

const SRC = fileURLToPath(new URL("../src", import.meta.url));

/** Recursively collects every `.ts` file under `dir`. */
function collectSources(dir: string): string[] {
	return readdirSync(dir).flatMap((entry) => {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) return collectSources(full);
		return full.endsWith(".ts") ? [full] : [];
	});
}

/**
 * Every module specifier `file` depends on: `from "x"`, side-effect
 * `import "x"`, dynamic `import("x")`, and single-quoted variants. A guard that
 * only understands one of those syntaxes would pass on code it should reject.
 */
function importedSpecifiers(file: string): string[] {
	return [...readFileSync(file, "utf8").matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)].map(
		(match) => match[1],
	);
}

/**
 * Every leaf module reachable from a barrel through its `export *` chain.
 * Resolving the graph on disk keeps the assertion independent of the test
 * runner's CommonJS interop, which collapses a pure `export *` barrel to a
 * single `default` key at runtime.
 */
function barrelReaches(entry: string, seen = new Set<string>()): Set<string> {
	if (seen.has(entry)) return seen;
	seen.add(entry);

	for (const specifier of readFileSync(entry, "utf8").matchAll(/export \* from\s+"([^"]+)"/g)) {
		const target = resolve(dirname(entry), specifier[1]).replace(/\.js$/, ".ts");
		const asFile = existsSync(target) ? target : join(target, "index.ts");
		if (existsSync(asFile)) barrelReaches(asFile, seen);
	}
	return seen;
}

describe("Hexagonal layering", () => {
	it("keeps core free of infrastructure imports", () => {
		const violations = collectSources(join(SRC, "core")).flatMap((file) =>
			importedSpecifiers(file)
				.filter((specifier) => specifier.includes("infrastructure"))
				.map((specifier) => `${relative(SRC, file)} imports ${specifier}`),
		);

		expect(violations).toEqual([]);
	});

	it("keeps framework adapters out of the main barrel", () => {
		const barrel = readFileSync(join(SRC, "index.ts"), "utf8");

		expect(barrel).not.toMatch(/adapters\//);
	});

	it("publishes every declared subpath from a real source entry", async () => {
		const { default: packageJson } = await import("../package.json", { with: { type: "json" } });
		const subpaths = Object.keys(packageJson.exports).filter(
			(subpath) => subpath !== "." && !subpath.endsWith(".css") && subpath !== "./package.json",
		);

		const missing = subpaths.filter((subpath) => {
			const target = join(SRC, subpath.replace(/^\.\//, ""), "index.ts");
			return !existsSync(target);
		});

		expect(missing).toEqual([]);
	});

	it("still publishes the storage-backed signal from the main barrel", async () => {
		const { useCreateStorageSignal } = await import("@/infrastructure/index.js");
		const reachable = barrelReaches(join(SRC, "index.ts"));

		// The declaring module must be in the `export *` graph, and the name
		// must be exported from exactly one module in it. An ambiguous
		// star-export is silently dropped by ESM, which is a breaking change
		// that still typechecks — so assert the binding, not just the file.
		expect([...reachable].map((file) => relative(SRC, file))).toContain(
			join("infrastructure", "storage", "storage-signal.service.ts"),
		);

		const providers = [...reachable].filter((file) =>
			/export\s+(?:const|function)\s+useCreateStorageSignal\b/.test(readFileSync(file, "utf8")),
		);

		expect(providers.map((file) => relative(SRC, file))).toEqual([
			join("infrastructure", "storage", "storage-signal.service.ts"),
		]);
		expect(typeof useCreateStorageSignal).toBe("function");
	});
});

describe("Storage-backed signals", () => {
	it("reads the stored value on creation", async () => {
		await useRunStorageScope(() => {
			useSetStorage("arch-test-token", { ok: true });

			const [read] = useCreateStorageSignal<{ ok: boolean }>("arch-test-token", { ok: false });

			expect(read()).toEqual({ ok: true });
		});
	});

	it("writes through to storage, not only to the in-memory signal", async () => {
		await useRunStorageScope(() => {
			const [read, write] = useCreateStorageSignal<{ ok: boolean }>(
				"arch-test-write",
				{ ok: false },
				"localStorage",
			);

			write({ ok: true });

			// Reading the signal back would pass even if the storage write were
			// deleted, so assert against storage itself.
			expect(useGetStorage<{ ok: boolean }>("arch-test-write")).toEqual({ ok: true });
			expect(read()).toEqual({ ok: true });
		});
	});

	it("supports the functional updater form", async () => {
		await useRunStorageScope(() => {
			useSetStorage("arch-test-counter", 1);
			const [, increment] = useCreateStorageSignal<number>("arch-test-counter", 0);

			increment((previous) => previous + 41);

			expect(useGetStorage<number>("arch-test-counter")).toBe(42);
		});
	});

	it("falls back to the provided value when the key is absent", async () => {
		await useRunStorageScope(() => {
			const [read] = useCreateStorageSignal("arch-test-missing", "fallback", "localStorage");

			expect(read()).toBe("fallback");
		});
	});
});
