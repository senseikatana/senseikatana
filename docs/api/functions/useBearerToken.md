[katanakit-js](../index.md) / useBearerToken

# Function: useBearerToken()

```ts
function useBearerToken(input): string | null;
```

Defined in: [core/services/auth.service.ts:230](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/auth.service.ts#L230)

Reads the bearer token from anything carrying headers.

Returns `null` for a missing *or malformed* header rather than an empty
string, so a caller cannot mistake "no credential" for "empty credential".

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`AuthRequestLike`](../type-aliases/AuthRequestLike.md) |

## Returns

`string` \| `null`
