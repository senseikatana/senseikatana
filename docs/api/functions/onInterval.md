[katanakit-js](../index.md) / onInterval

# Function: onInterval()

```ts
function onInterval(
   callback, 
   ms, 
   immediate?
): IntervalControl;
```

Defined in: [core/services/timing.service.ts:457](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/timing.service.ts#L457)

Interval with pause/resume/stop controls. See [TimingService.onInterval](../classes/TimingService.md#oninterval).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `callback` | () => `void` \| `Promise`\<`void`\> | `undefined` |
| `ms` | `number` | `undefined` |
| `immediate?` | `boolean` | `false` |

## Returns

[`IntervalControl`](../interfaces/IntervalControl.md)
