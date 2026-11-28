[katanakit-js](../index.md) / WpRoleDefinition

# Type Alias: WpRoleDefinition

```ts
type WpRoleDefinition = z.infer<typeof WpRoleDefinitionSchema>;
```

Defined in: [types/wordpress/types.ts:123](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L123)

A role declaration: the PHP-free replacement for `add_role()`.

Holds both capability vocabularies — the toolkit's namespaced capabilities
(used by `onCan()` and the framework guards) and WordPress' own snake_case
names (declared for the site, verified with `onWpAuditRole`).
