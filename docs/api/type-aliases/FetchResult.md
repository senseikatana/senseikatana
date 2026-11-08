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

Defined in: [types/core/http.ts:67](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L67)

Safe result, discriminated union (Astro Actions style) without throwing.
The `ok` flag narrows the union between the success and error branches.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |
