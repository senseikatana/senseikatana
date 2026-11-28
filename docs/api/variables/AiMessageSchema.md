[katanakit-js](../index.md) / AiMessageSchema

# Variable: AiMessageSchema

```ts
const AiMessageSchema: ZodObject<{
  content: ZodNullable<ZodString>;
  name: ZodOptional<ZodString>;
  role: ZodEnum<{
     assistant: "assistant";
     system: "system";
     tool: "tool";
     user: "user";
  }>;
  tool_call_id: ZodOptional<ZodString>;
  tool_calls: ZodOptional<ZodArray<ZodObject<{
     function: ZodObject<{
        arguments: ZodString;
        name: ZodString;
     }, $strip>;
     id: ZodString;
     type: ZodLiteral<"function">;
  }, $strip>>>;
}, $strip>;
```

Defined in: [schemas/ai.schema.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/ai.schema.ts#L20)

A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose: they mirror the OpenAI-compatible protocol so messages pass through unchanged.
