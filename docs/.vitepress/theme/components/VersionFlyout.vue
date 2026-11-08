<script setup lang="ts">
import { withBase } from "vitepress";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import { siteSignals } from "../signals";

const versions = computed(() => siteSignals().versions ?? null);
const major = computed(() => versions.value?.latest.version.split(".")[0] ?? "");
const open = ref(false);
const root = ref<HTMLElement | null>(null);

/** Closes on outside click / Escape, like the default theme flyouts. */
function onDocumentClick(event: MouseEvent) {
	if (!open.value) return;
	if (root.value && event.target instanceof Node && root.value.contains(event.target)) return;
	open.value = false;
}

function onKeydown(event: KeyboardEvent) {
	if (event.key === "Escape") open.value = false;
}

onMounted(() => {
	// VitePress' `nav-bar-title-after` slot renders inside the title anchor, and
	// a dropdown nested in a link both navigates on click and nests interactive
	// content. Move the flyout next to the anchor once it is mounted (it is
	// client-only, so this never touches the SSR output).
	const el = root.value;
	const anchor = el?.closest("a.title");
	if (el && anchor?.parentElement) {
		anchor.parentElement.insertBefore(el, anchor.nextSibling);
	}

	document.addEventListener("click", onDocumentClick);
	document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
	document.removeEventListener("click", onDocumentClick);
	document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
	<div v-if="versions" ref="root" class="version-flyout">
		<button
			type="button"
			class="version-flyout__trigger"
			:aria-expanded="open"
			aria-haspopup="menu"
			@click="open = !open"
		>
			v{{ versions.latest.version }}
			<span class="version-flyout__caret" :class="{ 'is-open': open }" aria-hidden="true">▾</span>
		</button>
		<div v-if="open" class="version-flyout__panel" role="menu">
			<p class="version-flyout__group">v{{ major }} releases</p>
			<a
				v-for="release in versions.recent"
				:key="release.version"
				class="version-flyout__item"
				:class="{ 'is-current': release.version === versions.latest.version }"
				:href="`/changelog${release.anchor}`"
				role="menuitem"
			>
				<span>
					{{
						release.version === versions.latest.version
							? `Latest (${release.version})`
							: `v${release.version}`
					}}
				</span>
				<svg
					v-if="release.version === versions.latest.version"
					viewBox="0 0 24 24"
					width="14"
					height="14"
					aria-hidden="true"
				>
					<path d="M4 12.5 9.5 18 20 6.5" />
				</svg>
			</a>
			<template v-if="versions.previous.length">
				<p class="version-flyout__group version-flyout__group--sep">Previous releases</p>
				<a
					v-for="release in versions.previous"
					:key="release.major"
					class="version-flyout__item"
					:href="release.link"
					role="menuitem"
				>
					<span>v{{ release.version }}</span>
					<span class="version-flyout__hint">v{{ release.major }}.x</span>
				</a>
			</template>
			<a class="version-flyout__item version-flyout__item--all" :href="withBase('/changelog')" role="menuitem">
				All releases
			</a>
		</div>
	</div>
</template>
