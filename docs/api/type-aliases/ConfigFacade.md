[katanakit-js](../index.md) / ConfigFacade

# Type Alias: ConfigFacade\<T\>

```ts
type ConfigFacade<T> = {
  config: ConfigData<T>;
} & ConfigMethodEntries<T> & ApiConfigNestedMethods<T> & ApiConfigStateEntry<T>;
```

Defined in: [types/core/config-facade.ts:54](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/config-facade.ts#L54)

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
