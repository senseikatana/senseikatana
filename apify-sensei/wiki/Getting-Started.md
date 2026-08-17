# Quick Start

Getting started with apify-manager in your project.

## Prerequisites

- Node.js >= 18.0.0
- npm or pnpm
- Apify API Token from your Apify Console

## Installation

Install the package alongside the required dependencies:

```shell
npm install apify-client dotenv
pnpm install apify-client dotenv
bun install apify-client dotenv
```

## Environment Configuration

Create a .env file in your project root:

```bash
APIFY_TOKEN=your_apify_api_token_here
``` 

## Complete Example

```ts
import 'dotenv/config';
import { ApifyManager } from './ApifyManager';

interface ScrapedItem {
  url: string;
  title: string;
}

async function main(): Promise<void> {
  const token = process.env.APIFY_TOKEN;
  if (!token) {
    throw new Error('APIFY_TOKEN environment variable is missing.');
  }

  const manager = new ApifyManager(token);

  const results = await manager.runActorAndFetchItems<ScrapedItem>({
    actorId: 'apify/web-scraper',
    input: {
      startUrls: [{ url: 'https://news.ycombinator.com' }]
    }
  });

  console.log(`Successfully fetched ${results.length} items.`);
}

main().catch(console.error);

```