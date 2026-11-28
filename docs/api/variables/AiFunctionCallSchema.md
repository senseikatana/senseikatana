[katanakit-js](../index.md) / AiFunctionCallSchema

# Variable: AiFunctionCallSchema

```ts
const AiFunctionCallSchema: ZodObject<{
  arguments: ZodString;
  name: ZodString;
}, $strip>;
```

Defined in: [schemas/ai.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/ai.schema.ts#L7)

Function invocation requested by the model when using tools.
