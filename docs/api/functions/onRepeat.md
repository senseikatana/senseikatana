[katanakit-js](../index.md) / onRepeat

# Function: onRepeat()

```ts
function onRepeat(
   callback, 
   iterations, 
   delayMs?
): Promise<void>;
```

Defined in: [core/services/timing.service.ts:498](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/timing.service.ts#L498)

Repeats a callback with an optional delay. See [TimingService.onRepeat](../classes/TimingService.md#onrepeat).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `callback` | (`iteration`) => `void` \| `Promise`\<`void`\> | `undefined` |
| `iterations` | `number` | `undefined` |
| `delayMs?` | `number` | `0` |

## Returns

`Promise`\<`void`\>
