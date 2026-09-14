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
        author: z.string().default('Sergio Jurado Casado'),
        published: z.boolean().default(true),
      }),
    }),
    resume: defineCollection({
      type: 'data',
      source: 'resume/**',
      schema: z.object({
        lang: z.string(),
        name: z.string(),
        title: z.string(),
        summary: z.string(),
        email: z.string(),
        phone: z.string(),
        location: z.string(),
        linkedin: z.string(),
        note: z.string().optional(),
        pdfUrl: z.string(),
        experience: z.array(z.object({
          company: z.string(),
          role: z.string(),
          period: z.string(),
          description: z.string(),
          highlights: z.array(z.string()),
        })),
        education: z.array(z.object({
          institution: z.string(),
          degree: z.string(),
          period: z.string(),
          note: z.string().optional(),
        })),
        softSkills: z.array(z.string()),
        hardSkills: z.array(z.string()),
        languages: z.array(z.object({
          name: z.string(),
          level: z.string(),
        })),
        additional: z.array(z.string()),
      }),
    }),
  },
})
