[katanakit-js](../index.md) / RequestInterceptor

# Type Alias: RequestInterceptor

```ts
type RequestInterceptor = (request) => void | Promise<void>;
```

Defined in: [types/core/http.ts:90](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/types/core/http.ts#L90)

Inspects or modifies a request before fetch; interceptors run in registration order.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | [`FetchRequest`](../interfaces/FetchRequest.md) |

## Returns

`void` \| `Promise`\<`void`\>
