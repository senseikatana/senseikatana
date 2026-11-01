import type {
	AgentResult,
	AgentRunOptions,
	AgentStep,
	AiChatOptions,
	AiMessage,
	AiProviderConfig,
	AiResult,
	AiTool,
	AiToolCall,
} from "@/types/index.js";

/** Default endpoint for Alibaba Cloud Model Studio (DashScope) compatible mode. */
export const KITT_BASE_URL = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";

/** Default model for the Kitt assistant preset. */
export const KITT_DEFAULT_MODEL = "qwen3.8-max";

/** Default system prompt injected when the agent is configured without one. */
export const KITT_SYSTEM_PROMPT =
	"You are Kitt, a helpful assistant. Answer clearly and concisely.";

/** Reusable preset (base URL + model) for the Kitt assistant. */
export const kittPreset: Pick<AiProviderConfig, "baseUrl" | "model"> = {
	baseUrl: KITT_BASE_URL,
	model: KITT_DEFAULT_MODEL,
};

/** Tag that identifies AI HTTP failures without relying on class identity. */
const AI_HTTP_ERROR_TAG = "AiHttpError" as const;

/** Shape of the tagged error raised on non-2xx completions responses. */
interface AiHttpError extends Error {
	tag: typeof AI_HTTP_ERROR_TAG;
	status: number;
	details?: unknown;
}

/** Creates a tagged Error preserving the HTTP status and response details. */
function createAiHttpError(message: string, status: number, details?: unknown): AiHttpError {
	const error = new Error(message) as AiHttpError;
	error.name = AI_HTTP_ERROR_TAG;
	error.tag = AI_HTTP_ERROR_TAG;
	error.status = status;
	error.details = details;
	return error;
}

/** Type guard that replaces `instanceof` (robust across module copies/realm). */
function isAiHttpError(error: unknown): error is AiHttpError {
	return error instanceof Error && (error as AiHttpError).tag === AI_HTTP_ERROR_TAG;
}

/** Reads the API key from the environment when `process` is available. */
function readEnvKey(): string | undefined {
	if (typeof process !== "undefined" && process.env) {
		return process.env.DASHSCOPE_API_KEY;
	}
	return undefined;
}

/** Coerces an unknown error into a message string. */
function toMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

/** Extracts an HTTP status from an error, defaulting to `0`. */
function toStatus(error: unknown): number {
	return isAiHttpError(error) ? error.status : 0;
}

/** Converts a tool into the OpenAI-compatible wire shape. */
function toWireTool(tool: AiTool): Record<string, unknown> {
	return {
		type: "function",
		function: {
			name: tool.name,
			description: tool.description,
			parameters: tool.parameters,
		},
	};
}

/** Executes a tool call emitted by the model, resolving the tool by name. */
async function executeToolCall(tools: AiTool[], call: AiToolCall): Promise<unknown> {
	const tool = tools.find((item) => item.name === call.function?.name);
	if (!tool) {
		return { error: `Unknown tool "${call.function?.name}".` };
	}

	let input: unknown;
	try {
		input = call.function?.arguments ? JSON.parse(call.function.arguments) : {};
	} catch {
		input = call.function?.arguments;
	}

	try {
		return await tool.execute(input);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String(error);
		return { error: `Tool "${tool.name}" failed: ${message}` };
	}
}

/** Shape of a `/chat/completions` response. */
interface ChatCompletionResponse {
	choices?: Array<{
		message?: { content?: string | null; tool_calls?: AiToolCall[] };
		finish_reason?: string | null;
	}>;
	error?: { message?: string };
}

/** Request options shared by chat and agent calls. */
interface RequestOptions {
	temperature?: number;
	maxTokens?: number;
	topP?: number;
	signal?: AbortSignal;
	tools?: AiTool[];
}

/* -------------------------------------------------------------------------- */
/* Strategy contract                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Estrategia de proveedor AI - Strategy Pattern.
 *
 * Define el contrato que toda implementación de proveedor de completions debe
 * cumplir. El {@link AgentService} delega la llamada HTTP en una estrategia
 * concreta, permitiendo intercambiar proveedores (DashScope, OpenAI,
 * self-hosted, mock en tests) sin tocar el bucle del agente.
 */
export interface IAiProviderStrategy {
	/**
	 * Performs a single `chat/completions` request against the provider.
	 *
	 * @param config - Provider configuration (baseUrl, model, apiKey).
	 * @param messages - Conversation messages.
	 * @param options - Sampling options, tools and abort signal.
	 * @returns The parsed provider response.
	 * @throws On non-2xx responses or transport failures.
	 */
	requestCompletion(
		config: AiProviderConfig,
		messages: AiMessage[],
		options: RequestOptions,
	): Promise<ChatCompletionResponse>;
}

/* -------------------------------------------------------------------------- */
/* Concrete strategies                                                        */
/* -------------------------------------------------------------------------- */

/** Removes a single trailing slash to build the chat completions URL. */
function buildCompletionsUrl(baseUrl: string): string {
	const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
	return `${base}/chat/completions`;
}

/**
 * Estrategia por defecto: proveedor compatible con OpenAI
 * (`POST /chat/completions` con Bearer token). Cubre DashScope en modo
 * compatible, OpenAI, Azure OpenAI y la mayoría de endpoints self-hosted.
 *
 * @example
 * ```ts
 * const strategy = new OpenAiCompatibleStrategy();
 * const response = await strategy.requestCompletion(config, messages, {});
 * ```
 */
export class OpenAiCompatibleStrategy implements IAiProviderStrategy {
	/**
	 * Performs a raw `chat/completions` request against the provider.
	 * Throws {@link AiHttpError} on non-2xx responses.
	 */
	async requestCompletion(
		config: AiProviderConfig,
		messages: AiMessage[],
		options: RequestOptions,
	): Promise<ChatCompletionResponse> {
		const body: Record<string, unknown> = {
			model: config.model,
			messages,
		};

		if (options.temperature !== undefined) body.temperature = options.temperature;
		if (options.maxTokens !== undefined) body.max_tokens = options.maxTokens;
		if (options.topP !== undefined) body.top_p = options.topP;

		if (options.tools && options.tools.length > 0) {
			body.tools = options.tools.map(toWireTool);
			body.tool_choice = "auto";
		}

		const response = await fetch(buildCompletionsUrl(config.baseUrl), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${config.apiKey}`,
			},
			body: JSON.stringify(body),
			signal: options.signal,
		});

		const text = await response.text();
		let parsed: ChatCompletionResponse = {};
		if (text) {
			try {
				parsed = JSON.parse(text) as ChatCompletionResponse;
			} catch {
				parsed = { error: { message: text.slice(0, 500) } };
			}
		}

		if (!response.ok) {
			throw createAiHttpError(
				parsed.error?.message ?? response.statusText ?? "Unsuccessful response",
				response.status,
				parsed,
			);
		}

		return parsed;
	}
}

/* -------------------------------------------------------------------------- */
/* Context (Singleton facade)                                                 */
/* -------------------------------------------------------------------------- */

/** Prepends a system message unless the conversation already defines one. */
function ensureSystem(messages: AiMessage[], fallback: string): AiMessage[] {
	if (messages.some((message) => message.role === "system")) {
		return messages;
	}
	return [{ role: "system", content: fallback }, ...messages];
}

/**
 * AgentService - Singleton facade con Strategy Pattern.
 *
 * Centraliza el registro del proveedor AI y el bucle de completions,
 * delegando la llamada HTTP en una {@link IAiProviderStrategy}
 * intercambiable. Por defecto usa {@link OpenAiCompatibleStrategy}.
 *
 * @example
 * ```ts
 * // Configurar el proveedor
 * AgentService.getInstance().useInitAgent({ apiKey: process.env.DASHSCOPE_API_KEY });
 *
 * // Cambiar de estrategia en runtime (p. ej. un mock en tests)
 * AgentService.getInstance().useSetStrategy(new OpenAiCompatibleStrategy());
 * ```
 */
export class AgentService {
	private static instance: AgentService;
	private provider: AiProviderConfig | null = null;
	private strategy: IAiProviderStrategy;

	/**
	 * Constructor privado - enforce singleton.
	 * @param strategy - Estrategia de proveedor a inyectar (opcional).
	 */
	private constructor(strategy?: IAiProviderStrategy) {
		this.strategy = strategy ?? new OpenAiCompatibleStrategy();
	}

	/**
	 * Obtiene la instancia única del AgentService (Singleton).
	 *
	 * @returns La instancia única de {@link AgentService}.
	 */
	static getInstance(): AgentService {
		if (!AgentService.instance) {
			AgentService.instance = new AgentService();
		}
		return AgentService.instance;
	}

	/**
	 * Crea una instancia NO-singleton con una estrategia específica.
	 * Útil para tests o para aislar varios proveedores.
	 *
	 * @param strategy - Estrategia a inyectar.
	 * @returns Una nueva instancia de {@link AgentService}.
	 */
	static create(strategy?: IAiProviderStrategy): AgentService {
		return new AgentService(strategy);
	}

	/**
	 * Intercambia la estrategia de proveedor en runtime (Strategy Pattern).
	 *
	 * @param strategy - La nueva estrategia a utilizar.
	 */
	useSetStrategy(strategy: IAiProviderStrategy): void {
		this.strategy = strategy;
	}

	/** Returns the currently active provider strategy. */
	useGetStrategy(): IAiProviderStrategy {
		return this.strategy;
	}

	/** Retrieves the configured provider or throws. */
	private useGetProvider(): AiProviderConfig {
		if (!this.provider) {
			throw new Error("[AiAgent] No provider configured. Call useInitAgent() first.");
		}
		return this.provider;
	}

	/**
	 * Registers the AI provider for the Kitt assistant.
	 *
	 * `apiKey` falls back to `process.env.DASHSCOPE_API_KEY`; `baseUrl`, `model`
	 * and `systemPrompt` fall back to the {@link kittPreset} defaults.
	 *
	 * @param config - Partial provider configuration.
	 *
	 * @example
	 * ```ts
	 * import { useInitAgent } from "katanakit-js";
	 *
	 * useInitAgent({
	 *   apiKey: process.env.DASHSCOPE_API_KEY,
	 *   model: "qwen3.8-max",
	 * });
	 * ```
	 */
	useInitAgent(config: Partial<AiProviderConfig> = {}): void {
		const apiKey = config.apiKey ?? readEnvKey() ?? "";
		if (!apiKey) {
			throw new Error("[AiAgent] Missing apiKey. Pass it to useInitAgent() or set DASHSCOPE_API_KEY.");
		}

		const baseUrl = config.baseUrl ?? KITT_BASE_URL;
		if (!baseUrl.startsWith("https://")) {
			throw new Error("[AiAgent] baseUrl must use https:// so the API key is not sent in cleartext.");
		}

		this.provider = {
			baseUrl,
			model: config.model ?? KITT_DEFAULT_MODEL,
			systemPrompt: config.systemPrompt ?? KITT_SYSTEM_PROMPT,
			apiKey,
		};
	}

	/**
	 * Sends a single chat completion and returns the assistant text as a Safe Result.
	 *
	 * Use this for review / questioning (single-shot). For autonomous multi-step
	 * work with tools, use {@link useRunAgent}.
	 *
	 * @param messages - Conversation messages (a system prompt is prepended if absent).
	 * @param options - Optional completion options.
	 * @returns A `AiResult` with the assistant text.
	 *
	 * @example
	 * ```ts
	 * import { useChat } from "katanakit-js";
	 *
	 * const result = await useChat([
	 *   { role: "user", content: "Summarize the benefits of solar energy in three bullet points." },
	 * ]);
	 * if (result.ok) console.log(result.data);
	 * ```
	 */
	async useChat(messages: AiMessage[], options: AiChatOptions = {}): Promise<AiResult<string>> {
		try {
			const config = this.useGetProvider();
			const { signal, temperature, maxTokens, topP, systemPrompt } = options;
			const withSystem = ensureSystem(
				messages,
				systemPrompt ?? config.systemPrompt ?? KITT_SYSTEM_PROMPT,
			);
			const response = await this.strategy.requestCompletion(config, withSystem, {
				signal,
				temperature,
				maxTokens,
				topP,
			});
			const content = response.choices?.[0]?.message?.content ?? "";
			return { data: content, error: null, ok: true };
		} catch (error: unknown) {
			return {
				data: null,
				error: { message: `[AiAgent] ${toMessage(error)}`, status: toStatus(error) },
				ok: false,
			};
		}
	}

	/**
	 * Runs the tool-calling agent loop against a goal until it emits a final
	 * answer or exhausts `maxSteps`.
	 *
	 * @param goal - The natural-language objective.
	 * @param options - Tools, step budget and completion options.
	 * @returns An `AgentResult` with the final message and executed steps.
	 *
	 * @example
	 * ```ts
	 * import { useRunAgent } from "katanakit-js";
	 *
	 * const result = await useRunAgent("Fix the type errors reported by tsc", {
	 *   tools: [
	 *     {
	 *       name: "runCommand",
	 *       description: "Runs a shell command and returns its output",
	 *       parameters: { type: "object", properties: { command: { type: "string" } } },
	 *       execute: (input) => shell.run(input.command),
	 *     },
	 *   ],
	 *   maxSteps: 12,
	 * });
	 * ```
	 */
	async useRunAgent(goal: string, options: AgentRunOptions = {}): Promise<AgentResult> {
		try {
			const config = this.useGetProvider();
			const {
				tools = [],
				maxSteps = 10,
				signal,
				temperature,
				maxTokens,
				topP,
				systemPrompt,
				history = [],
			} = options;

			const prior = history.filter((message) => message.role !== "system");
			const messages: AiMessage[] = [
				{ role: "system", content: systemPrompt ?? config.systemPrompt ?? KITT_SYSTEM_PROMPT },
				...prior,
				{ role: "user", content: goal },
			];

			const steps: AgentStep[] = [];

			for (let step = 0; step < maxSteps; step++) {
				const response = await this.strategy.requestCompletion(config, messages, {
					signal,
					temperature,
					maxTokens,
					topP,
					tools,
				});

				const choice = response.choices?.[0];
				const toolCalls = choice?.message?.tool_calls ?? [];

				if (toolCalls.length > 0) {
					messages.push({
						role: "assistant",
						content: choice?.message?.content ?? null,
						tool_calls: toolCalls,
					});

					const toolResults: unknown[] = [];
					for (const call of toolCalls) {
						const result = await executeToolCall(tools, call);
						toolResults.push(result);
						messages.push({
							role: "tool",
							tool_call_id: call.id,
							content: typeof result === "string" ? result : JSON.stringify(result),
						});
					}

					steps.push({ toolCalls, toolResults });
					continue;
				}

				const finalMessage = choice?.message?.content ?? "";
				return { data: { finalMessage, steps }, error: null, ok: true };
			}

			return {
				data: null,
				error: {
					message: `[AiAgent] Max steps (${maxSteps}) reached without a final answer.`,
					status: 0,
				},
				ok: false,
			};
		} catch (error: unknown) {
			return {
				data: null,
				error: { message: `[AiAgent] ${toMessage(error)}`, status: toStatus(error) },
				ok: false,
			};
		}
	}
}

/* -------------------------------------------------------------------------- */
/* Wrappers (backward compatibility)                                          */
/* -------------------------------------------------------------------------- */

/**
 * Registers the AI provider for the Kitt assistant.
 *
 * @param config - Partial provider configuration.
 *
 * @example
 * ```ts
 * import { useInitAgent } from "katanakit-js";
 *
 * useInitAgent({ apiKey: process.env.DASHSCOPE_API_KEY });
 * ```
 */
export function useInitAgent(config: Partial<AiProviderConfig> = {}): void {
	AgentService.getInstance().useInitAgent(config);
}

/**
 * Sends a single chat completion and returns the assistant text as a Safe Result.
 *
 * @param messages - Conversation messages (a system prompt is prepended if absent).
 * @param options - Optional completion options.
 * @returns An `AiResult` with the assistant text.
 *
 * @example
 * ```ts
 * import { useChat } from "katanakit-js";
 *
 * const result = await useChat([{ role: "user", content: "Hello" }]);
 * if (result.ok) console.log(result.data);
 * ```
 */
export async function useChat(
	messages: AiMessage[],
	options: AiChatOptions = {},
): Promise<AiResult<string>> {
	return AgentService.getInstance().useChat(messages, options);
}

/**
 * Runs the tool-calling agent loop against a goal until it emits a final
 * answer or exhausts `maxSteps`.
 *
 * @param goal - The natural-language objective.
 * @param options - Tools, step budget and completion options.
 * @returns An `AgentResult` with the final message and executed steps.
 *
 * @example
 * ```ts
 * import { useRunAgent } from "katanakit-js";
 *
 * const result = await useRunAgent("Fix the type errors reported by tsc");
 * ```
 */
export async function useRunAgent(
	goal: string,
	options: AgentRunOptions = {},
): Promise<AgentResult> {
	return AgentService.getInstance().useRunAgent(goal, options);
}
