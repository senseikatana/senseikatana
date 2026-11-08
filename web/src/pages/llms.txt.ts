import type { APIRoute } from 'astro';
import { getPosts } from '../features/blog/queries';
import { getServices } from '../features/services/queries';
import { getProjects } from '../features/projects/queries';
import { site } from '../config/site';
import { defaultLocale } from '../i18n/config';
import { contentSlug } from '../lib/content';

/**
 * llms.txt — a compact, machine-readable map of the site for LLM crawlers.
 * @see https://llmstxt.org
 */
export const GET: APIRoute = async () => {
  const [posts, services, projects] = await Promise.all([
    getPosts(defaultLocale),
    getServices(defaultLocale),
    getProjects(defaultLocale),
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
    `- [Projects](${site.url}/projects): case studies`,
    `- [Blog](${site.url}/posts): technical articles`,
    `- [Documentation](${site.url}/en/docs/): KatanaKit documentation`,
    `- [Contact](${site.url}/contact)`,
    '',
    '## Services',
    '',
    ...services.map(
      (service) =>
        `- [${service.data.title}](${site.url}/services/${contentSlug(service.id)}): ${service.data.description}`,
    ),
    '',
    '## Projects',
    '',
    ...projects.map(
      (project) =>
        `- [${project.data.title}](${site.url}/projects/${contentSlug(project.id)}): ${project.data.description}`,
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
