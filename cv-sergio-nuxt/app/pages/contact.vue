<script setup lang="ts">
const { locale, t } = useI18n()

const { data } = await useAsyncData(`contact-${locale.value}`, () =>
  queryCollection('resume').where('lang', '=', locale.value).first(),
)

const resume = computed(() => data.value as {
  email: string
  phone: string
  location: string
  linkedin: string
  pdfUrl: string
} | null)

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  submitted.value = true
  loading.value = false
}
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
          <a :href="`tel:${resume.phone.replace(/\s/g, '')}`" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
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
            color="gray"
            variant="outline"
            size="sm"
            :to="resume.linkedin"
            target="_blank"
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

      <UCard v-if="!submitted" class="bg-dark-800/60 border-dark-700/50">
        <UForm :state="form" @submit="handleSubmit">
          <UFormField :label="t('contact.name')" name="name" class="mb-4">
            <UInput v-model="form.name" :placeholder="t('contact.namePlaceholder')" />
          </UFormField>

          <UFormField :label="t('contact.email')" name="email" class="mb-4">
            <UInput v-model="form.email" type="email" :placeholder="t('contact.emailPlaceholder')" />
          </UFormField>

          <UFormField :label="t('contact.message')" name="message" class="mb-4">
            <UTextarea v-model="form.message" :placeholder="t('contact.messagePlaceholder')" :rows="5" />
          </UFormField>

          <UButton type="submit" block :loading="loading">
            {{ t('contact.send') }}
          </UButton>
        </UForm>
      </UCard>

      <UCard v-else class="text-center bg-dark-800/60 border-dark-700/50">
        <UIcon name="i-lucide-check-circle" class="text-5xl text-emerald-400 mb-4" />
        <h3 class="text-xl font-semibold text-white-100 mb-2">{{ t('contact.sent') }}</h3>
        <p class="text-white-400">{{ t('contact.sentSub') }}</p>
      </UCard>
    </div>
  </UContainer>
</template>
