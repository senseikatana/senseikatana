[katanakit-js](../index.md) / AccessCapabilitySchema

# Variable: AccessCapabilitySchema

```ts
const AccessCapabilitySchema: ZodString;
```

Defined in: [schemas/access.schema.ts:70](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/access.schema.ts#L70)

A capability: at least `<domain>:<action>`, optionally `:action:<scope>`.
Rejecting a bare word matters — an unscoped `delete` is exactly the
ambiguity `content:delete:own` exists to remove.
