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

Defined in: [schemas/identity.schema.ts:48](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/identity.schema.ts#L48)

Lifecycle of an account you own.

`deactivated` is not `deleted`. Removing the row at the provider leaves a
live session and an account the provider still recognises; deactivation
keeps the audit trail, revokes your own access, and is reversible.
