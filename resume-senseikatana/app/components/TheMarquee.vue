<script setup lang="ts">
/**
 * Ticker horizontal infinito.
 *
 * La pista se duplica una vez porque la animación traslada -50%: al llegar a
 * la mitad, la copia ocupa exactamente el hueco que deja la original.
 */
const props = defineProps<{
  items: string[]
}>()

const looped = computed(() => [...props.items, ...props.items])
</script>

<template>
  <div
    class="overflow-hidden"
    aria-hidden="true"
  >
    <div class="marquee-track font-display text-sm tracking-[0.25em] text-forge-700">
      <span
        v-for="(item, index) in looped"
        :key="`${item}-${index}`"
        class="flex shrink-0 items-center"
      >
        <span class="px-8">{{ item }}</span>
        <span class="text-forge-500">/</span>
      </span>
    </div>
  </div>
</template>
