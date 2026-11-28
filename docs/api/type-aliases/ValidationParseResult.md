[katanakit-js](../index.md) / ValidationParseResult

# Type Alias: ValidationParseResult\<T\>

```ts
type ValidationParseResult<T> = 
  | {
  data: T;
  success: true;
}
  | {
  error: {
     issues: ValidationIssue[];
  };
  success: false;
};
```

Defined in: [types/core/validation.ts:12](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/validation.ts#L12)

Minimal Zod-like success/failure result (`schema.safeParse`).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
