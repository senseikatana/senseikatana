[katanakit-js](../index.md) / useVibrate

# Function: useVibrate()

```ts
function useVibrate(pattern): boolean;
```

Defined in: [infrastructure/sensors/sensors.service.ts:282](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/sensors/sensors.service.ts#L282)

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
