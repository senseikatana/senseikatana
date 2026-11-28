import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Sergio Jurado Casado'),
    published: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    deliverables: z.array(z.string()).default([]),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
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
    stack: z.array(z.string()).default([]),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    outcome: z.string().optional(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    year: z.string(),
    location: z.string().optional(),
    summary: z.string(),
    tasks: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, experience, services, works };
