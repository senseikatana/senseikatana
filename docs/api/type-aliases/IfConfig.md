[katanakit-js](../index.md) / IfConfig

# Type Alias: IfConfig

```ts
type IfConfig = z.infer<typeof IfConfigSchema>;
```

Defined in: [types/insforge/types.ts:21](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/insforge/types.ts#L21)

Config for the InsForge adapter. InsForge is the database fallback
(primary data layer is Cloudflare); storage and edge functions
are also available through the same client.
