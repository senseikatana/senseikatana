<script setup lang="ts">
import { useRoute, withBase } from "vitepress";
import { computed, onMounted, ref, watch } from "vue";

import type { ChangelogRelease } from "../signals";
import { siteSignals } from "../signals";

const CHANGELOG_URL = "/changelog";
const STORAGE_KEY = "katanakit:whats-new-seen";
/** Items shown per release — the panel is a summary, not the full changelog. */
const ITEMS_PER_RELEASE = 5;
const route = useRoute();

const entry = computed(() => siteSignals().changelog ?? null);
const open = ref(false);

/** A release reduced to the summary shown in the panel. */
type ShownRelease = ChangelogRelease & { hidden: number };

const title = computed(() => (entry.value ? `Changelog ${formatDate(entry.value.date)}` : ""));

/** Last 6 releases (3 when fewer exist), each capped for the summary view. */
const releases = computed<ShownRelease[]>(() =>
	(entry.value?.releases ?? []).map((release) => {
		const items = release.items.slice(0, ITEMS_PER_RELEASE);
		const hidden = release.items.length - items.length;
		return { ...release, items, hidden };
	}),
);

function formatDate(iso: string): string {
	const [year, month, day] = iso.split("-").map(Number);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return `${months[(month ?? 1) - 1]} ${day}, ${year}`;
}

function shortDate(iso: string): string {
	const [, month, day] = iso.split("-").map(Number);
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	return `${months[(month ?? 1) - 1]} ${day}`;
}

function seen(): string | null {
	try {
		return localStorage.getItem(STORAGE_KEY);
	} catch {
		return null;
	}
}

function dismiss() {
	open.value = false;
	try {
		localStorage.setItem(STORAGE_KEY, entry.value?.version ?? "");
	} catch {
		/* private mode — the panel simply shows again next visit */
	}
}

function syncOpenState(path: string) {
	if (path === "/") {
		open.value = false;
		return;
	}
	if (!entry.value) return;
	if (seen() === entry.value.version) return;
	open.value = true;
}

onMounted(() => {
	syncOpenState(route.path);
});

watch(() => route.path, syncOpenState);
</script>

<template>
	<div v-if="entry" class="whats-new" :class="{ open }">
		<button
			class="whats-new__launcher"
			type="button"
			:aria-expanded="open"
			aria-controls="whats-new-panel"
			@click="open = !open"
		>
			<span class="whats-new__dot" aria-hidden="true" />
			v{{ entry.version }}
			<span class="whats-new__label">What's new</span>
		</button>

		<section
			v-show="open"
			id="whats-new-panel"
			class="whats-new__panel"
			role="dialog"
			aria-label="Changelog"
		>
			<header class="whats-new__header">
				<h2>{{ title }}</h2>
				<button class="whats-new__close" type="button" aria-label="Close" @click="dismiss">✕</button>
			</header>

			<div class="whats-new__body">
				<section v-for="release in releases" :key="release.version" class="whats-new__release">
					<h3>
						v{{ release.version }}
						<span>{{ shortDate(release.date) }}</span>
					</h3>
					<ul>
						<li v-for="(item, index) in release.items" :key="index">
							<span class="whats-new__emoji" aria-hidden="true">{{ item.emoji }}</span>
							<span v-html="item.html" />
						</li>
						<li v-if="release.hidden" class="whats-new__more">… and {{ release.hidden }} more</li>
					</ul>
				</section>
			</div>

			<footer class="whats-new__footer">
				<a class="whats-new__cta" :href="withBase(CHANGELOG_URL)">See Full Changelog</a>
			</footer>
		</section>
	</div>
</template>
