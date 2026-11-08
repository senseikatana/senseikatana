[katanakit-js](../index.md) / ConfigFacade

# Type Alias: ConfigFacade\<T\>

```ts
type ConfigFacade<T> = {
  config: ConfigData<T>;
} & ConfigMethodEntries<T>;
```

Defined in: [types/core/config-facade.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/config-facade.ts#L44)

What every `define*Config` returns: the registered config under `config`,
plus the methods declared alongside it so `this.config` resolves inside them.

## Type Declaration

### config

```ts
config: ConfigData<T>;
```

Props and booleans declared in the literal (methods stripped out).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The literal passed to the `define*Config` call. |

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
