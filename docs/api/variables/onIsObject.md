[katanakit-js](../index.md) / onIsObject

# Variable: onIsObject

```ts
onIsObject: (item) => item is Record<string, unknown>;
```

Defined in: [core/services/utils.service.ts:405](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L405)

Type guard that checks whether a value is a plain object (not null, not
an array).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | `unknown` | The value to test. |

## Returns

`item is Record<string, unknown>`

`true` if the value is a plain `Record<string, unknown>`.

## Example

```ts
isObject({ a: 1 });       // true
isObject([1, 2]);          // false
isObject(null);            // false
```
