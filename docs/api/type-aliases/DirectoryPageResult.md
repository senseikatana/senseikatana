[katanakit-js](../index.md) / DirectoryPageResult

# Type Alias: DirectoryPageResult

```ts
type DirectoryPageResult = DirectoryResult<{
  nextCursor?: string;
  total?: number;
  users: DirectoryUser[];
}>;
```

Defined in: [schemas/directory.schema.ts:81](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/directory.schema.ts#L81)

Shape a repository must satisfy — lets a plain object be passed as one.
