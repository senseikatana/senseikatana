import { getCollection, type CollectionEntry } from 'astro:content';

export type Service = CollectionEntry<'services'>;

/** Published services ordered by their `order` field. */
export async function getServices(): Promise<Service[]> {
  const services = await getCollection('services', ({ data }) => !data.draft);
  return services.sort((a, b) => a.data.order - b.data.order);
}

export async function getService(id: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((service) => service.id === id);
}
