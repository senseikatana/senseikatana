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

Defined in: [schemas/identity.schema.ts:48](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/identity.schema.ts#L48)

Lifecycle of an account you own.

`deactivated` is not `deleted`. Removing the row at the provider leaves a
live session and an account the provider still recognises; deactivation
keeps the audit trail, revokes your own access, and is reversible.
