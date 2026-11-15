[katanakit-js](../index.md) / useInitYoutube

# Function: useInitYoutube()

```ts
function useInitYoutube(config): void;
```

Defined in: [core/services/youtube.service.ts:493](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/youtube.service.ts#L493)

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

[YoutubeService.useInitYoutube](../classes/YoutubeService.md#useinityoutube)
