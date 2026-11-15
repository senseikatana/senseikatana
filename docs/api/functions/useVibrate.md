[katanakit-js](../index.md) / useVibrate

# Function: useVibrate()

```ts
function useVibrate(pattern): boolean;
```

Defined in: [infrastructure/sensors/sensors.service.ts:282](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/sensors/sensors.service.ts#L282)

Triggers the device vibration motor with a given pattern.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `number` \| `number`[] | A single duration (ms) or an array of vibrate/pause durations. |

## Returns

`boolean`

`true` if vibration was triggered, `false` otherwise.

## Example

```ts
useVibrate(200);           // vibrate 200 ms
useVibrate([100, 50, 100]); // vibrate, pause, vibrate
```
