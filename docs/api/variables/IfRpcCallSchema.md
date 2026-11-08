[katanakit-js](../index.md) / IfRpcCallSchema

# Variable: IfRpcCallSchema

```ts
const IfRpcCallSchema: ZodObject<{
  name: ZodString;
  params: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  schema: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:69](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/insforge.schema.ts#L69)

Postgres function (RPC) call.
