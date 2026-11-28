[katanakit-js](../index.md) / IfRpcCallSchema

# Variable: IfRpcCallSchema

```ts
const IfRpcCallSchema: ZodObject<{
  name: ZodString;
  params: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  schema: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:69](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/insforge.schema.ts#L69)

Postgres function (RPC) call.
