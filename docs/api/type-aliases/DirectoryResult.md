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

Defined in: [schemas/directory.schema.ts:77](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/directory.schema.ts#L77)

Safe result of a directory operation. Never throws for a refused action.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
