[katanakit-js](../index.md) / AccessSubject

# Type Alias: AccessSubject

```ts
type AccessSubject = z.infer<typeof AccessSubjectSchema>;
```

Defined in: [types/core/access.ts:50](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/access.ts#L50)

Structural subject for access checks. Decoupled from the persistence layer:
any object with an id and a role list can be checked (e.g. a Prisma
`Account` row, a JWT payload, or a test fixture). Extra keys are preserved,
so a subject can also carry the principal it was resolved from.
