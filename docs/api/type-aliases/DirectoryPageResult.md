[katanakit-js](../index.md) / DirectoryPageResult

# Type Alias: DirectoryPageResult

```ts
type DirectoryPageResult = DirectoryResult<{
  nextCursor?: string;
  total?: number;
  users: DirectoryUser[];
}>;
```

Defined in: [schemas/directory.schema.ts:78](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/directory.schema.ts#L78)

Shape a repository must satisfy — lets a plain object be passed as one.
