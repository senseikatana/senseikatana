import { describe, expect, it } from "vitest";

import {
	useAddKey,
	useCreateKeyRecord,
	useEmptyVault,
	useFindKey,
	useListKeys,
	useMaskSecret,
	useProviderEnvName,
	useReplaceKey,
	useRevokeKey,
	useRotateKeySecret,
} from "@/core/services/keyvault.service.js";
import type { KeyRecord, VaultData } from "@/types/index.js";

function makeRecord(overrides: Partial<KeyRecord> = {}): KeyRecord {
	const now = new Date().toISOString();
	return {
		id: "key-1",
		provider: "openai",
		label: "ci",
		secret: "sk-1234567890abcdef1234",
		status: "active",
		createdAt: now,
		updatedAt: now,
		...overrides,
	};
}

describe("KeyVaultService", () => {
	it("should create an active key record with id and timestamps", () => {
		// Arrange
		const input = { provider: "openai", label: "ci", secret: "sk-abc" };

		// Act
		const result = useCreateKeyRecord(input);

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.id).toBeTruthy();
		expect(result.data.status).toBe("active");
		expect(result.data.createdAt).toBe(result.data.updatedAt);
	});

	it("should return error when secret is empty", () => {
		// Arrange
		const input = { provider: "openai", label: "ci", secret: "" };

		// Act
		const result = useCreateKeyRecord(input);

		// Assert
		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(400);
	});

	it("should return error when provider slug is invalid", () => {
		// Arrange
		const input = { provider: "Open AI!", label: "ci", secret: "sk-abc" };

		// Act
		const result = useCreateKeyRecord(input);

		// Assert
		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(400);
	});

	it("should rotate the secret while keeping the record id", () => {
		// Arrange
		const record = makeRecord();

		// Act
		const result = useRotateKeySecret(record, "sk-new-secret-9876543210");

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.id).toBe(record.id);
		expect(result.data.secret).toBe("sk-new-secret-9876543210");
	});

	it("should return conflict when rotating a revoked key", () => {
		// Arrange
		const record = makeRecord({ status: "revoked" });

		// Act
		const result = useRotateKeySecret(record, "sk-new-secret");

		// Assert
		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(409);
	});

	it("should mark a key as revoked", () => {
		// Arrange
		const record = makeRecord();

		// Act
		const revoked = useRevokeKey(record);

		// Assert
		expect(revoked.status).toBe("revoked");
		expect(revoked.id).toBe(record.id);
	});

	it("should mask a long secret keeping prefix and suffix", () => {
		// Arrange
		const secret = "sk-1234567890abcdef1234";

		// Act
		const masked = useMaskSecret(secret);

		// Assert
		expect(masked).toBe("sk-12345••••••••••1234");
		expect(masked).not.toContain("abcdef");
	});

	it("should mask a short secret completely", () => {
		// Arrange
		const secret = "sk-abc";

		// Act
		const masked = useMaskSecret(secret);

		// Assert
		expect(masked).toBe("••••••••••");
	});

	it("should list active keys newest first", () => {
		// Arrange
		const older = makeRecord({ id: "old", createdAt: "2026-01-01T00:00:00.000Z" });
		const newer = makeRecord({ id: "new", createdAt: "2026-06-01T00:00:00.000Z" });
		const data: VaultData = {
			...useEmptyVault(),
			keys: [older, newer],
		};

		// Act
		const listed = useListKeys(data);

		// Assert
		expect(listed.map((record) => record.id)).toEqual(["new", "old"]);
	});

	it("should hide revoked keys unless explicitly requested", () => {
		// Arrange
		const active = makeRecord({ id: "active" });
		const revoked = makeRecord({ id: "revoked", status: "revoked" });
		const data: VaultData = { ...useEmptyVault(), keys: [active, revoked] };

		// Act & Assert
		expect(useListKeys(data).map((record) => record.id)).toEqual(["active"]);
		expect(useListKeys(data, { includeRevoked: true }).map((record) => record.id)).toEqual([
			"active",
			"revoked",
		]);
	});

	it("should find a key by id and return undefined for unknown ids", () => {
		// Arrange
		const record = makeRecord();
		const data: VaultData = { ...useEmptyVault(), keys: [record] };

		// Act & Assert
		expect(useFindKey(data, record.id)).toBe(record);
		expect(useFindKey(data, "missing")).toBeUndefined();
	});

	it("should replace a record by id when adding it twice", () => {
		// Arrange
		const record = makeRecord();
		const updated = makeRecord({ label: "prod" });
		const data = useAddKey(useEmptyVault(), record);

		// Act
		const replaced = useReplaceKey(data, updated);

		// Assert
		expect(replaced.keys).toHaveLength(1);
		expect(replaced.keys[0].label).toBe("prod");
	});

	it("should resolve the conventional env name for known providers", () => {
		// Arrange & Act & Assert
		expect(useProviderEnvName("openai")).toBe("OPENAI_API_KEY");
		expect(useProviderEnvName("anthropic")).toBe("ANTHROPIC_API_KEY");
	});

	it("should fall back to a namespaced env name for unknown providers", () => {
		// Arrange & Act & Assert
		expect(useProviderEnvName("my-gateway")).toBe("KATANAKIT_KEY_MY_GATEWAY");
	});
});
