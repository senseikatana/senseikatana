[katanakit-js](../index.md) / ApiErrorSchema

# Variable: ApiErrorSchema

```ts
const ApiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/common.schema.ts:25](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/common.schema.ts#L25)

Safe error returned on non-2xx, network or validation failures.
