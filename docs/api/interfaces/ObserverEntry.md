[katanakit-js](../index.md) / ObserverEntry

# Interface: ObserverEntry

Defined in: [types/core/dom.ts:19](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L19)

Internal registry entry storing an observer instance and its tracked targets.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="config"></a> `config` | [`ObserverConfig`](ObserverConfig.md) | [types/core/dom.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L20) |
| <a id="observer"></a> `observer` | `IntersectionObserver` \| `null` | [types/core/dom.ts:21](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L21) |
| <a id="targets"></a> `targets` | `Set`\<`HTMLElement`\> | [types/core/dom.ts:22](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L22) |
