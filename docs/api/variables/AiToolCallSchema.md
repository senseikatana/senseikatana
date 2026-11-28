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

Defined in: [schemas/ai.schema.ts:13](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/ai.schema.ts#L13)

A single tool call emitted by the model (OpenAI-compatible wire shape).
