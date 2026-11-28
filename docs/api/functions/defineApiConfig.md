[katanakit-js](../index.md) / defineApiConfig

# Function: defineApiConfig()

```ts
function defineApiConfig<T>(input): ConfigFacade<T>;
```

Defined in: [core/services/http.service.ts:572](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L572)

Declares the API registry in a single call - the config-file entry point.

Flat entries stay supported: every [ApiEntry](../interfaces/ApiEntry.md) you list is registered,
boolean flags are kept on `config`, and methods are returned on the facade.
On top of that it accepts the Options-API-style sections:

- `apis` - a registry group, registered exactly like flat entries.
- `data()` - returns the mutable facade state, exposed as `this.data`.
- `onInit()` - runs once, after registration, with the facade as `this`.
- `methods` - callable methods, merged flat onto the facade.

One `export default` is the whole setup: no second registration step.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` *extends* `object` | The literal passed in. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `T` & `ThisType`\<[`ConfigFacade`](../type-aliases/ConfigFacade.md)\<`T`\>\> | API entries, flags, sections and methods in one object literal. |

## Returns

[`ConfigFacade`](../type-aliases/ConfigFacade.md)\<`T`\>

The registered config plus the declared methods (see `ConfigFacade`).

## Throws

If a non-method value is an object that is not an API entry,
  if a section has the wrong shape, or if a `methods` entry is not a function.

## Example

```ts
import { defineApiConfig, fetch } from "katanakit-js";

export default defineApiConfig({
  apis: {
    pokeapi: { baseUri: "https://pokeapi.co/api/v2", endpoints: { byId: "/pokemon/:id/" } },
  },
  data: () => ({ calls: 0 }),
  onInit() {
    // Runs once, after registration. Synchronous on purpose.
  },
  methods: {
    async getPokemon(id: number) {
      this.data.calls += 1;
      return fetch("pokeapi", "byId", { params: { id } });
    },
  },
});
```

## Remarks

Methods must be written as method shorthand or with `function`, not
as arrows - `this` is undefined inside an arrow function.

`data` is plain mutable state: it is not reactive and it is shared by every
method of that facade. `onInit` is synchronous because it runs while the
module is evaluated; do async work in a method.

`apis`, `data`, `onInit` and `methods` are reserved: an API or method with
one of those names must be declared under `apis` / `methods` instead.
