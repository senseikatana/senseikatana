[katanakit-js](../index.md) / DirectoryPageResult

# Type Alias: DirectoryPageResult

```ts
type DirectoryPageResult = DirectoryResult<{
  nextCursor?: string;
  total?: number;
  users: DirectoryUser[];
}>;
```

Defined in: [schemas/directory.schema.ts:81](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/directory.schema.ts#L81)

Shape a repository must satisfy — lets a plain object be passed as one.
