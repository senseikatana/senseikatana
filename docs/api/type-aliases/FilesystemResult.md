[katanakit-js](../index.md) / FilesystemResult

# Type Alias: FilesystemResult\<T\>

```ts
type FilesystemResult<T> = SafeResult<T, FilesystemError>;
```

Defined in: [types/core/filesystem.ts:25](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/core/filesystem.ts#L25)

Safe Result for filesystem operations: `{ data, error, ok }`, never throws.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
