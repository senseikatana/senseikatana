[katanakit-js](../index.md) / DirectoryErrorCodeSchema

# Variable: DirectoryErrorCodeSchema

```ts
const DirectoryErrorCodeSchema: ZodEnum<{
  already_active: "already_active";
  already_suspended: "already_suspended";
  deactivated_identity: "deactivated_identity";
  invalid_input: "invalid_input";
  last_owner: "last_owner";
  not_found: "not_found";
  privilege_escalation: "privilege_escalation";
  self_demotion: "self_demotion";
  self_suspension: "self_suspension";
}>;
```

Defined in: [schemas/directory.schema.ts:38](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/directory.schema.ts#L38)

Why an operation was refused.

A stable, machine-readable `code` is the whole point: a UI needs to say
something different for "you cannot demote the last owner" than for "that
email is already registered", and matching on message text is how that breaks.
