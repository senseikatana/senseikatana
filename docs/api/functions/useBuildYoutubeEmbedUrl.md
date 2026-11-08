[katanakit-js](../index.md) / useBuildYoutubeEmbedUrl

# Function: useBuildYoutubeEmbedUrl()

```ts
function useBuildYoutubeEmbedUrl(videoId, options?): string;
```

Defined in: [core/services/media.service.ts:323](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L323)

Builds the privacy-enhanced YouTube embed URL.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `videoId` | `string` | - |
| `options` | \{ `autoplay?`: `boolean`; `end?`: `number`; `params?`: `Record`\<`string`, `string` \| `number` \| `boolean`\>; `start?`: `number`; \} | - |
| `options.autoplay?` | `boolean` | Autoplay on iframe creation (facade clicks pass `1`). |
| `options.end?` | `number` | End time in seconds. |
| `options.params?` | `Record`\<`string`, `string` \| `number` \| `boolean`\> | Extra `playerVars` merged into the query string. |
| `options.start?` | `number` | Start time in seconds. |

## Returns

`string`

## See

[MediaService.useBuildYoutubeEmbedUrl](../classes/MediaService.md#usebuildyoutubeembedurl)
