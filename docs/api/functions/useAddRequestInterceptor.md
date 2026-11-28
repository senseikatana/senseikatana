[katanakit-js](../index.md) / useAddRequestInterceptor

# Function: useAddRequestInterceptor()

```ts
function useAddRequestInterceptor(interceptor): () => void;
```

Defined in: [core/services/http.service.ts:655](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/http.service.ts#L655)

Registers a request interceptor on the singleton HTTP client.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `interceptor` | [`RequestInterceptor`](../type-aliases/RequestInterceptor.md) | The function to run before the request is sent. |

## Returns

A function that unregisters the interceptor.

() => `void`
