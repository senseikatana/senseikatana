[katanakit-js](../index.md) / WpRoleDefinition

# Type Alias: WpRoleDefinition

```ts
type WpRoleDefinition = z.infer<typeof WpRoleDefinitionSchema>;
```

Defined in: [types/adapters/wordpress.ts:123](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L123)

A role declaration: the PHP-free replacement for `add_role()`.

Holds both capability vocabularies — the toolkit's namespaced capabilities
(used by `useCan()` and the framework guards) and WordPress' own snake_case
names (declared for the site, verified with `useWpAuditRole`).
