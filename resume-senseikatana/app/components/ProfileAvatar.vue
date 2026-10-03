<script setup lang="ts">
/**
 * Foto de perfil circular.
 *
 * Los recortes square y circular se generan por build con
 * `bun run assets:avatars` (sharp) en AVIF y WebP. El `<picture>` deja que el
 * navegador elija formato; `sizes` evita que un móvil descargue el asset de 768.
 *
 * El borde de acento se hace con `ring` en lugar de un segundo elemento: el PNG
 * de máscara es un cuadrado, no un círculo, así que un overlay no encajaría.
 */
const AVATAR_SIZES = [96, 192, 384, 768]

const props = withDefaults(
  defineProps<{
    alt: string
    size?: number
  }>(),
  { size: 384 },
)

/** El `<picture>` necesita el src del formato de respaldo en el `img`. */
const fallback = computed(() => {
  const match = [...AVATAR_SIZES].reverse().find(candidate => candidate >= props.size)
  return `/img/avatar-${match ?? AVATAR_SIZES.at(-1)}.webp`
})

const sizes = computed(() => AVATAR_SIZES.map(value => `${value}w`).join(', '))
</script>

<template>
  <picture>
    <source
      v-for="value in AVATAR_SIZES"
      :key="`avif-${value}`"
      type="image/avif"
      :srcset="`/img/avatar-${value}.avif`"
      :sizes="sizes"
    >
    <source
      v-for="value in AVATAR_SIZES"
      :key="`webp-${value}`"
      type="image/webp"
      :srcset="`/img/avatar-${value}.webp`"
      :sizes="sizes"
    >
    <img
      :src="fallback"
      :alt="alt"
      width="384"
      height="384"
      loading="lazy"
      decoding="async"
      class="size-full rounded-full object-cover ring-2 ring-forge-500/40"
    >
  </picture>
</template>
