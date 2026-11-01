import { KeyRecordSchema, VaultDataSchema } from "@/schemas/keyvault.schema.js";
import type { KeyRecord, KeyRecordInput, SafeResult, VaultData } from "@/types/index.js";

/**
 * Provider slugs whose conventional environment variable name is known.
 * Unknown providers fall back to `KATANAKIT_KEY_<PROVIDER>`, so the mapping is
 * open-ended — a new provider never needs a code change here to work.
 */
export const PROVIDER_ENV_NAMES: Readonly<Record<string, string>> = {
	anthropic: "ANTHROPIC_API_KEY",
	cohere: "COHERE_API_KEY",
	google: "GEMINI_API_KEY",
	groq: "GROQ_API_KEY",
	mistral: "MISTRAL_API_KEY",
	openai: "OPENAI_API_KEY",
	openrouter: "OPENROUTER_API_KEY",
	perplexity: "PERPLEXITY_API_KEY",
};

/** Number of bullet characters that stand in for a masked secret. */
const MASK_BULLETS = "•".repeat(10);

/**
 * KeyVaultService — Singleton facade for API key record lifecycle.
 *
 * Applies the **Singleton** pattern (one shared instance via
 * {@link KeyVaultService.getInstance}) and the **Facade** pattern: every public
 * method returns the `{ data, error, ok }` union from {@link SafeResult} (or a
 * plain value when it cannot fail) and never throws.
 *
 * The methods are pure: they take records and vault payloads as values and
 * return new ones. Persistence and encryption live in
 * `src/infrastructure/vault/vault.store.ts`, so this service stays free of
 * runtime I/O per `CONTRIBUTING.md` and is trivially testable.
 *
 * Security posture: a secret is only ever returned in full by an explicit
 * reveal call site (the CLI's `keys reveal`). Everything else — lists, logs,
 * config previews — goes through {@link KeyVaultService.useMaskSecret}.
 *
 * @example
 * ```ts
 * import { useCreateKeyRecord, useMaskSecret } from "katanakit-js";
 *
 * const result = useCreateKeyRecord({ provider: "openai", label: "ci", secret: "sk-…" });
 * if (result.ok) console.log(useMaskSecret(result.data.secret)); // sk-••••••••••••1234
 * ```
 */
export class KeyVaultService {
	private static instance: KeyVaultService;

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): KeyVaultService {
		if (!KeyVaultService.instance) {
			KeyVaultService.instance = new KeyVaultService();
		}
		return KeyVaultService.instance;
	}

	/**
	 * Creates a validated key record with a fresh id and timestamps.
	 *
	 * @param input - Provider, label and secret (plus an optional note).
	 * @returns `{ data, error, ok }` — `error.status = 400` on validation failure.
	 */
	useCreateKeyRecord(input: KeyRecordInput): SafeResult<KeyRecord> {
		const now = new Date().toISOString();
		const parsed = KeyRecordSchema.safeParse({
			id: globalThis.crypto.randomUUID(),
			provider: input.provider,
			label: input.label,
			secret: input.secret,
			note: input.note,
			status: "active",
			createdAt: now,
			updatedAt: now,
		});
		if (!parsed.success) {
			return {
				data: null,
				error: {
					message: `[KeyVaultService] invalid key record: ${parsed.error.issues
						.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
						.join("; ")}`,
					status: 400,
					details: parsed.error.issues,
				},
				ok: false,
			};
		}
		return { data: parsed.data, error: null, ok: true };
	}

	/**
	 * Rotates a key's secret, keeping the record (and its id) stable so every
	 * config that references it stays valid. Revoked keys cannot rotate: the
	 * caller must create a new record instead.
	 *
	 * @param record - The record to rotate.
	 * @param secret - The replacement secret.
	 * @returns `{ data, error, ok }` — `error.status = 409` when revoked.
	 */
	useRotateKeySecret(record: KeyRecord, secret: string): SafeResult<KeyRecord> {
		if (record.status === "revoked") {
			return {
				data: null,
				error: {
					message: `[KeyVaultService] key "${record.id}" is revoked — create a new key instead of rotating`,
					status: 409,
				},
				ok: false,
			};
		}
		const parsed = KeyRecordSchema.safeParse({
			...record,
			secret,
			updatedAt: new Date().toISOString(),
		});
		if (!parsed.success) {
			return {
				data: null,
				error: {
					message: `[KeyVaultService] invalid secret: ${parsed.error.issues
						.map((issue) => issue.message)
						.join("; ")}`,
					status: 400,
					details: parsed.error.issues,
				},
				ok: false,
			};
		}
		return { data: parsed.data, error: null, ok: true };
	}

	/**
	 * Marks a key as revoked. The record is kept for audit; revoking is
	 * idempotent and cannot fail.
	 *
	 * @param record - The record to revoke.
	 * @returns The revoked record.
	 */
	useRevokeKey(record: KeyRecord): KeyRecord {
		return { ...record, status: "revoked", updatedAt: new Date().toISOString() };
	}

	/**
	 * Masks a secret for display: the first 8 and last 4 characters survive on
	 * long secrets (matching the `freellma••••••••••a8e9` style), short secrets
	 * become bullets only. A mask must never leak enough to brute-force.
	 *
	 * @param secret - The secret to mask.
	 * @returns The masked form.
	 */
	useMaskSecret(secret: string): string {
		if (secret.length > 16) {
			return `${secret.slice(0, 8)}${MASK_BULLETS}${secret.slice(-4)}`;
		}
		return MASK_BULLETS;
	}

	/**
	 * Finds a key record by id.
	 *
	 * @param data - The vault payload to search.
	 * @param id - The record id.
	 * @returns The record, or `undefined`.
	 */
	useFindKey(data: VaultData, id: string): KeyRecord | undefined {
		return data.keys.find((record) => record.id === id);
	}

	/**
	 * Lists key records, newest first.
	 *
	 * @param data - The vault payload.
	 * @param options - `includeRevoked` also returns revoked records.
	 * @returns The matching records.
	 */
	useListKeys(data: VaultData, options: { includeRevoked?: boolean } = {}): KeyRecord[] {
		const records = options.includeRevoked
			? data.keys
			: data.keys.filter((r) => r.status === "active");
		return [...records].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	}

	/**
	 * Appends a record to the vault payload, touching `updatedAt`.
	 *
	 * @param data - The current vault payload.
	 * @param record - The record to append.
	 * @returns The updated payload.
	 */
	useAddKey(data: VaultData, record: KeyRecord): VaultData {
		return this.useTouch({ ...data, keys: [...data.keys, record] });
	}

	/**
	 * Replaces the record with the same id (or appends it when absent), touching
	 * `updatedAt`.
	 *
	 * @param data - The current vault payload.
	 * @param record - The replacement record.
	 * @returns The updated payload.
	 */
	useReplaceKey(data: VaultData, record: KeyRecord): VaultData {
		const keys = data.keys.some((entry) => entry.id === record.id)
			? data.keys.map((entry) => (entry.id === record.id ? record : entry))
			: [...data.keys, record];
		return this.useTouch({ ...data, keys });
	}

	/**
	 * Returns an empty, schema-valid vault payload.
	 *
	 * @returns A fresh vault payload.
	 */
	useEmptyVault(): VaultData {
		const now = new Date().toISOString();
		return VaultDataSchema.parse({
			version: 1,
			keys: [],
			mcpServers: [],
			createdAt: now,
			updatedAt: now,
		});
	}

	/**
	 * Resolves the conventional environment variable name for a provider, e.g.
	 * `openai` → `OPENAI_API_KEY`. Unknown providers get a stable
	 * `KATANAKIT_KEY_<PROVIDER>` name so generated configs stay predictable.
	 *
	 * @param provider - The provider slug.
	 * @returns The environment variable name.
	 */
	useProviderEnvName(provider: string): string {
		return (
			PROVIDER_ENV_NAMES[provider] ??
			`KATANAKIT_KEY_${provider.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`
		);
	}

	/** Touches `updatedAt` on a payload after a mutation. */
	private useTouch(data: VaultData): VaultData {
		return { ...data, updatedAt: new Date().toISOString() };
	}
}

/** Creates a validated key record. See {@link KeyVaultService.useCreateKeyRecord}. */
export function useCreateKeyRecord(input: KeyRecordInput): SafeResult<KeyRecord> {
	return KeyVaultService.getInstance().useCreateKeyRecord(input);
}

/** Rotates a key's secret. See {@link KeyVaultService.useRotateKeySecret}. */
export function useRotateKeySecret(record: KeyRecord, secret: string): SafeResult<KeyRecord> {
	return KeyVaultService.getInstance().useRotateKeySecret(record, secret);
}

/** Marks a key as revoked. See {@link KeyVaultService.useRevokeKey}. */
export function useRevokeKey(record: KeyRecord): KeyRecord {
	return KeyVaultService.getInstance().useRevokeKey(record);
}

/** Masks a secret for display. See {@link KeyVaultService.useMaskSecret}. */
export function useMaskSecret(secret: string): string {
	return KeyVaultService.getInstance().useMaskSecret(secret);
}

/** Finds a key record by id. See {@link KeyVaultService.useFindKey}. */
export function useFindKey(data: VaultData, id: string): KeyRecord | undefined {
	return KeyVaultService.getInstance().useFindKey(data, id);
}

/** Lists key records, newest first. See {@link KeyVaultService.useListKeys}. */
export function useListKeys(data: VaultData, options?: { includeRevoked?: boolean }): KeyRecord[] {
	return KeyVaultService.getInstance().useListKeys(data, options);
}

/** Appends a record to the vault payload. See {@link KeyVaultService.useAddKey}. */
export function useAddKey(data: VaultData, record: KeyRecord): VaultData {
	return KeyVaultService.getInstance().useAddKey(data, record);
}

/** Replaces a record in the vault payload. See {@link KeyVaultService.useReplaceKey}. */
export function useReplaceKey(data: VaultData, record: KeyRecord): VaultData {
	return KeyVaultService.getInstance().useReplaceKey(data, record);
}

/** Returns an empty vault payload. See {@link KeyVaultService.useEmptyVault}. */
export function useEmptyVault(): VaultData {
	return KeyVaultService.getInstance().useEmptyVault();
}

/** Resolves the env var name for a provider. See {@link KeyVaultService.useProviderEnvName}. */
export function useProviderEnvName(provider: string): string {
	return KeyVaultService.getInstance().useProviderEnvName(provider);
}
