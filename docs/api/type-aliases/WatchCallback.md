[katanakit-js](../index.md) / WatchCallback

# Type Alias: WatchCallback\<V, OV\>

```ts
type WatchCallback<V, OV> = VueWatchCallback<V, OV>;
```

Defined in: [types/vue/types.ts:16](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/vue/types.ts#L16)

Watch callback taken from the native Vue `watch`. Any internal function
is accepted: sync or async, with `(newValue, oldValue)` args or with no
args at all (e.g. `() => checkValidations()`).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-v"></a> `V` | `unknown` |
| <a id="type-parameter-ov"></a> `OV` | `unknown` |
