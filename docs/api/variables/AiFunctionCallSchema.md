[katanakit-js](../index.md) / AiFunctionCallSchema

# Variable: AiFunctionCallSchema

```ts
const AiFunctionCallSchema: ZodObject<{
  arguments: ZodString;
  name: ZodString;
}, $strip>;
```

Defined in: [schemas/ai.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/ai.schema.ts#L7)

Function invocation requested by the model when using tools.
