# Roadmap

Este documento separa lo que ya está implementado de lo que está planificado. Las fechas son orientativas y pueden cambiar.

## Completado

- [x] Núcleo en TypeScript con tipos estrictos (`types.ts`, `core.ts`)
- [x] Constructor de URLs con parámetros de ruta y query (`buildApiUrl`)
- [x] Wrapper de fetch con resultados tipados (`fetchApi`)
- [x] Hook de React con memorización (`useApiUrl`)
- [x] Suite de demostración contra dummyjson.com (`src/demo.ts`, 47 pruebas)
- [x] Demos por caso de uso: JavaScript puro (`src/demo.js`) y React (`src/demo-react.js`)
- [x] Configuración de ejemplo con cinco APIs (`data/apis.json`)

## Planificado

- [ ] Suite de pruebas automatizadas con Vitest
- [ ] Publicación como paquete en npm
- [ ] Adaptadores para Vue, Svelte y Solid
- [ ] Caché de respuestas con invalidación manual
- [ ] Reintentos automáticos ante errores transitorios
- [ ] Clases de error tipadas para estados HTTP
