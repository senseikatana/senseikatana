[katanakit-js](../index.md) / useParseMediaSource

# Function: useParseMediaSource()

```ts
function useParseMediaSource(input): {
  id: string;
  provider: "unknown" | "file" | "youtube" | "vimeo";
  raw: string;
};
```

Defined in: [core/services/media.service.ts:318](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/media.service.ts#L318)

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

[MediaService.useParseMediaSource](../classes/MediaService.md#useparsemediasource)
