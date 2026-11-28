[katanakit-js](../index.md) / useBuildUrl

# Function: useBuildUrl()

```ts
function useBuildUrl(
   apiName, 
   endpointName, 
   options?
): string;
```

Defined in: [core/services/http.service.ts:701](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/http.service.ts#L701)

Returns the URL of a registered endpoint **without calling `fetch`**.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | Registered API key (from `defineApiConfig`). |
| `endpointName` | `string` | Endpoint key inside that API. |
| `options?` | [`UrlOptions`](../interfaces/UrlOptions.md) | `params` fills `:placeholders`, `query` becomes the search string. |

## Returns

`string`

The fully built URL.

## Throws

Unknown API, unknown endpoint, or a scheme that is not http(s).

## Example

```ts
import { useBuildUrl } from "katanakit-js";

useBuildUrl("pokeapi", "pokemonById", { params: { id: 25 } });
// → "https://pokeapi.co/api/v2/pokemon/25"
```
