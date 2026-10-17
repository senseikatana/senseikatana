# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-10-17

Highlights: fix!: update dependencies, add husky, and sync main with dev.

- [x] 🐛 fix!: update dependencies, add husky, and sync main with dev
  - `.github/workflows/sync-main.yml`
  - `.gitignore`
  - `.husky/pre-commit`
  - `AGENTS.md`
  - `package-lock.json`
  - `package.json`
- [x] 📝 docs(agents): add AGENTS.md with verified repo traps
- [x] 📝 docs(readme): rewrite profile README with verified links
- [x] 🐛 fix(changelog): repair malformed 1.7.0 list entry
- [x] ♻️ refactor(repo): drop resume-senseikatana, keep profile README only
- [x] 🔹 ]7;file://localhost/home/senseikatana/Proyectos/senseikatana added 114 packages, and audited 115 packages in 7s

## [1.15.0] - 2026-10-17

Highlights: fix(changelog): repair malformed 1.7.0 list entry, plus 3 more changes.

- [x] 📝 docs(agents): add AGENTS.md with verified repo traps
  - `AGENTS.md`
- [x] 📝 docs(readme): rewrite profile README with verified links
  - `README.md`
- [x] 🐛 fix(changelog): repair malformed 1.7.0 list entry
- [x] ♻️ refactor(repo): drop resume-senseikatana, keep profile README only
  - `resume-senseikatana/.env.example`
  - `resume-senseikatana/.gitignore`
  - `resume-senseikatana/AGENTS.md`
  - `resume-senseikatana/CHANGELOG.md`
  - `resume-senseikatana/DESIGN.md`
  - `resume-senseikatana/README.md`
  - `resume-senseikatana/app.vue`
  - `resume-senseikatana/app/app.config.ts`
  - `resume-senseikatana/app/app.vue`
  - `resume-senseikatana/app/assets/css/main.css`
  - `resume-senseikatana/app/assets/css/qwen.css`
  - `resume-senseikatana/app/components/LangSwitcher.vue`
  - `resume-senseikatana/app/components/ProfileAvatar.vue`
  - `resume-senseikatana/app/components/SectionMarker.vue`
  - `resume-senseikatana/app/components/StatCell.vue`
  - `resume-senseikatana/app/components/TheGrain.vue`
  - `resume-senseikatana/app/components/TheMarquee.vue`
  - `resume-senseikatana/app/components/ThemeSwitcher.vue`
  - `resume-senseikatana/app/composables/useCountUp.ts`
  - `resume-senseikatana/app/composables/useDateRange.ts`
  - `resume-senseikatana/app/layouts/default.vue`
  - `resume-senseikatana/app/pages/about.vue`
  - `resume-senseikatana/app/pages/blog/[slug]/index.vue`
  - `resume-senseikatana/app/pages/blog/index.vue`
  - `resume-senseikatana/app/pages/contact.vue`
  - `resume-senseikatana/app/pages/index.vue`
  - `resume-senseikatana/app/utils/revealObserver.ts`
  - `resume-senseikatana/bun.lock`
  - `resume-senseikatana/content.config.ts`
  - `resume-senseikatana/content/blog/arquitectura-hexagonal-con-nuxt-4.md`
  - `resume-senseikatana/content/blog/bienvenido-a-mi-blog.md`
  - `resume-senseikatana/content/blog/deployment-de-nuxt-4-en-produccion.md`
  - `resume-senseikatana/content/blog/testing-con-vitest-en-nuxt-4.md`
  - `resume-senseikatana/content/projects/TODO-caso-de-estudio.md`
  - `resume-senseikatana/content/resume/ca.json`
  - `resume-senseikatana/content/resume/en.json`
  - `resume-senseikatana/content/resume/es.json`
  - `resume-senseikatana/content/services/TODO-contenido-y-marca.md`
  - `resume-senseikatana/content/services/TODO-ia-y-automatizacion.md`
  - `resume-senseikatana/content/services/TODO-seo-y-crecimiento.md`
  - `resume-senseikatana/content/services/TODO-web-y-ecommerce.md`
  - `resume-senseikatana/content/testimonials/TODO-testimonio.json`
  - `resume-senseikatana/data/site.ts`
  - `resume-senseikatana/eslint.config.mjs`
  - `resume-senseikatana/i18n/locales/ca.json`
  - `resume-senseikatana/i18n/locales/en.json`
  - `resume-senseikatana/i18n/locales/es.json`
  - `resume-senseikatana/nuxt.config.ts`
  - `resume-senseikatana/package.json`
  - `resume-senseikatana/public/Senseikatana Brand Palette - v2.0.0.pdf`
  - `resume-senseikatana/public/Senseikatana Paleta Brand Colors - v1.0.0.pdf`
  - `resume-senseikatana/public/cv/sergio-jurado.jpg`
  - `resume-senseikatana/public/cv/sergio-jurado.pdf`
  - `resume-senseikatana/public/img/avatar-192.avif`
  - `resume-senseikatana/public/img/avatar-192.webp`
  - `resume-senseikatana/public/img/avatar-384.avif`
  - `resume-senseikatana/public/img/avatar-384.webp`
  - `resume-senseikatana/public/img/avatar-768.avif`
  - `resume-senseikatana/public/img/avatar-768.webp`
  - `resume-senseikatana/public/img/avatar-96.avif`
  - `resume-senseikatana/public/img/avatar-96.webp`
  - `resume-senseikatana/scripts/generate-avatars.ts`
  - `resume-senseikatana/server/plugins/00-remove-powered-by.ts`
  - `resume-senseikatana/server/routes/contact/call.get.ts`
  - `resume-senseikatana/server/routes/contact/whatsapp.get.ts`
  - `resume-senseikatana/tests/content.test.ts`
  - `resume-senseikatana/tests/dateRange.test.ts`
  - `resume-senseikatana/tsconfig.json`
  - `resume-senseikatana/vitest.config.ts`
- [x] 🔹 ]7;file://localhost/home/senseikatana/Proyectos/senseikatana added 114 packages, and audited 115 packages in 7s
- [x] 📦 build(app): update dependencies or build settings in 16 files

## [1.14.0] - 2026-10-17

### Changed

- Repository scope is now the GitHub profile README only

### Removed

- **resume-senseikatana**: moved out of this repository to a standalone project (69 files)

## [1.13.3] - 2026-10-17

Maintenance release with 1 change.

- [x] 🔹 added 114 packages, and audited 115 packages in 7s
  - `colour-wheel-playground/.gitignore`
  - `colour-wheel-playground/AGENTS.md`
  - `colour-wheel-playground/CHANGELOG.md`
  - `colour-wheel-playground/LICENSE`
  - `colour-wheel-playground/README.md`
  - `colour-wheel-playground/bun.lock`
  - `colour-wheel-playground/color.js`
  - `colour-wheel-playground/index.html`
  - `colour-wheel-playground/index.js`
  - `colour-wheel-playground/jsconfig.json`
  - `colour-wheel-playground/package.json`
  - `colour-wheel-playground/preview.png`
  - `colour-wheel-playground/scripts/build.sh`
  - `colour-wheel-playground/styles.css`
  - `colour-wheel-playground/tests/color.test.mjs`
  - `colour-wheel-playground/worker.js`
  - `colour-wheel-playground/wrangler.jsonc`
  - `package-lock.json`
  - `package.json`
- [x] 📦 build(app): update dependencies or build settings in 16 files
- [x] 📦 build(app): update dependencies or build settings in 29 files
- [x] 📝 docs(resume-senseikatana): update documentation in 53 files
- [x] 📝 docs(colour-wheel-playground): update documentation in 35 files
- [x] 🧪 test(colour-wheel-playground): add test coverage for 17 files

## [1.13.2] - 2026-10-03

### Changed

- **app**: update dependencies or build settings in 16 files

## [1.13.1] - 2026-10-03

### Changed

- **app**: update dependencies or build settings in 29 files

## [1.13.0] - 2026-10-03

### Changed

- docs(resume-senseikatana): update documentation in 53 files

## [1.12.0] - 2026-10-03

### Changed

- docs(colour-wheel-playground): update documentation in 35 files

## [1.11.2] - 2026-10-03

### Changed

- test(colour-wheel-playground): add test coverage for 17 files

## [1.11.1] - 2026-10-03

### Changed

- test(colour-wheel-playground): add test coverage for 3 files

## [1.11.0] - 2026-10-03

### Changed

- docs(colour-wheel-playground): update documentation in 26 files

## [1.10.0] - 2026-10-03

### Added

- **colour-wheel-playground**: deploy on Cloudflare Workers at /showcase/*

### Fixed

- **cv-sergio-astro**: translate skill section titles to Spanish

## [1.9.0] - 2026-10-03

### Changed

- **colour-wheel-playground**: update dependencies or build settings in 21 files

## [1.8.0] - 2026-10-03

### Changed

- docs(color-compass-playground): update documentation in 31 files

## [1.7.0] - 2026-10-03

### Changed

- **resume-senseikatana**: update dependencies or build settings in 2 files
  - **layouts**: update dependencies or build settings in 10 files
