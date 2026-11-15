[katanakit-js](../index.md) / useAddRequestInterceptor

# Function: useAddRequestInterceptor()

```ts
function useAddRequestInterceptor(interceptor): () => void;
```

Defined in: [core/services/http.service.ts:577](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/http.service.ts#L577)

Registers a request interceptor on the singleton HTTP client.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `interceptor` | [`RequestInterceptor`](../type-aliases/RequestInterceptor.md) | The function to run before the request is sent. |

## Returns

A function that unregisters the interceptor.

() => `void`
