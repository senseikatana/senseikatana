[katanakit-js](../index.md) / useFetchApi

# Function: useFetchApi()

```ts
function useFetchApi<T>(
   apiName, 
   endpointName, 
   options?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:664](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/http.service.ts#L664)

Fetches a registered endpoint and returns a Safe Result.
Alias for [useFetch](useFetch.md).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `options?` | [`FetchOptions`](../interfaces/FetchOptions.md)\<`T`\> | Optional fetch options. |

## Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error.
