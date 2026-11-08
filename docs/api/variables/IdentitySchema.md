[katanakit-js](../index.md) / IdentitySchema

# Variable: IdentitySchema

```ts
const IdentitySchema: ZodObject<{
  displayName: ZodOptional<ZodString>;
  email: ZodOptional<ZodString>;
  id: ZodString;
  metadata: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  principalSubject: ZodString;
  provider: ZodString;
  roles: ZodDefault<ZodArray<ZodString>>;
  status: ZodDefault<ZodEnum<{
     active: "active";
     deactivated: "deactivated";
     pending: "pending";
     suspended: "suspended";
  }>>;
}, $strip>;
```

Defined in: [schemas/identity.schema.ts:63](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/identity.schema.ts#L63)

A person **in your system**, as opposed to the principal they log in with.

The split exists because the two have different owners and different
lifecycles. The principal belongs to the provider and is recreated at every
login. The identity belongs to you: it survives a password change, a new
phone, a move between providers, and it is what a role attaches to.

`metadata` holds whatever your deployment needs to know about the person —
a national identity number, a department, a hire date. The kit has no
opinion about those fields; putting them here rather than in the schema is
what keeps the kit usable outside one country.
