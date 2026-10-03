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
        draft: z.boolean().default(false),
      }),
    }),
    /*
     * Services — the daathdesign-style "what I do" grid. Markdown body is the
     * long-form pitch; frontmatter drives the card and the ordering.
     */
    services: defineCollection({
      type: 'page',
      source: 'services/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        order: z.number().default(99),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      }),
    }),

    /*
     * Projects / case studies — separate from blog because these sell work,
     * not ideas. `challenge` + `solution` + `outcome` are the three-beat
     * structure from the reference site.
     */
    projects: defineCollection({
      type: 'page',
      source: 'projects/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        client: z.string().optional(),
        sector: z.string().optional(),
        year: z.string().optional(),
        image: z.string().optional(),
        liveUrl: z.string().url().optional(),
        repoUrl: z.string().url().optional(),
        role: z.string().optional(),
        stack: z.array(z.string()).optional(),
        challenge: z.string().optional(),
        solution: z.string().optional(),
        outcome: z.string().optional(),
        metrics: z.array(z.object({
          value: z.string(),
          label: z.string(),
        })).optional(),
        featured: z.boolean().default(false),
        order: z.number().default(99),
        draft: z.boolean().default(false),
      }),
    }),

    /*
     * Testimonials — real, attributable quotes only. `source` records where the
     * quote came from so a claim is never floating free of its provenance.
     */
    testimonials: defineCollection({
      type: 'data',
      source: 'testimonials/**',
      schema: z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
        source: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        link: z.string().url().optional(),
        order: z.number().default(99),
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
