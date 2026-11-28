[katanakit-js](../index.md) / onBuildYoutubeEmbedUrl

# Function: onBuildYoutubeEmbedUrl()

```ts
function onBuildYoutubeEmbedUrl(videoId, options?): string;
```

Defined in: [core/services/media.service.ts:323](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/media.service.ts#L323)

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

[MediaService.onBuildYoutubeEmbedUrl](../classes/MediaService.md#onbuildyoutubeembedurl)
