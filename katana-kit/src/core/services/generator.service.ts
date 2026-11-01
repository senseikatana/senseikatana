import type { ICryptoStrategy, IUuidStrategy } from "@/types/index.js";

/**
 * GeneratorService — Singleton facade for numeric ids, UUIDs, slugs, tokens
 * and PBKDF2 hashing.
 *
 * Applies the **Singleton** pattern (one shared instance via
 * {@link GeneratorService.getInstance}), the **Facade** pattern (one call per
 * generation concern, hiding `node:crypto` and `globalThis.crypto` details)
 * and the **Strategy** pattern: the exported {@link LazyNodeCryptoStrategy}
 * and {@link NativeUuidStrategy} are thin adapters that satisfy
 * {@link ICryptoStrategy} / {@link IUuidStrategy} while the implementation
 * stays in this class.
 *
 * Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
 * level `use*` functions below are thin wrappers kept for call-site ergonomics.
 * The auto-incrementing id counter is instance state, never a static.
 *
 * @example
 * ```ts
 * import { useUuid } from "katanakit-js";
 *
 * const id = useUuid();
 * // => "3b241101-e2bb-4d7a-8615-..."
 * ```
 */
export class GeneratorService {
	private static instance: GeneratorService;

	/** Auto-incrementing numeric id counter. */
	private counter = 0;

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): GeneratorService {
		if (!GeneratorService.instance) {
			GeneratorService.instance = new GeneratorService();
		}
		return GeneratorService.instance;
	}

	/**
	 * Returns the next auto-incrementing numeric id.
	 *
	 * @returns A monotonically increasing integer starting from `1`.
	 *
	 * @example
	 * ```ts
	 * import { useNumericId } from "katanakit-js";
	 *
	 * useNumericId(); // 1
	 * useNumericId(); // 2
	 * ```
	 */
	useNumericId(): number {
		return ++this.counter;
	}

	/**
	 * Generates a RFC 4122 v4 UUID string.
	 *
	 * Uses `globalThis.crypto.randomUUID` when available and falls back to a
	 * `Math.random`-based v4 template otherwise.
	 *
	 * @returns A RFC 4122 v4 UUID string.
	 *
	 * @example
	 * ```ts
	 * import { useUuid } from "katanakit-js";
	 *
	 * const id = useUuid();
	 * // => "3b241101-e2bb-4d7a-8615-..."
	 * ```
	 *
	 * @example
	 * ```ts
	 * import { NativeUuidStrategy } from "katanakit-js";
	 *
	 * const id = NativeUuidStrategy.useGenerate();
	 * // => "3b241101-e2bb-4d7a-8615-..."
	 * ```
	 */
	useUuid(): string {
		if (
			typeof globalThis.crypto !== "undefined" &&
			typeof globalThis.crypto.randomUUID === "function"
		) {
			return globalThis.crypto.randomUUID();
		}
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

	/**
	 * Converts a text string into a URL-friendly slug.
	 *
	 * @param text - The text to slugify. Must not be empty.
	 * @returns A lower-case, hyphen-separated slug with diacritics removed.
	 * @throws {Error} If `text` is empty or falsy.
	 *
	 * @example
	 * ```ts
	 * import { useSlugify } from "katanakit-js";
	 *
	 * useSlugify("Hello World!");      // "hello-world"
	 * useSlugify("  Café au Lait  ");  // "cafe-au-lait"
	 * ```
	 */
	useSlugify(text: string): string {
		if (!text) throw new Error("Text is required for slugify");

		return text
			.toString()
			.trim()
			.toLowerCase()
			.normalize("NFD")
			.replace(/\p{M}/gu, "")
			.replace(/\s+/g, "-")
			.replace(/[^\w-]+/g, "")
			.replace(/--+/g, "-")
			.replace(/^-+/, "")
			.replace(/-+$/, "");
	}

	/**
	 * Returns a cryptographically strong 6-digit numeric token (100000–999999).
	 *
	 * @returns A random 6-digit integer.
	 *
	 * @example
	 * ```ts
	 * import { useToken } from "katanakit-js";
	 *
	 * const code = useToken(); // e.g. 482916
	 * ```
	 */
	useToken(): number {
		if (typeof globalThis.crypto?.getRandomValues === "function") {
			const buffer = new Uint32Array(1);
			globalThis.crypto.getRandomValues(buffer);
			return 100000 + (buffer[0] % 900000);
		}
		return Math.floor(100000 + Math.random() * 900000);
	}

	/**
	 * Derives a PBKDF2-SHA512 hash of `plainText`.
	 * Returns `"salt:hashHex"`. Prefer a unique salt per secret.
	 *
	 * Implemented with a dynamic `import("node:crypto")` so it works in both
	 * CJS and pure ESM environments without a top-level `require`.
	 *
	 * **NOTE:** this is a one-way hash, not encryption. Do not rely on the fixed
	 * default salt for real password hashing; prefer scrypt/argon2id instead.
	 *
	 * @param plainText - The text to hash.
	 * @param salt - Optional hex salt. When omitted a random 16-byte salt is generated.
	 * @returns `"salt:hashHex"` — the salt and the 128-char hex digest joined by a colon.
	 *
	 * @example
	 * ```ts
	 * import { useHash } from "katanakit-js";
	 *
	 * const digest = await useHash("secret", "optional-salt");
	 * // => "optional-salt:<128 hex chars>"
	 * ```
	 *
	 * @example
	 * ```ts
	 * import { LazyNodeCryptoStrategy } from "katanakit-js";
	 *
	 * const digest = await LazyNodeCryptoStrategy.useHash("secret");
	 * // => "<32-char salt>:<128-char hex>"
	 * ```
	 */
	async useHash(plainText: string, salt?: string): Promise<string> {
		const cryptoModule = await import("node:crypto");
		// Supports both CJS and pure ESM environments.
		const cryptoInstance = cryptoModule.default ?? cryptoModule;

		const actualSalt = salt ?? cryptoInstance.randomBytes(16).toString("hex");

		const hash = await new Promise<string>((resolve, reject) => {
			cryptoInstance.pbkdf2(plainText, actualSalt, 100000, 64, "sha512", (err, derived) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(derived.toString("hex"));
			});
		});

		return `${actualSalt}:${hash}`;
	}

	/**
	 * Alias for {@link GeneratorService.useHash}.
	 *
	 * @param plainText - The text to hash.
	 * @param salt - Optional hex salt. When omitted a random 16-byte salt is generated.
	 * @returns `"salt:hashHex"`.
	 *
	 * @example
	 * ```ts
	 * import { usePbkdf2Hash } from "katanakit-js";
	 *
	 * const digest = await usePbkdf2Hash("secret");
	 * // => "<32-char salt>:<128-char hex>"
	 * ```
	 */
	async usePbkdf2Hash(plainText: string, salt?: string): Promise<string> {
		return this.useHash(plainText, salt);
	}
}

/**
 * Lazy Node.js `crypto` strategy for PBKDF2 hashing — thin adapter over
 * {@link GeneratorService.useHash} satisfying {@link ICryptoStrategy}.
 *
 * **NOTE:** this is a one-way hash, not encryption. Do not rely on the fixed
 * default salt for real password hashing; prefer scrypt/argon2id instead.
 *
 * @see {@link GeneratorService.useHash}
 */
export const LazyNodeCryptoStrategy: ICryptoStrategy = {
	/** Derives a PBKDF2-SHA512 hash asynchronously. See {@link GeneratorService.useHash}. */
	async useHash(plainText: string, salt?: string): Promise<string> {
		return GeneratorService.getInstance().useHash(plainText, salt);
	},
};

/**
 * Native UUID strategy using `globalThis.crypto.randomUUID`, with a fallback —
 * thin adapter over {@link GeneratorService.useUuid} satisfying {@link IUuidStrategy}.
 *
 * @see {@link GeneratorService.useUuid}
 */
export const NativeUuidStrategy: IUuidStrategy = {
	/** Generates a v4 UUID string. See {@link GeneratorService.useUuid}. */
	useGenerate(): string {
		return GeneratorService.getInstance().useUuid();
	},
};

/** Returns the next auto-incrementing numeric id. See {@link GeneratorService.useNumericId}. */
export function useNumericId(): number {
	return GeneratorService.getInstance().useNumericId();
}

/** Generates a RFC 4122 v4 UUID string. See {@link GeneratorService.useUuid}. */
export function useUuid(): string {
	return GeneratorService.getInstance().useUuid();
}

/** Converts a text string into a URL-friendly slug. See {@link GeneratorService.useSlugify}. */
export function useSlugify(text: string): string {
	return GeneratorService.getInstance().useSlugify(text);
}

/** Returns a cryptographically strong 6-digit numeric token. See {@link GeneratorService.useToken}. */
export function useToken(): number {
	return GeneratorService.getInstance().useToken();
}

/** Derives a PBKDF2-SHA512 hash of `plainText`. See {@link GeneratorService.useHash}. */
export async function useHash(plainText: string, salt?: string): Promise<string> {
	return GeneratorService.getInstance().useHash(plainText, salt);
}

/** Alias for {@link GeneratorService.useHash}. See {@link GeneratorService.usePbkdf2Hash}. */
export async function usePbkdf2Hash(plainText: string, salt?: string): Promise<string> {
	return GeneratorService.getInstance().usePbkdf2Hash(plainText, salt);
}
