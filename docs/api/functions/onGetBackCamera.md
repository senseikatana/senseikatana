[katanakit-js](../index.md) / onGetBackCamera

# Function: onGetBackCamera()

```ts
function onGetBackCamera(): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:95](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L95)

Opens the back-facing (environment) camera.

## Returns

`Promise`\<`MediaStream` \| `null`\>

A video-only `MediaStream` or `null`.

## Example

```ts
const rearStream = await onGetBackCamera();
```
