[katanakit-js](../index.md) / AccessCapability

# Type Alias: AccessCapability

```ts
type AccessCapability = z.infer<typeof AccessCapabilitySchema>;
```

Defined in: [types/core/access.ts:45](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/types/core/access.ts#L45)

A namespaced capability, `<domain>:<action>[:<scope>]`.

Independent of how the subject authenticated: a role never reveals whether
the session came from a password, an OAuth provider or a passkey.
