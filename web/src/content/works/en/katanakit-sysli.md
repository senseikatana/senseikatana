---
title: 'KatanaKit Sysli'
description: 'ksys — lazygit for the whole systemd ecosystem: units, timers, journal, boot, network, sessions and devices in one TUI.'
sector: 'Rust TUI'
year: '2026'
role: 'Author and maintainer'
stack: ['Rust', 'Systemd', 'TUI']
challenge: 'Inspecting systemd means jumping between systemctl, journalctl, networkctl and several other tools, each with its own flags and output.'
solution: 'A single terminal interface that groups the systemd ecosystem by domain and exposes the common operations without memorising every command.'
outcome: 'One TUI for units, timers, journal, boot, network, sessions and devices, built in Rust with a fast, keyboard-first workflow.'
featured: true
order: 6
draft: false
---

## Overview

`ksys` is a terminal interface for the systemd ecosystem. It presents units, timers, the journal, boot entries, network state, sessions and devices in one place.

## What it solves

Instead of chaining `systemctl`, `journalctl` and `networkctl` with different flags, the tool groups the information by domain and keeps the common actions one keystroke away.

## Architecture

- Rust binary with a keyboard-first TUI.
- Read and write operations mapped to the native systemd interfaces.
- Domain-oriented views instead of one flat command list.
