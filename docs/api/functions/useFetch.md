[katanakit-js](../index.md) / useFetch

# Function: useFetch()

```ts
function useFetch<T>(
   apiName, 
   endpointName, 
   options?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:725](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/http.service.ts#L725)

Fetches a registered endpoint and returns a Safe Result.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `options?` | [`FetchOptions`](../interfaces/FetchOptions.md)\<`T`\> | Fetch options: `params`, `query`, `transform` and any `RequestInit` field. |

## Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error. Never throws.

## Example

```ts
import { useFetch } from "katanakit-js";

const result = await useFetch("pokeapi", "pokemonById", { params: { id: 25 } });
if (result.ok) console.log(result.data);
```
