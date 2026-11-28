[katanakit-js](../index.md) / IfConfigSchema

# Variable: IfConfigSchema

```ts
const IfConfigSchema: ZodObject<{
  accessToken: ZodOptional<ZodString>;
  anonKey: ZodOptional<ZodString>;
  apiKey: ZodOptional<ZodString>;
  baseUrl: ZodString;
  schema: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:8](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/insforge.schema.ts#L8)

Config for the InsForge adapter. InsForge is the database fallback
(primary data layer is Cloudflare); storage and edge functions
are also available through the same client.
