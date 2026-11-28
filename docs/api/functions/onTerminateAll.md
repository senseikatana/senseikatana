[katanakit-js](../index.md) / onTerminateAll

# Function: onTerminateAll()

```ts
function onTerminateAll(): void;
```

Defined in: [infrastructure/worker/worker.service.ts:268](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/worker/worker.service.ts#L268)

Terminates all active Worker pools and rejects any in-flight tasks.

## Returns

`void`

## Example

```ts
onTerminateAll();
```
