[katanakit-js](../index.md) / onSplitConfig

# Variable: onSplitConfig

```ts
onSplitConfig: <T>(input) => {
  config: ConfigData<T>;
  methods: ConfigMethodEntries<T>;
};
```

Defined in: [core/services/utils.service.ts:401](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L401)

Splits a `define*Config` literal into its config half (props and booleans)
and its method half (values declared with `function`).

Shared by every `define*Config` so they all read the same way: register
`config`, then return `{ config, ...methods }` as a `ConfigFacade`.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` *extends* `object` | The literal passed to a `define*Config` call. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `T` | Object literal holding props, booleans and methods. |

## Returns

```ts
{
  config: ConfigData<T>;
  methods: ConfigMethodEntries<T>;
}
```

The config entries and the method entries, split apart.

### config

```ts
config: ConfigData<T>;
```

### methods

```ts
methods: ConfigMethodEntries<T>;
```

## Example

```ts
const { config, methods } = splitConfig({
  token: "abc",
  debug: true,
  send: async function () {},
});
// config  → { token: "abc", debug: true }
// methods → { send }
```
