<script setup lang="ts">
import { withBase } from "vitepress";
import { computed, onBeforeUnmount, ref } from "vue";

import { siteSignals } from "../signals";

const REPO = "https://github.com/senseikatana/katanakit-js";
const COMMAND = "npm i katanakit-js";

const version = computed(() => siteSignals().version);
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
	// SSR builds render the button; the clipboard only exists in the browser.
	if (typeof navigator === "undefined" || !navigator.clipboard) return;
	try {
		await navigator.clipboard.writeText(COMMAND);
		copied.value = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied.value = false), 1600);
	} catch {
		/* clipboard blocked (permissions/insecure context) — stay silent */
	}
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
	<div class="home-install">
		<div class="home-install__command">
			<code><span class="home-install__prompt">$</span>&nbsp;{{ COMMAND }}</code>
			<button
				type="button"
				class="home-install__copy"
				:class="{ 'is-copied': copied }"
				:aria-label="copied ? 'Copied' : 'Copy install command'"
				:title="copied ? 'Copied' : 'Copy'"
				@click="copy"
			>
				<svg v-if="!copied" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
					<rect x="9" y="9" width="11" height="11" rx="2" />
					<path d="M5 15V6a2 2 0 0 1 2-2h9" />
				</svg>
				<svg v-else viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
					<path d="M4 12.5 9.5 18 20 6.5" />
				</svg>
			</button>
		</div>
		<p v-if="version" class="home-install__meta">
			Currently <b>v{{ version }}</b>
			<span aria-hidden="true">·</span>
			<a :href="withBase('/changelog')">Releases</a>
			<span aria-hidden="true">·</span>
			<a :href="REPO" target="_blank" rel="noreferrer noopener">GitHub</a>
		</p>
	</div>
</template>
