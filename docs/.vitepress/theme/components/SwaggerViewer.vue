<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
	/** Remote spec URL (`https://…`) or a file under `docs/public/swagger/`. */
	spec: string;
	/** Heading shown above the viewer and used as the iframe title. */
	title: string;
	/** Short line under the heading. */
	description?: string;
	/** Preferred height in pixels (default: 620). */
	height?: number;
}>();

const base = import.meta.env.BASE_URL;
const theme = ref<"light" | "dark">("light");
let observer: MutationObserver | undefined;

/** Swagger UI renders inside an iframe, so it cannot follow the site theme by
 *  itself; mirror `data-theme` (owned by the theme toggle) into the query. */
function syncTheme() {
	theme.value = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

onMounted(() => {
	syncTheme();
	observer = new MutationObserver(syncTheme);
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-theme", "class"],
	});
});

onBeforeUnmount(() => observer?.disconnect());

/** Absolute URL of the spec, resolved against the docs base when local. */
const specUrl = computed(() =>
	/^https?:\/\//.test(props.spec)
		? props.spec
		: `${base}swagger/${props.spec.replace(/^\/+/, "")}`,
);

const viewerUrl = computed(
	() => `${base}swagger/viewer.html?spec=${encodeURIComponent(specUrl.value)}&theme=${theme.value}`,
);
</script>

<template>
	<figure class="swagger-viewer">
		<figcaption class="swagger-viewer__head">
			<span class="swagger-viewer__title">
				<strong>{{ title }}</strong>
				<em v-if="description">{{ description }}</em>
			</span>
			<span class="swagger-viewer__actions">
				<a :href="specUrl" target="_blank" rel="noreferrer noopener">Spec</a>
				<a :href="viewerUrl" target="_blank" rel="noreferrer noopener">Full screen</a>
			</span>
		</figcaption>

		<iframe
			class="swagger-viewer__frame"
			:src="viewerUrl"
			:title="`${title} — OpenAPI reference`"
			:style="{ height: `${height ?? 620}px` }"
			loading="lazy"
			sandbox="allow-scripts allow-same-origin allow-popups"
		/>
	</figure>
</template>
