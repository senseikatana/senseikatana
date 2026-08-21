# 📜 Scripts del Proyecto

Este documento describe todos los scripts disponibles en `package.json`.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
bun install

# Iniciar desarrollo (concurrently + vinxi + typecheck:watch)
bun run dev

# Build para producción
bun run build

# Preview del build
bun run preview
```

## 📦 Scripts de Desarrollo

### `bun run dev` ⭐ Principal
Inicia el servidor de desarrollo con **concurrently**:
- Ejecuta `vinxi dev` (SolidStart/Vite) - ⚡ Puerta dev: http://localhost:3000
- Ejecuta `bun run typecheck:watch` - ✅ Verificación de tipos en tiempo real
- **Concurrente**: Ambos procesos se ejecutan al unísono
- HMR instantáneo

### `bun run dev:server`
Solo servidor de desarrollo (sin typecheck):
- Ejecuta `vinxi dev`
- Útil si el typecheck causa lentitud

### `bun run dev:types`
Solo verificación de tipos en modo watch:
- Ejecuta `tsc --noEmit --watch`
- Útil para corregir errores de tipos

### `bun run dev:db`
Servidor de desarrollo + Drizzle Studio:
- Ejecuta `vinxi dev` (puerto 3000)
- Ejecuta `bun run db:studio` (puerto 4983)
- Útil para trabajar con base de datos

### `bun run dev:clean`
Cache clean + servidor de desarrollo:
- Elimina `.vinxi` y `.output`
- Ejecuta `bun run dev`
- Regenera todo desde cero

## 🏗️ Scripts de Build

### `bun run build`
Build optimizado para producción:
- Compila TypeScript
- Genera bundles optimizados
- Output en `.output/`

### `bun run build:static`
Build estático para GitHub Pages:
- Genera archivos estáticos HTML/CSS/JS
- Output en `.output/public/`
- Compatible con hosting estático

### `bun run build:analyze`
Build con análisis de bundle:
- Genera reporte de dependencias
- Visualiza tamaño de chunks
- Útil para optimizar bundle size

## 👀 Scripts de Preview

### `bun run preview`
Preview del build de producción:
- Ejecuta `vinxi start`
- Puerto: http://localhost:3000
- Simula producción localmente

### `bun run preview:static`
Preview del build estático:
- Usa `serve` para servir archivos estáticos
- Puerto: http://localhost:3000
- Útil para verificar build antes de deploy

## ✅ Scripts de Verificación

### `bun run typecheck`
Verifica tipos TypeScript:
- Chequeo estático de tipos
- Detecta errores antes del build
- No genera archivos

### `bun run typecheck:watch`
Verifica tipos en modo watch:
- Recompila al detectar cambios
- Muestra errores en tiempo real
- Útil durante desarrollo

### `bun run lint`
Linter (placeholder):
- Agregar ESLint si es necesario
- Ejecutar antes de commits

### `bun run lint:fix`
Auto-fix del linter:
- Corrige errores automáticamente
- Formatea código según reglas

## 🗄️ Scripts de Base de Datos

### `bun run db:generate`
Genera archivos de migración:
- Lee el schema de Drizzle
- Crea archivos SQL en `src/lib/db/migrations/`
- Ejecutar después de cambios en el schema

### `bun run db:migrate`
Ejecuta migraciones pendientes:
- Aplica cambios a la base de datos
- Actualiza la estructura de tablas
- Ejecutar en desarrollo y producción

### `bun run db:push`
Push directo del schema:
- Aplica cambios sin crear migración
- Útil para desarrollo rápido
- ⚠️ No usar en producción

### `bun run test`
Tests (placeholder):
- Agregar Vitest si es necesario
- Ejecutar en CI/CD

### `bun run test:watch`
Tests en modo watch:
- Recompila al detectar cambios
- Útil durante desarrollo

### `bun run test:coverage`
Tests con cobertura:
- Genera reporte de cobertura
- Detecta código no testeado

### `bun run db:studio`
Abre Drizzle Studio:
- Interfaz web para la base de datos
- Puerto: http://localhost:4983
- Útil para debugging y queries

### `bun run db:drop`
Elimina migración:
- Revierte la última migración
- ⚠️ Usar con precaución

## 🧹 Scripts de Limpieza

### `bun run clean` ⭐ Full clean
Limpia **todo**:
- `.vinxi` (cache de Vinxi)
- `.output` (build output)
- `node_modules`
- `bun.lock`
- `.bun-cache`

### `bun run clean:cache`
Solo cache:
- `.vinxi`
- `.output`
- `.bun-cache`

### `bun run clean:modules`
Solo node_modules:
- `node_modules`
- `bun.lock`

### `bun run reset`
Reset sin reinstalar:
- Ejecuta `clean:cache`
- Reinstala dependencias

## 🚀 Scripts de Deploy

### `bun run deploy:vercel`
Deploy a Vercel:
- Ejecuta produccion build
- Deploy con `vercel --prod`
- Requiere `vercel` CLI instalado

### `bun run deploy:gh-pages`
Deploy a GitHub Pages:
- Build estático
- Deploy con `gh-pages`
- Requiere `gh-pages` CLI instalado

## 🔧 Scripts de Sistema

### `bun run prepare`
Pre-commit hook:
- Ejecuta `typecheck`
- Ejecuta `lint`
- Previene commits con errores

### `bun run prebuild`
Pre-build hook:
- Ejecuta `typecheck`
- Verifica tipos antes del build

### `bun run postinstall`
Post-install hook:
- Muestra mensaje de confirmación
- Ejecutar después de `bun install`

### `bun run info`
Información del sistema:
- Versión de Bun
- Versión de Node
- Mensaje de confirmación

## 🎯 Ejemplos de Uso

### Desarrollo Diario
```bash
# Iniciar desarrollo con typecheck en tiempo real
bun run dev

# Solo servidor (sin typecheck)
bun run dev:server

# Servidor + base de datos
bun run dev:db

# Verificar tipos manualmente
bun run typecheck

# Build y preview
bun run build
bun run preview
```

### Trabajar con Base de Datos
```bash
# Generar migración
bun run db:generate

# Aplicar migración
bun run db:migrate

# Push rápido (solo desarrollo)
bun run db:push

# Abrir studio para debugging
bun run db:studio
```

### Deploy a Producción
```bash
# Build para Vercel
bun run build

# Build para GitHub Pages
bun run build:static

# Verificar antes de deploy
bun run preview:static

# Deploy directo
bun run deploy:vercel
bun run deploy:gh-pages
```

### Limpieza y Reset
```bash
# Limpiar solo cache
bun run clean:cache

# Limpiar todo
bun run clean

# Reset completo (clean + install)
bun run reset
```

## ⚡ Notas de Rendimiento

- **Bun es 10-100x más rápido que npm/pnpm** para:
  - Instalar dependencias
  - Ejecutar scripts
  - Compilar TypeScript

- **concurrently ejecuta procesos en paralelo**:
  - Dev server + typecheck
  - Multiplataforma (Windows, Mac, Linux)
  - Colores y formato en terminal

## 🐛 Troubleshooting

### Script no encontrado
```bash
# Verificar que bun está instalado
bun --version

# Reinstalar dependencias
bun install
```

### Error de tipos
```bash
# Ejecutar typecheck
bun run typecheck

# Verificar tsconfig.json
cat tsconfig.json
```

### Cache corrupto
```bash
# Limpiar cache
bun run clean

# Reinstalar
bun install
```

## 🔗 Recursos

- [Bun Documentation](https://bun.sh/docs)
- [concurrently](https://github.com/open-cli-tools/concurrently)
- [Vinxi (SolidStart Runtime)](https://vinxi.vercel.app/)
- [Drizzle ORM](https://orm.drizzle.team/)
