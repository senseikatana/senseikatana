[katanakit-js](../index.md) / useGetGeolocation

# Function: useGetGeolocation()

```ts
function useGetGeolocation(options?): Promise<
  | {
  accuracy: number;
  lat: number;
  lng: number;
}
| null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:115](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/sensors/sensors.service.ts#L115)

Gets the device's current geographic position once.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | `PositionOptions` | Optional PositionOptions to override defaults. |

## Returns

`Promise`\<
  \| \{
  `accuracy`: `number`;
  `lat`: `number`;
  `lng`: `number`;
\}
  \| `null`\>

A [GeoPosition](../type-aliases/GeoPosition.md) object or `null` on error / unavailability.

## Example

```ts
const pos = await useGetGeolocation({ enableHighAccuracy: true });
if (pos) console.log(`${pos.lat}, ${pos.lng}`);
```
