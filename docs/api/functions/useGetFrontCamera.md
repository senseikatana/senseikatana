[katanakit-js](../index.md) / useGetFrontCamera

# Function: useGetFrontCamera()

```ts
function useGetFrontCamera(): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:81](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/sensors/sensors.service.ts#L81)

Opens the front-facing (user) camera.

## Returns

`Promise`\<`MediaStream` \| `null`\>

A video-only `MediaStream` or `null`.

## Example

```ts
const selfieStream = await useGetFrontCamera();
```
