import { getCollection, type CollectionEntry } from 'astro:content';
import { contentSlug, contentSlugs, localizeEntries } from '../../lib/content';
import { defaultLocale, type Locale } from '../../i18n/config';

export type Project = CollectionEntry<'projects'>;

/** Published case studies ordered by their `order` field. */
export async function getProjects(locale: Locale = defaultLocale): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return localizeEntries(projects, locale).sort((a, b) => a.data.order - b.data.order);
}

export async function getProject(locale: Locale, slug: string): Promise<Project | undefined> {
  const projects = await getProjects(locale);
  return projects.find((project) => contentSlug(project.id) === slug);
}

/** Every route slug, regardless of locale. */
export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return contentSlugs(projects);
}

export async function getFeaturedProjects(locale: Locale = defaultLocale): Promise<Project[]> {
  const projects = await getProjects(locale);
  return projects.filter((project) => project.data.featured);
}
