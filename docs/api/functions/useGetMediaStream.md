[katanakit-js](../index.md) / useGetMediaStream

# Function: useGetMediaStream()

```ts
function useGetMediaStream(constraints?): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:35](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/sensors/sensors.service.ts#L35)

Requests a media stream (camera, microphone, or both).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `constraints?` | `MediaStreamConstraints` | MediaStream constraints (default: video + audio). |

## Returns

`Promise`\<`MediaStream` \| `null`\>

A `MediaStream` or `null` if the API is unavailable or permission is denied.

## Example

```ts
const stream = await useGetMediaStream({ video: true, audio: false });
if (stream) {
  videoElement.srcObject = stream;
}
```
