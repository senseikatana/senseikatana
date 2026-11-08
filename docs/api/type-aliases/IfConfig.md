[katanakit-js](../index.md) / IfConfig

# Type Alias: IfConfig

```ts
type IfConfig = z.infer<typeof IfConfigSchema>;
```

Defined in: [types/adapters/insforge.ts:21](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/insforge.ts#L21)

Config for the InsForge adapter. InsForge is the database fallback
(primary data layer is Cloudflare); storage and edge functions
are also available through the same client.
