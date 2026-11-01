import type { APIRoute } from 'astro';
import { getPosts } from '../features/blog/queries';
import { getServices } from '../features/services/queries';
import { getWorks } from '../features/works/queries';
import { site } from '../config/site';

/**
 * llms.txt — a compact, machine-readable map of the site for LLM crawlers.
 * @see https://llmstxt.org
 */
export const GET: APIRoute = async () => {
  const [posts, services, works] = await Promise.all([getPosts(), getServices(), getWorks()]);

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `Ubicación: ${site.location}`,
    `Idioma principal: español`,
    '',
    '## Páginas',
    '',
    `- [Inicio](${site.url}/): presentación y resumen de servicios`,
    `- [Servicios](${site.url}/services): alcance de cada servicio`,
    `- [Proyectos](${site.url}/works): casos de estudio`,
    `- [Blog](${site.url}/blog): artículos técnicos`,
    `- [Contacto](${site.url}/contact)`,
    '',
    '## Servicios',
    '',
    ...services.map(
      (service) =>
        `- [${service.data.title}](${site.url}/services/${service.id}): ${service.data.description}`,
    ),
    '',
    '## Proyectos',
    '',
    ...works.map(
      (work) => `- [${work.data.title}](${site.url}/works/${work.id}): ${work.data.description}`,
    ),
    '',
    '## Blog',
    '',
    ...posts.map(
      (post) => `- [${post.data.title}](${site.url}/blog/${post.id}): ${post.data.description}`,
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
