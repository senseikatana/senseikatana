[katanakit-js](../index.md) / AiErrorSchema

# Variable: AiErrorSchema

```ts
const AiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:177](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L177)

Safe error returned on non-2xx or network failures (AI boundary).
