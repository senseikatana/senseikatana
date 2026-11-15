[katanakit-js](../index.md) / DirectoryPageResult

# Type Alias: DirectoryPageResult

```ts
type DirectoryPageResult = DirectoryResult<{
  nextCursor?: string;
  total?: number;
  users: DirectoryUser[];
}>;
```

Defined in: [schemas/directory.schema.ts:81](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/directory.schema.ts#L81)

Shape a repository must satisfy — lets a plain object be passed as one.
