[katanakit-js](../index.md) / useGetBattery

# Function: useGetBattery()

```ts
function useGetBattery(): Promise<BatteryManager | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:315](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/sensors/sensors.service.ts#L315)

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
