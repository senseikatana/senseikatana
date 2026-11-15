[katanakit-js](../index.md) / useGetApis

# Function: useGetApis()

```ts
function useGetApis(): ApisConfig;
```

Defined in: [core/services/http.service.ts:593](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/http.service.ts#L593)

Returns a shallow copy of the registered APIs (safe to mutate locally).

## Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

A shallow copy of the current API registry.

## Example

```ts
import { useGetApis } from "katanakit-js";

const apis = useGetApis();
```
