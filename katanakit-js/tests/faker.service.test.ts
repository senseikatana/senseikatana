import { describe, expect, it } from "vitest";

import {
	useFakeBoolean,
	useFakeCompanyName,
	useFakeDate,
	useFakeEmail,
	useFakeFirstName,
	useFakeFullName,
	useFakeLastName,
	useFakeList,
	useFakeNumber,
	useFakePhone,
	useFakeSeed,
	useFakeSetDefaultRefDate,
	useFakeText,
	useFakeUrl,
	useFakeUuid,
	useFakeVehicle,
} from "@/core/services/faker.service";
import { FakeVehicleSchema } from "@/schemas/faker.schema";

describe("faker.service", () => {
	it("generates deterministic values for a fixed seed", async () => {
		await useFakeSeed(42);
		const first = await useFakeUuid();
		await useFakeSeed(42);
		const second = await useFakeUuid();

		expect(first).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
		expect(second).toBe(first);
	});

	it("returns the seed it set and supports random-but-reproducible seeds", async () => {
		const fixed = await useFakeSeed(7);

		expect(fixed).toBe(7);

		const randomSeed = await useFakeSeed();
		expect(Number.isInteger(randomSeed)).toBe(true);

		const first = await useFakeUuid();
		await useFakeSeed(randomSeed);
		const replay = await useFakeUuid();

		expect(replay).toBe(first);
	});

	it("pins relative dates with a default reference date", async () => {
		const ref = await useFakeSetDefaultRefDate("2020-06-15");

		expect(ref.toISOString().slice(0, 10)).toBe("2020-06-15");

		await useFakeSeed(42);
		const date = await useFakeDate();

		expect(date.getTime()).toBeGreaterThanOrEqual(new Date("1970-01-01").getTime());
		expect(date.getTime()).toBeLessThanOrEqual(ref.getTime());

		await useFakeSetDefaultRefDate();
	});

	it("generates primitives with the expected shape", async () => {
		const [email, fullName, firstName, lastName, phone, company, url, text, flag] = await Promise.all(
			[
				useFakeEmail(),
				useFakeFullName(),
				useFakeFirstName(),
				useFakeLastName(),
				useFakePhone(),
				useFakeCompanyName(),
				useFakeUrl(),
				useFakeText(5),
				useFakeBoolean(),
			],
		);

		expect(email).toContain("@");
		expect(fullName.length).toBeGreaterThan(0);
		expect(firstName.length).toBeGreaterThan(0);
		expect(lastName.length).toBeGreaterThan(0);
		expect(phone.length).toBeGreaterThan(0);
		expect(company.length).toBeGreaterThan(0);
		expect(url).toMatch(/^https?:\/\//);
		expect(text.split(" ")).toHaveLength(5);
		expect(typeof flag).toBe("boolean");
	});

	it("keeps numbers inside the requested range", async () => {
		const values = await useFakeList(() => useFakeNumber(10, 20), 25);

		expect(values).toHaveLength(25);
		for (const value of values) {
			expect(value).toBeGreaterThanOrEqual(10);
			expect(value).toBeLessThanOrEqual(20);
		}
	});

	it("generates dates within bounds", async () => {
		const from = new Date("2020-01-01");
		const to = new Date("2020-12-31");

		const date = await useFakeDate(from, to);

		expect(date).toBeInstanceOf(Date);
		expect(date.getTime()).toBeGreaterThanOrEqual(from.getTime());
		expect(date.getTime()).toBeLessThanOrEqual(to.getTime());
	});

	it("generates schema-valid vehicles", async () => {
		const vehicle = await useFakeVehicle();

		expect(FakeVehicleSchema.safeParse(vehicle).success).toBe(true);
	});

	it("rejects invalid list counts", async () => {
		await expect(useFakeList(() => 1, -1)).rejects.toThrow(/non-negative integer/);
	});
});
