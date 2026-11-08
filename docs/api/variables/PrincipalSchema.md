[katanakit-js](../index.md) / PrincipalSchema

# Variable: PrincipalSchema

```ts
const PrincipalSchema: ZodObject<{
  claims: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
  email: ZodOptional<ZodString>;
  emailVerified: ZodOptional<ZodBoolean>;
  method: ZodString;
  provider: ZodString;
  subject: ZodString;
}, $strip>;
```

Defined in: [schemas/identity.schema.ts:23](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/identity.schema.ts#L23)

A principal is the *result of authenticating*: who the provider says you
are, and how it proved it.

It deliberately carries no roles. The method that proved the identity
(`oauth:google`, `password`, `otp`, `passkey`) is a fact about the
credential, never about the person — that separation is what lets one
deployment offer SSO to contractors and a password to employees without the
authorization layer noticing.

`provider` and `method` are open strings. The kit has no opinion about the
catalog: `better-auth`, `insforge`, `ldap`, `saml`, or a national identity
document number are all just values here.
