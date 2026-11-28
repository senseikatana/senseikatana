[katanakit-js](../index.md) / WpRoleDefinition

# Type Alias: WpRoleDefinition

```ts
type WpRoleDefinition = z.infer<typeof WpRoleDefinitionSchema>;
```

Defined in: [types/adapters/wordpress.ts:123](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/adapters/wordpress.ts#L123)

A role declaration: the PHP-free replacement for `add_role()`.

Holds both capability vocabularies — the toolkit's namespaced capabilities
(used by `useCan()` and the framework guards) and WordPress' own snake_case
names (declared for the site, verified with `useWpAuditRole`).
