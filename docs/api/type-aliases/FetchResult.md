[katanakit-js](../index.md) / FetchResult

# Type Alias: FetchResult\<T\>

```ts
type FetchResult<T> = 
  | {
  data: T;
  error: null;
  ok: true;
  status: number;
  url: string;
}
  | {
  data: null;
  error: ApiError;
  ok: false;
  status: number;
  url: string;
};
```

Defined in: [types/core/http.ts:67](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/http.ts#L67)

Safe result, discriminated union (Astro Actions style) without throwing.
The `ok` flag narrows the union between the success and error branches.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |
