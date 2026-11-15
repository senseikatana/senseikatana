[katanakit-js](../index.md) / useGetApis

# Function: useGetApis()

```ts
function useGetApis(): ApisConfig;
```

Defined in: [core/services/http.service.ts:593](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/http.service.ts#L593)

Returns a shallow copy of the registered APIs (safe to mutate locally).

## Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

A shallow copy of the current API registry.

## Example

```ts
import { useGetApis } from "katanakit-js";

const apis = useGetApis();
```
