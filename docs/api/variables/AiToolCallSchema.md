[katanakit-js](../index.md) / AiToolCallSchema

# Variable: AiToolCallSchema

```ts
const AiToolCallSchema: ZodObject<{
  function: ZodObject<{
     arguments: ZodString;
     name: ZodString;
  }, $strip>;
  id: ZodString;
  type: ZodLiteral<"function">;
}, $strip>;
```

Defined in: [schemas/ai.schema.ts:13](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/ai.schema.ts#L13)

A single tool call emitted by the model (OpenAI-compatible wire shape).
