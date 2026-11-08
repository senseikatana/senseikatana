[katanakit-js](../index.md) / useSleep

# Function: useSleep()

```ts
function useSleep(ms): Promise<void>;
```

Defined in: [core/services/utils.service.ts:524](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L524)

Returns a promise that resolves after `ms` milliseconds.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ms` | `number` |

## Returns

`Promise`\<`void`\>

## Example

```ts
await useSleep(1000);
```
