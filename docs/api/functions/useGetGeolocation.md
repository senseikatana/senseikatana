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

Defined in: [infrastructure/sensors/sensors.service.ts:115](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/sensors/sensors.service.ts#L115)

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
