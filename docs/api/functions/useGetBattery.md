[katanakit-js](../index.md) / useGetBattery

# Function: useGetBattery()

```ts
function useGetBattery(): Promise<BatteryManager | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:315](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/sensors/sensors.service.ts#L315)

Gets the device battery status.

## Returns

`Promise`\<[`BatteryManager`](../interfaces/BatteryManager.md) \| `null`\>

A `BatteryManager` object or `null` if the API is unavailable.

## Example

```ts
const battery = await useGetBattery();
if (battery) {
  console.log(`${Math.round(battery.level * 100)}%`);
}
```
