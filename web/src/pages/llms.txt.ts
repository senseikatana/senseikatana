import type { APIRoute } from 'astro';
import { getPosts } from '../features/blog/queries';
import { getServices } from '../features/services/queries';
import { getProjects } from '../features/projects/queries';
import { site } from '../config/site';

/**
 * llms.txt — a compact, machine-readable map of the site for LLM crawlers.
 * @see https://llmstxt.org
 */
export const GET: APIRoute = async () => {
  const [posts, services, projects] = await Promise.all([getPosts(), getServices(), getProjects()]);

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
    `- [Proyectos](${site.url}/projects): casos de estudio`,
    `- [Blog](${site.url}/posts): artículos técnicos`,
    `- [Documentación](${site.url}/en/docs/): documentación de KatanaKit`,
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
    ...projects.map(
      (project) =>
        `- [${project.data.title}](${site.url}/projects/${project.id}): ${project.data.description}`,
    ),
    '',
    '## Blog',
    '',
    ...posts.map(
      (post) => `- [${post.data.title}](${site.url}/posts/${post.id}): ${post.data.description}`,
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
