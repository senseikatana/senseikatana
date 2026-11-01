#!/usr/bin/env node
/**
 * kai — command line front door of katanakitAI, the KatanaKit AI toolbox.
 *
 * Manages the local encrypted vault (API keys), the MCP server registry and
 * the per-agent configuration output ("auto configuration" + "manual
 * connection"), so a coding agent can be pointed at a stored credential without
 * the secret ever being typed into a config by hand.
 *
 * Secrets policy:
 *   - input: `--secret <value>` or piped stdin (never a positional argument);
 *   - output: masked everywhere except `keys reveal <id>`;
 *   - storage: scrypt + AES-256-GCM via `src/infrastructure/vault/`.
 *
 * Environment:
 *   - `KATANAKITAI_PASSPHRASE` — passphrase that seals the vault;
 *   - `KATANAKITAI_VAULT` — override the vault file location.
 */
import { parseArgs } from "node:util";

import { useAgentDefinitions, useEmitAgentConfig } from "@/core/services/agentconfig.service.js";
import {
	useAddKey,
	useCreateKeyRecord,
	useEmptyVault,
	useFindKey,
	useListKeys,
	useMaskSecret,
	useReplaceKey,
	useRevokeKey,
	useRotateKeySecret,
} from "@/core/services/keyvault.service.js";
import {
	useAddMcpServer,
	useCreateMcpServer,
	useEmitOpenCodeServers,
	useListMcpServers,
	useRemoveMcpServer,
} from "@/core/services/mcp.service.js";
import {
	useLoadVaultFile,
	useSaveVaultFile,
	useVaultPath,
} from "@/infrastructure/vault/vault.store.js";
import type { McpServerEntry, SafeResult, VaultData } from "@/types/index.js";

const USAGE = `kai (katanakitAI) — API keys, MCP servers and AI agent config in one encrypted vault

Usage:
  kai keys add <provider> [--label <l>] [--note <n>] [--secret <s>]
  kai keys list [--all]
  kai keys reveal <id>
  kai keys rotate <id> [--secret <s>]
  kai keys revoke <id>
  kai keys export [--out <file>]
  kai mcp add <name> (--url <url> | --command "<cmd>") [--env K=V]... [--header K=V]... [--disabled]
  kai mcp list
  kai mcp remove <name>
  kai mcp emit
  kai agents list
  kai agents config <id> [--key <keyId> | --secret <s>] [--provider <p>]
                                 [--env-name <n>] [--base-url <u>] [--reveal] [--write] [--force]

Secrets are read from --secret or stdin, printed masked, and stored encrypted.
Environment: KATANAKITAI_PASSPHRASE (required), KATANAKITAI_VAULT (optional).`;

function out(line = ""): void {
	process.stdout.write(`${line}\n`);
}

function fail(message: string): never {
	process.stderr.write(`✖ ${message}\n`);
	process.exit(1);
}

/** Unwraps a Safe Result, exiting with the error message on failure. */
function unwrap<T>(result: SafeResult<T>): T {
	if (!result.ok) fail(result.error.message);
	return result.data;
}

function requirePassphrase(): string {
	const passphrase = process.env.KATANAKITAI_PASSPHRASE?.trim();
	if (!passphrase) {
		fail("KATANAKITAI_PASSPHRASE is not set — export it before running vault commands.");
	}
	return passphrase;
}

/** Reads the secret from `--secret` or, failing that, from piped stdin. */
async function readSecret(explicit: string | undefined): Promise<string> {
	if (explicit !== undefined) return explicit;
	if (process.stdin.isTTY) {
		fail("No secret given — pass --secret <value> or pipe one through stdin.");
	}
	const chunks: Buffer[] = [];
	for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
	const secret = Buffer.concat(chunks).toString("utf8").trim();
	if (!secret) fail("Empty secret on stdin.");
	return secret;
}

async function loadVault(passphrase: string): Promise<VaultData> {
	const path = await useVaultPath();
	const loaded = await useLoadVaultFile(path, passphrase);
	if (loaded.ok) return loaded.data;
	// First run: there is no vault yet, so start from an empty one.
	if (loaded.error.status === 404) return useEmptyVault();
	fail(loaded.error.message);
}

async function saveVault(passphrase: string, data: VaultData): Promise<string> {
	const path = await useVaultPath();
	const saved = await useSaveVaultFile(path, data, passphrase);
	if (!saved.ok) fail(saved.error.message);
	return saved.data;
}

/** Expands a leading `~/` and leaves every other path untouched. */
async function resolvePath(target: string): Promise<string> {
	if (!target.startsWith("~/")) return target;
	const { homedir } = await import("node:os");
	const { join } = await import("node:path");
	return join(homedir(), target.slice(2));
}

/** Parses repeated `NAME=VALUE` flags into a record. */
function toRecord(pairs: string[] | undefined, flag: string): Record<string, string> | undefined {
	if (!pairs || pairs.length === 0) return undefined;
	const record: Record<string, string> = {};
	for (const pair of pairs) {
		const index = pair.indexOf("=");
		if (index <= 0) fail(`${flag} expects NAME=VALUE, got "${pair}"`);
		record[pair.slice(0, index)] = pair.slice(index + 1);
	}
	return record;
}

/* -------------------------------------------------------------------------- */
/* keys                                                                       */

async function keysCommand(command: string | undefined, args: string[]): Promise<void> {
	const passphrase = requirePassphrase();

	if (command === "add") {
		const { values, positionals } = parseArgs({
			args,
			options: {
				label: { type: "string" },
				note: { type: "string" },
				secret: { type: "string" },
			},
			allowPositionals: true,
		});
		const [provider] = positionals;
		if (!provider) fail("usage: kai keys add <provider> [--label <l>] [--note <n>] [--secret <s>]");

		const secret = await readSecret(values.secret);
		const record = unwrap(
			useCreateKeyRecord({
				provider,
				label: values.label ?? "default",
				secret,
				note: values.note,
			}),
		);
		const data = useAddKey(await loadVault(passphrase), record);
		await saveVault(passphrase, data);
		out(
			`✔ key ${record.id} added (${record.provider}/${record.label}) — ${useMaskSecret(record.secret)}`,
		);
		return;
	}

	if (command === "list") {
		const { values } = parseArgs({
			args,
			options: { all: { type: "boolean" } },
			allowPositionals: true,
		});
		const records = useListKeys(await loadVault(passphrase), { includeRevoked: values.all });
		if (records.length === 0) {
			out("No keys stored yet — add one with: kai keys add <provider>");
			return;
		}
		out(
			"ID                                    PROVIDER    LABEL     STATUS   SECRET             CREATED",
		);
		for (const record of records) {
			out(
				[
					record.id.padEnd(36),
					record.provider.padEnd(11),
					record.label.slice(0, 8).padEnd(9),
					record.status.padEnd(8),
					useMaskSecret(record.secret).padEnd(18),
					record.createdAt.slice(0, 10),
				].join(" "),
			);
		}
		return;
	}

	if (command === "reveal") {
		const [id] = args;
		if (!id) fail("usage: kai keys reveal <id>");
		const record = useFindKey(await loadVault(passphrase), id);
		if (!record) fail(`No key with id "${id}".`);
		out(record.secret);
		return;
	}

	if (command === "rotate") {
		const { values, positionals } = parseArgs({
			args,
			options: { secret: { type: "string" } },
			allowPositionals: true,
		});
		const [id] = positionals;
		if (!id) fail("usage: kai keys rotate <id> [--secret <s>]");

		const data = await loadVault(passphrase);
		const record = useFindKey(data, id);
		if (!record) fail(`No key with id "${id}".`);
		const secret = await readSecret(values.secret);
		const rotated = unwrap(useRotateKeySecret(record, secret));
		await saveVault(passphrase, useReplaceKey(data, rotated));
		out(`✔ key ${record.id} rotated — ${useMaskSecret(rotated.secret)}`);
		return;
	}

	if (command === "revoke") {
		const [id] = args;
		if (!id) fail("usage: kai keys revoke <id>");
		const data = await loadVault(passphrase);
		const record = useFindKey(data, id);
		if (!record) fail(`No key with id "${id}".`);
		await saveVault(passphrase, useReplaceKey(data, useRevokeKey(record)));
		out(`✔ key ${record.id} revoked`);
		return;
	}

	if (command === "export") {
		const { values } = parseArgs({
			args,
			options: { out: { type: "string" } },
			allowPositionals: true,
		});
		const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
		const target = values.out ?? `kai-backup-${stamp}.enc.json`;
		const saved = await useSaveVaultFile(target, await loadVault(passphrase), passphrase);
		if (!saved.ok) fail(saved.error.message);
		out(`✔ encrypted backup written to ${saved.data}`);
		out("  It stays sealed with the same passphrase — safe to move to your own backup storage.");
		return;
	}

	fail("usage: kai keys <add|list|reveal|rotate|revoke|export>");
}

/* -------------------------------------------------------------------------- */
/* mcp                                                                        */

async function mcpCommand(command: string | undefined, args: string[]): Promise<void> {
	const passphrase = requirePassphrase();

	if (command === "add") {
		const { values, positionals } = parseArgs({
			args,
			options: {
				url: { type: "string" },
				command: { type: "string" },
				env: { type: "string", multiple: true },
				header: { type: "string", multiple: true },
				disabled: { type: "boolean" },
			},
			allowPositionals: true,
		});
		const [name] = positionals;
		if (!name) {
			fail(
				'usage: kai mcp add <name> (--url <url> | --command "<cmd>") [--env K=V]... [--header K=V]... [--disabled]',
			);
		}
		const entry = unwrap(
			useCreateMcpServer({
				name,
				type: values.url ? "remote" : "local",
				command: values.command ? values.command.trim().split(/\s+/) : undefined,
				url: values.url,
				environment: toRecord(values.env, "--env"),
				headers: toRecord(values.header, "--header"),
				disabled: values.disabled,
			}),
		);
		await saveVault(passphrase, useAddMcpServer(await loadVault(passphrase), entry));
		out(`✔ MCP server "${entry.name}" (${entry.type}) stored`);
		return;
	}

	if (command === "list") {
		const servers = useListMcpServers(await loadVault(passphrase));
		if (servers.length === 0) {
			out("No MCP servers registered — add one with: kai mcp add <name> --url <url>");
			return;
		}
		out("NAME          TYPE     TARGET                                    STATE");
		for (const server of servers) {
			const target = server.type === "remote" ? (server.url ?? "") : (server.command ?? []).join(" ");
			out(
				[
					server.name.padEnd(13),
					server.type.padEnd(8),
					target.slice(0, 40).padEnd(41),
					server.disabled ? "disabled" : "enabled",
				].join(" "),
			);
		}
		return;
	}

	if (command === "remove") {
		const [name] = args;
		if (!name) fail("usage: kai mcp remove <name>");
		await saveVault(passphrase, useRemoveMcpServer(await loadVault(passphrase), name));
		out(`✔ MCP server "${name}" removed`);
		return;
	}

	if (command === "emit") {
		const servers: McpServerEntry[] = useListMcpServers(await loadVault(passphrase));
		out(unwrap(useEmitOpenCodeServers(servers)).trimEnd());
		return;
	}

	fail("usage: kai mcp <add|list|remove|emit>");
}

/* -------------------------------------------------------------------------- */
/* agents                                                                     */

async function agentsCommand(command: string | undefined, args: string[]): Promise<void> {
	if (command === "list") {
		for (const agent of useAgentDefinitions()) {
			out(`${agent.id.padEnd(12)} ${agent.name} — ${agent.description}`);
			out(`${" ".repeat(12)} config: ${agent.configPath} · docs: ${agent.docsUrl}`);
		}
		return;
	}

	if (command === "config") {
		const { values, positionals } = parseArgs({
			args,
			options: {
				key: { type: "string" },
				secret: { type: "string" },
				provider: { type: "string" },
				"env-name": { type: "string" },
				"base-url": { type: "string" },
				reveal: { type: "boolean" },
				write: { type: "boolean" },
				force: { type: "boolean" },
			},
			allowPositionals: true,
		});
		const [agentId] = positionals;
		if (!agentId) {
			fail("usage: kai agents config <id> [--key <keyId> | --secret <s>] [--provider <p>] [--write]");
		}

		const passphrase = requirePassphrase();
		let provider = values.provider;
		let secret: string;
		if (values.key) {
			const data = await loadVault(passphrase);
			const record = useFindKey(data, values.key);
			if (!record) fail(`No key with id "${values.key}".`);
			if (record.status === "revoked") fail(`Key "${record.id}" is revoked — add or rotate it first.`);
			provider = provider ?? record.provider;
			secret = record.secret;
		} else {
			if (!provider) fail("--provider is required when no --key is given.");
			secret = await readSecret(values.secret);
		}

		const data = await loadVault(passphrase);
		const output = unwrap(
			useEmitAgentConfig(agentId, {
				provider: provider ?? "unknown",
				secret,
				apiKeyEnv: values["env-name"],
				baseUrl: values["base-url"],
				mcpServers: useListMcpServers(data),
				// Writing to the user's own config is the explicit reveal action.
				reveal: values.reveal || values.write,
			}),
		);

		if (values.write) {
			for (const file of output.files) {
				const target = await resolvePath(file.path);
				const { access, mkdir, writeFile } = await import("node:fs/promises");
				const { dirname } = await import("node:path");
				if (!values.force) {
					const exists = await access(target).then(
						() => true,
						() => false,
					);
					if (exists) {
						fail(`${target} already exists — merge the block below manually or pass --force.`);
					}
				}
				await mkdir(dirname(target), { recursive: true });
				await writeFile(target, file.content, { encoding: "utf8", mode: 0o600 });
				out(`✔ wrote ${target}`);
			}
			out("");
			out("Manual connection");
			for (const entry of output.manual) out(`  ${entry.label}  ${entry.value}`);
		} else {
			for (const file of output.files) {
				out(`— Auto configuration (${file.path}) —`);
				out(file.content.trimEnd());
				out("");
			}
			out("— Manual connection —");
			for (const entry of output.manual) out(`${entry.label}  ${entry.value}`);
		}
		out("");
		out("— Notes —");
		for (const note of output.notes) out(`  · ${note}`);
		return;
	}

	fail("usage: kai agents <list|config>");
}

/* -------------------------------------------------------------------------- */

async function main(): Promise<void> {
	const [group, command, ...rest] = process.argv.slice(2);

	switch (group) {
		case "keys":
			return keysCommand(command, rest);
		case "mcp":
			return mcpCommand(command, rest);
		case "agents":
			return agentsCommand(command, rest);
		case "help":
		case "--help":
		case "-h":
		case undefined:
			out(USAGE);
			return;
		default:
			fail(`Unknown command "${group}" — run: kai help`);
	}
}

/**
 * Runs the CLI against `process.argv`. Never throws: failures print to stderr
 * and set exit code 1. Importing this module stays side-effect free — the
 * executable entry (`bin.ts`) is what calls this.
 */
export async function runCli(): Promise<void> {
	try {
		await main();
	} catch (error) {
		fail(error instanceof Error ? error.message : String(error));
	}
}
