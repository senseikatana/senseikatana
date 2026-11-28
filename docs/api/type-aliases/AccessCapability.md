[katanakit-js](../index.md) / AccessCapability

# Type Alias: AccessCapability

```ts
type AccessCapability = z.infer<typeof AccessCapabilitySchema>;
```

Defined in: [types/core/access.ts:39](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/access.ts#L39)

A namespaced capability, `<domain>:<action>[:<scope>]`.

Independent of how the subject authenticated: a role never reveals whether
the session came from a password, an OAuth provider or a passkey.
