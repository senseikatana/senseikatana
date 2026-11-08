[katanakit-js](../index.md) / DirectoryError

# Interface: DirectoryError

Defined in: [schemas/directory.schema.ts:87](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/directory.schema.ts#L87)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | \| `"not_found"` \| `"last_owner"` \| `"self_suspension"` \| `"self_demotion"` \| `"privilege_escalation"` \| `"already_active"` \| `"already_suspended"` \| `"deactivated_identity"` \| `"invalid_input"` | - | [schemas/directory.schema.ts:88](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/directory.schema.ts#L88) |
| <a id="message"></a> `message` | `string` | - | [schemas/directory.schema.ts:89](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/directory.schema.ts#L89) |
| <a id="subject"></a> `subject?` | `string` | The subject or role the refusal is about, for a precise UI message. | [schemas/directory.schema.ts:91](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/directory.schema.ts#L91) |
