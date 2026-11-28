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

Defined in: [schemas/ai.schema.ts:13](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/ai.schema.ts#L13)

A single tool call emitted by the model (OpenAI-compatible wire shape).
