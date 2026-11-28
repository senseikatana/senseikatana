[katanakit-js](../index.md) / IfConfig

# Type Alias: IfConfig

```ts
type IfConfig = z.infer<typeof IfConfigSchema>;
```

Defined in: [types/adapters/insforge.ts:21](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/adapters/insforge.ts#L21)

Config for the InsForge adapter. InsForge is the database fallback
(primary data layer is Cloudflare); storage and edge functions
are also available through the same client.
