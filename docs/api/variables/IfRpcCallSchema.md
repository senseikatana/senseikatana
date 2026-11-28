[katanakit-js](../index.md) / IfRpcCallSchema

# Variable: IfRpcCallSchema

```ts
const IfRpcCallSchema: ZodObject<{
  name: ZodString;
  params: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  schema: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:69](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/insforge.schema.ts#L69)

Postgres function (RPC) call.
