[katanakit-js](../index.md) / IdentityStatusSchema

# Variable: IdentityStatusSchema

```ts
const IdentityStatusSchema: ZodEnum<{
  active: "active";
  deactivated: "deactivated";
  pending: "pending";
  suspended: "suspended";
}>;
```

Defined in: [schemas/identity.schema.ts:48](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/identity.schema.ts#L48)

Lifecycle of an account you own.

`deactivated` is not `deleted`. Removing the row at the provider leaves a
live session and an account the provider still recognises; deactivation
keeps the audit trail, revokes your own access, and is reversible.
