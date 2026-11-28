[katanakit-js](../index.md) / AccessRole

# Type Alias: AccessRole

```ts
type AccessRole = z.infer<typeof AccessRoleSchema>;
```

Defined in: [types/core/access.ts:31](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/access.ts#L31)

A role slug. Closed vocabulary by convention (`BuiltInRole`), open by
schema: `onRegisterRole` takes any slug matching the pattern.

- `owner` — the site owner; the only role that can manage roles and perform
  system-level operations. There should be exactly one owner.
- `admin` — day-to-day administration: manage members and moderate anything.
- `editor` — act on anyone's resource.
- `author` — create and act on their own, including publishing.
- `contributor` — act on their own but not publish.
- `member` — registered account; can use the assistant and read content.
- `guest` — anonymous default; read-only, never persisted.
