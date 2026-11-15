[katanakit-js](../index.md) / BUILT\_IN\_CAPABILITIES

# Variable: BUILT\_IN\_CAPABILITIES

```ts
const BUILT_IN_CAPABILITIES: readonly ["content:create", "content:publish", "content:edit:own", "content:edit:any", "content:delete:own", "content:delete:any", "conversations:use", "conversations:moderate", "members:manage", "members:suspend", "members:delete", "roles:assign", "system:admin"];
```

Defined in: [schemas/access.schema.ts:49](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/access.schema.ts#L49)

Capabilities that ship with the kit. Namespaced as `<domain>:<action>
[:<scope>]`; the scope suffix is what keeps `edit:own` and `edit:any`
from being confused. Open-ended by design — a deployment that needs
`expediente:firmar` or `nomina:aprobar` registers its own.
