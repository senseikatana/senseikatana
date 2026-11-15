[katanakit-js](../index.md) / AiMessage

# Type Alias: AiMessage

```ts
type AiMessage = z.infer<typeof AiMessageSchema>;
```

Defined in: [types/core/ai.ts:32](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/types/core/ai.ts#L32)

A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose:
they mirror the OpenAI-compatible protocol so messages pass through unchanged.
