#!/usr/bin/env zsh

echo "🚀 Generando archivos de configuración y documentación..."

# Crear .gitignore
cat << 'EOF' > .gitignore
node_modules/
.pnpm-store/
.yarn/
.next/
out/
build/
dist/
.astro/
.output/
.env
.env.*
!.env.example
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.DS_Store
Thumbs.db
.idea/
.vscode/
.*
!.gitignore
!.github/
EOF

# Crear LICENSE
cat << 'EOF' > LICENSE
MIT License

Copyright (c) 2026 senseikatana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom license is furnished to
do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

# Crear CHANGELOG.md
cat << 'EOF' > CHANGELOG.md
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Upcoming features and enhancements.

---

## [1.0.0] - 2026-07-26

### Added
- Initial release of the project.
- Complete folder structure and baseline configuration.
- Comprehensive `.gitignore`, `LICENSE`, and documentation files.
- Responsive design layout and UI components.

### Changed
- Standardized project configurations and clean commit workflow.

### Fixed
- Resolved nested repository issues and gitlink submodule conflicts.
EOF

echo "✅ Archivos .gitignore, LICENSE y CHANGELOG.md creados con éxito."