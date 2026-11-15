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

Defined in: [infrastructure/sensors/sensors.service.ts:115](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/sensors/sensors.service.ts#L115)

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
