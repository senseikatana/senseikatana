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

Defined in: [schemas/ai.schema.ts:23](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/ai.schema.ts#L23)

A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose:
they mirror the OpenAI-compatible protocol so messages pass through unchanged.
