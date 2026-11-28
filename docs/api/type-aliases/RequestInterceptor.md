[katanakit-js](../index.md) / RequestInterceptor

# Type Alias: RequestInterceptor

```ts
type RequestInterceptor = (request) => void | Promise<void>;
```

Defined in: [types/core/http.ts:87](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L87)

Inspects or modifies a request before fetch; interceptors run in registration order.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | [`FetchRequest`](../interfaces/FetchRequest.md) |

## Returns

`void` \| `Promise`\<`void`\>
