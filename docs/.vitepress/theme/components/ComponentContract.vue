<script setup lang="ts">
import { withBase } from "vitepress";
/**
 * The shared API contract for every Katana UI component.
 *
 * Six pages would otherwise restate the same four rules in slightly different
 * words, which is how documentation drifts. Declared once, rendered everywhere.
 */
defineProps<{
	/** Component name, e.g. `"Button"`. */
	name: string;
	/** Root class name without the variant suffix, e.g. `"btn"`. */
	root: string;
	/** Pure class builder, e.g. `"buttonClass"`. */
	pure: string;
	/** Element factory, e.g. `"useButton"`. */
	factory: string;
}>();
</script>

<template>
	<div class="kit-contract">
		<h2 class="kit-contract__title">Contract</h2>

		<p>
			Every component in the kit follows one shape. Pure builders return a class string and
			touch nothing; factories build a DOM element and need a browser.
		</p>

		<table class="kit-contract__table">
			<thead>
				<tr>
					<th>Surface</th>
					<th>Import</th>
					<th>Needs a DOM</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Pure class builder</td>
					<td><code>{{ pure }}</code></td>
					<td>No — safe during SSR</td>
				</tr>
				<tr>
					<td>Element factory</td>
					<td><code>{{ factory }}</code></td>
					<td>Yes — throws with a pointer to the pure surface</td>
				</tr>
			</tbody>
		</table>

		<div class="kit-contract__code">
			<pre><code>// Server and templates — pure
&lt;div class&#61;{ {{ pure }}({ /* … */ }) }&gt;&lt;/div&gt;

// Browser — imperative
document.body.append({{ factory }}({ /* … */ }));</code></pre>
		</div>

		<div class="kit-contract__note">
			<p>
				<strong>Class names are unprefixed.</strong> The root class is
				<code>{{ root }}</code>, not <code>kk-{{ root }}</code>, and every component rule is
				wrapped in <code>@layer katana</code>.
			</p>
			<p>
				That matters because these names collide 1:1 with
				<a href="https://daisyui.com/components/" target="_blank" rel="noreferrer">daisyUI</a>.
				Unlayered CSS always beats layered CSS regardless of specificity or import order, so
				loading both is deterministic instead of "whoever came last".
				See <a :href="withBase('/ui-kit/architecture#why-unprefixed-and-why-layer-katana')">why</a>.
			</p>
		</div>
	</div>
</template>

<style scoped>
.kit-contract {
	margin: var(--spacing-8) 0;
	padding: var(--spacing-5);
	border: 1px solid var(--vp-c-divider);
	border-radius: 12px;
	background-color: var(--vp-c-bg-soft);
}

.kit-contract__title {
	margin: 0 0 var(--spacing-2);
	padding: 0;
	border: 0;
	font-size: 1.05rem;
	font-weight: 600;
	line-height: 1.4;
}

.kit-contract__table {
	display: block;
	overflow-x: auto;
	margin: var(--spacing-4) 0;
}

.kit-contract__code pre {
	margin: 0 0 var(--spacing-4);
}

.kit-contract__note {
	font-size: 0.9rem;
	color: var(--vp-c-text-2);
}

.kit-contract__note p {
	margin: var(--spacing-2) 0;
}
</style>