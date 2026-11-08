[katanakit-js](../index.md) / AccessCapability

# Type Alias: AccessCapability

```ts
type AccessCapability = z.infer<typeof AccessCapabilitySchema>;
```

Defined in: [types/core/access.ts:45](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/access.ts#L45)

A namespaced capability, `<domain>:<action>[:<scope>]`.

Independent of how the subject authenticated: a role never reveals whether
the session came from a password, an OAuth provider or a passkey.
