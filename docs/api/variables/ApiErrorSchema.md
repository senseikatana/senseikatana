[katanakit-js](../index.md) / ApiErrorSchema

# Variable: ApiErrorSchema

```ts
const ApiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/common.schema.ts:25](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/common.schema.ts#L25)

Safe error returned on non-2xx, network or validation failures.
