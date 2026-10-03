<script setup lang="ts">
/**
 * Capa de grano de película.
 *
 * El diseño desplaza la capa al hacer scroll con suavizado lerp. Mantener un
 * bucle rAF incondicional es un coste permanente, así que el bucle solo corre
 * mientras la capa sigue poniéndose al día y se detiene al asentarse.
 */
const layer = ref<HTMLElement | null>(null)

const PARALLAX_FACTOR = 0.15
const LERP = 0.08
const SETTLED = 0.1

let target = 0
let current = 0
let frame = 0

function tick() {
  current += (target - current) * LERP
  layer.value!.style.transform = `translateY(${current}px)`

  if (Math.abs(target - current) < SETTLED) {
    frame = 0
    return
  }
  frame = requestAnimationFrame(tick)
}

function schedule() {
  if (frame) return
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  window.addEventListener(
    'scroll',
    () => {
      target = window.scrollY * PARALLAX_FACTOR
      schedule()
    },
    { passive: true },
  )
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div
    ref="layer"
    class="grain"
    aria-hidden="true"
  />
</template>
