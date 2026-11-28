[katanakit-js](../index.md) / ApiErrorSchema

# Variable: ApiErrorSchema

```ts
const ApiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/common.schema.ts:25](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/common.schema.ts#L25)

Safe error returned on non-2xx, network or validation failures.
