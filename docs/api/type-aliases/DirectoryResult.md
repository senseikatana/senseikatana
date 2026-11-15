[katanakit-js](../index.md) / DirectoryResult

# Type Alias: DirectoryResult\<T\>

```ts
type DirectoryResult<T> = 
  | {
  data: T;
  error: null;
  ok: true;
}
  | {
  data: null;
  error: DirectoryError;
  ok: false;
};
```

Defined in: [schemas/directory.schema.ts:77](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/directory.schema.ts#L77)

Safe result of a directory operation. Never throws for a refused action.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
