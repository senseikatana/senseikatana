/**
 * Seed data example — deterministic users, products and orders with Faker,
 * written to JSON with the filesystem helpers.
 *
 * Run it:  bun run build && bun run examples/seed/seed-data.ts
 *
 * Everything is pinned (`useFakeSeed` + `useFakeSetDefaultRefDate`), so running
 * it twice produces identical files. Adapt the interfaces to your domain and
 * feed the arrays to your DB seeder (Prisma, Drizzle, raw SQL…).
 */
import {
	useEnsureDir,
	useFakeDate,
	useFakeEmail,
	useFakeFullName,
	useFakeList,
	useFakeNumber,
	useFakeSeed,
	useFakeSetDefaultRefDate,
	useFakeText,
	useFakeUuid,
	useGetDirname,
	useJoinPath,
	useReadJsonFile,
	useWriteJsonFile,
} from "katanakit-js";

interface SeedUser {
	id: string;
	fullName: string;
	email: string;
	createdAt: string;
}

interface SeedProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
}

interface SeedOrder {
	id: string;
	userId: string;
	productId: string;
	quantity: number;
	placedAt: string;
}

/** Lowercase lorem words → Title Case product names. */
function toTitleCase(value: string): string {
	return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

// ---------------------------------------------------------------------------
// 1. Pin the randomness: same seed + same ref date = reproducible data
await useFakeSeed(42);
await useFakeSetDefaultRefDate("2026-01-01");

// ---------------------------------------------------------------------------
// 2. Users — `useFakeList` calls the factory `count` times
const users: SeedUser[] = await useFakeList(async () => ({
	id: await useFakeUuid(),
	fullName: await useFakeFullName(),
	email: await useFakeEmail(),
	createdAt: (await useFakeDate("2024-01-01")).toISOString(),
}), 5);

// ---------------------------------------------------------------------------
// 3. Products — compose helpers into your own domain shape
const products: SeedProduct[] = await useFakeList(async () => ({
	id: await useFakeUuid(),
	name: toTitleCase(await useFakeText(2)),
	description: toTitleCase(await useFakeText(10)),
	price: await useFakeNumber(5, 250),
	stock: await useFakeNumber(0, 120),
}), 8);

// ---------------------------------------------------------------------------
// 4. Orders — the factory receives the index, handy for relations
const orders: SeedOrder[] = await useFakeList(async (index) => ({
	id: await useFakeUuid(),
	userId: users[index % users.length].id,
	productId: products[index % products.length].id,
	quantity: await useFakeNumber(1, 6),
	placedAt: (await useFakeDate("2025-01-01")).toISOString(),
}), 12);

// ---------------------------------------------------------------------------
// 5. Write the JSON files next to this module (`out/` is git-ignored)
const moduleDir = await useGetDirname(import.meta.url);
const outDir = process.argv[2] ?? (await useJoinPath(moduleDir, "out"));
await useEnsureDir(outDir);

const files: Array<[string, unknown]> = [
	["users.json", users],
	["products.json", products],
	["orders.json", orders],
];

for (const [name, data] of files) {
	const written = await useWriteJsonFile(await useJoinPath(outDir, name), data);
	if (!written.ok) {
		throw new Error(`[${written.error.code}] ${written.error.message}`);
	}
	console.log(`• ${name} → ${written.data}`);
}

// ---------------------------------------------------------------------------
// 6. Read one back (same Safe Result contract) and summarize
const check = await useReadJsonFile<SeedUser[]>(await useJoinPath(outDir, "users.json"));
console.log(
	check.ok
		? `• round-trip ok: ${check.data.length} users, ${products.length} products, ${orders.length} orders`
		: `• round-trip failed: ${check.error.code}`,
);
