<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const current = computed(() => locale.value.toUpperCase())

const items = computed(() => [
  { type: 'label' as const, label: t('lang.title') },
  ...locales.value.map(l => ({
    type: 'link' as const,
    label: l.name,
    icon: 'i-lucide-languages',
    to: switchLocalePath(l.code),
  })),
])
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UButton
      color="gray"
      variant="ghost"
      :aria-label="t('lang.title')"
      class="font-mono text-xs"
    >
      {{ current }}
    </UButton>
  </UDropdownMenu>
</template>
