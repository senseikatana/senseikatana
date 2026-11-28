[katanakit-js](../index.md) / AiFunctionCallSchema

# Variable: AiFunctionCallSchema

```ts
const AiFunctionCallSchema: ZodObject<{
  arguments: ZodString;
  name: ZodString;
}, $strip>;
```

Defined in: [schemas/ai.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/ai.schema.ts#L7)

Function invocation requested by the model when using tools.
