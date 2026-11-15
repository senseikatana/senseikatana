[katanakit-js](../index.md) / useSleep

# Function: useSleep()

```ts
function useSleep(ms): Promise<void>;
```

Defined in: [core/services/utils.service.ts:524](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L524)

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
