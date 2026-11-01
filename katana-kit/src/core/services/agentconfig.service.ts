import type {
	AgentConfigFile,
	AgentConfigInput,
	AgentConfigManualEntry,
	AgentConfigOutput,
	AgentDefinition,
	McpServerEntry,
	SafeResult,
} from "@/types/index.js";

import { useMaskSecret, useProviderEnvName } from "./keyvault.service.js";
import { useOpenCodeServersObject } from "./mcp.service.js";

/**
 * The agent registry: every coding tool whose configuration this kit can
 * generate. Adding a tool means adding one entry here plus one emitter — the
 * dispatch, masking policy and CLI surface pick it up automatically.
 *
 * Only tools whose config contract has been checked against their published
 * docs belong here; a guessed field name is a broken config on someone's disk.
 */
export const AGENT_DEFINITIONS: readonly AgentDefinition[] = [
	{
		id: "opencode",
		name: "OpenCode",
		description:
			"Provider-agnostic terminal agent with a full-screen TUI. Credentials go through {env:NAME} substitution.",
		docsUrl: "https://opencode.ai/v2/docs/config",
		configPath: "opencode.jsonc",
	},
	{
		id: "claude-code",
		name: "Claude Code",
		description:
			"Anthropic's terminal agent. Credentials go in the env block of ~/.claude/settings.json, written as-is.",
		docsUrl: "https://code.claude.com/docs/en/settings",
		configPath: "~/.claude/settings.json",
	},
];

/** Everything an emitter needs after defaults are resolved. */
interface ResolvedAgentInput {
	provider: string;
	secret: string;
	apiKeyEnv: string;
	baseUrl?: string;
	mcpServers: McpServerEntry[];
	reveal: boolean;
}

/**
 * AgentConfigService — Singleton facade for per-agent configuration emission.
 *
 * Applies the **Singleton** pattern (one shared instance via
 * {@link AgentConfigService.getInstance}) and the **Facade** pattern: unknown
 * agents and invalid input resolve to `{ data, error, ok }`, nothing throws.
 *
 * The emitters mirror the two boxes every agent-setup UI shows: **auto
 * configuration** ({@link AgentConfigFile} — the file the tool reads) and
 * **manual connection** ({@link AgentConfigManualEntry} — the env names and
 * endpoint to paste by hand). Secret masking is policy, not presentation:
 * emitted values are masked unless the caller passes `reveal: true`, so a
 * preview can be logged or pasted into a chat without leaking anything.
 *
 * @example
 * ```ts
 * import { useEmitAgentConfig } from "katanakit-js";
 *
 * const result = useEmitAgentConfig("opencode", {
 *   provider: "openai",
 *   secret: "sk-…",
 *   mcpServers: [],
 * });
 * if (result.ok) console.log(result.data.files[0].content);
 * ```
 */
export class AgentConfigService {
	private static instance: AgentConfigService;

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): AgentConfigService {
		if (!AgentConfigService.instance) {
			AgentConfigService.instance = new AgentConfigService();
		}
		return AgentConfigService.instance;
	}

	/**
	 * Lists the supported agents.
	 *
	 * @returns The agent registry.
	 */
	useAgentDefinitions(): AgentDefinition[] {
		return [...AGENT_DEFINITIONS];
	}

	/**
	 * Finds an agent definition by id.
	 *
	 * @param agentId - The agent id, e.g. `opencode`.
	 * @returns The definition, or `undefined`.
	 */
	useFindAgent(agentId: string): AgentDefinition | undefined {
		return AGENT_DEFINITIONS.find((agent) => agent.id === agentId);
	}

	/**
	 * Emits the auto-configuration file and the manual connection entries for
	 * one agent.
	 *
	 * @param agentId - The agent to configure.
	 * @param input - Provider, secret, optional env var name, base URL and MCP servers.
	 * @returns `{ data, error, ok }` — `error.status = 404` for unknown agents.
	 */
	useEmitAgentConfig(agentId: string, input: AgentConfigInput): SafeResult<AgentConfigOutput> {
		const agent = this.useFindAgent(agentId);
		if (!agent) {
			const known = this.useAgentDefinitions()
				.map((entry) => entry.id)
				.join(", ");
			return {
				data: null,
				error: {
					message: `[AgentConfigService] unknown agent "${agentId}" — supported: ${known || "none"}`,
					status: 404,
				},
				ok: false,
			};
		}
		if (!input.secret) {
			return {
				data: null,
				error: {
					message: "[AgentConfigService] a non-empty secret is required to emit a config",
					status: 400,
				},
				ok: false,
			};
		}

		const resolved: ResolvedAgentInput = {
			provider: input.provider,
			secret: input.secret,
			apiKeyEnv: input.apiKeyEnv?.trim() || useProviderEnvName(input.provider),
			baseUrl: input.baseUrl?.trim() || undefined,
			mcpServers: input.mcpServers ?? [],
			reveal: input.reveal ?? false,
		};

		switch (agent.id) {
			case "opencode":
				return this.useEmitOpenCode(agent, resolved);
			case "claude-code":
				return this.useEmitClaudeCode(agent, resolved);
			default:
				return {
					data: null,
					error: {
						message: `[AgentConfigService] agent "${agentId}" has no emitter`,
						status: 500,
					},
					ok: false,
				};
		}
	}

	/**
	 * OpenCode: `providers.<provider>.settings.apiKey` uses `{env:NAME}`
	 * substitution, so the generated file never contains a secret — the vault
	 * (or the user's environment) does. MCP servers land under `mcp.servers`.
	 */
	private useEmitOpenCode(
		agent: AgentDefinition,
		input: ResolvedAgentInput,
	): SafeResult<AgentConfigOutput> {
		const servers = useOpenCodeServersObject(input.mcpServers);
		if (!servers.ok) return { data: null, error: servers.error, ok: false };

		const config: Record<string, unknown> = {
			$schema: "https://opencode.ai/config.json",
			providers: {
				[input.provider]: {
					settings: { apiKey: `{env:${input.apiKeyEnv}}` },
				},
			},
		};
		if (Object.keys(servers.data).length > 0) {
			config.mcp = { servers: servers.data };
		}

		const files: AgentConfigFile[] = [
			{ path: "opencode.jsonc", content: `${JSON.stringify(config, null, 2)}\n` },
		];
		const manual: AgentConfigManualEntry[] = [
			{ label: `export ${input.apiKeyEnv}`, value: this.useDisplayValue(input) },
		];
		const notes = this.useBaseNotes(input);
		notes.push(
			"The generated file references the key via {env:NAME}; export it in your shell or pass it through your secret store.",
		);
		if (input.baseUrl) {
			notes.push(
				"Custom base URLs are not placed automatically — see https://opencode.ai/v2/docs/providers to configure the endpoint.",
			);
			manual.push({ label: "Base URL", value: input.baseUrl });
		}

		return {
			data: { agent, files, manual, notes },
			error: null,
			ok: true,
		};
	}

	/**
	 * Claude Code: the `env` block of `~/.claude/settings.json` is copied into
	 * the session environment as written — there is no variable substitution —
	 * so this file does contain the key when written for real. The preview is
	 * masked and the notes say so out loud.
	 */
	private useEmitClaudeCode(
		agent: AgentDefinition,
		input: ResolvedAgentInput,
	): SafeResult<AgentConfigOutput> {
		const env: Record<string, string> = { [input.apiKeyEnv]: this.useDisplayValue(input) };
		if (input.baseUrl) env.ANTHROPIC_BASE_URL = input.baseUrl;

		const config = {
			$schema: "https://json.schemastore.org/claude-code-settings.json",
			env,
		};
		const files: AgentConfigFile[] = [
			{ path: "~/.claude/settings.json", content: `${JSON.stringify(config, null, 2)}\n` },
		];
		const manual: AgentConfigManualEntry[] = [
			{ label: `export ${input.apiKeyEnv}`, value: this.useDisplayValue(input) },
		];
		const notes = this.useBaseNotes(input);
		notes.push(
			"Claude Code copies env values into the session as written — no {env:NAME} substitution here.",
		);
		notes.push(
			"A written ~/.claude/settings.json contains your API key in plaintext: keep the file out of version control.",
		);
		if (input.baseUrl) {
			manual.push({ label: "Base URL (ANTHROPIC_BASE_URL)", value: input.baseUrl });
		}

		return {
			data: { agent, files, manual, notes },
			error: null,
			ok: true,
		};
	}

	/** The value to print for a secret: real only when the caller asked to reveal. */
	private useDisplayValue(input: ResolvedAgentInput): string {
		return input.reveal ? input.secret : useMaskSecret(input.secret);
	}

	/** Notes shared by every emitter. */
	private useBaseNotes(input: ResolvedAgentInput): string[] {
		const notes = [
			"Provider credentials are stored encrypted in the KatanaKit key vault — config files only ever receive what the tool needs.",
		];
		if (!input.reveal) {
			notes.push(
				"Secret values in this preview are masked — run again with --reveal (or --write) for real values.",
			);
		}
		return notes;
	}
}

/** Lists the supported agents. See {@link AgentConfigService.useAgentDefinitions}. */
export function useAgentDefinitions(): AgentDefinition[] {
	return AgentConfigService.getInstance().useAgentDefinitions();
}

/** Finds an agent definition by id. See {@link AgentConfigService.useFindAgent}. */
export function useFindAgent(agentId: string): AgentDefinition | undefined {
	return AgentConfigService.getInstance().useFindAgent(agentId);
}

/** Emits agent configuration. See {@link AgentConfigService.useEmitAgentConfig}. */
export function useEmitAgentConfig(
	agentId: string,
	input: AgentConfigInput,
): SafeResult<AgentConfigOutput> {
	return AgentConfigService.getInstance().useEmitAgentConfig(agentId, input);
}
