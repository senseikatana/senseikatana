[katanakit-js](../index.md) / IfConfig

# Type Alias: IfConfig

```ts
type IfConfig = z.infer<typeof IfConfigSchema>;
```

Defined in: [types/adapters/insforge.ts:21](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/adapters/insforge.ts#L21)

Config for the InsForge adapter. InsForge is the database fallback
(primary data layer is Cloudflare); storage and edge functions
are also available through the same client.
