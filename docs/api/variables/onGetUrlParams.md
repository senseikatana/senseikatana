[katanakit-js](../index.md) / onGetUrlParams

# Variable: onGetUrlParams

```ts
onGetUrlParams: (urlString) => Record<string, string>;
```

Defined in: [core/services/utils.service.ts:413](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L413)

Parses query parameters from a URL string into a plain object.
Returns an empty object for invalid URLs.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `urlString` | `string` | The URL to parse. |

## Returns

`Record`\<`string`, `string`\>

An object mapping parameter names to values.

## Example

```ts
getUrlParams("https://example.com?q=hello&page=1");
// { q: "hello", page: "1" }
```
