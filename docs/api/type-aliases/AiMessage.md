[katanakit-js](../index.md) / AiMessage

# Type Alias: AiMessage

```ts
type AiMessage = z.infer<typeof AiMessageSchema>;
```

Defined in: [types/core/ai.ts:32](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L32)

A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose:
they mirror the OpenAI-compatible protocol so messages pass through unchanged.
