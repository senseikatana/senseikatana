[katanakit-js](../index.md) / useEmptyVault

# Function: useEmptyVault()

```ts
function useEmptyVault(): {
  createdAt: string;
  keys: {
     createdAt: string;
     id: string;
     label: string;
     note?: string;
     provider: string;
     secret: string;
     status: "active" | "revoked";
     updatedAt: string;
  }[];
  mcpServers: {
     command?: string[];
     disabled?: boolean;
     environment?: Record<string, string>;
     headers?: Record<string, string>;
     name: string;
     type: "local" | "remote";
     url?: string;
  }[];
  updatedAt: string;
  version: 1;
};
```

Defined in: [core/services/keyvault.service.ts:292](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L292)

Returns an empty vault payload. See [KeyVaultService.useEmptyVault](../classes/KeyVaultService.md#useemptyvault).

## Returns

```ts
{
  createdAt: string;
  keys: {
     createdAt: string;
     id: string;
     label: string;
     note?: string;
     provider: string;
     secret: string;
     status: "active" | "revoked";
     updatedAt: string;
  }[];
  mcpServers: {
     command?: string[];
     disabled?: boolean;
     environment?: Record<string, string>;
     headers?: Record<string, string>;
     name: string;
     type: "local" | "remote";
     url?: string;
  }[];
  updatedAt: string;
  version: 1;
}
```

### createdAt

```ts
createdAt: string;
```

### keys

```ts
keys: {
  createdAt: string;
  id: string;
  label: string;
  note?: string;
  provider: string;
  secret: string;
  status: "active" | "revoked";
  updatedAt: string;
}[];
```

#### Type Declaration

### mcpServers

```ts
mcpServers: {
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}[];
```

#### Type Declaration

### updatedAt

```ts
updatedAt: string;
```

### version

```ts
version: 1;
```
