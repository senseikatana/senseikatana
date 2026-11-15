[katanakit-js](../index.md) / useTerminateAll

# Function: useTerminateAll()

```ts
function useTerminateAll(): void;
```

Defined in: [infrastructure/worker/worker.service.ts:268](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/worker/worker.service.ts#L268)

Terminates all active Worker pools and rejects any in-flight tasks.

## Returns

`void`

## Example

```ts
useTerminateAll();
```
