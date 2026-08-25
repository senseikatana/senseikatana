# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-08-23

### Added
- `src/demo.ts`: runnable test suite covering every export of the library (`initApis`, `getApis`, `buildApiUrl`, `fetchApi`, `useApiUrl`, barrel exports) against the public dummyjson.com API.
- dummyjson.com endpoints in `data/apis.json` (products, users, posts, comments, todos, quotes), including `addProduct` for POST tests.
- `react`, `react-dom` and `@types/react-dom` as devDependencies to render the React hook in the test suite.
- `src/demo.js`: vanilla JavaScript usage demo showing the destructuring and named constants pattern against dummyjson.com.
- `src/demo-react.js`: React usage demo with `useApiUrl`, rendered server-side so it runs from the terminal.

### Changed
- Rewrote the wiki (`Home`, `Getting-Started`, `API-References`, `Architecture`, `Roadmap`) to describe the current library instead of the previous Apify wrapper.
- Moved the API configuration from `src/apis.json` to `data/apis.json`; the `data/` folder will hold one JSON per API going forward.

---

## [1.0.6] - 2026-08-06

### Added
- Integrated official `CHANGELOG.md` project documentation.

### Documentation
- Updated `README.md` file.
- Updated `CONTRIBUTING.md` guidelines.

---

## [1.0.3] - 2026-08-06

### Documentation
- Created and updated repository Wiki documentation files.

---

## [1.0.0] - 2026-07-25

### Added
- Initialized `apify-manager` project workspace and core setup.