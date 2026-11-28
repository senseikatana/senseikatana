[katanakit-js](../index.md) / onRequestMotionPermission

# Function: onRequestMotionPermission()

```ts
function onRequestMotionPermission(): Promise<boolean>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:192](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L192)

Requests permission to access device orientation/motion sensors (required on iOS 13+).

## Returns

`Promise`\<`boolean`\>

`true` if permission is granted or already available, `false` otherwise.

## Example

```ts
const granted = await onRequestMotionPermission();
if (granted) {
  onOnDeviceOrientation((e) => console.log(e.alpha, e.beta));
}
```
