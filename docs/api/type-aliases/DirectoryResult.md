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

Defined in: [schemas/directory.schema.ts:74](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/directory.schema.ts#L74)

Safe result of a directory operation. Never throws for a refused action.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
