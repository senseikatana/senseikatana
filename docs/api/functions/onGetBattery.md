[katanakit-js](../index.md) / onGetBattery

# Function: onGetBattery()

```ts
function onGetBattery(): Promise<BatteryManager | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:315](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L315)

Gets the device battery status.

## Returns

`Promise`\<[`BatteryManager`](../interfaces/BatteryManager.md) \| `null`\>

A `BatteryManager` object or `null` if the API is unavailable.

## Example

```ts
const battery = await onGetBattery();
if (battery) {
  console.log(`${Math.round(battery.level * 100)}%`);
}
```
