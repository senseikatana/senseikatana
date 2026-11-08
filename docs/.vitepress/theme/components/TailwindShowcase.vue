<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
	/** Path under `packages/ui/tailwind/html`, without the `.html` extension. */
	src: string;
	/** Display name shown in the header. */
	label: string;
	/** Family / category shown next to the name. */
	category?: string;
	/** Preview height in pixels (default: 420). */
	height?: number;
}>();

const frame = ref<HTMLIFrameElement | null>(null);
const markup = ref("");
const failed = ref(false);
const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | undefined;

const base = import.meta.env.BASE_URL;
const file = `tailwind-components/${props.src}.html`;
const github = `https://github.com/senseikatana/katanakit-js/blob/dev/packages/ui/tailwind/html/${props.src}.html`;
const react = `https://github.com/senseikatana/katanakit-js/blob/dev/packages/ui/tailwind/react/${props.src}.tsx`;

async function load() {
	failed.value = false;
	try {
		const response = await fetch(`${base}${file}`);
		if (!response.ok) throw new Error(String(response.status));
		markup.value = await response.text();
		if (frame.value) {
			// Dynamic import keeps the compiled Tailwind bundle out of the theme
			// chunk every other docs page loads.
			const { default: tailwindCss } = await import("../tailwind-snippets.css?inline");
			frame.value.srcdoc = `<!doctype html><html class="h-full font-sans antialiased">
<head><meta charset="utf-8" /><style>${tailwindCss}</style></head>
<body>${markup.value}</body>
</html>`;
		}
	} catch {
		failed.value = true;
		markup.value = "";
	}
}

async function copy() {
	if (!markup.value) return;
	try {
		await navigator.clipboard.writeText(markup.value);
		copied.value = true;
		clearTimeout(copyTimer);
		copyTimer = setTimeout(() => {
			copied.value = false;
		}, 1600);
	} catch {
		/* clipboard unavailable — the preview still renders the markup */
	}
}

onMounted(load);
</script>

<template>
	<figure class="snippet-demo">
		<figcaption class="snippet-demo__head">
			<span class="snippet-demo__title">
				<strong>{{ label }}</strong>
				<em v-if="category">{{ category }}</em>
			</span>
			<span class="snippet-demo__actions">
				<button type="button" :disabled="!markup" @click="copy">
					{{ copied ? "Copied ✓" : "Copy HTML" }}
				</button>
				<a :href="github" target="_blank" rel="noreferrer noopener">HTML</a>
				<a :href="react" target="_blank" rel="noreferrer noopener">React</a>
			</span>
		</figcaption>

		<iframe
			v-show="!failed"
			ref="frame"
			class="snippet-demo__frame"
			:style="{ height: `${height ?? 420}px` }"
			:title="label"
			sandbox=""
		/>
		<p v-if="failed" class="snippet-demo__error">
			Could not load <code>{{ file }}</code> — run
			<code>node scripts/sync-tailwind-components.mjs</code> and retry.
		</p>
	</figure>
</template>
