[katanakit-js](../index.md) / AccessCapabilitySchema

# Variable: AccessCapabilitySchema

```ts
const AccessCapabilitySchema: ZodString;
```

Defined in: [schemas/access.schema.ts:70](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/access.schema.ts#L70)

A capability: at least `<domain>:<action>`, optionally `:action:<scope>`.
Rejecting a bare word matters — an unscoped `delete` is exactly the
ambiguity `content:delete:own` exists to remove.
