[katanakit-js](../index.md) / WatchCallback

# Type Alias: WatchCallback\<V, OV\>

```ts
type WatchCallback<V, OV> = VueWatchCallback<V, OV>;
```

Defined in: [types/adapters/vue.ts:19](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/vue.ts#L19)

Watch callback taken from the native Vue `watch`. Any internal function
is accepted: sync or async, with `(newValue, oldValue)` args or with no
args at all (e.g. `() => checkValidations()`).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `V` | `unknown` |
| `OV` | `unknown` |
