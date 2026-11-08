[katanakit-js](../index.md) / useRoles

# Function: useRoles()

```ts
function useRoles(): {
  capabilities: string[];
  label: string;
  rank: number;
  slug: string;
}[];
```

Defined in: [core/services/access.service.ts:394](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L394)

Lists every registered role definition. Returns copies, not live state.

## Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
\}[]
