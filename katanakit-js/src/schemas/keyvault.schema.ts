import { z } from "zod";

/**
 * KeyVault schemas — API key records, MCP server entries and the encrypted
 * vault envelope used by `src/infrastructure/vault/`.
 *
 * The vault payload is the single source of truth for what the key manager
 * stores; everything persisted goes through these schemas on the way in and on
 * the way out, so a tampered or legacy file fails loudly at the boundary
 * instead of leaking a half-parsed shape into the services.
 */

/** Lifecycle status of a stored API key. Revoked keys are kept for audit. */
export const KeyStatusSchema = z.enum(["active", "revoked"]);

/** Every status value, ordered from most to least permissive. */
export const KEY_STATUSES = ["active", "revoked"] as const;

/**
 * Provider slug: lowercase alphanumerics joined by `_`, `.` or `-`. The same
 * shape `AccessRoleSchema` enforces, so a provider id can never surprise a
 * downstream consumer with spaces or slashes.
 */
export const KeyProviderSchema = z
	.string()
	.min(1)
	.max(64)
	.regex(
		/^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/,
		"Provider slug must be lowercase alphanumerics joined by '_', '.' or '-'",
	);

/**
 * One API key as stored in the vault. `secret` only ever lives inside the
 * encrypted payload — presentation layers receive it masked unless the caller
 * explicitly asks to reveal it.
 */
export const KeyRecordSchema = z.object({
	id: z.string().min(1),
	provider: KeyProviderSchema,
	label: z.string().min(1).max(64),
	secret: z.string().min(1).max(4096),
	note: z.string().max(280).optional(),
	status: KeyStatusSchema,
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

/**
 * MCP server name. Restricted to characters that survive OpenCode's tool-name
 * normalization (`<server>_<tool>`, everything else becomes `_`), so two
 * differently-spelled names can never collapse into the same tool prefix.
 */
export const McpServerNameSchema = z
	.string()
	.min(1)
	.max(32)
	.regex(/^[a-z0-9][a-z0-9_-]*$/, "MCP server name must be lowercase alphanumerics, '_' or '-'");

/**
 * One MCP server. Mirrors the OpenCode `mcp.servers` contract: a `local`
 * server runs a command over stdio, a `remote` server is an absolute
 * Streamable HTTP URL. Credential values use `{env:NAME}` substitution — the
 * vault keeps the real secret, config files keep the reference.
 */
export const McpServerSchema = z
	.object({
		name: McpServerNameSchema,
		type: z.enum(["local", "remote"]),
		command: z.array(z.string().min(1)).optional(),
		url: z
			.string()
			.regex(/^https?:\/\/\S+$/, "Remote MCP servers need an absolute http(s) URL")
			.optional(),
		environment: z.record(z.string(), z.string()).optional(),
		headers: z.record(z.string(), z.string()).optional(),
		disabled: z.boolean().optional(),
	})
	.refine((server) => server.type !== "local" || (server.command?.length ?? 0) > 0, {
		message: "Local MCP servers need a non-empty command",
		path: ["command"],
	})
	.refine((server) => server.type !== "remote" || Boolean(server.url), {
		message: "Remote MCP servers need a url",
		path: ["url"],
	});

/** Decrypted vault payload — the complete state of the key manager. */
export const VaultDataSchema = z.object({
	version: z.literal(1),
	keys: z.array(KeyRecordSchema),
	mcpServers: z.array(McpServerSchema),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

/** Scrypt parameters stored alongside the ciphertext so they stay upgradeable. */
export const VaultKdfSchema = z.object({
	name: z.literal("scrypt"),
	salt: z.string().min(1),
	N: z.number().int().positive(),
	r: z.number().int().positive(),
	p: z.number().int().positive(),
	keylen: z.number().int().positive(),
});

/** AES-256-GCM envelope: IV and auth tag travel with the ciphertext. */
export const VaultCipherSchema = z.object({
	name: z.literal("aes-256-gcm"),
	iv: z.string().min(1),
	tag: z.string().min(1),
	data: z.string().min(1),
});

/**
 * Encrypted vault file as it exists on disk. Versioned so a future format can
 * migrate instead of guessing.
 */
export const EncryptedVaultSchema = z.object({
	version: z.literal(1),
	kdf: VaultKdfSchema,
	cipher: VaultCipherSchema,
});
