[katanakit-js](../index.md) / useGetUrlParams

# Function: useGetUrlParams()

```ts
function useGetUrlParams(urlString): Record<string, string>;
```

Defined in: [core/services/utils.service.ts:560](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L560)

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
