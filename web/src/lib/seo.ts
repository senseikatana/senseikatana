import { site } from '../config/site';

/** Absolute URL for a path, using the configured site origin. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url).href;
}

/** Person/Organization JSON-LD shared by every page. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.legalName,
    url: site.url,
    jobTitle: site.role.en,
    address: { '@type': 'PostalAddress', addressLocality: 'Cambrils', addressRegion: 'Tarragona' },
    sameAs: [site.social.github, site.social.linkedin],
  };
}

/** BlogPosting JSON-LD for an article. */
export function articleJsonLd(input: {
  title: string;
  description: string;
  date: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    datePublished: new Date(input.date).toISOString(),
    author: { '@type': 'Person', name: input.author },
    mainEntityOfPage: input.url,
  };
}
