[katanakit-js](../index.md) / McpService

# Class: McpService

Defined in: [core/services/mcp.service.ts:41](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L41)

McpService — Singleton facade for MCP server registry management and
host-config emission.

Applies the **Singleton** pattern (one shared instance via
[McpService.getInstance](#getinstance)) and the **Facade** pattern: validation
failures come back as `{ data, error, ok }`, nothing throws. The methods are
pure — registry entries live inside a [VaultData](../type-aliases/VaultData.md) payload that the
caller owns.

Emission targets the OpenCode `mcp.servers` contract (local servers run a
command over stdio, remote servers are absolute Streamable HTTP URLs).
Credential values are kept as `{env:NAME}` references — the vault holds the
secret, generated config holds the indirection.

## Example

```ts
import { useCreateMcpServer, useEmitOpenCodeServers } from "katanakit-js";

const entry = useCreateMcpServer({ name: "context7", type: "remote", url: "https://mcp.context7.com/mcp" });
if (entry.ok) console.log(useEmitOpenCodeServers([entry.data]));
```

## Methods

### useAddMcpServer()

```ts
useAddMcpServer(data, entry): {
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

Defined in: [core/services/mcp.service.ts:88](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L88)

Adds a server to the registry, replacing any entry with the same name —
the same "same name wins wholesale" semantic OpenCode applies to config
overrides, so a re-add is an intentional full replacement.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The current vault payload. |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |
| `entry` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \} | The server entry to store. |
| `entry.command?` | `string`[] | - |
| `entry.disabled?` | `boolean` | - |
| `entry.environment?` | `Record`\<`string`, `string`\> | - |
| `entry.headers?` | `Record`\<`string`, `string`\> | - |
| `entry.name` | `string` | - |
| `entry.type` | `"local"` \| `"remote"` | - |
| `entry.url?` | `string` | - |

#### Returns

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

The updated payload.

##### createdAt

```ts
createdAt: string;
```

##### keys

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

###### Type Declaration

##### mcpServers

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

###### Type Declaration

##### updatedAt

```ts
updatedAt: string;
```

##### version

```ts
version: 1;
```

***

### useCreateMcpServer()

```ts
useCreateMcpServer(input): SafeResult<{
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}>;
```

Defined in: [core/services/mcp.service.ts:61](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L61)

Creates a validated MCP server entry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \} | Name, type and the transport fields for that type. |
| `input.command?` | `string`[] | - |
| `input.disabled?` | `boolean` | - |
| `input.environment?` | `Record`\<`string`, `string`\> | - |
| `input.headers?` | `Record`\<`string`, `string`\> | - |
| `input.name` | `string` | - |
| `input.type` | `"local"` \| `"remote"` | - |
| `input.url?` | `string` | - |

#### Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<\{
  `command?`: `string`[];
  `disabled?`: `boolean`;
  `environment?`: `Record`\<`string`, `string`\>;
  `headers?`: `Record`\<`string`, `string`\>;
  `name`: `string`;
  `type`: `"local"` \| `"remote"`;
  `url?`: `string`;
\}\>

`{ data, error, ok }` — `error.status = 400` on validation failure.

***

### useEmitOpenCodeServers()

```ts
useEmitOpenCodeServers(servers): SafeResult<string>;
```

Defined in: [core/services/mcp.service.ts:185](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L185)

Renders registry entries as a pretty-printed `mcp.servers` JSON fragment,
ready to paste into `opencode.json(c)`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | The server entries to render. |

#### Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`string`\>

`{ data, error, ok }` with the JSON text.

***

### useFindMcpServer()

```ts
useFindMcpServer(data, name): 
  | {
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}
  | undefined;
```

Defined in: [core/services/mcp.service.ts:127](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L127)

Finds a server by name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The vault payload. |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |
| `name` | `string` | The server name. |

#### Returns

  \| \{
  `command?`: `string`[];
  `disabled?`: `boolean`;
  `environment?`: `Record`\<`string`, `string`\>;
  `headers?`: `Record`\<`string`, `string`\>;
  `name`: `string`;
  `type`: `"local"` \| `"remote"`;
  `url?`: `string`;
\}
  \| `undefined`

The entry, or `undefined`.

***

### useListMcpServers()

```ts
useListMcpServers(data): {
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}[];
```

Defined in: [core/services/mcp.service.ts:116](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L116)

Lists registered servers in registration order.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The vault payload. |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |

#### Returns

\{
  `command?`: `string`[];
  `disabled?`: `boolean`;
  `environment?`: `Record`\<`string`, `string`\>;
  `headers?`: `Record`\<`string`, `string`\>;
  `name`: `string`;
  `type`: `"local"` \| `"remote"`;
  `url?`: `string`;
\}[]

The server entries.

***

### useOpenCodeServersObject()

```ts
useOpenCodeServersObject(servers): SafeResult<Record<string, OpenCodeMcpServer>>;
```

Defined in: [core/services/mcp.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L142)

Projects registry entries into an OpenCode `mcp.servers` object.

Only the keys the transport uses are emitted: `command`/`environment` for
local servers, `url`/`headers` for remote ones, `disabled` only when true.
Secrets are never interpolated — `environment`/`headers` values travel as
`{env:NAME}` references exactly as stored.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | The server entries to project. |

#### Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`Record`\<`string`, [`OpenCodeMcpServer`](../interfaces/OpenCodeMcpServer.md)\>\>

`{ data, error, ok }` with the name-keyed object.

***

### useRemoveMcpServer()

```ts
useRemoveMcpServer(data, name): {
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

Defined in: [core/services/mcp.service.ts:102](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L102)

Removes a server from the registry. Removing an absent name is a no-op.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The current vault payload. |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |
| `name` | `string` | The server name. |

#### Returns

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

The updated payload.

##### createdAt

```ts
createdAt: string;
```

##### keys

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

###### Type Declaration

##### mcpServers

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

###### Type Declaration

##### updatedAt

```ts
updatedAt: string;
```

##### version

```ts
version: 1;
```

***

### getInstance()

```ts
static getInstance(): McpService;
```

Defined in: [core/services/mcp.service.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L48)

Returns the shared instance (Singleton).

#### Returns

`McpService`
