[katanakit-js](../index.md) / useInterval

# Function: useInterval()

```ts
function useInterval(
   callback, 
   ms, 
   immediate?
): IntervalControl;
```

Defined in: [core/services/timing.service.ts:457](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/timing.service.ts#L457)

Interval with pause/resume/stop controls. See [TimingService.useInterval](../classes/TimingService.md#useinterval).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `callback` | () => `void` \| `Promise`\<`void`\> | `undefined` |
| `ms` | `number` | `undefined` |
| `immediate?` | `boolean` | `false` |

## Returns

[`IntervalControl`](../interfaces/IntervalControl.md)
