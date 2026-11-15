[katanakit-js](../index.md) / AiErrorSchema

# Variable: AiErrorSchema

```ts
const AiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:186](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/core.schema.ts#L186)

Safe error returned on non-2xx or network failures (AI boundary).
