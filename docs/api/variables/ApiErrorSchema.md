[katanakit-js](../index.md) / ApiErrorSchema

# Variable: ApiErrorSchema

```ts
const ApiErrorSchema: ZodObject<{
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  status: ZodNumber;
}, $strip>;
```

Defined in: [schemas/common.schema.ts:25](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/common.schema.ts#L25)

Safe error returned on non-2xx, network or validation failures.
