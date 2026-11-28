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

Defined in: [schemas/directory.schema.ts:77](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/directory.schema.ts#L77)

Safe result of a directory operation. Never throws for a refused action.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
