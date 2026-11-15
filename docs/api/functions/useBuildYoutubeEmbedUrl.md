[katanakit-js](../index.md) / useBuildYoutubeEmbedUrl

# Function: useBuildYoutubeEmbedUrl()

```ts
function useBuildYoutubeEmbedUrl(videoId, options?): string;
```

Defined in: [core/services/media.service.ts:323](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/media.service.ts#L323)

Builds the privacy-enhanced YouTube embed URL.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `videoId` | `string` | - |
| `options?` | \{ `autoplay?`: `boolean`; `end?`: `number`; `params?`: `Record`\<`string`, `string` \| `number` \| `boolean`\>; `start?`: `number`; \} | - |
| `options.autoplay?` | `boolean` | Autoplay on iframe creation (facade clicks pass `1`). |
| `options.end?` | `number` | End time in seconds. |
| `options.params?` | `Record`\<`string`, `string` \| `number` \| `boolean`\> | Extra `playerVars` merged into the query string. |
| `options.start?` | `number` | Start time in seconds. |

## Returns

`string`

## See

[MediaService.useBuildYoutubeEmbedUrl](../classes/MediaService.md#usebuildyoutubeembedurl)
