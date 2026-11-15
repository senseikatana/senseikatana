[katanakit-js](../index.md) / FilesystemResult

# Type Alias: FilesystemResult\<T\>

```ts
type FilesystemResult<T> = SafeResult<T, FilesystemError>;
```

Defined in: [types/core/filesystem.ts:25](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/types/core/filesystem.ts#L25)

Safe Result for filesystem operations: `{ data, error, ok }`, never throws.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
