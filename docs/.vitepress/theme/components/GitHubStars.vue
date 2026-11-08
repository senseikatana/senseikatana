<script setup lang="ts">
import { computed } from "vue";

import { siteSignals } from "../signals";

const REPO = "https://github.com/senseikatana/katanakit-js";
const stars = computed(() => {
	const value = siteSignals().stars;
	return typeof value === "number" ? value : null;
});
const label = computed(() => {
	const n = stars.value;
	if (n === null) return "";
	if (n < 1000) return String(n);
	const thousands = n / 1000;
	return `${thousands >= 10 ? Math.round(thousands) : Math.round(thousands * 10) / 10}k`;
});
</script>

<template>
	<a
		v-if="stars !== null"
		class="gh-stars"
		:href="REPO"
		target="_blank"
		rel="noreferrer noopener"
		:title="`${stars} stars on GitHub`"
	>
		<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
			<path
				fill="currentColor"
				d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
			/>
		</svg>
		<b>{{ label }}</b>
	</a>
</template>
