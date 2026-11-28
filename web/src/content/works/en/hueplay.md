---
title: 'HuePlay'
description: 'Interactive tool for understanding colour spaces: HSL versus the modern, perceptually uniform OKLCH.'
sector: 'Colour tool'
year: '2026'
repoUrl: 'https://github.com/senseikatana/hueplay'
role: 'Author and maintainer'
stack: ['Colour', 'OKLCH', 'Interactive']
challenge: 'HSL is easy to read but does not match how people perceive lightness and saturation, which makes palettes unpredictable.'
solution: 'An interactive comparison that shows the same colours in HSL and OKLCH, so the difference in hue, chroma and lightness is visible instead of theoretical.'
outcome: 'A small teaching tool for choosing perceptually uniform palettes and understanding why OKLCH behaves better.'
featured: true
order: 7
draft: false
---

## Overview

HuePlay is an interactive colour tool that puts HSL and OKLCH side by side. It is meant for learning why modern palettes use perceptually uniform spaces.

## What it solves

HSL is intuitive to write but uneven to perceive: two colours with the same lightness value can look very different. OKLCH models lightness and chroma more predictably.

## Architecture

- Interactive controls for hue, saturation/chroma and lightness.
- Side-by-side HSL and OKLCH previews.
- Small, dependency-light front end focused on the colour model, not on chrome.
