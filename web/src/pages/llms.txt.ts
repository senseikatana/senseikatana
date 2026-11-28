import type { APIRoute } from 'astro';
import { getPosts } from '../features/blog/queries';
import { getServices } from '../features/services/queries';
import { docsLinks, site } from '../config/site';
import { defaultLocale } from '../i18n/config';
import { contentSlug } from '../lib/content';

/**
 * llms.txt — a compact, machine-readable map of the site for LLM crawlers.
 * @see https://llmstxt.org
 */
export const GET: APIRoute = async () => {
  const [posts, services] = await Promise.all([
    getPosts(defaultLocale),
    getServices(defaultLocale),
  ]);

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description.en}`,
    '',
    `Location: ${site.location}`,
    `Primary language: English`,
    '',
    '## Pages',
    '',
    `- [Home](${site.url}/): intro and services overview`,
    `- [Services](${site.url}/services): scope of each service`,
    `- [Blog](${site.url}/posts): technical articles`,
    `- [Documentation](${docsLinks.home}): KatanaKit documentation`,
    `- [Contact](${site.url}/contact)`,
    `- [Works](${site.url}/works): projects and case studies`,
    '',
    '## Services',
    '',
    ...services.map(
      (service) =>
        `- [${service.data.title}](${site.url}/services/${contentSlug(service.id)}): ${service.data.description}`,
    ),
    '',
    '## Blog',
    '',
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${site.url}/posts/${contentSlug(post.id)}): ${post.data.description}`,
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
