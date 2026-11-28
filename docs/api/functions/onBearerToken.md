[katanakit-js](../index.md) / onBearerToken

# Function: onBearerToken()

```ts
function onBearerToken(input): string | null;
```

Defined in: [core/services/auth.service.ts:230](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/auth.service.ts#L230)

Reads the bearer token from anything carrying headers.

Returns `null` for a missing *or malformed* header rather than an empty
string, so a caller cannot mistake "no credential" for "empty credential".

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`AuthRequestLike`](../type-aliases/AuthRequestLike.md) |

## Returns

`string` \| `null`
