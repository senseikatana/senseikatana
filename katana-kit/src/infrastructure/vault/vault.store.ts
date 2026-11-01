import { useTryJsonParse } from "@/core/services/result.service.js";
import { EncryptedVaultSchema, VaultDataSchema } from "@/schemas/keyvault.schema.js";
import type { SafeResult, VaultData } from "@/types/index.js";

/**
 * Scrypt parameters. Stored inside the encrypted envelope (see
 * `VaultKdfSchema`) so a future cost bump can still open old files; `maxmem`
 * must stay above `128 * N * r` or Node refuses to derive the key.
 */
const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1, keylen: 32 } as const;
const SCRYPT_MAXMEM = 64 * 1024 * 1024;

/** AES-256-GCM nonce length, in bytes. */
const IV_LENGTH = 12;

/** Vault file permissions: readable by its owner only. */
const VAULT_MODE = 0o600;

/**
 * Encrypted vault persistence: scrypt key derivation + AES-256-GCM, versioned
 * envelope, atomic writes.
 *
 * This module owns all crypto and filesystem I/O for the key manager. Node
 * built-ins load through dynamic `import()` (the same idiom
 * `storage.service.ts` uses for `node:async_hooks`), so merely importing this
 * module stays browser- and SSR-safe and no key material exists outside the
 * two functions below.
 *
 * The vault file never leaves the machine: `keys export` re-encrypts the same
 * payload for backups, so a stolen backup is useless without the passphrase.
 *
 * @example
 * ```ts
 * import { useSaveVaultFile, useLoadVaultFile } from "katanakit-js/infrastructure";
 *
 * await useSaveVaultFile(path, vault, passphrase);
 * const loaded = await useLoadVaultFile(path, passphrase);
 * ```
 */
export class VaultStore {
	private static instance: VaultStore;

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): VaultStore {
		if (!VaultStore.instance) {
			VaultStore.instance = new VaultStore();
		}
		return VaultStore.instance;
	}

	/**
	 * Resolves the vault file location: `KATANAKITAI_VAULT` when set,
	 * otherwise `$XDG_CONFIG_HOME/katanakitai/vault.enc.json` (defaulting to
	 * `~/.config`).
	 *
	 * @returns The absolute vault file path.
	 */
	async useVaultPath(): Promise<string> {
		const { join } = await import("node:path");
		const { homedir } = await import("node:os");
		const override = process.env.KATANAKITAI_VAULT?.trim();
		if (override) return override;
		const configHome = process.env.XDG_CONFIG_HOME?.trim() || join(homedir(), ".config");
		return join(configHome, "katanakitai", "vault.enc.json");
	}

	/**
	 * Encrypts a vault payload into the on-disk envelope format.
	 *
	 * @param data - The decrypted payload (validated before sealing).
	 * @param passphrase - The passphrase the vault is sealed with.
	 * @returns `{ data, error, ok }` with the serialized envelope.
	 */
	async useEncryptVault(data: VaultData, passphrase: string): Promise<SafeResult<string>> {
		const validated = VaultDataSchema.safeParse(data);
		if (!validated.success) {
			return {
				data: null,
				error: {
					message: `[VaultStore] refusing to encrypt an invalid vault payload: ${validated.error.issues
						.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
						.join("; ")}`,
					status: 400,
					details: validated.error.issues,
				},
				ok: false,
			};
		}
		if (!passphrase) {
			return {
				data: null,
				error: { message: "[VaultStore] a non-empty passphrase is required", status: 400 },
				ok: false,
			};
		}

		try {
			const { createCipheriv, randomBytes } = await import("node:crypto");
			const salt = randomBytes(16);
			const iv = randomBytes(IV_LENGTH);
			const key = await this.useDeriveKey(passphrase, salt, SCRYPT_PARAMS);
			const cipher = createCipheriv("aes-256-gcm", key, iv);
			const plaintext = JSON.stringify(validated.data);
			const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
			const envelope = {
				version: 1,
				kdf: {
					name: "scrypt",
					salt: salt.toString("base64"),
					N: SCRYPT_PARAMS.N,
					r: SCRYPT_PARAMS.r,
					p: SCRYPT_PARAMS.p,
					keylen: SCRYPT_PARAMS.keylen,
				},
				cipher: {
					name: "aes-256-gcm",
					iv: iv.toString("base64"),
					tag: cipher.getAuthTag().toString("base64"),
					data: ciphertext.toString("base64"),
				},
			};
			return { data: JSON.stringify(envelope, null, 2), error: null, ok: true };
		} catch (error) {
			return {
				data: null,
				error: {
					message: `[VaultStore] encryption failed: ${error instanceof Error ? error.message : "unknown error"}`,
					status: 500,
				},
				ok: false,
			};
		}
	}

	/**
	 * Opens an envelope with a passphrase. A wrong passphrase and a tampered
	 * file both fail GCM authentication and are reported the same way — never
	 * say which one it was.
	 *
	 * @param payload - The serialized envelope.
	 * @param passphrase - The passphrase to open it with.
	 * @returns `{ data, error, ok }` with the decrypted payload.
	 */
	async useDecryptVault(payload: string, passphrase: string): Promise<SafeResult<VaultData>> {
		const parsed = useTryJsonParse(payload);
		if (!parsed.ok) {
			return {
				data: null,
				error: { message: "[VaultStore] vault file is not valid JSON", status: 400 },
				ok: false,
			};
		}
		const envelope = EncryptedVaultSchema.safeParse(parsed.data);
		if (!envelope.success) {
			return {
				data: null,
				error: {
					message: "[VaultStore] vault file does not match the expected envelope format",
					status: 400,
					details: envelope.error.issues,
				},
				ok: false,
			};
		}

		try {
			const { createDecipheriv } = await import("node:crypto");
			const { kdf, cipher } = envelope.data;
			const key = await this.useDeriveKey(passphrase, Buffer.from(kdf.salt, "base64"), {
				N: kdf.N,
				r: kdf.r,
				p: kdf.p,
				keylen: kdf.keylen,
			});
			const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(cipher.iv, "base64"));
			decipher.setAuthTag(Buffer.from(cipher.tag, "base64"));
			const plaintext = Buffer.concat([
				decipher.update(Buffer.from(cipher.data, "base64")),
				decipher.final(),
			]).toString("utf8");

			const decoded = useTryJsonParse(plaintext);
			if (!decoded.ok) {
				return {
					data: null,
					error: { message: "[VaultStore] decrypted payload is not valid JSON", status: 500 },
					ok: false,
				};
			}
			const data = VaultDataSchema.safeParse(decoded.data);
			if (!data.success) {
				return {
					data: null,
					error: {
						message: "[VaultStore] decrypted payload does not match the vault schema",
						status: 500,
						details: data.error.issues,
					},
					ok: false,
				};
			}
			return { data: data.data, error: null, ok: true };
		} catch {
			return {
				data: null,
				error: {
					message: "[VaultStore] cannot open the vault: wrong passphrase or corrupted file",
					status: 401,
				},
				ok: false,
			};
		}
	}

	/**
	 * Encrypts and writes the vault atomically (temp file + rename) with
	 * owner-only permissions, creating the parent directory when needed.
	 *
	 * @param path - Target file path.
	 * @param data - The payload to persist.
	 * @param passphrase - The passphrase to seal it with.
	 * @returns `{ data, error, ok }` with the written path.
	 */
	async useSaveVaultFile(
		path: string,
		data: VaultData,
		passphrase: string,
	): Promise<SafeResult<string>> {
		const encrypted = await this.useEncryptVault(data, passphrase);
		if (!encrypted.ok) return { data: null, error: encrypted.error, ok: false };

		try {
			const { mkdir, rename, writeFile, chmod } = await import("node:fs/promises");
			const { dirname } = await import("node:path");
			await mkdir(dirname(path), { recursive: true });
			const temp = `${path}.${process.pid}.tmp`;
			await writeFile(temp, encrypted.data, { encoding: "utf8", mode: VAULT_MODE });
			await chmod(temp, VAULT_MODE);
			await rename(temp, path);
			return { data: path, error: null, ok: true };
		} catch (error) {
			return {
				data: null,
				error: {
					message: `[VaultStore] cannot write vault file: ${error instanceof Error ? error.message : "unknown error"}`,
					status: 500,
				},
				ok: false,
			};
		}
	}

	/**
	 * Reads and opens a vault file. A missing file resolves with
	 * `error.status = 404` so callers can decide between "start fresh" and
	 * "fail loudly" without parsing error strings.
	 *
	 * @param path - The vault file path.
	 * @param passphrase - The passphrase to open it with.
	 * @returns `{ data, error, ok }` with the decrypted payload.
	 */
	async useLoadVaultFile(path: string, passphrase: string): Promise<SafeResult<VaultData>> {
		let payload: string;
		try {
			const { readFile } = await import("node:fs/promises");
			payload = await readFile(path, "utf8");
		} catch (error) {
			const code = (error as NodeJS.ErrnoException)?.code;
			return {
				data: null,
				error: {
					message:
						code === "ENOENT"
							? `[VaultStore] no vault at ${path}`
							: `[VaultStore] cannot read vault file: ${error instanceof Error ? error.message : "unknown error"}`,
					status: code === "ENOENT" ? 404 : 500,
				},
				ok: false,
			};
		}
		return this.useDecryptVault(payload, passphrase);
	}

	/** Derives the AES key from a passphrase with the given scrypt parameters. */
	private async useDeriveKey(
		passphrase: string,
		salt: Buffer,
		params: { N: number; r: number; p: number; keylen: number },
	): Promise<Buffer> {
		const { scrypt } = await import("node:crypto");
		return new Promise((resolve, reject) => {
			scrypt(
				passphrase,
				salt,
				params.keylen,
				{ N: params.N, r: params.r, p: params.p, maxmem: SCRYPT_MAXMEM },
				(error, key) => (error ? reject(error) : resolve(key)),
			);
		});
	}
}

/** Resolves the vault file location. See {@link VaultStore.useVaultPath}. */
export function useVaultPath(): Promise<string> {
	return VaultStore.getInstance().useVaultPath();
}

/** Encrypts a vault payload. See {@link VaultStore.useEncryptVault}. */
export function useEncryptVault(data: VaultData, passphrase: string): Promise<SafeResult<string>> {
	return VaultStore.getInstance().useEncryptVault(data, passphrase);
}

/** Opens an encrypted envelope. See {@link VaultStore.useDecryptVault}. */
export function useDecryptVault(
	payload: string,
	passphrase: string,
): Promise<SafeResult<VaultData>> {
	return VaultStore.getInstance().useDecryptVault(payload, passphrase);
}

/** Encrypts and writes the vault atomically. See {@link VaultStore.useSaveVaultFile}. */
export function useSaveVaultFile(
	path: string,
	data: VaultData,
	passphrase: string,
): Promise<SafeResult<string>> {
	return VaultStore.getInstance().useSaveVaultFile(path, data, passphrase);
}

/** Reads and opens a vault file. See {@link VaultStore.useLoadVaultFile}. */
export function useLoadVaultFile(path: string, passphrase: string): Promise<SafeResult<VaultData>> {
	return VaultStore.getInstance().useLoadVaultFile(path, passphrase);
}
