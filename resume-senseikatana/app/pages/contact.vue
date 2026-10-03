<script setup lang="ts">
const { locale, t } = useI18n()

const { data } = await useAsyncData(`contact-${locale.value}`, () =>
  queryCollection('resume').where('lang', '=', locale.value).first(),
)

const resume = computed(() => data.value as {
  location: string
  linkedin: string
  pdfUrl: string
} | null)

const form = reactive({
  name: '',
  email: '',
  message: '',
})

/*
  Frontend only — no backend yet.

  There is no delivery endpoint, so this must NOT report success. Faking
  "sent" loses leads: the visitor believes they reached Sergio and moves on.
  Until a provider is wired up, the form explains itself and points at the
  channels that genuinely work (WhatsApp, phone, LinkedIn, PDF).
*/
const hasBackend = false

const handleSubmit = () => {
  if (!hasBackend) return
}
</script>

<template>
  <UContainer
    v-if="resume"
    class="py-12"
  >
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white-50 mb-2">
        {{ t('contact.title') }}
      </h1>
      <p class="text-white-400">
        {{ t('contact.subtitle') }}
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <div class="space-y-8">
        <p class="text-lg text-white-200 leading-relaxed">
          {{ t('contact.intro') }}
        </p>

        <div class="space-y-4">
          <a
            href="/contact/whatsapp"
            class="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon
                name="i-lucide-message-circle"
                class="text-sky-400"
              />
            </div>
            <span class="text-white-200">{{ t('contact.whatsappAction') }}</span>
          </a>
          <a
            href="/contact/call"
            class="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon
                name="i-lucide-phone"
                class="text-sky-400"
              />
            </div>
            <span class="text-white-200">{{ t('contact.callAction') }}</span>
          </a>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon
                name="i-lucide-map-pin"
                class="text-sky-400"
              />
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
            rel="noopener noreferrer"
            class="border-dark-600 text-white-300"
          />
          <a
            :href="resume.pdfUrl"
            download
            class="inline-flex items-center gap-2 h-8 px-3 rounded-md border border-dark-600 text-white-300 text-sm font-medium transition-colors hover:bg-white-50/5"
          >
            <UIcon
              name="i-lucide-download"
              class="size-4"
            />
            {{ t('contact.pdf') }}
          </a>
        </div>
      </div>

      <UCard
        v-if="hasBackend"
        class="bg-dark-800/60 border-dark-700/50"
      >
        <UForm
          :state="form"
          @submit="handleSubmit"
        >
          <UFormField
            :label="t('contact.name')"
            name="name"
            class="mb-4"
          >
            <UInput
              v-model="form.name"
              :placeholder="t('contact.namePlaceholder')"
            />
          </UFormField>

          <UFormField
            :label="t('contact.email')"
            name="email"
            class="mb-4"
          >
            <UInput
              v-model="form.email"
              type="email"
              :placeholder="t('contact.emailPlaceholder')"
            />
          </UFormField>

          <UFormField
            :label="t('contact.message')"
            name="message"
            class="mb-4"
          >
            <UTextarea
              v-model="form.message"
              :placeholder="t('contact.messagePlaceholder')"
              :rows="5"
            />
          </UFormField>

          <UButton
            type="submit"
            block
            :loading="loading"
          >
            {{ t('contact.send') }}
          </UButton>
        </UForm>
      </UCard>

      <!--
        Shown while there is no delivery endpoint. It states the truth and
        routes the visitor to a channel that actually reaches Sergio, instead
        of swallowing their message behind a fake success state.
      -->
      <UCard
        v-else
        class="bg-dark-800/60 border-dark-700/50"
      >
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-info"
            class="size-5 shrink-0 mt-0.5 text-amber-400"
          />
          <div>
            <p class="text-white-200">
              {{ t('contact.noBackendTitle') }}
            </p>
            <p class="text-white-400 mt-1">
              {{ t('contact.noBackendBody') }}
            </p>
            <div class="flex flex-wrap gap-3 mt-4">
              <UButton
                href="/contact/whatsapp"
                icon="i-lucide-message-circle"
                size="sm"
                variant="solid"
              >
                {{ t('contact.whatsappAction') }}
              </UButton>
              <UButton
                href="/contact/call"
                icon="i-lucide-phone"
                size="sm"
                variant="outline"
                class="border-dark-600 text-white-300"
              >
                {{ t('contact.callAction') }}
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
