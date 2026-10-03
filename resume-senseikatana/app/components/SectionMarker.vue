<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <p class="section-marker">
    {{ label }}
  </p>
</template>
