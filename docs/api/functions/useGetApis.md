[katanakit-js](../index.md) / useGetApis

# Function: useGetApis()

```ts
function useGetApis(): ApisConfig;
```

Defined in: [core/services/http.service.ts:671](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/http.service.ts#L671)

Returns a shallow copy of the registered APIs (safe to mutate locally).

## Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

A shallow copy of the current API registry.

## Example

```ts
import { useGetApis } from "katanakit-js";

const apis = useGetApis();
```
