import type { FakeVehicle } from "@/types/index.js";

// ============================================================
// Faker facade — generic fake data for tests, seeds and forms.
// `@faker-js/faker` is an OPTIONAL peer dependency: it loads through
// dynamic `import()` on first call, so it never enters the initial
// bundle and consumers who don't use it don't install it.
// ============================================================

type FakerModule = typeof import("@faker-js/faker");
type Faker = FakerModule["faker"];

/**
 * FakerService — generic fake data for tests, seeds and forms.
 *
 * Applies the **Singleton** pattern (one shared instance via
 * {@link FakerService.getInstance}) and the **Facade** pattern: each public
 * method hides the lazy `@faker-js/faker` load behind one call. The optional
 * peer dependency is imported through dynamic `import()` on first use, so it
 * never enters the initial bundle and consumers who don't use it don't
 * install it.
 *
 * Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the
 * module level `useFake*` functions below are thin wrappers kept for
 * call-site ergonomics.
 *
 * @example
 * ```ts
 * import { useFakeSeed, useFakeUuid } from "katanakit-js";
 *
 * const seed = await useFakeSeed(); // random, but loggable/replayable
 * await useFakeSeed(seed);          // replays the same sequence
 * await useFakeUuid();
 * ```
 */
export class FakerService {
	private static instance: FakerService;

	/** Cached lazy faker instance (reset on failure so a later call can retry). */
	private fakerPromise: Promise<Faker> | null = null;

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): FakerService {
		if (!FakerService.instance) {
			FakerService.instance = new FakerService();
		}
		return FakerService.instance;
	}

	/** Loads faker on first use, or rejects with an actionable install error. */
	private async load(): Promise<Faker> {
		if (!this.fakerPromise) {
			this.fakerPromise = import("@faker-js/faker")
				.then((module) => module.faker)
				.catch((error: unknown) => {
					this.fakerPromise = null;
					throw new Error(
						'[Faker] The optional peer dependency "@faker-js/faker" is not installed. Run "bun add @faker-js/faker" (or "npm install @faker-js/faker").',
						{ cause: error },
					);
				});
		}
		return this.fakerPromise;
	}

	/**
	 * Seeds the faker instance for reproducible output, or rolls a new random seed.
	 *
	 * The sequence depends on the seed, the number of calls made since it was set
	 * and the faker major version — keep the call order stable for stable output.
	 *
	 * @param seed - Optional numeric seed. Omit it to generate a fresh random seed
	 * (log the returned value and pass it back later to replay the exact run).
	 * @returns The seed that was set.
	 *
	 * @example
	 * ```ts
	 * import { useFakeSeed, useFakeUuid } from "katanakit-js";
	 *
	 * const seed = await useFakeSeed(); // random, but loggable/replayable
	 * await useFakeSeed(seed);          // replays the same sequence
	 * await useFakeUuid();
	 * ```
	 */
	async useFakeSeed(seed?: number): Promise<number> {
		const faker = await this.load();
		return seed === undefined ? faker.seed() : faker.seed(seed);
	}

	/**
	 * Pins the reference date faker uses for relative date helpers, so
	 * date-dependent output stays reproducible next to {@link useFakeSeed}.
	 *
	 * @param refDate - Static date (`Date`, ISO string or epoch ms) or a factory
	 * returning a fresh `Date` on every call. Omit it to reset to the current time.
	 * @returns The reference date now in effect.
	 *
	 * @example
	 * ```ts
	 * import { useFakeSeed, useFakeSetDefaultRefDate, useFakeDate } from "katanakit-js";
	 *
	 * await useFakeSeed(42);
	 * await useFakeSetDefaultRefDate("2026-01-01");
	 * await useFakeDate(); // reproducible between 1970-01-01 and 2026-01-01
	 * ```
	 */
	async useFakeSetDefaultRefDate(refDate?: Date | number | string | (() => Date)): Promise<Date> {
		const faker = await this.load();
		faker.setDefaultRefDate(refDate);
		return faker.defaultRefDate();
	}

	/**
	 * Generates a v4 UUID.
	 *
	 * @returns A random UUID string.
	 *
	 * @example
	 * ```ts
	 * const id = await useFakeUuid();
	 * ```
	 */
	async useFakeUuid(): Promise<string> {
		const faker = await this.load();
		return faker.string.uuid();
	}

	/**
	 * Generates a fake email address.
	 *
	 * @returns An email address.
	 */
	async useFakeEmail(): Promise<string> {
		const faker = await this.load();
		return faker.internet.email();
	}

	/**
	 * Generates a fake full name.
	 *
	 * @returns A full name, e.g. `"Ada Lovelace"`.
	 */
	async useFakeFullName(): Promise<string> {
		const faker = await this.load();
		return faker.person.fullName();
	}

	/**
	 * Generates a fake first name.
	 *
	 * @returns A first name.
	 */
	async useFakeFirstName(): Promise<string> {
		const faker = await this.load();
		return faker.person.firstName();
	}

	/**
	 * Generates a fake last name.
	 *
	 * @returns A last name.
	 */
	async useFakeLastName(): Promise<string> {
		const faker = await this.load();
		return faker.person.lastName();
	}

	/**
	 * Generates a fake phone number.
	 *
	 * @returns A phone number string.
	 */
	async useFakePhone(): Promise<string> {
		const faker = await this.load();
		return faker.phone.number();
	}

	/**
	 * Generates a fake company name.
	 *
	 * @returns A company name.
	 */
	async useFakeCompanyName(): Promise<string> {
		const faker = await this.load();
		return faker.company.name();
	}

	/**
	 * Generates a fake URL.
	 *
	 * @returns An absolute URL.
	 */
	async useFakeUrl(): Promise<string> {
		const faker = await this.load();
		return faker.internet.url();
	}

	/**
	 * Generates lorem-ipsum text.
	 *
	 * @param words - Number of words (default: `12`).
	 * @returns A space-separated string of words.
	 */
	async useFakeText(words = 12): Promise<string> {
		const faker = await this.load();
		return faker.lorem.words(words);
	}

	/**
	 * Generates an integer within an inclusive range.
	 *
	 * @param min - Lower bound (default: `0`).
	 * @param max - Upper bound (default: `100`).
	 * @returns A random integer between `min` and `max`.
	 *
	 * @example
	 * ```ts
	 * const age = await useFakeNumber(18, 65);
	 * ```
	 */
	async useFakeNumber(min = 0, max = 100): Promise<number> {
		const faker = await this.load();
		return faker.number.int({ max, min });
	}

	/**
	 * Generates a random boolean.
	 *
	 * @returns `true` or `false`.
	 */
	async useFakeBoolean(): Promise<boolean> {
		const faker = await this.load();
		return faker.datatype.boolean();
	}

	/**
	 * Generates a random date within an optional range.
	 *
	 * @param from - Lower bound (default: `1970-01-01`).
	 * @param to - Upper bound (default: faker's reference date, see
	 * {@link useFakeSetDefaultRefDate} — the current time when unset).
	 * @returns A `Date` instance.
	 *
	 * @example
	 * ```ts
	 * const hiredAt = await useFakeDate(new Date("2020-01-01"), new Date("2025-12-31"));
	 * ```
	 */
	async useFakeDate(from?: Date | number | string, to?: Date | number | string): Promise<Date> {
		const faker = await this.load();
		return faker.date.between({
			from: from ?? "1970-01-01",
			to: to ?? faker.defaultRefDate(),
		});
	}

	/**
	 * Generates a generic fake vehicle (brand, model, type, fuel, color, vin, plate).
	 *
	 * @returns A {@link FakeVehicle} object.
	 *
	 * @example
	 * ```ts
	 * const vehicle = await useFakeVehicle();
	 * // { brand: "Jeep", model: "Wrangler", plate: "HJ47FNP", ... }
	 * ```
	 */
	async useFakeVehicle(): Promise<FakeVehicle> {
		const faker = await this.load();
		return {
			brand: faker.vehicle.manufacturer(),
			color: faker.vehicle.color(),
			fuel: faker.vehicle.fuel(),
			model: faker.vehicle.model(),
			plate: faker.vehicle.vrm(),
			type: faker.vehicle.type(),
			vin: faker.vehicle.vin(),
		};
	}

	/**
	 * Builds an array of fake items from a factory (sync or async).
	 *
	 * @typeParam T - Item type produced by the factory.
	 * @param factory - Called once per item; receives the zero-based index.
	 * @param count - Number of items to generate (non-negative integer).
	 * @returns A promise resolving to the generated array.
	 *
	 * @example
	 * ```ts
	 * const vehicles = await useFakeList(() => useFakeVehicle(), 5);
	 * const relations = await useFakeList((index) => ({ user: users[index % users.length] }), 10);
	 * ```
	 */
	async useFakeList<T>(factory: (index: number) => T | Promise<T>, count: number): Promise<T[]> {
		if (!Number.isInteger(count) || count < 0) {
			throw new Error("[Faker] count must be a non-negative integer.");
		}
		return Promise.all(Array.from({ length: count }, (_, index) => factory(index)));
	}
}

/** Seeds faker for reproducible output. See {@link FakerService.useFakeSeed}. */
export async function useFakeSeed(seed?: number): Promise<number> {
	return FakerService.getInstance().useFakeSeed(seed);
}

/** Pins faker's reference date. See {@link FakerService.useFakeSetDefaultRefDate}. */
export async function useFakeSetDefaultRefDate(
	refDate?: Date | number | string | (() => Date),
): Promise<Date> {
	return FakerService.getInstance().useFakeSetDefaultRefDate(refDate);
}

/** Generates a v4 UUID. See {@link FakerService.useFakeUuid}. */
export async function useFakeUuid(): Promise<string> {
	return FakerService.getInstance().useFakeUuid();
}

/** Generates a fake email address. See {@link FakerService.useFakeEmail}. */
export async function useFakeEmail(): Promise<string> {
	return FakerService.getInstance().useFakeEmail();
}

/** Generates a fake full name. See {@link FakerService.useFakeFullName}. */
export async function useFakeFullName(): Promise<string> {
	return FakerService.getInstance().useFakeFullName();
}

/** Generates a fake first name. See {@link FakerService.useFakeFirstName}. */
export async function useFakeFirstName(): Promise<string> {
	return FakerService.getInstance().useFakeFirstName();
}

/** Generates a fake last name. See {@link FakerService.useFakeLastName}. */
export async function useFakeLastName(): Promise<string> {
	return FakerService.getInstance().useFakeLastName();
}

/** Generates a fake phone number. See {@link FakerService.useFakePhone}. */
export async function useFakePhone(): Promise<string> {
	return FakerService.getInstance().useFakePhone();
}

/** Generates a fake company name. See {@link FakerService.useFakeCompanyName}. */
export async function useFakeCompanyName(): Promise<string> {
	return FakerService.getInstance().useFakeCompanyName();
}

/** Generates a fake URL. See {@link FakerService.useFakeUrl}. */
export async function useFakeUrl(): Promise<string> {
	return FakerService.getInstance().useFakeUrl();
}

/** Generates lorem-ipsum text. See {@link FakerService.useFakeText}. */
export async function useFakeText(words = 12): Promise<string> {
	return FakerService.getInstance().useFakeText(words);
}

/** Generates an integer within an inclusive range. See {@link FakerService.useFakeNumber}. */
export async function useFakeNumber(min = 0, max = 100): Promise<number> {
	return FakerService.getInstance().useFakeNumber(min, max);
}

/** Generates a random boolean. See {@link FakerService.useFakeBoolean}. */
export async function useFakeBoolean(): Promise<boolean> {
	return FakerService.getInstance().useFakeBoolean();
}

/** Generates a random date within an optional range. See {@link FakerService.useFakeDate}. */
export async function useFakeDate(
	from?: Date | number | string,
	to?: Date | number | string,
): Promise<Date> {
	return FakerService.getInstance().useFakeDate(from, to);
}

/** Generates a generic fake vehicle. See {@link FakerService.useFakeVehicle}. */
export async function useFakeVehicle(): Promise<FakeVehicle> {
	return FakerService.getInstance().useFakeVehicle();
}

/** Builds an array of fake items from a factory. See {@link FakerService.useFakeList}. */
export async function useFakeList<T>(
	factory: (index: number) => T | Promise<T>,
	count: number,
): Promise<T[]> {
	return FakerService.getInstance().useFakeList(factory, count);
}
