## https://biomejs.dev/guides/getting-started/

# Installation
bun add --dev --exact @biomejs/biome
# Initialization:  
bunx @biomejs/biome init
# Usage:
bunx @biomejs/biome format ./src/*.ts --write
bunx --bun @biomejs/biome format --write
bunx --bun @biomejs/biome format --write <files>
# Linting:
bunx --bun @biomejs/biome check --write
bunx @biomejs/biome check --apply ./src/**/*.ts
bunx --bun @biomejs/biome lint --write
bunx --bun @biomejs/biome lint --write <files>
