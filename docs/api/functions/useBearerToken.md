[katanakit-js](../index.md) / useBearerToken

# Function: useBearerToken()

```ts
function useBearerToken(input): string | null;
```

Defined in: [core/services/auth.service.ts:230](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L230)

Reads the bearer token from anything carrying headers.

Returns `null` for a missing *or malformed* header rather than an empty
string, so a caller cannot mistake "no credential" for "empty credential".

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`AuthRequestLike`](../type-aliases/AuthRequestLike.md) |

## Returns

`string` \| `null`
