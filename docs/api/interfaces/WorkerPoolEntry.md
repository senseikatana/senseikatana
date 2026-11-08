[katanakit-js](../index.md) / WorkerPoolEntry

# Interface: WorkerPoolEntry\<TInput, TOutput\>

Defined in: [types/core/workers.ts:5](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/workers.ts#L5)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TInput` | `unknown` |
| `TOutput` | `unknown` |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="func"></a> `func` | [`WorkerFunc`](../type-aliases/WorkerFunc.md)\<`TInput`, `TOutput`\> | [types/core/workers.ts:8](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/workers.ts#L8) |
| <a id="pending"></a> `pending` | `Map`\<`string`, \{ `cleanup`: () => `void`; `reject`: (`reason`) => `void`; \}\> | [types/core/workers.ts:9](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/workers.ts#L9) |
| <a id="worker"></a> `worker` | `Worker` | [types/core/workers.ts:6](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/workers.ts#L6) |
| <a id="workerurl"></a> `workerUrl` | `string` | [types/core/workers.ts:7](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/workers.ts#L7) |
