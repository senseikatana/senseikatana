[katanakit-js](../index.md) / FilesystemResult

# Type Alias: FilesystemResult\<T\>

```ts
type FilesystemResult<T> = SafeResult<T, FilesystemError>;
```

Defined in: [types/core/filesystem.ts:25](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/filesystem.ts#L25)

Safe Result for filesystem operations: `{ data, error, ok }`, never throws.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
