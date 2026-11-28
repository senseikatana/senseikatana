[katanakit-js](../index.md) / AccessSubject

# Type Alias: AccessSubject

```ts
type AccessSubject = z.infer<typeof AccessSubjectSchema>;
```

Defined in: [types/core/access.ts:56](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/access.ts#L56)

Structural subject for access checks. Decoupled from the persistence layer:
any object with an id and a role list can be checked (e.g. a Prisma
`Account` row, a JWT payload, or a test fixture). Extra keys are preserved,
so a subject can also carry the principal it was resolved from.
