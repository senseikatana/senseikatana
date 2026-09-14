<script setup lang="ts">
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
  <UContainer class="py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white-50 mb-2">Contact</h1>
      <p class="text-white-400">Have a project in mind? Let's talk.</p>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <div class="space-y-8">
        <p class="text-lg text-white-200 leading-relaxed">
          Open to freelance work, collaborations, and interesting projects.
          Drop me a message and I'll get back to you.
        </p>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon name="i-lucide-mail" class="text-sky-400" />
            </div>
            <span class="text-white-200">sergio@codevibes.dev</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon name="i-lucide-map-pin" class="text-sky-400" />
            </div>
            <span class="text-white-200">Buenos Aires, Argentina</span>
          </div>
        </div>

        <div class="flex gap-3">
          <UButton
            icon="i-simple-icons-github"
            color="gray"
            variant="outline"
            size="sm"
            to="https://github.com/senseikatana"
            target="_blank"
            class="border-dark-600 text-white-300"
          />
          <UButton
            icon="i-simple-icons-linkedin"
            color="gray"
            variant="outline"
            size="sm"
            to="https://linkedin.com/in/sergioesteban"
            target="_blank"
            class="border-dark-600 text-white-300"
          />
        </div>
      </div>

      <UCard v-if="!submitted" class="bg-dark-800/60 border-dark-700/50">
        <UForm :state="form" @submit="handleSubmit">
          <UFormGroup label="Name" name="name" class="mb-4">
            <UInput v-model="form.name" placeholder="Your name" />
          </UFormGroup>

          <UFormGroup label="Email" name="email" class="mb-4">
            <UInput v-model="form.email" type="email" placeholder="you@email.com" />
          </UFormGroup>

          <UFormGroup label="Message" name="message" class="mb-4">
            <UTextarea v-model="form.message" placeholder="Your message..." :rows="5" />
          </UFormGroup>

          <UButton type="submit" block :loading="loading">
            Send Message
          </UButton>
        </UForm>
      </UCard>

      <UCard v-else class="text-center bg-dark-800/60 border-dark-700/50">
        <UIcon name="i-lucide-check-circle" class="text-5xl text-emerald-400 mb-4" />
        <h3 class="text-xl font-semibold text-white-100 mb-2">Message Sent!</h3>
        <p class="text-white-400">I'll get back to you as soon as possible.</p>
      </UCard>
    </div>
  </UContainer>
</template>
