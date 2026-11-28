[katanakit-js](../index.md) / onBuildVideoEmbed

# Function: onBuildVideoEmbed()

```ts
function onBuildVideoEmbed(options): {
  id: string;
  provider: "unknown" | "file" | "youtube" | "vimeo";
  raw: string;
} & {
  html: string;
};
```

Defined in: [core/services/media.service.ts:349](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/media.service.ts#L349)

Builds the embed HTML for any supported source.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `aspect?`: `string`; `caption?`: `string`; `className?`: `string`; `facade?`: `boolean`; `poster?`: `string`; `src`: `string`; `title`: `string`; `youtube?`: \{ `autoplay?`: `boolean`; `end?`: `number`; `params?`: `Record`\<`string`, `string` \| `number` \| `boolean`\>; `start?`: `number`; \}; \} | - |
| `options.aspect?` | `string` | Aspect ratio box: `16/9` (default) or `4/3`, `1/1`, `9/16`. |
| `options.caption?` | `string` | Optional `<figcaption>` text. |
| `options.className?` | `string` | Extra CSS class on the `<figure>` wrapper. |
| `options.facade?` | `boolean` | Render the click-to-play facade for embeds (no heavy iframe on load). |
| `options.poster?` | `string` | Poster for native `<video>` or facade thumbnail override. |
| `options.src?` | `string` | YouTube URL/id, Vimeo URL/id, or direct `.mp4`/`.webm` URL. |
| `options.title?` | `string` | Accessible title. Used as `<iframe title>` / `<video aria-label>`. |
| `options.youtube?` | \{ `autoplay?`: `boolean`; `end?`: `number`; `params?`: `Record`\<`string`, `string` \| `number` \| `boolean`\>; `start?`: `number`; \} | YouTube player options (only for `youtube` provider). |
| `options.youtube.autoplay?` | `boolean` | Autoplay on iframe creation (facade clicks pass `1`). |
| `options.youtube.end?` | `number` | End time in seconds. |
| `options.youtube.params?` | `Record`\<`string`, `string` \| `number` \| `boolean`\> | Extra `playerVars` merged into the query string. |
| `options.youtube.start?` | `number` | Start time in seconds. |

## Returns

\{
  `id`: `string`;
  `provider`: `"unknown"` \| `"file"` \| `"youtube"` \| `"vimeo"`;
  `raw`: `string`;
\} & \{
  `html`: `string`;
\}

## See

[MediaService.onBuildVideoEmbed](../classes/MediaService.md#onbuildvideoembed)
