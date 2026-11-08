[katanakit-js](../index.md) / useAddRequestInterceptor

# Function: useAddRequestInterceptor()

```ts
function useAddRequestInterceptor(interceptor): () => void;
```

Defined in: [core/services/http.service.ts:577](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L577)

Registers a request interceptor on the singleton HTTP client.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `interceptor` | [`RequestInterceptor`](../type-aliases/RequestInterceptor.md) | The function to run before the request is sent. |

## Returns

A function that unregisters the interceptor.

() => `void`
