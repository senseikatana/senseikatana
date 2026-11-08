<script setup lang="ts">
import { withBase } from "vitepress";
type HomeSection = {
	title: string;
	description: string;
	link: string;
	chips: string[];
	icon: string;
};

const sections: HomeSection[] = [
	{
		title: "Introduction",
		description:
			"Install KatanaKit, learn the Safe Result contract and how the hexagonal layout fits together.",
		link: "/start/getting-started",
		chips: ["Getting Started", "Error Handling", "Architecture", "Roadmap"],
		icon: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
	},
	{
		title: "Services",
		description:
			"The service reference: HTTP, DOM, storage, dates, observers, workers and more — one page each.",
		link: "/guides/services/",
		chips: ["HTTP Client", "DOM", "Storage", "Dates", "Logger"],
		icon: '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/>',
	},
	{
		title: "HTTP & REST",
		description:
			"Typed fetch with a TanStack Query cache, framework bindings and auth sessions.",
		link: "/guides/query-client",
		chips: ["Query Client", "Framework Adapters", "Better Auth"],
		icon: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
	},
	{
		title: "Runtime & Filesystem",
		description:
			"Node and Bun helpers: filesystem with native errno codes, server adapter and seed fixtures.",
		link: "/guides/filesystem",
		chips: ["Filesystem", "Bun Adapter", "Faker"],
		icon: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
	},
	{
		title: "Browser & DOM",
		description: "Reactive watchers, DOM utilities and lightbox galleries.",
		link: "/guides/watch",
		chips: ["Watch", "PhotoSwipe"],
		icon: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
	},
	{
		title: "Upgrades",
		description: "Step-by-step migration guides for every major release.",
		link: "/guides/upgrade-to/",
		chips: ["v6", "v5", "v4", "v3", "v2"],
		icon: '<circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/>',
	},
	{
		title: "UI Kit",
		description: "Katana UI foundations: components, inventory and LLM-friendly context files.",
		link: "/ui-kit/",
		chips: ["Components", "Inventory", "HyperUI"],
		icon: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
	},
	{
		title: "SCSS Framework",
		description:
			"Pure SCSS: design tokens, @apply composition, layout mixins and generated utilities.",
		link: "/ui-kit/css/",
		chips: ["Foundations", "Mixins", "Utilities", "Reference"],
		icon: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
	},
	{
		title: "Reference",
		description: "Every export generated from source, plus the complete release history.",
		link: "/api/",
		chips: ["API Reference", "Changelog"],
		icon: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
	},
];
</script>

<template>
	<section class="home-sections">
		<div class="home-sections__container">
			<p class="home-sections__eyebrow">Documentation</p>
			<h2 class="home-sections__title">Explore by domain</h2>
			<p class="home-sections__lead">
				Nine self-contained sections. Start at the top or jump straight into the area you need.
			</p>
			<div class="home-sections__grid">
				<a
					v-for="section in sections"
					:key="section.title"
					class="home-card"
					:href="withBase(section.link)"
				>
					<span class="home-card__icon" aria-hidden="true">
						<svg
							viewBox="0 0 24 24"
							width="20"
							height="20"
							fill="none"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
							v-html="section.icon"
						/>
					</span>
					<span class="home-card__head">
						<span class="home-card__title">{{ section.title }}</span>
						<span class="home-card__arrow" aria-hidden="true">→</span>
					</span>
					<span class="home-card__desc">{{ section.description }}</span>
					<span class="home-card__chips">
						<span v-for="chip in section.chips" :key="chip" class="home-card__chip">
							{{ chip }}
						</span>
					</span>
				</a>
			</div>
		</div>
	</section>
</template>
