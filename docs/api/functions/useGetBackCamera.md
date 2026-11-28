[katanakit-js](../index.md) / useGetBackCamera

# Function: useGetBackCamera()

```ts
function useGetBackCamera(): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:95](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/sensors/sensors.service.ts#L95)

Opens the back-facing (environment) camera.

## Returns

`Promise`\<`MediaStream` \| `null`\>

A video-only `MediaStream` or `null`.

## Example

```ts
const rearStream = await useGetBackCamera();
```
