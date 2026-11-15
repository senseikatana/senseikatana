[katanakit-js](../index.md) / useRepeat

# Function: useRepeat()

```ts
function useRepeat(
   callback, 
   iterations, 
   delayMs?
): Promise<void>;
```

Defined in: [core/services/timing.service.ts:498](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/timing.service.ts#L498)

Repeats a callback with an optional delay. See [TimingService.useRepeat](../classes/TimingService.md#userepeat).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `callback` | (`iteration`) => `void` \| `Promise`\<`void`\> | `undefined` |
| `iterations` | `number` | `undefined` |
| `delayMs?` | `number` | `0` |

## Returns

`Promise`\<`void`\>
