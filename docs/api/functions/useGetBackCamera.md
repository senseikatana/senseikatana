[katanakit-js](../index.md) / useGetBackCamera

# Function: useGetBackCamera()

```ts
function useGetBackCamera(): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:95](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/sensors/sensors.service.ts#L95)

Opens the back-facing (environment) camera.

## Returns

`Promise`\<`MediaStream` \| `null`\>

A video-only `MediaStream` or `null`.

## Example

```ts
const rearStream = await useGetBackCamera();
```
