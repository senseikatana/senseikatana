[katanakit-js](../index.md) / DirectoryError

# Interface: DirectoryError

Defined in: [schemas/directory.schema.ts:84](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/directory.schema.ts#L84)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | \| `"not_found"` \| `"last_owner"` \| `"self_suspension"` \| `"self_demotion"` \| `"privilege_escalation"` \| `"already_active"` \| `"already_suspended"` \| `"deactivated_identity"` \| `"invalid_input"` | - | [schemas/directory.schema.ts:85](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/directory.schema.ts#L85) |
| <a id="message"></a> `message` | `string` | - | [schemas/directory.schema.ts:86](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/directory.schema.ts#L86) |
| <a id="subject"></a> `subject?` | `string` | The subject or role the refusal is about, for a precise UI message. | [schemas/directory.schema.ts:88](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/directory.schema.ts#L88) |
