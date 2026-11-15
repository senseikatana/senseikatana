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

Defined in: [schemas/ai.schema.ts:13](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/ai.schema.ts#L13)

A single tool call emitted by the model (OpenAI-compatible wire shape).
