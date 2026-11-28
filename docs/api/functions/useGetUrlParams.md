[katanakit-js](../index.md) / useGetUrlParams

# Function: useGetUrlParams()

```ts
function useGetUrlParams(urlString): Record<string, string>;
```

Defined in: [core/services/utils.service.ts:560](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/utils.service.ts#L560)

Parses query parameters from a URL string into a plain object.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `urlString` | `string` |

## Returns

`Record`\<`string`, `string`\>

## Example

```ts
useGetUrlParams("https://example.com?q=hello&page=1");
```
