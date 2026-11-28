[katanakit-js](../index.md) / onFetch

# Function: onFetch()

```ts
function onFetch<T>(
   apiName, 
   endpointName, 
   options?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:663](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L663)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `options?` | [`FetchOptions`](../interfaces/FetchOptions.md)\<`T`\> |

## Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>
