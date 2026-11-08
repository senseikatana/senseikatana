[katanakit-js](../index.md) / usePatch

# Function: usePatch()

```ts
function usePatch<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:763](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L763)

PATCH helper over a registered API endpoint.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `body?` | `unknown` | Optional request body (auto-serialized to JSON unless raw). |
| `urlOptions?` | [`UrlOptions`](../interfaces/UrlOptions.md) | Optional URL building options. |

## Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error.
