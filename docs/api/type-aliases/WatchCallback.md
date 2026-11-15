[katanakit-js](../index.md) / WatchCallback

# Type Alias: WatchCallback\<V, OV\>

```ts
type WatchCallback<V, OV> = VueWatchCallback<V, OV>;
```

Defined in: [types/adapters/vue.ts:19](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/adapters/vue.ts#L19)

Watch callback taken from the native Vue `watch`. Any internal function
is accepted: sync or async, with `(newValue, oldValue)` args or with no
args at all (e.g. `() => checkValidations()`).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-v"></a> `V` | `unknown` |
| <a id="type-parameter-ov"></a> `OV` | `unknown` |
