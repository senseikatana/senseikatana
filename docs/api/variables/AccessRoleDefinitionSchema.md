[katanakit-js](../index.md) / AccessRoleDefinitionSchema

# Variable: AccessRoleDefinitionSchema

```ts
const AccessRoleDefinitionSchema: ZodObject<{
  capabilities: ZodArray<ZodString>;
  label: ZodString;
  rank: ZodNumber;
  slug: ZodString;
}, $strip>;
```

Defined in: [schemas/access.schema.ts:87](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/access.schema.ts#L87)

A role definition.

`rank` lives on the definition rather than in a lookup table so a custom
role participates in the hierarchy on equal terms — a rank hardcoded
outside the registry makes every registered role silently inherit nothing.
Lower is more privileged.
