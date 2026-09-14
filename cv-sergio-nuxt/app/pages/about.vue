<script setup lang="ts">
import { profiles } from '~~/data/profiles'
const resumeSlug = profiles.find(p => p.lang === 'es')?.slug ?? 'fullstack'
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white-50 mb-2">About Me</h1>
      <p class="text-white-400">Developer, builder, lifelong learner.</p>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <div class="space-y-6">
        <p class="text-lg text-white-200 leading-relaxed">
          Hi! I'm Sergio Esteban, a Full Stack Developer passionate about creating
          exceptional digital experiences.
        </p>

        <p class="text-white-400 leading-relaxed">
          With 5+ years of experience in web development, I specialize in building
          modern applications using technologies like Vue.js, Nuxt, Node.js and
          industry best practices.
        </p>

        <p class="text-white-400 leading-relaxed">
          My approach focuses on clean architecture, maintainable code, and user
          experience. I strongly believe that good code is code that others can
          easily understand and extend.
        </p>

        <div class="flex gap-3 pt-2">
          <UButton :to="`/es/resume/${resumeSlug}`">
            View Full Resume
          </UButton>
          <UButton to="/contact" variant="outline" class="border-dark-600 text-white-300">
            Contact Me
          </UButton>
        </div>
      </div>

      <div class="space-y-6">
        <UCard class="bg-dark-800/60 border-dark-700/50">
          <h3 class="font-semibold text-white-100 mb-4">Core Technologies</h3>
          <div class="flex flex-wrap gap-2">
            <UBadge v-for="tech in ['Vue.js', 'Nuxt', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']" :key="tech" color="primary" variant="soft">
              {{ tech }}
            </UBadge>
          </div>
        </UCard>

        <UCard class="bg-dark-800/60 border-dark-700/50">
          <h3 class="font-semibold text-white-100 mb-4">Interests</h3>
          <ul class="space-y-3">
            <li v-for="interest in ['Software Architecture', 'Open Source', 'DevOps & CI/CD', 'UI/UX Design']" :key="interest" class="flex items-center gap-2 text-white-400">
              <UIcon name="i-lucide-chevron-right" class="text-sky-400 text-sm" />
              {{ interest }}
            </li>
          </ul>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
