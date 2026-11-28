[katanakit-js](../index.md) / onInitYoutube

# Function: onInitYoutube()

```ts
function onInitYoutube(config): void;
```

Defined in: [core/services/youtube.service.ts:493](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/youtube.service.ts#L493)

Registers the YouTube APIs and stores the default channel.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | \{ `apiKey`: `string`; `channelId`: `string`; \} | - |
| `config.apiKey?` | `string` | YouTube Data API v3 key (server/build-time only, never public). |
| `config.channelId?` | `string` | Default channel id (`UC…`). Per-call params can override it. |

## Returns

`void`

## See

[YoutubeService.onInitYoutube](../classes/YoutubeService.md#oninityoutube)
