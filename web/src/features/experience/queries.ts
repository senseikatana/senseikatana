import { getCollection, type CollectionEntry } from 'astro:content';

export type Experience = CollectionEntry<'experience'>;

/** Published roles ordered from most to least recent. */
export async function getExperience(): Promise<Experience[]> {
  const entries = await getCollection('experience', ({ data }) => !data.draft);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getExperienceEntry(id: string): Promise<Experience | undefined> {
  const entries = await getExperience();
  return entries.find((entry) => entry.id === id);
}
