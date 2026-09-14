import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().default('Sergio Esteban'),
        published: z.boolean().default(true),
      }),
    }),
  },
})
