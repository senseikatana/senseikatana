[katanakit-js](../index.md) / FilesystemResult

# Type Alias: FilesystemResult\<T\>

```ts
type FilesystemResult<T> = SafeResult<T, FilesystemError>;
```

Defined in: [types/core/filesystem.ts:25](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/filesystem.ts#L25)

Safe Result for filesystem operations: `{ data, error, ok }`, never throws.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
