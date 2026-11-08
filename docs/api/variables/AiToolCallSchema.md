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

Defined in: [schemas/ai.schema.ts:13](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/ai.schema.ts#L13)

A single tool call emitted by the model (OpenAI-compatible wire shape).
