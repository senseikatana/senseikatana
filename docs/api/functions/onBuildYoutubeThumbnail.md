[katanakit-js](../index.md) / onBuildYoutubeThumbnail

# Function: onBuildYoutubeThumbnail()

```ts
function onBuildYoutubeThumbnail(videoId, quality?): string;
```

Defined in: [core/services/media.service.ts:336](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/media.service.ts#L336)

Builds the public YouTube thumbnail URL.

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `videoId` | `string` | `undefined` |
| `quality?` | `"default"` \| `"mqdefault"` \| `"hqdefault"` \| `"sddefault"` \| `"maxresdefault"` | `"hqdefault"` |

## Returns

`string`

## See

[MediaService.onBuildYoutubeThumbnail](../classes/MediaService.md#onbuildyoutubethumbnail)
