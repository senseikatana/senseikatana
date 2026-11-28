[katanakit-js](../index.md) / WordPressAuthSchema

# Variable: WordPressAuthSchema

```ts
const WordPressAuthSchema: ZodDiscriminatedUnion<[ZodObject<{
  password: ZodString;
  type: ZodLiteral<"application-passwords">;
  username: ZodString;
}, $strip>, ZodObject<{
  token: ZodString;
  type: ZodLiteral<"jwt">;
}, $strip>, ZodObject<{
  password: ZodString;
  type: ZodLiteral<"basic">;
  username: ZodString;
}, $strip>, ZodObject<{
  cookie: ZodString;
  nonce: ZodString;
  type: ZodLiteral<"nonce">;
}, $strip>], "type">;
```

Defined in: [schemas/wordpress.schema.ts:6](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L6)

Authentication methods for WordPress.
