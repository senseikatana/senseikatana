[katanakit-js](../index.md) / SafeResult

# Type Alias: SafeResult\<T, E\>

```ts
type SafeResult<T, E> = 
  | {
  data: T;
  error: null;
  ok: true;
}
  | {
  data: null;
  error: E;
  ok: false;
};
```

Defined in: [types/core/http.ts:60](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/core/http.ts#L60)

Generic Safe Result discriminated union (Astro Actions style): the `ok` flag
narrows between the success and error branches and nothing is thrown.

Domain results below are aliases of this shape with a specific error type.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | - |
| <a id="type-parameter-e"></a> `E` | [`ApiError`](ApiError.md) |
