<script setup lang="ts">
/**
 * Nuxt 3 + Notion — single blog post with block rendering.
 *
 * This file goes in: pages/blog/[slug].vue
 *
 * Fetches a page from Notion by slug, then renders its blocks.
 */

import {
	defineNotionConfig,
	useNotionListAllDatabasePages,
	useNotionListAllBlockChildren,
} from "katanakit-js/adapters/notion";
import type { NotionBlock, NotionPage } from "katanakit-js/adapters/notion";

const config = useRuntimeConfig();
const route = useRoute();
const slug = route.params.slug as string;

// Init Notion
defineNotionConfig({ token: config.notionToken as string });

// Find the page by slug
const { data: pageData, status } = await useAsyncData(`notion-post-${slug}`, async () => {
	const allPages = await useNotionListAllDatabasePages(config.notionDatabaseId as string);

	if (!allPages.ok) return { page: null, blocks: [], error: allPages.error.message };

	const page = allPages.data.find((p) => {
		const pageSlug = (p.properties.Slug as any)?.rich_text?.[0]?.plain_text ?? p.id;
		return pageSlug === slug;
	});

	if (!page) return { page: null, blocks: [], error: "Post not found" };

	const blocksResult = await useNotionListAllBlockChildren(page.id);

	return {
		page,
		blocks: blocksResult.ok ? blocksResult.data : [],
		error: blocksResult.ok ? null : blocksResult.error.message,
	};
});

// Helpers
function extractText(richText: any[]): string {
	return richText?.map((t: any) => t.plain_text).join("") ?? "";
}

// Notion helpers — keep TypeScript casts out of the template
function getTitle(page: NotionPage | null): string {
	return page ? ((page.properties as any).Name?.title?.[0]?.plain_text ?? "Untitled") : "Untitled";
}

function getDate(page: NotionPage | null): string {
	return page ? ((page.properties as any).Date?.date?.start ?? "") : "";
}

function isType(block: NotionBlock, type: string): boolean {
	return blockProp(block, "type") === type;
}

function blockProp(block: NotionBlock, key: string): any {
	return (block as any)[key];
}

function blockText(block: NotionBlock, key: string): string {
	return extractText(blockProp(block, key)?.rich_text);
}

function imageUrl(block: NotionBlock): string {
	const image = blockProp(block, "image");
	return image?.external?.url ?? image?.file?.url ?? "";
}

function imageCaption(block: NotionBlock): string {
	return extractText(blockProp(block, "image")?.caption ?? []);
}
</script>

<template>
	<article class="blog-post">
		<NuxtLink to="/blog">&larr; Back to blog</NuxtLink>

		<div v-if="status === 'pending'" class="loading">Loading...</div>

		<div v-else-if="pageData?.error" class="error">{{ pageData.error }}</div>

		<template v-else-if="pageData?.page">
			<h1>
				{{ getTitle(pageData.page) }}
			</h1>

			<time v-if="getDate(pageData.page)" :datetime="getDate(pageData.page)">
				{{ new Date(getDate(pageData.page)).toLocaleDateString() }}
			</time>

			<div class="content">
				<template v-for="block in pageData.blocks" :key="block.id">
					<p v-if="isType(block, 'paragraph')">
						{{ blockText(block, "paragraph") }}
					</p>
					<h2 v-else-if="isType(block, 'heading_1')">
						{{ blockText(block, "heading_1") }}
					</h2>
					<h3 v-else-if="isType(block, 'heading_2')">
						{{ blockText(block, "heading_2") }}
					</h3>
					<h4 v-else-if="isType(block, 'heading_3')">
						{{ blockText(block, "heading_3") }}
					</h4>
					<li v-else-if="isType(block, 'bulleted_list_item')">
						{{ blockText(block, "bulleted_list_item") }}
					</li>
					<pre v-else-if="isType(block, 'code')"><code>{{ blockText(block, "code") }}</code></pre>
					<figure v-else-if="isType(block, 'image')">
						<img :src="imageUrl(block)" :alt="imageCaption(block)" />
					</figure>
					<hr v-else-if="isType(block, 'divider')" />
					<p v-else class="block-type">[{{ blockProp(block, "type") }}]</p>
				</template>
			</div>
		</template>
	</article>
</template>

<style scoped>
.blog-post {
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem;
}

.content {
	margin-top: 2rem;
	line-height: 1.7;
}

.content h2 {
	margin-top: 2rem;
}
.content figure {
	margin: 1.5rem 0;
}
.content img {
	max-width: 100%;
	border-radius: 0.5rem;
}
.content pre {
	background: #f5f5f5;
	padding: 1rem;
	border-radius: 0.5rem;
	overflow-x: auto;
}
.content code {
	font-family: monospace;
}
.block-type {
	color: #999;
	font-style: italic;
}
.loading,
.error {
	padding: 2rem;
	text-align: center;
}
.error {
	color: #c00;
}
</style>
