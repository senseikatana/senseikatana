[katanakit-js](../index.md) / useGetUrlParams

# Function: useGetUrlParams()

```ts
function useGetUrlParams(urlString): Record<string, string>;
```

Defined in: [core/services/utils.service.ts:560](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L560)

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
