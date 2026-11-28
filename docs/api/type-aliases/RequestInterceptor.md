[katanakit-js](../index.md) / RequestInterceptor

# Type Alias: RequestInterceptor

```ts
type RequestInterceptor = (request) => void | Promise<void>;
```

Defined in: [types/core/http.ts:90](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/http.ts#L90)

Inspects or modifies a request before fetch; interceptors run in registration order.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | [`FetchRequest`](../interfaces/FetchRequest.md) |

## Returns

`void` \| `Promise`\<`void`\>
