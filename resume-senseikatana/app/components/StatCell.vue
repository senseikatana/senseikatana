<script setup lang="ts">
/**
 * Celda de estadística con cuenta ascendente.
 *
 * El color del número se decide por `accent`, para que la retícula pueda
 * resaltar una sola métrica en vez de todas a la vez.
 */
const props = withDefaults(
  defineProps<{
    value: number
    label: string
    accent?: boolean
  }>(),
  { accent: false },
)

const { element, display } = useCountUp(() => props.value)
</script>

<template>
  <div class="border-l border-dark-700/60 pl-6">
    <p
      ref="element"
      class="number-display font-display text-5xl leading-none md:text-6xl"
      :class="accent ? 'text-forge-500' : 'text-white-50'"
    >
      {{ display }}
    </p>
    <p class="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white-500">
      {{ label }}
    </p>
  </div>
</template>
