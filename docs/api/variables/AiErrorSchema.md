[katanakit-js](../index.md) / AiErrorSchema

# Variable: AiErrorSchema

```ts
const AiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:186](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/core.schema.ts#L186)

Safe error returned on non-2xx or network failures (AI boundary).
