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

Defined in: [types/core/validation.ts:12](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/validation.ts#L12)

Minimal Zod-like success/failure result (`schema.safeParse`).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
