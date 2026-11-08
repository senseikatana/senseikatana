[katanakit-js](../index.md) / AuthRequestLike

# Type Alias: AuthRequestLike

```ts
type AuthRequestLike = 
  | Request
  | Headers
  | {
  headers: Headers;
};
```

Defined in: [core/services/auth.service.ts:30](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L30)

Anything that carries the headers of an inbound request.
