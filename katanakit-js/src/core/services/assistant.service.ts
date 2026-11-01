import type {
	AiMessage,
	AiTool,
	AssistantInitConfig,
	AssistantReplyOptions,
	AssistantResult,
	ConversationStore,
	IAssistantService,
} from "@/types/index.js";

import { useChat, useInitAgent, useRunAgent } from "./agent.service.js";

/**
 * Creates a fresh in-memory conversation store.
 * Useful in tests or when you want an isolated store per process.
 *
 * @returns A {@link ConversationStore} backed by a Map.
 */
export function useCreateMemoryStore(): ConversationStore {
	return createMemoryStore();
}

/** In-memory conversation store: safe default, lost on process restart. */
function createMemoryStore(): ConversationStore {
	const conversations = new Map<string, AiMessage[]>();

	const useCreate = async (): Promise<string> => {
		const id =
			typeof crypto !== "undefined" && "randomUUID" in crypto
				? crypto.randomUUID()
				: Math.random().toString(36).slice(2);
		conversations.set(id, []);
		return id;
	};

	const useExists = async (sessionId: string): Promise<boolean> => {
		return conversations.has(sessionId);
	};

	const useAppend = async (sessionId: string, message: AiMessage): Promise<void> => {
		const history = conversations.get(sessionId) ?? [];
		history.push(message);
		conversations.set(sessionId, history);
	};

	const useGetHistory = async (sessionId: string): Promise<AiMessage[]> => {
		return conversations.get(sessionId) ?? [];
	};

	const useReset = async (sessionId: string): Promise<void> => {
		conversations.delete(sessionId);
	};

	return { useCreate, useExists, useAppend, useGetHistory, useReset };
}

/** Coerces an unknown error into a message string. */
function toMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

/** Runs a tool-aware agent loop when tools are present; otherwise a single chat. */
async function completeReply(
	history: AiMessage[],
	text: string,
	options: AssistantReplyOptions,
	activeTools: AiTool[],
	stepBudget: number,
) {
	if (activeTools.length === 0) {
		return useChat([...history, { role: "user", content: text }], options);
	}

	const result = await useRunAgent(text, {
		...options,
		tools: activeTools,
		maxSteps: stepBudget,
		history,
	});

	if (!result.ok) {
		return { data: null, error: result.error, ok: false as const };
	}

	return { data: result.data.finalMessage, error: null, ok: true as const };
}

/**
 * AssistantService - Singleton para el asistente conversacional.
 *
 * Aplica el patrón Singleton: una única instancia mantiene el store de
 * conversaciones, las herramientas y el presupuesto de pasos del agente.
 * El store es intercambiable (Strategy implícita: in-memory por defecto,
 * Prisma u otro persistente vía `useInitAssistant`), y la lógica de completado
 * delega en {@link AgentService}.
 *
 * @example
 * ```ts
 * const assistant = AssistantService.getInstance();
 * assistant.useInitAssistant({ model: "qwen3.8-max" });
 * const result = await assistant.useReply(undefined, "Hello!");
 * ```
 */
export class AssistantService implements IAssistantService {
	private static instance: AssistantService;

	/** Conversation store. Defaults to in-memory. */
	private store: ConversationStore = createMemoryStore();
	/** Tools used by {@link useReply} when none are passed per call. */
	private tools: AiTool[] = [];
	/** Agent step budget. */
	private maxSteps = 10;

	/**
	 * Constructor privado - enforce singleton.
	 */
	private constructor() {}

	/**
	 * Obtiene la instancia única del AssistantService (Singleton).
	 *
	 * @returns La instancia única de {@link AssistantService}.
	 */
	static getInstance(): AssistantService {
		if (!AssistantService.instance) {
			AssistantService.instance = new AssistantService();
		}
		return AssistantService.instance;
	}

	/**
	 * Configures the assistant: provider (Kitt) plus an optional conversation store.
	 *
	 * Defaults mirror `useInitAgent`: `apiKey` falls back to
	 * `process.env.DASHSCOPE_API_KEY`, and `baseUrl`/`model`/`systemPrompt` fall
	 * back to the Kitt preset. The default store is in-memory; pass
	 * `{ store }` to persist conversations (e.g. a Prisma-backed store).
	 *
	 * @param config - Assistant configuration.
	 *
	 * @example
	 * ```ts
	 * AssistantService.getInstance().useInitAssistant({ model: "qwen3.8-max" });
	 * ```
	 */
	useInitAssistant(config: AssistantInitConfig = {}): void {
		const {
			store: customStore,
			tools: customTools,
			maxSteps: customMaxSteps,
			...agentConfig
		} = config;
		if (customStore) this.store = customStore;
		if (customTools) this.tools = customTools;
		if (customMaxSteps !== undefined) this.maxSteps = customMaxSteps;
		useInitAgent(agentConfig);
	}

	/**
	 * Creates a new conversation session.
	 *
	 * @param channel - Optional free-form channel tag (e.g. `"rest"`).
	 * @returns The new session id.
	 */
	async useCreateSession(channel?: string): Promise<string> {
		return this.store.useCreate(channel);
	}

	/**
	 * Checks whether a conversation session exists.
	 *
	 * @param sessionId - The conversation session id.
	 * @returns `true` when the session exists.
	 */
	async useSessionExists(sessionId: string): Promise<boolean> {
		return this.store.useExists(sessionId);
	}

	/**
	 * Returns the full message history of a session, oldest first.
	 *
	 * @param sessionId - The conversation session id.
	 * @returns The accumulated messages.
	 */
	async useGetHistory(sessionId: string): Promise<AiMessage[]> {
		return this.store.useGetHistory(sessionId);
	}

	/**
	 * Deletes a conversation session and its messages.
	 *
	 * @param sessionId - The conversation session id to reset.
	 */
	async useResetSession(sessionId: string): Promise<void> {
		await this.store.useReset(sessionId);
	}

	/**
	 * Sends a user message within a conversation and returns the assistant reply.
	 * If no `sessionId` is provided, a new session is created. The user message and
	 * the assistant reply are persisted only on success.
	 *
	 * @param sessionId - Existing session id, or `undefined` to start a new one.
	 * @param text - The user's message.
	 * @param options - Optional completion options.
	 * @returns An {@link AssistantResult} with the reply and session id.
	 *
	 * @example
	 * ```ts
	 * const result = await AssistantService.getInstance().useReply(undefined, "Hello!");
	 * if (result.ok) console.log(result.data.reply);
	 * ```
	 */
	async useReply(
		sessionId: string | undefined,
		text: string,
		options: AssistantReplyOptions = {},
	): Promise<AssistantResult> {
		try {
			if (sessionId !== undefined && !(await this.store.useExists(sessionId))) {
				return {
					data: null,
					error: { message: "[Assistant] Unknown session", status: 404 },
					ok: false,
				};
			}

			const id = sessionId ?? (await this.store.useCreate());
			const history = await this.store.useGetHistory(id);
			const activeTools = options.tools ?? this.tools;
			const stepBudget = options.maxSteps ?? this.maxSteps;

			const replyText = await completeReply(history, text, options, activeTools, stepBudget);
			if (!replyText.ok) {
				return { data: null, error: replyText.error, ok: false };
			}

			await this.store.useAppend(id, { role: "user", content: text });
			await this.store.useAppend(id, { role: "assistant", content: replyText.data });

			return { data: { reply: replyText.data, sessionId: id }, error: null, ok: true };
		} catch (error: unknown) {
			return {
				data: null,
				error: { message: `[Assistant] ${toMessage(error)}`, status: 0 },
				ok: false,
			};
		}
	}
}

/* -------------------------------------------------------------------------- */
/* Wrappers (backward compatibility)                                          */
/* -------------------------------------------------------------------------- */

/**
 * Configures the assistant: provider (Kitt) plus an optional conversation store.
 *
 * @param config - Assistant configuration.
 *
 * @example
 * ```ts
 * import { useInitAssistant } from "katanakit-js";
 *
 * useInitAssistant({ model: "qwen3.8-max" });
 * ```
 */
export function useInitAssistant(config: AssistantInitConfig = {}): void {
	AssistantService.getInstance().useInitAssistant(config);
}

/**
 * Creates a new conversation session.
 *
 * @param channel - Optional free-form channel tag (e.g. `"rest"`).
 * @returns The new session id.
 *
 * @example
 * ```ts
 * const sessionId = await useCreateSession("rest");
 * ```
 */
export async function useCreateSession(channel?: string): Promise<string> {
	return AssistantService.getInstance().useCreateSession(channel);
}

/**
 * Checks whether a conversation session exists.
 *
 * @param sessionId - The conversation session id.
 * @returns `true` when the session exists.
 *
 * @example
 * ```ts
 * const exists = await useSessionExists(sessionId);
 * ```
 */
export async function useSessionExists(sessionId: string): Promise<boolean> {
	return AssistantService.getInstance().useSessionExists(sessionId);
}

/**
 * Returns the full message history of a session, oldest first.
 *
 * @param sessionId - The conversation session id.
 * @returns The accumulated messages.
 *
 * @example
 * ```ts
 * const history = await useGetHistory(sessionId);
 * ```
 */
export async function useGetHistory(sessionId: string): Promise<AiMessage[]> {
	return AssistantService.getInstance().useGetHistory(sessionId);
}

/**
 * Deletes a conversation session and its messages.
 *
 * @param sessionId - The conversation session id to reset.
 *
 * @example
 * ```ts
 * await useResetSession(sessionId);
 * ```
 */
export async function useResetSession(sessionId: string): Promise<void> {
	return AssistantService.getInstance().useResetSession(sessionId);
}

/**
 * Sends a user message within a conversation and returns the assistant reply.
 * If no `sessionId` is provided, a new session is created. The user message and
 * the assistant reply are persisted only on success.
 *
 * @param sessionId - Existing session id, or `undefined` to start a new one.
 * @param text - The user's message.
 * @param options - Optional completion options.
 * @returns An {@link AssistantResult} with the reply and session id.
 *
 * @example
 * ```ts
 * import { useReply } from "katanakit-js";
 *
 * const result = await useReply(undefined, "How do I reset my password?");
 * if (result.ok) console.log(result.data.reply);
 * ```
 */
export async function useReply(
	sessionId: string | undefined,
	text: string,
	options: AssistantReplyOptions = {},
): Promise<AssistantResult> {
	return AssistantService.getInstance().useReply(sessionId, text, options);
}

/** Object facade implementing {@link IAssistantService} over the singleton. */
export const assistant: IAssistantService = {
	useInitAssistant,
	useReply,
	useCreateSession,
	useSessionExists,
	useGetHistory,
	useResetSession,
};
