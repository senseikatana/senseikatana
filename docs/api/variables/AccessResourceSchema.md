[katanakit-js](../index.md) / AccessResourceSchema

# Variable: AccessResourceSchema

```ts
const AccessResourceSchema: ZodObject<{
  id: ZodUnion<readonly [ZodString, ZodNumber]>;
  type: ZodString;
}, $strip>;
```

Defined in: [schemas/grant.schema.ts:13](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/grant.schema.ts#L13)

The thing being acted on — enough for the authorization layer to route a
check to the right table, and nothing more.

`type` is the storage's partition key (`document`, `expediente`, `invoice`),
not a capability domain. Keeping them separate stops the two vocabularies
from silently drifting into each other.
