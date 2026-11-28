[katanakit-js](../index.md) / useGetFrontCamera

# Function: useGetFrontCamera()

```ts
function useGetFrontCamera(): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:81](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/sensors/sensors.service.ts#L81)

Opens the front-facing (user) camera.

## Returns

`Promise`\<`MediaStream` \| `null`\>

A video-only `MediaStream` or `null`.

## Example

```ts
const selfieStream = await useGetFrontCamera();
```
