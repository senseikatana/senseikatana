<script setup lang="ts">
const { locale, t } = useI18n()

const { data } = await useAsyncData('contact-resume', () =>
  queryCollection('resume').where('lang', '=', locale.value).first(),
  { watch: [locale] },
)

const resume = computed(() => data.value as {
  email: string
  phone: string
  location: string
  linkedin: string
  pdfUrl: string
} | null)

const whatsappNumber = computed(() => resume.value?.phone?.replace(/\D/g, '') ?? '')
const whatsappUrl = computed(() =>
  `https://wa.me/${whatsappNumber.value}?text=${encodeURIComponent(t('contact.whatsappPrefill'))}`,
)
</script>

<template>
  <UContainer v-if="resume" class="py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white-50 mb-2">{{ t('contact.title') }}</h1>
      <p class="text-white-400">{{ t('contact.subtitle') }}</p>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <div class="space-y-8">
        <p class="text-lg text-white-200 leading-relaxed">
          {{ t('contact.intro') }}
        </p>

        <div class="space-y-4">
          <a :href="`mailto:${resume.email}`" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon name="i-lucide-mail" class="text-sky-400" />
            </div>
            <span class="text-white-200">{{ resume.email }}</span>
          </a>
          <a :href="`tel:${resume.phone?.replace(/\s/g, '')}`" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon name="i-lucide-phone" class="text-sky-400" />
            </div>
            <span class="text-white-200">{{ resume.phone }}</span>
          </a>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon name="i-lucide-map-pin" class="text-sky-400" />
            </div>
            <span class="text-white-200">{{ resume.location }}</span>
          </div>
        </div>

        <div class="flex gap-3">
          <UButton
            icon="i-simple-icons-linkedin"
            color="neutral"
            variant="outline"
            size="sm"
            :to="resume.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="border-dark-600 text-white-300"
          />
          <a
            :href="resume.pdfUrl"
            download
            class="inline-flex items-center gap-2 h-8 px-3 rounded-md border border-dark-600 text-white-300 text-sm font-medium transition-colors hover:bg-white-50/5"
          >
            <UIcon name="i-lucide-download" class="size-4" />
            {{ t('contact.pdf') }}
          </a>
        </div>
      </div>

      <UCard class="bg-dark-800/60 border-dark-700/50">
        <div class="text-center py-6">
          <UIcon name="i-simple-icons-whatsapp" class="text-5xl text-emerald-400 mb-4" />
          <h3 class="text-xl font-semibold text-white-100 mb-2">{{ t('contact.whatsappTitle') }}</h3>
          <p class="text-white-400 mb-6">{{ t('contact.whatsappSub') }}</p>
          <UButton
            :to="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            icon="i-simple-icons-whatsapp"
            class="px-8"
          >
            {{ t('contact.whatsappCta') }}
          </UButton>
          <p class="text-sm text-white-400 mt-6">
            {{ t('contact.orEmail') }}
            <a :href="`mailto:${resume.email}`" class="text-sky-300 hover:text-sky-200 underline underline-offset-2">
              {{ resume.email }}
            </a>
          </p>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
