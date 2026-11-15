[katanakit-js](../index.md) / useParseSmartVideoOptions

# Function: useParseSmartVideoOptions()

```ts
function useParseSmartVideoOptions(input): FetchResult<{
  aspect?: string;
  caption?: string;
  className?: string;
  facade?: boolean;
  poster?: string;
  src: string;
  title: string;
  youtube?: {
     autoplay?: boolean;
     end?: number;
     params?: Record<string, string | number | boolean>;
     start?: number;
  };
}>;
```

Defined in: [core/services/media.service.ts:344](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/media.service.ts#L344)

Validates input against the `SmartVideoOptions` schema.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

[`FetchResult`](../type-aliases/FetchResult.md)\<\{
  `aspect?`: `string`;
  `caption?`: `string`;
  `className?`: `string`;
  `facade?`: `boolean`;
  `poster?`: `string`;
  `src`: `string`;
  `title`: `string`;
  `youtube?`: \{
     `autoplay?`: `boolean`;
     `end?`: `number`;
     `params?`: `Record`\<`string`, `string` \| `number` \| `boolean`\>;
     `start?`: `number`;
  \};
\}\>

## See

[MediaService.useParseSmartVideoOptions](../classes/MediaService.md#useparsesmartvideooptions)
