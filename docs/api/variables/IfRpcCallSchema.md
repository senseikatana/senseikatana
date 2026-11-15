[katanakit-js](../index.md) / IfRpcCallSchema

# Variable: IfRpcCallSchema

```ts
const IfRpcCallSchema: ZodObject<{
  name: ZodString;
  params: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  schema: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:69](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/insforge.schema.ts#L69)

Postgres function (RPC) call.
