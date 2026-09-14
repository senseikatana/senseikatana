<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()
const icon = computed(() => (colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'))

const items = computed(() => [
  { type: 'label' as const, label: t('theme.title') },
  {
    type: 'radio' as const,
    label: t('theme.light'),
    icon: 'i-lucide-sun',
    checked: colorMode.preference === 'light',
    onSelect: () => (colorMode.preference = 'light'),
  },
  {
    type: 'radio' as const,
    label: t('theme.dark'),
    icon: 'i-lucide-moon',
    checked: colorMode.preference === 'dark',
    onSelect: () => (colorMode.preference = 'dark'),
  },
  {
    type: 'radio' as const,
    label: t('theme.system'),
    icon: 'i-lucide-monitor',
    checked: colorMode.preference === 'system',
    onSelect: () => (colorMode.preference = 'system'),
  },
])
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UButton
      color="gray"
      variant="ghost"
      :icon="icon"
      :aria-label="t('theme.title')"
    />
  </UDropdownMenu>
</template>
