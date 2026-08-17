# Utils Library Hub:

Utility library for TypeScript/Bun scripts. Modular, tree-shakeable functions
plus a class-based facade (`Lambda`).

## Structure

```
src/
├── classes/lambda.ts   # Lambda class facade over the function modules
├── convert.ts          # bytesToSize, celsiusToFahrenheit, celsiusToKelvin, currencyFormat, kgToLbs, kmToMiles
├── dates.ts            # dateDiff, dateFormat, now
├── http.ts             # axiosFetch, fetchRequest, post, stringifyQuery
├── logger.ts           # LOGGER
├── math.ts             # abs, average, ceil, floor, max, min, pow, randomInt, round, sqrt, sum, sumProduct
├── objects.ts          # deepClone, deepMerge, fromJson, groupBy, hasProperties, isObject, toJson
└── string.ts           # capitalize, isValidEmail, slugify, trim
```

The path alias `@/*` maps to `./src/*` (see `tsconfig.json`).

## Usage

```ts
import { average, slugify } from './index.ts';
import { Lambda } from '@/classes/lambda';

const l = new Lambda();
l.average([1, 2, 3]); // 2
```

## Commands

```bash
bun install        # install dependencies
bun run typecheck  # typecheck with tsc
bun run demo       # run the demo (functions + class)
```
