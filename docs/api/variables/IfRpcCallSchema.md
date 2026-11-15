[katanakit-js](../index.md) / IfRpcCallSchema

# Variable: IfRpcCallSchema

```ts
const IfRpcCallSchema: ZodObject<{
  name: ZodString;
  params: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  schema: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:69](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/insforge.schema.ts#L69)

Postgres function (RPC) call.
