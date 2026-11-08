[katanakit-js](../index.md) / AccessRole

# Type Alias: AccessRole

```ts
type AccessRole = z.infer<typeof AccessRoleSchema>;
```

Defined in: [types/core/access.ts:37](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/access.ts#L37)

A role slug. Closed vocabulary by convention (`BuiltInRole`), open by
schema: `useRegisterRole` takes any slug matching the pattern.

- `owner` — the site owner; the only role that can manage roles and perform
  system-level operations. There should be exactly one owner.
- `admin` — day-to-day administration: manage members and moderate anything.
- `editor` — act on anyone's resource.
- `author` — create and act on their own, including publishing.
- `contributor` — act on their own but not publish.
- `member` — registered account; can use the assistant and read content.
- `guest` — anonymous default; read-only, never persisted.
