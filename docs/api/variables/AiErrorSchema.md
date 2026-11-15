[katanakit-js](../index.md) / AiErrorSchema

# Variable: AiErrorSchema

```ts
const AiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:186](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/core.schema.ts#L186)

Safe error returned on non-2xx or network failures (AI boundary).
