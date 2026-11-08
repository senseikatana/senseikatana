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

Defined in: [schemas/directory.schema.ts:77](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/directory.schema.ts#L77)

Safe result of a directory operation. Never throws for a refused action.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
