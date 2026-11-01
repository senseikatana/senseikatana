import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { useAddKey, useCreateKeyRecord, useEmptyVault } from "@/core/services/keyvault.service.js";
import {
	useDecryptVault,
	useEncryptVault,
	useLoadVaultFile,
	useSaveVaultFile,
} from "@/infrastructure/vault/vault.store.js";
import type { VaultData } from "@/types/index.js";

const PASSPHRASE = "correct horse battery staple";

function makeVault(): VaultData {
	const record = useCreateKeyRecord({
		provider: "openai",
		label: "ci",
		secret: "sk-1234567890abcdef1234",
	});
	if (!record.ok) throw new Error("fixture failed");
	return useAddKey(useEmptyVault(), record.data);
}

describe("VaultStore", () => {
	let dir: string;

	beforeEach(async () => {
		dir = await mkdtemp(join(tmpdir(), "katanakit-keys-"));
	});

	afterEach(async () => {
		await rm(dir, { recursive: true, force: true });
	});

	it("should round-trip a vault payload through encryption", async () => {
		// Arrange
		const data = makeVault();

		// Act
		const encrypted = await useEncryptVault(data, PASSPHRASE);
		const decrypted = encrypted.ok ? await useDecryptVault(encrypted.data, PASSPHRASE) : encrypted;

		// Assert
		expect(encrypted.ok).toBe(true);
		expect(decrypted.ok).toBe(true);
		if (!decrypted.ok) return;
		expect(decrypted.data.keys).toHaveLength(1);
		expect(decrypted.data.keys[0].secret).toBe("sk-1234567890abcdef1234");
	});

	it("should not leak the secret into the envelope", async () => {
		// Arrange
		const data = makeVault();

		// Act
		const encrypted = await useEncryptVault(data, PASSPHRASE);

		// Assert
		expect(encrypted.ok).toBe(true);
		if (!encrypted.ok) return;
		expect(encrypted.data).not.toContain("sk-1234567890abcdef1234");
	});

	it("should return unauthorized when the passphrase is wrong", async () => {
		// Arrange
		const encrypted = await useEncryptVault(makeVault(), PASSPHRASE);
		if (!encrypted.ok) throw new Error("fixture failed");

		// Act
		const decrypted = await useDecryptVault(encrypted.data, "wrong passphrase");

		// Assert
		expect(decrypted.ok).toBe(false);
		expect(decrypted.error.status).toBe(401);
	});

	it("should return unauthorized when the ciphertext is tampered", async () => {
		// Arrange
		const encrypted = await useEncryptVault(makeVault(), PASSPHRASE);
		if (!encrypted.ok) throw new Error("fixture failed");
		const envelope = JSON.parse(encrypted.data) as {
			cipher: { data: string };
		};
		const bytes = Buffer.from(envelope.cipher.data, "base64");
		bytes[0] = bytes[0] ^ 0xff;
		envelope.cipher.data = bytes.toString("base64");

		// Act
		const decrypted = await useDecryptVault(JSON.stringify(envelope), PASSPHRASE);

		// Assert
		expect(decrypted.ok).toBe(false);
		expect(decrypted.error.status).toBe(401);
	});

	it("should return not found for a missing vault file", async () => {
		// Arrange
		const path = join(dir, "missing.enc.json");

		// Act
		const loaded = await useLoadVaultFile(path, PASSPHRASE);

		// Assert
		expect(loaded.ok).toBe(false);
		expect(loaded.error.status).toBe(404);
	});

	it("should persist and reopen a vault file", async () => {
		// Arrange
		const path = join(dir, "vault.enc.json");
		const data = makeVault();

		// Act
		const saved = await useSaveVaultFile(path, data, PASSPHRASE);
		const loaded = await useLoadVaultFile(path, PASSPHRASE);

		// Assert
		expect(saved.ok).toBe(true);
		expect(loaded.ok).toBe(true);
		if (!loaded.ok) return;
		expect(loaded.data.keys[0].id).toBe(data.keys[0].id);
	});

	it("should write the vault file with owner-only permissions", async () => {
		// Arrange
		const path = join(dir, "vault.enc.json");

		// Act
		const saved = await useSaveVaultFile(path, makeVault(), PASSPHRASE);
		const stats = saved.ok ? await stat(path) : undefined;

		// Assert
		expect(saved.ok).toBe(true);
		expect(stats?.mode & 0o777).toBe(0o600);
	});

	it("should refuse to encrypt an invalid vault payload", async () => {
		// Arrange
		const invalid = { version: 1 } as unknown as VaultData;

		// Act
		const encrypted = await useEncryptVault(invalid, PASSPHRASE);

		// Assert
		expect(encrypted.ok).toBe(false);
		expect(encrypted.error.status).toBe(400);
	});

	it("should refuse to encrypt with an empty passphrase", async () => {
		// Arrange
		const data = makeVault();

		// Act
		const encrypted = await useEncryptVault(data, "");

		// Assert
		expect(encrypted.ok).toBe(false);
		expect(encrypted.error.status).toBe(400);
	});

	it("should report non-JSON payloads without touching crypto", async () => {
		// Arrange
		const garbage = "not json at all";

		// Act
		const decrypted = await useDecryptVault(garbage, PASSPHRASE);

		// Assert
		expect(decrypted.ok).toBe(false);
		expect(decrypted.error.status).toBe(400);
	});
});
