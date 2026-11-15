[katanakit-js](../index.md) / AiFunctionCallSchema

# Variable: AiFunctionCallSchema

```ts
const AiFunctionCallSchema: ZodObject<{
  arguments: ZodString;
  name: ZodString;
}, $strip>;
```

Defined in: [schemas/ai.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/ai.schema.ts#L7)

Function invocation requested by the model when using tools.
