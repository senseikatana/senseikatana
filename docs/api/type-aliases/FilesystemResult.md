[katanakit-js](../index.md) / FilesystemResult

# Type Alias: FilesystemResult\<T\>

```ts
type FilesystemResult<T> = SafeResult<T, FilesystemError>;
```

Defined in: [types/core/filesystem.ts:25](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/filesystem.ts#L25)

Safe Result for filesystem operations: `{ data, error, ok }`, never throws.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
