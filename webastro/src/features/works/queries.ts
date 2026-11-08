import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'>;

/** Published case studies ordered by their `order` field. */
export async function getWorks(): Promise<Work[]> {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return works.sort((a, b) => a.data.order - b.data.order);
}

export async function getWork(id: string): Promise<Work | undefined> {
  const works = await getWorks();
  return works.find((work) => work.id === id);
}

export async function getFeaturedWorks(): Promise<Work[]> {
  const works = await getWorks();
  return works.filter((work) => work.data.featured);
}
