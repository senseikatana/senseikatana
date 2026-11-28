[katanakit-js](../index.md) / AccessCapability

# Type Alias: AccessCapability

```ts
type AccessCapability = z.infer<typeof AccessCapabilitySchema>;
```

Defined in: [types/core/access.ts:45](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/access.ts#L45)

A namespaced capability, `<domain>:<action>[:<scope>]`.

Independent of how the subject authenticated: a role never reveals whether
the session came from a password, an OAuth provider or a passkey.
