[katanakit-js](../index.md) / AiMessage

# Type Alias: AiMessage

```ts
type AiMessage = z.infer<typeof AiMessageSchema>;
```

Defined in: [types/core/ai.ts:29](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L29)

A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose: they mirror the OpenAI-compatible protocol so messages pass through unchanged.
