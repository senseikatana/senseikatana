[katanakit-js](../index.md) / onParseMediaSource

# Function: onParseMediaSource()

```ts
function onParseMediaSource(input): {
  id: string;
  provider: "unknown" | "file" | "youtube" | "vimeo";
  raw: string;
};
```

Defined in: [core/services/media.service.ts:318](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/media.service.ts#L318)

Normalizes any supported input into a `MediaSource`.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `string` |

## Returns

### id

```ts
id: string;
```

Video id for youtube/vimeo, full URL for `file`.

### provider

```ts
provider: "unknown" | "file" | "youtube" | "vimeo" = MediaProviderSchema;
```

### raw

```ts
raw: string;
```

Original input (URL or bare id).

## See

[MediaService.onParseMediaSource](../classes/MediaService.md#onparsemediasource)
