export interface Experience {
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
}

export interface Education {
  institution: string
  degree: string
  period: string
}

export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Profile {
  slug: string
  lang: string
  name: string
  title: string
  summary: string
  email: string
  location: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  languages: { name: string; level: string }[]
}

export const profiles: Profile[] = [
  {
    slug: 'fullstack',
    lang: 'es',
    name: 'Sergio Esteban',
    title: 'Full Stack Developer',
    summary: 'Desarrollador Full Stack con más de 5 años de experiencia creando aplicaciones web modernas. Apasionado por la arquitectura limpia, las buenas prácticas y las tecnologías emergentes.',
    email: 'sergio@codevibes.dev',
    location: 'Buenos Aires, Argentina',
    experience: [
      {
        company: 'TechCorp',
        role: 'Senior Full Stack Developer',
        period: '2022 - Presente',
        description: 'Liderazgo técnico en desarrollo de aplicaciones SaaS con Nuxt.js y Node.js. Implementación de arquitectura hexagonal y CI/CD.',
        technologies: ['Nuxt', 'Vue', 'Node.js', 'PostgreSQL', 'Docker'],
      },
      {
        company: 'StartupXYZ',
        role: 'Full Stack Developer',
        period: '2020 - 2022',
        description: 'Desarrollo de plataforma e-commerce con más de 10k usuarios activos. Optimización de rendimiento y SEO.',
        technologies: ['Vue', 'Express', 'MongoDB', 'Redis'],
      },
      {
        company: 'DevAgency',
        role: 'Frontend Developer',
        period: '2018 - 2020',
        description: 'Creación de interfaces de usuario para clientes enterprise. Componentes reutilizables y design system.',
        technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind'],
      },
    ],
    education: [
      {
        institution: 'Universidad de Buenos Aires',
        degree: 'Ingeniería en Sistemas',
        period: '2014 - 2018',
      },
    ],
    skills: [
      { name: 'Vue.js / Nuxt.js', level: 'expert' },
      { name: 'TypeScript', level: 'expert' },
      { name: 'Node.js', level: 'advanced' },
      { name: 'PostgreSQL', level: 'advanced' },
      { name: 'Docker', level: 'intermediate' },
      { name: 'AWS', level: 'intermediate' },
      { name: 'Testing (Vitest)', level: 'advanced' },
      { name: 'CI/CD', level: 'intermediate' },
    ],
    languages: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'Avanzado (C1)' },
    ],
  },
  {
    slug: 'fullstack',
    lang: 'en',
    name: 'Sergio Esteban',
    title: 'Full Stack Developer',
    summary: 'Full Stack Developer with 5+ years of experience building modern web applications. Passionate about clean architecture, best practices, and emerging technologies.',
    email: 'sergio@codevibes.dev',
    location: 'Buenos Aires, Argentina',
    experience: [
      {
        company: 'TechCorp',
        role: 'Senior Full Stack Developer',
        period: '2022 - Present',
        description: 'Technical leadership in SaaS application development with Nuxt.js and Node.js. Implementation of hexagonal architecture and CI/CD.',
        technologies: ['Nuxt', 'Vue', 'Node.js', 'PostgreSQL', 'Docker'],
      },
      {
        company: 'StartupXYZ',
        role: 'Full Stack Developer',
        period: '2020 - 2022',
        description: 'E-commerce platform development with 10k+ active users. Performance optimization and SEO.',
        technologies: ['Vue', 'Express', 'MongoDB', 'Redis'],
      },
      {
        company: 'DevAgency',
        role: 'Frontend Developer',
        period: '2018 - 2020',
        description: 'UI creation for enterprise clients. Reusable components and design system.',
        technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind'],
      },
    ],
    education: [
      {
        institution: 'University of Buenos Aires',
        degree: 'Systems Engineering',
        period: '2014 - 2018',
      },
    ],
    skills: [
      { name: 'Vue.js / Nuxt.js', level: 'expert' },
      { name: 'TypeScript', level: 'expert' },
      { name: 'Node.js', level: 'advanced' },
      { name: 'PostgreSQL', level: 'advanced' },
      { name: 'Docker', level: 'intermediate' },
      { name: 'AWS', level: 'intermediate' },
      { name: 'Testing (Vitest)', level: 'advanced' },
      { name: 'CI/CD', level: 'intermediate' },
    ],
    languages: [
      { name: 'Spanish', level: 'Native' },
      { name: 'English', level: 'Advanced (C1)' },
    ],
  },
]
