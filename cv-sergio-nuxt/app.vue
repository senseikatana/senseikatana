<script setup lang="ts">
const { locale } = useI18n()

const langMap: Record<string, string> = { es: 'es', ca: 'ca', en: 'en' }

watchEffect(() => {
  if (import.meta.client) {
    document.documentElement.lang = langMap[locale.value] || 'es'
    document.documentElement.dir = 'ltr'
  }
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
