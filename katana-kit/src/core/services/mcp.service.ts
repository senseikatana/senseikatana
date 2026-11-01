import { McpServerSchema } from "@/schemas/keyvault.schema.js";
import type { McpServerEntry, McpServerInput, SafeResult, VaultData } from "@/types/index.js";

/**
 * The `mcp.servers` value shape OpenCode accepts for one server. Only the
 * fields this kit stores are emitted; every field is optional except `type`
 * because local and remote servers use disjoint keys.
 */
export interface OpenCodeMcpServer {
	type: "local" | "remote";
	command?: string[];
	url?: string;
	environment?: Record<string, string>;
	headers?: Record<string, string>;
	disabled?: boolean;
}

/**
 * McpService — Singleton facade for MCP server registry management and
 * host-config emission.
 *
 * Applies the **Singleton** pattern (one shared instance via
 * {@link McpService.getInstance}) and the **Facade** pattern: validation
 * failures come back as `{ data, error, ok }`, nothing throws. The methods are
 * pure — registry entries live inside a {@link VaultData} payload that the
 * caller owns.
 *
 * Emission targets the OpenCode `mcp.servers` contract (local servers run a
 * command over stdio, remote servers are absolute Streamable HTTP URLs).
 * Credential values are kept as `{env:NAME}` references — the vault holds the
 * secret, generated config holds the indirection.
 *
 * @example
 * ```ts
 * import { useCreateMcpServer, useEmitOpenCodeServers } from "katanakit-js";
 *
 * const entry = useCreateMcpServer({ name: "context7", type: "remote", url: "https://mcp.context7.com/mcp" });
 * if (entry.ok) console.log(useEmitOpenCodeServers([entry.data]));
 * ```
 */
export class McpService {
	private static instance: McpService;

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): McpService {
		if (!McpService.instance) {
			McpService.instance = new McpService();
		}
		return McpService.instance;
	}

	/**
	 * Creates a validated MCP server entry.
	 *
	 * @param input - Name, type and the transport fields for that type.
	 * @returns `{ data, error, ok }` — `error.status = 400` on validation failure.
	 */
	useCreateMcpServer(input: McpServerInput): SafeResult<McpServerEntry> {
		const parsed = McpServerSchema.safeParse(input);
		if (!parsed.success) {
			return {
				data: null,
				error: {
					message: `[McpService] invalid MCP server: ${parsed.error.issues
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
	 * Adds a server to the registry, replacing any entry with the same name —
	 * the same "same name wins wholesale" semantic OpenCode applies to config
	 * overrides, so a re-add is an intentional full replacement.
	 *
	 * @param data - The current vault payload.
	 * @param entry - The server entry to store.
	 * @returns The updated payload.
	 */
	useAddMcpServer(data: VaultData, entry: McpServerEntry): VaultData {
		const mcpServers = data.mcpServers.some((existing) => existing.name === entry.name)
			? data.mcpServers.map((existing) => (existing.name === entry.name ? entry : existing))
			: [...data.mcpServers, entry];
		return { ...data, mcpServers, updatedAt: new Date().toISOString() };
	}

	/**
	 * Removes a server from the registry. Removing an absent name is a no-op.
	 *
	 * @param data - The current vault payload.
	 * @param name - The server name.
	 * @returns The updated payload.
	 */
	useRemoveMcpServer(data: VaultData, name: string): VaultData {
		return {
			...data,
			mcpServers: data.mcpServers.filter((entry) => entry.name !== name),
			updatedAt: new Date().toISOString(),
		};
	}

	/**
	 * Lists registered servers in registration order.
	 *
	 * @param data - The vault payload.
	 * @returns The server entries.
	 */
	useListMcpServers(data: VaultData): McpServerEntry[] {
		return [...data.mcpServers];
	}

	/**
	 * Finds a server by name.
	 *
	 * @param data - The vault payload.
	 * @param name - The server name.
	 * @returns The entry, or `undefined`.
	 */
	useFindMcpServer(data: VaultData, name: string): McpServerEntry | undefined {
		return data.mcpServers.find((entry) => entry.name === name);
	}

	/**
	 * Projects registry entries into an OpenCode `mcp.servers` object.
	 *
	 * Only the keys the transport uses are emitted: `command`/`environment` for
	 * local servers, `url`/`headers` for remote ones, `disabled` only when true.
	 * Secrets are never interpolated — `environment`/`headers` values travel as
	 * `{env:NAME}` references exactly as stored.
	 *
	 * @param servers - The server entries to project.
	 * @returns `{ data, error, ok }` with the name-keyed object.
	 */
	useOpenCodeServersObject(
		servers: McpServerEntry[],
	): SafeResult<Record<string, OpenCodeMcpServer>> {
		const result: Record<string, OpenCodeMcpServer> = {};
		for (const server of servers) {
			const parsed = McpServerSchema.safeParse(server);
			if (!parsed.success) {
				return {
					data: null,
					error: {
						message: `[McpService] cannot emit invalid server "${server.name}"`,
						status: 400,
						details: parsed.error.issues,
					},
					ok: false,
				};
			}
			const entry = parsed.data;
			const emitted: OpenCodeMcpServer = { type: entry.type };
			if (entry.type === "local") {
				if (entry.command) emitted.command = [...entry.command];
				if (entry.environment && Object.keys(entry.environment).length > 0) {
					emitted.environment = { ...entry.environment };
				}
			} else {
				if (entry.url) emitted.url = entry.url;
				if (entry.headers && Object.keys(entry.headers).length > 0) {
					emitted.headers = { ...entry.headers };
				}
			}
			if (entry.disabled) emitted.disabled = true;
			result[entry.name] = emitted;
		}
		return { data: result, error: null, ok: true };
	}

	/**
	 * Renders registry entries as a pretty-printed `mcp.servers` JSON fragment,
	 * ready to paste into `opencode.json(c)`.
	 *
	 * @param servers - The server entries to render.
	 * @returns `{ data, error, ok }` with the JSON text.
	 */
	useEmitOpenCodeServers(servers: McpServerEntry[]): SafeResult<string> {
		const object = this.useOpenCodeServersObject(servers);
		if (!object.ok) return { data: null, error: object.error, ok: false };
		return { data: `${JSON.stringify(object.data, null, 2)}\n`, error: null, ok: true };
	}
}

/** Creates a validated MCP server entry. See {@link McpService.useCreateMcpServer}. */
export function useCreateMcpServer(input: McpServerInput): SafeResult<McpServerEntry> {
	return McpService.getInstance().useCreateMcpServer(input);
}

/** Adds or replaces a server in the registry. See {@link McpService.useAddMcpServer}. */
export function useAddMcpServer(data: VaultData, entry: McpServerEntry): VaultData {
	return McpService.getInstance().useAddMcpServer(data, entry);
}

/** Removes a server from the registry. See {@link McpService.useRemoveMcpServer}. */
export function useRemoveMcpServer(data: VaultData, name: string): VaultData {
	return McpService.getInstance().useRemoveMcpServer(data, name);
}

/** Lists registered servers. See {@link McpService.useListMcpServers}. */
export function useListMcpServers(data: VaultData): McpServerEntry[] {
	return McpService.getInstance().useListMcpServers(data);
}

/** Finds a server by name. See {@link McpService.useFindMcpServer}. */
export function useFindMcpServer(data: VaultData, name: string): McpServerEntry | undefined {
	return McpService.getInstance().useFindMcpServer(data, name);
}

/** Projects entries into an OpenCode `mcp.servers` object. See {@link McpService.useOpenCodeServersObject}. */
export function useOpenCodeServersObject(
	servers: McpServerEntry[],
): SafeResult<Record<string, OpenCodeMcpServer>> {
	return McpService.getInstance().useOpenCodeServersObject(servers);
}

/** Renders entries as a `mcp.servers` JSON fragment. See {@link McpService.useEmitOpenCodeServers}. */
export function useEmitOpenCodeServers(servers: McpServerEntry[]): SafeResult<string> {
	return McpService.getInstance().useEmitOpenCodeServers(servers);
}
