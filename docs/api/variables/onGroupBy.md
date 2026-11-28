[katanakit-js](../index.md) / onGroupBy

# Variable: onGroupBy

```ts
onGroupBy: <T>(array, key) => Record<string, T[]>;
```

Defined in: [core/services/utils.service.ts:404](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L404)

Groups array items by a key property or key selector function.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Element type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `T`[] | The input array. |
| `key` | keyof `T` \| ((`item`) => `string`) | A property name or a function that returns the group key. |

## Returns

`Record`\<`string`, `T`[]\>

An object mapping group keys to arrays of items.

## Example

```ts
const items = [
  { type: "fruit", name: "apple" },
  { type: "veggie", name: "carrot" },
  { type: "fruit", name: "banana" },
];
groupBy(items, "type");
// { fruit: [{ type: "fruit", name: "apple" }, { type: "fruit", name: "banana" }], veggie: [...] }
```
