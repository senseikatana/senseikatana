[katanakit-js](../index.md) / useGet

# Function: useGet()

```ts
function useGet<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:687](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L687)

GET helper over a registered API endpoint.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `urlOptions?` | [`UrlOptions`](../interfaces/UrlOptions.md) | Optional URL building options. |

## Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error.

## Example

```ts
import { useGet } from "katanakit-js";

const result = await useGet("pokeapi", "pokemonById", { params: { id: 25 } });
```
