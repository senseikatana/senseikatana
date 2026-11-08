[katanakit-js](../index.md) / useGetMediaStream

# Function: useGetMediaStream()

```ts
function useGetMediaStream(constraints?): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:35](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/sensors/sensors.service.ts#L35)

Requests a media stream (camera, microphone, or both).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `constraints` | `MediaStreamConstraints` | MediaStream constraints (default: video + audio). |

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
