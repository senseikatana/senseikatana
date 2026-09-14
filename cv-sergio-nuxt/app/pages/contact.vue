<script setup lang="ts">
import { profiles } from '~~/data/profiles'

const profile = profiles.find(p => p.lang === 'es')!

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
      <h1 class="text-3xl font-bold text-white-50 mb-2">Contacto</h1>
      <p class="text-white-400">¿Tienes una oferta o quieres hablar? Escríbeme.</p>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <div class="space-y-8">
        <p class="text-lg text-white-200 leading-relaxed">
          Incorporación inmediata (hasta el 10 de julio, solo tardes; después mañana y tarde).
          Abierto a logística, almacén, comercio y atención al cliente.
        </p>

        <div class="space-y-4">
          <a :href="`mailto:${profile.email}`" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon name="i-lucide-mail" class="text-sky-400" />
            </div>
            <span class="text-white-200">{{ profile.email }}</span>
          </a>
          <a :href="`tel:${profile.phone.replace(/\s/g, '')}`" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon name="i-lucide-phone" class="text-sky-400" />
            </div>
            <span class="text-white-200">{{ profile.phone }}</span>
          </a>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
              <UIcon name="i-lucide-map-pin" class="text-sky-400" />
            </div>
            <span class="text-white-200">{{ profile.location }}</span>
          </div>
        </div>

        <div class="flex gap-3">
          <UButton
            icon="i-simple-icons-linkedin"
            color="gray"
            variant="outline"
            size="sm"
            :to="profile.linkedin"
            target="_blank"
            class="border-dark-600 text-white-300"
          />
          <UButton
            icon="i-lucide-download"
            color="gray"
            variant="outline"
            size="sm"
            :href="profile.pdfUrl"
            download="CV_sergiojurado_photo_2026.pdf"
            class="border-dark-600 text-white-300"
          >
            PDF
          </UButton>
        </div>
      </div>

      <UCard v-if="!submitted" class="bg-dark-800/60 border-dark-700/50">
        <UForm :state="form" @submit="handleSubmit">
          <UFormGroup label="Nombre" name="name" class="mb-4">
            <UInput v-model="form.name" placeholder="Tu nombre" />
          </UFormGroup>

          <UFormGroup label="Email" name="email" class="mb-4">
            <UInput v-model="form.email" type="email" placeholder="tu@email.com" />
          </UFormGroup>

          <UFormGroup label="Mensaje" name="message" class="mb-4">
            <UTextarea v-model="form.message" placeholder="Tu mensaje..." :rows="5" />
          </UFormGroup>

          <UButton type="submit" block :loading="loading">
            Enviar mensaje
          </UButton>
        </UForm>
      </UCard>

      <UCard v-else class="text-center bg-dark-800/60 border-dark-700/50">
        <UIcon name="i-lucide-check-circle" class="text-5xl text-emerald-400 mb-4" />
        <h3 class="text-xl font-semibold text-white-100 mb-2">¡Mensaje enviado!</h3>
        <p class="text-white-400">Te responderé lo antes posible.</p>
      </UCard>
    </div>
  </UContainer>
</template>
