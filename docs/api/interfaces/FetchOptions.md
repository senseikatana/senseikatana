[katanakit-js](../index.md) / FetchOptions

# Interface: FetchOptions\<T\>

Defined in: [types/core/http.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L40)

Options passed when executing a fetch request.

URL building lives **at the top level** — the same shape as `useGet`,
`useRequest` and Nuxt's `useFetch` — so nothing has to be nested:

```ts
useFetch("api", "byId", { method: "GET", params: { id: 25 }, query: { limit: 2 } });
```

## Extends

- `RequestInit`

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `any` | The type [FetchOptions.transform](#transform) resolves to. Defaults to `any` on purpose: with `unknown` a bare `FetchOptions` (or one stored in a variable / passed through a wrapper) would no longer be assignable to `FetchOptions<T>`, which is a type-level break for existing callers. |

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="ignoredefaultquery"></a> `ignoreDefaultQuery?` | `boolean` | Skip the endpoint's `defaultQueryParams` instead of merging them. | [types/core/http.ts:46](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L46) |
| <a id="params"></a> `params?` | [`PathParams`](../type-aliases/PathParams.md) | Path params substituted into `:name` placeholders of the endpoint. | [types/core/http.ts:42](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L42) |
| <a id="query"></a> `query?` | [`QueryParams`](../type-aliases/QueryParams.md) | Query-string params appended to the URL. | [types/core/http.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L44) |
| <a id="transform"></a> `transform?` | (`input`) => `T` \| `Promise`\<`T`\> | Maps the parsed response body to `T` before it is returned. | [types/core/http.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L48) |
