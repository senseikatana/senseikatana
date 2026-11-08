[katanakit-js](../index.md) / BUILT\_IN\_ROLE\_SLUGS

# Variable: BUILT\_IN\_ROLE\_SLUGS

```ts
const BUILT_IN_ROLE_SLUGS: readonly ["owner", "admin", "editor", "author", "contributor", "member", "guest"];
```

Defined in: [schemas/access.schema.ts:19](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/access.schema.ts#L19)

Role slugs that ship with the kit, ordered from most to least privileged.

The vocabulary is deliberately editorial but domain-neutral — it describes
*how much* of a resource pool a subject may touch, not *which* domain it
belongs to. Deployments that need other names register their own (see
`useRegisterRole`); nothing here is closed.

- `owner` — the developer seat: the only role that can grant other roles.
- `admin` — day-to-day administration: manage members, moderate anything.
- `editor` — act on **anyone's** resource in the pool.
- `author` — act on **their own**, including publishing.
- `contributor` — act on their own but **not** publish.
- `member` — a registered account with no authoring rights.
- `guest` — the anonymous default; read-only where reading is public.
