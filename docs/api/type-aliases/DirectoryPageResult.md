[katanakit-js](../index.md) / DirectoryPageResult

# Type Alias: DirectoryPageResult

```ts
type DirectoryPageResult = DirectoryResult<{
  nextCursor?: string;
  total?: number;
  users: DirectoryUser[];
}>;
```

Defined in: [schemas/directory.schema.ts:81](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/directory.schema.ts#L81)

Shape a repository must satisfy — lets a plain object be passed as one.
