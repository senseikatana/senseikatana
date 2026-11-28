[katanakit-js](../index.md) / onVibrate

# Function: onVibrate()

```ts
function onVibrate(pattern): boolean;
```

Defined in: [infrastructure/sensors/sensors.service.ts:282](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L282)

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
onVibrate(200);           // vibrate 200 ms
onVibrate([100, 50, 100]); // vibrate, pause, vibrate
```
