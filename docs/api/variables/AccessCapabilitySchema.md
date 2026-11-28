[katanakit-js](../index.md) / AccessCapabilitySchema

# Variable: AccessCapabilitySchema

```ts
const AccessCapabilitySchema: ZodString;
```

Defined in: [schemas/access.schema.ts:70](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/access.schema.ts#L70)

A capability: at least `<domain>:<action>`, optionally `:action:<scope>`.
Rejecting a bare word matters — an unscoped `delete` is exactly the
ambiguity `content:delete:own` exists to remove.
