[katanakit-js](../index.md) / onPut

# Function: onPut()

```ts
function onPut<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:688](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L688)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `body?` | `unknown` |
| `urlOptions?` | [`UrlOptions`](../interfaces/UrlOptions.md) |

## Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>
