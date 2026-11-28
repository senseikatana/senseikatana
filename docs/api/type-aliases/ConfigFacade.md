[katanakit-js](../index.md) / ConfigFacade

# Type Alias: ConfigFacade\<T\>

```ts
type ConfigFacade<T> = {
  config: ConfigData<T>;
} & ConfigMethodEntries<T> & ApiConfigNestedMethods<T> & ApiConfigStateEntry<T>;
```

Defined in: [types/core/config-facade.ts:63](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/config-facade.ts#L63)

What every `define*Config` returns: the registered config under `config`,
plus the methods declared alongside it so `this.config` resolves inside them.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The literal passed to the `define*Config` call. |

## Type Declaration

### config

```ts
config: ConfigData<T>;
```

Props and booleans declared in the literal (methods stripped out).

## Example

```ts
const api = defineApiConfig({
  pokeapi: { baseUri: "…", endpoints: { users: "/users" } },
  debug: true,
  getUsers: async function () {
    return this.config.debug;
  },
});

api.config.pokeapi; // ApiEntry
await api.getUsers();
```
