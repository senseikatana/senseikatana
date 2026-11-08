[katanakit-js](../index.md) / RequestInterceptor

# Type Alias: RequestInterceptor

```ts
type RequestInterceptor = (request) => void | Promise<void>;
```

Defined in: [types/core/http.ts:90](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L90)

Inspects or modifies a request before fetch; interceptors run in registration order.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | [`FetchRequest`](../interfaces/FetchRequest.md) |

## Returns

`void` \| `Promise`\<`void`\>
