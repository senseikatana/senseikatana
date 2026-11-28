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

Defined in: [types/core/validation.ts:12](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/validation.ts#L12)

Minimal Zod-like success/failure result (`schema.safeParse`).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
