<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useRoute } from "vitepress";
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";

import HomeEndcap from "./components/HomeEndcap.vue";
import GitHubStars from "./components/GitHubStars.vue";
import HeroInstall from "./components/HeroInstall.vue";
import HomeAnnouncement from "./components/HomeAnnouncement.vue";
import VersionFlyout from "./components/VersionFlyout.vue";
import WhatNew from "./components/WhatNew.vue";
import { newPagePaths, decorateNewPages } from "./newBadges";

const route = useRoute();
let observer: MutationObserver | undefined;
let frame = 0;

const decorate = () => {
	cancelAnimationFrame(frame);
	frame = requestAnimationFrame(() => decorateNewPages(newPagePaths()));
};

onMounted(() => {
	nextTick(decorate);
	const sidebar = document.querySelector(".VPSidebar");
	if (sidebar) {
		observer = new MutationObserver(decorate);
		observer.observe(sidebar, { childList: true, subtree: true });
	}
});

onBeforeUnmount(() => {
	observer?.disconnect();
	cancelAnimationFrame(frame);
});

watch(
	() => route.path,
	() => nextTick(decorate),
);
</script>

<template>
	<DefaultTheme.Layout>
		<template #nav-bar-title-after>
			<ClientOnly>
				<VersionFlyout />
			</ClientOnly>
		</template>
		<template #nav-bar-content-after>
			<GitHubStars />
		</template>
		<template #home-hero-info-before>
			<HomeAnnouncement />
		</template>
		<template #home-hero-actions-after>
			<HeroInstall />
		</template>
		<template #home-features-before>
			<div class="home-features-heading">
				<p class="home-features-heading__eyebrow">Why KatanaKit</p>
				<h2 class="home-features-heading__title">Sharp tools, zero surprises</h2>
			</div>
		</template>
		<template #home-features-after>
			<HomeSections />
			<HomeEndcap />
		</template>
		<template #layout-bottom>
			<WhatNew />
		</template>
	</DefaultTheme.Layout>
</template>
