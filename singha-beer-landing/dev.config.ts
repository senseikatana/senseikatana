/**
 * Configuración para el script de desarrollo con Bun + concurrently
 * 
 * Este archivo puede ser utilizado para configuraciones adicionales
 * como watchers, proxies, o procesos secundarios.
 */

export const devConfig = {
  // Puertos
  ports: {
    dev: 3000,
    api: 3001,
    studio: 4983,
  },
  
  // Watchers (opcional - para futuro uso)
  watchers: {
    css: true,    // Watch de cambios en CSS
    graphql: false, // Watch de queries GraphQL
  },
  
  // Procesos secundarios (opcional)
  processes: {
    // Ejemplo: TypeCheck en watch mode
    typecheck: {
      enabled: false,
      command: "bun run typecheck --watch",
    },
    // Ejemplo: Linter en watch mode
    lint: {
      enabled: false,
      command: "bun run lint --watch",
    },
  },
};
