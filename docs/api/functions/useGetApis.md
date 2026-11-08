[katanakit-js](../index.md) / useGetApis

# Function: useGetApis()

```ts
function useGetApis(): ApisConfig;
```

Defined in: [core/services/http.service.ts:593](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L593)

Returns a shallow copy of the registered APIs (safe to mutate locally).

## Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

A shallow copy of the current API registry.

## Example

```ts
import { useGetApis } from "katanakit-js";

const apis = useGetApis();
```
