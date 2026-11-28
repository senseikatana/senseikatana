---
title: 'KatanaWP'
description: 'Code-first WordPress configuration: Bun scripts that wrap PHP through Docker, with no local PHP required.'
sector: 'WordPress tooling'
year: '2026'
repoUrl: 'https://github.com/senseikatana/katanakit-wp'
role: 'Author and maintainer'
stack: ['WordPress', 'Bun', 'Docker']
challenge: 'Configuring WordPress usually means clicking through the admin or keeping a pile of PHP snippets that nobody versions.'
solution: 'A set of Bun scripts that run PHP inside Docker, so configuration, roles and content setup live in code and are reproducible.'
outcome: 'Repeatable WordPress environments configured from the repository, without installing PHP on the host.'
featured: true
order: 8
draft: false
---

## Overview

KatanaWP is a code-first way to configure WordPress. Bun scripts wrap PHP through Docker, so the setup lives in the repository instead of the admin UI.

## What it solves

WordPress configuration is often manual and undocumented. Running the PHP steps through a repeatable script makes environments reproducible and reviewable.

## Architecture

- Bun scripts as the entry point.
- PHP executed inside Docker, with no local PHP requirement.
- Configuration, roles and seed content treated as code.
