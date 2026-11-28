---
title: 'KatanaKit CSS'
description: 'Lightweight, modular SCSS mini-framework with design tokens and utility classes.'
sector: 'SCSS framework'
year: '2026'
repoUrl: 'https://github.com/senseikatana/katanakit-css'
role: 'Author and maintainer'
stack: ['SCSS', 'Design Tokens', 'Utilities']
challenge: 'Most CSS frameworks either ship a huge runtime or force a single visual language on every project.'
solution: 'A token-first SCSS layer with opt-in utilities and layout mixins, compiled away at build time with zero runtime.'
outcome: 'A small, predictable foundation that projects can extend without fighting opinionated components.'
featured: true
order: 5
draft: false
---

## Overview

KatanaKit CSS is a modular SCSS mini-framework: design tokens, utility classes and layout mixins with an `@apply`-style system. It compiles to plain CSS and ships no runtime.

## What it solves

It gives projects a shared visual foundation without a component library or a JavaScript runtime. Tokens define spacing, type and colour; utilities and mixins compose them.

## Architecture

- Three token layers: primitive, semantic and component.
- Opt-in utility generation instead of a fixed full bundle.
- Layout mixins for the common grid and stack patterns.
- Zero runtime overhead.
