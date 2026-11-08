[katanakit-js](../index.md) / DirectoryActor

# Interface: DirectoryActor

Defined in: [core/services/directory.service.ts:75](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L75)

Actions that lock every administrator out of their own system.

Each of these is a single line of code and a support ticket. A user
directory is the one place where a friendly-looking edit has no undo button,
so the rules live here rather than in a `// TODO: add auth checks` comment.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` \| `number` | - | [core/services/directory.service.ts:76](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L76) |
| <a id="roles"></a> `roles` | `string`[] | The actor's roles, already resolved by the caller. | [core/services/directory.service.ts:78](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L78) |
