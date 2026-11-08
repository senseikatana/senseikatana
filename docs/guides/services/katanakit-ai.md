---
title: katanakitAI
description: Manage AI provider API keys, MCP servers and coding-agent configuration from one encrypted vault.
---

# katanakitAI

The AI toolbox of KatanaKit: it stores your AI provider API keys **encrypted at
rest** and turns them into working configuration for the coding agents you use —
including MCP server registration. It ships as toolkit services plus a CLI, `kai`,
so the same vault can back a script, a CI job or your terminal.

Everything is local-first: the vault lives on your machine, backups are
re-encrypted blobs you can move anywhere, and no secret is ever sent anywhere.

## Install

```bash
npm install -g katanakit-js     # or: bun add -g katanakit-js
kai help
```

No install needed — run it straight from npm:

```bash
npx katanakit-js keys list      # npm
bunx katanakit-js keys list     # bun
```

## How it works

Core services plus one infrastructure adapter and the CLI:

| Layer | Module | Responsibility |
| --- | --- | --- |
| Core | `keyvault.service.ts` | Key record lifecycle (create, rotate, revoke), masking, provider env names |
| Core | `mcp.service.ts` | MCP server registry + OpenCode `mcp.servers` emission |
| Core | `agentconfig.service.ts` | Per-agent config emission ("auto configuration" + "manual connection") |
| Infrastructure | `vault.store.ts` | scrypt + AES-256-GCM envelope, atomic writes, owner-only file mode |
| CLI | `adapters/cli` (`kai`) | `keys`, `mcp` and `agents` command groups |

The vault file is `~/.config/katanakitai/vault.enc.json` (override with
`KATANAKITAI_VAULT`). Every vault command needs `KATANAKITAI_PASSPHRASE`.

## CLI cookbook

### Store a key

```bash
export KATANAKITAI_PASSPHRASE="…"
kai keys add openai --label ci --secret "sk-…"
# or pipe it, so the secret never touches shell history:
echo "sk-…" | kai keys add openai --label ci
```

### List, reveal, rotate, revoke

```bash
kai keys list            # masked secrets only
kai keys reveal <id>     # the ONLY place a secret is printed
kai keys rotate <id> --secret "sk-new…"
kai keys revoke <id>
```

Rotation keeps the record id stable, so generated configs stay valid.

### Register an MCP server

```bash
kai mcp add context7 --url https://mcp.context7.com/mcp
kai mcp add playwright --command "bunx @playwright/mcp"
kai mcp add private --url https://mcp.example.com/mcp \
  --header 'Authorization=Bearer {env:PRIVATE_MCP_TOKEN}'
```

Credential values use `{env:NAME}` references — the vault keeps the secret,
generated config keeps the indirection.

### Generate agent configuration

```bash
kai agents list
kai agents config opencode --key <keyId>
kai agents config claude-code --key <keyId> --write
```

The output mirrors every agent-setup UI:

- **Auto configuration** — the file the tool reads. For OpenCode the API key is
  referenced as `{env:OPENAI_API_KEY}`, never inlined. For Claude Code the
  `env` block of `~/.claude/settings.json` holds the value as written (that is
  how Claude Code reads it), so the file is created with `600` permissions and
  the notes say to keep it out of version control.
- **Manual connection** — the env exports and endpoint to paste by hand.

Secrets are masked in every preview. `--reveal` prints real values;
`--write` writes them (that is the explicit act) and refuses to overwrite an
existing file without `--force`.

### Back up the vault

```bash
kai keys export --out ~/backups/keys.enc.json
```

The backup is sealed with the same passphrase — safe to push to your own
storage.

## Library usage

```ts
import {
  useCreateKeyRecord,
  useMaskSecret,
  useEmitAgentConfig,
} from "katanakit-js";

const record = useCreateKeyRecord({ provider: "openai", label: "ci", secret: "sk-…" });
const config = useEmitAgentConfig("opencode", {
  provider: "openai",
  secret: "sk-…",
  mcpServers: [],
});
```

For persistence, use the infrastructure adapter:

```ts
import { useSaveVaultFile, useLoadVaultFile, useVaultPath } from "katanakit-js";

const path = await useVaultPath();
await useSaveVaultFile(path, vaultData, passphrase);
```

## Security notes

- Encryption: scrypt (N=16384, r=8, p=1) + AES-256-GCM, with the KDF
  parameters stored inside the envelope so they stay upgradeable.
- A wrong passphrase and a tampered file fail the same way — the error never
  says which one it was.
- `kai keys list` and every config preview mask secrets; only `kai keys reveal`
  and an explicit `--reveal`/`--write` show real values.
- The vault file and generated files are written with owner-only permissions
  (`600`).
