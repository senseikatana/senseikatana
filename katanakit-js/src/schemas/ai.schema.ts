import { z } from "zod";

/** Role of a chat message in the OpenAI-compatible protocol. */
export const AiRoleSchema = z.enum(["system", "user", "assistant", "tool"]);

/** Function invocation requested by the model when using tools. */
export const AiFunctionCallSchema = z.object({
	name: z.string().min(1),
	arguments: z.string(),
});

/** A single tool call emitted by the model (OpenAI-compatible wire shape). */
export const AiToolCallSchema = z.object({
	id: z.string().min(1),
	type: z.literal("function"),
	function: AiFunctionCallSchema,
});

/**
 * A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose:
 * they mirror the OpenAI-compatible protocol so messages pass through unchanged.
 */
export const AiMessageSchema = z.object({
	role: AiRoleSchema,
	content: z.string().nullable(),
	tool_calls: z.array(AiToolCallSchema).optional(),
	tool_call_id: z.string().optional(),
	name: z.string().optional(),
});

/** Provider configuration for an OpenAI-compatible chat/agent endpoint. */
export const AiProviderConfigSchema = z.object({
	apiKey: z.string(),
	baseUrl: z.string().min(1),
	model: z.string().min(1),
	/** Default system prompt. */
	systemPrompt: z.string().optional(),
});
