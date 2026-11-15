[katanakit-js](../index.md) / AiMessage

# Type Alias: AiMessage

```ts
type AiMessage = z.infer<typeof AiMessageSchema>;
```

Defined in: [types/core/ai.ts:32](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/core/ai.ts#L32)

A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose:
they mirror the OpenAI-compatible protocol so messages pass through unchanged.
