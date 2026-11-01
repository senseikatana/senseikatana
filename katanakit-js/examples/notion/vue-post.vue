<script setup lang="ts">
/**
 * Vue 3 SFC + Notion — single blog post with block rendering.
 *
 * This file goes in: src/views/BlogPostView.vue
 *
 * Fetches a page from Notion by route param, then renders its blocks.
 */

import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
	defineNotionConfig,
	useNotionListAllDatabasePages,
	useNotionGetPage,
	useNotionListAllBlockChildren,
} from "katanakit-js/adapters/notion";
import type { NotionBlock, NotionPage } from "katanakit-js/adapters/notion";

// Init once
defineNotionConfig({ token: import.meta.env.VITE_NOTION_TOKEN });

const route = useRoute();
const slug = computed(() => route.params.slug as string);

// State
const page = ref<NotionPage | null>(null);
const blocks = ref<NotionBlock[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Fetch page and blocks on mount
onMounted(async () => {
	try {
		// Find page by slug
		const allPages = await useNotionListAllDatabasePages(import.meta.env.VITE_NOTION_DATABASE_ID);

		if (!allPages.ok) {
			error.value = allPages.error.message;
			return;
		}

		const found = allPages.data.find((p) => {
			const pageSlug = (p.properties.Slug as any)?.rich_text?.[0]?.plain_text ?? p.id;
			return pageSlug === slug.value;
		});

		if (!found) {
			error.value = "Post not found";
			return;
		}

		page.value = found;

		// Fetch blocks
		const blocksResult = await useNotionListAllBlockChildren(found.id);
		if (blocksResult.ok) {
			blocks.value = blocksResult.data;
		} else {
			error.value = blocksResult.error.message;
		}
	} catch (err) {
		error.value = err instanceof Error ? err.message : String(err);
	} finally {
		loading.value = false;
	}
});

// Extract text from Notion rich text array
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
		<a href="/blog">&larr; Back to blog</a>

		<div v-if="loading" class="loading">Loading...</div>

		<div v-else-if="error" class="error">{{ error }}</div>

		<template v-else-if="page">
			<h1>
				{{ getTitle(page) }}
			</h1>

			<time v-if="getDate(page)" :datetime="getDate(page)">
				{{ new Date(getDate(page)).toLocaleDateString() }}
			</time>

			<div class="content">
				<template v-for="block in blocks" :key="block.id">
					<!-- Paragraph -->
					<p v-if="isType(block, 'paragraph')">
						{{ blockText(block, "paragraph") }}
					</p>

					<!-- Headings -->
					<h2 v-else-if="isType(block, 'heading_1')">
						{{ blockText(block, "heading_1") }}
					</h2>
					<h3 v-else-if="isType(block, 'heading_2')">
						{{ blockText(block, "heading_2") }}
					</h3>
					<h4 v-else-if="isType(block, 'heading_3')">
						{{ blockText(block, "heading_3") }}
					</h4>

					<!-- List items -->
					<li v-else-if="isType(block, 'bulleted_list_item')">
						{{ blockText(block, "bulleted_list_item") }}
					</li>

					<!-- Code -->
					<pre v-else-if="isType(block, 'code')"><code>{{ blockText(block, "code") }}</code></pre>

					<!-- Image -->
					<figure v-else-if="isType(block, 'image')">
						<img :src="imageUrl(block)" :alt="imageCaption(block)" />
						<figcaption v-if="imageCaption(block)">
							{{ imageCaption(block) }}
						</figcaption>
					</figure>

					<!-- Divider -->
					<hr v-else-if="isType(block, 'divider')" />

					<!-- Fallback -->
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
