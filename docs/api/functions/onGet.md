[katanakit-js](../index.md) / onGet

# Function: onGet()

```ts
function onGet<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:671](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L671)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `urlOptions?` | [`UrlOptions`](../interfaces/UrlOptions.md) |

## Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>
