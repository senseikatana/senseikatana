<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import tailwindCss from "../hyperui.css?inline";

const props = defineProps<{
	/** Path of the vendored example under `docs/public`. */
	src: string;
	/** Optional dark-variant path (`…-dark.html`). */
	darkSrc?: string;
	/** Display name of the component. */
	label: string;
	/** Upstream category shown in the header (marketing, application, …). */
	category?: string;
	height?: number;
}>();

const frame = ref<HTMLIFrameElement | null>(null);
const markup = ref("");
const dark = ref(false);
const failed = ref(false);
const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | undefined;

/** Public assets live under the VitePress base (`/en/docs/`), not the origin root. */
const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

async function load() {
	failed.value = false;
	const url = dark.value && props.darkSrc ? props.darkSrc : props.src;
	try {
		const response = await fetch(withBase(url));
		if (!response.ok) throw new Error(String(response.status));
		const parsed = new DOMParser().parseFromString(await response.text(), "text/html");
		markup.value = parsed.body.innerHTML;
	} catch {
		failed.value = true;
		markup.value = "";
	}
}

function render() {
	if (!frame.value) return;
	frame.value.srcdoc = `<!doctype html><html class="${dark.value ? "dark " : ""}font-sans antialiased">
<head><meta charset="utf-8" /><style>${tailwindCss}</style></head>
<body>${markup.value}</body>
</html>`;
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
		/* clipboard unavailable — the markup stays visible in the preview */
	}
}

function toggle() {
	dark.value = !dark.value;
	void load();
}

onMounted(load);
watch([markup, dark], render);
</script>

<template>
	<figure class="hyperui-demo">
		<figcaption class="hyperui-demo__head">
			<span class="hyperui-demo__title">
				<strong>{{ label }}</strong>
				<em v-if="category">{{ category }}</em>
			</span>
			<span class="hyperui-demo__actions">
				<button v-if="darkSrc" type="button" @click="toggle">
					{{ dark ? "Light" : "Dark" }}
				</button>
				<button type="button" :disabled="!markup" @click="copy">
					{{ copied ? "Copied ✓" : "Copy HTML" }}
				</button>
				<a :href="`https://github.com/markmead/hyperui/blob/main/public/examples${src.replace('/hyperui', '')}`" target="_blank" rel="noreferrer noopener">
					Source
				</a>
			</span>
		</figcaption>

		<iframe
			v-show="!failed"
			ref="frame"
			class="hyperui-demo__frame"
			:style="{ height: `${height ?? 420}px`, background: dark ? '#0a0a0a' : '#fff' }"
			:title="label"
			sandbox=""
		/>
		<p v-if="failed" class="hyperui-demo__error">
			Could not load <code>{{ src }}</code> — is the example vendored in
			<code>docs/public/hyperui/</code>?
		</p>
	</figure>
</template>
