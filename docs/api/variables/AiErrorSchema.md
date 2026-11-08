[katanakit-js](../index.md) / AiErrorSchema

# Variable: AiErrorSchema

```ts
const AiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:186](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/core.schema.ts#L186)

Safe error returned on non-2xx or network failures (AI boundary).
