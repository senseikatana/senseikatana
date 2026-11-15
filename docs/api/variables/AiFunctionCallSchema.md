[katanakit-js](../index.md) / AiFunctionCallSchema

# Variable: AiFunctionCallSchema

```ts
const AiFunctionCallSchema: ZodObject<{
  arguments: ZodString;
  name: ZodString;
}, $strip>;
```

Defined in: [schemas/ai.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/ai.schema.ts#L7)

Function invocation requested by the model when using tools.
