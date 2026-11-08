<script setup lang="ts">
import { withBase } from "vitepress";
const linkGroups = [
	{
		title: "Learn",
		links: [
			{ label: "Getting started", href: "/start/getting-started" },
			{ label: "First API client", href: "/tutorials/first-api-client" },
			{ label: "Error handling", href: "/start/errors" },
		],
	},
	{
		title: "Explore",
		links: [
			{ label: "API reference", href: "/api/" },
			{ label: "Services", href: "/guides/services/" },
			{ label: "Release notes", href: "/changelog" },
		],
	},
	{
		title: "Project",
		links: [
			{ label: "GitHub repository", href: "https://github.com/senseikatana/katanakit-js" },
			{ label: "Examples", href: "https://github.com/senseikatana/katanakit-js/tree/main/examples" },
			{
				label: "Contributing",
				href: "https://github.com/senseikatana/katanakit-js/blob/main/CONTRIBUTING.md",
			},
			{ label: "Report an issue", href: "https://github.com/senseikatana/katanakit-js/issues" },
		],
	},
];
</script>

<template>
	<div class="home-endcap">
		<section class="home-cta" aria-labelledby="home-cta-title">
			<div class="home-cta__inner">
				<div class="home-cta__copy">
					<h2 id="home-cta-title">Ready to build with KatanaKit?</h2>
					<p>Start with a working API client, then add validation and caching as your app grows.</p>
				</div>
				<div class="home-cta__actions">
					<a class="home-cta__button" :href="withBase('/tutorials/first-api-client')">
						Build your first API client <span aria-hidden="true">→</span>
					</a>
					<a class="home-cta__text-link" :href="withBase('/start/getting-started')">
						Read the getting started guide
					</a>
				</div>
			</div>
		</section>

		<footer class="home-footer">
			<div class="home-footer__inner">
				<div class="home-footer__brand">
					<a class="home-footer__wordmark" :href="withBase('/')">KatanaKit</a>
					<p>Typed TypeScript services, designed to work across runtimes and frameworks.</p>
				</div>

				<nav
					v-for="group in linkGroups"
					:key="group.title"
					class="home-footer__group"
					:aria-label="group.title"
				>
					<h2>{{ group.title }}</h2>
					<ul>
						<li v-for="link in group.links" :key="link.label">
							<a :href="withBase(link.href)">{{ link.label }}</a>
						</li>
					</ul>
				</nav>
			</div>

			<div class="home-footer__bottom">
				<p>Released under the MIT License.</p>
				<a href="https://github.com/senseikatana/katanakit-js/blob/main/LICENSE">MIT License</a>
			</div>
		</footer>
	</div>
</template>
